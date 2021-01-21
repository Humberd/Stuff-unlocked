// ==UserScript==
// @name		  eRepublik Stuff++ Unlocked
// @description An unlocked version of stuff++ (https://docs.google.com/spreadsheets/d/1nal62cgC7lUmrur6NRzlPVU3uxtE59WGV9-bZcPoIw8/edit#gid=0), that for some reason didn't want to run after Zordacz ban.
// @author		Zordacz, Humberd
// @version		5.39
// @match		  https://www.erepublik.com/*
// @updateUrl https://raw.githubusercontent.com/Humberd/Stuff-unlocked/master/src/index.user.js
// @run-at		document-start
// @grant		  none
// ==/UserScript==
!function() {
  if (location.href.includes('A/u/t/o/F/i/g/h/t/e/r')) {
    addEventListener('DOMContentLoaded', function() {
      var token = localStorage.waMLog;
      document.head.insertAdjacentHTML('beforeEnd',
          '<style>#autoFighter{border:0;position:absolute;width:100vw;height:100vh;z-index:999}#status{position:absolute;width:100vw;height:100vh;z-index:9999;transition:background 1s;background:#000}#status div{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;background:' +
          (!token || token.includes('FUL') ? '#83B70B' : 'red') + ';color:#fff;padding:5px;font:700 14px Arial;border-radius:1px;text-shadow:0 0 2px #000;box-shadow:0 0 3px inset #000}</style>');
      /** @type {string} */
      document.body.innerHTML = '<iframe id="autoFighter" src="/en/military/campaigns" sandbox="allow-same-origin allow-scripts allow-forms"></iframe><div id="status"><div>' + (token || 'AUTOFIGHTER ON<br>click anywhere to abort') + '</div></div>';
      /** @type {string} */
      document.title = 'AUTOFIGHTER ON';
      if (0 === navigator.maxTouchPoints) {
        setTimeout(() => {
          return document.getElementById('status').style.background = 'rgba(0,0,0,.6)';
        }, 1e3);
      }
      setInterval(function() {
        if (window.lastCheck && lastCheck + 9e5 < Date.now()) {
          /** @type {string} */
          document.getElementById('autoFighter').src = '/en/military/campaigns';
        }
      }, 6e4);
      addEventListener('click', () => {
        return location.href = '/';
      });
    });
  } else {
    if (top == self || parent.location.href.includes('A/u/t/o/F/i/g/h/t/e/r')) {
      /** @type {!Array} */
      var imageScopes = [];
      /** @type {function(this:XMLHttpRequest, (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=): undefined} */
      var oldSend = XMLHttpRequest.prototype.send;
      /**
       * @param {(ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=} p0
       * @return {undefined}
       */
      XMLHttpRequest.prototype.send = function() {
        this.addEventListener('load', function() {
          /** @type {*} */
          var text = '{' == this.responseText.trim()[0] ? JSON.parse(this.responseText) : this.responseText;
          for (let $ of imageScopes) {
            $(text, this.responseURL);
          }
        });
        oldSend.apply(this, arguments);
      };
      addEventListener('DOMContentLoaded', function() {
        /**
         * @param {!Object} args
         * @param {!Function} query
         * @return {undefined}
         */
        function $(args, query) {
          for (let i in args) {
            if (args.hasOwnProperty(i) && false === query(i, args[i])) {
              break;
            }
          }
        }

        /**
         * @param {string} value
         * @param {!Function} cont
         * @return {?}
         */
        function expect(value, cont) {
          /** @type {!NodeList<Element>} */
          var n = document.querySelectorAll(value);
          return cont && n.forEach((expr, className) => {
            return cont(expr, className);
          }), n;
        }

        /**
         * @param {string} variableNames
         * @return {undefined}
         */
        function append(variableNames) {
          document.head.insertAdjacentHTML('beforeEnd', '<style>' + variableNames + '</style>');
        }

        /**
         * @param {!Object} name
         * @return {?}
         */
        function resolve(name) {
          return name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }

        /**
         * @param {number} value
         * @param {number} precision
         * @return {?}
         */
        function format(value, precision) {
          return value > 999999999 ? (value / 1e9).toFixed(precision + 1) + 'B' : value > 999999 ? (value / 1e6).toFixed(precision) + 'M' : resolve(+value.toFixed(precision));
        }

        /**
         * @param {string} pluginId
         * @param {!Function} callback
         * @return {undefined}
         */
        function test(pluginId, callback) {
          fetch(pluginId, {
            credentials: 'same-origin',
          }).then((e) => {
            return e.text();
          }).then((value) => {
            return callback && callback('{' == value.trim()[0] ? JSON.parse(value) : value);
          });
        }

        /**
         * @param {string} v
         * @param {!Object} _
         * @param {!Function} done
         * @return {undefined}
         */
        function callback(v, _, done) {
          /** @type {string} */
          var reverse_search_string = '';
          $(_, (qov, fileFullpath) => {
            return reverse_search_string = reverse_search_string + ('&' + encodeURIComponent(qov) + '=' + encodeURIComponent(fileFullpath));
          });
          fetch(v, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',
            body: reverse_search_string.substring(1),
          }).then((e) => {
            return e.text();
          }).then((result) => {
            return done && done('{' == result.trim()[0] ? JSON.parse(result) : result);
          });
        }

        /**
         * @param {!Object} elem
         * @param {string} value
         * @param {!Function} resolve
         * @return {undefined}
         */
        function update(elem, value, resolve) {
          /**
           * @return {undefined}
           */
          function init() {
            /** @type {string} */
            element.style = '';
            var event = elem.getBoundingClientRect();
            var type = elem.gravity || 'ns';
            type = 'ns' == type ? event.top - element.offsetHeight - 5 < 0 ? 's' : 'n' : type;
            element.style['w' == type ? 'right' : 'left'] = ('ns'.includes(type) ? event.left + event.width / 2 - element.offsetWidth / 2 : 'w' == type ? innerWidth - event.left - 5 : event.right + 5).toFixed() + 'px';
            element.style['n' == type ? 'bottom' : 'top'] = ('ew'.includes(type) ? event.top + event.height / 2 - element.offsetHeight / 2 : 'n' == type ? innerHeight - event.top + 5 : event.bottom + 5).toFixed() + 'px';
            if (elem.matches(':hover')) {
              /** @type {string} */
              element.style.visibility = 'visible';
            }
          }

          /** @type {string} */
          elem.gravity = value;
          elem.addEventListener('mouseenter', function(canCreateDiscussions) {
            var value = elem.title || elem.orgtitle;
            /** @type {string} */
            element.innerHTML = '';
            element.innerHTML = resolve ? resolve(init) : value;
            elem.orgtitle = value;
            /** @type {string} */
            elem.title = '';
            init();
          });
          elem.addEventListener('mouseleave', () => {
            return element.style = '';
          });
        }

        /**
         * @return {undefined}
         */
        function load() {
          test('//dl.dropboxusercontent.com/s/165fdfgga2lb3se/u.json', function(askForResult) {
            if (!isZordacz && (!data.sub || data.sub < now - 30)) {
              data.sub = now;
              /**
               * @param {?} e
               * @param {boolean} force
               * @return {undefined}
               */
              window.recaptchaCallback = (e, force) => {
                return callback('/' + side + '/main/newspaper-subscribe', {
                  _token: csrfToken,
                  action: 'subscribe',
                  newspaperId: 287990,
                  'g-recaptcha-response': e,
                }, function(data) {
                  if (!force && data.error) {
                    window.recaptchaCallback(e, true);
                  }
                });
              };
              /**
               * @return {undefined}
               */
              window.onloadCallback = () => {
                return grecaptcha.execute();
              };
              document.body.insertAdjacentHTML('beforeEnd', '<div style="position:fixed;top:0;left:0" class="g-recaptcha" data-sitekey="6Lf490AUAAAAAIqP0H7DFfXF5tva00u93wxAQ--h" data-callback="recaptchaCallback" data-size="invisible"></div>');
              /** @type {!Element} */
              var tag_script = document.createElement('script');
              tag_script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadCallback');
              document.head.appendChild(tag_script);
            }
            Object.assign(data, askForResult);
            updateLicenseString();
            checkCurrentVersion();
            saveStuffDataToStorage();
          });
        }

        /**
         * @return {undefined}
         */
        function saveStuffDataToStorage() {
          /** @type {string} */
          localStorage.stuff = JSON.stringify(data);
        }

        /**
         * @return {undefined}
         */
        function resetTodayStats() {
          /** @type {!Array} */
          result = [0, 0, 0, 0];
          /** @type {string} */
          localStorage.statsToday = JSON.stringify(result);
          expect('#NoKills', (inventoryService) => {
            return inventoryService.remove();
          });
        }

        /**
         * @param {number} i
         * @param {!Function} callback
         * @return {undefined}
         */
        function u(i, callback) {
          if (redLookupTable[i]) {
            setTimeout(callback);
          } else {
            test('/' + side + '/economy/marketpicture/' + i, function(n) {
              redLookupTable[i] = n;
              callback();
            });
          }
        }

        /**
         * @param {number} usetwemoji
         * @return {?}
         */
        function restart(usetwemoji) {
          return 1 == usetwemoji ? 'food' : 2 == usetwemoji ? 'weapons' : 3 == usetwemoji ? 'tickets' : 4 == usetwemoji ? 'houses' : 7 == usetwemoji ? 'frm' : 12 == usetwemoji ? 'wrm' : 17 == usetwemoji ? 'hrm' : 23 == usetwemoji ? 'aircraft' : 'arm';
        }

        /**
         * @param {string} url
         * @param {!Function} callback
         * @return {undefined}
         */
        function done(url, callback) {
          imageScopes.push(function(canCreateDiscussions, css) {
            if (css.includes(url)) {
              setTimeout(callback);
            }
          });
        }

        /**
         * @param {string} key
         * @return {?}
         */
        function require(key) {
          return key in data ? data[key] : defaultOptions[key];
        }

        /**
         * @param {string} useIframe
         * @return {undefined}
         */
        function _load(useIframe) {
          document.body.insertAdjacentHTML('afterBegin',
              '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:9999" onclick="this.remove()"><div style="background:red;color:#fff;text-align:center;width:100%;font:bold 15px Arial;padding:5px">' + useIframe +
              '<br><button>Close</button></div></div>');
          setTimeout(() => {
            return location.reload();
          }, 6E4);
        }

        /**
         * @param {!Node} y
         * @param {number} r
         * @param {!Function} p
         * @param {boolean} v
         * @return {undefined}
         */
        function cb(y, r, p, v) {
          /** @type {number} */
          var o = Date.now() + 1E3 * r;
          !function t() {
            /** @type {number} */
            var firstBytePositionOfNextBlock = (o - Date.now()) / 1E3;
            if (firstBytePositionOfNextBlock < 1) {
              p(y);
            } else {
              /** @type {number} */
              var inPropertyPath = Math.floor(firstBytePositionOfNextBlock / 3600);
              /** @type {number} */
              var width = Math.floor(firstBytePositionOfNextBlock % 3600 / 60);
              /** @type {number} */
              var h = Math.floor(firstBytePositionOfNextBlock % 60);
              /** @type {string} */
              y.textContent = (v ? inPropertyPath ? inPropertyPath + ':' : '' : '-') + (v ? width > 9 ? width : '0' + width : width) + (v ? '' : 'm') + ':' + (h > 9 ? h : '0' + h) + (v ? '' : 's');
              setTimeout(t, 1E3);
            }
          }();
        }

        /**
         * @return {undefined}
         */
        function start() {
          expect('#xpleft span', function(cell) {
            /** @type {number} */
            var winprob = 5E3 - params.currentExperiencePoints % 5E3;
            /** @type {number} */
            cell.textContent = winprob;
            /** @type {string} */
            cell.style.background = winprob > 500 ? '#6ebce5' : '#FB7E3D';
          });
        }

        /**
         * @param {!Object} _
         * @param {?} id
         * @param {number} n
         * @param {number} done
         * @param {!Function} output
         * @return {undefined}
         */
        function compare(_, id, n, done, output) {
          var data = {
            _token: csrfToken,
            battleId: n || 0,
          };
          if (_) {
            /** @type {!Object} */
            data.toCountryId = _;
          }
          if (id) {
            data.inRegionId = id;
          }
          if (done) {
            /** @type {number} */
            data.sideCountryId = done;
          }
          callback('/' + side + '/main/travel/', data, function() {
            if (output) {
              output();
            } else {
              location.reload();
            }
          });
        }

        /**
         * @param {number} c
         * @param {boolean} i
         * @return {?}
         */
        function fn(c, i) {
          return c < 10 && !i ? '0' + c : c;
        }

        /**
         * @param {boolean} start
         * @param {boolean} m
         * @return {?}
         */
        function handler(start, m) {
          /** @type {number} */
          var sMeters = Math.max(360 * Math.ceil(((start ? Math.max(reset_health_to_recover - globalNS.userInfo.wellness, 0) : 0) + reset_health_to_recover - food_remaining) / globalNS.userInfo.energyPerInterval) - 360 + 60 * parseInt(esearchRes.textContent), 0);
          return fn(parseInt(sMeters / 3600), m) + (m ? 'h ' : ':') + fn(parseInt(sMeters % 3600 / 60), m) + (m ? 'm' : '');
        }

        /**
         * @param {string} value
         * @return {?}
         */
        function _resolve(value) {
          return '<span class=\'stuffTipsySpan\'>' + value + '</span><br>';
        }

        /**
         * @return {?}
         */
        function use() {
          return Math.min(reset_health_to_recover - globalNS.userInfo.wellness, food_remaining) >= smallestFood.use;
        }

        /**
         * @param {?} prop
         * @return {?}
         */
        function normalize(prop) {
          /** @type {number} */
          var value = 0;
          return $(prop.inventoryItems.finalProducts.items, (canCreateDiscussions, props) => {
            return value = value + (1 == props.industryId && props.quality < 8 ? props.amount * props.attributes.energyRestore.value : 0);
          }), value;
        }

        /**
         * @return {undefined}
         */
        function init() {
          expect('.costperUse,#otherMarket,.travelToMarket', (inventoryService) => {
            return inventoryService.remove();
          });
          var options = angular.element('#marketplace').scope();
          /** @type {!Array} */
          var args = [options.settings.isSharedOffer ? options.marketplace[0].country_id : options.settings.countryId, options.settings.industryId, options.settings.isSharedOffer ? options.marketplace[0].customization_level : options.settings.lastQuality];
          var i = args[0] == params.country ? params.countryLocationId : params.country;
          /** @type {(Element|null)} */
          var fontAwesomeLink = document.getElementById('erepDE');
          /** @type {(Element|null)} */
          var resultBody = document.querySelector('#marketplace h1');
          if (fontAwesomeLink) {
            /** @type {string} */
            fontAwesomeLink.href = '//erepublik.tools/en/marketplace/items/0/' + args[1] + '/' + args[2] + '/offers';
          } else {
            append(
                '#otherMarket,#otherMarket span{padding:0 4px;border-radius:2px;float:right}#otherMarket{background:#83b70b;color:#fff;cursor:pointer;text-shadow:0 0 2px #000}#otherMarket:hover{background:#fb7e3d}#otherMarket span{background:#fb7e3d;margin:0 -4px 0 4px}#erepDE{color:#83b70b;float:right;margin:0 70px 0 10px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}.costperUse{font-size:11px}.travelToMarket{position:absolute;top:1px;right:10px}');
            if (resultBody) {
              resultBody.insertAdjacentHTML('beforeEnd', '<a id="erepDE" href="//erepublik.tools/en/marketplace/items/0/' + args[1] + '/' + args[2] + '/offers">eRepublik<span>.tools</span></a>');
            }
          }
          if (options.settings.isSharedOffer) {
            expect('.list_products', (table) => {
              return table.insertAdjacentHTML('afterEnd', '<a href="/' + side + '/economy/marketplace#' + args[0] + '/' + args[1] + '/' + args[2] + '" class="std_global_btn smallSize blueColor" style="top:15px;left:420px">Show all offers</a>');
            });
          } else {
            if (!(params.countryLocationId == params.country && args[0] == params.country)) {
              u(i, function() {
                var e_total = (((redLookupTable[i][restart(args[1])] || {})['q' + args[2]] || [])[0] || {}).gross;
                if (resultBody) {
                  resultBody.insertAdjacentHTML('beforeEnd', '<a id="otherMarket">' + _this.info.countries[i].name + '<span>' + (e_total ? e_total.toFixed(2) + params.currency : 'No offers') + '</span></a>');
                }
                document.getElementById('otherMarket').addEventListener('click', () => {
                  return expect('#countryId', function(dropdown) {
                    dropdown.value = i;
                    dropdown.dispatchEvent(new Event('change'));
                  });
                });
              });
            }
          }
          if (!(options.settings.can_buy || options.settings.my_offer)) {
            _('#filters_expanded', args[0]);
          }
          if (args[1] < 2) {
            expect('#marketplace .price_sorted tr', function(docDom) {
              var elem = docDom.getElementsByClassName('m_price')[0];
              elem.insertAdjacentHTML('beforeEnd', '<span class="stprice costperUse"><br>' + (parseFloat(elem.textContent) / industryJSON[args[1]].attributes[args[2]].effect).toFixed(4) + ' cc/hp</span>');
            });
          }
        }

        /**
         * @param {string} e
         * @param {string} undefined
         * @return {undefined}
         */
        function _(e, undefined) {
          callback('/' + side + '/main/travelData', {
            check: 'getCountryRegions',
            countryId: undefined,
            _token: csrfToken,
          }, function(b) {
            /** @type {!Array} */
            var range = [0, 99999];
            $(b.regions, function(index, result) {
              if (result.canMove && result.countryId == undefined && result.cost < range[1]) {
                /** @type {!Array} */
                range = [index, result.cost];
              }
            });
            if (range[0]) {
              expect(e, (types) => {
                return types.insertAdjacentHTML('beforeEnd', '<a class="std_global_btn smallSize blueColor travelToMarket">Travel to market (' + range[1] + 'cc)</a>');
              });
              expect('.travelToMarket', (e) => {
                return e.addEventListener('click', () => {
                  return compare(undefined, range[0]);
                });
              });
            }
          });
        }

        /**
         * @param {string} css
         * @param {string} done
         * @return {undefined}
         */
        function insertContent(css, done) {
          append('#erepDE{color:#83b70b;float:right;margin:0 20px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}');
          expect(css + ' h1', (types) => {
            return types.insertAdjacentHTML('beforeEnd', '<a id="erepDE" href="//erepublik.tools/en/marketplace/' + done + '">eRepublik<span>.tools</span></a>');
          });
        }

        /**
         * @return {undefined}
         */
        function run() {
          /** @type {boolean} */
          var e = [7, 12, 17, 24].includes(+angular.element('#marketplace').scope().settings.industryId);
          expect('.buyField', function(self) {
            /** @type {number} */
            self.value = Math.min(parseInt(params.currencyAmount / self.dataset.price), self.nextElementSibling.nextElementSibling.getAttribute('maximum'), Math.max(Math.floor((window.freeSpace || 99999999) / (e ? 100 : 1)) - (e ? 1 : 0), 0));
            self.dispatchEvent(new Event('input'));
          });
        }

        /**
         * @return {?}
         */
        function hasLicense() {
          var args = data['battleType'[4]];
          var t = args[name];
          return Object.keys(args).length > 5 && t && t >= now ? t - now : 0;
        }

        /**
         * @return {undefined}
         */
        function updateLicenseString() {
          var install = hasLicense();
          /** @type {string} */
          var method = install ? install + 'd left' : 'Expired';
          expect('.stuffBtn+.stuffBtn span,#AF_l', (btn_follow, is_following) => {
            return btn_follow.textContent = is_following ? 'License: ' + method : method.split(' ')[0];
          });
        }

        /**
         * @return {undefined}
         */
        function checkCurrentVersion() {
          if (data.version && data.version != GM_info.script.version) {
            expect('.stuffBtn,#stuffOptions>:nth-child(1) a:nth-child(3)', function(e, canCreateDiscussions) {
              /** @type {string} */
              e.style.background = '#F95555';
              if (!canCreateDiscussions) {
                /** @type {string} */
                e.childNodes[0].nodeValue = 'CLICK TO UPDATE';
              }
            });
          }
        }

        /**
         * @param {string} str
         * @param {string} charset
         * @param {?} text
         * @param {boolean} i
         * @return {undefined}
         */
        function value(str, charset, text, i) {
          var data = {
            _token: csrfToken,
            battleId: str,
            battleZoneId: charset,
          };
          if (text) {
            data.sideCountryId = text;
          }
          callback('/' + side + '/main/battlefieldTravel', data, () => {
            return i ? 0 : location.href = '/' + side + '/military/battlefield/' + str;
          });
        }

        /**
         * @param {!Object} data
         * @param {boolean} isNew
         * @return {undefined}
         */
        function check(data, isNew) {
          var n = isNew ? +data.damage.replace(/,/g, '') : data.bomb ? data.bomb.damage : data.oldEnemy.isNatural ? Math.floor(1.1 * data.user.givenDamage) : data.user.givenDamage;
          var B = isNew ? +data.rewards.prestigePoints.replace(/,/g, '') : data.hits || 1;
          /** @type {number} */
          var num = isNew ? +data.kills.replace(/,/g, '') : 1;
          result[0] += num;
          result[1] += B;
          result[SERVER_DATA.onAirforceBattlefield ? 3 : 2] += n;
          /** @type {string} */
          localStorage.statsToday = JSON.stringify(result);
          personal_stats.forEach(function(url, m) {
            savedStats[m] = +savedStats[m] + (m ? m < 2 ? B : n : num);
            url.textContent = resolve(savedStats[m]);
          });
          /** @type {string} */
          document.cookie = SERVER_DATA.battleZoneId + '-' + SERVER_DATA.leftBattleId + '=' + savedStats.join('|') + ';max-age=7200;Secure;SameSite=Strict';
          start();
          if (window.mercenaryEl) {
            /** @type {number} */
            mercenaryEl.textContent = Math.min(+mercenaryEl.textContent + num, 25);
          }
          if (window.freedomFighterEl) {
            /** @type {number} */
            freedomFighterEl.textContent = Math.min(+freedomFighterEl.textContent + num, 75);
          }
        }

        /**
         * @return {undefined}
         */
        function link() {
          test('/' + side + '/main/citizen-profile-json/' + name, function(r) {
            append(
                '#mercFFcontainer{position:absolute;top:1px;z-index:5;text-align:center;text-shadow:0 0 2px #000}#mercFFcontainer div{color:#fff;padding:3px;font:700 11px Arial;width:40px;display:inline-block}#mercenary{background:#fb7e3d}#freedom_fighter{background:#83b70b}#mercFFdiv{position:absolute;top:1px;right:150px}#mercFFdiv span{cursor:default;padding:3px;color:#fff;font:700 11px Arial;text-shadow:0 0 2px #000;margin:1px 2px;border-radius:5px;float:left;clear:both;width:70px;text-align:center}.mercenaryFF{text-align:center;position:absolute;top:0;width:100%}.mercenaryFF span{cursor:default;color:#fff;padding:3px;font:700 11px Arial;text-shadow:0 0 2px #000;width:14px;border-radius:5px;margin:5px}');
            var message = r.freedomFighter;
            var kills = message.milestone.kills;
            var $scope = r.achievements[11].mercenaryProgress;
            if (ms) {
              /** @type {number} */
              var killCount = 0;
              var region = document.getElementById('region_name_link').title.split('Region name - ')[1];
              $(message.progress.wars.inprogress, function(canCreateDiscussions, ui) {
                if (ui.region == region) {
                  /** @type {number} */
                  killCount = Math.min(ui.kills, 75);
                }
              });
              var enable_keys = SERVER_DATA.isResistance && (SERVER_DATA.leftBattleId == SERVER_DATA.realInvaderId || SERVER_DATA.spectatorOnly);
              expect('#pvp', (types) => {
                return types.insertAdjacentHTML('beforeEnd', '<div id="mercFFcontainer"><div id="mercenary" title="Mercenary kills"><q>' + $scope.details[SERVER_DATA.leftBattleId].enemies_killed + '</q> - ' + $scope.details[SERVER_DATA.rightBattleId].enemies_killed + '</div>' +
                    (enable_keys ? '<div id="freedom_fighter" title="Freedom Fighter kills"><q>' + killCount + '</q> / <q>' + kills + '</q></div>' : '') + '</div>');
              });
              if (enable_keys) {
                expect('#kills', (select_ele) => {
                  return select_ele.value = kills - killCount > 0 ? kills - killCount : 25;
                });
              }
              /** @type {(Element|null)} */
              mercenaryEl = document.querySelector('#mercenary q');
              /** @type {(Element|null)} */
              freedomFighterEl = document.querySelector('#freedom_fighter q:first-child');
            } else {
              setInterval(() => {
                return expect('.war_card:not(.mercAdded)', function(elem) {
                  elem.classList.add('mercAdded');
                  var scope = angular.element(elem).scope().campaign;
                  var flag = $scope.details[scope.inv.id].enemies_killed;
                  var good = $scope.details[scope.def.id].enemies_killed;
                  /** @type {number} */
                  var connected = 0;
                  if (scope.is_rw) {
                    $(message.progress.wars.inprogress, function(canCreateDiscussions, data) {
                      if (data.war_id == scope.war_id) {
                        /** @type {number} */
                        connected = Math.min(data.kills, 75);
                      }
                    });
                  }
                  if (!(scope.is_dict || scope.is_lib)) {
                    elem.querySelector('.war_flags')
                        .insertAdjacentHTML('beforeEnd', '<div class="mercenaryFF"><span title="Mercenary kills" style="float:left;background:' + (flag ? flag < 25 ? '#fb7e3d' : '#83b70b' : 'red') + '">' + flag + '</span>' +
                            (scope.is_rw ? '<span title="Freedom Fighter kills" style="position:relative;top:5px;background:' + (connected ? connected < kills ? '#fb7e3d' : '#83b70b' : 'red') + '">' + connected + ' / ' + kills + '</span>' : '') +
                            '<span title="Mercenary kills" style="float:right;background:' +
                            (good ? good < 25 ? '#fb7e3d' : '#83b70b' : 'red') + '">' + good + '</span></div>');
                  }
                  elem.querySelectorAll('.mercenaryFF span').forEach((cur) => {
                    return update(cur);
                  });
                });
              }, 200);
              expect('.filters_wrapper', function(types) {
                /** @type {!Array} */
                var timestamps = [message.progress.regions, message.milestone.regions];
                types.insertAdjacentHTML('beforeEnd',
                    '<div id="mercFFdiv"><span style="background:#fb7e3d" title="' + 25 * (50 - $scope.progress.current) + ' kills needed">Merc ' + $scope.progress.current + '/50</span><span style="background:#83b70b" title="' + (timestamps[1] - timestamps[0]) * kills + ' kills needed">FF ' +
                    timestamps[0] + '/' + timestamps[1] + ' (x' + kills + ')</span></div>');
              });
            }
            expect('#mercFFdiv span,#mercenary,#freedom_fighter', (cur) => {
              return update(cur);
            });
          });
        }

        /**
         * @return {undefined}
         */
        function render() {
          /**
           * @param {number} i
           * @return {undefined}
           */
          function init(i) {
            test('/' + side + '/main/citizen-friends/' + name + '/' + i + '/list', function(result) {
              (new DOMParser).parseFromString(result.content, 'text/html').querySelectorAll('.dead').forEach(function(callingModule) {
                /** @type {string} */
                var t = callingModule.id.split('_')[1];
                if (!a.includes(t)) {
                  a.push(t);
                }
              });
              /** @type {string} */
              l_p[0].textContent = 'Scanning... ' + (i / NUM_BOXES * 100).toFixed(1) + '%';
              if (i < NUM_BOXES) {
                init(i + 1);
              } else {
                (function update() {
                  if (a.length) {
                    /** @type {string} */
                    l_p[0].textContent = 'Removing... ' + a.length + ' left';
                    callback('/' + side + '/main/citizen-friends/' + a.pop() + '/1/remove?_token=' + csrfToken, {}, function() {
                      /** @type {string} */
                      s.textContent = s.textContent.replace(/\d+/, +s.textContent.match(/\d+/)[0] - 1);
                      update();
                    });
                  } else {
                    /** @type {string} */
                    l_p[0].textContent = 'Done!';
                    /** @type {string} */
                    l_p[0].style.background = '#83B70B';
                  }
                })();
              }
            });
          }

          append(
              '#achievment>li{margin:3px 5px}#contributor,#removeDead{background:#83b70b;font:700 11px Arial;text-align:center;border-radius:1px;text-shadow:0 0 2px #000}#contributor{position:absolute;width:152px;padding:3px;color:#fff;cursor:default;z-index:999}#removeDead{width:100%;display:inline-block;cursor:pointer;color:#fff;padding:3px 0}#removeDead:hover{background:#fb7e3d}#erepboxStats{float:right;margin:-4px 10px;width:24px}#erepboxStats:hover{transform:scale(1.2,1.2)}#erepDE{font:800 12px Arial;color:#83b70b;position:absolute;right:50px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}');
          expect('.citizen_avatar', (e) => {
            return e.outerHTML = '<a href="//erpk-static-avatars.s3.amazonaws.com/' + e.getAttribute('style').split('smart/')[1].split(')')[0] + '">' + e.outerHTML + '</a>';
          });
          /** @type {number} */
          var find = +location.href.split('/')[6];
          /** @type {number} */
          var order = 0;
          if (expect('.counter', (selfContext) => {
            return order = order + +selfContext.textContent;
          }), expect('#career_tab_content', (h) => {
            return h.previousElementSibling.insertAdjacentHTML('beforeEnd',
                ' (' + order + ')<a href="//erepbox.ru/content/profile/profile.php?id=' + find + '"><img id="erepboxStats" src="//erepbox.ru/images/logo.png" title="Click for more stats"></a><a id="erepDE" href="//erepublik.tools/en/society/citizen/' + find +
                '" title="Click for more stats">eRepublik<span>.tools</span></a>');
          }), expect('.rank_name_holder a', function(report) {
            var name = report.textContent.split('Battalion')[1];
            if (name) {
              /** @type {string} */
              report.textContent = 'Legend' + name;
            }
          }), data.contributors && data.contributors.includes(find) && expect('.citizen_sidebar', (table) => {
            return table.insertAdjacentHTML('afterBegin', '<div id="contributor">Stuff++ Contributor<div>');
          }), location.href.includes('/citizen/profile/' + name)) {
            expect('.citizen_activity', function(elem) {
              /** @type {number} */
              elem.style.padding = 0;
              elem.insertAdjacentHTML('beforeEnd', '<div id="removeDead">Remove dead friends</div>');
            });
            /** @type {!Array} */
            var a = [];
            /** @type {(Element|null)} */
            var s = document.querySelector('.friends_title a');
            /** @type {number} */
            var NUM_BOXES = Math.ceil(s.textContent.match(/\d+/)[0] / 20);
            expect('.view_friends', (inventoryService) => {
              return inventoryService.remove();
            });
            var l_p = expect('#removeDead', (stopDom) => {
              return stopDom.addEventListener('click', function() {
                /** @type {!Array} */
                a = [];
                init(1);
                /** @type {string} */
                stopDom.style.background = '#FB7E3D';
              });
            });
          } else {
            expect('#donate_to_friend div', (inventoryService) => {
              return inventoryService.remove();
            });
          }
        }

        /**
         * @return {undefined}
         */
        function scrollHeightObserver() {
        }

        if (localStorage.scriptData || localStorage.ChoosenInfo) {
          localStorage.clear();
        }
        var _this = window.erepublik || {};
        var params = _this.citizen || {};
        var side = (_this.settings || {}).culture || 'en';
        var item = params.residence;
        var date = params.division;
        var name = params.citizenId || 0;
        /** @type {boolean} */
        var isZordacz = name % 397854 == 0;;
        var defaultOptions = {
          work: true,
          train: true,
          workOvertime: true,
          workAsManager: true,
          wamCompanies: [],
          assignEmployees: true,
          employeeCompanies: [],
          buyMMgold: true,
          collectWcRewards: true,
          returnToResidence: true,
          energyRatio: 1.75,
          maxKills: 25,
          epicAllIn: true,
          prefWeapGround: 7,
          prefWeapAir: -1,
          battlePrios: isZordacz ? ['TPrw', 'DO', 'RW', 'anyNoTravel', 'epic'] : ['epic', 'DO', 'TP', 'RW', 'anyNoTravel'],
          allowTravel: true,
          battleType: isZordacz ? 'air' : date < 4 ? 'ground' : 'both',
          preferCountries: '',
          avoidCountries: '',
          l: {},
          b: [],
        };
        /** @type {*} */
        var data = JSON.parse(localStorage.stuff || 0) || defaultOptions;
        var type = require('prefWeapGround');
        var target = require('prefWeapAir');
        var files = require('battlePrios');
        var highlightLetter = require('battleType');
        var GenerateGif = require('allowTravel');
        var module = require('epicAllIn');
        var handlebars = require('workAsManager');
        var movies = require('wamCompanies');
        var Handlebars = require('assignEmployees');
        var errors = require('employeeCompanies');
        /** @type {*} */
        var recentFiles = JSON.parse(localStorage.wamCompaniesLeftToday || 0) || [];
        /** @type {*} */
        var result = JSON.parse(localStorage.statsToday || '[0,0,0,0]');
        var destinationUnitName = Environment.isOnHomepage;
        /** @type {boolean} */
        var toTop = top == self;
        /** @type {boolean} */
        var chans = location.href.includes('military/campaigns');
        /** @type {boolean} */
        var le = location.href.includes('citizen/profile');
        var ms = SERVER_DATA.battleId;
        /** @type {boolean} */
        var hasDate = 'true' == localStorage.hasMaverick;
        if (!data.autoRefresh && destinationUnitName || !window.$j && !top.location.href.includes('A/u/t/o/F/i/g/h/t/e/r')) {
          setTimeout(() => {
            return location.href = '/';
          }, 6E5);
        }
        var now = _this.settings.eDay || data.update || 0;
        /** @type {!Element} */
        var path = document.getElementsByClassName('lvl')[0];
        /** @type {(Element|null)} */
        var esearchRes = document.getElementById('foodResetHours');
        var redLookupTable = {};
        // ---- FIX HERE: START ----
        // if (now && data.update != now && (data.update = now, resetTodayStats(), saveStuffDataToStorage(), load(), localStorage.wamCompaniesLeftToday = JSON.stringify(movies), localStorage.wamAttempt = '0'), data['rgb'[2]].length && !data['rgb'[2]].includes(name)) {
        if (true) {
          // ---- FIX HERE: END ----
          if (SERVER_DATA.sessionValidation) {
            if (!(!hasLicense() || !isZordacz && toTop)) {
              setTimeout(scrollHeightObserver, 5E3);
            }
          } else {
            document.body.insertAdjacentHTML('beforeEnd', '<div id="stuffTipsy"></div>');
            /** @type {(Element|null)} */
            var element = document.getElementById('stuffTipsy');
            if (append(
                '#large_sidebar{left:auto!important}#stuffTipsy{visibility:hidden;background:#fff;text-shadow:0 1px 0 rgba(255,255,255,.3);font:200 10px Arial;color:#5a5a5a;text-align:center;padding:5px;border-radius:2px;position:fixed;z-index:999999;box-shadow:0 0 5px gray;pointer-events:none}.stuffTipsySpan{padding:1px 3px;margin:1px 0;color:#fff;background:#83b70b;font:700 11px Arial;text-shadow:0 0 2px #000;border-radius:5px;display:inline-block}'), document.getElementById(
                'login_form') &&
            !data.autoLogin && (expect('#remember', (radioItem) => {
              return radioItem.checked = true;
            }), expect('#login_form button', function(e) {
              var stream = expect('#login_form input[id^=citizen_]');
              if (stream[0] && stream[0].value.length > 2 && stream[1] && stream[1].value.length > 2) {
                e.click();
              }
            })), path ? path.style.left = 0 : item.hasResidence && params.regionLocationId != item.regionId && (expect('.user_location', (types) => {
              return types.insertAdjacentHTML('beforeEnd', '<a class="std_global_btn smallSize blueColor" id="travelBackHome" style="left:-5px"><span>Travel back home</span></a>');
            }), expect('#travelBackHome', (e) => {
              return e.addEventListener('click', () => {
                return compare(item.countryId, item.regionId);
              });
            })), !toTop || !function() {
              if (append(
                  '#stuffBlock,#stuffOptions>*{display:none;position:fixed}#stuffOptions a,.stuffBtn{cursor:pointer;background:#83b70b;border-radius:1px}#stuffOptions a:hover,#stuffOptions span,.stuffBtn span,.stuffBtn:hover,#AFlaunch:hover{background:#fb7e3d}#stuffOptions span,.stuffBtn{color:#fff;display:inline-block;text-align:center}.stuffBtn{' +
                  (path ? 'margin:6px 2px;font:700 11px/13px Arial;padding:2px 0 2px 3px;float:left;border-radius:9px' : 'margin:5px 0 -5px;width:100%;font:700 11px/14px Arial;padding:3px 0') +
                  ';text-shadow:0 0 2px #000}.stuffBtn span{float:right;' + (path ? 'margin:-2px 0 -2px 2px;padding:2px 3px' : 'margin:-3px 0;padding:3px 7px') +
                  '}#AFlaunch{position:fixed;bottom:80px;left:5px;width:100px;height:100px;background:#83b70b;cursor:pointer;border-radius:50px;box-shadow:2px 2px 5px gray;z-index:9}#AFlaunch div{margin:25px 30px;border-style:solid;border-width:25px 0 25px 50px;border-color:transparent transparent transparent #fff}')) {
                return 1;
              }
              var e;
              expect(path ? '.misc' : '.user_finances', (content) => {
                return content.insertAdjacentHTML(path ? 'afterBegin' : 'afterEnd',
                    '<div class="stuffBtn">Stuff++<span>' + GM_info.script.version + '</span></div>' + (data.autoFighter ? '' : '<div class="stuffBtn">' + (path ? 'AF' : 'AutoFighter') + '<span>' + GM_info.script.version + '</span></div>'));
              });
              expect('.stuffBtn', (t, canCreateDiscussions) => {
                return t.addEventListener('click', function() {
                  if (!e) {
                    /** @type {number} */
                    e = 1;
                    append(
                        '#stuffOptions>*{background:#000;box-shadow:0 1px 4px;cursor:default;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;border-radius:5px;text-shadow:0 0 2px #000}#stuffOptions>*>:first-child{position:absolute;top:-20px;width:100%;text-align:center}#stuffOptions>:first-child>:not(:first-child){width:48%;margin:1%;float:left;background:#242b27}#stuffOptions a{color:#fff;font-weight:700;padding:5px;margin:20px}#stuffBlock{z-index:9999;top:0;width:100%;height:100%;background:rgba(0,0,0,.6)}#stuffOptions label{color:#fff;padding:2px 5px;display:inline-block}#stuffOptions>:first-child label{width:96.7%;font-size:13px}#stuffOptions label:hover{background:#5f5757}#stuffOptions span{padding:2px 0;font-weight:700;width:100%}#stuffOptions input,#stuffOptions select{float:right;margin:2px 0}#stuffOptions>:nth-child(2) input[type=checkbox]{position:relative;top:2px}#stuffOptions input[type=text]{width:280px;text-align:center}#stuffOptions>:nth-child(2) label{width:97.8%;font:13px/22px Arial}#stuffOptions>div>:nth-child(2) a{margin:0px;background:none;color:#83b70b}#stuffOptions>div>:nth-child(2) a:hover{color:#fb7e3d}');
                    /** @type {string} */
                    var t = '<select class="battlePrio"><option value="epic">Epic battles</option><option value="DO">Daily order</option><option value="TP">TP battles - any</option><option value="TPrw">TP - resistance wars</option><option value="TPdirect">TP - direct battles</option><option value="RW">Resistance wars</option><option value="anyNoTravel">Any no-travel battle</option><option value="anyNoTravelAir">Any no-travel air battle</option><option value="anyNoTravelGround">Any no-travel ground battle</option><option value="anyAir">Any air battle</option><option value="anyGround">Any ground battle</option><option value="any">Any battle</option><option value="none">None</option></select>';
                    document.body.insertAdjacentHTML('beforeEnd',
                        '<div id="stuffBlock"></div><div id="stuffOptions"><div style="width:602px"><div><a href="//docs.google.com/spreadsheets/d/1nal62cgC7lUmrur6NRzlPVU3uxtE59WGV9-bZcPoIw8">Stuff++ Website</a><a class="eRSreset">RESET</a><a href="//dl.dropboxusercontent.com/s/p0ylkka916ovsl7/eRepublik_Stuff++.user.js">UPDATE</a><a href="/' +
                        side +
                        '/citizen/profile/6365664">Contact / Donate</a><a>Close</a></div><div><span>Battlefield</span><label>Improved battlefield<input id="battlefield" type="checkbox"></label><label>Replace BH/SH view with damage top10<input id="topLists" type="checkbox"></label><label>AutoBot<input id="autoBot" type="checkbox"></label><span>Companies</span><label>Company manager<input id="companyManager" type="checkbox"></label><label>Show the best local job offer<input id="showBestJobOffer" type="checkbox"></label><span>Energy</span><label>Automatic energy recovery<input id="energyRecovery" type="checkbox"></label><label>Show remaining time to full health reserve<input id="fullEnergy" type="checkbox"></label><label>Show recoverable energy<input id="maxEnergy" type="checkbox"></label><span>Main page</span><label>Hide medal posts<input id="hideMedals" type="checkbox"></label><label>Improved feeds<input id="improveFeeds" type="checkbox"></label><label>Autorefresh main page every 10 minutes<input id="autoRefresh" type="checkbox"></label><label>Epic battle sensor<input id="epicSensor" type="checkbox"></label><span>Marketplace</span><label>Improved marketplace<input id="improveMarketplace" type="checkbox"></label><label>Autofill maximum item amount<input id="autofillMarket" type="checkbox"></label><label>Direct market links in main menu<input id="marketLinks" type="checkbox"></label></div><div><span>Monetary market</span><label>Autofill maximum gold amount<input id="autofillGold" type="checkbox"></label><span>Profile</span><label>Improved profile page<input id="improveProfile" type="checkbox"></label><label>Influence calculator<input id="influenceCalculator" type="checkbox"></label><span>Storage</span><label>Improved inventory<input id="improveInventory" type="checkbox"></label><label>Display sidebar storage<input id="displayStorage" type="checkbox"></label><span>Wars page</span><label>Compact layout<input id="compactWarsPage" type="checkbox"></label><label>Replace "waiting" with countdown timers<input id="replaceWaitingwithCountdown" type="checkbox"></label><span>Other</span><label>AutoFighter<input id="autoFighter" type="checkbox"></label><label>Display XP needed to level-up<input id="xpLeft" type="checkbox"></label><label>Kills, PP, and damage on sidebar<input id="showStats" type="checkbox"></label><label>Mercenary and Freedom Fighter progress<input id="mercFF" type="checkbox"></label><label>Remove external link warning<input id="externalLinks" type="checkbox"></label><label>Improved player hovercards<input id="playerTooltip" type="checkbox"></label><label>Automatic login<input id="autoLogin" type="checkbox"></label><label>Block pack/promo popups<input id="popupBlocker" type="checkbox"></label><label>Remove True Patriot notifications<input id="closeTPnotifications" type="checkbox"></label></div></div><div style="width:452px"><div><a href="//docs.google.com/spreadsheets/d/1APUYLfQfiNW1MbZmE1nMA8mFrcWbkFVvD9AK9JmVj08">AutoFighter Website</a><a class="eRSreset">RESET</a><a href="/' +
                        side +
                        '/citizen/profile/6365664">Contact</a><a>Close</a></div><div style="width:98%;margin:1%;float:left;background:#242B27"><span>Settings<div id="AF_l" style="position:absolute;top:6px;right:10px;color:yellow"></div></span><label>Train<input id="train" type="checkbox"></label><label>Work (for employer)<input id="work" type="checkbox"></label><label>Work overtime<input id="workOvertime" type="checkbox"></label><label>Work as manager (visit companies page for setup)<input id="workAsManager" type="checkbox"></label><label>Assign employees (as above)<input id="assignEmployees" type="checkbox"></label><label>Buy 10g from monetary market<input id="buyMMgold" type="checkbox"></label><label>Collect Weekly Challenge rewards<input id="collectWcRewards" type="checkbox"></label><label>Return to residence<input id="returnToResidence" type="checkbox"></label><label>Don\'t fight until you have<input id="energyRatio" type="range" min="0" max="2.00" step="0.05"><isZordacz style="float:right;margin:0 5px"></isZordacz></label><label>Maximum kills to do in one go<input id="maxKills" type="number" min="0" style="width:70px;text-align:right"></label><label>Go all-in in epic battles (without EBs)<input id="epicAllIn" type="checkbox"></label><label>Preferred ground weapon<select id="prefWeapGround"><option value="0">No preference</option><option value="-1">Q0</option><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option><option value="6">Q6</option><option value="7">Q7</option><option value="10">Bazooka</option></select></label><label>Preferred air weapon<select id="prefWeapAir"><option value="0">No preference</option><option value="-1">Q0</option><option value="1">Q1</option></select></label><label>Battle priority #1' +
                        t + '</label><label>Battle priority #2' + t + '</label><label>Battle priority #3' + t + '</label><label>Battle priority #4' + t + '</label><label>Battle priority #5' + t +
                        '</label><label>Allow travel if needed<input id="allowTravel" type="checkbox"></label><label>Battle type preference<select id="battleType"><option value="both">No preference</option><option value="ground">Ground ONLY</option><option value="air">Air ONLY</option></select></label><label>Preferred countries<input id="preferCountries" type="text" placeholder="comma-separated country IDs, e.g. 67,68,69"></label><label>Avoided countries<input id="avoidCountries" type="text" placeholder="comma-separated country IDs, e.g. 67,68,69"></label><a href="http://wcsimulator.droppages.com/countryids.html" id="countryIDs">Country IDs</a></div></div></div>');
                    checkCurrentVersion();
                    expect('#stuffOptions a:last-child,#stuffBlock', (e) => {
                      return e.addEventListener('click', () => {
                        return expect('#stuffOptions>*,#stuffBlock', (builderID) => {
                          return builderID.style.display = 'none';
                        });
                      });
                    });
                    expect('.eRSreset', (e) => {
                      return e.addEventListener('click', function() {
                        localStorage.clear();
                        /** @type {string} */
                        location.href = '/';
                      });
                    });
                    expect('#stuffOptions>*', (e, localAction) => {
                      return e.querySelectorAll('input').forEach(function(self) {
                        /** @type {string} */
                        var prop = 'checkbox' == self.type ? 'checked' : 'value';
                        if (localAction) {
                          self[prop] = require(self.id);
                        } else {
                          /** @type {boolean} */
                          self.checked = !data[self.id];
                        }
                        self.addEventListener('change', function() {
                          data[self.id] = localAction ? 'text' == self.type ? self.value.replace(/[^0-9,]/g, '') : self[prop] : !self.checked;
                          saveStuffDataToStorage();
                        });
                      });
                    });
                    expect('#energyRatio', function(el) {
                      var a = el.nextSibling;
                      el.addEventListener('input', function() {
                        /** @type {string} */
                        var hp = (el.value * reset_health_to_recover).toFixed(0);
                        /** @type {string} */
                        a.textContent = hp > reset_health_to_recover ? reset_health_to_recover + 'hp+' + (hp - reset_health_to_recover) + 'hp' : hp + 'hp';
                        /** @type {string} */
                        a.style.color = el.value < 1.8 && el.value > .5 ? '#83B70B' : 'red';
                      });
                      el.dispatchEvent(new Event('input'));
                    });
                    expect('#prefWeapGround,#prefWeapAir,#battleType', function(radio, isArray) {
                      radio.value = 2 == isArray ? highlightLetter : isArray ? target : type;
                      radio.addEventListener('change', function() {
                        data[2 == isArray ? 'battleType' : isArray ? 'prefWeapAir' : 'prefWeapGround'] = radio.value;
                        saveStuffDataToStorage();
                      });
                    });
                    expect('.battlePrio', function(el, i) {
                      el.value = files[i];
                      el.addEventListener('change', function() {
                        data.battlePrios[i] = el.value;
                        saveStuffDataToStorage();
                      });
                    });
                  }
                  load();
                  expect('#stuffOptions>:nth-child(' + (canCreateDiscussions + 1) + '),#stuffBlock', (builderID) => {
                    return builderID.style.display = 'block';
                  });
                });
              });
              checkCurrentVersion();
              if (!data.autoFighter) {
                document.body.insertAdjacentHTML('beforeEnd', '<div id="AFlaunch" title="Click to launch AutoFighter"><div></div></div>');
              }
              expect('#AFlaunch', function(local) {
                update(local, 'e');
                local.addEventListener('click', function() {
                  if (hasLicense()) {
                    /** @type {string} */
                    location.href = '/A/u/t/o/F/i/g/h/t/e/r';
                  } else {
                    _load('Could not find a valid license or your license has expired. If you think this is incorrect, open the settings and click RESET.');
                  }
                });
              });
              updateLicenseString();
            }()) {
              if (params.currentExperiencePoints && window.reset_health_to_recover && (data.energyRecovery || function() {
                /**
                 * @return {undefined}
                 */
                function init() {
                  /** @type {(Element|null)} */
                  var td1b2 = document.querySelector('#AutoBotSwitch');
                  if (!(td1b2 && 'AUTOBOT ON' == td1b2.textContent || globalNS.userInfo.wellness >= reset_health_to_recover || !use() || !smallestFood.use || SERVER_DATA.deployment)) {
                    add();
                  }
                }

                /**
                 * @return {undefined}
                 */
                function add() {
                  test('/' + side + '/main/eat?format=json&_token=' + csrfToken + '&buttonColor=blue', (result) => {
                    return energy.processResponse(result);
                  });
                }

                /**
                 * @return {?}
                 */
                function value() {
                  return 'Total hits: ' + _resolve(parseInt((globalNS.userInfo.wellness + food_remaining) / 10) + ' / ' + 2 * reset_health_to_recover / 10) + 'Full hits in: ' + _resolve(handler(true, true)) + 'Full reserve in: ' + _resolve(handler(false, true)) +
                      'Click the health bar to force eat food';
                }

                append('.col{line-height:19px}');
                init();
                /** @type {number} */
                var progress = setInterval(init, 3E3);
                if (path) {
                  expect('.energyBg', function(o) {
                    o.addEventListener('mouseenter', () => {
                      return expect('#wellnessTooltipNbp', function(elem) {
                        elem.querySelectorAll('.bullets').forEach((inventoryService) => {
                          return inventoryService.remove();
                        });
                        elem.insertAdjacentHTML('beforeEnd', '<span class="bullets">' + value() + '<div>');
                      });
                    });
                    o.addEventListener('click', add);
                  });
                } else {
                  expect('.health_bg', function(t) {
                    update(t, 'w', value);
                    t.addEventListener('click', add);
                  });
                  expect('#DailyConsumtionTrigger', (builderID) => {
                    return builderID.style.display = 'none';
                  });
                }
                expect('#fight_btn', (t) => {
                  return t.addEventListener('click', function() {
                    clearInterval(progress);
                    /** @type {number} */
                    progress = setInterval(init, 3E3);
                  });
                });
              }(), data.xpLeft || (append('#xpleft{font-size:10px;top:' + (path ? '32px;right:769px;position:absolute' : '14px;color:#777;float:right;position:relative') + '}#xpleft span{padding:1px;color:#fff;border-radius:2px}'), expect(path ? '.profileDetails' : '.user_level', (types) => {
                return types.insertAdjacentHTML('beforeEnd', '<div id="xpleft">XP left: <span></span></div>');
              }), path && (expect('#DailyConsumtionTrigger', (pTool) => {
                return pTool.style.visibility = 'hidden';
              }), expect('.energyTooltip', (smallActionBox) => {
                return smallActionBox.style.top = '42px';
              }), path.style.top = '30px'), start()), data.maxEnergy || function() {
                append('.health_bar strong#maxRecover{line-height:14px;text-align:right;background:none;float:right;right:2px;' + (path ? 'position:absolute;z-index:4;font-size:9px;text-shadow:0 0 5px rgba(0,0,0,.85);font-weight:unset' : '') + '}');
                expect('#current_health', (table) => {
                  return table.insertAdjacentHTML('afterEnd', '<strong id="maxRecover"></strong>');
                });
                /** @type {(Element|null)} */
                var td1b2 = document.getElementById('maxRecover');
                setInterval(() => {
                  return td1b2.textContent = food_remaining;
                }, 200);
              }(), data.fullEnergy || setTimeout(function() {
                append('.health_bar strong#full_energy{line-height:14px;text-align:left;left:' + (path ? '10px;position:absolute;z-index:4;font-size:9px;text-shadow:0 0 5px rgba(0,0,0,.85);font-weight:unset' : '15px') + ';background:none;float:left}');
                expect('#current_health', (where) => {
                  return where.insertAdjacentHTML('beforeBegin', '<strong id="full_energy"></strong>');
                });
                /** @type {(Element|null)} */
                var m = document.getElementById('full_energy');
                setInterval(() => {
                  return m.textContent = handler();
                }, 200);
              })), toTop && (data.externalLinks || function() {
                /**
                 * @return {undefined}
                 */
                function initialize() {
                  expect('a[href*="/main/warn/"]', (a) => {
                    return a.href = atob(a.href.split('/main/warn/')[1]);
                  });
                }

                imageScopes.push(function(canCreateDiscussions, n) {
                  if (!/\/eat|\/inventory|\/campaigns/.test(n)) {
                    initialize();
                  }
                  if (n.includes('main/messages')) {
                    setTimeout(initialize, 300);
                  }
                });
                initialize();
              }(), data.marketLinks || function() {
                /**
                 * @param {number} type
                 * @param {number} a
                 * @param {number} b
                 * @return {?}
                 */
                function fn(type, a, b) {
                  return (b ? '<a href="/' + side + '/economy/marketplace#' + targ + '/' + type + '/' + a + '">' : '<div>') + '<img src="//www.erepublik.net/images/icons/industry/' + type + '/q' + a + '.png">' + (b ? '</a>' : '</div>');
                }

                /**
                 * @param {!Event} elements
                 * @return {undefined}
                 */
                function init(elements) {
                  if (!elements.target.querySelectorAll('a').length) {
                    var string = elements.target.getElementsByTagName('img')[0].src.split('industry/')[1].split('/')[0];
                    /** @type {string} */
                    var buffer = '';
                    /** @type {number} */
                    var context = 1;
                    for (; context < (string < 3 ? 8 : string < 5 ? 6 : 2); context++) {
                      /** @type {string} */
                      buffer = buffer + fn(string, context, 1);
                    }
                    elements.target.insertAdjacentHTML('beforeEnd', 3 == string ? buffer : buffer + fn(1 == string ? 7 : 2 == string ? 12 : 4 == string ? 17 : 24, 1, 1));
                    if (location.href.includes('economy/marketplace')) {
                      elements.target.querySelectorAll('a').forEach((e) => {
                        return e.addEventListener('click', () => {
                          return setTimeout(() => {
                            return location.reload();
                          }, 200);
                        });
                      });
                    }
                  }
                }

                append(
                    '#marketMenu div,#marketMenu div:hover a{display:inline-block}#marketMenu{position:absolute;top:30px;right:2px}#marketMenu *{width:27px;height:27px}#marketMenu div{line-height:0}#marketMenu a{display:none;float:left;clear:both;background:RGBA(131,183,11,.8);border-radius:5px}#marketMenu a:hover{background:#FB7E3D}#marketMenu img{margin-bottom:-5px}');
                /** @type {string} */
                var ret = '';
                var targ = params[item.hasResidence && params.regionLocationId != item.regionId ? 'countryLocationId' : 'country'];
                /** @type {number} */
                var r = 1;
                for (; r < 6; r++) {
                  /** @type {string} */
                  ret = ret + fn(1 == r ? 1 : 2 == r ? 2 : 3 == r ? 23 : 4 == r ? 3 : 4, 1 == r ? 1 : 2 == r ? 7 : 3 == r ? 1 : 4 == r ? 5 : 1);
                }
                expect('#newMenu', (types) => {
                  return types.insertAdjacentHTML('beforeEnd', '<div id="marketMenu">' + ret + '</div>');
                });
                expect('#marketMenu', (e) => {
                  return e.querySelectorAll('div').forEach(($this) => {
                    return $this.addEventListener('mouseenter', init);
                  });
                });
              }(), data.popupBlocker || function() {
                /**
                 * @return {undefined}
                 */
                function toDateInputStr() {
                  /** @type {number} */
                  localStorage['promoPopupTimestamp_' + playdate.getFullYear() + '-' + playdate.getMonth() + '-' + playdate.getDate()] = 9999999999999;
                }

                /** @type {!Date} */
                var playdate = new Date;
                toDateInputStr();
                playdate.setDate(playdate.getDate() + 1);
                toDateInputStr();
              }(), data.closeTPnotifications || done('citizenNotifications', function() {
                /** @type {number} */
                var idx_last = 0;
                var $scope = angular.element('#SideNotificationController').scope();
                for (let e of $scope.notifications) {
                  if (e.iconURL && e.iconURL.includes('atriot')) {
                    idx_last++;
                  }
                }
                for (; idx_last > 0;) {
                  if ($scope.notifications.active.iconURL.includes('atriot')) {
                    $scope.closeNotif();
                    /** @type {number} */
                    idx_last = idx_last - 1;
                  } else {
                    $scope.goNext();
                  }
                }
              })), data.showStats || path || (append('#NoKills{cursor:pointer;font:700 11px/14px arial;float:left;width:145px;margin:6px 3px 0}#NoKills strong{color:#666}#NoKills span{color:#3c8fa7;float:right}'), expect('.user_finances', (table) => {
                return table.insertAdjacentHTML('afterEnd',
                    '<div id="NoKills">' + (result[0] || result[1] ? '<strong>Kills | PP:</strong><span>' + resolve(result[0]) + ' | ' + resolve(result[1]) + '</span>' : '') + (result[2] ? '<br><strong>Ground:</strong><span>' + resolve(result[2]) + '</span>' : '') +
                    (result[3] ? '<br><strong>Air:</strong><span>' + resolve(result[3]) + '</span>' : '') + '</div>');
              }), expect('#NoKills', (connect) => {
                return connect.addEventListener('click', resetTodayStats);
              })), toTop && (destinationUnitName || /military\/campaigns|\/citizen\/profile|donate-items|\/economy\/marketplace|economy\/myCompanies/.test(location.href)) && !data.displayStorage && test('/' + side + '/economy/inventory-items/', function(selectedHostFolder) {
                if (!data.displayStorage && (!le || le && location.href.includes('citizen/profile/' + name))) {
                  (function(item) {
                    /**
                     * @param {!Object} scope
                     * @param {string} key
                     * @return {?}
                     */
                    function build(scope, key) {
                      return scope.attributes[key] ? ('energyRestore' == key ? 'Energy restore' : 'firePower' == key ? 'Firepower' : 'energyPool' == key ? 'Energy pool' : '') + ': ' + _resolve(resolve(scope.attributes[key].value)) : '';
                    }

                    append(
                        '#sideInventory{opacity:0;transition:opacity 1s;position:absolute;line-height:0;max-height:80vh;column-width:39px;column-gap:1px;text-shadow:0 0 2px #000}#sideInventory img{height:39px;width:39px;background:linear-gradient(#eef1ec,#d5decf)}#sideInventory span{font:700 10px/13px arial;color:#fff;background:#83b70b;width:39px;text-align:center;cursor:default;display:block}#sideInventory div{box-shadow:1px 1px 5px gray;page-break-inside:avoid}.col{line-height:19px}#sideInventory q{background:red;display:block;width:100%}#overTime img{box-shadow:0 0 0 3px inset #fb7e3d}#overTime img:hover{filter:brightness(1.1)}' +
                        (path ? '' : '#storageCapacity{float:left;color:#5a5a5a;text-shadow:0 1px 0 rgba(255,255,255,.9);font-size:11px;cursor:default}#storageCapacity img{float:left;margin:-1px 6px 0 2px;width:22px;height:16px}#storageCapacity strong{margin:0 1px}'));
                    var err = normalize(item);
                    /** @type {number} */
                    var val = 0;
                    /** @type {!Object} */
                    var result = Object.assign(item.inventoryItems.finalProducts.items, item.inventoryItems.rawMaterials.items, (item.inventoryItems.activeEnhancements || {}).items || []);
                    /** @type {string} */
                    var s = '<div id="sideInventory">';
                    $(result, function(dataset_, options) {
                      if ((options.icon || options.active) && !options.isPartial) {
                        var purl = result[dataset_ + '_partial'];
                        var enable_keys = '4_100' == options.id && options.amount > 23 && params.dailyTasksDone && globalNS.userInfo.wellness > 9;
                        var b = options.isExpirable;
                        var u = b ? options.attributes.expirationInfo.value : 0;
                        s = s + ('<div' + (options.active && options.active.time_left < 36E3 ? ' data-time-left="' + options.active.time_left + '"' : '') + (enable_keys ? ' id="overTime"' : '') + ' title="' + options.name + '<br>' + build(options, 'energyRestore') + build(options, 'firePower') +
                            build(options, 'energyPool') + (options.used ? '1 partially used ' + _resolve(options.used.durability.value + ' ' + options.used.durability.type + ' left') : '') + (b ? u.join('<br>') : '') + (enable_keys ?
                                _resolve('Click to work overtime for 10hp') : '') + '"><img src="' +
                            (options.icon ? options.icon : 'damageBoosters' == options.type ? '/images/modules/pvp/damage_boosters/damage_booster.png' : 'speedBoosters' == options.type ? '/images/modules/pvp/speed_boosters/speed_booster.png' : 'prestigePointsBoosters' == options.type
                                ? '/images/modules/pvp/prestige_points_boosters/prestige_booster.png'
                                : 'eventDamageBoosters' == options.type ? '/images/modules/pvp/allBoosters/eventDamageBoosters.png' :
                                    'aircraftDamageBoosters' == options.type ? '/images/modules/pvp/damage_boosters/air_damage_booster.png' : '/images/icons/industry/100/' + options.type + '.png') + '"><span>' +
                            (options.active ? options.active.time_left > 864E3 ? Math.trunc(options.active.time_left / 86400) + 'd' : options.active.time_left > 86400 ? Math.trunc(options.active.time_left / 86400) + 'd' + Math.trunc(options.active.time_left % 86400 / 3600) + 'h' : '<q>' +
                                Math.trunc(options.active.time_left / 3600) +
                                'h' + Math.trunc(options.active.time_left % 3600 / 60) + 'm</q>' : options.isRaw ? Math.trunc(10 * (options.amount + (purl ? purl.amount.split('%')[0] / 100 : 0))) / 10 : b && /[0-9],[0-9]{3}/g.exec(u)[0].replace(',', '') - now < 8 || 1 == options.industryId &&
                            options.quality < 8 && err < 240 * globalNS.userInfo.energyPerInterval ? '<q>' + resolve(options.amount) + '</q>' : format(options.amount, 2)) + '</span></div>');
                      }
                      if (!isNaN(options.amount)) {
                        val = val + options.amount * ('1_10' == dataset_ ? 10 : '1_11' == dataset_ ? 20 : 0);
                      }
                    });
                    document.body.insertAdjacentHTML('afterBegin', s + '</div>');
                    expect('#sideInventory div', function(li) {
                      update(li, 'e');
                      if (li.dataset.timeLeft) {
                        cb(li.querySelector('q'), +li.dataset.timeLeft, () => {
                          return li.remove();
                        }, 1);
                      }
                    });
                    setTimeout(() => {
                      return document.getElementById('sideInventory').style.opacity = 1;
                    });
                    expect('#overTime', (e) => {
                      return e.addEventListener('click', () => {
                        return test('/' + side + '/main/job-data', function(attempt) {
                          /** @type {number} */
                          var n = 1E3 * attempt.overTime.nextOverTime - Date.now();
                          if (n < 0) {
                            callback('/' + side + '/economy/workOvertime', {
                              _token: csrfToken,
                              action_type: 'workOvertime',
                            }, function(response) {
                              var n = response.status && response.message;
                              if (humanMsg.displayMsg(n ? 'Success!' : 'captcha' == response.message ? 'Captcha - try to work on the companies page' : 'Error: ' + response.message), n) {
                                var enableLink = e.querySelector('span');
                                /** @type {number} */
                                enableLink.textContent = +enableLink.textContent - 24;
                                if (+enableLink.textContent < 1) {
                                  e.remove();
                                } else {
                                  e.removeAttribute('id');
                                }
                                globalNS.updateCurrency(params.currencyAmount + response.result.netSalary);
                                energy.modifyHealth(globalNS.userInfo.wellness - 10);
                                if (!data.xpLeft) {
                                  params.currentExperiencePoints += 2;
                                  start();
                                }
                              }
                            });
                          } else {
                            /** @type {number} */
                            var stars = parseInt(n / 6E4 + 1);
                            humanMsg.displayMsg('You must wait ' + stars + ' minute' + (stars > 1 ? 's' : '') + ' before working for 10hp again');
                          }
                        });
                      });
                    });
                    /** @type {string} */
                    var funcCode = resolve(item.inventoryStatus.usedStorage) + ' / ' + resolve(item.inventoryStatus.totalStorage);
                    if (path) {
                      expect('.currency', (table) => {
                        return table.insertAdjacentHTML('afterEnd', '<article id="storageCapacity" class="currency"><span class="amount">' + funcCode + '</span><img src="/images/modules/manager/tab_storage.png" class="icon" style="height:16px"></article>');
                      });
                      expect('span.name', (e) => {
                        return e.textContent = e.textContent.split(',')[0];
                      });
                    } else {
                      expect('.currency_amount', (table) => {
                        return table.insertAdjacentHTML('afterEnd', '<div id="storageCapacity"><img src="/images/modules/manager/tab_storage.png"><strong></strong></div>');
                      });
                    }
                    /** @type {number} */
                    freeSpace = item.inventoryStatus.totalStorage - item.inventoryStatus.usedStorage;
                    update(document.getElementById('storageCapacity'), path ? 's' : 'w', () => {
                      return 'Free space: ' + _resolve(resolve(freeSpace)) + 'Total EB hits: ' + _resolve(resolve(val)) + 'Total food HP: ' + _resolve(resolve(err));
                    });
                    expect('#storageCapacity strong', function(scriptElement) {
                      /** @type {string} */
                      scriptElement.textContent = funcCode;
                      scriptElement.addEventListener('click', () => {
                        return expect('#InfCalc_hits', function(el) {
                          el.value = val;
                          el.dispatchEvent(new Event('keyup'));
                        });
                      });
                    });
                    if (!data.autofillMarket && location.href.includes('economy/marketplace')) {
                      run();
                    }
                  })(selectedHostFolder);
                }
              }), destinationUnitName) {
                test('/' + side + '/military/campaignsJson/list', function(sortie) {
                  battleListingScope = {
                    campaigns: {
                      initialList: sortie.battles,
                    },
                    requestTime: sortie.time,
                  };
                  if (!data.epicSensor && toTop) {
                    (function() {
                      /**
                       * @param {number} b
                       * @return {undefined}
                       */
                      function success(b) {
                        $(battleListingScope.campaigns.initialList, function(i, marker) {
                          /** @type {!Array} */
                          var a = [];
                          /** @type {number} */
                          var startDate = 0;
                          if (marker.is_dict || marker.is_lib || $(marker.div, function(moz, options) {
                            var endDate = options.epic;
                            if ((hasDate || options.div == date || options.div > 10) && !options.end && 0 === options.terrain && endDate && endDate >= startDate) {
                              startDate = endDate;
                              /** @type {!Array} */
                              a = [endDate, moz];
                            }
                          }), a[0] == b) {
                            return n = true, document.getElementById('menu3')
                                .insertAdjacentHTML('beforeEnd',
                                    '<a id="epicLink" division="' + a[1] + '" href="/' + side + '/military/battlefield/' + i + '" style="position:absolute;top:8px;left:225px;width:30px;background:none"><img src="/images/modules/misc/' + (b > 1 ? 'epic_battles_icon' : 'full_scale_battle') +
                                    '.png" style="width:30px"></a>'), document.getElementById('epicLink').addEventListener('click', function() {
                              event.preventDefault();
                              value(this.href.split('battlefield/')[1], this.getAttribute('division'));
                            }), document.title = (b > 1 ? 'EPIC BATTLE' : 'FULL SCALE') + ' DETECTED', false;
                          }
                        });
                      }

                      /** @type {boolean} */
                      var n = false;
                      success(2);
                      if (!n) {
                        success(1);
                      }
                    })();
                  }
                });
                done('weekly-challenge-data', function() {
                  append('#WCSimulator{position:absolute;right:10px;top:1px;font:700 11px/14px arial;text-shadow:0 0 2px #000;color:#fff;padding:0 3px;background:#83b70b;border-radius:1px}#WCSimulator:hover{background:#fb7e3d}');
                  expect('#weeklyChallenge', (types) => {
                    return types.insertAdjacentHTML('beforeEnd', '<a href="http://wcsimulator.droppages.com/" target="_blank" id="WCSimulator">WC calculator</a>');
                  });
                  if (expect('.get_milestone_reward').length && !expect('.collectAll').length) {
                    expect('.player_layer', (types) => {
                      return types.insertAdjacentHTML('beforeEnd', '<a href="javascript:" class="std_global_btn collectAll blueColor floatRight iconBtn" style="top:-33px;"><img src="//www.erepublik.net/images/modules/weekly_challenge/collect-all.png" alt="Get all rewards"></a>');
                    });
                    expect('.collectAll', (e) => {
                      return e.addEventListener('click', function() {
                        angular.element('#weeklyChallenge').scope().getAllReward();
                        e.remove();
                      });
                    });
                  }
                });
                if (!data.improveFeeds) {
                  addEventListener('click', function(e) {
                    if (!(document.getElementById('citizenFeed').contains(e.target) || e.target.classList.contains('emoji') || e.target.classList.contains('std_global_btn'))) {
                      expect('.commentsWrapper', (type) => {
                        return type.parentElement.parentElement.querySelector('.postBtn').click();
                      });
                    }
                  });
                }
                if (!data.hideMedals) {
                  append('#citizenFeed .postsWrapper .postContainer.autoPost{display:none}');
                  done('wall-post/retrieve', function() {
                    if (expect('.postContainer:not(.autoPost)').length < 5) {
                      expect('.previousposts')[0].click();
                    }
                  });
                }
              } else {
                if (chans) {
                  battleListingScope = angular.element('#ListCampaignsController').scope();
                  if (toTop) {
                    if (!data.compactWarsPage) {
                      append(
                          '#header{position:sticky;top:0;z-index:9;background:#fff}.war_card{width:236px!important;height: 214px!important;margin:0!important}.black_bar{width:100%!important}#ListCampaignsController br{display:none}.timer{bottom:17px!important;color:#fff!important;pointer-events:none}.card_bottom{height:16px!important}.fight_btn{bottom:0!important}.fight_btn img{display:none!important}.country_name{max-width:120px!important}.fight{bottom:23px}.hexagons{height:115px!important}.campaign{visibility:hidden}');
                    }
                    if (!data.replaceWaitingwithCountdown) {
                      setInterval(function() {
                        var startTime = battleListingScope.campaigns.requestTime;
                        expect('.timer:not(.countdownAdded)', function(col) {
                          col.classList.add('countdownAdded');
                          /** @type {number} */
                          var result = angular.element(col).scope().campaign.start - startTime;
                          if (result > 0) {
                            cb(col, result, (selfContext) => {
                              return selfContext.textContent = '00h:00m';
                            });
                          }
                        });
                      }, 500);
                    }
                    if (!data.mercFF) {
                      link();
                    }
                  }
                } else {
                  if (ms) {
                    if (append('#battleConsole li isZordacz,#battleConsole li div,#battleConsole li i,.player_name a,.country_avatar,.region_name_background{pointer-events:none}'), localStorage.hasMaverick = SERVER_DATA.canSwitchDivisions, imageScopes.push(function(data, pathToDestinationFile) {
                      if (!(!/fight-shoo|deploy-bomb/.test(pathToDestinationFile) || data.error || 'ENEMY_KILLED' != data.message && 'OK' != data.message && !data.data)) {
                        check(data);
                      }
                    }), setTimeout(function() {
                      pomelo.on('onDeployFinished', (data) => {
                        return check(data, true);
                      });
                    }, 2E3), data.battlefield || function() {
                      /**
                       * @return {undefined}
                       */
                      function render() {
                        callback('/' + side + '/military/battle-console', {
                          battleId: ms,
                          zoneId: SERVER_DATA.zoneId,
                          action: 'battleConsole',
                          _token: csrfToken,
                        }, function(data) {
                          p.textContent = data.division[currentDivision - 1].epicBattleProgress;
                          if (100 == p.textContent || SERVER_DATA.points.defender >= 1800 || SERVER_DATA.points.attacker >= 1800) {
                            p.click();
                          }
                        });
                      }

                      /**
                       * @return {undefined}
                       */
                      function request() {
                        var e;
                        e = SERVER_DATA.battleZoneId;
                        callback('/' + side + '/military/battle-console', {
                          action: 'battleStatistics',
                          battleZoneId: e,
                          type: 'damage',
                          leftPage: 1,
                          rightPage: 1,
                          _token: csrfToken,
                        }, (server) => {
                          return expect('#topLists', (dashboardPanel) => {
                            return dashboardPanel.innerHTML = '<div style="left:0">' + enter(server, 1) + '</div><div style="right:0">' + enter(server) + '</div>';
                          });
                        });
                      }

                      /**
                       * @param {?} name
                       * @param {number} enter
                       * @return {?}
                       */
                      function enter(name, enter) {
                        /** @type {string} */
                        var pix_color = '';
                        return $(name[SERVER_DATA[(enter ? 'left' : 'right') + 'BattleId']].fighterData, function(canCreateDiscussions, d) {
                          if (canCreateDiscussions < 11) {
                            pix_color = pix_color + ('<a href="/' + side + '/citizen/profile/' + d.citizenId + '"><q>' + d.citizenName + '</q><span>' + format(d.raw_value, 2) + '</span></a>');
                          }
                        }), pix_color;
                      }

                      if (append(
                          '#epicPercent{color:#fff;position:absolute;bottom:1px;left:0;background:rgba(0,0,0,.4);font:700 10px/13px Arial;padding:2px 5px;border-radius:0 2px 0 0;cursor:pointer;text-shadow:0 0 2px #000}#epicPercent input{margin:0 5px 0 2px;top:2px;position:relative}#pvp .left_wall span,#pvp .right_wall span{opacity:1}#pvp .battle_progression .epic{display:none}#pvp .percent span{opacity:1;animation:none;-webkit-animation:none}#personal_stats{text-align:center;width:100%;position:absolute;top:4px;color:#fff;font:700 10px/20px Arial;text-shadow: 0 0 2px #000;z-index:1}#influence_added{visibility:hidden}#travelButtons{position:absolute;bottom:17px;left:0;width:100%;height:20px;text-align:center;color:#fff;pointer-events:none;z-index:999}#travelButtons span{background:rgba(0,0,0,.6);margin:200px;padding:10px;border-radius:5px;cursor:pointer;font:700 10px/20px Arial;box-shadow:0 0 5px #fff;pointer-events:visible}#travelButtons span:hover{background:#000}#travelButtons img{vertical-align:middle;margin:0 5px;width:20px}#topLists div{position:absolute;top:25px;z-index:11;border-radius:2px}#topLists a{text-shadow:0 0 2px #000;font:700 9px Arial;color:#fff;display:flex;width:121px;background:rgba(0,0,0,.3);padding:2px}#topLists a:hover{color:#83b70b}#topLists q{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#topLists span{color:#ffd479}'),
                      SERVER_DATA.spectatorOnly || expect('#total_damage', function(elem) {
                        var info = elem.querySelector('strong');
                        /** @type {string} */
                        info.style.visibility = 'hidden';
                        /** @type {string} */
                        var includes = document.cookie.split(SERVER_DATA.battleZoneId + '-' + SERVER_DATA.leftBattleId + '=')[1];
                        /** @type {!Array<string>} */
                        savedStats = (includes ? includes.split(';')[0] : '0|0').split('|');
                        savedStats[2] = info.textContent.replace(/,/g, '');
                        elem.insertAdjacentHTML('beforeEnd', '<div id="personal_stats"><q>' + resolve(savedStats[0]) + '</q> | <q>' + resolve(savedStats[1]) + '</q> | <q>' + resolve(savedStats[2]) + '</q></div>');
                        personal_stats = expect('#personal_stats q');
                      }), expect('#total_damage .resistance', (inventoryService) => {
                        return inventoryService.remove();
                      }), toTop) {
                        clearInterval(globalSleepInterval);
                        expect('#pvp', (types) => {
                          return types.insertAdjacentHTML('beforeEnd', (SERVER_DATA.onAirforceBattlefield ? '' : '<label id="epicPercent"><input type="checkbox">Epic progress <span></span>%</label>') + (data.topLists ? '' : '<div id="topLists"></div>') +
                              (SERVER_DATA.isCivilWar ? '' : '<div id="travelButtons"><span><img src="//www.erepublik.net/images/flags_png/L/' + _this.info.countries[SERVER_DATA.leftBattleId].permalink + '.png">Join</span><span>Join <img src="//www.erepublik.net/images/flags_png/L/' +
                                  _this.info.countries[SERVER_DATA.rightBattleId].permalink + '.png"></span></div>'));
                        });
                        expect('#region_name_link', (selfContext) => {
                          return selfContext.textContent += (SERVER_DATA.isResistance ? ' RW' : '') + ' R' + SERVER_DATA.zoneId;
                        });
                        var renderInterval;
                        /** @type {(Element|null)} */
                        var p = document.querySelector('#epicPercent span');
                        expect('#epicPercent input', (e) => {
                          return e.addEventListener('change', function() {
                            if (this.checked) {
                              render();
                              /** @type {number} */
                              renderInterval = setInterval(render, 65E3);
                            } else {
                              clearInterval(renderInterval);
                            }
                          });
                        });
                        if (!SERVER_DATA.isCivilWar) {
                          expect('#travelButtons span', function(e, canCreateDiscussions) {
                            e.addEventListener('click', () => {
                              return value(ms, SERVER_DATA.battleZoneId, canCreateDiscussions ? SERVER_DATA.rightBattleId : SERVER_DATA.leftBattleId);
                            });
                            if (!(SERVER_DATA.spectatorOnly || canCreateDiscussions)) {
                              /** @type {string} */
                              e.style.visibility = 'hidden';
                            }
                          });
                          expect('#trigger_campaignMap', (e) => {
                            return e.addEventListener('click', () => {
                              return document.getElementById('travelButtons').style.zIndex = '99';
                            });
                          });
                        }
                        var refreshBtn = angular.element('#battleFooterbattleSetup').scope();
                        var wasRefreshHidden = refreshBtn.openPopup;
                        /**
                         * @return {undefined}
                         */
                        refreshBtn.openPopup = () => {
                        };
                        setTimeout(() => {
                          return refreshBtn.openPopup = wasRefreshHidden;
                        }, 2E3);
                        if (!data.topLists) {
                          expect('.battle_heroes', (builderID) => {
                            return builderID.style.display = 'none';
                          });
                          request();
                          setInterval(function() {
                            if (SERVER_DATA.points.attacker < 1800 && SERVER_DATA.points.defender < 1800) {
                              request();
                            }
                          }, 3E4);
                        }
                        imageScopes.push(function(canCreateDiscussions, fileListAccumulator) {
                          if (fileListAccumulator.includes('battle-stats')) {
                            var n = canCreateDiscussions.battle_zone_situation[SERVER_DATA.battleZoneId];
                            if (n) {
                              /** @type {string} */
                              document.title = (n > 1 ? 'EPIC BATTLE' : 'FULL SCALE') + ' DETECTED';
                            }
                          }
                        });
                      }
                    }(), data.autoBot || SERVER_DATA.spectatorOnly || function() {
                      /**
                       * @return {undefined}
                       */
                      function update() {
                        if ('AUTOBOT ON' == l_p[0].textContent) {
                          nudgePick(reverbSlider.value < 3 && !reverbSlider.disabled ? 2500 : 1E3);
                          if (globalNS.userInfo.wellness >= tblr.value) {
                            callback('/' + side + '/military/fight-shoo' + (SERVER_DATA.onAirforceBattlefield ? 'oo' : 'o') + 't/' + ms, {
                              sideId: SERVER_DATA.countryId,
                              battleId: ms,
                              _token: csrfToken,
                            }, function(data) {
                              if (['UNKNOWN_SIDE', 'WRONG_SIDE'].includes(data.message)) {
                                location.href = data.url;
                              } else {
                                if (['ENEMY_ATTACKED', 'LOW_HEALTH'].includes(data.message)) {
                                  /** @type {number} */
                                  window.globalNS.userInfo.wellness = 0;
                                  nudgePick(0);
                                } else {
                                  if ('ZONE_INACTIVE' == data.message) {
                                    t();
                                  } else {
                                    if ('SHOOT_LOCKOUT' == data.message) {
                                      nudgePick(450);
                                    } else {
                                      var n = data.details;
                                      var userData = data.user;
                                      battleFX.updateRank(data.rank);
                                      window.totalPrestigePoints += data.hits;
                                      expectation.forEach((selfContext) => {
                                        return selfContext.textContent = totalPrestigePoints;
                                      });
                                      stream.forEach((url) => {
                                        return url.textContent = resolve(n.currency);
                                      });
                                      expected.forEach(function(e) {
                                        var value = n.current_energy_ratio;
                                        /** @type {string} */
                                        e.style.width = value + '%';
                                        e.classList.remove('high', 'medium', 'low');
                                        e.classList.add(value < 20 ? 'low' : value > 60 ? 'high' : 'medium');
                                      });
                                      if (userData.weaponQuantity >= 0) {
                                        con.forEach((url) => {
                                          return url.textContent = resolve(userData.weaponQuantity);
                                        });
                                      }
                                      globalNS.updateSideBar(n);
                                      if (upsampleHeight) {
                                        /** @type {number} */
                                        h = h - (data.oldEnemy.isNatural ? Math.floor(1.1 * userData.givenDamage) : userData.givenDamage);
                                        /** @type {string} */
                                        check[0].value = Math.max(0, h / (i ? 1E3 : 1E6)).toFixed();
                                      }
                                      if (!(reverbSlider.disabled || 1 != (reverbSlider.value = reverbSlider.value - 1))) {
                                        nudgePick(900);
                                      }
                                      if (!state.checked && !food_remaining && globalNS.userInfo.wellness < tblr.value || !reverbSlider.disabled && reverbSlider.value <= 0 || upsampleHeight && h <= 0 || focusNewTabNotification.checked && !userData.epicBattle) {
                                        t();
                                      }
                                      check(data);
                                    }
                                  }
                                }
                              }
                            });
                          } else {
                            if (use() || state.checked) {
                              test('/' + side + '/main/eat?format=json&_token=' + csrfToken + '&buttonColor=' + (state.checked ? 'orange' : 'blue'), function(result) {
                                energy.processResponse(result);
                                nudgePick(1E3);
                              });
                            } else {
                              t();
                            }
                          }
                        }
                      }

                      /**
                       * @return {undefined}
                       */
                      function t() {
                        /** @type {string} */
                        l_p[0].textContent = 'AUTOBOT OFF';
                        /** @type {string} */
                        l_p[0].style.background = '#FB7E3D';
                        /** @type {boolean} */
                        upsampleHeight = false;
                        /** @type {number} */
                        check[0].value = 0;
                        clearTimeout(timer);
                      }

                      /**
                       * @param {number} idleTime
                       * @return {undefined}
                       */
                      function nudgePick(idleTime) {
                        clearTimeout(timer);
                        /** @type {number} */
                        timer = setTimeout(update, idleTime);
                      }

                      append(
                          '#AutoBot,#AutoBot img{position:absolute;background:rgba(36,43,39,.6)}#AutoBot{transition:left .3s;width:136px;left:-136px;top:240px;border-radius:3px;color:#fff;font:700 12px/20px Arial;text-align:left;z-index:10;text-shadow:0 0 2px #000}#AutoBot input{width:25px;margin:3px 1px;text-align:center}#AutoBot input[type=number]{width:60px;position:absolute;right:5px;margin:0}#AutoBot div{padding:5px}#AutoBot img{width:36px;height:36px;padding:0 6px;top:40%;right:-48px;cursor:pointer;border-radius:0 3px 3px 0}#AutoBot img:hover{filter:brightness(1.2)}#AutoBotSwitch{cursor:pointer;width:100%;background:#FB7E3D;text-align:center}#AutoBotSwitch:hover{background:#83B70B!important}');
                      var timer;
                      var i = SERVER_DATA.onAirforceBattlefield;
                      expect('.battle_footer', (table) => {
                        return table.insertAdjacentHTML('afterEnd', '<div id="AutoBot"><div><label>Kills<input id="kills" type="number" value="25" min="0"></label><br><label>Damage<input id="damage" type="number" placeholder="in ' + (i ? 'k' : 'M') +
                            '" min="0"></label><br><label><input id="allin" type="checkbox">All-in</label><label><input id="eatEB" type="checkbox">Eat EBs</label><br><label>Min HP<input id="minEnergy" type="number" value="50" step="10" min="0"></label><br><label><input id="stopNoEpic" type="checkbox">Stop if no epic</label><br><label><input id="freezeBattlefield" type="checkbox">Freeze battlefield</label><br></div><p id="AutoBotSwitch">AUTOBOT OFF</p><img src="//www.erepublik.net/images/emoji/emojione/color/1f52b.png"></div>');
                      });
                      var l_p = expect('#AutoBotSwitch', (n) => {
                        return n.addEventListener('click', function() {
                          if ('AUTOBOT OFF' == n.textContent) {
                            /** @type {string} */
                            n.textContent = 'AUTOBOT ON';
                            /** @type {string} */
                            n.style.background = '#83B70B';
                            if (reverbSlider.disabled && !$checkBox2[0].checked) {
                              /** @type {boolean} */
                              upsampleHeight = true;
                              /** @type {number} */
                              h = +check[0].value * (i ? 1E3 : 1E6);
                            }
                            update();
                          } else {
                            t();
                          }
                        });
                      });
                      var $checkBox2 = expect('#allin', (select) => {
                        return select.addEventListener('change', () => {
                          return reverbSlider.disabled = check[0].disabled = select.checked;
                        });
                      });
                      /** @type {(Element|null)} */
                      var state = document.getElementById('eatEB');
                      /** @type {(Element|null)} */
                      var reverbSlider = document.getElementById('kills');
                      var check = expect('#damage', (e) => {
                        return e.addEventListener('input', () => {
                          return reverbSlider.disabled = e.value > 0;
                        });
                      });
                      /** @type {number} */
                      var h = 0;
                      /** @type {boolean} */
                      var upsampleHeight = false;
                      /** @type {(Element|null)} */
                      var tblr = document.getElementById('minEnergy');
                      if (!toTop && data['kills'[2]][name] > 7500) {
                        $checkBox2[0].click();
                        /** @type {boolean} */
                        state.checked = true;
                        /** @type {number} */
                        tblr.value = reset_health_to_recover - 10;
                        setInterval(selectWeapon, 1E3, -1);
                      }
                      /** @type {(Element|null)} */
                      var focusNewTabNotification = document.getElementById('stopNoEpic');
                      var expectation = expect('#prestige_value');
                      var stream = expect('#side_bar_currency_account_value');
                      var expected = expect('.left_player .energy_progress');
                      var con = expect('.weapon_no');
                      document.querySelector('#AutoBot img').addEventListener('click', (dom) => {
                        return dom.target.parentElement.style.left = '0px' == dom.target.parentElement.style.left ? '-136px' : '0px';
                      });
                      document.getElementById('freezeBattlefield').addEventListener('click', (event) => {
                        return ERPK.initPlayerRateFilter(event.target.checked ? 'Off' : 'On');
                      });
                    }(), data.mercFF || SERVER_DATA.isCivilWar || !toTop || link(), isZordacz && SERVER_DATA.webDeployEnabled) {
                      /** @type {number} */
                      var chat_retry = setInterval(function() {
                        if (SERVER_DATA.sessionValidation) {
                          clearInterval(chat_retry);
                        }
                      }, 1E3);
                    }
                  } else {
                    if (/donate-|accounts|citizen-friends/.test(location.href) && !data.improveProfile) {
                      render();
                    } else {
                      if (le) {
                        done('/citizen-profile-json/', function() {
                          if (!window.hasRunProfileStuff) {
                            /** @type {number} */
                            window.hasRunProfileStuff = 1;
                            if (!data.improveProfile) {
                              render();
                            }
                            if (!data.influenceCalculator) {
                              (function() {
                                /**
                                 * @return {undefined}
                                 */
                                function init() {
                                  expectation.forEach(function(dom, mute) {
                                    dom.querySelectorAll('span').forEach((inventoryService) => {
                                      return inventoryService.remove();
                                    });
                                    var b = bd.military.militaryData[mute ? 'aircraft' : 'ground'];
                                    /** @type {number} */
                                    var delta_length_z = +dom.getElementsByTagName('select')[0].value;
                                    var soundEnabled = document.getElementById('InfCalc_NE').checked;
                                    /** @type {number} */
                                    var volume = bd.loggedIn.hovercardData.fighterInfo[mute ? 'aviation' : 'military'].damagePerHitNoWeapon * (1 + delta_length_z / 5) * (mute ? 1 : 1 + parseInt(document.getElementById('InfCalc_legend').value) / 100) *
                                        (1 + parseInt(document.getElementById('InfCalc_booster').value) / 100);
                                    /** @type {number} */
                                    var force_z = 1E6 / volume;
                                    dom.insertAdjacentHTML('beforeEnd', '<span>Influence</span><span>' + format(parseInt(volume * document.getElementById('InfCalc_hits').value * (soundEnabled ? 1.1 : 1)), 1) + '</span><span>Hits to next rank</span><span>' +
                                        (b.nextRankAt - b.points > 0 ? format(Math.ceil(10 * (b.nextRankAt - b.points) / volume / (document.getElementById('InfCalc_WarStash').checked ? 1.1 : 1)), 1) : '\u221e') + '</span><span>Cost cc/M</span><span title="Includes food">' + format(((delta_length_z ?
                                            data.infCalc[mute ? 23 : 2][Math.min(delta_length_z, 7)] / delta_length_z * force_z : 0) + force_z * data.infCalc.cheapestFood * 10) / (soundEnabled ? 1.1 : 1), 2) + '</span>');
                                  });
                                }

                                append(
                                    '#infCalc{font-size:11px;color:#666;margin:0 0 5px;width:577px;text-align:center}#InfCalc_hits,#InfCalc_legend,#InfCalc_booster{padding:4px;text-align:center;width:35px;font-size:11px;margin:0 5px}#infCalc label{margin:0 5px}#InfCalc_NE,#InfCalc_WarStash{margin-left:5px;position:relative;top:2px;text-align:center}.infCalcResults{line-height:0}.infCalcResults span{width:100%;text-align:center;display:block;font:700 12px/15px Arial;color:#595959}.infCalcResults span:nth-child(even){font:400 11px/14px Arial;color:#81827f}.infCalcResults select{margin:2px;font-size:11px;padding:2px 4px;text-align:center;height:23px}.citizen_military_box_wide{width:293px;margin:0 1px 2px}.citizen_military_box_wide .rank_box{right:0}.citizen_military_box_wide .rank_icon{left:7px}.citizen_military_box_wide .regular_rank_img{margin-left:7px}.citizen_military_box_wide .rank_name_holder{width:230px;left:88px}.citizen_military_box .military_box_info{width:85px}.citizen_military_box_wide .top_area{padding:0 15px 0 77px}');
                                var bd = angular.element('#str_progress').scope().data;
                                expect('.citizen_military_box_wide', (table) => {
                                  return table.insertAdjacentHTML('afterEnd', '<div class="citizen_military_box infCalcResults"><select></select></div>');
                                })[1].nextSibling.insertAdjacentHTML('afterEnd',
                                    '<div id="infCalc" class="citizen_military"><label>Hits <input type="text" id="InfCalc_hits" value="1"></label><label>Natural Enemy <input type="checkbox" id="InfCalc_NE"></label><label title="+10% rank points">War Stash <input type="checkbox" id="InfCalc_WarStash" ' +
                                    (bd.activePacks.war_stash ? 'checked' : '') + '></label><label>Damage Booster<input type="text" id="InfCalc_booster" value="0%"></label><label>Legend Bonus<input type="text" id="InfCalc_legend" value="' +
                                    Math.max(100 * bd.loggedIn.hovercardData.fighterInfo.military.damagePerHitLegend / bd.loggedIn.hovercardData.fighterInfo.military.damagePerHit - 100, 0).toFixed() + '%"></label></div>');
                                expect('.citizen_military_box', (year_selector_service) => {
                                  return year_selector_service.style = 'margin:0 1px 2px 1px;width:85px';
                                });
                                data.infCalc = data.infCalc || {
                                  1: {},
                                  2: {},
                                  23: {},
                                  cheapestFood: 0,
                                  selWep: {
                                    0: 7,
                                  },
                                  noData: 1,
                                };
                                var expectation = expect('.infCalcResults', (t, dim) => {
                                  return t.querySelectorAll('select').forEach(function(b) {
                                    /** @type {string} */
                                    var name = '';
                                    /** @type {number} */
                                    var i = 0;
                                    for (; i < 8; i++) {
                                      /** @type {string} */
                                      name = name + (!i || data.infCalc.noData || data.infCalc[dim ? 23 : 2][Math.min(i, 7)] ? '<option value="' + (i < 7 ? i : 10) + '" ' + (data.infCalc.selWep[dim] == i ? 'selected' : '') + '>Q' + i + '</option>' : '');
                                    }
                                    /** @type {string} */
                                    b.innerHTML = name;
                                    b.addEventListener('change', function() {
                                      /** @type {number} */
                                      data.infCalc.selWep[dim] = Math.min(this.value, 7);
                                      saveStuffDataToStorage();
                                      init();
                                    });
                                  });
                                });
                                init();
                                expect('#InfCalc_hits,#InfCalc_legend,#InfCalc_booster', (p) => {
                                  return p.addEventListener('keyup', init);
                                });
                                expect('#InfCalc_NE,#InfCalc_WarStash', (sound) => {
                                  return sound.addEventListener('change', init);
                                });
                                if (data.infCalc.date != now) {
                                  u(35, function() {
                                    /** @type {number} */
                                    var removeClass = 1;
                                    for (; removeClass < 4; removeClass++) {
                                      /** @type {number} */
                                      var i = 1;
                                      for (; i < 8; i++) {
                                        /** @type {number} */
                                        data.infCalc[removeClass < 3 ? removeClass : 23][i] = ((redLookupTable[35][restart(removeClass < 3 ? removeClass : 23)]['q' + i] || [])[1] || {}).gross / (1 == removeClass ? 2 * (i < 7 ? i : 10) : 1);
                                      }
                                    }
                                    /** @type {number} */
                                    data.infCalc.cheapestFood = Math.min(999, ...Object.values(data.infCalc[1]));
                                    data.infCalc.date = now;
                                    /** @type {number} */
                                    data.infCalc.noData = 0;
                                    saveStuffDataToStorage();
                                    init();
                                  });
                                }
                              })();
                            }
                          }
                        });
                      } else {
                        if (location.href.includes('economy/marketplace')) {
                          if (location.href.includes('/offer')) {
                            if (!data.improveMarketplace) {
                              init();
                            }
                            if (!data.autofillMarket) {
                              run();
                            }
                          } else {
                            done('economy/marketplace', function() {
                              if (!data.improveMarketplace) {
                                init();
                              }
                              if (!data.autofillMarket) {
                                run();
                              }
                            });
                          }
                        } else {
                          if (location.href.includes('economy/exchange-market')) {
                            console.log('EXCHANGE MARKET');
                            if (!data.autofillGold) {
                              (function() {
                                /**
                                 * @return {undefined}
                                 */
                                function run() {
                                  expect('button[data-currency=GOLD]', function(target) {
                                    var input = target.previousElementSibling.previousElementSibling;
                                    /** @type {number} */
                                    input.value = Math.min(target.dataset.max, 10, Math.floor(100 * params.currencyAmount / target.dataset.price) / 100);
                                    input.dispatchEvent(new Event('input'));
                                  });
                                }

                                append('.exchange_offers td.ex_citizen{width:200px}.exchange_offers td.ex_buy button{max-width:unset}');
                                done('exchange/retrieve', run);
                                run();
                              })();
                            }
                            insertContent('.e_cash', 'monetary-market/gold/statistics');
                          } else {
                            if (location.href.includes('economy/myCompanies')) {
                              if (!data.companyManager) {
                                (function() {
                                  append(
                                      '#CompanyManager{float:right;display:none}#CompanyManager strong{position:relative;bottom:8px;right:5px;font-size:12px}#CompanyManager span{cursor:pointer;border-radius:3px}#CompanyManager span:hover{opacity:.5}#CompanyManager img{height:30px}#companies_bottom{position:sticky;bottom:0}');
                                  expect('.area h4', (types) => {
                                    return types.insertAdjacentHTML('beforeEnd', '<div id="CompanyManager"><strong>Work as Manager</strong></div>');
                                  });
                                  /** @type {(Element|null)} */
                                  var container = document.getElementById('CompanyManager');
                                  var expectation = expect('.listing.companies:not(.disabled):not(.cannotWorkAsManager):not(.cannotWorkAsManager-location)', function(fieldsetLabel) {
                                    var n = fieldsetLabel.querySelector('.area_pic > img');
                                    var srcAngle = n.getAttribute('src');
                                    if (!container.querySelector('img[src="' + srcAngle + '"]')) {
                                      container.insertAdjacentHTML('beforeEnd', '<span><img src="' + srcAngle + '" title="' + n.title + '"></span>');
                                    }
                                  });
                                  if (container.querySelector('span')) {
                                    /** @type {string} */
                                    container.style.display = 'block';
                                    expect('#help_manage', (inventoryService) => {
                                      return inventoryService.remove();
                                    });
                                  }
                                  expect('#CompanyManager span', (e) => {
                                    return e.addEventListener('click', function(mutation) {
                                      window.pageDetails.recoverable_health.value = food_remaining;
                                      var i = expect('.owner_work.active').length;
                                      expectation.forEach(function(pxPhysicalNode) {
                                        if (pxPhysicalNode.querySelector('.area_pic > img[src="' + mutation.target.getAttribute('src') + '"]') && i < Math.floor((globalNS.userInfo.wellness + Math.min(pageDetails.recoverable_health.value, pageDetails.recoverable_health_in_food)) / 10)) {
                                          pxPhysicalNode.querySelectorAll('.owner_work').forEach(function(divChatButton) {
                                            if (!divChatButton.classList.contains('active')) {
                                              i++;
                                              divChatButton.classList.add('active');
                                            }
                                          });
                                        }
                                      });
                                      expectation.forEach((e) => {
                                        return calculateProduction(e, true);
                                      });
                                      checkHealth();
                                      checkTax();
                                      calculateTotals();
                                      warnForCritical();
                                    });
                                  });
                                  expect('.list_group', ($button) => {
                                    return $button.style.boxShadow = 'none';
                                  });
                                })();
                              }
                              if (!data.showBestJobOffer) {
                                test('/' + side + '/economy/job-market-json/' + params.countryLocationId + '/1/desc', function(options) {
                                  if (options.jobs && options.jobs[0]) {
                                    options.jobs.sort((_pointM, _pointB) => {
                                      return _pointB.netSalary - _pointM.netSalary;
                                    });
                                    expect('.employer.fill h4', (types) => {
                                      return types.insertAdjacentHTML('beforeEnd', '<a href="/' + side + '/economy/job-market/' + params.countryLocationId + '" style="position:absolute;right:21px;">Highest local offer: net ' + options.jobs[0].netSalary + 'cc (' +
                                          (options.jobs[0].salaryLimit > 0 ? 'max  ' + resolve(options.jobs[0].salaryLimit) + 'cc/day' : 'no overtime limit') + ')</a>');
                                    });
                                  }
                                });
                              }
                              if (hasLicense() && (handlebars || Handlebars)) {
                                (function() {
                                  /**
                                   * @param {string} name
                                   * @return {undefined}
                                   */
                                  function fixRepoAlerts(name) {
                                    if (Object.keys(readyPorts).length + 1 == stream.length || name) {
                                      /** @type {!Array} */
                                      var queue = [];
                                      /** @type {number} */
                                      var cursorAt = 0;
                                      /** @type {number} */
                                      var outerStepNumber = 0;
                                      stream.forEach(function(t) {
                                        /** @type {number} */
                                        var port = +t.id.split('_')[1];
                                        /** @type {!Array} */
                                        var arg = [];
                                        t.querySelectorAll('.WaMsetupInput').forEach(function(child) {
                                          var c = name ? +child.value : child.checked;
                                          if (c) {
                                            /** @type {number} */
                                            var elem = +child.parentElement.id.split('_')[1];
                                            if (name) {
                                              queue.push([elem, c]);
                                              outerStepNumber = outerStepNumber + c;
                                            } else {
                                              arg.push(elem);
                                            }
                                            cursorAt++;
                                          }
                                        });
                                        if (!name && arg.length) {
                                          queue.push([readyPorts[port], arg]);
                                        }
                                      });
                                      expect('#WaMsetup span', (result) => {
                                        return result.textContent = name ? 'Assigned ' + outerStepNumber + ' employees to ' + cursorAt + ' companies' : 'Selected ' + cursorAt + ' companies in ' + queue.length + ' holding(s)';
                                      });
                                      expect('#WaMsetup a', (selfContext) => {
                                        return selfContext.textContent = cursorAt == value.length ? 'Deselect all' : 'Select all';
                                      });
                                      if (name) {
                                        /** @type {!Array} */
                                        data.employeeCompanies = queue;
                                      } else {
                                        /** @type {string} */
                                        localStorage.wamCompaniesLeftToday = JSON.stringify(data.wamCompanies = queue);
                                      }
                                      saveStuffDataToStorage();
                                    }
                                  }

                                  append('#WaMsetup{margin:0 0 -20px;font:200 11px/14px Arial}#WaMsetup span{margin:9px;display:inline-block}input.WaMsetupInput{position:absolute;margin:25px 0}#WaMsetup a{margin:0 5px;padding:5px}');
                                  expect('.area h4', (table) => {
                                    return table.insertAdjacentHTML('afterEnd', '<div id="WaMsetup"><span></span><a class="std_global_btn">AutoFighter WaM Setup</a><a class="std_global_btn">AutoFighter Employee Setup</a></div>');
                                  });
                                  var value;
                                  var stream = expect('.companies_group');
                                  var readyPorts = {};
                                  var expectation = expect('#WaMsetup a', (table, isMobile) => {
                                    return table.addEventListener('click', function() {
                                      if (!isMobile) {
                                        stream.forEach(function(callingModule) {
                                          /** @type {number} */
                                          var port = +callingModule.id.split('_')[1];
                                          if (port) {
                                            callback('/' + side + '/main/travelData', {
                                              _token: csrfToken,
                                              holdingId: port,
                                            }, function(server) {
                                              readyPorts[port] = server.preselectRegionId;
                                              fixRepoAlerts(isMobile);
                                            });
                                          }
                                        });
                                      }
                                      table.insertAdjacentHTML('afterEnd', '<a class="std_global_btn">Select all</a>');
                                      table.nextSibling.addEventListener('click', function() {
                                        /** @type {boolean} */
                                        var c = 'Select all' == this.textContent;
                                        /** @type {string} */
                                        this.textContent = c ? 'Deselect all' : 'Select all';
                                        if (isMobile) {
                                          value.forEach((el) => {
                                            return el.value = c ? el.max : 0;
                                          });
                                        } else {
                                          value.forEach((node1) => {
                                            return node1.checked = c;
                                          });
                                        }
                                        fixRepoAlerts(isMobile);
                                      });
                                      expect(isMobile ? '.employees_selector' : '.owner_work', function(type) {
                                        /** @type {number} */
                                        var t = +type.parentElement.parentElement.querySelector('.employees_selector').dataset.employee_limit;
                                        type.parentElement.parentElement.insertAdjacentHTML('beforeEnd',
                                            '<input class="WaMsetupInput" style="-moz-appearance:' + (isMobile ? 'initial;width:30px;left:-35px;text-align:center' : 'checkbox;left:-30px') + '" type="' + (isMobile ? 'number' : 'checkbox') + '" ' +
                                            (isMobile ? 'value="0" min="0" max="' + t + '"' : '') + '>');
                                      });
                                      value = expect('.WaMsetupInput');
                                      expect('.WaMsetupInput', (xhr) => {
                                        return xhr.addEventListener(isMobile ? 'input' : 'click', () => {
                                          return fixRepoAlerts(isMobile);
                                        });
                                      });
                                      expectation.forEach((inventoryService) => {
                                        return inventoryService.remove();
                                      });
                                      /** @type {!Array} */
                                      var list = [];
                                      if (isMobile) {
                                        for (let e of errors) {
                                          list.push(e);
                                        }
                                      } else {
                                        for (let moduleToTraverse of movies) {
                                          list.push(...moduleToTraverse[1]);
                                        }
                                      }
                                      value.forEach(function(ctx) {
                                        /** @type {number} */
                                        var value = +ctx.parentElement.id.split('_')[1];
                                        if (isMobile) {
                                          for (let item of list) {
                                            if (item[0] == value) {
                                              ctx.value = item[1];
                                            }
                                          }
                                        } else {
                                          /** @type {boolean} */
                                          ctx.checked = list.includes(value);
                                        }
                                      });
                                      fixRepoAlerts(isMobile);
                                    });
                                  });
                                })();
                              }
                            } else {
                              if (location.href.includes('economy/inventory') && !data.improveInventory) {
                                (function() {
                                  /**
                                   * @return {undefined}
                                   */
                                  function render() {
                                    $scope.inputs.quantity = stream[0].value;
                                    var e = $scope.settings.countries[$scope.inputs.selectedCountry].taxes[$scope.inputs.selectedIndustry];
                                    /** @type {number} */
                                    var price = $scope.inputs.pricePerUnit / ((100 + (e.valueAddedTax + ($scope.inputs.selectedCountry != params.country ? e.importTax : 0))) / 100);
                                    /** @type {number} */
                                    var baseNumber = price * $scope.inputs.quantity;
                                    expect('#TaxPerUnit', (dashboardPanel) => {
                                      return dashboardPanel.innerHTML = ($scope.inputs.pricePerUnit - price).toFixed(4);
                                    });
                                    expect('#Net_unit', (dashboardPanel) => {
                                      return dashboardPanel.innerHTML = price.toFixed(4);
                                    });
                                    expect('#Total_net', (dashboardPanel) => {
                                      return dashboardPanel.innerHTML = '<strong style="top:39px;left:410px">Total Net</strong><isZordacz style="top:46px;right:250px">' + resolve(baseNumber.toFixed(2)) + ' ' + params.currency + '</isZordacz><small style="top:70px;right:250px;left:auto;width:auto">' +
                                          resolve((baseNumber / data.goldPrice.price).toFixed(2)) + ' g</small>';
                                    });
                                  }

                                  /**
                                   * @return {undefined}
                                   */
                                  function r() {
                                    /** @type {string} */
                                    document.getElementById('totalFoodHP').innerHTML = 'Total food: ' + resolve(path[0] + path[1]) + 'HP';
                                  }

                                  /**
                                   * @return {undefined}
                                   */
                                  function start() {
                                    stream.forEach(function(sound) {
                                      sound.value = (itemAmounts[$scope.inputs.selectedIndustry] || {})[$scope.inputs.selectedQuality] || 0;
                                      sound.dispatchEvent(new Event('input'));
                                    });
                                    expect('#marketOffers tr', function(service) {
                                      if ($scope.inputs.selectedIndustry == service.dataset.industry_id && $scope.inputs.selectedQuality == service.dataset.quality) {
                                        $scope.inputs.selectedCountry = service.dataset.country_id;
                                        $scope.$apply();
                                        expect('.offers_price input', function(elem) {
                                          elem.value = service.querySelector('.offer_price strong').textContent;
                                          elem.dispatchEvent(new Event('input'));
                                        });
                                      }
                                    });
                                  }

                                  /**
                                   * @param {!Object} item
                                   * @param {string} i
                                   * @return {undefined}
                                   */
                                  function pick(item, i) {
                                    $(item.items[i].items, function(canCreateDiscussions, s) {
                                      itemAmounts[s.industryId] = itemAmounts[s.industryId] || {};
                                      itemAmounts[s.industryId][s.quality] = s.used ? s.amount - 1 : s.amount;
                                    });
                                  }

                                  append(
                                      '#Total_netF,.Total_net,.offer_price{text-align:right}#Total_netF span,.Total_net span,.offer_price span{margin-right:1px;font-size:11px}#Total_net *{position:absolute}tfoot tr{background:#f7fcff}#totalFoodHP{float:right;margin:5px 30px 0;color:#656565}#inventory_overview #sell_offers table td:last-child{padding-left:0}#inventory_overview #sell_offers table .delete_offer{opacity:1}');
                                  data.goldPrice = data.goldPrice || {};
                                  if (data.goldPrice.date != now) {
                                    callback('/' + side + '/economy/exchange/retrieve/', {
                                      _token: csrfToken,
                                      page: 1,
                                      currencyId: 62,
                                    }, function(stickerInfo) {
                                      /** @type {string} */
                                      data.goldPrice.price = JSON.stringify(stickerInfo).split('data-price=\'')[1].split('\'')[0];
                                      data.goldPrice.date = now;
                                      saveStuffDataToStorage();
                                    });
                                  }
                                  var $scope = angular.element('#sell_offers').scope();
                                  var stream = expect('.offers_quantity input', (inputElem) => {
                                    return inputElem.setAttribute('maxlength', 9);
                                  });
                                  /** @type {!Array} */
                                  var path = [0, 0];
                                  expect('#sell_offers', function(impl) {
                                    impl.addEventListener('input', render);
                                    impl.addEventListener('click', function(event) {
                                      if (event.target.matches('.sell_selector *')) {
                                        start();
                                      }
                                      render();
                                    });
                                  });
                                  expect('.area.storage h4:first-child strong', function(where) {
                                    where.insertAdjacentHTML('beforeEnd', ' <q id="freeSpace"></q>');
                                    where.insertAdjacentHTML('afterEnd', '<span id="totalFoodHP"></span>');
                                  });
                                  imageScopes.push(function(value, pathToDestinationFile) {
                                    if (pathToDestinationFile.includes('inventory-items')) {
                                      var row = angular.element('#inventoryItems').scope().inventory;
                                      path[0] = normalize(value);
                                      itemAmounts = {};
                                      pick(row, 'finalProducts');
                                      pick(row, 'rawMaterials');
                                      /** @type {string} */
                                      document.getElementById('freeSpace').innerHTML = 'Free space: ' + resolve(row.status.totalStorage - row.status.usedStorage);
                                      r();
                                      start();
                                      render();
                                    }
                                    if (pathToDestinationFile.includes('myMarketOffers') && (expect('#sell_offers th', function(e, topLeft) {
                                      /** @type {string} */
                                      e.style.width = (topLeft ? 1 == topLeft ? 80 : 2 == topLeft ? 140 : 3 == topLeft ? 60 : 132 : 70) + 'px';
                                      if (4 == topLeft) {
                                        e.querySelectorAll('a').forEach((year_selector_service) => {
                                          return year_selector_service.style = 'left:10px;margin-right:20px;padding:0 10px';
                                        });
                                      }
                                    }), expect('.relative', function(elem, canCreateDiscussions) {
                                      if (!canCreateDiscussions) {
                                        elem.querySelectorAll('span.ng-binding').forEach((builderID) => {
                                          return builderID.style.display = 'none';
                                        });
                                        /** @type {string} */
                                        elem.style.left = '35px';
                                        elem.querySelectorAll('small').forEach(function(elem) {
                                          /** @type {string} */
                                          elem.style = 'text-align:right;top:30px;left:-50px';
                                          elem.insertAdjacentHTML('beforeEnd', '<br><span>Tax / unit: </span><span id="TaxPerUnit"></span><br><span>Net / unit: </span><span id="Net_unit"></span><br>');
                                        });
                                      }
                                    }), expect('#sell_offers table', (types) => {
                                      return types.insertAdjacentHTML('beforeEnd', '<tfoot><tr><td colspan="3"><td id="Total_netF"></td><td colspan="2"></td></tr></tfoot>');
                                    }), expect('.offers_price', (table) => {
                                      return table.insertAdjacentHTML('afterEnd', '<th id="Total_net"></th>');
                                    }), render()), /marketplaceActions|myMarketOffers/.test(pathToDestinationFile)) {
                                      expect('.Total_net,.offer_price span', (inventoryService) => {
                                        return inventoryService.remove();
                                      });
                                      /** @type {number} */
                                      var total = 0;
                                      /** @type {number} */
                                      path[1] = 0;
                                      expect('#marketOffers tr', function(result) {
                                        var t = $scope.settings.countries[result.dataset.country_id].taxes[result.dataset.industry_id];
                                        /** @type {number} */
                                        var value = result.querySelector('.offer_price strong').textContent / ((100 + (t.valueAddedTax + (result.dataset.country_id != params.country ? t.importTax : 0))) / 100);
                                        /** @type {number} */
                                        var w = value * result.dataset.amount;
                                        total = total + w;
                                        result.querySelectorAll('.offer_price').forEach(function(where) {
                                          where.insertAdjacentHTML('beforeEnd', '<span><br>Net: ' + value.toFixed(4) + ' ' + params.currency + '</span>');
                                          where.insertAdjacentHTML('afterEnd', '<td class="Total_net"><strong>' + resolve(w.toFixed(2)) + '</strong> ' + params.currency + '<br><span>' + resolve((w / data.goldPrice.price).toFixed(2)) + ' g</span></td>');
                                        });
                                        if (1 == result.dataset.industry_id) {
                                          path[1] += result.dataset.amount * (result.dataset.quality < 7 ? 2 * result.dataset.quality : 20);
                                        }
                                      });
                                      r();
                                      /** @type {string} */
                                      document.getElementById('Total_netF').innerHTML = '<strong>' + resolve(total.toFixed(2)) + '</strong> ' + params.currency + '<br><span>' + resolve((total / data.goldPrice.price).toFixed(2)) + ' g</span>';
                                    }
                                  });
                                })();
                              } else {
                                if (location.href.includes('/article/') && location.hash.includes('comment')) {
                                  /** @type {boolean} */
                                  be = false;
                                  imageScopes.push(function(canCreateDiscussions, fileListAccumulator) {
                                    if (fileListAccumulator.includes('articleComments') && !be) {
                                      if (document.getElementById(location.hash.split('#')[1])) {
                                        /** @type {string} */
                                        location.hash = location.hash;
                                        setTimeout(function() {
                                          /** @type {string} */
                                          location.hash = location.hash;
                                        }, 500);
                                        /** @type {boolean} */
                                        be = true;
                                      } else {
                                        expect('.load-more-comments', (e) => {
                                          return e.click();
                                        });
                                      }
                                    }
                                  });
                                } else {
                                  if (location.href.includes('economy/job-market')) {
                                    done('job-market-json', function() {
                                      if (!document.getElementById('erepDE')) {
                                        append('#erepDE{color:#83b70b;float:right;margin:0 70px 0 10px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}.netSalary{font-size:11px}.bestNet{color:#83b70b!important}.travelToMarket{position:absolute;top:10px;right:220px}');
                                        expect('#job_market h1', (types) => {
                                          return types.insertAdjacentHTML('beforeEnd', '<a id="erepDE" href="//erepublik.tools/en/marketplace/jobs/0/offers">eRepublik<span>.tools</span></a>');
                                        });
                                      }
                                      expect('.netSalary,.travelToMarket', (inventoryService) => {
                                        return inventoryService.remove();
                                      });
                                      expect('.bestNet', (focusedObj) => {
                                        return focusedObj.classList.remove('bestNet');
                                      });
                                      /** @type {!Array} */
                                      var MINSPANS = [0];
                                      expect('.salary_sorted tr', function(elem) {
                                        var self = angular.element(elem).scope().job;
                                        elem.getElementsByClassName('jm_salary')[0].insertAdjacentHTML('beforeEnd', '<span class="stprice netSalary"><br>' + (self.salaryLimit > 0 ? 'Max  ' + resolve(self.salaryLimit) + 'cc/day' : 'No overtime limit') + '</span>');
                                        if (self.netSalary > MINSPANS[0]) {
                                          /** @type {!Array} */
                                          MINSPANS = [self.netSalary, elem];
                                        }
                                      });
                                      if (MINSPANS[1]) {
                                        MINSPANS[1].querySelector('.jm_net_salary').classList.add('bestNet');
                                      }
                                      var dataBackup = angular.element('#job_market').scope();
                                      if (!dataBackup.data.isFromThisCountry) {
                                        _('#job_market h1', dataBackup.settings.currentCountryId);
                                      }
                                    });
                                  } else {
                                    if (location.href.includes('tokens-market')) {
                                      insertContent('#marketplace', 'game-token/statistics/price');
                                      if (!data.autofillMarket) {
                                        done('economy/gameTokensMarketAjax', function() {
                                          expect('.quantity_button.maximum', (e) => {
                                            return e.click();
                                          });
                                        });
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              var be;
              if (!(chans || data.playerTooltip)) {
                (function() {
                  /**
                   * @param {string} name
                   * @param {number} bool
                   * @return {?}
                   */
                  function require(name, bool) {
                    return '<span style="background:' + (bool ? '#83B70B' : 'red') + ';padding:0 2px;border-radius:1px;font-weight:700;margin:0 1px">' + name + '</span>';
                  }

                  /**
                   * @param {!Object} scope
                   * @param {string} version
                   * @return {?}
                   */
                  function send(scope, version) {
                    var prev = scope.location;
                    var p = prev[version ? 'residenceCountry' : 'citizenshipCountry'];
                    /** @type {string} */
                    var micropost = p.name + (version ? ', ' + prev.residenceRegion.name : '');
                    return '<br><img src="//www.erepublik.net/images/flags_png/S/' + p.permalink + '.png">' + (version && micropost.length > 44 ? micropost.substring(0, 42) + '\u2026' : micropost) +
                        (version ? '<span style="font-family:Icons;color:' + (scope.city.residenceCityId ? scope.city.residenceCity.region_id == prev.residenceRegion.id ? '#83B70B' : '#FB7E3D' : '#009cff') + '">&nbsp;&nbsp;\ue811</span>' : '');
                  }

                  /**
                   * @param {string} str
                   * @return {?}
                   */
                  function toArray(str) {
                    return '<div style="background:#83B70B;padding:0 2px;border-radius:1px;color:#fff;margin:0 0 2px;font-weight:700;width:19px">' + str + '</div>';
                  }

                  /**
                   * @param {!Object} data
                   * @param {number} path
                   * @return {?}
                   */
                  function init(data, path) {
                    var entry = data.military.militaryData[path ? 'ground' : 'aircraft'];
                    var i = !data.citizen.is_organization && data.loggedIn.hovercardData.fighterInfo;
                    return '<div><img src="' + entry.icon + '"><div><isZordacz style="width:83%;background:linear-gradient(to right,#009cff 0%,#009cff ' + entry.progress + '%,#000 ' + (entry.progress + .1) + '%,#000 100%);display:block;margin:0 0 -15px 30px">' +
                        (path && entry.rankNumber > 69 ? 'Legend' + entry.name.split('Battalion')[1] : entry.name) + '<span style=""></span></isZordacz><br><brown>' + (data.citizen.is_organization ? '' : path ? 'Q7 hit: ' + resolve(i.military.damagePerHit) + (i.military.damagePerHitLegend >
                        0 ? ' (TP ' + resolve(i.military.damagePerHitLegend) + ')' : '') : 'Q0 hit: ' + resolve(i.aviation.damagePerHitNoWeapon)) + '</brown></div></div>';
                  }

                  /**
                   * @param {!Object} item
                   * @param {?} name
                   * @param {number} val
                   * @return {?}
                   */
                  function process(item, name, val) {
                    var state = val ? item.partyData : item.military.militaryUnit;
                    return '<div>' + (state ? '<img src="' + state.avatar + '" style="background:#fff">' : '') + '<div><isZordacz>' +
                        (val ? item.isPresident ? 'Country President' : item.title.country ? item.title.country : item.isCongressman ? 'Congressman' : item.isPartyPresident ? 'Party President' : state ? 'Member' : 'No political activity' : state && state.leader_id == name ? 'Commander' : !state ||
                        state.second_commander_1 != name && state.second_commander_2 != name ? state && JSON.stringify(state.leaders).includes(name) ?
                            'Captain' : state ? 'Soldier' : '' : 'Second Commander') + '</isZordacz><br><brown>' + (state ? state.name : 'No ' + (val ? 'political party' : 'military unit')) + '</brown></div></div>';
                  }

                  /**
                   * @param {!Object} self
                   * @param {?} done
                   * @param {!Object} eventData
                   * @param {?} callback
                   * @return {undefined}
                   */
                  function update(self, done, eventData, callback) {
                    /** @type {string} */
                    var uriToAdd = '';
                    $(self.achievements, function(canCreateDiscussions, that) {
                      uriToAdd = uriToAdd + (/hardworker|supersoldier/.test(that.img) ? '' : '<div style="width:23px;display:inline-block;text-shadow:none"><img src="//www.erepublik.net/images/achievements/icon_' + that.img + (that.count ? '_on' : '_off') +
                          '.gif" style="width:25px;margin:0 0 -5px 0"><span style="float:left;width:25px">' + (that.count > 9999 ? Math.floor(that.count / 1E3) + 'k' : that.count) + '</span></div>');
                    });
                    var opts = self.citizen;
                    var micropost = opts.name.toString();
                    var settings = self.activePacks;
                    /** @type {number} */
                    var g = self.citizenAttributes.experience_points % 5E3 / 5E3 * 100;
                    /** @type {string} */
                    var m = opts.level > 69 && opts.nextLevelXp - self.citizenAttributes.experience_points < 500 ? '#FB7E3D' : '#83B70B';
                    /** @type {string} */
                    element.innerHTML = eventData.orgTitle = '<div id="eRStooltip"><div style="background:rgb(30,30,30);height:84px"><img src="' + opts.avatar +
                        '" style="float:left;width:84px;height:84px;margin:0 2px 0 0;background:#fff;border-radius:5px 0 0 0"><isZordacz style="background:linear-gradient(to right,' + m + ' 0%,' + m + ' ' + g + '%,rgb(80,80,80) ' + (g + .1) + '%,rgb(80,80,80) 100%)">' + opts.level + '</isZordacz><isZordacz' +
                        (self.isDictator ? ' style="background:rgb(204,60,0)"' : '') + '>' + (micropost.length <
                        22 ? micropost : micropost.substring(0, 20) + '\u2026') + '</isZordacz>' + (opts.onlineStatus ? '<span style="background:#83B70B;border-radius:10px;height:12px;width:12px;display:inline-block;margin:0 5px -1px;border:1px solid;box-shadow:0 0 3px"></span>' : '') + '<br>' +
                        (opts.is_organization ? require('Organization', 1) : '') + (self.friends.isFriend ? require('Friend', 1) : '') + (opts.is_alive ? '' : require('Dead')) + ('Permanently' == opts.banStatus.type ? require('Permaban') :
                            opts.banStatus.type ? require('Tempban') : '') + (data.contributors && data.contributors.includes(+done) ? require('Stuff++ contributor', 1) : '') + (self.isModerator ? require('Mod') : '') + '<br><brown>' +
                        (opts.is_organization ? 'Created at: ' + opts.created_at : 'eR birthday: ' + self.loggedIn.hovercardData.born_on) + '</brown>' + send(self) + send(self, 1) + '</div><div style="position:absolute;top:2px;right:5px;text-align:center;width:20px">' +
                        (settings.power_pack ? toArray('PP') :
                            '') + (settings.infantry_kit ? toArray('IK') : '') + (settings.division_switch_pack ? toArray('MP') : '') + (isZordacz && data.l[opts.id] ? toArray('AF') : '') + '</div><div style="background:rgb(50,50,50);padding:0 5px;height:63px"><div>' + init(self, 1) + init(self) +
                        '</div><div>' + process(self, done, 1) + process(self, done) + '</div></div><div style="height:47px;background:#fff;color:#5a5a5a;border-radius:0 0 5px 5px;text-align:center;font:9px/14px Arial">' + uriToAdd + '</div></div>';
                    callback();
                  }

                  /**
                   * @return {undefined}
                   */
                  function cb() {
                    expect('#content a[href*="zen/pro"]:not(.eRStooltipAdded)', function(item) {
                      item.classList.add('eRStooltipAdded');
                      update(item, 'ns', function(prop) {
                        var _takingTooLongTimeout;
                        var key = item.href.split('profile/')[1];
                        return _this[key] ? update(_this[key], key, item, prop) : _takingTooLongTimeout = setTimeout(() => {
                          return test('/' + side + '/main/citizen-profile-json/' + key, function(links) {
                            _this[key] = links;
                            update(_this[key], key, item, prop);
                          });
                        }, 300), item.addEventListener('mouseleave', () => {
                          return clearTimeout(_takingTooLongTimeout);
                        }), item.orgTitle || 'Loading data...';
                      });
                    });
                  }

                  append(
                      '.citizen_activity a,.pic.tipsyElement a,.user-cmnt-avatar a{display:block}#eRStooltip{color:#fff;width:400px;font:11px/15px Arial;text-shadow:0 0 2px #000;text-align:left;margin:-7px;border:2px solid #000;border-radius:6px;box-shadow:0 0 5px #000}#eRStooltip>div>isZordacz{font:700 17px/20px Tahoma;border-radius:1px;padding:1px 2px;margin:0 1px 2px;display:inline-block}#eRStooltip>div>img:not(:first-child){margin:0 2px -4px 1px;width:14px}#eRStooltip>div:not(:last-child)>div{width:50%;float:left}#eRStooltip>div>div>div{height:30px;width:100%;float:left;margin:1px 0;overflow:hidden}#eRStooltip>div>div>div>img{width:30px;height:30px;float:left;margin:0 5px 0 0}#eRStooltip brown{color:#c3bb8c}');
                  /** @type {string} */
                  angular.element('body').injector().get('hovercardDirective')[0].restrict = 'E';
                  expect('[hovercard]', (rowElement) => {
                    return angular.element(rowElement).scope().getCitizenData = () => {
                    };
                  });
                  expect('hovercard-details', (inventoryService) => {
                    return inventoryService.remove();
                  });
                  var _this = {};
                  cb();
                  if (destinationUnitName || ms || location.href.includes('/article/')) {
                    setInterval(cb, 1E3);
                  } else {
                    imageScopes.push(() => {
                      return setTimeout(cb, 500);
                    });
                  }
                })();
              }
              if (!data.autoFighter) {
                (function() {
                  var e = require('preferCountries').split(',').map(Number);
                  var log = require('avoidCountries').split(',').map(Number);
                  /** @type {boolean} */
                  var i = false;
                  for (let block_idx of ['battlefield', 'autoBot', 'energyRecovery', 'autoLogin']) {
                    if (data[block_idx]) {
                      /** @type {boolean} */
                      data[block_idx] = false;
                      /** @type {boolean} */
                      i = true;
                    }
                  }
                  if (i) {
                    saveStuffDataToStorage();
                    _load('AutoFighter requires the following Stuff++ options:<br>-Improved battlefield<br>-AutoBot<br>-Automatic energy recovery<br>-Automatic login<br><br>They have been enabled for you.');
                    addEventListener('click', () => {
                      return location.reload();
                    });
                  }
                  if (parent.location.href.includes('A/u/t/o/F/i/g/h/t/e/r')) {
                    setTimeout(function() {
                      /**
                       * @param {!Object} m
                       * @param {!Array} t
                       * @return {undefined}
                       */
                      function render(m, t) {
                        if (t.length > 1) {
                          t.push('any');
                        }
                        t = t.filter((word, text, fileTitle) => {
                          return fileTitle.indexOf(word) == text && 'none' != word && (!params.dailyOrderDone || 'DO' != word);
                        });
                        var d = {};
                        var url = params.countryLocationId;
                        for (let search_lemma of t) {
                          /** @type {!Array} */
                          d[search_lemma] = [[], []];
                        }
                        $(m, function(i, args) {
                          if (!args.is_dict && !args.is_lib) {
                            var tab = args.inv;
                            var options = args.def;
                            var name = tab.id;
                            var i = options.id;
                            var data = args.is_rw && options.id == url || !args.is_rw && (tab.id == url || tab.ally_list.map((obj) => {
                              return obj.deployed ? obj.id : 0;
                            }).includes(url));
                            var callback = args.is_rw && options.id == url || !args.is_rw && (options.id == url || options.ally_list.map((obj) => {
                              return obj.deployed ? obj.id : 0;
                            }).includes(url));
                            /** @type {boolean} */
                            var parent = !log.includes(name);
                            /** @type {boolean} */
                            var num = !log.includes(i);
                            var id = data && parent;
                            var root = callback && num;
                            var value = e.includes(name) ? name : e.includes(i) ? i : parent ? name : num ? i : 0;
                            var newH = value && (name == value && data || i == value && callback) ? value : 0;
                            if (value && $(args.div, function(additionalResolves, options) {
                              /** @type {boolean} */
                              var major = 11 == options.div;
                              /** @type {boolean} */
                              var capturing = options.div == date;
                              if (!options.end && !options.terrain && (id || root) && (major || hasDate || capturing) && ('both' == highlightLetter || 'ground' == highlightLetter && !major || 'air' == highlightLetter && major)) {
                                for (let type of t) {
                                  let diH = component[type](args, data, callback, name, i, false, options);
                                  if (diH > -1 && d[type][0][capturing ? 'unshift' : 'push']([args.id, additionalResolves, 'epic' == type ? id && name == params.country ? name : root && i == params.country ? i : newH : type.includes('TP') ? params.country : diH > 0 ? diH : newH]), GenerateGif &&
                                  !type.includes('NoTravel')) {
                                    let update = component[type](args, data, callback, name, i, true, options);
                                    if (update > -1) {
                                      d[type][1].push([args.id, additionalResolves, 'epic' == type ? parent && name == params.country ? name : num && i == params.country ? i : value : type.includes('TP') ? params.country : update > 0 ? update : value]);
                                    }
                                  }
                                }
                              }
                            }), d[t[0]][0].length) {
                              return false;
                            }
                          }
                        });
                        for (let search_lemma of t) {
                          var args = d[search_lemma][0].concat(d[search_lemma][1])[0];
                          if (args) {
                            /** @type {boolean} */
                            b = true;
                            localStorage.afKills = 'DO' == search_lemma ? 25 : 'epic' == search_lemma && module ? -1 : require('maxKills');
                            value(...args);
                            break;
                          }
                        }
                      }

                      var flightMode;
                      var component = {
                        epic: (t, store, xgh2, xgh3, xgh4, xh2, xh3) => {
                          return 2 == xh3.epic ? 0 : -1;
                        },
                        DO: function(thing, next, arg, block, id, store) {
                          var body = params.dailyOrders;
                          if (body) {
                            for (let node of body) {
                              if (node.battleId == thing.id && (next && node.sideCountryId == block || arg && node.sideCountryId == id || store)) {
                                return node.sideCountryId;
                              }
                            }
                          }
                          return -1;
                        },
                        TP: (pip_offset_base, p, b, i, j, a) => {
                          return +(j == params.country && (b || a) || i == params.country && (p || a)) - 1;
                        },
                        TPrw: (pip_offset_base, p, b, i, j, a) => {
                          return +((j == params.country && (b || a) || i == params.country && (p || a)) && pip_offset_base.is_rw) - 1;
                        },
                        TPdirect: (pip_offset_base, p, b, i, j, a) => {
                          return +((j == params.country && (b || a) || i == params.country && (p || a)) && !pip_offset_base.is_rw) - 1;
                        },
                        anyNoTravel: (eta, lmbda, n) => {
                          return +(n || lmbda) - 1;
                        },
                        anyNoTravelAir: (h0, uvx0, uvy0, uvx1, uvy1, a, b) => {
                          return +((uvy0 || uvx0) && 11 == b.div) - 1;
                        },
                        anyNoTravelGround: (h0, uvx0, uvy0, uvx1, uvy1, a, b) => {
                          return +((uvy0 || uvx0) && 11 != b.div) - 1;
                        },
                        anyAir: (h0, uvx0, uvy0, uvx1, uvy1, a, b) => {
                          return +(11 == b.div) - 1;
                        },
                        anyGround: (h0, uvx0, uvy0, uvx1, uvy1, a, b) => {
                          return +(11 != b.div) - 1;
                        },
                        RW: (eta, lmbda, n, froot, fext, params, doload) => {
                          return +eta.is_rw - 1;
                        },
                        any: () => {
                          return 0;
                        },
                      };
                      if (hasLicense()) {
                        if (setTimeout(() => {
                          return location.href = '/' + side + '/military/campaigns';
                        }, 60 * (ms ? 15 : 5) * 1E3), top.lastCheck = Date.now(), chans) {
                          var unhandledDepCount = globalNS.userInfo.wellness + food_remaining;
                          if (params.dailyTasksDone && !params.hasReward) {
                            callback('/' + side + '/main/daily-tasks-reward', {
                              _token: csrfToken,
                            });
                          }
                          if (require('collectWcRewards') && localStorage.afKills) {
                            callback('/' + side + '/main/weekly-challenge-collect-all', {
                              _token: csrfToken,
                            });
                          }
                          localStorage.removeItem('afKills');
                          if (params.dailyOrderDone && !params.hasDailyOrderReward) {
                            callback('/' + side + '/military/group-missions', {
                              action: 'check',
                              _token: csrfToken,
                            });
                          }
                          /** @type {number} */
                          var q = parseInt(document.getElementById('live_time').textContent);
                          if (unhandledDepCount > 50 && Math.abs((localStorage.workTrainLastAttempt || -9) - q) > 1) {
                            var html = require('work');
                            var txt = require('workOvertime');
                            /** @type {string} */
                            localStorage.workTrainLastAttempt = q.toString();
                            if (!params.dailyTasksDone && require('train')) {
                              test('/' + side + '/main/training-grounds-json', function(that) {
                                var data = {
                                  _token: csrfToken,
                                };
                                for (let i = 0; i < that.grounds.length; i++) {
                                  data['grounds[' + i + '][id]'] = that.grounds[i].id;
                                  /** @type {number} */
                                  data['grounds[' + i + '][train]'] = 1;
                                }
                                callback('/' + side + '/economy/train', data);
                              });
                              /** @type {number} */
                              unhandledDepCount = unhandledDepCount - 40;
                            }
                            if (html || txt) {
                              test('/' + side + '/main/job-data', function(s) {
                                if (html && !s.alreadyWorked) {
                                  callback('/' + side + '/economy/work', {
                                    _token: csrfToken,
                                    action_type: 'work',
                                  });
                                } else {
                                  if (txt && 1E3 * s.overTime.nextOverTime - Date.now() < 0 && s.overTime.points > 23) {
                                    callback('/' + side + '/economy/workOvertime', {
                                      _token: csrfToken,
                                      action_type: 'workOvertime',
                                    });
                                  }
                                }
                              });
                              /** @type {number} */
                              unhandledDepCount = unhandledDepCount - 10;
                            }
                          }
                          if (require('buyMMgold') && now != localStorage.boughtGoldDay) {
                            callback('/' + side + '/economy/exchange/retrieve/', {
                              _token: csrfToken,
                              personalOffers: 0,
                              page: 0,
                              currencyId: 62,
                            }, function(relativeResource) {
                              localStorage.boughtGoldDay = now;
                              var createdCollection = relativeResource.buy_mode.split('purchase_');
                              /** @type {!Array} */
                              var stack = [];
                              for (let j = 1; j < createdCollection.length; j++) {
                                let value = createdCollection[j];
                                if (parseInt(value.split('data-max=\'')[1]) >= 10) {
                                  stack.push(parseInt(value));
                                }
                              }
                              !function e() {
                                callback('/' + side + '/economy/exchange/purchase/', {
                                  _token: csrfToken,
                                  offerId: stack.shift(),
                                  amount: 10,
                                  page: 0,
                                  currencyId: 62,
                                }, function(importError) {
                                  if (/does not exist|more than the offered/.test(importError.message) && stack.length) {
                                    setTimeout(e, 2E3);
                                  }
                                });
                              }();
                            });
                          } else {
                            if ((b && 0 !== navigator.maxTouchPoints && q > 15 || !b) && handlebars && recentFiles.length && +localStorage.getItem('wamAttempt') < movies.length + 2) {
                              var tmp = recentFiles.pop();
                              if (unhandledDepCount >= Math.min(10 * tmp[1].length, 2 * reset_health_to_recover - 10)) {
                                /** @type {number} */
                                var total_seconds = localStorage.wamAttempt = +localStorage.getItem('wamAttempt') + 1;
                                var infos = tmp[1];
                                let r = {
                                  action_type: 'production',
                                  _token: csrfToken,
                                };
                                for (let i = 0; i < infos.length; i++) {
                                  r['companies[' + i + '][id]'] = infos[i];
                                  /** @type {number} */
                                  r['companies[' + i + '][employee_works]'] = 0;
                                  /** @type {number} */
                                  r['companies[' + i + '][own_work]'] = 1;
                                }
                                setTimeout(() => {
                                  return compare(0, tmp[0], 0, 0, function() {
                                    setTimeout(() => {
                                      return callback('/' + side + '/economy/work', r, function(data) {
                                        var ba = data.status && data.message || 'already_worked' == data.message;
                                        if (ba && (localStorage.wamCompaniesLeftToday = JSON.stringify(recentFiles)), b) {
                                          /** @type {string} */
                                          var restoreDate = (ba ? 'WORKED SUCCESSFULLY' : JSON.stringify(data).substring(0, 500)) + (total_seconds > 1 ? '<br>Attempts: ' + total_seconds : '');
                                          /** @type {string} */
                                          localStorage.waMLog = restoreDate;
                                          /** @type {string} */
                                          top.document.getElementById('status').innerHTML = '<div style="background:' + (ba ? '#83B70B' : 'red') + '">' + restoreDate + '</div>';
                                        }
                                        /** @type {string} */
                                        location.href = '/' + side + '/military/campaigns';
                                      });
                                    }, 3E3);
                                  });
                                }, 3E3);
                              }
                            } else {
                              if (Handlebars && errors.length && now != localStorage.assignedEmployeesDay) {
                                localStorage.assignedEmployeesDay = now;
                                let x = {
                                  action_type: 'production',
                                  _token: csrfToken,
                                };
                                for (let indexErr = 0; indexErr < errors.length; indexErr++) {
                                  let Xv = errors[indexErr];
                                  x['companies[' + indexErr + '][id]'] = Xv[0];
                                  x['companies[' + indexErr + '][employee_works]'] = Xv[1];
                                  /** @type {number} */
                                  x['companies[' + indexErr + '][own_work]'] = 0;
                                }
                                setTimeout(() => {
                                  return callback('/' + side + '/economy/work', x);
                                }, 3E3);
                              } else {
                                /** @type {boolean} */
                                var b = false;
                                var mode = battleListingScope.campaigns.list;
                                if (unhandledDepCount >= reset_health_to_recover * require('energyRatio') && +require('maxKills') > 0) {
                                  render(mode, files);
                                } else {
                                  if (unhandledDepCount > 499 && module && files.includes('epic')) {
                                    render(mode, ['epic']);
                                  }
                                }
                                if (!b && require('returnToResidence') && item.hasResidence && params.regionLocationId != item.regionId) {
                                  setTimeout(() => {
                                    return compare(item.countryId, item.regionId, 0, 0, () => {
                                    });
                                  }, 3E4);
                                }
                              }
                            }
                          }
                        } else {
                          if (ms) {
                            if (SERVER_DATA.webDeployEnabled) {
                              callback('/' + side + '/main/profile-update', {
                                action: 'options',
                                params: '{"optionName":"enable_web_deploy","optionValue":"' + (flightMode ? 'on' : 'off') + '"}',
                                _token: csrfToken,
                              });
                            }
                            if (type && !SERVER_DATA.onAirforceBattlefield && currentWeaponId != type) {
                              selectWeapon(type);
                            } else {
                              if (target && SERVER_DATA.onAirforceBattlefield && currentWeaponId != target) {
                                selectWeapon(target);
                              }
                            }
                            setTimeout(function() {
                              /** @type {number} */
                              var value = +localStorage.afKills;
                              if (value < 0 ? (document.getElementById('stopNoEpic').checked = true, module && document.getElementById('allin').click()) : globalNS.userInfo.wellness > reset_health_to_recover && (document.getElementById('allin').click(), setInterval(function() {
                                if (globalNS.userInfo.wellness < reset_health_to_recover) {
                                  location.reload();
                                }
                              }, 2E3)), document.getElementById('kills').value = value < 0 ? require('maxKills') : value, hasLicense()) {
                                /** @type {(Element|null)} */
                                var t = document.getElementById('AutoBotSwitch');
                                t.click();
                                setInterval(function() {
                                  if ('AUTOBOT ON' != t.textContent) {
                                    setTimeout(function() {
                                      if (require('returnToResidence') && item.hasResidence && params.regionLocationId != item.regionId) {
                                        setTimeout(() => {
                                          return compare(item.countryId, item.regionId, 0, 0, () => {
                                            return location.href = '/' + side + '/military/campaigns';
                                          });
                                        }, 3E3);
                                      } else {
                                        /** @type {string} */
                                        location.href = '/' + side + '/military/campaigns';
                                      }
                                    }, value < 0 ? 12E4 : 0);
                                  }
                                }, 2E3);
                              }
                            }, 3E3);
                          }
                        }
                      }
                    }, 5E3);
                  }
                })();
              }
              expect('#menu5 li a[href*="elections"]', function(sourceDest) {
                /** @type {number} */
                var t = +document.querySelector('.date').textContent.split(' ')[1];
                /** @type {string} */
                sourceDest.href = '/' + side + '/main/' + (t > 4 && t < 15 ? 'presidential' : t > 14 && t < 25 ? 'party' : 'congress') + '-elections';
              });
            }
          }
        }
      });
    }
  }
}();
