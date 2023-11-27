// ==UserScript==
// @name		  eRepublik Stuff++ Unlocked
// @description An unlocked version of stuff++ (https://docs.google.com/spreadsheets/d/1nal62cgC7lUmrur6NRzlPVU3uxtE59WGV9-bZcPoIw8/edit#gid=0), that for some reason didn't want to run after Zordacz ban.
// @author		Zordacz, Humberd
// @version		5.67
// @match		  https://www.erepublik.com/*
// @updateUrl https://raw.githubusercontent.com/Humberd/Stuff-unlocked/master/src/index.user.js
// @run-at		document-end
// @grant		  none
// ==/UserScript==
function getMapObjectFromIframe() {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const script = document.createElement("script");
      script.textContent = `
        window.getOriginalMap = function() {
          return Map;
        };
      `;
      iframe.contentDocument.body.appendChild(script);

      return iframe.contentWindow.getOriginalMap();
    }
    window.originalMap = getMapObjectFromIframe();
        // We make sure that the Map object is the original one
        ((Map) => {
           /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 680:
/***/ (() => {

// ********** OLD INDEX START **********
/* eslint-disable */ // const CONTRIBUTORS_URL =
//   "https://raw.githubusercontent.com/Humberd/Stuff-unlocked/dev/src/contributors.json";
const CONTRIBUTORS_URL="https://raw.githubusercontent.com/Humberd/Stuff-unlocked/master/dist/contributors.json";!function(){/** @type {!Array} */var afterRequestCallbacks=[];/** @type {function(this:XMLHttpRequest, (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=): undefined} */var oldSend=XMLHttpRequest.prototype.send;/**
   * @param {(ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=} p0
   * @return {undefined}
   */XMLHttpRequest.prototype.send=function(){this.addEventListener("load",function(){/** @type {*} */var text="{"==this.responseText.trim()[0]?JSON.parse(this.responseText):this.responseText;setTimeout(()=>{for(let requestCallback of afterRequestCallbacks){requestCallback(text,this.responseURL);}},200);});oldSend.apply(this,arguments);};// Evaluate the script after the page has loaded.
console.log(document.readyState);if(document.readyState==='loading'){window.addEventListener("DOMContentLoaded",onContentLoaded);}else{onContentLoaded();}function onContentLoaded(){/**
     * @param {!Object} args
     * @param {!Function} query
     * @return {undefined}
     */function $(args,query){for(let i in args){if(args.hasOwnProperty(i)&&false===query(i,args[i])){break;}}}/**
     * @param {string} value
     * @param {!Function} cont
     * @return {?}
     */function expect(value,cont){/** @type {!NodeList<Element>} */var n=document.querySelectorAll(value);return cont&&n.forEach((expr,className)=>{return cont(expr,className);}),n;}/**
     * @param {string} variableNames
     * @return {undefined}
     */function append(variableNames){document.head.insertAdjacentHTML("beforeEnd","<style>"+variableNames+"</style>");}/**
     * @param {!Object} name
     * @return {?}
     */function resolve(name){return name.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");}/**
     * @param {number} value
     * @param {number} precision
     * @return {?}
     */function format(value,precision){return value>999999999?(value/1e9).toFixed(precision+1)+"B":value>999999?(value/1e6).toFixed(precision)+"M":resolve(+value.toFixed(precision));}/**
     * @param {string} url
     * @param {!Function} callback
     * @return {undefined}
     */function test(url,callback){fetch(url,{credentials:"same-origin"}).then(e=>{return e.text();}).then(value=>{return callback&&callback("{"==value.trim()[0]?JSON.parse(value):value);});}/**
     * @param {string} v
     * @param {!Object} _
     * @param {!Function} done
     * @return {undefined}
     */function callback(v,_,done){/** @type {string} */var reverse_search_string="";$(_,(qov,fileFullpath)=>{return reverse_search_string=reverse_search_string+("&"+encodeURIComponent(qov)+"="+encodeURIComponent(fileFullpath));});fetch(v,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},credentials:"same-origin",body:reverse_search_string.substring(1)}).then(e=>{return e.text();}).then(result=>{return done&&done("{"==result.trim()[0]?JSON.parse(result):result);});}/**
     * @param {!Object} elem
     * @param {string} value
     * @param {!Function} resolve
     * @return {undefined}
     */function update(elem,value,resolve){/**
       * @return {undefined}
       */function init(){/** @type {string} */element.style="";var event=elem.getBoundingClientRect();var type=elem.gravity||"ns";type="ns"==type?event.top-element.offsetHeight-5<0?"s":"n":type;element.style["w"==type?"right":"left"]=("ns".includes(type)?event.left+event.width/2-element.offsetWidth/2:"w"==type?innerWidth-event.left-5:event.right+5).toFixed()+"px";element.style["n"==type?"bottom":"top"]=("ew".includes(type)?event.top+event.height/2-element.offsetHeight/2:"n"==type?innerHeight-event.top+5:event.bottom+5).toFixed()+"px";if(elem.matches(":hover")){/** @type {string} */element.style.visibility="visible";}}/** @type {string} */elem.gravity=value;elem.addEventListener("mouseenter",function(canCreateDiscussions){var value=elem.title||elem.orgtitle;/** @type {string} */element.innerHTML="";element.innerHTML=resolve?resolve(init):value;elem.orgtitle=value;/** @type {string} */elem.title="";init();});elem.addEventListener("mouseleave",()=>{return element.style="";});}/**
     * @return {undefined}
     */function load(){test(CONTRIBUTORS_URL,function(askForResult){Object.assign(data,askForResult);checkCurrentVersion();saveStuffDataToStorage();});}/**
     * @return {undefined}
     */function saveStuffDataToStorage(){/** @type {string} */localStorage.stuff=JSON.stringify(data);}/**
     * @return {undefined}
     */function resetTodayStats(){/** @type {!Array} */result=[0,0,0,0];/** @type {string} */localStorage.statsToday=JSON.stringify(result);expect("#NoKills",inventoryService=>{return inventoryService.remove();});}/**
     * @param {number} i
     * @param {!Function} callback
     * @return {undefined}
     */function u(i,callback){if(redLookupTable[i]){setTimeout(callback);}else{test("/"+side+"/economy/marketpicture/"+i,function(n){redLookupTable[i]=n;callback();});}}/**
     * @param {number} usetwemoji
     * @return {?}
     */function restart(usetwemoji){return 1==usetwemoji?"food":2==usetwemoji?"weapons":3==usetwemoji?"tickets":4==usetwemoji?"houses":7==usetwemoji?"frm":12==usetwemoji?"wrm":17==usetwemoji?"hrm":23==usetwemoji?"aircraft":"arm";}/**
     * @param {string} url
     * @param {!Function} callback
     * @return {undefined}
     */function done(url,callback){afterRequestCallbacks.push(function(canCreateDiscussions,url){if(url.includes(url)){setTimeout(callback);}});}/**
     * @param {string} key
     * @return {?}
     */function require(key){return key in data?data[key]:defaultOptions[key];}/**
     * @param {string} useIframe
     * @return {undefined}
     */function _load(useIframe){document.body.insertAdjacentHTML("afterBegin",'<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);z-index:9999" onclick="this.remove()"><div style="background:red;color:#fff;text-align:center;width:100%;font:bold 15px Arial;padding:5px">'+useIframe+"<br><button>Close</button></div></div>");setTimeout(()=>{return location.reload();},6e4);}/**
     * @param {!Node} y
     * @param {number} r
     * @param {!Function} p
     * @param {boolean} v
     * @return {undefined}
     */function cb(y,r,p,v){/** @type {number} */var o=Date.now()+1e3*r;!function t(){/** @type {number} */var firstBytePositionOfNextBlock=(o-Date.now())/1e3;if(firstBytePositionOfNextBlock<1){p(y);}else{/** @type {number} */var inPropertyPath=Math.floor(firstBytePositionOfNextBlock/3600);/** @type {number} */var width=Math.floor(firstBytePositionOfNextBlock%3600/60);/** @type {number} */var h=Math.floor(firstBytePositionOfNextBlock%60);/** @type {string} */y.textContent=(v?inPropertyPath?inPropertyPath+":":"":"-")+(v?width>9?width:"0"+width:width)+(v?"":"m")+":"+(h>9?h:"0"+h)+(v?"":"s");setTimeout(t,1e3);}}();}/**
     * @return {undefined}
     */function updateExpCounter(){expect("#xpleft span",function(cell){/** @type {number} */var winprob=5e3-params.currentExperiencePoints%5e3;/** @type {number} */cell.textContent=winprob;/** @type {string} */cell.style.background=winprob>500?"#6ebce5":"#FB7E3D";});}/**
     * @param {!Object} _
     * @param {?} id
     * @param {number} n
     * @param {number} done
     * @param {!Function} output
     * @return {undefined}
     */function compare(_,id,n,done,output){var data={_token:csrfToken,battleId:n||0};if(_){/** @type {!Object} */data.toCountryId=_;}if(id){data.inRegionId=id;}if(done){/** @type {number} */data.sideCountryId=done;}callback("/"+side+"/main/travel/",data,function(){if(output){output();}else{location.reload();}});}/**
     * @param {number} c
     * @param {boolean} i
     * @return {?}
     */function fn(c,i){return c<10&&!i?"0"+c:c;}/**
     * @param {string} value
     * @return {?}
     */function _resolve(value){return"<span class='stuffTipsySpan'>"+value+"</span><br>";}/**
     * @return {?}
     */function use(){return Math.min(reset_health_to_recover-globalNS.userInfo.wellness,food_remaining)>=smallestFood.use;}/**
     * @param {?} prop
     * @return {?}
     */function normalize(prop){/** @type {number} */var value=0;return $(prop.inventoryItems.finalProducts.items,(canCreateDiscussions,props)=>{return value=value+(1==props.industryId&&props.quality<8?props.amount*props.attributes.energyRestore.value:0);}),value;}/**
     * @return {undefined}
     */function init(){expect(".costperUse,#otherMarket,.travelToMarket",inventoryService=>{return inventoryService.remove();});var options=angular.element("#marketplace").scope();/** @type {!Array} */var args=[options.settings.isSharedOffer?options.marketplace[0].country_id:options.settings.countryId,options.settings.industryId,options.settings.isSharedOffer?options.marketplace[0].customization_level:options.settings.lastQuality];var i=args[0]==params.country?params.countryLocationId:params.country;/** @type {(Element|null)} */var fontAwesomeLink=document.getElementById("erepDE");/** @type {(Element|null)} */var resultBody=document.querySelector("#marketplace h1");if(fontAwesomeLink){/** @type {string} */fontAwesomeLink.href="//erepublik.tools/en/marketplace/items/0/"+args[1]+"/"+args[2]+"/offers";}else{append("#otherMarket,#otherMarket span{padding:0 4px;border-radius:2px;float:right}#otherMarket{background:#83b70b;color:#fff;cursor:pointer;text-shadow:0 0 2px #000}#otherMarket:hover{background:#fb7e3d}#otherMarket span{background:#fb7e3d;margin:0 -4px 0 4px}#erepDE{color:#83b70b;float:right;margin:0 70px 0 10px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}.costperUse{font-size:11px}.travelToMarket{position:absolute;top:1px;right:10px}");if(resultBody){resultBody.insertAdjacentHTML("beforeEnd",'<a id="erepDE" href="//erepublik.tools/en/marketplace/items/0/'+args[1]+"/"+args[2]+'/offers">eRepublik<span>.tools</span></a>');}}if(options.settings.isSharedOffer){expect(".list_products",table=>{return table.insertAdjacentHTML("afterEnd",'<a href="/'+side+"/economy/marketplace#"+args[0]+"/"+args[1]+"/"+args[2]+'" class="std_global_btn smallSize blueColor" style="top:15px;left:420px">Show all offers</a>');});}else{if(!(params.countryLocationId==params.country&&args[0]==params.country)){u(i,function(){var e_total=(((redLookupTable[i][restart(args[1])]||{})["q"+args[2]]||[])[0]||{}).gross;if(resultBody){resultBody.insertAdjacentHTML("beforeEnd",'<a id="otherMarket">'+_this.info.countries[i].name+"<span>"+(e_total?e_total.toFixed(2)+params.currency:"No offers")+"</span></a>");}document.getElementById("otherMarket").addEventListener("click",()=>{return expect("#countryId",function(dropdown){dropdown.value=i;dropdown.dispatchEvent(new Event("change"));});});});}}if(!(options.settings.can_buy||options.settings.my_offer)){_("#filters_expanded",args[0]);}if(args[1]<2){expect("#marketplace .price_sorted tr",function(docDom){var elem=docDom.getElementsByClassName("m_price")[0];elem.insertAdjacentHTML("beforeEnd",'<span class="stprice costperUse"><br>'+(parseFloat(elem.textContent)/industryJSON[args[1]].attributes[args[2]].effect).toFixed(4)+" cc/hp</span>");});}}/**
     * @param {string} e
     * @param {string} undefined
     * @return {undefined}
     */function _(e,undefined){callback("/"+side+"/main/travelData",{check:"getCountryRegions",countryId:undefined,_token:csrfToken},function(b){/** @type {!Array} */var range=[0,99999];$(b.regions,function(index,result){if(result.canMove&&result.countryId==undefined&&result.cost<range[1]){/** @type {!Array} */range=[index,result.cost];}});if(range[0]){expect(e,types=>{return types.insertAdjacentHTML("beforeEnd",'<a class="std_global_btn smallSize blueColor travelToMarket">Travel to market ('+range[1]+"cc)</a>");});expect(".travelToMarket",e=>{return e.addEventListener("click",()=>{return compare(undefined,range[0]);});});}});}/**
     * @param {string} css
     * @param {string} done
     * @return {undefined}
     */function insertContent(css,done){append("#erepDE{color:#83b70b;float:right;margin:0 20px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}");expect(css+" h1",types=>{return types.insertAdjacentHTML("beforeEnd",'<a id="erepDE" href="//erepublik.tools/en/marketplace/'+done+'">eRepublik<span>.tools</span></a>');});}/**
     * @return {undefined}
     */function run(){/** @type {boolean} */var e=[7,12,17,24].includes(+angular.element("#marketplace").scope().settings.industryId);expect(".buyField",function(self){/** @type {number} */self.value=Math.min(parseInt(params.currencyAmount/self.dataset.price),self.nextElementSibling.nextElementSibling.getAttribute("maximum"),Math.max(Math.floor((window.freeSpace||99999999)/(e?100:1))-(e?1:0),0));self.dispatchEvent(new Event("input"));});}/**
     * @return {?}
     */function hasLicense(){return 999;}/**
     * @return {undefined}
     */function checkCurrentVersion(){if(data.version&&data.version!=GM_info.script.version){expect(".stuffBtn,#stuffOptions>:nth-child(1) a:nth-child(3)",function(e,canCreateDiscussions){/** @type {string} */e.style.background="#F95555";if(!canCreateDiscussions){/** @type {string} */e.childNodes[0].nodeValue="CLICK TO UPDATE";}});}}/**
     * @param {string} str
     * @param {string} charset
     * @param {?} text
     * @param {boolean} i
     * @return {undefined}
     */function value(str,charset,text,i){var data={_token:csrfToken,battleId:str,battleZoneId:charset};if(text){data.sideCountryId=text;}callback("/"+side+"/main/battlefieldTravel",data,()=>{return i?0:location.href="/"+side+"/military/battlefield/"+str;});}/**
     * @param {!Object} data
     * @param {boolean} isNew
     * @return {undefined}
     */function checkKillProgress(data,isNew){var n=isNew?+data.damage.replace(/,/g,""):data.bomb?data.bomb.damage:data.oldEnemy.isNatural?Math.floor(1.1*data.user.givenDamage):data.user.givenDamage;var B=isNew?+data.rewards.prestigePoints.replace(/,/g,""):data.hits||1;/** @type {number} */var num=isNew?+data.kills.replace(/,/g,""):1;result[0]+=num;result[1]+=B;result[SERVER_DATA.onAirforceBattlefield?3:2]+=n;/** @type {string} */localStorage.statsToday=JSON.stringify(result);personal_stats.forEach(function(url,m){savedStats[m]=+savedStats[m]+(m?m<2?B:n:num);url.textContent=resolve(savedStats[m]);});/** @type {string} */document.cookie=SERVER_DATA.battleZoneId+"-"+SERVER_DATA.leftBattleId+"="+savedStats.join("|")+";max-age=7200;Secure;SameSite=Strict";updateExpCounter();if(window.mercenaryEl){/** @type {number} */mercenaryEl.textContent=Math.min(+mercenaryEl.textContent+num,25);}if(window.freedomFighterEl){/** @type {number} */freedomFighterEl.textContent=Math.min(+freedomFighterEl.textContent+num,75);}}/**
     * @return {undefined}
     */function link(){test("/"+side+"/main/citizen-profile-json/"+name,function(r){append("#mercFFcontainer{position:absolute;top:1px;z-index:5;text-align:center;text-shadow:0 0 2px #000}#mercFFcontainer div{color:#fff;padding:3px;font:700 11px Arial;width:40px;display:inline-block}#mercenary{background:#fb7e3d}#freedom_fighter{background:#83b70b}#mercFFdiv{position:absolute;top:1px;right:150px}#mercFFdiv span{cursor:default;padding:3px;color:#fff;font:700 11px Arial;text-shadow:0 0 2px #000;margin:1px 2px;border-radius:5px;float:left;clear:both;width:70px;text-align:center}.mercenaryFF{text-align:center;position:absolute;top:0;width:100%}.mercenaryFF span{cursor:default;color:#fff;padding:3px;font:700 11px Arial;text-shadow:0 0 2px #000;width:14px;border-radius:5px;margin:5px}");var message=r.freedomFighter;var kills=message.milestone.kills;var $scope=r.achievements[11].mercenaryProgress;if(ms){/** @type {number} */var killCount=0;var region=document.getElementById("region_name_link").title.split("Region name - ")[1];$(message.progress.wars.inprogress,function(canCreateDiscussions,ui){if(ui.region==region){/** @type {number} */killCount=Math.min(ui.kills,75);}});var enable_keys=SERVER_DATA.isResistance&&(SERVER_DATA.leftBattleId==SERVER_DATA.realInvaderId||SERVER_DATA.spectatorOnly);expect("#pvp",types=>{return types.insertAdjacentHTML("beforeEnd",'<div id="mercFFcontainer"><div id="mercenary" title="Mercenary kills"><q>'+$scope.details[SERVER_DATA.leftBattleId].enemies_killed+"</q> - "+$scope.details[SERVER_DATA.rightBattleId].enemies_killed+"</div>"+(enable_keys?'<div id="freedom_fighter" title="Freedom Fighter kills"><q>'+killCount+"</q> / <q>"+kills+"</q></div>":"")+"</div>");});if(enable_keys){expect("#kills",select_ele=>{return select_ele.value=kills-killCount>0?kills-killCount:25;});}/** @type {(Element|null)} */mercenaryEl=document.querySelector("#mercenary q");/** @type {(Element|null)} */freedomFighterEl=document.querySelector("#freedom_fighter q:first-child");}else{setInterval(()=>{return expect(".war_card:not(.mercAdded)",function(elem){elem.classList.add("mercAdded");var scope=angular.element(elem).scope().campaign;var flag=$scope.details[scope.inv.id].enemies_killed;var good=$scope.details[scope.def.id].enemies_killed;/** @type {number} */var connected=0;if(scope.is_rw){$(message.progress.wars.inprogress,function(canCreateDiscussions,data){if(data.war_id==scope.war_id){/** @type {number} */connected=Math.min(data.kills,75);}});}if(!(scope.is_dict||scope.is_lib)){elem.querySelector(".war_flags").insertAdjacentHTML("beforeEnd",'<div class="mercenaryFF"><span title="Mercenary kills" style="float:left;background:'+(flag?flag<25?"#fb7e3d":"#83b70b":"red")+'">'+flag+"</span>"+(scope.is_rw?'<span title="Freedom Fighter kills" style="position:relative;top:5px;background:'+(connected?connected<kills?"#fb7e3d":"#83b70b":"red")+'">'+connected+" / "+kills+"</span>":"")+'<span title="Mercenary kills" style="float:right;background:'+(good?good<25?"#fb7e3d":"#83b70b":"red")+'">'+good+"</span></div>");}elem.querySelectorAll(".mercenaryFF span").forEach(cur=>{return update(cur);});});},200);expect(".filters_wrapper",function(types){/** @type {!Array} */var timestamps=[message.progress.regions,message.milestone.regions];types.insertAdjacentHTML("beforeEnd",'<div id="mercFFdiv"><span style="background:#fb7e3d" title="'+25*(50-$scope.progress.current)+' kills needed">Merc '+$scope.progress.current+'/50</span><span style="background:#83b70b" title="'+(timestamps[1]-timestamps[0])*kills+' kills needed">FF '+timestamps[0]+"/"+timestamps[1]+" (x"+kills+")</span></div>");});}expect("#mercFFdiv span,#mercenary,#freedom_fighter",cur=>{return update(cur);});});}/**
     * @return {undefined}
     */function renderProfilePageSidepanelImprovements(){/**
       * @param {number} i
       * @return {undefined}
       */function init(i){test("/"+side+"/main/citizen-friends/"+name+"/"+i+"/list",function(result){new DOMParser().parseFromString(result.content,"text/html").querySelectorAll(".dead").forEach(function(callingModule){/** @type {string} */var t=callingModule.id.split("_")[1];if(!a.includes(t)){a.push(t);}});/** @type {string} */l_p[0].textContent="Scanning... "+(i/NUM_BOXES*100).toFixed(1)+"%";if(i<NUM_BOXES){init(i+1);}else{(function update(){if(a.length){/** @type {string} */l_p[0].textContent="Removing... "+a.length+" left";callback("/"+side+"/main/citizen-friends/"+a.pop()+"/1/remove?_token="+csrfToken,{},function(){/** @type {string} */s.textContent=s.textContent.replace(/\d+/,+s.textContent.match(/\d+/)[0]-1);update();});}else{/** @type {string} */l_p[0].textContent="Done!";/** @type {string} */l_p[0].style.background="#83B70B";}})();}});}append("#achievment>li{margin:3px 5px}#contributor,#removeDead{background:#83b70b;font:700 11px Arial;text-align:center;border-radius:1px;text-shadow:0 0 2px #000}#contributor{position:absolute;width:152px;padding:3px;color:#fff;cursor:default;z-index:999}#removeDead{width:100%;display:inline-block;cursor:pointer;color:#fff;padding:3px 0}#removeDead:hover{background:#fb7e3d}#erepboxStats{float:right;margin:-4px 10px;width:24px}#erepboxStats:hover{transform:scale(1.2,1.2)}#erepDE{font:800 12px Arial;color:#83b70b;position:absolute;right:50px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}");expect(".citizen_avatar",e=>{return e.outerHTML='<a href="//erpk-static-avatars.s3.amazonaws.com/'+e.getAttribute("style").split("smart/")[1].split(")")[0]+'">'+e.outerHTML+"</a>";});/** @type {number} */var find=+location.href.split("/")[6];/** @type {number} */var order=0;if(expect(".counter",selfContext=>{return order=order+ +selfContext.textContent;}),expect("#career_tab_content",h=>{return h.previousElementSibling.insertAdjacentHTML("beforeEnd"," ("+order+')<a href="//erepbox.ru/content/profile/profile.php?id='+find+'"><img id="erepboxStats" src="//erepbox.ru/images/logo.png" title="Click for more stats"></a><a id="erepDE" href="//erepublik.tools/en/society/citizen/'+find+'" title="Click for more stats">eRepublik<span>.tools</span></a>');}),expect(".rank_name_holder a",function(report){var name=report.textContent.split("Battalion")[1];if(name){/** @type {string} */report.textContent="Legend"+name;}}),data.contributors&&data.contributors.includes(find)&&expect(".citizen_sidebar",table=>{return table.insertAdjacentHTML("afterBegin",'<div id="contributor">Stuff++ Contributor<div>');}),location.href.includes("/citizen/profile/"+name)){var _s$textContent;expect(".citizen_activity",function(elem){/** @type {number} */elem.style.padding=0;elem.insertAdjacentHTML("beforeEnd",'<div id="removeDead">Remove dead friends</div>');});/** @type {!Array} */var a=[];/** @type {(Element|null)} */var s=document.querySelector(".friends_title a");/** @type {number} */var NUM_BOXES=Math.ceil((s===null||s===void 0?void 0:(_s$textContent=s.textContent)===null||_s$textContent===void 0?void 0:_s$textContent.match(/\d+/)[0])/20||0);expect(".view_friends",inventoryService=>{return inventoryService.remove();});var l_p=expect("#removeDead",stopDom=>{return stopDom.addEventListener("click",function(){/** @type {!Array} */a=[];init(1);/** @type {string} */stopDom.style.background="#FB7E3D";});});}else{expect("#donate_to_friend div",inventoryService=>{return inventoryService.remove();});}}if(localStorage.scriptData||localStorage.ChoosenInfo){localStorage.clear();}if(document.querySelector(".user_section")){document.querySelector(".user_section").style.float="none";}globalNS.userInfo.wellness=Number(document.querySelector("#currentEnergy").textContent||2000);var _this=window.erepublik||{};var params=_this.citizen||{};var side=(_this.settings||{}).culture||"en";var item=params.residence;var date=params.division;var name=params.citizenId||0;/** @type {boolean} */var isZordacz=name%397854==0;var defaultOptions={work:true,train:true,workOvertime:true,workAsManager:true,wamCompanies:[],assignEmployees:true,employeeCompanies:[],buyMMgold:true,collectWcRewards:true,returnToResidence:true,energyRatio:1.75,maxKills:25,epicAllIn:true,prefWeapGround:7,prefWeapAir:-1,battlePrios:isZordacz?["TPrw","DO","RW","anyNoTravel","epic"]:["epic","DO","TP","RW","anyNoTravel"],allowTravel:true,battleType:isZordacz?"air":date<4?"ground":"both",preferCountries:"",avoidCountries:"",l:{},b:[]};/** @type {*} */var data=JSON.parse(localStorage.stuff||0)||defaultOptions;console.log(data);var type=require("prefWeapGround");var target=require("prefWeapAir");var files=require("battlePrios");var highlightLetter=require("battleType");var GenerateGif=require("allowTravel");var module=require("epicAllIn");var handlebars=require("workAsManager");var movies=require("wamCompanies");var Handlebars=require("assignEmployees");var errors=require("employeeCompanies");/** @type {*} */var recentFiles=JSON.parse(localStorage.wamCompaniesLeftToday||0)||[];/** @type {*} */var result=JSON.parse(localStorage.statsToday||"[0,0,0,0]");var destinationUnitName=Environment.isOnHomepage;/** @type {boolean} */var toTop=top==self;/** @type {boolean} */var chans=location.href.includes("military/campaigns");/** @type {boolean} */var le=location.href.includes("citizen/profile");var ms=SERVER_DATA.battleId;/** @type {boolean} */var hasDate="true"==localStorage.hasMaverick;if(!data.autoRefresh&&destinationUnitName||!window.$j&&!top.location.href.includes("A/u/t/o/F/i/g/h/t/e/r")){setTimeout(()=>{return location.href="/";},6e5);}var now=_this.settings.eDay||data.update||0;/** @type {!Element} */var path=false;/** @type {(Element|null)} */var esearchRes=document.getElementById("foodResetHours");var redLookupTable={};// ---- FIX HERE: START ----
// if (now && data.update != now && (data.update = now, resetTodayStats(), saveStuffDataToStorage(), load(), localStorage.wamCompaniesLeftToday = JSON.stringify(movies), localStorage.wamAttempt = '0'), data['rgb'[2]].length && !data['rgb'[2]].includes(name)) {
if(true){// ---- FIX HERE: END ----
if(SERVER_DATA.sessionValidation){}else{hookUpFeedCommentsScroll();hookUpPowerSpin();hookUpDailyChallengeAutoCollect();hookUpDonatorBadges(data.unlocked);document.body.insertAdjacentHTML("beforeEnd",'<div id="stuffTipsy"></div>');/** @type {(Element|null)} */var element=document.getElementById("stuffTipsy");if(append("#large_sidebar{left:auto!important}#stuffTipsy{visibility:hidden;background:#fff;text-shadow:0 1px 0 rgba(255,255,255,.3);font:200 10px Arial;color:#5a5a5a;text-align:center;padding:5px;border-radius:2px;position:fixed;z-index:999999;box-shadow:0 0 5px gray;pointer-events:none}.stuffTipsySpan{padding:1px 3px;margin:1px 0;color:#fff;background:#83b70b;font:700 11px Arial;text-shadow:0 0 2px #000;border-radius:5px;display:inline-block}"),document.getElementById("login_form")&&!data.autoLogin&&(expect("#remember",radioItem=>{return radioItem.checked=true;}),expect("#login_form button",function(e){var stream=expect("#login_form input[id^=citizen_]");if(stream[0]&&stream[0].value.length>2&&stream[1]&&stream[1].value.length>2){e.click();}})),path?path.style.left=0:item.hasResidence&&params.regionLocationId!=item.regionId&&(expect(".user_section",types=>{return types.insertAdjacentHTML("afterEnd",'<a class="std_global_btn smallSize blueColor" id="travelBackHome" style="padding: 0 15px; width: 100%; margin-bottom: 10px"><span>Travel back home</span></a>');}),expect("#travelBackHome",e=>{return e.addEventListener("click",()=>{return compare(item.countryId,item.regionId);});})),!toTop||!function(){if(append("#stuffBlock,#stuffOptions>*{display:none;position:fixed}#stuffOptions a,.stuffBtn{cursor:pointer;background:#83b70b;border-radius:1px}#stuffOptions a:hover,#stuffOptions span,.stuffBtn span,.stuffBtn:hover,#AFlaunch:hover{background:#fb7e3d}#stuffOptions span,.stuffBtn{color:#fff;display:inline-block;text-align:center}.stuffBtn{"+(path?"margin:6px 2px;font:700 11px/13px Arial;padding:2px 0 2px 3px;float:left;border-radius:9px":"margin:5px 0 -5px;width:100%;font:700 11px/14px Arial;padding:3px 0")+";text-shadow:0 0 2px #000}.stuffBtn span{float:right;"+(path?"margin:-2px 0 -2px 2px;padding:2px 3px":"margin:-3px 0;padding:3px 7px")+"}#AFlaunch{position:fixed;bottom:80px;left:5px;width:100px;height:100px;background:#83b70b;cursor:pointer;border-radius:50px;box-shadow:2px 2px 5px gray;z-index:9}#AFlaunch div{margin:25px 30px;border-style:solid;border-width:25px 0 25px 50px;border-color:transparent transparent transparent #fff}")){return 1;}var e;expect(path?".misc":".user_finances",content=>{return content.insertAdjacentHTML(path?"afterBegin":"afterEnd",'<div class="stuffBtn">Stuff++ Unlocked<span>'+GM_info.script.version+"</span></div>");});expect(".stuffBtn",(t,canCreateDiscussions)=>{return t.addEventListener("click",function(){if(!e){/** @type {number} */e=1;append("#stuffOptions>*{background:#000;box-shadow:0 1px 4px;cursor:default;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999;border-radius:5px;text-shadow:0 0 2px #000}#stuffOptions>*>:first-child{position:absolute;top:-20px;width:100%;text-align:center}#stuffOptions>:first-child>:not(:first-child){width:48%;margin:1%;float:left;background:#242b27}#stuffOptions .header-links{display:flex; justify-content: space-around;}#stuffOptions a{color:#fff;font-weight:700;padding:5px}#stuffBlock{z-index:9999;top:0;width:100%;height:100%;background:rgba(0,0,0,.6)}#stuffOptions label{color:#fff;padding:2px 5px;display:inline-block}#stuffOptions>:first-child label{width:96.7%;font-size:13px}#stuffOptions label:hover{background:#5f5757}#stuffOptions span{padding:2px 0;font-weight:700;width:100%}#stuffOptions input,#stuffOptions select{float:right;margin:2px 0}#stuffOptions>:nth-child(2) input[type=checkbox]{position:relative;top:2px}#stuffOptions input[type=text]{width:280px;text-align:center}#stuffOptions>:nth-child(2) label{width:97.8%;font:13px/22px Arial}#stuffOptions>div>:nth-child(2) a{margin:0px;background:none;color:#83b70b}#stuffOptions>div>:nth-child(2) a:hover{color:#fb7e3d}");/** @type {string} */var t='<select class="battlePrio"><option value="epic">Epic battles</option><option value="DO">Daily order</option><option value="TP">TP battles - any</option><option value="TPrw">TP - resistance wars</option><option value="TPdirect">TP - direct battles</option><option value="RW">Resistance wars</option><option value="anyNoTravel">Any no-travel battle</option><option value="anyNoTravelAir">Any no-travel air battle</option><option value="anyNoTravelGround">Any no-travel ground battle</option><option value="anyAir">Any air battle</option><option value="anyGround">Any ground battle</option><option value="any">Any battle</option><option value="none">None</option></select>';document.body.insertAdjacentHTML("beforeEnd",'<div id="stuffBlock"></div><div id="stuffOptions"><div style="width:602px"><div class="header-links"><a href="https://github.com/Humberd/Stuff-unlocked">Stuff++ Unlocked Website</a><a class="eRSreset">RESET</a><a href="//github.com/Humberd/Stuff-unlocked/raw/master/src/index.user.js">UPDATE</a><a href="/'+side+'/citizen/profile/4659830">Contact / Donate</a><a>Close</a></div><div><span>Battlefield</span><label>Improved battlefield<input id="battlefield" type="checkbox"></label><label>Replace BH/SH view with damage top10<input id="topLists" type="checkbox"></label><span>Companies</span><label>Company manager<input id="companyManager" type="checkbox"></label><label>Show the best local job offer<input id="showBestJobOffer" type="checkbox"></label><span>Energy</span><label>Automatic energy recovery<input id="energyRecovery" type="checkbox"></label><label>Show remaining time to full health reserve<input id="fullEnergy" type="checkbox"></label><label>Show recoverable energy<input id="maxEnergy" type="checkbox"></label><span>Main page</span><label>Hide medal posts<input id="hideMedals" type="checkbox"></label><label>Autorefresh main page every 10 minutes<input id="autoRefresh" type="checkbox"></label><label>Epic battle sensor<input id="epicSensor" type="checkbox"></label><span>Marketplace</span><label>Improved marketplace<input id="improveMarketplace" type="checkbox"></label><label>Autofill maximum item amount<input id="autofillMarket" type="checkbox"></label><label>Direct market links in main menu<input id="marketLinks" type="checkbox"></label></div><div><span>Monetary market</span><label>Autofill maximum gold amount<input id="autofillGold" type="checkbox"></label><span>Profile</span><label>Improved profile page<input id="improveProfile" type="checkbox"></label><label>Influence calculator<input id="influenceCalculator" type="checkbox"></label><span>Storage</span><label>Improved inventory<input id="improveInventory" type="checkbox"></label><label>Display sidebar storage<input id="displayStorage" type="checkbox"></label><span>Wars page</span><label>Compact layout<input id="compactWarsPage" type="checkbox"></label><label>Replace "waiting" with countdown timers<input id="replaceWaitingwithCountdown" type="checkbox"></label><span>Other</span><label>Display XP needed to level-up<input id="xpLeft" type="checkbox"></label><label>Kills, PP, and damage on sidebar<input id="showStats" type="checkbox"></label><label>Mercenary and Freedom Fighter progress<input id="mercFF" type="checkbox"></label><label>Remove external link warning<input id="externalLinks" type="checkbox"></label><label>Improved player hovercards<input id="playerTooltip" type="checkbox"></label><label>Automatic login<input id="autoLogin" type="checkbox"></label><label>Block pack/promo popups<input id="popupBlocker" type="checkbox"></label><label>Remove True Patriot notifications<input id="closeTPnotifications" type="checkbox"></label></div></div><div style="width:452px"><div><a href="//docs.google.com/spreadsheets/d/1APUYLfQfiNW1MbZmE1nMA8mFrcWbkFVvD9AK9JmVj08">AutoFighter Website</a><a class="eRSreset">RESET</a><a href="/'+side+'/citizen/profile/4659830">Contact</a><a>Close</a></div><div style="width:98%;margin:1%;float:left;background:#242B27"><span>Settings<div id="AF_l" style="position:absolute;top:6px;right:10px;color:yellow"></div></span><label>Train<input id="train" type="checkbox"></label><label>Work (for employer)<input id="work" type="checkbox"></label><label>Work overtime<input id="workOvertime" type="checkbox"></label><label>Work as manager (visit companies page for setup)<input id="workAsManager" type="checkbox"></label><label>Assign employees (as above)<input id="assignEmployees" type="checkbox"></label><label>Buy 10g from monetary market<input id="buyMMgold" type="checkbox"></label><label>Collect Weekly Challenge rewards<input id="collectWcRewards" type="checkbox"></label><label>Return to residence<input id="returnToResidence" type="checkbox"></label><label>Don\'t fight until you have<input id="energyRatio" type="range" min="0" max="2.00" step="0.05"><isZordacz style="float:right;margin:0 5px"></isZordacz></label><label>Maximum kills to do in one go<input id="maxKills" type="number" min="0" style="width:70px;text-align:right"></label><label>Go all-in in epic battles (without EBs)<input id="epicAllIn" type="checkbox"></label><label>Preferred ground weapon<select id="prefWeapGround"><option value="0">No preference</option><option value="-1">Q0</option><option value="1">Q1</option><option value="2">Q2</option><option value="3">Q3</option><option value="4">Q4</option><option value="5">Q5</option><option value="6">Q6</option><option value="7">Q7</option><option value="10">Bazooka</option></select></label><label>Preferred air weapon<select id="prefWeapAir"><option value="0">No preference</option><option value="-1">Q0</option><option value="1">Q1</option></select></label><label>Battle priority #1'+t+"</label><label>Battle priority #2"+t+"</label><label>Battle priority #3"+t+"</label><label>Battle priority #4"+t+"</label><label>Battle priority #5"+t+'</label><label>Allow travel if needed<input id="allowTravel" type="checkbox"></label><label>Battle type preference<select id="battleType"><option value="both">No preference</option><option value="ground">Ground ONLY</option><option value="air">Air ONLY</option></select></label><label>Preferred countries<input id="preferCountries" type="text" placeholder="comma-separated country IDs, e.g. 67,68,69"></label><label>Avoided countries<input id="avoidCountries" type="text" placeholder="comma-separated country IDs, e.g. 67,68,69"></label><a href="http://wcsimulator.droppages.com/countryids.html" id="countryIDs">Country IDs</a></div></div></div>');checkCurrentVersion();expect("#stuffOptions a:last-child,#stuffBlock",e=>{return e.addEventListener("click",()=>{return expect("#stuffOptions>*,#stuffBlock",builderID=>{return builderID.style.display="none";});});});expect(".eRSreset",e=>{return e.addEventListener("click",function(){localStorage.clear();/** @type {string} */location.href="/";});});expect("#stuffOptions>*",(e,localAction)=>{return e.querySelectorAll("input").forEach(function(self){/** @type {string} */var prop="checkbox"==self.type?"checked":"value";if(localAction){self[prop]=require(self.id);}else{/** @type {boolean} */self.checked=!data[self.id];}self.addEventListener("change",function(){data[self.id]=localAction?"text"==self.type?self.value.replace(/[^0-9,]/g,""):self[prop]:!self.checked;saveStuffDataToStorage();});});});expect("#energyRatio",function(el){var a=el.nextSibling;el.addEventListener("input",function(){/** @type {string} */var hp=(el.value*reset_health_to_recover).toFixed(0);/** @type {string} */a.textContent=hp>reset_health_to_recover?reset_health_to_recover+"hp+"+(hp-reset_health_to_recover)+"hp":hp+"hp";/** @type {string} */a.style.color=el.value<1.8&&el.value>0.5?"#83B70B":"red";});el.dispatchEvent(new Event("input"));});expect("#prefWeapGround,#prefWeapAir,#battleType",function(radio,isArray){radio.value=2==isArray?highlightLetter:isArray?target:type;radio.addEventListener("change",function(){data[2==isArray?"battleType":isArray?"prefWeapAir":"prefWeapGround"]=radio.value;saveStuffDataToStorage();});});expect(".battlePrio",function(el,i){el.value=files[i];el.addEventListener("change",function(){data.battlePrios[i]=el.value;saveStuffDataToStorage();});});}load();expect("#stuffOptions>:nth-child("+(canCreateDiscussions+1)+"),#stuffBlock",builderID=>{return builderID.style.display="block";});});});checkCurrentVersion();expect("#AFlaunch",function(local){update(local,"e");local.addEventListener("click",function(){if(hasLicense()){/** @type {string} */location.href="/A/u/t/o/F/i/g/h/t/e/r";}else{_load("Could not find a valid license or your license has expired. If you think this is incorrect, open the settings and click RESET.");}});});}()){window.reset_health_to_recover=2000;expect(".user_section",elem=>{const tooltipElem=document.querySelector("#eatFoodTooltip");if(!tooltipElem){return;}const clonedTooltipElem=tooltipElem.cloneNode(true);clonedTooltipElem.style.padding="10px";clonedTooltipElem.style.paddingBottom="5px";clonedTooltipElem.style.marginBottom="10px";clonedTooltipElem.style.backgroundColor="rgb(208, 237, 242)";return elem.insertAdjacentElement("afterEnd",clonedTooltipElem);});if(params.currentExperiencePoints&&window.reset_health_to_recover&&(function(){/**
                 * @return {undefined}
                 */function init(){/** @type {(Element|null)} */var td1b2=document.querySelector("#AutoBotSwitch");if(!(td1b2&&"AUTOBOT ON"==td1b2.textContent||globalNS.userInfo.wellness>=reset_health_to_recover||!use()||!smallestFood.use||SERVER_DATA.deployment)){add();}}/**
                 * @return {undefined}
                 */function add(){test("/"+side+"/main/eat?format=json&_token="+csrfToken+"&buttonColor=blue",result=>{return energy.processResponse(result);});}append(".col{line-height:19px}");init();/** @type {number} */var progress=setInterval(init,3e3);if(path){expect(".energyBg",function(o){o.addEventListener("mouseenter",()=>{return expect("#wellnessTooltipNbp",function(elem){elem.querySelectorAll(".bullets").forEach(inventoryService=>{return inventoryService.remove();});});});o.addEventListener("click",add);});}else{expect(".health_bg",function(t){update(t,"w",value);t.addEventListener("click",add);});expect("#DailyConsumtionTrigger",builderID=>{return builderID.style.display="none";});}expect("#fight_btn",t=>{return t.addEventListener("click",function(){clearInterval(progress);/** @type {number} */progress=setInterval(init,3e3);});});}(),data.xpLeft||(append("#xpleft{margin-bottom:10px; margin-left: 10px;font-size:10px"+(path?"right:769px;position:absolute":"color:#777;position:relative")+"}#xpleft span{padding:1px;color:#fff;border-radius:2px}"),expect(".user_section",types=>{return types.insertAdjacentHTML("afterEnd",'<div id="xpleft">XP left: <span></span></div>');}),path&&(expect("#DailyConsumtionTrigger",pTool=>{return pTool.style.visibility="hidden";}),expect(".energyTooltip",smallActionBox=>{return smallActionBox.style.top="42px";}),path.style.top="30px"),updateExpCounter()),data.maxEnergy||function(){append(".health_bar strong#maxRecover{line-height:14px;text-align:right;background:none;float:right;right:2px;"+(path?"position:absolute;z-index:4;font-size:9px;text-shadow:0 0 5px rgba(0,0,0,.85);font-weight:unset":"")+"}");expect("#current_health",table=>{return table.insertAdjacentHTML("afterEnd",'<strong id="maxRecover"></strong>');});}(),data.fullEnergy||setTimeout(function(){append(".health_bar strong#full_energy{line-height:14px;text-align:left;left:"+(path?"10px;position:absolute;z-index:4;font-size:9px;text-shadow:0 0 5px rgba(0,0,0,.85);font-weight:unset":"15px")+";background:none;float:left}");expect("#current_health",where=>{return where.insertAdjacentHTML("beforeBegin",'<strong id="full_energy"></strong>');});})),toTop&&(data.externalLinks||function(){/**
                 * @return {undefined}
                 */function initialize(){expect('a[href*="/main/warn/"]',a=>{return a.href=atob(a.href.split("/main/warn/")[1]);});}afterRequestCallbacks.push(function(canCreateDiscussions,url){if(!/\/eat|\/inventory|\/campaigns/.test(url)){initialize();}if(url.includes("main/messages")){setTimeout(initialize,300);}});initialize();}(),data.marketLinks||function(){/**
                 * @param {number} type
                 * @param {number} a
                 * @param {number} b
                 * @return {?}
                 */function fn(type,a,b){return(b?'<a href="/'+side+"/economy/marketplace#"+targ+"/"+type+"/"+a+'">':"<div>")+'<img src="//www.erepublik.net/images/icons/industry/'+type+"/q"+a+'.png">'+(b?"</a>":"</div>");}/**
                 * @param {!Event} elements
                 * @return {undefined}
                 */function init(elements){if(!elements.target.querySelectorAll("a").length){var string=elements.target.getElementsByTagName("img")[0].src.split("industry/")[1].split("/")[0];/** @type {string} */var buffer="";/** @type {number} */var context=1;for(;context<(string<3?8:string<5?6:2);context++){/** @type {string} */buffer=buffer+fn(string,context,1);}elements.target.insertAdjacentHTML("beforeEnd",3==string?buffer:buffer+fn(1==string?7:2==string?12:4==string?17:24,1,1));if(location.href.includes("economy/marketplace")){elements.target.querySelectorAll("a").forEach(e=>{return e.addEventListener("click",()=>{return setTimeout(()=>{return location.reload();},200);});});}}}append("#marketMenu div,#marketMenu div:hover a{display:inline-block}#marketMenu{position:absolute;top:30px;right:2px}#marketMenu *{width:27px;height:27px}#marketMenu div{line-height:0}#marketMenu a{display:none;float:left;clear:both;background:RGBA(131,183,11,.8);border-radius:5px}#marketMenu a:hover{background:#FB7E3D}#marketMenu img{margin-bottom:-5px}");/** @type {string} */var ret="";var targ=params[item.hasResidence&&params.regionLocationId!=item.regionId?"countryLocationId":"country"];/** @type {number} */var r=1;for(;r<6;r++){/** @type {string} */ret=ret+fn(1==r?1:2==r?2:3==r?23:4==r?3:4,1==r?1:2==r?7:3==r?1:4==r?5:1);}expect("#newMenu",types=>{return types.insertAdjacentHTML("beforeEnd",'<div id="marketMenu">'+ret+"</div>");});expect("#marketMenu",e=>{return e.querySelectorAll("div").forEach($this=>{return $this.addEventListener("mouseenter",init);});});}(),data.popupBlocker||function(){/**
                 * @return {undefined}
                 */function toDateInputStr(){/** @type {number} */localStorage["promoPopupTimestamp_"+playdate.getFullYear()+"-"+playdate.getMonth()+"-"+playdate.getDate()]=9999999999999;}/** @type {!Date} */var playdate=new Date();toDateInputStr();playdate.setDate(playdate.getDate()+1);toDateInputStr();}(),data.closeTPnotifications||done("citizenNotifications",function(){/** @type {number} */var idx_last=0;var $scope=angular.element("#SideNotificationController").scope();for(let e of $scope.notifications){if(e.iconURL&&e.iconURL.includes("atriot")){idx_last++;}}for(;idx_last>0;){if($scope.notifications.active.iconURL.includes("atriot")){$scope.closeNotif();/** @type {number} */idx_last=idx_last-1;}else{$scope.goNext();}}})),data.showStats||path||(append("#NoKills{cursor:pointer;font:700 11px/14px arial;float:left;width:145px;margin:6px 3px 0}#NoKills strong{color:#666}#NoKills span{color:#3c8fa7;float:right}"),expect(".user_finances",table=>{return table.insertAdjacentHTML("afterEnd",'<div id="NoKills">'+(result[0]||result[1]?"<strong>Kills | PP:</strong><span>"+resolve(result[0])+" | "+resolve(result[1])+"</span>":"")+(result[2]?"<br><strong>Ground:</strong><span>"+resolve(result[2])+"</span>":"")+(result[3]?"<br><strong>Air:</strong><span>"+resolve(result[3])+"</span>":"")+"</div>");}),expect("#NoKills",connect=>{return connect.addEventListener("click",resetTodayStats);})),toTop&&(destinationUnitName||/military\/campaigns|\/citizen\/profile|donate-items|\/economy\/marketplace|economy\/myCompanies/.test(location.href))&&!data.displayStorage&&test("/"+side+"/economy/inventory-items/",function(selectedHostFolder){if(!data.displayStorage&&(!le||le&&location.href.includes("citizen/profile/"+name))){(function(item){/**
                         * @param {!Object} scope
                         * @param {string} key
                         * @return {?}
                         */function build(scope,key){return scope.attributes[key]?("energyRestore"==key?"Energy restore":"firePower"==key?"Firepower":"energyPool"==key?"Energy pool":"")+": "+_resolve(resolve(scope.attributes[key].value)):"";}append("#sideInventory{opacity:0;transition:opacity 1s;position:absolute;line-height:0;max-height:80vh;column-width:39px;column-gap:1px;text-shadow:0 0 2px #000}#sideInventory img{height:39px;width:39px;background:linear-gradient(#eef1ec,#d5decf)}#sideInventory span{font:700 10px/13px arial;color:#fff;background:#83b70b;width:39px;text-align:center;cursor:default;display:block}#sideInventory div{box-shadow:1px 1px 5px gray;page-break-inside:avoid}.col{line-height:19px}#sideInventory q{background:red;display:block;width:100%}#overTime img{box-shadow:0 0 0 3px inset #fb7e3d}#overTime img:hover{filter:brightness(1.1)}"+(path?"":"#storageCapacity{float:left;color:#5a5a5a;text-shadow:0 1px 0 rgba(255,255,255,.9);font-size:11px;cursor:default}#storageCapacity img{float:left;margin:-1px 6px 0 2px;width:22px;height:16px}#storageCapacity strong{margin:0 1px}"));var err=normalize(item);/** @type {number} */var val=0;/** @type {!Object} */var result=Object.assign(item.inventoryItems.finalProducts.items,item.inventoryItems.rawMaterials.items,(item.inventoryItems.activeEnhancements||{}).items||[]);/** @type {string} */var s='<div id="sideInventory">';$(result,function(dataset_,options){if((options.icon||options.active)&&!options.isPartial){var purl=result[dataset_+"_partial"];var enable_keys="4_100"==options.id&&options.amount>23&&params.dailyTasksDone&&globalNS.userInfo.wellness>9;var b=options.isExpirable;var u=b?options.attributes.expirationInfo.value:0;s=s+("<div"+(options.active&&options.active.time_left<36e3?' data-time-left="'+options.active.time_left+'"':"")+(enable_keys?' id="overTime"':"")+' title="'+options.name+"<br>"+build(options,"energyRestore")+build(options,"firePower")+build(options,"energyPool")+(options.used?"1 partially used "+_resolve(options.used.durability.value+" "+options.used.durability.type+" left"):"")+(b?u.join("<br>"):"")+(enable_keys?_resolve("Click to work overtime for 10hp"):"")+'"><img src="'+(options.icon?options.icon:"damageBoosters"==options.type?"/images/modules/pvp/damage_boosters/damage_booster.png":"speedBoosters"==options.type?"/images/modules/pvp/speed_boosters/speed_booster.png":"prestigePointsBoosters"==options.type?"/images/modules/pvp/prestige_points_boosters/prestige_booster.png":"eventDamageBoosters"==options.type?"/images/modules/pvp/allBoosters/eventDamageBoosters.png":"aircraftDamageBoosters"==options.type?"/images/modules/pvp/damage_boosters/air_damage_booster.png":"/images/icons/boosters/52px/"+options.type+".png")+'"><span>'+(options.active?options.active.time_left>864e3?Math.trunc(options.active.time_left/86400)+"d":options.active.time_left>86400?Math.trunc(options.active.time_left/86400)+"d"+Math.trunc(options.active.time_left%86400/3600)+"h":"<q>"+Math.trunc(options.active.time_left/3600)+"h"+Math.trunc(options.active.time_left%3600/60)+"m</q>":options.isRaw?Math.trunc(10*(options.amount+(purl?purl.amount.split("%")[0]/100:0)))/10:b&&/[0-9],[0-9]{3}/g.exec(u)[0].replace(",","")-now<8||1==options.industryId&&options.quality<8&&err<240*globalNS.userInfo.energyPerInterval?"<q>"+resolve(options.amount)+"</q>":format(options.amount,2))+"</span></div>");}if(!isNaN(options.amount)){val=val+options.amount*("1_10"==dataset_?10:"1_11"==dataset_?20:0);}});document.body.insertAdjacentHTML("afterBegin",s+"</div>");expect("#sideInventory div",function(li){update(li,"e");if(li.dataset.timeLeft){cb(li.querySelector("q"),+li.dataset.timeLeft,()=>{return li.remove();},1);}});setTimeout(()=>{return document.getElementById("sideInventory").style.opacity=1;});expect("#overTime",e=>{return e.addEventListener("click",()=>{return test("/"+side+"/main/job-data",function(attempt){/** @type {number} */var n=1e3*attempt.overTime.nextOverTime-Date.now();if(n<0){callback("/"+side+"/economy/workOvertime",{_token:csrfToken,action_type:"workOvertime"},function(response){var n=response.status&&response.message;if(humanMsg.displayMsg(n?"Success!":"captcha"==response.message?"Captcha - try to work on the companies page":"Error: "+response.message),n){var enableLink=e.querySelector("span");/** @type {number} */enableLink.textContent=+enableLink.textContent-24;if(+enableLink.textContent<1){e.remove();}else{e.removeAttribute("id");}globalNS.updateCurrency(params.currencyAmount+response.result.netSalary);energy.modifyHealth(globalNS.userInfo.wellness-10);if(!data.xpLeft){params.currentExperiencePoints+=2;updateExpCounter();}}});}else{/** @type {number} */var stars=parseInt(n/6e4+1);humanMsg.displayMsg("You must wait "+stars+" minute"+(stars>1?"s":"")+" before working for 10hp again");}});});});/** @type {string} */var funcCode=resolve(item.inventoryStatus.usedStorage)+" / "+resolve(item.inventoryStatus.totalStorage);if(path){expect(".currency",table=>{return table.insertAdjacentHTML("afterEnd",'<article id="storageCapacity" class="currency"><span class="amount">'+funcCode+'</span><img src="/images/modules/manager/tab_storage.png" class="icon" style="height:16px"></article>');});expect("span.name",e=>{return e.textContent=e.textContent.split(",")[0];});}else{expect(".currency_amount",table=>{return table.insertAdjacentHTML("afterEnd",'<div id="storageCapacity"><img src="/images/modules/manager/tab_storage.png"><strong></strong></div>');});}/** @type {number} */freeSpace=item.inventoryStatus.totalStorage-item.inventoryStatus.usedStorage;update(document.getElementById("storageCapacity"),path?"s":"w",()=>{return"Free space: "+_resolve(resolve(freeSpace))+"Total EB hits: "+_resolve(resolve(val))+"Total food HP: "+_resolve(resolve(err));});expect("#storageCapacity strong",function(scriptElement){/** @type {string} */scriptElement.textContent=funcCode;scriptElement.addEventListener("click",()=>{return expect("#InfCalc_hits",function(el){el.value=val;el.dispatchEvent(new Event("keyup"));});});});if(!data.autofillMarket&&location.href.includes("economy/marketplace")){run();}})(selectedHostFolder);}}),destinationUnitName){test("/"+side+"/military/campaignsJson/list",function(sortie){battleListingScope={campaigns:{initialList:sortie.battles},requestTime:sortie.time};if(!data.epicSensor&&toTop){(function(){/**
                       * @param {number} b
                       * @return {undefined}
                       */function success(b){$(battleListingScope.campaigns.initialList,function(i,marker){/** @type {!Array} */var a=[];/** @type {number} */var startDate=0;if(marker.is_dict||marker.is_lib||$(marker.div,function(moz,options){var endDate=options.epic;if((hasDate||options.div==date||options.div>10)&&!options.end&&0===options.terrain&&endDate&&endDate>=startDate){startDate=endDate;/** @type {!Array} */a=[endDate,moz];}}),a[0]==b){return n=true,document.getElementById("menu3").insertAdjacentHTML("beforeEnd",'<a id="epicLink" division="'+a[1]+'" href="/'+side+"/military/battlefield/"+i+'" style="position:absolute;top:8px;left:225px;width:30px;background:none"><img src="/images/modules/misc/'+(b>1?"epic_battles_icon":"full_scale_battle")+'.png" style="width:30px"></a>'),document.getElementById("epicLink").addEventListener("click",function(){event.preventDefault();value(this.href.split("battlefield/")[1],this.getAttribute("division"));}),document.title=(b>1?"EPIC BATTLE":"FULL SCALE")+" DETECTED",false;}});}/** @type {boolean} */var n=false;success(2);if(!n){success(1);}})();}});done("weekly-challenge-data",function(){append("#WCSimulator{position:absolute;right:10px;top:1px;font:700 11px/14px arial;text-shadow:0 0 2px #000;color:#fff;padding:0 3px;background:#83b70b;border-radius:1px}#WCSimulator:hover{background:#fb7e3d}");expect("#weeklyChallenge",types=>{return types.insertAdjacentHTML("beforeEnd",'<a href="https://humberd.github.io/Weekly-Challenge-Calculator" target="_blank" id="WCSimulator">⭐ WC calculator</a>');});if(expect(".get_milestone_reward").length&&!expect(".collectAll").length){expect(".player_layer",types=>{return types.insertAdjacentHTML("beforeEnd",'<a href="javascript:" class="std_global_btn collectAll blueColor floatRight iconBtn" style="top:-33px;"><img src="//www.erepublik.net/images/modules/weekly_challenge/collect-all.png" alt="Get all rewards"></a>');});expect(".collectAll",e=>{return e.addEventListener("click",function(){angular.element("#weeklyChallenge").scope().getAllReward();e.remove();});});}});if(!data.hideMedals){append("#citizenFeed .postsWrapper .postContainer.autoPost{display:none}");done("wall-post/retrieve",function(){if(expect(".postContainer:not(.autoPost)").length<5){expect(".previousposts")[0].click();}});}}else{if(chans){battleListingScope=angular.element("#ListCampaignsController").scope();if(toTop){if(!data.compactWarsPage){append("#header{position:sticky;top:0;z-index:9;background:#fff}.war_card{width:236px!important;height: 214px!important;margin:0!important}.black_bar{width:100%!important}#ListCampaignsController br{display:none}.timer{bottom:17px!important;color:#fff!important;pointer-events:none}.card_bottom{height:16px!important}.fight_btn{bottom:0!important}.fight_btn img{display:none!important}.country_name{max-width:120px!important}.fight{bottom:23px}.hexagons{height:115px!important}.campaign{visibility:hidden}");}if(!data.replaceWaitingwithCountdown){setInterval(function(){var startTime=battleListingScope.campaigns.requestTime;expect(".timer:not(.countdownAdded)",function(col){col.classList.add("countdownAdded");/** @type {number} */var result=angular.element(col).scope().campaign.start-startTime;if(result>0){cb(col,result,selfContext=>{return selfContext.textContent="00h:00m";});}});},500);}if(!data.mercFF){link();}}}else{if(ms){if(append("#battleConsole li isZordacz,#battleConsole li div,#battleConsole li i,.player_name a,.country_avatar,.region_name_background{pointer-events:none}"),localStorage.hasMaverick=SERVER_DATA.canSwitchDivisions,afterRequestCallbacks.push(function(data,url){if(!(!/fight-shoo|deploy-bomb/.test(url)||data.error||"ENEMY_KILLED"!=data.message&&"OK"!=data.message&&!data.data)){checkKillProgress(data);}}),setTimeout(function(){pomelo.on("onDeployFinished",data=>{return checkKillProgress(data,true);});},2e3),data.battlefield||function(){/**
                       * @return {undefined}
                       */function render(){callback("/"+side+"/military/battle-console",{battleId:ms,zoneId:SERVER_DATA.zoneId,action:"battleConsole",_token:csrfToken},function(data){p.textContent=data.division[currentDivision-1].epicBattleProgress;if(100==p.textContent||SERVER_DATA.points.defender>=1800||SERVER_DATA.points.attacker>=1800){p.click();}});}/**
                       * @return {undefined}
                       */function request(){var e;e=SERVER_DATA.battleZoneId;callback("/"+side+"/military/battle-console",{action:"battleStatistics",battleZoneId:e,type:"damage",leftPage:1,rightPage:1,_token:csrfToken},server=>{return expect("#topLists",dashboardPanel=>{return dashboardPanel.innerHTML='<div style="left:0">'+enter(server,1)+'</div><div style="right:0">'+enter(server)+"</div>";});});}/**
                       * @param {?} name
                       * @param {number} enter
                       * @return {?}
                       */function enter(name,enter){/** @type {string} */var pix_color="";return $(name[SERVER_DATA[(enter?"left":"right")+"BattleId"]].fighterData,function(canCreateDiscussions,d){if(canCreateDiscussions<11){pix_color=pix_color+('<a href="/'+side+"/citizen/profile/"+d.citizenId+'"><q>'+d.citizenName+"</q><span>"+format(d.raw_value,2)+"</span></a>");}}),pix_color;}if(append("#epicPercent{color:#fff;position:absolute;bottom:1px;left:0;background:rgba(0,0,0,.4);font:700 10px/13px Arial;padding:2px 5px;border-radius:0 2px 0 0;cursor:pointer;text-shadow:0 0 2px #000}#epicPercent input{margin:0 5px 0 2px;top:2px;position:relative}#pvp .left_wall span,#pvp .right_wall span{opacity:1}#pvp .battle_progression .epic{display:none}#pvp .percent span{opacity:1;animation:none;-webkit-animation:none}#personal_stats{text-align:center;width:100%;position:absolute;top:4px;color:#fff;font:700 10px/20px Arial;text-shadow: 0 0 2px #000;z-index:1}#influence_added{visibility:hidden}#travelButtons{position:absolute;bottom:17px;left:0;width:100%;height:20px;text-align:center;color:#fff;pointer-events:none;z-index:999}#travelButtons span{background:rgba(0,0,0,.6);margin:200px;padding:10px;border-radius:5px;cursor:pointer;font:700 10px/20px Arial;box-shadow:0 0 5px #fff;pointer-events:visible}#travelButtons span:hover{background:#000}#travelButtons img{vertical-align:middle;margin:0 5px;width:20px}#topLists div{position:absolute;top:25px;z-index:11;border-radius:2px}#topLists a{text-shadow:0 0 2px #000;font:700 9px Arial;color:#fff;display:flex;width:121px;background:rgba(0,0,0,.3);padding:2px}#topLists a:hover{color:#83b70b}#topLists q{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#topLists span{color:#ffd479}"),SERVER_DATA.spectatorOnly||expect("#total_damage",function(elem){var info=elem.querySelector("strong");/** @type {string} */info.style.visibility="hidden";/** @type {string} */var includes=document.cookie.split(SERVER_DATA.battleZoneId+"-"+SERVER_DATA.leftBattleId+"=")[1];/** @type {!Array<string>} */savedStats=(includes?includes.split(";")[0]:"0|0").split("|");savedStats[2]=info.textContent.replace(/,/g,"");elem.insertAdjacentHTML("beforeEnd",'<div id="personal_stats"><q>'+resolve(savedStats[0])+"</q> | <q>"+resolve(savedStats[1])+"</q> | <q>"+resolve(savedStats[2])+"</q></div>");personal_stats=expect("#personal_stats q");}),expect("#total_damage .resistance",inventoryService=>{return inventoryService.remove();}),toTop){clearInterval(globalSleepInterval);expect("#pvp",types=>{return types.insertAdjacentHTML("beforeEnd",(SERVER_DATA.onAirforceBattlefield?"":'<label id="epicPercent"><input type="checkbox">Epic progress <span></span>%</label>')+(data.topLists?"":'<div id="topLists"></div>')+(SERVER_DATA.isCivilWar?"":'<div id="travelButtons"><span><img src="//www.erepublik.net/images/flags_png/L/'+_this.info.countries[SERVER_DATA.leftBattleId].permalink+'.png">Join</span><span>Join <img src="//www.erepublik.net/images/flags_png/L/'+_this.info.countries[SERVER_DATA.rightBattleId].permalink+'.png"></span></div>'));});expect("#region_name_link",selfContext=>{return selfContext.textContent+=(SERVER_DATA.isResistance?" RW":"")+" R"+SERVER_DATA.zoneId;});var renderInterval;/** @type {(Element|null)} */var p=document.querySelector("#epicPercent span");expect("#epicPercent input",e=>{return e.addEventListener("change",function(){if(this.checked){render();/** @type {number} */renderInterval=setInterval(render,65e3);}else{clearInterval(renderInterval);}});});if(!SERVER_DATA.isCivilWar){expect("#travelButtons span",function(e,canCreateDiscussions){e.addEventListener("click",()=>{return value(ms,SERVER_DATA.battleZoneId,canCreateDiscussions?SERVER_DATA.rightBattleId:SERVER_DATA.leftBattleId);});if(!(SERVER_DATA.spectatorOnly||canCreateDiscussions)){/** @type {string} */e.style.visibility="hidden";}});expect("#trigger_campaignMap",e=>{return e.addEventListener("click",()=>{return document.getElementById("travelButtons").style.zIndex="99";});});}var refreshBtn=angular.element("#battleFooterbattleSetup").scope();var wasRefreshHidden=refreshBtn.openPopup;/**
                         * @return {undefined}
                         */refreshBtn.openPopup=()=>{};setTimeout(()=>{return refreshBtn.openPopup=wasRefreshHidden;},2e3);if(!data.topLists){expect(".battle_heroes",builderID=>{return builderID.style.display="none";});request();setInterval(function(){if(SERVER_DATA.points.attacker<1800&&SERVER_DATA.points.defender<1800){request();}},3e4);}afterRequestCallbacks.push(function(canCreateDiscussions,url){if(url.includes("battle-stats")){var n=canCreateDiscussions.battle_zone_situation[SERVER_DATA.battleZoneId];if(n){/** @type {string} */document.title=(n>1?"EPIC BATTLE":"FULL SCALE")+" DETECTED";}}});}}(),data.mercFF||SERVER_DATA.isCivilWar||!toTop||link(),isZordacz&&SERVER_DATA.webDeployEnabled){/** @type {number} */var chat_retry=setInterval(function(){if(SERVER_DATA.sessionValidation){clearInterval(chat_retry);}},1e3);}}else{if(/donate-|accounts|citizen-friends/.test(location.href)&&!data.improveProfile){renderProfilePageSidepanelImprovements();}else{if(le){done("/citizen-profile-json-personal/",function(){if(!window.hasRunProfileStuff){/** @type {number} */window.hasRunProfileStuff=1;if(!data.improveProfile){renderProfilePageSidepanelImprovements();}if(!data.influenceCalculator){(function(){/**
                             * @return {undefined}
                             */function init(){expectation.forEach(function(dom,militaryType){dom.querySelectorAll("span").forEach(inventoryService=>{return inventoryService.remove();});var militaryData=bd.military.militaryData[militaryType?"aircraft":"ground"];/** @type {number} */var delta_length_z=+dom.getElementsByTagName("select")[0].value;var naturalEnemy=document.getElementById("InfCalc_NE").checked;const appliedStrength=militaryData.temporaryStrength||0;const appliedRank=militaryData.rankNumber;const damageNoHit=calculateNoHitDamage(appliedStrength,appliedRank);/** @type {number} */var volume=damageNoHit*(1+delta_length_z/5)*(militaryType?1:1+parseInt(document.getElementById("InfCalc_legend").value)/100)*(1+parseInt(document.getElementById("InfCalc_booster").value)/100);/** @type {number} */var force_z=1e6/volume;dom.insertAdjacentHTML("beforeEnd","<span>Influence</span><span>"+format(parseInt(volume*document.getElementById("InfCalc_hits").value*(naturalEnemy?1.1:1)),1)+"</span><span>Hits to next rank</span><span>"+(militaryData.nextRankAt-militaryData.points>0?format(Math.ceil(10*(militaryData.nextRankAt-militaryData.points)/volume/(document.getElementById("InfCalc_WarStash").checked?1.1:1)),1):"\u221e")+'</span><span>Cost cc/M</span><span title="Includes food">'+format(((delta_length_z?data.infCalc[militaryType?23:2][Math.min(delta_length_z,7)]/delta_length_z*force_z:0)+force_z*data.infCalc.cheapestFood*10)/(naturalEnemy?1.1:1),2)+"</span>");});}append("#infCalc{font-size:11px;color:#666;margin:0 0 5px;width:577px;text-align:center}#InfCalc_hits,#InfCalc_legend,#InfCalc_booster{padding:4px;text-align:center;width:35px;font-size:11px;margin:0 5px}#infCalc label{margin:0 5px}#InfCalc_NE,#InfCalc_WarStash{margin-left:5px;position:relative;top:2px;text-align:center}.infCalcResults{line-height:0}.infCalcResults span{width:100%;text-align:center;display:block;font:700 12px/15px Arial;color:#595959}.infCalcResults span:nth-child(even){font:400 11px/14px Arial;color:#81827f}.infCalcResults select{margin:2px;font-size:11px;padding:2px 4px;text-align:center;height:23px}.citizen_military_box_wide{width:293px;margin:0 1px 2px}.citizen_military_box_wide .rank_box{right:0}.citizen_military_box_wide .rank_icon{left:7px}.citizen_military_box_wide .regular_rank_img{margin-left:7px}.citizen_military_box_wide .rank_name_holder{width:230px;left:88px}.citizen_military_box .military_box_info{width:85px}.citizen_military_box_wide .top_area{padding:0 15px 0 77px}");var bd=angular.element("#str_progress").scope().data;const{rankNumber}=bd.military.militaryData;let legendBonus=0;if(rankNumber>70){legendBonus=rankNumber-70+1;}expect(".citizen_military_box_wide",table=>{return table.insertAdjacentHTML("afterEnd",'<div class="citizen_military_box infCalcResults"><select></select></div>');})[1].nextSibling.insertAdjacentHTML("afterEnd",'<div id="infCalc" class="citizen_military"><label>Hits <input type="text" id="InfCalc_hits" value="1"></label><label>Natural Enemy <input type="checkbox" id="InfCalc_NE"></label><label title="+10% rank points">War Stash <input type="checkbox" id="InfCalc_WarStash" '+(bd.activePacks.war_stash?"checked":"")+'></label><label>Damage Booster<input type="text" id="InfCalc_booster" value="0%"></label><label>Legend Bonus<input type="text" id="InfCalc_legend" value="'+legendBonus*10+'%"></label></div>');expect(".citizen_military_box",year_selector_service=>{return year_selector_service.style="margin:0 1px 2px 1px;width:85px";});data.infCalc=data.infCalc||{1:{},2:{},23:{},cheapestFood:0,selWep:{0:7},noData:1};var expectation=expect(".infCalcResults",(t,dim)=>{return t.querySelectorAll("select").forEach(function(b){/** @type {string} */var name="";/** @type {number} */var i=0;for(;i<8;i++){/** @type {string} */name=name+(!i||data.infCalc.noData||data.infCalc[dim?23:2][Math.min(i,7)]?'<option value="'+(i<7?i:10)+'" '+(data.infCalc.selWep[dim]==i?"selected":"")+">Q"+i+"</option>":"");}/** @type {string} */b.innerHTML=name;b.addEventListener("change",function(){/** @type {number} */data.infCalc.selWep[dim]=Math.min(this.value,7);saveStuffDataToStorage();init();});});});init();expect("#InfCalc_hits,#InfCalc_legend,#InfCalc_booster",p=>{return p.addEventListener("keyup",init);});expect("#InfCalc_NE,#InfCalc_WarStash",sound=>{return sound.addEventListener("change",init);});if(data.infCalc.date!=now){u(35,function(){/** @type {number} */var removeClass=1;for(;removeClass<4;removeClass++){/** @type {number} */var i=1;for(;i<8;i++){/** @type {number} */data.infCalc[removeClass<3?removeClass:23][i]=((redLookupTable[35][restart(removeClass<3?removeClass:23)]["q"+i]||[])[1]||{}).gross/(1==removeClass?2*(i<7?i:10):1);}}/** @type {number} */data.infCalc.cheapestFood=Math.min(999,...Object.values(data.infCalc[1]));data.infCalc.date=now;/** @type {number} */data.infCalc.noData=0;saveStuffDataToStorage();init();});}})();}}});}else{if(location.href.includes("economy/marketplace")){if(location.href.includes("/offer")){if(!data.improveMarketplace){init();}if(!data.autofillMarket){run();}}else{done("economy/marketplace",function(){if(!data.improveMarketplace){init();}if(!data.autofillMarket){run();}});}}else{if(location.href.includes("economy/exchange-market")){console.log("EXCHANGE MARKET");if(!data.autofillGold){(function(){/**
                             * @return {undefined}
                             */function run(){expect("button[data-currency=GOLD]",function(target){var input=target.previousElementSibling.previousElementSibling;/** @type {number} */input.value=Math.min(target.dataset.max,10,Math.floor(100*params.currencyAmount/target.dataset.price)/100);input.dispatchEvent(new Event("input"));});}append(".exchange_offers td.ex_citizen{width:200px}.exchange_offers td.ex_buy button{max-width:unset}");done("exchange/retrieve",run);run();})();}insertContent(".e_cash","monetary-market/gold/statistics");}else{if(location.href.includes("economy/myCompanies")){if(!data.companyManager){(function(){append("#CompanyManager{float:right;display:none}#CompanyManager strong{position:relative;bottom:8px;right:5px;font-size:12px}#CompanyManager span{cursor:pointer;border-radius:3px}#CompanyManager span:hover{opacity:.5}#CompanyManager img{height:30px}#companies_bottom{position:sticky;bottom:0}");expect(".area h4",types=>{return types.insertAdjacentHTML("beforeEnd",'<div id="CompanyManager"><strong>Work as Manager</strong></div>');});/** @type {(Element|null)} */var container=document.getElementById("CompanyManager");var expectation=expect(".listing.companies:not(.disabled):not(.cannotWorkAsManager):not(.cannotWorkAsManager-location)",function(fieldsetLabel){var n=fieldsetLabel.querySelector(".area_pic > img");var srcAngle=n.getAttribute("src");if(!container.querySelector('img[src="'+srcAngle+'"]')){container.insertAdjacentHTML("beforeEnd",'<span><img src="'+srcAngle+'" title="'+n.title+'"></span>');}});if(container.querySelector("span")){/** @type {string} */container.style.display="block";expect("#help_manage",inventoryService=>{return inventoryService.remove();});}expect("#CompanyManager span",e=>{return e.addEventListener("click",function(mutation){window.pageDetails.recoverable_health.value=food_remaining;var i=expect(".owner_work.active").length;expectation.forEach(function(pxPhysicalNode){if(pxPhysicalNode.querySelector('.area_pic > img[src="'+mutation.target.getAttribute("src")+'"]')&&i<Math.floor(globalNS.userInfo.wellness/10)){pxPhysicalNode.querySelectorAll(".owner_work").forEach(function(divChatButton){if(!divChatButton.classList.contains("active")){i++;divChatButton.classList.add("active");}});}});expectation.forEach(e=>{return calculateProduction(e,true);});checkHealth();checkTax();calculateTotals();warnForCritical();});});expect(".list_group",$button=>{return $button.style.boxShadow="none";});})();}if(!data.showBestJobOffer){test("/"+side+"/economy/job-market-json/"+params.countryLocationId+"/1/desc",function(options){if(options.jobs&&options.jobs[0]){options.jobs.sort((_pointM,_pointB)=>{return _pointB.netSalary-_pointM.netSalary;});expect(".employer.fill h4",types=>{return types.insertAdjacentHTML("beforeEnd",'<a href="/'+side+"/economy/job-market/"+params.countryLocationId+'" style="position:absolute;right:21px;">Highest local offer: net '+options.jobs[0].netSalary+"cc ("+(options.jobs[0].salaryLimit>0?"max  "+resolve(options.jobs[0].salaryLimit)+"cc/day":"no overtime limit")+")</a>");});}});}if(hasLicense()&&(handlebars||Handlebars)){(function(){/**
                               * @param {string} name
                               * @return {undefined}
                               */function fixRepoAlerts(name){if(Object.keys(readyPorts).length+1==stream.length||name){/** @type {!Array} */var queue=[];/** @type {number} */var cursorAt=0;/** @type {number} */var outerStepNumber=0;stream.forEach(function(t){/** @type {number} */var port=+t.id.split("_")[1];/** @type {!Array} */var arg=[];t.querySelectorAll(".WaMsetupInput").forEach(function(child){var c=name?+child.value:child.checked;if(c){/** @type {number} */var elem=+child.parentElement.id.split("_")[1];if(name){queue.push([elem,c]);outerStepNumber=outerStepNumber+c;}else{arg.push(elem);}cursorAt++;}});if(!name&&arg.length){queue.push([readyPorts[port],arg]);}});expect("#WaMsetup span",result=>{return result.textContent=name?"Assigned "+outerStepNumber+" employees to "+cursorAt+" companies":"Selected "+cursorAt+" companies in "+queue.length+" holding(s)";});expect("#WaMsetup a",selfContext=>{return selfContext.textContent=cursorAt==value.length?"Deselect all":"Select all";});if(name){/** @type {!Array} */data.employeeCompanies=queue;}else{/** @type {string} */localStorage.wamCompaniesLeftToday=JSON.stringify(data.wamCompanies=queue);}saveStuffDataToStorage();}}append("#WaMsetup{margin:0 0 -20px;font:200 11px/14px Arial}#WaMsetup span{margin:9px;display:inline-block}input.WaMsetupInput{position:absolute;margin:25px 0}#WaMsetup a{margin:0 5px;padding:5px}");expect(".area h4",table=>{return table.insertAdjacentHTML("afterEnd",'<div id="WaMsetup"><span></span><a class="std_global_btn">AutoFighter WaM Setup</a><a class="std_global_btn">AutoFighter Employee Setup</a></div>');});var value;var stream=expect(".companies_group");var readyPorts={};var expectation=expect("#WaMsetup a",(table,isMobile)=>{return table.addEventListener("click",function(){if(!isMobile){stream.forEach(function(callingModule){/** @type {number} */var port=+callingModule.id.split("_")[1];if(port){callback("/"+side+"/main/travelData",{_token:csrfToken,holdingId:port},function(server){readyPorts[port]=server.preselectRegionId;fixRepoAlerts(isMobile);});}});}table.insertAdjacentHTML("afterEnd",'<a class="std_global_btn">Select all</a>');table.nextSibling.addEventListener("click",function(){/** @type {boolean} */var c="Select all"==this.textContent;/** @type {string} */this.textContent=c?"Deselect all":"Select all";if(isMobile){value.forEach(el=>{return el.value=c?el.max:0;});}else{value.forEach(node1=>{return node1.checked=c;});}fixRepoAlerts(isMobile);});expect(isMobile?".employees_selector":".owner_work",function(type){/** @type {number} */var t=+type.parentElement.parentElement.querySelector(".employees_selector").dataset.employee_limit;type.parentElement.parentElement.insertAdjacentHTML("beforeEnd",'<input class="WaMsetupInput" style="-moz-appearance:'+(isMobile?"initial;width:30px;left:-35px;text-align:center":"checkbox;left:-30px")+'" type="'+(isMobile?"number":"checkbox")+'" '+(isMobile?'value="0" min="0" max="'+t+'"':"")+">");});value=expect(".WaMsetupInput");expect(".WaMsetupInput",xhr=>{return xhr.addEventListener(isMobile?"input":"click",()=>{return fixRepoAlerts(isMobile);});});expectation.forEach(inventoryService=>{return inventoryService.remove();});/** @type {!Array} */var list=[];if(isMobile){for(let e of errors){list.push(e);}}else{for(let moduleToTraverse of movies){list.push(...moduleToTraverse[1]);}}value.forEach(function(ctx){/** @type {number} */var value=+ctx.parentElement.id.split("_")[1];if(isMobile){for(let item of list){if(item[0]==value){ctx.value=item[1];}}}else{/** @type {boolean} */ctx.checked=list.includes(value);}});fixRepoAlerts(isMobile);});});})();}}else{if((location.href.includes("economy/inventory")||location.href.includes("main/inventory"))&&!data.improveInventory){(()=>{/**
                               * @return {undefined}
                               */function render(){$scope.inputs.quantity=stream[0].value;var e=$scope.settings.countries[$scope.inputs.selectedCountry].taxes[$scope.inputs.selectedIndustry];/** @type {number} */var price=$scope.inputs.pricePerUnit/((100+(e.valueAddedTax+($scope.inputs.selectedCountry!=params.country?e.importTax:0)))/100);/** @type {number} */var baseNumber=price*$scope.inputs.quantity;expect("#TaxPerUnit",dashboardPanel=>{return dashboardPanel.innerHTML=($scope.inputs.pricePerUnit-price).toFixed(4);});expect("#Net_unit",dashboardPanel=>{return dashboardPanel.innerHTML=price.toFixed(4);});expect("#Total_net",dashboardPanel=>{return dashboardPanel.innerHTML='<strong style="top:39px;left:410px">Total Net</strong><isZordacz style="top:46px;right:250px">'+resolve(baseNumber.toFixed(2))+" "+params.currency+'</isZordacz><small style="top:70px;right:250px;left:auto;width:auto">'+resolve((baseNumber/data.goldPrice.price).toFixed(2))+" g</small>";});}/**
                               * @return {undefined}
                               */function renderTotalFoodHp(){/** @type {string} */document.getElementById("totalFoodHP").innerHTML="Total food: "+resolve(path[0]+path[1])+"HP";}/**
                               * @return {undefined}
                               */function start(){stream.forEach(function(sound){sound.value=(itemAmounts[$scope.inputs.selectedIndustry]||{})[$scope.inputs.selectedQuality]||0;sound.dispatchEvent(new Event("input"));});expect("#marketOffers tr",function(service){if($scope.inputs.selectedIndustry==service.dataset.industry_id&&$scope.inputs.selectedQuality==service.dataset.quality){$scope.inputs.selectedCountry=service.dataset.country_id;$scope.$apply();expect(".offers_price input",function(elem){elem.value=service.querySelector(".offer_price strong").textContent;elem.dispatchEvent(new Event("input"));});}});}/**
                               * @param {!Object} item
                               * @param {string} i
                               * @return {undefined}
                               */function pick(item,i){$(item.items[i].items,function(canCreateDiscussions,s){itemAmounts[s.industryId]=itemAmounts[s.industryId]||{};itemAmounts[s.industryId][s.quality]=s.used?s.amount-1:s.amount;});}append("#Total_netF,.Total_net,.offer_price{text-align:right}#Total_netF span,.Total_net span,.offer_price span{margin-right:1px;font-size:11px}#Total_net *{position:absolute}tfoot tr{background:#f7fcff}#totalFoodHP{float:right;margin:5px 30px 0;color:#656565}#inventory_overview #sell_offers table td:last-child{padding-left:0}#inventory_overview #sell_offers table .delete_offer{opacity:1}");data.goldPrice=data.goldPrice||{};if(data.goldPrice.date!=now){callback("/"+side+"/economy/exchange/retrieve/",{_token:csrfToken,page:1,currencyId:62},function(stickerInfo){/** @type {string} */data.goldPrice.price=JSON.stringify(stickerInfo).split("data-price='")[1].split("'")[0];data.goldPrice.date=now;saveStuffDataToStorage();});}var $scope=angular.element("#sell_offers").scope();var stream=expect(".offers_quantity input",inputElem=>{return inputElem.setAttribute("maxlength",9);});/** @type {!Array} */var path=[0,0];expect("#sell_offers",function(impl){impl.addEventListener("input",render);impl.addEventListener("click",function(event){if(event.target.matches(".sell_selector *")){start();}render();});});expect(".area.storage h4:first-child strong",function(where){where.insertAdjacentHTML("beforeEnd",' <q id="freeSpace"></q>');where.insertAdjacentHTML("afterEnd",'<span id="totalFoodHP"></span>');});afterRequestCallbacks.push(function(value,url){if(url.includes("inventory-items")){var row=angular.element("#inventoryItems").scope().inventory;path[0]=normalize(value);itemAmounts={};pick(row,"finalProducts");pick(row,"rawMaterials");/** @type {string} */document.getElementById("freeSpace").innerHTML="Free space: "+resolve(row.status.totalStorage-row.status.usedStorage);renderTotalFoodHp();start();render();}if(url.includes("myMarketOffers")&&(expect("#sell_offers th",function(e,topLeft){/** @type {string} */e.style.width=(topLeft?1==topLeft?80:2==topLeft?140:3==topLeft?60:132:70)+"px";if(4==topLeft){e.querySelectorAll("a").forEach(year_selector_service=>{return year_selector_service.style="left:10px;margin-right:20px;padding:0 10px";});}}),expect(".relative",function(elem,canCreateDiscussions){if(!canCreateDiscussions){elem.querySelectorAll("span.ng-binding").forEach(builderID=>{return builderID.style.display="none";});/** @type {string} */elem.style.left="35px";elem.querySelectorAll("small").forEach(function(elem){/** @type {string} */elem.style="text-align:right;top:30px;left:-50px";elem.insertAdjacentHTML("beforeEnd",'<br><span>Tax / unit: </span><span id="TaxPerUnit"></span><br><span>Net / unit: </span><span id="Net_unit"></span><br>');});}}),expect("#sell_offers table",types=>{return types.insertAdjacentHTML("beforeEnd",'<tfoot><tr><td colspan="3"><td id="Total_netF"></td><td colspan="2"></td></tr></tfoot>');}),expect(".offers_price",table=>{return table.insertAdjacentHTML("afterEnd",'<th id="Total_net"></th>');}),render()),/marketplaceActions|myMarketOffers/.test(url)){expect(".Total_net,.offer_price span",inventoryService=>{return inventoryService.remove();});/** @type {number} */var total=0;/** @type {number} */path[1]=0;expect("#marketOffers tr",function(result){var t=$scope.settings.countries[result.dataset.country_id].taxes[result.dataset.industry_id];/** @type {number} */var value=result.querySelector(".offer_price strong").textContent/((100+(t.valueAddedTax+(result.dataset.country_id!=params.country?t.importTax:0)))/100);/** @type {number} */var w=value*result.dataset.amount;total=total+w;result.querySelectorAll(".offer_price").forEach(function(where){where.insertAdjacentHTML("beforeEnd","<span><br>Net: "+value.toFixed(4)+" "+params.currency+"</span>");where.insertAdjacentHTML("afterEnd",'<td class="Total_net"><strong>'+resolve(w.toFixed(2))+"</strong> "+params.currency+"<br><span>"+resolve((w/data.goldPrice.price).toFixed(2))+" g</span></td>");});if(1==result.dataset.industry_id){path[1]+=result.dataset.amount*(result.dataset.quality<7?2*result.dataset.quality:20);}});renderTotalFoodHp();/** @type {string} */document.getElementById("Total_netF").innerHTML="<strong>"+resolve(total.toFixed(2))+"</strong> "+params.currency+"<br><span>"+resolve((total/data.goldPrice.price).toFixed(2))+" g</span>";}});})();}else{if(location.href.includes("/article/")&&location.hash.includes("comment")){/** @type {boolean} */be=false;afterRequestCallbacks.push(function(canCreateDiscussions,url){if(url.includes("articleComments")&&!be){if(document.getElementById(location.hash.split("#")[1])){/** @type {string} */location.hash=location.hash;setTimeout(function(){/** @type {string} */location.hash=location.hash;},500);/** @type {boolean} */be=true;}else{expect(".load-more-comments",e=>{return e.click();});}}});}else{if(location.href.includes("economy/job-market")){done("job-market-json",function(){if(!document.getElementById("erepDE")){append("#erepDE{color:#83b70b;float:right;margin:0 70px 0 10px}#erepDE:hover{color:#fb7e3d}#erepDE span{color:#42a5f5}.netSalary{font-size:11px}.bestNet{color:#83b70b!important}.travelToMarket{position:absolute;top:10px;right:220px}");expect("#job_market h1",types=>{return types.insertAdjacentHTML("beforeEnd",'<a id="erepDE" href="//erepublik.tools/en/marketplace/jobs/0/offers">eRepublik<span>.tools</span></a>');});}expect(".netSalary,.travelToMarket",inventoryService=>{return inventoryService.remove();});expect(".bestNet",focusedObj=>{return focusedObj.classList.remove("bestNet");});/** @type {!Array} */var MINSPANS=[0];expect(".salary_sorted tr",function(elem){var self=angular.element(elem).scope().job;elem.getElementsByClassName("jm_salary")[0].insertAdjacentHTML("beforeEnd",'<span class="stprice netSalary"><br>'+(self.salaryLimit>0?"Max  "+resolve(self.salaryLimit)+"cc/day":"No overtime limit")+"</span>");if(self.netSalary>MINSPANS[0]){/** @type {!Array} */MINSPANS=[self.netSalary,elem];}});if(MINSPANS[1]){MINSPANS[1].querySelector(".jm_net_salary").classList.add("bestNet");}var dataBackup=angular.element("#job_market").scope();if(!dataBackup.data.isFromThisCountry){_("#job_market h1",dataBackup.settings.currentCountryId);}});}else{if(location.href.includes("tokens-market")){insertContent("#marketplace","game-token/statistics/price");if(!data.autofillMarket){done("economy/gameTokensMarketAjax",function(){expect(".quantity_button.maximum",e=>{return e.click();});});}}}}}}}}}}}}}var be;if(!(chans||data.playerTooltip)){(function(){/**
               * @param {string} name
               * @param {number} bool
               * @return {?}
               */function require(name,bool){return'<span style="background:'+(bool?"#83B70B":"red")+';padding:0 2px;border-radius:1px;font-weight:700;margin:0 1px">'+name+"</span>";}/**
               * @param {!Object} scope
               * @param {string} version
               * @return {?}
               */function locationInfo(scope,version){var prev=scope.location;var p=prev[version?"residenceCountry":"citizenshipCountry"];/** @type {string} */var micropost=p.name+(version?", "+prev.residenceRegion.name:"");return'<br><img src="//www.erepublik.net/images/flags_png/S/'+p.permalink+'.png">'+(version&&micropost.length>44?micropost.substring(0,42)+"\u2026":micropost)+(version?'<span style="font-family:Icons;color:'+(scope.city.residenceCityId?scope.city.residenceCity.region_id==prev.residenceRegion.id?"#83B70B":"#FB7E3D":"#009cff")+'">&nbsp;&nbsp;\ue811</span>':"");}/**
               * @param {string} str
               * @return {?}
               */function toArray(str){return'<div style="background:#83B70B;padding:0 2px;border-radius:1px;color:#fff;margin:0 0 2px;font-weight:700;width:19px">'+str+"</div>";}/**
               * @param {!Object} citizenProfile
               * @param {!Object} citizenHovercard
               * @param {number} index
               * @return {?}
               */function hovercardMilitaryInfo(citizenProfile,citizenHovercard,index){var entry=citizenProfile.military.militaryData[index?"ground":"aircraft"];var fighterInfo=citizenHovercard.fighterInfo;return'<div><img src="'+entry.icon+'"><div><isZordacz style="width:83%;background:linear-gradient(to right,#009cff 0%,#009cff '+entry.progress+"%,#000 "+(entry.progress+0.1)+'%,#000 100%);display:block;margin:0 0 -15px 30px">'+(index&&entry.rankNumber>69?"Legend"+entry.name.split("Battalion")[1]:entry.name)+'<span style=""></span></isZordacz><br><brown>'+(citizenProfile.citizen.is_organization?"":index?"Q7 hit: "+resolve(fighterInfo.military.damagePerHit||"")+(fighterInfo.military.damagePerHitLegend>0?" (TP "+resolve(fighterInfo.military.damagePerHitLegend||"")+")":""):"Q0 hit: "+resolve(fighterInfo.aviation.damagePerHitNoWeapon||""))+"</brown></div></div>";}/**
               * @param {!Object} item
               * @param {?} name
               * @param {number} val
               * @return {?}
               */function process(item,name,val){var state=val?item.partyData:item.military.militaryUnit;return"<div>"+(state?'<img src="'+state.avatar+'" style="background:#fff">':"")+"<div><isZordacz>"+(val?item.isPresident?"Country President":item.title.country?item.title.country:item.isCongressman?"Congressman":item.isPartyPresident?"Party President":state?"Member":"No political activity":state&&state.leader_id==name?"Commander":!state||state.second_commander_1!=name&&state.second_commander_2!=name?state&&JSON.stringify(state.leaders).includes(name)?"Captain":state?"Soldier":"":"Second Commander")+"</isZordacz><br><brown>"+(state?state.name:"No "+(val?"political party":"military unit"))+"</brown></div></div>";}/**
               * @param {!Object} citizenData
               * @param {?} playerId
               * @param {!Object} eventData
               * @param {?} callback
               * @return {undefined}
               */function updateTooltip(citizenData,playerId,eventData,callback){const{citizenProfile:self,citizenHovercard}=citizenData;console.log({playerId,self,citizenHovercard});/** @type {string} */var uriToAdd="";$(self.achievements,function(canCreateDiscussions,that){uriToAdd=uriToAdd+(/hardworker|supersoldier/.test(that.img)?"":'<div style="width:23px;display:inline-block;text-shadow:none"><img src="//www.erepublik.net/images/achievements/icon_'+that.img+(that.count?"_on":"_off")+'.gif" style="width:25px;margin:0 0 -5px 0"><span style="float:left;width:25px">'+(that.count>9999?Math.floor(that.count/1e3)+"k":that.count)+"</span></div>");});var opts=self.citizen;var micropost=opts.name.toString();var settings=self.activePacks;/** @type {number} */var g=self.citizenAttributes.experience_points%5e3/5e3*100;/** @type {string} */var m=opts.level>69&&opts.nextLevelXp-self.citizenAttributes.experience_points<500?"#FB7E3D":"#83B70B";/** @type {string} */element.innerHTML=eventData.orgTitle="\n                  <div id=\"eRStooltip\">\n                      <div style=\"background:rgb(30,30,30);height:84px\">\n                          <div style=\"float:left;width:84px;height:84px;position:relative\">\n                             <img src=\"".concat(opts.avatar,"\" style=\"width: 100%; height: 100%; margin:0 2px 0 0;background:#fff;border-radius:5px 0 0 0\">\n                             ").concat(window.isDonator(playerId)&&window.createBorderElementBasedOnDonatorLevel(playerId).outerHTML||"","\n                          </div>\n                         \n                          <isZordacz style=\"background:linear-gradient(to right,").concat(m," 0%,").concat(m," ").concat(g,"%,rgb(80,80,80) ").concat(g+0.1,"%,rgb(80,80,80) 100%)\">").concat(citizenHovercard.level,"</isZordacz>\n                          <isZordacz").concat(self.isDictator?' style="background:rgb(204,60,0)"':"",">\n                              ").concat(micropost.length<22?micropost:micropost.substring(0,20)+"\u2026","\n                          </isZordacz>\n                          ").concat(opts.onlineStatus?'<span style="background:#83B70B;border-radius:10px;height:12px;width:12px;display:inline-block;margin:0 5px -1px;border:1px solid;box-shadow:0 0 3px"></span>':"","\n                          <br>").concat(opts.is_organization?require("Organization",1):"","\n                          ").concat(isFriend(citizenHovercard)?require("Friend",1):"","\n                          ").concat(opts.is_alive?"":require("Dead"),"\n                          ").concat("Permanently"==opts.banStatus.type?require("Permaban"):opts.banStatus.type?require("Tempban"):"","\n                          ").concat(data.contributors&&data.contributors.includes(+playerId)?require("Stuff++ contributor",1):"","\n                          ").concat(self.isModerator?require("Mod"):"","\n                          <br><brown>").concat(opts.is_organization?"Created at: "+opts.created_at:"eR birthday: "+citizenHovercard.bornOn,"</brown>\n                          ").concat(locationInfo(self)).concat(locationInfo(self,1),"\n                          ").concat(hovercardStrength(self,citizenHovercard,resolve),"\n                          ").concat(hovercardDivision(self,citizenHovercard),"\n                      </div>\n                      <div style=\"position:absolute;top:2px;right:5px;text-align:center;width:20px\">\n                          ").concat(settings.power_pack?toArray("PP"):"","\n                          ").concat(settings.infantry_kit?toArray("IK"):"","\n                          ").concat(settings.division_switch_pack?toArray("MP"):"","\n                          ").concat(isZordacz&&data.l[opts.id]?toArray("AF"):"","\n                      </div>\n                      <div style=\"background:rgb(50,50,50);padding:0 5px;height:63px\">\n                          <div>\n                              ").concat(hovercardMilitaryInfo(self,citizenHovercard,1),"\n                              ").concat(hovercardMilitaryInfo(self,citizenHovercard),"\n                          </div>\n                          <div>\n                              ").concat(process(self,playerId,1),"\n                              ").concat(process(self,playerId),"\n                          </div>\n                      </div>\n                      <div style=\"height:47px;background:#fff;color:#5a5a5a;border-radius:0 0 5px 5px;text-align:center;font:9px/14px Arial\">").concat(uriToAdd,"</div>\n                  </div>");callback();}/**
               * @return {undefined}
               */function cb(){expect('#content a[href*="zen/pro"]:not(.eRStooltipAdded)',function(item){item.classList.add("eRStooltipAdded");update(item,"ns",function(prop){var _takingTooLongTimeout;var key=item.href.split("profile/")[1];return _this[key]?updateTooltip(_this[key],key,item,prop):_takingTooLongTimeout=setTimeout(()=>{return test("/"+side+"/main/citizen-profile-json/"+key,function(citizenProfile){test("/".concat(side,"/main/citizen-hovercard/").concat(key),citizenHovercard=>{_this[key]={citizenProfile,citizenHovercard};updateTooltip(_this[key],key,item,prop);});});},300),item.addEventListener("mouseleave",()=>{return clearTimeout(_takingTooLongTimeout);}),item.orgTitle||"Loading data...";});});}append(".citizen_activity a,.pic.tipsyElement a,.user-cmnt-avatar a{display:block}#eRStooltip{color:#fff;width:400px;font:11px/15px Arial;text-shadow:0 0 2px #000;text-align:left;margin:-7px;border:2px solid #000;border-radius:6px;box-shadow:0 0 5px #000}#eRStooltip>div>isZordacz{font:700 17px/20px Tahoma;border-radius:1px;padding:1px 2px;margin:0 1px 2px;display:inline-block}#eRStooltip>div>img:not(:first-child){margin:0 2px -4px 1px;width:14px}#eRStooltip>div:not(:last-child)>div{width:50%;float:left}#eRStooltip>div>div>div{height:30px;width:100%;float:left;margin:1px 0;overflow:hidden}#eRStooltip>div>div>div>img{width:30px;height:30px;float:left;margin:0 5px 0 0}#eRStooltip brown{color:#c3bb8c}");/** @type {string} */angular.element("body").injector().get("hovercardDirective")[0].restrict="E";expect("[hovercard]",rowElement=>{return angular.element(rowElement).scope().getCitizenData=()=>{};});expect("hovercard-details",inventoryService=>{return inventoryService.remove();});var _this={};cb();if(destinationUnitName||ms||location.href.includes("/article/")){setInterval(cb,1e3);}else{afterRequestCallbacks.push(()=>{return setTimeout(cb,500);});}})();}expect('#menu5 li a[href*="elections"]',function(sourceDest){/** @type {number} */var t=+document.querySelector(".date").textContent.split(" ")[1];/** @type {string} */sourceDest.href="/"+side+"/main/"+(t>4&&t<15?"presidential":t>14&&t<25?"party":"congress")+"-elections";});}}}};}();function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}function isFriend(citizenHovercard){for(let entry of citizenHovercard.interactionButtons){if(entry.type==="removeFriend"){return true;}}}function hovercardStrength(self,citizenHovercard,numberFormatter){const img="<img style=\"height: 10px; width: 10px;\" src=\"//www.erepublik.net/images/modules/citizenprofile/strength_ico.png\"/>";const strength=citizenHovercard.fighterInfo.military.strength.toFixed(2);return"<div id=\"strength-tooltip\" style='margin-top: -15px; margin-left: 190px; display: flex;justify-content: flex-end;align-items: center;gap: 3px;'>\n".concat(img,"\n").concat(numberFormatter(strength),"\n</div>");}function hovercardDivision(self,citizenHovercard){const divisionNumber=citizenHovercard.fighterInfo.military.division;return"<div id=\"strength-tooltip\" style='margin-top: -30px; margin-left: 190px; display: flex;justify-content: flex-end;align-items: center;gap: 3px;'>\nDiv: \n".concat(divisionNumber,"\n</div>");}function hookUpFeedCommentsScroll(){const style=document.createElement("style");// language=CSS
style.textContent="\n      .postContent .commentsWrapper {\n          max-height: 400px;\n          overflow-y: auto;\n          overflow-x: hidden;\n      }\n    ";document.head.appendChild(style);}function hookUpPowerSpin(){const STORAGE_KEYS={MAX_MONEY:"as-max-money-per-spin",STOP_AT_GOLD_JACKPOT:"as-stop-at-gold",SPIN_ANIMATION_IN_SECONDS:"as-spin-animation-in-seconds"};const powerSpinButtonElement=document.getElementById("launch_wof");if(!powerSpinButtonElement){return;}let stoppingTheWheel=false;let currentJackpotCount=0;powerSpinButtonElement.addEventListener("click",function(){try{createForm();hookUpEvents();createPrizeLog();overrideShowMultiprize();overrideTimelineMax();overrideSpinFunction();overrideMultiSpinFunction();}catch(e){console.warn(e);}});function overrideShowMultiprize(){erepublik.wheel_of_fortune.showMultiPrize=function(){};}function overrideTimelineMax(){let originalFunction=TimelineMax.prototype.to;const spinAnimationInSecondsElement=document.getElementById("as-spin-animation-in-seconds");TimelineMax.prototype.to=function(context,delay,config){if(config.ease===Expo.easeOut){delay=spinAnimationInSecondsElement.value||1;}return originalFunction.apply(this,[context,delay,config]);};}function overrideMultiSpinFunction(){const old=erepublik.wheel_of_fortune.multispin;erepublik.wheel_of_fortune.multispin=function(numPrizes,always3,spinHttpResponse,multiSpin){if(!spinHttpResponse.alreadyHandled){spinHttpResponse.alreadyHandled=true;currentJackpotCount=spinHttpResponse.jackpot;spinHttpResponse.prizes.forEach((reward,index)=>{const{tooltip,icon}=findRewardById(reward.index);const cost=spinHttpResponse.cost+100*index;logPrize(cost,tooltip,icon);});}old.apply(erepublik.wheel_of_fortune,arguments);};function findRewardById(id){return window.global_wof_build_data.prizes.prizes[id];}}function overrideSpinFunction(){const old=erepublik.wheel_of_fortune.spin;erepublik.wheel_of_fortune.spin=function(numPrizes,always3,spinHttpResponse,multiSpin){// For now do nothing.
// The game started calling both multispin and spin functions for a single spin.
// We are now handling logic in a multispin function.
old.apply(erepublik.wheel_of_fortune,arguments);};}function createForm(){const wheelOfFortuneRoot=document.getElementById("wheelOfFortune");if(!wheelOfFortuneRoot){throw Error("No wheel of fortune");}const formElementId="as-form-container";if(document.getElementById(formElementId)){throw Error("Form already exists");}// --------------------
const form="\n      <style>\n        #as-form-container {\n          position: absolute;\n          top: 280px;\n          right: -130px;\n          background-color: #fff;\n          padding: 8px;\n        }\n        \n        label.as-label {\n           display: flex;\n           flex-direction: column;\n           align-items: flex-end;\n           margin-bottom: 8px;\n        }\n        \n        label.as-label.jackpot {\n          flex-direction: row;\n        }\n        \n        label.as-label.jackpot input {\n          margin-left: 10px;\n        }\n        \n        .as-input {\n          max-width: 80px;\n          text-align: right;\n        }\n        \n        .as-buttons {\n          display: flex;\n          justify-content: flex-end;\n        }\n        \n        button.as-hidden {\n          display: none;\n        }\n        \n        #as-spin {\n          background: #94aaff;\n          cursor: pointer;\n        }\n        \n        #as-spin:hover {\n          background: #768ef8;\n        }\n        \n      </style>\n      <div>\n          <label class=\"as-label\">\n              Max Money Per Spin\n              <input id=\"as-max-money\" class=\"as-input\" type=\"text\" placeholder=\"e.g. 2500\">\n          </label>\n          <label class=\"as-label jackpot\">\n              Stop at gold jackpot\n              <input id=\"as-stop-at-gold\" type=\"checkbox\" checked>\n          </label>\n           <label class=\"as-label\">\n              Spin animation\n              <input id=\"as-spin-animation-in-seconds\" class=\"as-input\" type=\"text\" placeholder=\"in seconds\">\n          </label>\n          \n          <div class=\"as-buttons\">\n            <button id=\"as-spin\">\n                Spin\n            </button>\n            <button id=\"as-cancel\" class=\"as-hidden\">\n                Cancel\n            </button>\n          </div>\n      </div>\n    ";const containerElement=document.createElement("div");containerElement.id=formElementId;containerElement.innerHTML=form;wheelOfFortuneRoot.appendChild(containerElement);const maxMoneyInputElement=document.getElementById("as-max-money");const stopAtGoldCheckboxElement=document.getElementById("as-stop-at-gold");const spinAnimationInSecondsElement=document.getElementById("as-spin-animation-in-seconds");const storedMaxMoney=localStorage.getItem(STORAGE_KEYS.MAX_MONEY);if(storedMaxMoney){maxMoneyInputElement.value=storedMaxMoney;}const storedStopAtGold=localStorage.getItem(STORAGE_KEYS.STOP_AT_GOLD_JACKPOT);if(!storedStopAtGold){stopAtGoldCheckboxElement.checked=true;}else{stopAtGoldCheckboxElement.checked=storedStopAtGold==="true";}const spinAnimationInSeconds=localStorage.getItem(STORAGE_KEYS.SPIN_ANIMATION_IN_SECONDS);spinAnimationInSecondsElement.value=spinAnimationInSeconds||1;}function hookUpEvents(){const maxMoneyInputElement=document.getElementById("as-max-money");const stopAtGoldCheckboxElement=document.getElementById("as-stop-at-gold");const spinAnimationInSecondsElement=document.getElementById("as-spin-animation-in-seconds");const spinButtonElement=document.getElementById("as-spin");const cancelButtonElement=document.getElementById("as-cancel");const triggerWof1xButtonElement=document.querySelector(".wof_btn.left_btn");if(!(maxMoneyInputElement||stopAtGoldCheckboxElement||spinButtonElement||cancelButtonElement||triggerWof1xButtonElement)){console.warn("One element is not here",{maxMoneyInputElement,stopAtGoldCheckboxElement,spinButtonElement,cancelButtonElement,triggerWof1xButtonElement});throw Error("One element is not here");}maxMoneyInputElement.addEventListener("change",event=>{localStorage.setItem(STORAGE_KEYS.MAX_MONEY,event.target.value);});stopAtGoldCheckboxElement.addEventListener("change",event=>{localStorage.setItem(STORAGE_KEYS.STOP_AT_GOLD_JACKPOT,event.target.checked);});spinAnimationInSecondsElement.addEventListener("change",event=>{console.log("change",event.target.value);localStorage.setItem(STORAGE_KEYS.SPIN_ANIMATION_IN_SECONDS,event.target.value);});spinButtonElement.addEventListener("click",()=>{const maxMoneyPerSpin=Math.floor(Number(maxMoneyInputElement.value));if(Number.isNaN(maxMoneyPerSpin)||maxMoneyPerSpin<=500){console.warn("maxMoneyPerSpin must be at least 500");return;}const shouldStopAtGoldJackpot=stopAtGoldCheckboxElement.checked;console.log("maxMoneyPerSpin = ".concat(maxMoneyPerSpin,", shouldStopAtGoldJackpot = ").concat(shouldStopAtGoldJackpot));spinTheWheel(maxMoneyPerSpin,shouldStopAtGoldJackpot,Number(spinAnimationInSecondsElement.value));});cancelButtonElement.addEventListener("click",()=>{console.log("Flagging to stop the wheel");stoppingTheWheel=true;});function spinTheWheel(maxCost,shouldStopAtGoldJackpot,baseDelayInSeconds){console.log("Starting the wheel");spinButtonElement.classList.add("as-hidden");cancelButtonElement.classList.remove("as-hidden");const currentCost=window.global_wof_build_data.cost;if(maxCost<=currentCost){console.log("Not spinning, because we've already reached the limit.");stopTheWheel();return;}if(baseDelayInSeconds<=0){console.log("Stopping the wheel, because spin animation must be more than 0s, but is: ",baseDelayInSeconds);stopTheWheel();return;}let previousJackpotCount=currentJackpotCount;function timeHandler(){const currentCost=window.global_wof_build_data.cost;let spinsRequiredCount=(maxCost-currentCost)/100;console.log({spinsRequiredCount,previousJackpotCount,currentJackpotCount});if(stoppingTheWheel){stopTheWheel();return;}if(shouldStopAtGoldJackpot&&currentJackpotCount===3&&previousJackpotCount<3){stopTheWheel();return;}previousJackpotCount=currentJackpotCount;const safetyMarginInSeconds=0.2;if(spinsRequiredCount){triggerWof1xButtonElement.click();setTimeout(timeHandler,baseDelayInSeconds*1000+safetyMarginInSeconds*1000);}else{stopTheWheel();}}timeHandler();}function stopTheWheel(){cancelButtonElement.classList.add("as-hidden");spinButtonElement.classList.remove("as-hidden");console.log("Stopping the wheel");stoppingTheWheel=false;}}function createPrizeLog(){const wheelOfFortuneRoot=document.getElementById("wheelOfFortune");if(!wheelOfFortuneRoot){throw Error("No wheel of fortune");}const containerElementId="as-power-log";if(document.getElementById(containerElementId)){throw Error("Power log already exists");}// --------------------
const innerHTML="\n      <style>\n        #as-power-log {\n          position: absolute;\n          top: 0;\n          right: -306px;\n          background-color: #fff;\n          padding: 8px;\n          width: 300px;\n          height: 260px;\n          z-index: -1;\n          display: flex;\n          flex-direction: column;\n          justify-content: space-between;\n        }\n        \n        #as-power-log-header {\n            font-weight: 600;\n            border-bottom: 1px solid black;\n            padding-bottom: 5px;\n        }\n        \n        #as-power-log-container {\n            overflow: auto;\n        }\n        .as-power-log-item {\n          display: flex;\n          align-items: center;\n        }\n        \n        .as-power-log-icon {\n          height: 24px;\n          margin: 0 4px;\n        }\n      </style>\n      <div id=\"as-power-log-header\">\n          Power Spin Log\n      </div>\n      <div id=\"as-power-log-container\">\n          \n      </div>\n    ";const containerElement=document.createElement("div");containerElement.id=containerElementId;containerElement.innerHTML=innerHTML;wheelOfFortuneRoot.appendChild(containerElement);}function logPrize(price,name,iconUrl){console.log("Logging prize: price = ".concat(price,", name = ").concat(name));const powerLogContainer=document.getElementById("as-power-log-container");if(!powerLogContainer){throw Error("Power log container not available");}const rewardElement=document.createElement("div");rewardElement.classList.add("as-power-log-item");const priceElement=document.createElement("span");priceElement.textContent="".concat(price,": ");rewardElement.appendChild(priceElement);const iconElement=document.createElement("img");iconElement.classList.add("as-power-log-icon");iconElement.src=iconUrl;rewardElement.appendChild(iconElement);const nameElement=document.createElement("span");nameElement.textContent=name;rewardElement.appendChild(nameElement);const shouldScrollBottom=powerLogContainer.scrollTop>=scrollTopMax();powerLogContainer.appendChild(rewardElement);if(shouldScrollBottom){powerLogContainer.scrollTop=powerLogContainer.scrollHeight;}function scrollTopMax(){const tolerance=1;// you can adjust this value to account for small inaccuracies
return powerLogContainer.scrollHeight-powerLogContainer.clientHeight-tolerance;}}}function hookUpDailyChallengeAutoCollect(){const dcButtonElement=document.getElementById("dailyMissionsPopupTrigger");if(!dcButtonElement){return;}dcButtonElement.addEventListener("click",function(){setTimeout(()=>{try{createButton();}catch(e){console.warn(e);}},300);});function createButton(){const BUTTON_ID="claimAllButton";const titleRootElement=document.querySelector("#dailyMissionsPopup > h2");if(!titleRootElement){throw Error("No title root element");}if(document.getElementById(BUTTON_ID)){console.log("Button is already created");return;}const claimAllButtonElement=document.createElement("a");claimAllButtonElement.id=BUTTON_ID;claimAllButtonElement.classList.add("std_global_btn","greenColor","smallSize");claimAllButtonElement.style.float="right";claimAllButtonElement.style.marginRight="16px";claimAllButtonElement.textContent="Claim All & Close";claimAllButtonElement.addEventListener("click",evt=>{evt.target.classList.add("disabled","loading");claimAllButtonClickHandler(1000);});titleRootElement.appendChild(claimAllButtonElement);function claimAllButtonClickHandler(timeToWaitInMs){var _claimButtonElements$;const claimButtonElements=document.querySelectorAll(".missionWrapper:not(.alreadyClaimed) a:not(.disabled).claimButton, .rewardWrapper:not(.claimed) .claimButton");if(!claimButtonElements.length){claimAllButtonElement.classList.remove("disabled","loading");console.log("No more challenges to claim. Closing challenges window.");const closeButtonElement=document.querySelector('#dailyMissionsPopup > a.close.closeButton[title="Close"]');closeButtonElement===null||closeButtonElement===void 0?void 0:closeButtonElement.click();return;}console.log("Challenges to claim: ".concat(claimButtonElements.length));(_claimButtonElements$=claimButtonElements[0])===null||_claimButtonElements$===void 0?void 0:_claimButtonElements$.click();console.log('Going to wait for: '+timeToWaitInMs+' ms.');setTimeout(()=>{claimAllButtonClickHandler(Math.floor(300+Math.random()*(400-300+1)));},timeToWaitInMs);}}}async function hookUpDonatorBadges(stuffUnlockedData){if(!stuffUnlockedData){return;}function parseStuffUnlockedData(){const donatorLevels=Object.values(stuffUnlockedData.donatorLevels).sort((a,b)=>a.minimalDonation-b.minimalDonation);for(const donatorId of Object.keys(stuffUnlockedData.donators)){const donatorInfo=stuffUnlockedData.donators[donatorId];const totalDonations=donatorInfo.donations.reduce((a,b)=>a+b,0);donatorInfo.totalDonations=totalDonations;if(donatorInfo.customBorderUrl){donatorInfo.borderUrl=donatorInfo.customBorderUrl;continue;}for(const donatorLevel of donatorLevels){if(totalDonations>=donatorLevel.minimalDonation){donatorInfo.borderUrl=donatorLevel.borderUrl;}else{break;}}}}const CLASS_NAMES={AVATAR_APPLIED:"su-avatar-applied",ACTION_APPLIED:"su-action-applied",DONATOR_BORDER:"su-donator-border",DONATOR_BORDER_NO_Z_INDEX:"su-no-z-index",PROFILE_PAGE_AVATAR_CONTAINER:"su-avatar-container",BATTLE_FIELD_NAME_ANIMATION:"su-battlefield-name-animation",BATTLE_FIELD_NAME:"su-battlefield-name"};function createGlobalStylesheet(){const style=document.createElement("style");// language=CSS
style.textContent="\n        img.".concat(CLASS_NAMES.DONATOR_BORDER," {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            left: 0;\n            top: 0;\n            transform: scale(1.2);\n            z-index: 11;\n            pointer-events: none;\n        }\n        img.").concat(CLASS_NAMES.DONATOR_BORDER,".").concat(CLASS_NAMES.DONATOR_BORDER_NO_Z_INDEX," {\n            z-index: unset;\n        }\n        .").concat(CLASS_NAMES.PROFILE_PAGE_AVATAR_CONTAINER," {\n            position: relative;\n            height: 158px;\n            width: 158px;\n            display: block;\n            margin-left: 10px;\n        }\n        .").concat(CLASS_NAMES.BATTLE_FIELD_NAME," {\n            color: #fff !important;\n            text-shadow: -1px -1px 0 #000,\n            1px -1px 0 #000,\n            -1px 1px 0 #000,\n            1px 1px 0 #000;\n        }\n        .").concat(CLASS_NAMES.BATTLE_FIELD_NAME_ANIMATION," {\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            left: 0;\n            top: 0;\n            z-index: -1;\n            opacity: 0.5;\n        }\n        .").concat(CLASS_NAMES.BATTLE_FIELD_NAME_ANIMATION,"::before {\n            content: '';\n            position: absolute;\n            inset: 0;\n            background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);\n            animation: su-name-animation 20s linear infinite;\n            background-size: 500%\n        }\n        .").concat(CLASS_NAMES.BATTLE_FIELD_NAME_ANIMATION,"::after {\n            content: '';\n            position: absolute;\n            inset: 0;\n            background: linear-gradient(90deg, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094, #0000ff, #00ff00, #ffff00, #fb0094);\n            animation: su-name-animation 20s linear infinite;\n            background-size: 500%;\n            filter: blur(20px);\n        }\n        @keyframes su-name-animation {\n            0% {\n                background-position: 0 0;\n            }\n            100% {\n                background-position: 500% 0;\n            }\n        }\n    ");document.head.appendChild(style);}parseStuffUnlockedData();createGlobalStylesheet();hookUpEventListeners();applyAllBadges();async function hookUpEventListeners(){await delay(300);// on Main Page
const olderPostsButton=document.querySelector("button.previousposts:not(.".concat(CLASS_NAMES.ACTION_APPLIED,")"));if(olderPostsButton){console.log("Older Posts button found. Listening for a click");olderPostsButton.classList.add(CLASS_NAMES.ACTION_APPLIED);olderPostsButton.addEventListener("click",()=>{applyAllBadges();hookUpEventListeners();});}// on Main Page
const expandCommentsButton=document.querySelectorAll(".postContent .commentCounter:not(.".concat(CLASS_NAMES.ACTION_APPLIED,")"));console.log("Found ".concat(expandCommentsButton.length," comment expand buttons. Listening for a click"));for(const commentsButton of expandCommentsButton){commentsButton.classList.add(CLASS_NAMES.ACTION_APPLIED);commentsButton.addEventListener("click",()=>applyAllBadges());}// on Main Page
const feedTabs=document.querySelectorAll("#citizenFeed .tabsWrapper .tab:not(.".concat(CLASS_NAMES.ACTION_APPLIED,")"));console.log("Found ".concat(feedTabs.length," feed tabs. Listening for a click"));for(const feedTab of feedTabs){feedTab.classList.add(CLASS_NAMES.ACTION_APPLIED);feedTab.addEventListener("click",()=>{removeFromPostsAndCommentsAvatars();applyAllBadges();hookUpEventListeners();});}// on Article Page
const loadMoreCommentsButton=document.querySelector("a.load-more-comments:not(.".concat(CLASS_NAMES.ACTION_APPLIED,")"));if(loadMoreCommentsButton){console.log("Load more comments button found. Listening for a click");loadMoreCommentsButton.classList.add(CLASS_NAMES.ACTION_APPLIED);loadMoreCommentsButton.addEventListener("click",()=>applyAllBadges());}}async function applyAllBadges(){applyPostsAndCommentsAvatars();applyArticleCommentsAvatars();applyBattlefieldAvatars();applyProfilePageAvatars();}async function applyProfilePageAvatars(){await delay(500);const avatarContainerElement=document.querySelector(".citizen_profile_header:not(.".concat(CLASS_NAMES.AVATAR_APPLIED,") > a"));if(!avatarContainerElement){return;}const playerId=window.location.href.split("/").at(-1);if(isDonator(playerId)){avatarContainerElement.classList.add(CLASS_NAMES.AVATAR_APPLIED,CLASS_NAMES.PROFILE_PAGE_AVATAR_CONTAINER);const avatarElement=avatarContainerElement.querySelector(".citizen_avatar");avatarElement&&(avatarElement.style.left="0");avatarContainerElement.appendChild(createBorderElementBasedOnDonatorLevel(playerId));}}async function applyBattlefieldAvatars(){if(!document.querySelector("#pvp")){return;}const maxPoolTime=2000;let currentPoolTime=300;while(true){const entities=document.querySelectorAll("#console_left > li:not(.".concat(CLASS_NAMES.AVATAR_APPLIED,"), #console_right > li:not(.").concat(CLASS_NAMES.AVATAR_APPLIED,")"));for(const entity of entities){var _containerElement$que;const containerElement=entity.querySelector("q");if(!containerElement){continue;}const playerId=(((_containerElement$que=containerElement.querySelector("a"))===null||_containerElement$que===void 0?void 0:_containerElement$que.href)||"").split("/").at(-1);entity.classList.add(CLASS_NAMES.AVATAR_APPLIED);if(isDonator(playerId)){var _playerNameElement$qu,_playerNameElement$qu2;containerElement.appendChild(createBorderElementBasedOnDonatorLevel(playerId,[CLASS_NAMES.DONATOR_BORDER_NO_Z_INDEX]));const playerNameElement=entity.querySelector(".player_name");if(!playerNameElement){continue;}(_playerNameElement$qu=playerNameElement.querySelector("a"))===null||_playerNameElement$qu===void 0?void 0:(_playerNameElement$qu2=_playerNameElement$qu.classList)===null||_playerNameElement$qu2===void 0?void 0:_playerNameElement$qu2.add(CLASS_NAMES.BATTLE_FIELD_NAME);const animationElement=document.createElement("div");animationElement.classList.add(CLASS_NAMES.BATTLE_FIELD_NAME_ANIMATION);playerNameElement.appendChild(animationElement);}}currentPoolTime=Math.min(currentPoolTime+200,maxPoolTime);await delay(currentPoolTime);}}async function applyArticleCommentsAvatars(){await delay(200);const avatars=document.querySelectorAll("a.citizenAvatar:not(.".concat(CLASS_NAMES.AVATAR_APPLIED,")"));for(const avatar of avatars){avatar.classList.add(CLASS_NAMES.AVATAR_APPLIED);const playerId=(avatar.href||"").split("/").at(-1);if(isDonator(playerId)){avatar.appendChild(createBorderElementBasedOnDonatorLevel(playerId));}}}async function applyPostsAndCommentsAvatars(){await delay(300);const avatars=document.querySelectorAll("a.userAvatar:not(.".concat(CLASS_NAMES.AVATAR_APPLIED,")"));for(const avatar of avatars){avatar.classList.add(CLASS_NAMES.AVATAR_APPLIED);const playerId=(avatar.href||"").split("/").at(-1);if(isDonator(playerId)){avatar.appendChild(createBorderElementBasedOnDonatorLevel(playerId));}}}async function removeFromPostsAndCommentsAvatars(){const avatars=document.querySelectorAll("a.userAvatar.".concat(CLASS_NAMES.AVATAR_APPLIED));for(const avatar of avatars){var _avatar$querySelector;avatar.classList.remove(CLASS_NAMES.AVATAR_APPLIED);(_avatar$querySelector=avatar.querySelector(".".concat(CLASS_NAMES.DONATOR_BORDER)))===null||_avatar$querySelector===void 0?void 0:_avatar$querySelector.remove();}}function isDonator(playerId){var _stuffUnlockedData$do;return!!((_stuffUnlockedData$do=stuffUnlockedData.donators[playerId])!==null&&_stuffUnlockedData$do!==void 0&&_stuffUnlockedData$do.borderUrl);}function createBorderElementBasedOnDonatorLevel(playerId,classNames){var _stuffUnlockedData$do2;const url=(_stuffUnlockedData$do2=stuffUnlockedData.donators[playerId])===null||_stuffUnlockedData$do2===void 0?void 0:_stuffUnlockedData$do2.borderUrl;return createBorderElement(url,classNames);}window.createBorderElementBasedOnDonatorLevel=createBorderElementBasedOnDonatorLevel;window.isDonator=isDonator;function createBorderElement(url){let classNames=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];const imageElement=document.createElement("img");imageElement.src=url;imageElement.classList.add(CLASS_NAMES.DONATOR_BORDER,...classNames);return imageElement;}}function calculateNoHitDamage(strength,rank){return 10*(1+strength/400)*(1+rank/5);}// ********** OLD INDEX END **********

/***/ }),

/***/ 694:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  var nativeCodeString = '[native code]';
  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === 'object') {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
          classes.push(arg.toString());
          continue;
        }
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }
  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ 176:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 657:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 463:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var aa = __webpack_require__(791),
  ca = __webpack_require__(296);
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = new Set(),
  ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++) da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
  ja = Object.prototype.hasOwnProperty,
  ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  la = {},
  ma = {};
function oa(a) {
  if (ja.call(ma, a)) return !0;
  if (ja.call(la, a)) return !1;
  if (ka.test(a)) return ma[a] = !0;
  la[a] = !0;
  return !1;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;
  switch (typeof b) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return !1;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;
    case 4:
      return !1 === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}
function v(a, b, c, d, e, f, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  z[a] = new v(a, 0, !1, a, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  z[b] = new v(b, 1, !1, a[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  z[a] = new v(a, 2, !1, a, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  z[a] = new v(a, 3, !0, a, null, !1, !1);
});
["capture", "download"].forEach(function (a) {
  z[a] = new v(a, 4, !1, a, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  z[a] = new v(a, 6, !1, a, null, !1, !1);
});
["rowSpan", "start"].forEach(function (a) {
  z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, !1, a, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(ra, sa);
  z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (a) {
  z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);
});
function ta(a, b, c, d) {
  var e = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  va = Symbol.for("react.element"),
  wa = Symbol.for("react.portal"),
  ya = Symbol.for("react.fragment"),
  za = Symbol.for("react.strict_mode"),
  Aa = Symbol.for("react.profiler"),
  Ba = Symbol.for("react.provider"),
  Ca = Symbol.for("react.context"),
  Da = Symbol.for("react.forward_ref"),
  Ea = Symbol.for("react.suspense"),
  Fa = Symbol.for("react.suspense_list"),
  Ga = Symbol.for("react.memo"),
  Ha = Symbol.for("react.lazy");
Symbol.for("react.scope");
Symbol.for("react.debug_trace_mode");
var Ia = Symbol.for("react.offscreen");
Symbol.for("react.legacy_hidden");
Symbol.for("react.cache");
Symbol.for("react.tracing_marker");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A = Object.assign,
  La;
function Ma(a) {
  if (void 0 === La) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a;
}
var Na = !1;
function Oa(a, b) {
  if (!a || Na) return "";
  Na = !0;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) {
      if (b = function () {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", {
        set: function () {
          throw Error();
        }
      }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l) {
          var d = l;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l) {
          d = l;
        }
        a.call(b.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (l) {
        d = l;
      }
      a();
    }
  } catch (l) {
    if (l && d && "string" === typeof l.stack) {
      for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
        if (1 !== g || 1 !== h) {
          do if (g--, h--, 0 > h || e[g] !== f[h]) {
            var k = "\n" + e[g].replace(" at new ", " at ");
            a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
            return k;
          } while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na = !1, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, !1), a;
    case 11:
      return a = Oa(a.type.render, !1), a;
    case 1:
      return a = Oa(a.type, !0), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a) switch (a.$$typeof) {
    case Ca:
      return (a.displayName || "Context") + ".Consumer";
    case Ba:
      return (a._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a.render;
      a = a.displayName;
      a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
      return a;
    case Ga:
      return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
    case Ha:
      b = a._payload;
      a = a._init;
      try {
        return Qa(a(b));
      } catch (c) {}
  }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value",
    c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
    d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
      f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function () {
        return e.call(this);
      },
      set: function (a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function () {
        return d;
      },
      setValue: function (a) {
        d = "" + a;
      },
      stopTracking: function () {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
    d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, !1);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value),
    d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;
    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = !0);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
  return A({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b) throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length) throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = {
    initialValue: Sa(c)
  };
}
function ib(a, b) {
  var c = Sa(b.value),
    d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb,
  nb = function (a) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
      MSApp.execUnsafeLocalFunction(function () {
        return a(b, c, d, e);
      });
    } : a;
  }(function (a, b) {
    if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;else {
      mb = mb || document.createElement("div");
      mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
      for (b = mb.firstChild; a.firstChild;) a.removeChild(a.firstChild);
      for (; b.firstChild;) a.appendChild(b.firstChild);
    }
  });
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function (a) {
  qb.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"),
      e = rb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}
var tb = A({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null,
  zb = null,
  Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb,
      b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {}
var Ib = !1;
function Jb(a, b, c) {
  if (Ib) return a(b, c);
  Ib = !0;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;
    default:
      a = !1;
  }
  if (a) return null;
  if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
  return c;
}
var Lb = !1;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", {
    get: function () {
      Lb = !0;
    }
  });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a) {
  Lb = !1;
}
function Nb(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l);
  } catch (m) {
    this.onError(m);
  }
}
var Ob = !1,
  Pb = null,
  Qb = !1,
  Rb = null,
  Sb = {
    onError: function (a) {
      Ob = !0;
      Pb = a;
    }
  };
function Tb(a, b, c, d, e, f, g, h, k) {
  Ob = !1;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f, g, h, k) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l = Pb;
      Ob = !1;
      Pb = null;
    } else throw Error(p(198));
    Qb || (Qb = !0, Rb = l);
  }
}
function Vb(a) {
  var b = a,
    c = a;
  if (a.alternate) for (; b.return;) b = b.return;else {
    a = b;
    do b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return; while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a) throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b) throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b;;) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;
    if (null === f) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f.child) {
      for (f = e.child; f;) {
        if (f === c) return Xb(e), a;
        if (f === d) return Xb(e), b;
        f = f.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return) c = e, d = f;else {
      for (var g = !1, h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }
        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }
          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p(189));
      }
    }
    if (c.alternate !== d) throw Error(p(190));
  }
  if (3 !== c.tag) throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag) return a;
  for (a = a.child; null !== a;) {
    var b = $b(a);
    if (null !== b) return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback,
  bc = ca.unstable_cancelCallback,
  cc = ca.unstable_shouldYield,
  dc = ca.unstable_requestPaint,
  B = ca.unstable_now,
  ec = ca.unstable_getCurrentPriorityLevel,
  fc = ca.unstable_ImmediatePriority,
  gc = ca.unstable_UserBlockingPriority,
  hc = ca.unstable_NormalPriority,
  ic = ca.unstable_LowPriority,
  jc = ca.unstable_IdlePriority,
  kc = null,
  lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
  } catch (b) {}
}
var oc = Math.clz32 ? Math.clz32 : nc,
  pc = Math.log,
  qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64,
  sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return 0;
  var d = 0,
    e = a.suspendedLanes,
    f = a.pingedLanes,
    g = c & 268435455;
  if (0 !== g) {
    var h = g & ~e;
    0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
  } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5E3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {
    var g = 31 - oc(f),
      h = 1 << g,
      k = e[g];
    if (-1 === k) {
      if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
    } else k <= b && (a.expiredLanes |= h);
    f &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c;) {
    var e = 31 - oc(c),
      f = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c;) {
    var d = 31 - oc(c),
      e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec,
  Fc,
  Gc,
  Hc,
  Ic,
  Jc = !1,
  Kc = [],
  Lc = null,
  Mc = null,
  Nc = null,
  Oc = new Map(),
  Pc = new Map(),
  Qc = [],
  Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f) return a = {
    blockedOn: b,
    domEventName: c,
    eventSystemFlags: d,
    nativeEvent: f,
    targetContainers: [e]
  }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), !0;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), !0;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), !0;
    case "pointerover":
      var f = e.pointerId;
      Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
      return !0;
    case "gotpointercapture":
      return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;
  }
  return !1;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) if (b = c.tag, 13 === b) {
      if (b = Wb(c), null !== b) {
        a.blockedOn = b;
        Ic(a.priority, function () {
          Gc(c);
        });
        return;
      }
    } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
      a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
      return;
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn) return !1;
  for (var b = a.targetContainers; 0 < b.length;) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;
    b.shift();
  }
  return !0;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = !1;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b) {
    return ad(b, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);) Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig,
  dd = !0;
function ed(a, b, c, d) {
  var e = C,
    f = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function gd(a, b, c, d) {
  var e = C,
    f = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b, c, d);
  } finally {
    C = e, cd.transition = f;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e) hd(a, b, d, id, c), Sc(a, d);else if (Uc(e, a, b, c, d)) d.stopPropagation();else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e;) {
        var f = Cb(e);
        null !== f && Ec(f);
        f = Yc(a, b, c, d);
        null === f && hd(a, b, d, id, c);
        if (f === e) break;
        e = f;
      }
      null !== e && d.stopPropagation();
    } else hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a) if (b = Vb(a), null === b) a = null;else if (c = b.tag, 13 === c) {
    a = Wb(b);
    if (null !== a) return a;
    a = null;
  } else if (3 === c) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a = null;
  } else b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null,
  ld = null,
  md = null;
function nd() {
  if (md) return md;
  var a,
    b = ld,
    c = b.length,
    d,
    e = "value" in kd ? kd.value : kd.textContent,
    f = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++);
  var g = c - a;
  for (d = 1; d <= g && b[c - d] === e[f - d]; d++);
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return !0;
}
function qd() {
  return !1;
}
function rd(a) {
  function b(b, d, e, f, g) {
    this._reactName = b;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;
    for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);
    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
    },
    stopPropagation: function () {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
    },
    persist: function () {},
    isPersistent: pd
  });
  return b;
}
var sd = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (a) {
      return a.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  },
  td = rd(sd),
  ud = A({}, sd, {
    view: 0,
    detail: 0
  }),
  vd = rd(ud),
  wd,
  xd,
  yd,
  Ad = A({}, ud, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: zd,
    button: 0,
    buttons: 0,
    relatedTarget: function (a) {
      return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
    },
    movementX: function (a) {
      if ("movementX" in a) return a.movementX;
      a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
      return wd;
    },
    movementY: function (a) {
      return "movementY" in a ? a.movementY : xd;
    }
  }),
  Bd = rd(Ad),
  Cd = A({}, Ad, {
    dataTransfer: 0
  }),
  Dd = rd(Cd),
  Ed = A({}, ud, {
    relatedTarget: 0
  }),
  Fd = rd(Ed),
  Gd = A({}, sd, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Hd = rd(Gd),
  Id = A({}, sd, {
    clipboardData: function (a) {
      return "clipboardData" in a ? a.clipboardData : window.clipboardData;
    }
  }),
  Jd = rd(Id),
  Kd = A({}, sd, {
    data: 0
  }),
  Ld = rd(Kd),
  Md = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  Nd = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  Od = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, {
    key: function (a) {
      if (a.key) {
        var b = Md[a.key] || a.key;
        if ("Unidentified" !== b) return b;
      }
      return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: zd,
    charCode: function (a) {
      return "keypress" === a.type ? od(a) : 0;
    },
    keyCode: function (a) {
      return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    },
    which: function (a) {
      return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
    }
  }),
  Rd = rd(Qd),
  Sd = A({}, Ad, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }),
  Td = rd(Sd),
  Ud = A({}, ud, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: zd
  }),
  Vd = rd(Ud),
  Wd = A({}, sd, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }),
  Xd = rd(Wd),
  Yd = A({}, Ad, {
    deltaX: function (a) {
      return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
    },
    deltaY: function (a) {
      return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }),
  Zd = rd(Yd),
  $d = [9, 13, 27, 32],
  ae = ia && "CompositionEvent" in window,
  be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be,
  de = ia && (!ae || be && 8 < be && 11 >= be),
  ee = String.fromCharCode(32),
  fe = !1;
function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = !1;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = !0;
      return ee;
    case "textInput":
      return a = b.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;
}
function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
    event: c,
    listeners: b
  }));
}
var pe = null,
  qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}
function ve(a, b) {
  if ("change" === a) return b;
}
var we = !1;
if (ia) {
  var xe;
  if (ia) {
    var ye = ("oninput" in document);
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = !1;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    Jb(re, b);
  }
}
function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}
function Ee(a, b) {
  if ("click" === a) return te(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}
function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {
  if (He(a, b)) return !0;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
  var c = Object.keys(a),
    d = Object.keys(b);
  if (c.length !== d.length) return !1;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He(a[e], b[e])) return !1;
  }
  return !0;
}
function Je(a) {
  for (; a && a.firstChild;) a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }
    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}
function Me() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }
    if (c) a = b.contentWindow;else break;
    b = Xa(a.document);
  }
  return b;
}
function Ne(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe(a) {
  var b = Me(),
    c = a.focusedElem,
    d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
      a = a.getSelection();
      var e = c.textContent.length,
        f = Math.min(d.start, e);
      d = void 0 === d.end ? f : Math.min(d.end, e);
      !a.extend && f > d && (e = d, d = f, f = e);
      e = Ke(c, f);
      var g = Ke(c, d);
      e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
    }
    b = [];
    for (a = c; a = a.parentNode;) 1 === a.nodeType && b.push({
      element: a,
      left: a.scrollLeft,
      top: a.scrollTop
    });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode,
  Qe = null,
  Re = null,
  Se = null,
  Te = !1;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = {
    start: d.selectionStart,
    end: d.selectionEnd
  } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
    anchorNode: d.anchorNode,
    anchorOffset: d.anchorOffset,
    focusNode: d.focusNode,
    focusOffset: d.focusOffset
  }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
    event: b,
    listeners: d
  }), b.target = Qe)));
}
function Ve(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We = {
    animationend: Ve("Animation", "AnimationEnd"),
    animationiteration: Ve("Animation", "AnimationIteration"),
    animationstart: Ve("Animation", "AnimationStart"),
    transitionend: Ve("Transition", "TransitionEnd")
  },
  Xe = {},
  Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a]) return Xe[a];
  if (!We[a]) return a;
  var b = We[a],
    c;
  for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
  return a;
}
var $e = Ze("animationend"),
  af = Ze("animationiteration"),
  bf = Ze("animationstart"),
  cf = Ze("transitionend"),
  df = new Map(),
  ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf],
    jf = hf.toLowerCase(),
    kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c],
      e = d.event;
    d = d.listeners;
    a: {
      var f = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g],
          k = h.instance,
          l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l);
        f = k;
      } else for (g = 0; g < d.length; g++) {
        h = d[g];
        k = h.instance;
        l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        nf(e, h, l);
        f = k;
      }
    }
  }
  if (Qb) throw a = Rb, Qb = !1, Rb = null, a;
}
function D(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, !1), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = !0;
    da.forEach(function (b) {
      "selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
  d ? void 0 !== e ? a.addEventListener(b, c, {
    capture: !0,
    passive: e
  }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, {
    passive: e
  }) : a.addEventListener(b, c, !1);
}
function hd(a, b, c, d, e) {
  var f = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g;) {
        var k = g.tag;
        if (3 === k || 4 === k) if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
        g = g.return;
      }
      for (; null !== h;) {
        g = Wc(h);
        if (null === g) return;
        k = g.tag;
        if (5 === k || 6 === k) {
          d = f = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb(function () {
    var d = f,
      e = xb(c),
      g = [];
    a: {
      var h = df.get(a);
      if (void 0 !== h) {
        var k = td,
          n = a;
        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;
          case "keydown":
          case "keyup":
            k = Rd;
            break;
          case "focusin":
            n = "focus";
            k = Fd;
            break;
          case "focusout":
            n = "blur";
            k = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k = Fd;
            break;
          case "click":
            if (2 === c.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Vd;
            break;
          case $e:
          case af:
          case bf:
            k = Hd;
            break;
          case cf:
            k = Xd;
            break;
          case "scroll":
            k = vd;
            break;
          case "wheel":
            k = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Td;
        }
        var t = 0 !== (b & 4),
          J = !t && "scroll" === a,
          x = t ? null !== h ? h + "Capture" : null : h;
        t = [];
        for (var w = d, u; null !== w;) {
          u = w;
          var F = u.stateNode;
          5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
          if (J) break;
          w = w.return;
        }
        0 < t.length && (h = new k(h, n, null, c, e), g.push({
          event: h,
          listeners: t
        }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h = "mouseover" === a || "pointerover" === a;
        k = "mouseout" === a || "pointerout" === a;
        if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
        if (k || h) {
          h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;
          if (k) {
            if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
          } else k = null, n = d;
          if (k !== n) {
            t = Bd;
            F = "onMouseLeave";
            x = "onMouseEnter";
            w = "mouse";
            if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
            J = null == k ? h : ue(k);
            u = null == n ? h : ue(n);
            h = new t(F, w + "leave", k, c, e);
            h.target = J;
            h.relatedTarget = u;
            F = null;
            Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);
            J = F;
            if (k && n) b: {
              t = k;
              x = n;
              w = 0;
              for (u = t; u; u = vf(u)) w++;
              u = 0;
              for (F = x; F; F = vf(F)) u++;
              for (; 0 < w - u;) t = vf(t), w--;
              for (; 0 < u - w;) x = vf(x), u--;
              for (; w--;) {
                if (t === x || null !== x && t === x.alternate) break b;
                t = vf(t);
                x = vf(x);
              }
              t = null;
            } else t = null;
            null !== k && wf(g, h, k, t, !1);
            null !== n && null !== J && wf(g, J, n, t, !0);
          }
        }
      }
      a: {
        h = d ? ue(d) : window;
        k = h.nodeName && h.nodeName.toLowerCase();
        if ("select" === k || "input" === k && "file" === h.type) var na = ve;else if (me(h)) {
          if (we) na = Fe;else {
            na = De;
            var xa = Ce;
          }
        } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);
        if (na && (na = na(a, d))) {
          ne(g, na, c, e);
          break a;
        }
        xa && xa(a, h, d);
        "focusout" === a && (xa = h._wrapperState) && xa.controlled && "number" === h.type && cb(h, "number", h.value);
      }
      xa = d ? ue(d) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = !1;
          Ue(g, c, e);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g, c, e);
      }
      var $a;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      } else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({
        event: ba,
        listeners: xa
      }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
        event: e,
        listeners: d
      }), e.data = $a);
    }
    se(g, b);
  });
}
function tf(a, b, c) {
  return {
    instance: a,
    listener: b,
    currentTarget: c
  };
}
function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a;) {
    var e = a,
      f = e.stateNode;
    5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a) return null;
  do a = a.return; while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; null !== c && c !== d;) {
    var h = c,
      k = h.alternate,
      l = h.stateNode;
    if (null !== k && k === d) break;
    5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
    c = c.return;
  }
  0 !== g.length && a.push({
    event: b,
    listeners: g
  });
}
var xf = /\r\n?/g,
  yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c) throw Error(p(425));
}
function Bf() {}
var Cf = null,
  Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0,
  Gf = "function" === typeof clearTimeout ? clearTimeout : void 0,
  Hf = "function" === typeof Promise ? Promise : void 0,
  Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function (a) {
    return Hf.resolve(null).then(a).catch(If);
  } : Ff;
function If(a) {
  setTimeout(function () {
    throw a;
  });
}
function Kf(a, b) {
  var c = b,
    d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
      if (0 === d) {
        a.removeChild(e);
        bd(b);
        return;
      }
      d--;
    } else "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a;) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2),
  Of = "__reactFiber$" + Nf,
  Pf = "__reactProps$" + Nf,
  uf = "__reactContainer$" + Nf,
  of = "__reactEvents$" + Nf,
  Qf = "__reactListeners$" + Nf,
  Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b) return b;
  for (var c = a.parentNode; c;) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a;) {
        if (c = a[Of]) return c;
        a = Mf(a);
      }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [],
  Tf = -1;
function Uf(a) {
  return {
    current: a
  };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {},
  H = Uf(Vf),
  Wf = Uf(!1),
  Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
    f;
  for (f in c) e[f] = b[f];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b, c) {
  if (H.current !== Vf) throw Error(p(168));
  G(H, b);
  G(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();
  for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
  return A({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return !0;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c);
}
var eg = null,
  fg = !1,
  gg = !1;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = !0;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = !0;
    var a = 0,
      b = C;
    try {
      var c = eg;
      for (C = 1; a < c.length; a++) {
        var d = c[a];
        do d = d(!0); while (null !== d);
      }
      eg = null;
      fg = !1;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C = b, gg = !1;
    }
  }
  return null;
}
var kg = [],
  lg = 0,
  mg = null,
  ng = 0,
  og = [],
  pg = 0,
  qg = null,
  rg = 1,
  sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f = 32 - oc(b) + e;
  if (30 < f) {
    var g = e - e % 5;
    f = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e -= g;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f + a;
  } else rg = 1 << f | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg;) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg;) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null,
  yg = null,
  I = !1,
  zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, !0) : !1;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? {
        id: rg,
        overflow: sg
      } : null, a.memoizedState = {
        dehydrated: b,
        treeContext: c,
        retryLane: 1073741824
      }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, !0) : !1;
    default:
      return !1;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a)) throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);
      }
    } else {
      if (Dg(a)) throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I = !1;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg) return !1;
  if (!I) return Fg(a), I = !0, !1;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a)) throw Hg(), Error(p(418));
    for (; b;) Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a;) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return !0;
}
function Hg() {
  for (var a = yg; a;) a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = !1;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b) {
  if (a && a.defaultProps) {
    b = A({}, b);
    a = a.defaultProps;
    for (var c in a) void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
var Mg = Uf(null),
  Ng = null,
  Og = null,
  Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a) {
  var b = Mg.current;
  E(Mg);
  a._currentValue = b;
}
function Sg(a, b, c) {
  for (; null !== a;) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c) break;
    a = a.return;
  }
}
function Tg(a, b) {
  Ng = a;
  Pg = Og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = !0), a.firstContext = null);
}
function Vg(a) {
  var b = a._currentValue;
  if (Pg !== a) if (a = {
    context: a,
    memoizedValue: b,
    next: null
  }, null === Og) {
    if (null === Ng) throw Error(p(308));
    Og = a;
    Ng.dependencies = {
      lanes: 0,
      firstContext: a
    };
  } else Og = Og.next = a;
  return b;
}
var Wg = null;
function Xg(a) {
  null === Wg ? Wg = [a] : Wg.push(a);
}
function Yg(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return Zg(a, d);
}
function Zg(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var $g = !1;
function ah(a) {
  a.updateQueue = {
    baseState: a.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
      interleaved: null,
      lanes: 0
    },
    effects: null
  };
}
function bh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = {
    baseState: a.baseState,
    firstBaseUpdate: a.firstBaseUpdate,
    lastBaseUpdate: a.lastBaseUpdate,
    shared: a.shared,
    effects: a.effects
  });
}
function ch(a, b) {
  return {
    eventTime: a,
    lane: b,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}
function dh(a, b, c) {
  var d = a.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return Zg(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return Zg(a, c);
}
function eh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function fh(a, b) {
  var c = a.updateQueue,
    d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null,
      f = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g = {
          eventTime: c.eventTime,
          lane: c.lane,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        };
        null === f ? e = f = g : f = f.next = g;
        c = c.next;
      } while (null !== c);
      null === f ? e = f = b : f = f.next = b;
    } else e = f = b;
    c = {
      baseState: d.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: f,
      shared: d.shared,
      effects: d.effects
    };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function gh(a, b, c, d) {
  var e = a.updateQueue;
  $g = !1;
  var f = e.firstBaseUpdate,
    g = e.lastBaseUpdate,
    h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k = h,
      l = k.next;
    k.next = null;
    null === g ? f = l : g.next = l;
    g = k;
    var m = a.alternate;
    null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
  }
  if (null !== f) {
    var q = e.baseState;
    g = 0;
    m = l = k = null;
    h = f;
    do {
      var r = h.lane,
        y = h.eventTime;
      if ((d & r) === r) {
        null !== m && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n = a,
            t = h;
          r = b;
          y = c;
          switch (t.tag) {
            case 1:
              n = t.payload;
              if ("function" === typeof n) {
                q = n.call(y, q, r);
                break a;
              }
              q = n;
              break a;
            case 3:
              n.flags = n.flags & -65537 | 128;
            case 0:
              n = t.payload;
              r = "function" === typeof n ? n.call(y, q, r) : n;
              if (null === r || void 0 === r) break a;
              q = A({}, q, r);
              break a;
            case 2:
              $g = !0;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
      } else y = {
        eventTime: y,
        lane: r,
        tag: h.tag,
        payload: h.payload,
        callback: h.callback,
        next: null
      }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
      h = h.next;
      if (null === h) if (h = e.shared.pending, null === h) break;else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
    } while (1);
    null === m && (k = q);
    e.baseState = k;
    e.firstBaseUpdate = l;
    e.lastBaseUpdate = m;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do g |= e.lane, e = e.next; while (e !== b);
    } else null === f && (e.shared.lanes = 0);
    hh |= g;
    a.lanes = g;
    a.memoizedState = q;
  }
}
function ih(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b],
      e = d.callback;
    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(p(191, e));
      e.call(d);
    }
  }
}
var jh = new aa.Component().refs;
function kh(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var nh = {
  isMounted: function (a) {
    return (a = a._reactInternals) ? Vb(a) === a : !1;
  },
  enqueueSetState: function (a, b, c) {
    a = a._reactInternals;
    var d = L(),
      e = lh(a),
      f = ch(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = dh(a, f, e);
    null !== b && (mh(b, a, e, d), eh(b, a, e));
  },
  enqueueReplaceState: function (a, b, c) {
    a = a._reactInternals;
    var d = L(),
      e = lh(a),
      f = ch(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    b = dh(a, f, e);
    null !== b && (mh(b, a, e, d), eh(b, a, e));
  },
  enqueueForceUpdate: function (a, b) {
    a = a._reactInternals;
    var c = L(),
      d = lh(a),
      e = ch(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    b = dh(a, e, d);
    null !== b && (mh(b, a, d, c), eh(b, a, d));
  }
};
function oh(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;
}
function ph(a, b, c) {
  var d = !1,
    e = Vf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = nh;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}
function qh(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && nh.enqueueReplaceState(b, b.state, null);
}
function rh(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = jh;
  ah(a);
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function sh(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag) throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d) throw Error(p(147, a));
      var e = d,
        f = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
      b = function (a) {
        var b = e.refs;
        b === jh && (b = e.refs = {});
        null === a ? delete b[f] : b[f] = a;
      };
      b._stringRef = f;
      return b;
    }
    if ("string" !== typeof a) throw Error(p(284));
    if (!c._owner) throw Error(p(290, a));
  }
  return a;
}
function th(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function uh(a) {
  var b = a._init;
  return b(a._payload);
}
function vh(a) {
  function b(b, c) {
    if (a) {
      var d = b.deletions;
      null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);
    }
  }
  function c(c, d) {
    if (!a) return null;
    for (; null !== d;) b(c, d), d = d.sibling;
    return null;
  }
  function d(a, b) {
    for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    return a;
  }
  function e(a, b) {
    a = wh(a, b);
    a.index = 0;
    a.sibling = null;
    return a;
  }
  function f(b, c, d) {
    b.index = d;
    if (!a) return b.flags |= 1048576, c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;
    b.flags |= 2;
    return c;
  }
  function g(b) {
    a && null === b.alternate && (b.flags |= 2);
    return b;
  }
  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = xh(c, a.mode, d), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }
  function k(a, b, c, d) {
    var f = c.type;
    if (f === ya) return m(a, b, c.props.children, d, c.key);
    if (null !== b && (b.elementType === f || "object" === typeof f && null !== f && f.$$typeof === Ha && uh(f) === b.type)) return d = e(b, c.props), d.ref = sh(a, b, c), d.return = a, d;
    d = yh(c.type, c.key, c.props, null, a.mode, d);
    d.ref = sh(a, b, c);
    d.return = a;
    return d;
  }
  function l(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = zh(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || []);
    b.return = a;
    return b;
  }
  function m(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Ah(c, a.mode, d, f), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }
  function q(a, b, c) {
    if ("string" === typeof b && "" !== b || "number" === typeof b) return b = xh("" + b, a.mode, c), b.return = a, b;
    if ("object" === typeof b && null !== b) {
      switch (b.$$typeof) {
        case va:
          return c = yh(b.type, b.key, b.props, null, a.mode, c), c.ref = sh(a, null, b), c.return = a, c;
        case wa:
          return b = zh(b, a.mode, c), b.return = a, b;
        case Ha:
          var d = b._init;
          return q(a, d(b._payload), c);
      }
      if (eb(b) || Ka(b)) return b = Ah(b, a.mode, c, null), b.return = a, b;
      th(a, b);
    }
    return null;
  }
  function r(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);
    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case va:
          return c.key === e ? k(a, b, c, d) : null;
        case wa:
          return c.key === e ? l(a, b, c, d) : null;
        case Ha:
          return e = c._init, r(a, b, e(c._payload), d);
      }
      if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);
      th(a, c);
    }
    return null;
  }
  function y(a, b, c, d, e) {
    if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);
    if ("object" === typeof d && null !== d) {
      switch (d.$$typeof) {
        case va:
          return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);
        case wa:
          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
        case Ha:
          var f = d._init;
          return y(a, b, c, f(d._payload), e);
      }
      if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);
      th(b, d);
    }
    return null;
  }
  function n(e, g, h, k) {
    for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {
      u.index > w ? (x = u, u = null) : x = u.sibling;
      var n = r(e, u, h[w], k);
      if (null === n) {
        null === u && (u = x);
        break;
      }
      a && u && null === n.alternate && b(e, u);
      g = f(n, g, w);
      null === m ? l = n : m.sibling = n;
      m = n;
      u = x;
    }
    if (w === h.length) return c(e, u), I && tg(e, w), l;
    if (null === u) {
      for (; w < h.length; w++) u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);
      I && tg(e, w);
      return l;
    }
    for (u = d(e, u); w < h.length; w++) x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);
    a && u.forEach(function (a) {
      return b(e, a);
    });
    I && tg(e, w);
    return l;
  }
  function t(e, g, h, k) {
    var l = Ka(h);
    if ("function" !== typeof l) throw Error(p(150));
    h = l.call(h);
    if (null == h) throw Error(p(151));
    for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()) {
      m.index > w ? (x = m, m = null) : x = m.sibling;
      var t = r(e, m, n.value, k);
      if (null === t) {
        null === m && (m = x);
        break;
      }
      a && m && null === t.alternate && b(e, m);
      g = f(t, g, w);
      null === u ? l = t : u.sibling = t;
      u = t;
      m = x;
    }
    if (n.done) return c(e, m), I && tg(e, w), l;
    if (null === m) {
      for (; !n.done; w++, n = h.next()) n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
      I && tg(e, w);
      return l;
    }
    for (m = d(e, m); !n.done; w++, n = h.next()) n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m.delete(null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);
    a && m.forEach(function (a) {
      return b(e, a);
    });
    I && tg(e, w);
    return l;
  }
  function J(a, d, f, h) {
    "object" === typeof f && null !== f && f.type === ya && null === f.key && (f = f.props.children);
    if ("object" === typeof f && null !== f) {
      switch (f.$$typeof) {
        case va:
          a: {
            for (var k = f.key, l = d; null !== l;) {
              if (l.key === k) {
                k = f.type;
                if (k === ya) {
                  if (7 === l.tag) {
                    c(a, l.sibling);
                    d = e(l, f.props.children);
                    d.return = a;
                    a = d;
                    break a;
                  }
                } else if (l.elementType === k || "object" === typeof k && null !== k && k.$$typeof === Ha && uh(k) === l.type) {
                  c(a, l.sibling);
                  d = e(l, f.props);
                  d.ref = sh(a, l, f);
                  d.return = a;
                  a = d;
                  break a;
                }
                c(a, l);
                break;
              } else b(a, l);
              l = l.sibling;
            }
            f.type === ya ? (d = Ah(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = yh(f.type, f.key, f.props, null, a.mode, h), h.ref = sh(a, d, f), h.return = a, a = h);
          }
          return g(a);
        case wa:
          a: {
            for (l = f.key; null !== d;) {
              if (d.key === l) {
                if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                  c(a, d.sibling);
                  d = e(d, f.children || []);
                  d.return = a;
                  a = d;
                  break a;
                } else {
                  c(a, d);
                  break;
                }
              } else b(a, d);
              d = d.sibling;
            }
            d = zh(f, a.mode, h);
            d.return = a;
            a = d;
          }
          return g(a);
        case Ha:
          return l = f._init, J(a, d, l(f._payload), h);
      }
      if (eb(f)) return n(a, d, f, h);
      if (Ka(f)) return t(a, d, f, h);
      th(a, f);
    }
    return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = xh(f, a.mode, h), d.return = a, a = d), g(a)) : c(a, d);
  }
  return J;
}
var Bh = vh(!0),
  Ch = vh(!1),
  Dh = {},
  Eh = Uf(Dh),
  Fh = Uf(Dh),
  Gh = Uf(Dh);
function Hh(a) {
  if (a === Dh) throw Error(p(174));
  return a;
}
function Ih(a, b) {
  G(Gh, b);
  G(Fh, a);
  G(Eh, Dh);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E(Eh);
  G(Eh, b);
}
function Jh() {
  E(Eh);
  E(Fh);
  E(Gh);
}
function Kh(a) {
  Hh(Gh.current);
  var b = Hh(Eh.current);
  var c = lb(b, a.type);
  b !== c && (G(Fh, a), G(Eh, c));
}
function Lh(a) {
  Fh.current === a && (E(Eh), E(Fh));
}
var M = Uf(0);
function Mh(a) {
  for (var b = a; null !== b;) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a) break;
    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a = 0; a < Nh.length; a++) Nh[a]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher,
  Qh = ua.ReactCurrentBatchConfig,
  Rh = 0,
  N = null,
  O = null,
  P = null,
  Sh = !1,
  Th = !1,
  Uh = 0,
  Vh = 0;
function Q() {
  throw Error(p(321));
}
function Wh(a, b) {
  if (null === b) return !1;
  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;
  return !0;
}
function Xh(a, b, c, d, e, f) {
  Rh = f;
  N = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
  a = c(d, e);
  if (Th) {
    f = 0;
    do {
      Th = !1;
      Uh = 0;
      if (25 <= f) throw Error(p(301));
      f += 1;
      P = O = null;
      b.updateQueue = null;
      Ph.current = $h;
      a = c(d, e);
    } while (Th);
  }
  Ph.current = ai;
  b = null !== O && null !== O.next;
  Rh = 0;
  P = O = N = null;
  Sh = !1;
  if (b) throw Error(p(300));
  return a;
}
function bi() {
  var a = 0 !== Uh;
  Uh = 0;
  return a;
}
function ci() {
  var a = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === P ? N.memoizedState = P = a : P = P.next = a;
  return P;
}
function di() {
  if (null === O) {
    var a = N.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = O.next;
  var b = null === P ? N.memoizedState : P.next;
  if (null !== b) P = b, O = a;else {
    if (null === a) throw Error(p(310));
    O = a;
    a = {
      memoizedState: O.memoizedState,
      baseState: O.baseState,
      baseQueue: O.baseQueue,
      queue: O.queue,
      next: null
    };
    null === P ? N.memoizedState = P = a : P = P.next = a;
  }
  return P;
}
function ei(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function fi(a) {
  var b = di(),
    c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = O,
    e = d.baseQueue,
    f = c.pending;
  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }
    d.baseQueue = e = f;
    c.pending = null;
  }
  if (null !== e) {
    f = e.next;
    d = d.baseState;
    var h = g = null,
      k = null,
      l = f;
    do {
      var m = l.lane;
      if ((Rh & m) === m) null !== k && (k = k.next = {
        lane: 0,
        action: l.action,
        hasEagerState: l.hasEagerState,
        eagerState: l.eagerState,
        next: null
      }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {
        var q = {
          lane: m,
          action: l.action,
          hasEagerState: l.hasEagerState,
          eagerState: l.eagerState,
          next: null
        };
        null === k ? (h = k = q, g = d) : k = k.next = q;
        N.lanes |= m;
        hh |= m;
      }
      l = l.next;
    } while (null !== l && l !== f);
    null === k ? g = d : k.next = h;
    He(d, b.memoizedState) || (Ug = !0);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do f = e.lane, N.lanes |= f, hh |= f, e = e.next; while (e !== a);
  } else null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function gi(a) {
  var b = di(),
    c = b.queue;
  if (null === c) throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch,
    e = c.pending,
    f = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g = e = e.next;
    do f = a(f, g.action), g = g.next; while (g !== e);
    He(f, b.memoizedState) || (Ug = !0);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }
  return [f, d];
}
function hi() {}
function ii(a, b) {
  var c = N,
    d = di(),
    e = b(),
    f = !He(d.memoizedState, e);
  f && (d.memoizedState = e, Ug = !0);
  d = d.queue;
  ji(ki.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {
    c.flags |= 2048;
    li(9, mi.bind(null, c, d, e, b), void 0, null);
    if (null === R) throw Error(p(349));
    0 !== (Rh & 30) || ni(c, b, e);
  }
  return e;
}
function ni(a, b, c) {
  a.flags |= 16384;
  a = {
    getSnapshot: b,
    value: c
  };
  b = N.updateQueue;
  null === b ? (b = {
    lastEffect: null,
    stores: null
  }, N.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function mi(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  oi(b) && pi(a);
}
function ki(a, b, c) {
  return c(function () {
    oi(b) && pi(a);
  });
}
function oi(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He(a, c);
  } catch (d) {
    return !0;
  }
}
function pi(a) {
  var b = Zg(a, 1);
  null !== b && mh(b, a, 1, -1);
}
function qi(a) {
  var b = ci();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = {
    pending: null,
    interleaved: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: ei,
    lastRenderedState: a
  };
  b.queue = a;
  a = a.dispatch = ri.bind(null, N, a);
  return [b.memoizedState, a];
}
function li(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  b = N.updateQueue;
  null === b ? (b = {
    lastEffect: null,
    stores: null
  }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function si() {
  return di().memoizedState;
}
function ti(a, b, c, d) {
  var e = ci();
  N.flags |= a;
  e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
}
function ui(a, b, c, d) {
  var e = di();
  d = void 0 === d ? null : d;
  var f = void 0;
  if (null !== O) {
    var g = O.memoizedState;
    f = g.destroy;
    if (null !== d && Wh(d, g.deps)) {
      e.memoizedState = li(b, c, f, d);
      return;
    }
  }
  N.flags |= a;
  e.memoizedState = li(1 | b, c, f, d);
}
function vi(a, b) {
  return ti(8390656, 8, a, b);
}
function ji(a, b) {
  return ui(2048, 8, a, b);
}
function wi(a, b) {
  return ui(4, 2, a, b);
}
function xi(a, b) {
  return ui(4, 4, a, b);
}
function yi(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}
function zi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ui(4, 4, yi.bind(null, b, a), c);
}
function Ai() {}
function Bi(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}
function Ci(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function Di(a, b, c) {
  if (0 === (Rh & 21)) return a.baseState && (a.baseState = !1, Ug = !0), a.memoizedState = c;
  He(c, b) || (c = yc(), N.lanes |= c, hh |= c, a.baseState = !0);
  return b;
}
function Ei(a, b) {
  var c = C;
  C = 0 !== c && 4 > c ? c : 4;
  a(!0);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a(!1), b();
  } finally {
    C = c, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a, b, c) {
  var d = lh(a);
  c = {
    lane: d,
    action: c,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (Hi(a)) Ii(b, c);else if (c = Yg(a, b, c, d), null !== c) {
    var e = L();
    mh(c, a, d, e);
    Ji(c, b, d);
  }
}
function ri(a, b, c) {
  var d = lh(a),
    e = {
      lane: d,
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
  if (Hi(a)) Ii(b, e);else {
    var f = a.alternate;
    if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
      var g = b.lastRenderedState,
        h = f(g, c);
      e.hasEagerState = !0;
      e.eagerState = h;
      if (He(h, g)) {
        var k = b.interleaved;
        null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);
        b.interleaved = e;
        return;
      }
    } catch (l) {} finally {}
    c = Yg(a, b, e, d);
    null !== c && (e = L(), mh(c, a, d, e), Ji(c, b, d));
  }
}
function Hi(a) {
  var b = a.alternate;
  return a === N || null !== b && b === N;
}
function Ii(a, b) {
  Th = Sh = !0;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Ji(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var ai = {
    readContext: Vg,
    useCallback: Q,
    useContext: Q,
    useEffect: Q,
    useImperativeHandle: Q,
    useInsertionEffect: Q,
    useLayoutEffect: Q,
    useMemo: Q,
    useReducer: Q,
    useRef: Q,
    useState: Q,
    useDebugValue: Q,
    useDeferredValue: Q,
    useTransition: Q,
    useMutableSource: Q,
    useSyncExternalStore: Q,
    useId: Q,
    unstable_isNewReconciler: !1
  },
  Yh = {
    readContext: Vg,
    useCallback: function (a, b) {
      ci().memoizedState = [a, void 0 === b ? null : b];
      return a;
    },
    useContext: Vg,
    useEffect: vi,
    useImperativeHandle: function (a, b, c) {
      c = null !== c && void 0 !== c ? c.concat([a]) : null;
      return ti(4194308, 4, yi.bind(null, b, a), c);
    },
    useLayoutEffect: function (a, b) {
      return ti(4194308, 4, a, b);
    },
    useInsertionEffect: function (a, b) {
      return ti(4, 2, a, b);
    },
    useMemo: function (a, b) {
      var c = ci();
      b = void 0 === b ? null : b;
      a = a();
      c.memoizedState = [a, b];
      return a;
    },
    useReducer: function (a, b, c) {
      var d = ci();
      b = void 0 !== c ? c(b) : b;
      d.memoizedState = d.baseState = b;
      a = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: a,
        lastRenderedState: b
      };
      d.queue = a;
      a = a.dispatch = Gi.bind(null, N, a);
      return [d.memoizedState, a];
    },
    useRef: function (a) {
      var b = ci();
      a = {
        current: a
      };
      return b.memoizedState = a;
    },
    useState: qi,
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      return ci().memoizedState = a;
    },
    useTransition: function () {
      var a = qi(!1),
        b = a[0];
      a = Ei.bind(null, a[1]);
      ci().memoizedState = a;
      return [b, a];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (a, b, c) {
      var d = N,
        e = ci();
      if (I) {
        if (void 0 === c) throw Error(p(407));
        c = c();
      } else {
        c = b();
        if (null === R) throw Error(p(349));
        0 !== (Rh & 30) || ni(d, b, c);
      }
      e.memoizedState = c;
      var f = {
        value: c,
        getSnapshot: b
      };
      e.queue = f;
      vi(ki.bind(null, d, f, a), [a]);
      d.flags |= 2048;
      li(9, mi.bind(null, d, f, c, b), void 0, null);
      return c;
    },
    useId: function () {
      var a = ci(),
        b = R.identifierPrefix;
      if (I) {
        var c = sg;
        var d = rg;
        c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
        b = ":" + b + "R" + c;
        c = Uh++;
        0 < c && (b += "H" + c.toString(32));
        b += ":";
      } else c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
      return a.memoizedState = b;
    },
    unstable_isNewReconciler: !1
  },
  Zh = {
    readContext: Vg,
    useCallback: Bi,
    useContext: Vg,
    useEffect: ji,
    useImperativeHandle: zi,
    useInsertionEffect: wi,
    useLayoutEffect: xi,
    useMemo: Ci,
    useReducer: fi,
    useRef: si,
    useState: function () {
      return fi(ei);
    },
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      var b = di();
      return Di(b, O.memoizedState, a);
    },
    useTransition: function () {
      var a = fi(ei)[0],
        b = di().memoizedState;
      return [a, b];
    },
    useMutableSource: hi,
    useSyncExternalStore: ii,
    useId: Fi,
    unstable_isNewReconciler: !1
  },
  $h = {
    readContext: Vg,
    useCallback: Bi,
    useContext: Vg,
    useEffect: ji,
    useImperativeHandle: zi,
    useInsertionEffect: wi,
    useLayoutEffect: xi,
    useMemo: Ci,
    useReducer: gi,
    useRef: si,
    useState: function () {
      return gi(ei);
    },
    useDebugValue: Ai,
    useDeferredValue: function (a) {
      var b = di();
      return null === O ? b.memoizedState = a : Di(b, O.memoizedState, a);
    },
    useTransition: function () {
      var a = gi(ei)[0],
        b = di().memoizedState;
      return [a, b];
    },
    useMutableSource: hi,
    useSyncExternalStore: ii,
    useId: Fi,
    unstable_isNewReconciler: !1
  };
function Ki(a, b) {
  try {
    var c = "",
      d = b;
    do c += Pa(d), d = d.return; while (d);
    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }
  return {
    value: a,
    source: b,
    stack: e,
    digest: null
  };
}
function Li(a, b, c) {
  return {
    value: a,
    source: null,
    stack: null != c ? c : null,
    digest: null != b ? b : null
  };
}
function Mi(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function () {
      throw c;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  c.payload = {
    element: null
  };
  var d = b.value;
  c.callback = function () {
    Pi || (Pi = !0, Qi = d);
    Mi(a, b);
  };
  return c;
}
function Ri(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function () {
      return d(e);
    };
    c.callback = function () {
      Mi(a, b);
    };
  }
  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    Mi(a, b);
    "function" !== typeof d && (null === Si ? Si = new Set([this]) : Si.add(this));
    var c = b.stack;
    this.componentDidCatch(b.value, {
      componentStack: null !== c ? c : ""
    });
  });
  return c;
}
function Ti(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Ni();
    var e = new Set();
    d.set(b, e);
  } else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
}
function Vi(a) {
  do {
    var b;
    if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;
    if (b) return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Wi(a, b, c, d, e) {
  if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Xi = ua.ReactCurrentOwner,
  Ug = !1;
function Yi(a, b, c, d) {
  b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
}
function Zi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  Tg(b, e);
  d = Xh(a, b, c, d, f, e);
  c = bi();
  if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I && c && vg(b);
  b.flags |= 1;
  Yi(a, b, d, e);
  return b.child;
}
function aj(a, b, c, d, e) {
  if (null === a) {
    var f = c.type;
    if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, cj(a, b, f, d, e);
    a = yh(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f = a.child;
  if (0 === (a.lanes & e)) {
    var g = f.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie;
    if (c(g, d) && a.ref === b.ref) return $i(a, b, e);
  }
  b.flags |= 1;
  a = wh(f, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function cj(a, b, c, d, e) {
  if (null !== a) {
    var f = a.memoizedProps;
    if (Ie(f, d) && a.ref === b.ref) if (Ug = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (Ug = !0);else return b.lanes = a.lanes, $i(a, b, e);
  }
  return dj(a, b, c, d, e);
}
function ej(a, b, c) {
  var d = b.pendingProps,
    e = d.children,
    f = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode) {
    if (0 === (b.mode & 1)) b.memoizedState = {
      baseLanes: 0,
      cachePool: null,
      transitions: null
    }, G(fj, gj), gj |= c;else {
      if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
        baseLanes: a,
        cachePool: null,
        transitions: null
      }, b.updateQueue = null, G(fj, gj), gj |= a, null;
      b.memoizedState = {
        baseLanes: 0,
        cachePool: null,
        transitions: null
      };
      d = null !== f ? f.baseLanes : c;
      G(fj, gj);
      gj |= d;
    }
  } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(fj, gj), gj |= d;
  Yi(a, b, e, c);
  return b.child;
}
function hj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
}
function dj(a, b, c, d, e) {
  var f = Zf(c) ? Xf : H.current;
  f = Yf(b, f);
  Tg(b, e);
  c = Xh(a, b, c, d, f, e);
  d = bi();
  if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I && d && vg(b);
  b.flags |= 1;
  Yi(a, b, c, e);
  return b.child;
}
function ij(a, b, c, d, e) {
  if (Zf(c)) {
    var f = !0;
    cg(b);
  } else f = !1;
  Tg(b, e);
  if (null === b.stateNode) jj(a, b), ph(b, c, d), rh(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
      h = b.memoizedProps;
    g.props = h;
    var k = g.context,
      l = c.contextType;
    "object" === typeof l && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
    var m = c.getDerivedStateFromProps,
      q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
    q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && qh(b, g, d, l);
    $g = !1;
    var r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    k = b.memoizedState;
    h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);
  } else {
    g = b.stateNode;
    bh(a, b);
    h = b.memoizedProps;
    l = b.type === b.elementType ? h : Lg(b.type, h);
    g.props = l;
    q = b.pendingProps;
    r = g.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
    var y = c.getDerivedStateFromProps;
    (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);
    $g = !1;
    r = b.memoizedState;
    g.state = r;
    gh(b, d, g, e);
    var n = b.memoizedState;
    h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);
  }
  return kj(a, b, c, d, f, e);
}
function kj(a, b, c, d, e, f) {
  hj(a, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e && dg(b, c, !1), $i(a, b, f);
  d = b.stateNode;
  Xi.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);
  b.memoizedState = d.state;
  e && dg(b, c, !0);
  return b.child;
}
function lj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);
  Ih(a, b.containerInfo);
}
function mj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Yi(a, b, c, d);
  return b.child;
}
var nj = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0
};
function oj(a) {
  return {
    baseLanes: a,
    cachePool: null,
    transitions: null
  };
}
function pj(a, b, c) {
  var d = b.pendingProps,
    e = M.current,
    f = !1,
    g = 0 !== (b.flags & 128),
    h;
  (h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
  if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;
  G(M, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a = d.fallback;
    return f ? (d = b.mode, f = b.child, g = {
      mode: "hidden",
      children: g
    }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = qj(g, d, 0, null), a = Ah(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h)) return sj(a, b, g, d, h, e, c);
  if (f) {
    f = d.fallback;
    g = b.mode;
    e = a.child;
    h = e.sibling;
    var k = {
      mode: "hidden",
      children: d.children
    };
    0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);
    f.return = b;
    d.return = b;
    d.sibling = f;
    b.child = d;
    d = f;
    f = b.child;
    g = a.child.memoizedState;
    g = null === g ? oj(c) : {
      baseLanes: g.baseLanes | c,
      cachePool: null,
      transitions: g.transitions
    };
    f.memoizedState = g;
    f.childLanes = a.childLanes & ~c;
    b.memoizedState = nj;
    return d;
  }
  f = a.child;
  a = f.sibling;
  d = wh(f, {
    mode: "visible",
    children: d.children
  });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function rj(a, b) {
  b = qj({
    mode: "visible",
    children: b
  }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function tj(a, b, c, d) {
  null !== d && Jg(d);
  Bh(b, a.child, null, c);
  a = rj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function sj(a, b, c, d, e, f, g) {
  if (c) {
    if (b.flags & 256) return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g, d);
    if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
    f = d.fallback;
    e = b.mode;
    d = qj({
      mode: "visible",
      children: d.children
    }, e, 0, null);
    f = Ah(f, e, g, null);
    f.flags |= 2;
    d.return = b;
    f.return = b;
    d.sibling = f;
    b.child = d;
    0 !== (b.mode & 1) && Bh(b, a.child, null, g);
    b.child.memoizedState = oj(g);
    b.memoizedState = nj;
    return f;
  }
  if (0 === (b.mode & 1)) return tj(a, b, g, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f = Error(p(419));
    d = Li(f, d, void 0);
    return tj(a, b, g, d);
  }
  h = 0 !== (g & a.childLanes);
  if (Ug || h) {
    d = R;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));
    }
    uj();
    d = Li(Error(p(421)));
    return tj(a, b, g, d);
  }
  if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;
  a = f.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I = !0;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = rj(b, d.children);
  b.flags |= 4096;
  return b;
}
function wj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  Sg(a.return, b, c);
}
function xj(a, b, c, d, e) {
  var f = a.memoizedState;
  null === f ? a.memoizedState = {
    isBackwards: b,
    rendering: null,
    renderingStartTime: 0,
    last: d,
    tail: c,
    tailMode: e
  } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
}
function yj(a, b, c) {
  var d = b.pendingProps,
    e = d.revealOrder,
    f = d.tail;
  Yi(a, b, d.children, c);
  d = M.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {
    if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {
      if (13 === a.tag) null !== a.memoizedState && wj(a, c, b);else if (19 === a.tag) wj(a, c, b);else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;
      for (; null === a.sibling;) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }
      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  G(M, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;else switch (e) {
    case "forwards":
      c = b.child;
      for (e = null; null !== c;) a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;
      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      xj(b, !1, e, c, f);
      break;
    case "backwards":
      c = null;
      e = b.child;
      for (b.child = null; null !== e;) {
        a = e.alternate;
        if (null !== a && null === Mh(a)) {
          b.child = e;
          break;
        }
        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }
      xj(b, !0, c, null, f);
      break;
    case "together":
      xj(b, !1, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function jj(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function $i(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  hh |= b.lanes;
  if (0 === (c & b.childLanes)) return null;
  if (null !== a && b.child !== a.child) throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = wh(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function zj(a, b, c) {
  switch (b.tag) {
    case 3:
      lj(b);
      Ig();
      break;
    case 5:
      Kh(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      Ih(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context,
        e = b.memoizedProps.value;
      G(Mg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G(M, M.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes)) return pj(a, b, c);
        G(M, M.current & 1);
        a = $i(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G(M, M.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d) return yj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G(M, M.current);
      if (d) break;else return null;
    case 22:
    case 23:
      return b.lanes = 0, ej(a, b, c);
  }
  return $i(a, b, c);
}
var Aj, Bj, Cj, Dj;
Aj = function (a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;
    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Bj = function () {};
Cj = function (a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    Hh(Eh.current);
    var f = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;
      case "select":
        e = A({}, e, {
          value: void 0
        });
        d = A({}, d, {
          value: void 0
        });
        f = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g;
    c = null;
    for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
      var h = e[l];
      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
    for (l in d) {
      var k = d[l];
      h = null != e ? e[l] : void 0;
      if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) {
        if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f || (f = []), f.push(l, c)), c = k;
      } else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
    }
    c && (f = f || []).push("style", c);
    var l = f;
    if (b.updateQueue = l) b.flags |= 4;
  }
};
Dj = function (a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Ej(a, b) {
  if (!I) switch (a.tailMode) {
    case "hidden":
      b = a.tail;
      for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;
      null === c ? a.tail = null : c.sibling = null;
      break;
    case "collapsed":
      c = a.tail;
      for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;
      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child,
    c = 0,
    d = 0;
  if (b) for (var e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;else for (e = a.child; null !== e;) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Fj(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      Jh();
      E(Wf);
      E(H);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a, b);
      S(b);
      return null;
    case 5:
      Lh(b);
      var e = Hh(Gh.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {
        if (!d) {
          if (null === b.stateNode) throw Error(p(166));
          S(b);
          return null;
        }
        a = Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D("cancel", d);
              D("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++) D(lf[e], d);
              break;
            case "source":
              D("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D("error", d);
              D("load", d);
              break;
            case "details":
              D("toggle", d);
              break;
            case "input":
              Za(d, f);
              D("invalid", d);
              break;
            case "select":
              d._wrapperState = {
                wasMultiple: !!f.multiple
              };
              D("invalid", d);
              break;
            case "textarea":
              hb(d, f), D("invalid", d);
          }
          ub(c, f);
          e = null;
          for (var g in f) if (f.hasOwnProperty(g)) {
            var h = f[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
          }
          switch (c) {
            case "input":
              Va(d);
              db(d, f, !0);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, {
            is: d.is
          }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          Aj(a, b, !1, !1);
          b.stateNode = a;
          a: {
            g = vb(c, d);
            switch (c) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++) D(lf[e], a);
                e = d;
                break;
              case "source":
                D("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D("error", a);
                D("load", a);
                e = d;
                break;
              case "details":
                D("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = {
                  wasMultiple: !!d.multiple
                };
                e = A({}, d, {
                  value: void 0
                });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f in h) if (h.hasOwnProperty(f)) {
              var k = h[f];
              "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
            }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, !1);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f = d.value;
                null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = !0;
                break a;
              default:
                d = !1;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode) Dj(a, b, a.memoizedProps, d);else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
        c = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f = d.nodeValue !== c) if (a = xg, null !== a) switch (a.tag) {
            case 3:
              Af(d.nodeValue, c, 0 !== (a.mode & 1));
              break;
            case 5:
              !0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
          }
          f && (b.flags |= 4);
        } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E(M);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = !1;else if (f = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f) throw Error(p(318));
            f = b.memoizedState;
            f = null !== f ? f.dehydrated : null;
            if (!f) throw Error(p(317));
            f[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f = !1;
        } else null !== zg && (Gj(zg), zg = null), f = !0;
        if (!f) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return Rg(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E(M);
      f = b.memoizedState;
      if (null === f) return S(b), null;
      d = 0 !== (b.flags & 128);
      g = f.rendering;
      if (null === g) {
        if (d) Ej(f, !1);else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {
            g = Mh(a);
            if (null !== g) {
              b.flags |= 128;
              Ej(f, !1);
              d = g.updateQueue;
              null !== d && (b.updateQueue = d, b.flags |= 4);
              b.subtreeFlags = 0;
              d = c;
              for (c = b.child; null !== c;) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
                lanes: a.lanes,
                firstContext: a.firstContext
              }), c = c.sibling;
              G(M, M.current & 1 | 2);
              return b.child;
            }
            a = a.sibling;
          }
          null !== f.tail && B() > Hj && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);
        }
      } else {
        if (!d) if (a = Mh(g), null !== a) {
          if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
        } else 2 * B() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);
        f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
      }
      if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = M.current, G(M, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Jj(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return Jh(), E(Wf), E(H), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Lh(b), null;
    case 13:
      E(M);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate) throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E(M), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = !1,
  U = !1,
  Lj = "function" === typeof WeakSet ? WeakSet : Set,
  V = null;
function Mj(a, b) {
  var c = a.ref;
  if (null !== c) if ("function" === typeof c) try {
    c(null);
  } catch (d) {
    W(a, b, d);
  } else c.current = null;
}
function Nj(a, b, c) {
  try {
    c();
  } catch (d) {
    W(a, b, d);
  }
}
var Oj = !1;
function Pj(a, b) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a) var c = {
      start: a.selectionStart,
      end: a.selectionEnd
    };else a: {
      c = (c = a.ownerDocument) && c.defaultView || window;
      var d = c.getSelection && c.getSelection();
      if (d && 0 !== d.rangeCount) {
        c = d.anchorNode;
        var e = d.anchorOffset,
          f = d.focusNode;
        d = d.focusOffset;
        try {
          c.nodeType, f.nodeType;
        } catch (F) {
          c = null;
          break a;
        }
        var g = 0,
          h = -1,
          k = -1,
          l = 0,
          m = 0,
          q = a,
          r = null;
        b: for (;;) {
          for (var y;;) {
            q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
            q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
            3 === q.nodeType && (g += q.nodeValue.length);
            if (null === (y = q.firstChild)) break;
            r = q;
            q = y;
          }
          for (;;) {
            if (q === a) break b;
            r === c && ++l === e && (h = g);
            r === f && ++m === d && (k = g);
            if (null !== (y = q.nextSibling)) break;
            q = r;
            r = q.parentNode;
          }
          q = y;
        }
        c = -1 === h || -1 === k ? null : {
          start: h,
          end: k
        };
      } else c = null;
    }
    c = c || {
      start: 0,
      end: 0
    };
  } else c = null;
  Df = {
    focusedElem: a,
    selectionRange: c
  };
  dd = !1;
  for (V = b; null !== V;) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;else for (; null !== V;) {
    b = V;
    try {
      var n = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n) {
            var t = n.memoizedProps,
              J = n.memoizedState,
              x = b.stateNode,
              w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);
            x.__reactInternalSnapshotBeforeUpdate = w;
          }
          break;
        case 3:
          var u = b.stateNode.containerInfo;
          1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p(163));
      }
    } catch (F) {
      W(b, b.return, F);
    }
    a = b.sibling;
    if (null !== a) {
      a.return = b.return;
      V = a;
      break;
    }
    V = b.return;
  }
  n = Oj;
  Oj = !1;
  return n;
}
function Qj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f = e.destroy;
        e.destroy = void 0;
        void 0 !== f && Nj(b, c, f);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Rj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Sj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Tj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Tj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Uj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Vj(a) {
  a: for (;;) {
    for (; null === a.sibling;) {
      if (null === a.return || Uj(a.return)) return null;
      a = a.return;
    }
    a.sibling.return = a.return;
    for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {
      if (a.flags & 2) continue a;
      if (null === a.child || 4 === a.tag) continue a;else a.child.return = a, a = a.child;
    }
    if (!(a.flags & 2)) return a.stateNode;
  }
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a;) Wj(a, b, c), a = a.sibling;
}
function Xj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);else if (4 !== d && (a = a.child, null !== a)) for (Xj(a, b, c), a = a.sibling; null !== a;) Xj(a, b, c), a = a.sibling;
}
var X = null,
  Yj = !1;
function Zj(a, b, c) {
  for (c = c.child; null !== c;) ak(a, b, c), c = c.sibling;
}
function ak(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c);
  } catch (h) {}
  switch (c.tag) {
    case 5:
      U || Mj(c, b);
    case 6:
      var d = X,
        e = Yj;
      X = null;
      Zj(a, b, c);
      X = d;
      Yj = e;
      null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
      break;
    case 18:
      null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
      break;
    case 4:
      d = X;
      e = Yj;
      X = c.stateNode.containerInfo;
      Yj = !0;
      Zj(a, b, c);
      X = d;
      Yj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f = e,
            g = f.destroy;
          f = f.tag;
          void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));
          e = e.next;
        } while (e !== d);
      }
      Zj(a, b, c);
      break;
    case 1:
      if (!U && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W(c, b, h);
      }
      Zj(a, b, c);
      break;
    case 21:
      Zj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Zj(a, b, c), U = d) : Zj(a, b, c);
      break;
    default:
      Zj(a, b, c);
  }
}
function bk(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Lj());
    b.forEach(function (b) {
      var d = ck.bind(null, a, b);
      c.has(b) || (c.add(b), b.then(d, d));
    });
  }
}
function dk(a, b) {
  var c = b.deletions;
  if (null !== c) for (var d = 0; d < c.length; d++) {
    var e = c[d];
    try {
      var f = a,
        g = b,
        h = g;
      a: for (; null !== h;) {
        switch (h.tag) {
          case 5:
            X = h.stateNode;
            Yj = !1;
            break a;
          case 3:
            X = h.stateNode.containerInfo;
            Yj = !0;
            break a;
          case 4:
            X = h.stateNode.containerInfo;
            Yj = !0;
            break a;
        }
        h = h.return;
      }
      if (null === X) throw Error(p(160));
      ak(f, g, e);
      X = null;
      Yj = !1;
      var k = e.alternate;
      null !== k && (k.return = null);
      e.return = null;
    } catch (l) {
      W(e, b, l);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) ek(b, a), b = b.sibling;
}
function ek(a, b) {
  var c = a.alternate,
    d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b, a);
      fk(a);
      if (d & 4) {
        try {
          Qj(3, a, a.return), Rj(3, a);
        } catch (t) {
          W(a, a.return, t);
        }
        try {
          Qj(5, a, a.return);
        } catch (t) {
          W(a, a.return, t);
        }
      }
      break;
    case 1:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      break;
    case 5:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t) {
          W(a, a.return, t);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f = a.memoizedProps,
          g = null !== c ? c.memoizedProps : f,
          h = a.type,
          k = a.updateQueue;
        a.updateQueue = null;
        if (null !== k) try {
          "input" === h && "radio" === f.type && null != f.name && ab(e, f);
          vb(h, g);
          var l = vb(h, f);
          for (g = 0; g < k.length; g += 2) {
            var m = k[g],
              q = k[g + 1];
            "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
          }
          switch (h) {
            case "input":
              bb(e, f);
              break;
            case "textarea":
              ib(e, f);
              break;
            case "select":
              var r = e._wrapperState.wasMultiple;
              e._wrapperState.wasMultiple = !!f.multiple;
              var y = f.value;
              null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple, f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));
          }
          e[Pf] = f;
        } catch (t) {
          W(a, a.return, t);
        }
      }
      break;
    case 6:
      dk(b, a);
      fk(a);
      if (d & 4) {
        if (null === a.stateNode) throw Error(p(162));
        e = a.stateNode;
        f = a.memoizedProps;
        try {
          e.nodeValue = f;
        } catch (t) {
          W(a, a.return, t);
        }
      }
      break;
    case 3:
      dk(b, a);
      fk(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t) {
        W(a, a.return, t);
      }
      break;
    case 4:
      dk(b, a);
      fk(a);
      break;
    case 13:
      dk(b, a);
      fk(a);
      e = a.child;
      e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B()));
      d & 4 && bk(a);
      break;
    case 22:
      m = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U = (l = U) || m, dk(b, a), U = l) : dk(b, a);
      fk(a);
      if (d & 8192) {
        l = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m;) {
          for (q = V = m; null !== V;) {
            r = V;
            y = r.child;
            switch (r.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Qj(4, r, r.return);
                break;
              case 1:
                Mj(r, r.return);
                var n = r.stateNode;
                if ("function" === typeof n.componentWillUnmount) {
                  d = r;
                  c = r.return;
                  try {
                    b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                  } catch (t) {
                    W(d, c, t);
                  }
                }
                break;
              case 5:
                Mj(r, r.return);
                break;
              case 22:
                if (null !== r.memoizedState) {
                  hk(q);
                  continue;
                }
            }
            null !== y ? (y.return = r, V = y) : hk(q);
          }
          m = m.sibling;
        }
        a: for (m = null, q = a;;) {
          if (5 === q.tag) {
            if (null === m) {
              m = q;
              try {
                e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
              } catch (t) {
                W(a, a.return, t);
              }
            }
          } else if (6 === q.tag) {
            if (null === m) try {
              q.stateNode.nodeValue = l ? "" : q.memoizedProps;
            } catch (t) {
              W(a, a.return, t);
            }
          } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
            q.child.return = q;
            q = q.child;
            continue;
          }
          if (q === a) break a;
          for (; null === q.sibling;) {
            if (null === q.return || q.return === a) break a;
            m === q && (m = null);
            q = q.return;
          }
          m === q && (m = null);
          q.sibling.return = q.return;
          q = q.sibling;
        }
      }
      break;
    case 19:
      dk(b, a);
      fk(a);
      d & 4 && bk(a);
      break;
    case 21:
      break;
    default:
      dk(b, a), fk(a);
  }
}
function fk(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c;) {
          if (Uj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f = Vj(a);
          Xj(a, f, e);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo,
            h = Vj(a);
          Wj(a, h, g);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k) {
      W(a, a.return, k);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function ik(a, b, c) {
  V = a;
  jk(a, b, c);
}
function jk(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V;) {
    var e = V,
      f = e.child;
    if (22 === e.tag && d) {
      var g = null !== e.memoizedState || Kj;
      if (!g) {
        var h = e.alternate,
          k = null !== h && null !== h.memoizedState || U;
        h = Kj;
        var l = U;
        Kj = g;
        if ((U = k) && !l) for (V = e; null !== V;) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k.return = g, V = k) : kk(e);
        for (; null !== f;) V = f, jk(f, b, c), f = f.sibling;
        V = e;
        Kj = h;
        U = l;
      }
      lk(a, b, c);
    } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : lk(a, b, c);
  }
}
function lk(a) {
  for (; null !== V;) {
    var b = V;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Rj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U) if (null === c) d.componentDidMount();else {
              var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
              d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f = b.updateQueue;
            null !== f && ih(b, f, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c = b.child.stateNode;
                  break;
                case 1:
                  c = b.child.stateNode;
              }
              ih(b, g, c);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c && b.flags & 4) {
              c = h;
              var k = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k.autoFocus && c.focus();
                  break;
                case "img":
                  k.src && (c.src = k.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l = b.alternate;
              if (null !== l) {
                var m = l.memoizedState;
                if (null !== m) {
                  var q = m.dehydrated;
                  null !== q && bd(q);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p(163));
        }
        U || b.flags & 512 && Sj(b);
      } catch (r) {
        W(b, b.return, r);
      }
    }
    if (b === a) {
      V = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function hk(a) {
  for (; null !== V;) {
    var b = V;
    if (b === a) {
      V = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V = c;
      break;
    }
    V = b.return;
  }
}
function kk(a) {
  for (; null !== V;) {
    var b = V;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Rj(4, b);
          } catch (k) {
            W(b, c, k);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k) {
              W(b, e, k);
            }
          }
          var f = b.return;
          try {
            Sj(b);
          } catch (k) {
            W(b, f, k);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Sj(b);
          } catch (k) {
            W(b, g, k);
          }
      }
    } catch (k) {
      W(b, b.return, k);
    }
    if (b === a) {
      V = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V = h;
      break;
    }
    V = b.return;
  }
}
var mk = Math.ceil,
  nk = ua.ReactCurrentDispatcher,
  ok = ua.ReactCurrentOwner,
  pk = ua.ReactCurrentBatchConfig,
  K = 0,
  R = null,
  Y = null,
  Z = 0,
  gj = 0,
  fj = Uf(0),
  T = 0,
  qk = null,
  hh = 0,
  rk = 0,
  sk = 0,
  tk = null,
  uk = null,
  gk = 0,
  Hj = Infinity,
  vk = null,
  Pi = !1,
  Qi = null,
  Si = null,
  wk = !1,
  xk = null,
  yk = 0,
  zk = 0,
  Ak = null,
  Bk = -1,
  Ck = 0;
function L() {
  return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
}
function lh(a) {
  if (0 === (a.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
  if (null !== Kg.transition) return 0 === Ck && (Ck = yc()), Ck;
  a = C;
  if (0 !== a) return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function mh(a, b, c, d) {
  if (50 < zk) throw zk = 0, Ak = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K & 2) || a !== R) a === R && (0 === (K & 2) && (rk |= c), 4 === T && Dk(a, Z)), Ek(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Hj = B() + 500, fg && jg());
}
function Ek(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === R ? Z : 0);
  if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b) 0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function () {
      0 === (K & 6) && jg();
    }), c = null;else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Gk(c, Hk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Hk(a, b) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K & 6)) throw Error(p(327));
  var c = a.callbackNode;
  if (Ik() && a.callbackNode !== c) return null;
  var d = uc(a, a === R ? Z : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Jk(a, d);else {
    b = d;
    var e = K;
    K |= 2;
    var f = Kk();
    if (R !== a || Z !== b) vk = null, Hj = B() + 500, Lk(a, b);
    do try {
      Mk();
      break;
    } catch (h) {
      Nk(a, h);
    } while (1);
    Qg();
    nk.current = f;
    K = e;
    null !== Y ? b = 0 : (R = null, Z = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
    if (1 === b) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
    if (6 === b) Dk(a, d);else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Ok(a, f))), 1 === b)) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Qk(a, uk, vk);
          break;
        case 3:
          Dk(a, d);
          if ((d & 130023424) === d && (b = gk + 500 - B(), 10 < b)) {
            if (0 !== uc(a, 0)) break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              L();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 4:
          Dk(a, d);
          if ((d & 4194240) === d) break;
          b = a.eventTimes;
          for (e = -1; 0 < d;) {
            var g = 31 - oc(d);
            f = 1 << g;
            g = b[g];
            g > e && (e = g);
            d &= ~f;
          }
          d = e;
          d = B() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 5:
          Qk(a, uk, vk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Ek(a, B());
  return a.callbackNode === c ? Hk.bind(null, a) : null;
}
function Ok(a, b) {
  var c = tk;
  a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
  a = Jk(a, b);
  2 !== a && (b = uk, uk = c, null !== b && Gj(b));
  return a;
}
function Gj(a) {
  null === uk ? uk = a : uk.push.apply(uk, a);
}
function Pk(a) {
  for (var b = a;;) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
        var e = c[d],
          f = e.getSnapshot;
        e = e.value;
        try {
          if (!He(f(), e)) return !1;
        } catch (g) {
          return !1;
        }
      }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;else {
      if (b === a) break;
      for (; null === b.sibling;) {
        if (null === b.return || b.return === a) return !0;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return !0;
}
function Dk(a, b) {
  b &= ~sk;
  b &= ~rk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b;) {
    var c = 31 - oc(b),
      d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Fk(a) {
  if (0 !== (K & 6)) throw Error(p(327));
  Ik();
  var b = uc(a, 0);
  if (0 === (b & 1)) return Ek(a, B()), null;
  var c = Jk(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Ok(a, d));
  }
  if (1 === c) throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B()), c;
  if (6 === c) throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Qk(a, uk, vk);
  Ek(a, B());
  return null;
}
function Rk(a, b) {
  var c = K;
  K |= 1;
  try {
    return a(b);
  } finally {
    K = c, 0 === K && (Hj = B() + 500, fg && jg());
  }
}
function Sk(a) {
  null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
  var b = K;
  K |= 1;
  var c = pk.transition,
    d = C;
  try {
    if (pk.transition = null, C = 1, a) return a();
  } finally {
    C = d, pk.transition = c, K = b, 0 === (K & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E(fj);
}
function Lk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y) for (c = Y.return; null !== c;) {
    var d = c;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        Jh();
        E(Wf);
        E(H);
        Oh();
        break;
      case 5:
        Lh(d);
        break;
      case 4:
        Jh();
        break;
      case 13:
        E(M);
        break;
      case 19:
        E(M);
        break;
      case 10:
        Rg(d.type._context);
        break;
      case 22:
      case 23:
        Ij();
    }
    c = c.return;
  }
  R = a;
  Y = a = wh(a.current, null);
  Z = gj = b;
  T = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b = 0; b < Wg.length; b++) if (c = Wg[b], d = c.interleaved, null !== d) {
      c.interleaved = null;
      var e = d.next,
        f = c.pending;
      if (null !== f) {
        var g = f.next;
        f.next = e;
        d.next = g;
      }
      c.pending = d;
    }
    Wg = null;
  }
  return a;
}
function Nk(a, b) {
  do {
    var c = Y;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N.memoizedState; null !== d;) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Sh = !1;
      }
      Rh = 0;
      P = O = N = null;
      Th = !1;
      Uh = 0;
      ok.current = null;
      if (null === c || null === c.return) {
        T = 1;
        qk = b;
        Y = null;
        break;
      }
      a: {
        var f = a,
          g = c.return,
          h = c,
          k = b;
        b = Z;
        h.flags |= 32768;
        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l = k,
            m = h,
            q = m.tag;
          if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
            var r = m.alternate;
            r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Vi(g);
          if (null !== y) {
            y.flags &= -257;
            Wi(y, g, h, f, b);
            y.mode & 1 && Ti(f, l, b);
            b = y;
            k = l;
            var n = b.updateQueue;
            if (null === n) {
              var t = new Set();
              t.add(k);
              b.updateQueue = t;
            } else n.add(k);
            break a;
          } else {
            if (0 === (b & 1)) {
              Ti(f, l, b);
              uj();
              break a;
            }
            k = Error(p(426));
          }
        } else if (I && h.mode & 1) {
          var J = Vi(g);
          if (null !== J) {
            0 === (J.flags & 65536) && (J.flags |= 256);
            Wi(J, g, h, f, b);
            Jg(Ki(k, h));
            break a;
          }
        }
        f = k = Ki(k, h);
        4 !== T && (T = 2);
        null === tk ? tk = [f] : tk.push(f);
        f = g;
        do {
          switch (f.tag) {
            case 3:
              f.flags |= 65536;
              b &= -b;
              f.lanes |= b;
              var x = Oi(f, k, b);
              fh(f, x);
              break a;
            case 1:
              h = k;
              var w = f.type,
                u = f.stateNode;
              if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {
                f.flags |= 65536;
                b &= -b;
                f.lanes |= b;
                var F = Ri(f, h, b);
                fh(f, F);
                break a;
              }
          }
          f = f.return;
        } while (null !== f);
      }
      Tk(c);
    } catch (na) {
      b = na;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a = nk.current;
  nk.current = ai;
  return null === a ? ai : a;
}
function uj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);
}
function Jk(a, b) {
  var c = K;
  K |= 2;
  var d = Kk();
  if (R !== a || Z !== b) vk = null, Lk(a, b);
  do try {
    Uk();
    break;
  } catch (e) {
    Nk(a, e);
  } while (1);
  Qg();
  K = c;
  nk.current = d;
  if (null !== Y) throw Error(p(261));
  R = null;
  Z = 0;
  return T;
}
function Uk() {
  for (; null !== Y;) Vk(Y);
}
function Mk() {
  for (; null !== Y && !cc();) Vk(Y);
}
function Vk(a) {
  var b = Wk(a.alternate, a, gj);
  a.memoizedProps = a.pendingProps;
  null === b ? Tk(a) : Y = b;
  ok.current = null;
}
function Tk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Fj(c, b, gj), null !== c) {
        Y = c;
        return;
      }
    } else {
      c = Jj(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y = c;
        return;
      }
      if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {
        T = 6;
        Y = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y = b;
      return;
    }
    Y = b = a;
  } while (null !== b);
  0 === T && (T = 5);
}
function Qk(a, b, c) {
  var d = C,
    e = pk.transition;
  try {
    pk.transition = null, C = 1, Xk(a, b, c, d);
  } finally {
    pk.transition = e, C = d;
  }
  return null;
}
function Xk(a, b, c, d) {
  do Ik(); while (null !== xk);
  if (0 !== (K & 6)) throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f = c.lanes | c.childLanes;
  Bc(a, f);
  a === R && (Y = R = null, Z = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = !0, Gk(hc, function () {
    Ik();
    return null;
  }));
  f = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f) {
    f = pk.transition;
    pk.transition = null;
    var g = C;
    C = 1;
    var h = K;
    K |= 4;
    ok.current = null;
    Pj(a, c);
    ek(c, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    ik(c, a, e);
    dc();
    K = h;
    C = g;
    pk.transition = f;
  } else a.current = c;
  wk && (wk = !1, xk = a, yk = e);
  f = a.pendingLanes;
  0 === f && (Si = null);
  mc(c.stateNode, d);
  Ek(a, B());
  if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, {
    componentStack: e.stack,
    digest: e.digest
  });
  if (Pi) throw Pi = !1, a = Qi, Qi = null, a;
  0 !== (yk & 1) && 0 !== a.tag && Ik();
  f = a.pendingLanes;
  0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a = Dc(yk),
      b = pk.transition,
      c = C;
    try {
      pk.transition = null;
      C = 16 > a ? 16 : a;
      if (null === xk) var d = !1;else {
        a = xk;
        xk = null;
        yk = 0;
        if (0 !== (K & 6)) throw Error(p(331));
        var e = K;
        K |= 4;
        for (V = a.current; null !== V;) {
          var f = V,
            g = f.child;
          if (0 !== (V.flags & 16)) {
            var h = f.deletions;
            if (null !== h) {
              for (var k = 0; k < h.length; k++) {
                var l = h[k];
                for (V = l; null !== V;) {
                  var m = V;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m, f);
                  }
                  var q = m.child;
                  if (null !== q) q.return = m, V = q;else for (; null !== V;) {
                    m = V;
                    var r = m.sibling,
                      y = m.return;
                    Tj(m);
                    if (m === l) {
                      V = null;
                      break;
                    }
                    if (null !== r) {
                      r.return = y;
                      V = r;
                      break;
                    }
                    V = y;
                  }
                }
              }
              var n = f.alternate;
              if (null !== n) {
                var t = n.child;
                if (null !== t) {
                  n.child = null;
                  do {
                    var J = t.sibling;
                    t.sibling = null;
                    t = J;
                  } while (null !== t);
                }
              }
              V = f;
            }
          }
          if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;else b: for (; null !== V;) {
            f = V;
            if (0 !== (f.flags & 2048)) switch (f.tag) {
              case 0:
              case 11:
              case 15:
                Qj(9, f, f.return);
            }
            var x = f.sibling;
            if (null !== x) {
              x.return = f.return;
              V = x;
              break b;
            }
            V = f.return;
          }
        }
        var w = a.current;
        for (V = w; null !== V;) {
          g = V;
          var u = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;else b: for (g = w; null !== V;) {
            h = V;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Rj(9, h);
              }
            } catch (na) {
              W(h, h.return, na);
            }
            if (h === g) {
              V = null;
              break b;
            }
            var F = h.sibling;
            if (null !== F) {
              F.return = h.return;
              V = F;
              break b;
            }
            V = h.return;
          }
        }
        K = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a);
        } catch (na) {}
        d = !0;
      }
      return d;
    } finally {
      C = c, pk.transition = b;
    }
  }
  return !1;
}
function Yk(a, b, c) {
  b = Ki(c, b);
  b = Oi(a, b, 1);
  a = dh(a, b, 1);
  b = L();
  null !== a && (Ac(a, 1, b), Ek(a, b));
}
function W(a, b, c) {
  if (3 === a.tag) Yk(a, a, c);else for (; null !== b;) {
    if (3 === b.tag) {
      Yk(b, a, c);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
        a = Ki(c, a);
        a = Ri(b, a, 1);
        b = dh(b, a, 1);
        a = L();
        null !== b && (Ac(b, 1, a), Ek(b, a));
        break;
      }
    }
    b = b.return;
  }
}
function Ui(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = L();
  a.pingedLanes |= a.suspendedLanes & c;
  R === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c);
  Ek(a, b);
}
function Zk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = L();
  a = Zg(a, b);
  null !== a && (Ac(a, b, c), Ek(a, c));
}
function vj(a) {
  var b = a.memoizedState,
    c = 0;
  null !== b && (c = b.retryLane);
  Zk(a, c);
}
function ck(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Zk(a, c);
}
var Wk;
Wk = function (a, b, c) {
  if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || Wf.current) Ug = !0;else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return Ug = !1, zj(a, b, c);
      Ug = 0 !== (a.flags & 131072) ? !0 : !1;
    }
  } else Ug = !1, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      jj(a, b);
      a = b.pendingProps;
      var e = Yf(b, H.current);
      Tg(b, c);
      e = Xh(null, b, d, a, e, c);
      var f = bi();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Yi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        jj(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = $k(d);
        a = Lg(d, a);
        switch (e) {
          case 0:
            b = dj(null, b, d, a, c);
            break a;
          case 1:
            b = ij(null, b, d, a, c);
            break a;
          case 11:
            b = Zi(null, b, d, a, c);
            break a;
          case 14:
            b = aj(null, b, d, Lg(d.type, a), c);
            break a;
        }
        throw Error(p(306, d, ""));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);
    case 3:
      a: {
        lj(b);
        if (null === a) throw Error(p(387));
        d = b.pendingProps;
        f = b.memoizedState;
        e = f.element;
        bh(a, b);
        gh(b, d, null, c);
        var g = b.memoizedState;
        d = g.element;
        if (f.isDehydrated) {
          if (f = {
            element: d,
            isDehydrated: !1,
            cache: g.cache,
            pendingSuspenseBoundaries: g.pendingSuspenseBoundaries,
            transitions: g.transitions
          }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
            e = Ki(Error(p(423)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ki(Error(p(424)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Ch(b, null, d, c), b.child = c; c;) c.flags = c.flags & -3 | 4096, c = c.sibling;
        } else {
          Ig();
          if (d === e) {
            b = $i(a, b, c);
            break a;
          }
          Yi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), hj(a, b), Yi(a, b, g, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return pj(a, b, c);
    case 4:
      return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);
    case 7:
      return Yi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f = b.memoizedProps;
        g = e.value;
        G(Mg, d._currentValue);
        d._currentValue = g;
        if (null !== f) if (He(f.value, g)) {
          if (f.children === e.children && !Wf.current) {
            b = $i(a, b, c);
            break a;
          }
        } else for (f = b.child, null !== f && (f.return = b); null !== f;) {
          var h = f.dependencies;
          if (null !== h) {
            g = f.child;
            for (var k = h.firstContext; null !== k;) {
              if (k.context === d) {
                if (1 === f.tag) {
                  k = ch(-1, c & -c);
                  k.tag = 2;
                  var l = f.updateQueue;
                  if (null !== l) {
                    l = l.shared;
                    var m = l.pending;
                    null === m ? k.next = k : (k.next = m.next, m.next = k);
                    l.pending = k;
                  }
                }
                f.lanes |= c;
                k = f.alternate;
                null !== k && (k.lanes |= c);
                Sg(f.return, c, b);
                h.lanes |= c;
                break;
              }
              k = k.next;
            }
          } else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {
            g = f.return;
            if (null === g) throw Error(p(341));
            g.lanes |= c;
            h = g.alternate;
            null !== h && (h.lanes |= c);
            Sg(g, c, b);
            g = f.sibling;
          } else g = f.child;
          if (null !== g) g.return = f;else for (g = f; null !== g;) {
            if (g === b) {
              g = null;
              break;
            }
            f = g.sibling;
            if (null !== f) {
              f.return = g.return;
              g = f;
              break;
            }
            g = g.return;
          }
          f = g;
        }
        Yi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);
    case 15:
      return cj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, !0, a, c);
    case 19:
      return yj(a, b, c);
    case 22:
      return ej(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Gk(a, b) {
  return ac(a, b);
}
function al(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new al(a, b, c, d);
}
function bj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function $k(a) {
  if ("function" === typeof a) return bj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da) return 11;
    if (a === Ga) return 14;
  }
  return 2;
}
function wh(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : {
    lanes: b.lanes,
    firstContext: b.firstContext
  };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function yh(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) bj(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case ya:
      return Ah(c.children, e, f, b);
    case za:
      g = 8;
      e |= 8;
      break;
    case Aa:
      return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
    case Ea:
      return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
    case Fa:
      return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
    case Ia:
      return qj(c, e, f, b);
    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case Ba:
          g = 10;
          break a;
        case Ca:
          g = 9;
          break a;
        case Da:
          g = 11;
          break a;
        case Ga:
          g = 14;
          break a;
        case Ha:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p(130, null == a ? a : typeof a, ""));
  }
  b = Bg(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}
function Ah(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function qj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = {
    isHidden: !1
  };
  return a;
}
function xh(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function zh(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}
function bl(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a, b, c, d, e, f, g, h, k) {
  a = new bl(a, b, c, h, k);
  1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;
  f = Bg(3, null, null, b);
  a.current = f;
  f.stateNode = a;
  f.memoizedState = {
    element: d,
    isDehydrated: c,
    cache: null,
    transitions: null,
    pendingSuspenseBoundaries: null
  };
  ah(f);
  return a;
}
function dl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: wa,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}
function el(a) {
  if (!a) return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c)) return bg(a, c, b);
  }
  return b;
}
function fl(a, b, c, d, e, f, g, h, k) {
  a = cl(c, d, !0, a, e, f, g, h, k);
  a.context = el(null);
  c = a.current;
  d = L();
  e = lh(c);
  f = ch(d, e);
  f.callback = void 0 !== b && null !== b ? b : null;
  dh(c, f, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Ek(a, d);
  return a;
}
function gl(a, b, c, d) {
  var e = b.current,
    f = L(),
    g = lh(e);
  c = el(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = ch(f, g);
  b.payload = {
    element: a
  };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = dh(e, b, g);
  null !== a && (mh(a, e, g, f), eh(a, e, g));
  return g;
}
function hl(a) {
  a = a.current;
  if (!a.child) return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function il(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function jl(a, b) {
  il(a, b);
  (a = a.alternate) && il(a, b);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function (a) {
  console.error(a);
};
function ml(a) {
  this._internalRoot = a;
}
nl.prototype.render = ml.prototype.render = function (a) {
  var b = this._internalRoot;
  if (null === b) throw Error(p(409));
  gl(a, b, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function () {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Sk(function () {
      gl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function nl(a) {
  this._internalRoot = a;
}
nl.prototype.unstable_scheduleHydration = function (a) {
  if (a) {
    var b = Hc();
    a = {
      blockedOn: null,
      target: a,
      priority: b
    };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++);
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function pl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function ql() {}
function rl(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f = d;
      d = function () {
        var a = hl(g);
        f.call(a);
      };
    }
    var g = fl(b, d, a, 0, null, !1, !1, "", ql);
    a._reactRootContainer = g;
    a[uf] = g.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Sk();
    return g;
  }
  for (; e = a.lastChild;) a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function () {
      var a = hl(k);
      h.call(a);
    };
  }
  var k = cl(a, 0, !1, null, null, !1, !1, "", ql);
  a._reactRootContainer = k;
  a[uf] = k.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Sk(function () {
    gl(b, k, c, d);
  });
  return k;
}
function sl(a, b, c, d, e) {
  var f = c._reactRootContainer;
  if (f) {
    var g = f;
    if ("function" === typeof e) {
      var h = e;
      e = function () {
        var a = hl(g);
        h.call(a);
      };
    }
    gl(b, g, a, e);
  } else g = rl(c, b, a, e, d);
  return hl(g);
}
Ec = function (a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Ek(b, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
      }
      break;
    case 13:
      Sk(function () {
        var b = Zg(a, 1);
        if (null !== b) {
          var c = L();
          mh(b, a, 1, c);
        }
      }), jl(a, 1);
  }
};
Fc = function (a) {
  if (13 === a.tag) {
    var b = Zg(a, 134217728);
    if (null !== b) {
      var c = L();
      mh(b, a, 134217728, c);
    }
    jl(a, 134217728);
  }
};
Gc = function (a) {
  if (13 === a.tag) {
    var b = lh(a),
      c = Zg(a, b);
    if (null !== c) {
      var d = L();
      mh(c, a, b, d);
    }
    jl(a, b);
  }
};
Hc = function () {
  return C;
};
Ic = function (a, b) {
  var c = C;
  try {
    return C = a, b();
  } finally {
    C = c;
  }
};
yb = function (a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, !1);
  }
};
Gb = Rk;
Hb = Sk;
var tl = {
    usingClientEntryPoint: !1,
    Events: [Cb, ue, Db, Eb, Fb, Rk]
  },
  ul = {
    findFiberByHostInstance: Wc,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom"
  };
var vl = {
  bundleType: ul.bundleType,
  version: ul.version,
  rendererPackageName: ul.rendererPackageName,
  rendererConfig: ul.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setErrorHandler: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ua.ReactCurrentDispatcher,
  findHostInstanceByFiber: function (a) {
    a = Zb(a);
    return null === a ? null : a.stateNode;
  },
  findFiberByHostInstance: ul.findFiberByHostInstance || kl,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null,
  reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber) try {
    kc = wl.inject(vl), lc = wl;
  } catch (a) {}
}
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
exports.createPortal = function (a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b)) throw Error(p(200));
  return dl(a, b, null, c);
};
exports.createRoot = function (a, b) {
  if (!ol(a)) throw Error(p(299));
  var c = !1,
    d = "",
    e = ll;
  null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = cl(a, 1, !1, null, null, c, !1, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ml(b);
};
exports.findDOMNode = function (a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
exports.flushSync = function (a) {
  return Sk(a);
};
exports.hydrate = function (a, b, c) {
  if (!pl(b)) throw Error(p(200));
  return sl(null, a, b, !0, c);
};
exports.hydrateRoot = function (a, b, c) {
  if (!ol(a)) throw Error(p(405));
  var d = null != c && c.hydratedSources || null,
    e = !1,
    f = "",
    g = ll;
  null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
  b = fl(b, null, a, 1, null != c ? c : null, e, !1, f, g);
  a[uf] = b.current;
  sf(a);
  if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c, e);
  return new nl(b);
};
exports.render = function (a, b, c) {
  if (!pl(b)) throw Error(p(200));
  return sl(null, a, b, !1, c);
};
exports.unmountComponentAtNode = function (a) {
  if (!pl(a)) throw Error(p(40));
  return a._reactRootContainer ? (Sk(function () {
    sl(null, null, a, !1, function () {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), !0) : !1;
};
exports.unstable_batchedUpdates = Rk;
exports.unstable_renderSubtreeIntoContainer = function (a, b, c, d) {
  if (!pl(c)) throw Error(p(200));
  if (null == a || void 0 === a._reactInternals) throw Error(p(38));
  return sl(a, b, c, !1, d);
};
exports.version = "18.2.0-next-9e3b772b8-20220608";

/***/ }),

/***/ 250:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var m = __webpack_require__(164);
if (true) {
  exports.s = m.createRoot;
  __webpack_unused_export__ = m.hydrateRoot;
} else { var i; }

/***/ }),

/***/ 164:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}
if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(463);
} else {}

/***/ }),

/***/ 374:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var f = __webpack_require__(791),
  k = Symbol.for("react.element"),
  l = Symbol.for("react.fragment"),
  m = Object.prototype.hasOwnProperty,
  n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  p = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function q(c, a, g) {
  var b,
    d = {},
    e = null,
    h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return {
    $$typeof: k,
    type: c,
    key: e,
    ref: h,
    props: d,
    _owner: n.current
  };
}
exports.Fragment = l;
exports.jsx = q;
exports.jsxs = q;

/***/ }),

/***/ 117:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var l = Symbol.for("react.element"),
  n = Symbol.for("react.portal"),
  p = Symbol.for("react.fragment"),
  q = Symbol.for("react.strict_mode"),
  r = Symbol.for("react.profiler"),
  t = Symbol.for("react.provider"),
  u = Symbol.for("react.context"),
  v = Symbol.for("react.forward_ref"),
  w = Symbol.for("react.suspense"),
  x = Symbol.for("react.memo"),
  y = Symbol.for("react.lazy"),
  z = Symbol.iterator;
function A(a) {
  if (null === a || "object" !== typeof a) return null;
  a = z && a[z] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  },
  C = Object.assign,
  D = {};
function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
E.prototype.isReactComponent = {};
E.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {}
F.prototype = E.prototype;
function G(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D;
  this.updater = e || B;
}
var H = G.prototype = new F();
H.constructor = G;
C(H, E.prototype);
H.isPureReactComponent = !0;
var I = Array.isArray,
  J = Object.prototype.hasOwnProperty,
  K = {
    current: null
  },
  L = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  };
function M(a, b, e) {
  var d,
    c = {},
    k = null,
    h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c.children = e;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
    c.children = f;
  }
  if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
  return {
    $$typeof: l,
    type: a,
    key: k,
    ref: h,
    props: c,
    _owner: K.current
  };
}
function N(a, b) {
  return {
    $$typeof: l,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}
function O(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l;
}
function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}
var P = /\/+/g;
function Q(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R(a, b, e, d, c) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;
    case "object":
      switch (a.$$typeof) {
        case l:
        case n:
          h = !0;
      }
  }
  if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function (a) {
    return a;
  })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = d + Q(k, g);
    h += R(k, b, e, f, c);
  } else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S(a, b, e) {
  if (null == a) return a;
  var d = [],
    c = 0;
  R(a, d, "", "", function (a) {
    return b.call(e, a, c++);
  });
  return d;
}
function T(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function (b) {
      if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;
    }, function (b) {
      if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status) return a._result.default;
  throw a._result;
}
var U = {
    current: null
  },
  V = {
    transition: null
  },
  W = {
    ReactCurrentDispatcher: U,
    ReactCurrentBatchConfig: V,
    ReactCurrentOwner: K
  };
exports.Children = {
  map: S,
  forEach: function (a, b, e) {
    S(a, function () {
      b.apply(this, arguments);
    }, e);
  },
  count: function (a) {
    var b = 0;
    S(a, function () {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return S(a, function (a) {
      return a;
    }) || [];
  },
  only: function (a) {
    if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
    return a;
  }
};
exports.Component = E;
exports.Fragment = p;
exports.Profiler = r;
exports.PureComponent = G;
exports.StrictMode = q;
exports.Suspense = w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
exports.cloneElement = function (a, b, e) {
  if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C({}, a.props),
    c = a.key,
    k = a.ref,
    h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = K.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
    for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    g = Array(f);
    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
    d.children = g;
  }
  return {
    $$typeof: l,
    type: a.type,
    key: c,
    ref: k,
    props: d,
    _owner: h
  };
};
exports.createContext = function (a) {
  a = {
    $$typeof: u,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null,
    _defaultValue: null,
    _globalName: null
  };
  a.Provider = {
    $$typeof: t,
    _context: a
  };
  return a.Consumer = a;
};
exports.createElement = M;
exports.createFactory = function (a) {
  var b = M.bind(null, a);
  b.type = a;
  return b;
};
exports.createRef = function () {
  return {
    current: null
  };
};
exports.forwardRef = function (a) {
  return {
    $$typeof: v,
    render: a
  };
};
exports.isValidElement = O;
exports.lazy = function (a) {
  return {
    $$typeof: y,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: T
  };
};
exports.memo = function (a, b) {
  return {
    $$typeof: x,
    type: a,
    compare: void 0 === b ? null : b
  };
};
exports.startTransition = function (a) {
  var b = V.transition;
  V.transition = {};
  try {
    a();
  } finally {
    V.transition = b;
  }
};
exports.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
exports.useCallback = function (a, b) {
  return U.current.useCallback(a, b);
};
exports.useContext = function (a) {
  return U.current.useContext(a);
};
exports.useDebugValue = function () {};
exports.useDeferredValue = function (a) {
  return U.current.useDeferredValue(a);
};
exports.useEffect = function (a, b) {
  return U.current.useEffect(a, b);
};
exports.useId = function () {
  return U.current.useId();
};
exports.useImperativeHandle = function (a, b, e) {
  return U.current.useImperativeHandle(a, b, e);
};
exports.useInsertionEffect = function (a, b) {
  return U.current.useInsertionEffect(a, b);
};
exports.useLayoutEffect = function (a, b) {
  return U.current.useLayoutEffect(a, b);
};
exports.useMemo = function (a, b) {
  return U.current.useMemo(a, b);
};
exports.useReducer = function (a, b, e) {
  return U.current.useReducer(a, b, e);
};
exports.useRef = function (a) {
  return U.current.useRef(a);
};
exports.useState = function (a) {
  return U.current.useState(a);
};
exports.useSyncExternalStore = function (a, b, e) {
  return U.current.useSyncExternalStore(a, b, e);
};
exports.useTransition = function () {
  return U.current.useTransition();
};
exports.version = "18.2.0";

/***/ }),

/***/ 791:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(117);
} else {}

/***/ }),

/***/ 184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(374);
} else {}

/***/ }),

/***/ 813:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function f(a, b) {
  var c = a.length;
  a.push(b);
  a: for (; 0 < c;) {
    var d = c - 1 >>> 1,
      e = a[d];
    if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}
function h(a) {
  return 0 === a.length ? null : a[0];
}
function k(a) {
  if (0 === a.length) return null;
  var b = a[0],
    c = a.pop();
  if (c !== b) {
    a[0] = c;
    a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {
      var m = 2 * (d + 1) - 1,
        C = a[m],
        n = m + 1,
        x = a[n];
      if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;else break a;
    }
  }
  return b;
}
function g(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}
if ("object" === typeof performance && "function" === typeof performance.now) {
  var l = performance;
  exports.unstable_now = function () {
    return l.now();
  };
} else {
  var p = Date,
    q = p.now();
  exports.unstable_now = function () {
    return p.now() - q;
  };
}
var r = [],
  t = [],
  u = 1,
  v = null,
  y = 3,
  z = !1,
  A = !1,
  B = !1,
  D = "function" === typeof setTimeout ? setTimeout : null,
  E = "function" === typeof clearTimeout ? clearTimeout : null,
  F = "undefined" !== typeof setImmediate ? setImmediate : null;
"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
function G(a) {
  for (var b = h(t); null !== b;) {
    if (null === b.callback) k(t);else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);else break;
    b = h(t);
  }
}
function H(a) {
  B = !1;
  G(a);
  if (!A) if (null !== h(r)) A = !0, I(J);else {
    var b = h(t);
    null !== b && K(H, b.startTime - a);
  }
}
function J(a, b) {
  A = !1;
  B && (B = !1, E(L), L = -1);
  z = !0;
  var c = y;
  try {
    G(b);
    for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {
      var d = v.callback;
      if ("function" === typeof d) {
        v.callback = null;
        y = v.priorityLevel;
        var e = d(v.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? v.callback = e : v === h(r) && k(r);
        G(b);
      } else k(r);
      v = h(r);
    }
    if (null !== v) var w = !0;else {
      var m = h(t);
      null !== m && K(H, m.startTime - b);
      w = !1;
    }
    return w;
  } finally {
    v = null, y = c, z = !1;
  }
}
var N = !1,
  O = null,
  L = -1,
  P = 5,
  Q = -1;
function M() {
  return exports.unstable_now() - Q < P ? !1 : !0;
}
function R() {
  if (null !== O) {
    var a = exports.unstable_now();
    Q = a;
    var b = !0;
    try {
      b = O(!0, a);
    } finally {
      b ? S() : (N = !1, O = null);
    }
  } else N = !1;
}
var S;
if ("function" === typeof F) S = function () {
  F(R);
};else if ("undefined" !== typeof MessageChannel) {
  var T = new MessageChannel(),
    U = T.port2;
  T.port1.onmessage = R;
  S = function () {
    U.postMessage(null);
  };
} else S = function () {
  D(R, 0);
};
function I(a) {
  O = a;
  N || (N = !0, S());
}
function K(a, b) {
  L = D(function () {
    a(exports.unstable_now());
  }, b);
}
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;
exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};
exports.unstable_continueExecution = function () {
  A || z || (A = !0, I(J));
};
exports.unstable_forceFrameRate = function (a) {
  0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1E3 / a) : 5;
};
exports.unstable_getCurrentPriorityLevel = function () {
  return y;
};
exports.unstable_getFirstCallbackNode = function () {
  return h(r);
};
exports.unstable_next = function (a) {
  switch (y) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;
    default:
      b = y;
  }
  var c = y;
  y = b;
  try {
    return a();
  } finally {
    y = c;
  }
};
exports.unstable_pauseExecution = function () {};
exports.unstable_requestPaint = function () {};
exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      a = 3;
  }
  var c = y;
  y = a;
  try {
    return b();
  } finally {
    y = c;
  }
};
exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();
  "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
  switch (a) {
    case 1:
      var e = -1;
      break;
    case 2:
      e = 250;
      break;
    case 5:
      e = 1073741823;
      break;
    case 4:
      e = 1E4;
      break;
    default:
      e = 5E3;
  }
  e = c + e;
  a = {
    id: u++,
    callback: b,
    priorityLevel: a,
    startTime: c,
    expirationTime: e,
    sortIndex: -1
  };
  c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));
  return a;
};
exports.unstable_shouldYield = M;
exports.unstable_wrapCallback = function (a) {
  var b = y;
  return function () {
    var c = y;
    y = b;
    try {
      return a.apply(this, arguments);
    } finally {
      y = c;
    }
  };
};

/***/ }),

/***/ 296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(813);
} else {}

/***/ }),

/***/ 880:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 71:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.AutoTravellerPanel_panel__DtOqy{box-sizing:border-box;position:absolute;z-index:999;box-shadow:0 0 8px 0 rgba(0,0,0,.18);background-color:#fff;border-radius:8px;height:187px;width:293px;right:1%;top:24%;pointer-events:auto !important;cursor:auto !important}header.AutoTravellerPanel_header__osn5h{background-color:#5f7280;padding:11px 16px;border-top-left-radius:8px;border-top-right-radius:8px}header.AutoTravellerPanel_header__osn5h h2.AutoTravellerPanel_title__cVO6T{font-size:16px;color:#fff}form.AutoTravellerPanel_form__gI6H1{padding:16px;display:block}label.AutoTravellerPanel_label__ZGCJT{display:flex;justify-content:space-between;align-items:center;font-size:13px;margin-bottom:8px}input.AutoTravellerPanel_input__GGC1x{width:100px;text-align:center}input.AutoTravellerPanel_input__GGC1x.AutoTravellerPanel_inputError__Lxr4s{border:1px solid red}section.AutoTravellerPanel_actionBar__TCdbo{display:flex;justify-content:flex-end;column-gap:8px}[data-tooltip]{position:relative}[data-tooltip]::after{position:absolute;opacity:1;pointer-events:none;content:attr(data-tooltip);right:0;top:calc(100% + 5px);border-radius:3px;box-shadow:0 0 5px 2px rgba(100,100,100,.6);background-color:#fff;z-index:10;padding:8px;transition:all 150ms cubic-bezier(0.25, 0.8, 0.25, 1);transition-duration:300ms}`, "",{"version":3,"sources":["webpack://./src/features/an-amazing-journey/components/AutoTravellerPanel.module.scss"],"names":[],"mappings":"AAAA,iCACI,qBAAA,CACA,iBAAA,CACA,WAAA,CACA,oCAAA,CACA,qBAAA,CACA,iBAAA,CACA,YAAA,CACA,WAAA,CACA,QAAA,CACA,OAAA,CACA,8BAAA,CACA,sBAAA,CAGJ,wCACI,wBAAA,CACA,iBAAA,CACA,0BAAA,CACA,2BAAA,CAEA,2EACI,cAAA,CACA,UAAA,CAIR,oCACI,YAAA,CACA,aAAA,CAGJ,sCACI,YAAA,CACA,6BAAA,CACA,kBAAA,CACA,cAAA,CACA,iBAAA,CAGJ,sCACI,WAAA,CACA,iBAAA,CAEA,2EACI,oBAAA,CAWR,4CACI,YAAA,CACA,wBAAA,CACA,cAAA,CAOJ,eACI,iBAAA,CAGJ,sBACI,iBAAA,CACA,SAAA,CACA,mBAAA,CACA,0BAAA,CACA,OAAA,CACA,oBAAA,CACA,iBAAA,CACA,2CAAA,CACA,qBAAA,CACA,UAAA,CACA,WAAA,CACA,qDAAA,CAEA,yBAAA","sourcesContent":[".panel {\n    box-sizing: border-box;\n    position: absolute;\n    z-index: 999;\n    box-shadow: 0 0 8px 0 rgba(0,0,0,.18);\n    background-color: #fff;\n    border-radius: 8px;\n    height: 187px;\n    width: 293px;\n    right: 1%;\n    top: 24%;\n    pointer-events: auto !important;\n    cursor: auto !important;\n}\n\nheader.header {\n    background-color: #5f7280;\n    padding: 11px 16px;\n    border-top-left-radius: 8px;\n    border-top-right-radius: 8px;\n\n    h2.title {\n        font-size: 16px;\n        color: #fff;\n    }\n}\n\nform.form {\n    padding: 16px;\n    display: block;\n}\n\nlabel.label {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    font-size: 13px;\n    margin-bottom: 8px;\n}\n\ninput.input {\n    width: 100px;\n    text-align: center;\n\n    &.inputError {\n        border: 1px solid red;\n    }\n}\n\nselect.select {\n}\n\ninput.checkbox{\n\n}\n\nsection.actionBar {\n    display: flex;\n    justify-content: flex-end;\n    column-gap: 8px;\n\n    button.start {\n    }\n\n}\n\n[data-tooltip] {\n    position: relative;\n}\n\n[data-tooltip]::after {\n    position: absolute;\n    opacity: 1;\n    pointer-events: none;\n    content: attr(data-tooltip);\n    right: 0;\n    top: calc(100% + 5px);\n    border-radius: 3px;\n    box-shadow: 0 0 5px 2px rgba(100, 100, 100, 0.6);\n    background-color: #fff;\n    z-index: 10;\n    padding: 8px;\n    transition: all 150ms cubic-bezier(.25, .8, .25, 1);\n\n    transition-duration: 300ms;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"panel": `AutoTravellerPanel_panel__DtOqy`,
	"header": `AutoTravellerPanel_header__osn5h`,
	"title": `AutoTravellerPanel_title__cVO6T`,
	"form": `AutoTravellerPanel_form__gI6H1`,
	"label": `AutoTravellerPanel_label__ZGCJT`,
	"input": `AutoTravellerPanel_input__GGC1x`,
	"inputError": `AutoTravellerPanel_inputError__Lxr4s`,
	"actionBar": `AutoTravellerPanel_actionBar__TCdbo`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 103:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `section.CollapseButtonPanel_panel__-DTdI{border-radius:8px;background-color:#fff;position:absolute;z-index:1000;top:25.1%;right:2%;transition:all .2s ease-in-out}section.CollapseButtonPanel_panel__-DTdI.CollapseButtonPanel_isCollapsed__i22Jz{box-shadow:0 0 8px 0 rgba(0,0,0,.18)}button.CollapseButtonPanel_button__pC1GN{box-sizing:border-box;width:32px;height:32px;border:none;background:none;padding:4px;cursor:pointer;transition:all .2s ease-in-out}button.CollapseButtonPanel_button__pC1GN.CollapseButtonPanel_isCollapsed__i22Jz{transform:rotate3d(0, 1, 0, 180deg)}`, "",{"version":3,"sources":["webpack://./src/features/an-amazing-journey/components/CollapseButtonPanel.module.scss"],"names":[],"mappings":"AAAA,yCACE,iBAAA,CACA,qBAAA,CACA,iBAAA,CACA,YAAA,CACA,SAAA,CACA,QAAA,CAEA,8BAAA,CAEA,gFACE,oCAAA,CAIJ,yCACE,qBAAA,CACA,UAAA,CACA,WAAA,CAGA,WAAA,CACA,eAAA,CACA,WAAA,CACA,cAAA,CAEA,8BAAA,CAGA,gFAEE,mCAAA","sourcesContent":["section.panel {\n  border-radius: 8px;\n  background-color: #fff;\n  position: absolute;\n  z-index: 1000;\n  top: 25.1%;\n  right: 2%;\n\n  transition: all 0.2s ease-in-out;\n\n  &.isCollapsed {\n    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.18);\n  }\n}\n\nbutton.button {\n  box-sizing: border-box;\n  width: 32px;\n  height: 32px;\n\n  //reset button styles\n  border: none;\n  background: none;\n  padding: 4px;\n  cursor: pointer;\n\n  transition: all 0.2s ease-in-out;\n\n\n  &.isCollapsed {\n    // rotate 3d 180deg\n    transform: rotate3d(0, 1, 0, 180deg);\n    //transform: rotate(-180deg);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"panel": `CollapseButtonPanel_panel__-DTdI`,
	"isCollapsed": `CollapseButtonPanel_isCollapsed__i22Jz`,
	"button": `CollapseButtonPanel_button__pC1GN`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 978:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `section.ErrorPanel_panel__FZdQT{box-sizing:border-box;position:absolute;z-index:10001;box-shadow:0 0 8px 0 rgba(0,0,0,.18);background-color:#812b2b;border-radius:8px;width:293px;right:1%;top:58%;pointer-events:auto !important;cursor:auto !important;color:#fff;padding:8px 16px}.ErrorPanel_errors__GR7ne{display:flex;flex-direction:column;gap:4px;max-height:200px;overflow:auto}.ErrorPanel_errors__GR7ne p.ErrorPanel_error__XQ3p0{font-size:13px}.ErrorPanel_errors__GR7ne p.ErrorPanel_error__XQ3p0:first-of-type{padding-right:16px}.ErrorPanel_errors__GR7ne p.ErrorPanel_error__XQ3p0:not(:last-of-type){border-bottom:1px solid rgba(255,255,255,.2)}button.ErrorPanel_close__7Jwbw{background:none;border:none;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;position:absolute;top:0;right:0;width:32px;height:32px;transition:background-color .2s ease-in-out;border-bottom-left-radius:8px}button.ErrorPanel_close__7Jwbw:hover{background-color:rgba(255,255,255,.2)}`, "",{"version":3,"sources":["webpack://./src/features/an-amazing-journey/components/ErrorPanel.module.scss"],"names":[],"mappings":"AAAA,gCACE,qBAAA,CACA,iBAAA,CACA,aAAA,CACA,oCAAA,CACA,wBAAA,CACA,iBAAA,CACA,WAAA,CACA,QAAA,CACA,OAAA,CACA,8BAAA,CACA,sBAAA,CACA,UAAA,CACA,gBAAA,CAGF,0BACE,YAAA,CACA,qBAAA,CACA,OAAA,CAEA,gBAAA,CACA,aAAA,CAEA,oDACE,cAAA,CAEA,kEACE,kBAAA,CAGF,uEACE,4CAAA,CAKN,+BACE,eAAA,CACA,WAAA,CACA,SAAA,CACA,YAAA,CACA,kBAAA,CACA,sBAAA,CACA,cAAA,CACA,UAAA,CACA,iBAAA,CACA,KAAA,CACA,OAAA,CACA,UAAA,CACA,WAAA,CAEA,2CAAA,CACA,6BAAA,CAEA,qCACE,qCAAA","sourcesContent":["section.panel {\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 10001;\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.18);\n  background-color: #812b2b;\n  border-radius: 8px;\n  width: 293px;\n  right: 1%;\n  top: 58%;\n  pointer-events: auto !important;\n  cursor: auto !important;\n  color: #fff;\n  padding: 8px 16px;\n}\n\n.errors {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n\n  max-height: 200px;\n  overflow: auto;\n\n  p.error {\n    font-size: 13px;\n\n    &:first-of-type {\n      padding-right: 16px;\n    }\n\n    &:not(:last-of-type) {\n      border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n    }\n  }\n}\n\nbutton.close {\n  background: none;\n  border: none;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  color: #fff;\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 32px;\n  height: 32px;\n\n  transition: background-color 0.2s ease-in-out;\n  border-bottom-left-radius: 8px;\n\n  &:hover {\n    background-color: rgba(255, 255, 255, 0.2);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"panel": `ErrorPanel_panel__FZdQT`,
	"errors": `ErrorPanel_errors__GR7ne`,
	"error": `ErrorPanel_error__XQ3p0`,
	"close": `ErrorPanel_close__7Jwbw`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 990:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.StatusIndicator_statusIndicator__EYsLz{display:flex}.StatusIndicator_inProgress__ylTkU{color:#cbdae8}.StatusIndicator_inProgress__ylTkU .StatusIndicator_spinner__ut7ky{transform-origin:center;animation:StatusIndicator_spinner__ut7ky .75s infinite linear}@keyframes StatusIndicator_spinner__ut7ky{100%{transform:rotate(360deg)}}.StatusIndicator_error__F1dwS{color:#ff6767;animation:StatusIndicator_pulsate__u3JCS 1.4s ease-out;animation-iteration-count:infinite}@keyframes StatusIndicator_pulsate__u3JCS{0%{transform:scale(1, 1)}50%{transform:scale(1.4, 1.4)}100%{transform:scale(1, 1)}}.StatusIndicator_completed__36OU9{color:#62df7a}`, "",{"version":3,"sources":["webpack://./src/features/an-amazing-journey/components/StatusIndicator.module.scss"],"names":[],"mappings":"AAAA,wCACI,YAAA,CAGJ,mCACI,aAAA,CAEA,mEACI,uBAAA,CACA,6DAAA,CAGJ,0CACI,KACI,wBAAA,CAAA,CAKZ,8BACI,aAAA,CACA,sDAAA,CACA,kCAAA,CAEA,0CACI,GACI,qBAAA,CAEJ,IACI,yBAAA,CAEJ,KACI,qBAAA,CAAA,CAKZ,kCACI,aAAA","sourcesContent":[".statusIndicator {\n    display: flex;\n}\n\n.inProgress {\n    color: #cbdae8;\n\n    .spinner {\n        transform-origin: center;\n        animation: spinner .75s infinite linear;\n    }\n\n    @keyframes spinner {\n        100% {\n            transform: rotate(360deg)\n        }\n    }\n}\n\n.error {\n    color: #ff6767;\n    animation: pulsate 1.4s ease-out;\n    animation-iteration-count: infinite;\n\n    @keyframes pulsate {\n        0% {\n            transform: scale(1,1);\n        }\n        50% {\n            transform: scale(1.4, 1.4);\n        }\n        100% {\n            transform: scale(1, 1);\n        }\n    }\n}\n\n.completed {\n    color: #62df7a;\n}\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"statusIndicator": `StatusIndicator_statusIndicator__EYsLz`,
	"inProgress": `StatusIndicator_inProgress__ylTkU`,
	"spinner": `StatusIndicator_spinner__ut7ky`,
	"error": `StatusIndicator_error__F1dwS`,
	"pulsate": `StatusIndicator_pulsate__u3JCS`,
	"completed": `StatusIndicator_completed__36OU9`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 493:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(657);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(176);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `section.TravelProgressPanel_panel__McE4q{box-sizing:border-box;position:absolute;z-index:999;box-shadow:0 0 8px 0 rgba(0,0,0,.18);background-color:#fff;border-radius:8px;height:110px;width:189px;right:11.9%;top:58%;pointer-events:auto !important;cursor:auto !important}header.TravelProgressPanel_header__hwZeU{background-color:#5f7280;border-top-left-radius:8px;border-top-right-radius:8px;display:flex;justify-content:space-between;align-items:center;padding-right:8px}header.TravelProgressPanel_header__hwZeU h2.TravelProgressPanel_title__RHoV9{flex:1 1;padding:8px 16px;color:#fff;font-size:14px;font-weight:500}.TravelProgressPanel_rows__I8BES{padding:8px 16px}.TravelProgressPanel_rows__I8BES .TravelProgressPanel_row__fJduM{display:flex;justify-content:space-between}.TravelProgressPanel_rows__I8BES .TravelProgressPanel_row__fJduM .TravelProgressPanel_key__N1yGr{font-size:12px}.TravelProgressPanel_rows__I8BES .TravelProgressPanel_row__fJduM .TravelProgressPanel_value__z3\\+ro{font-size:13px;font-weight:600}`, "",{"version":3,"sources":["webpack://./src/features/an-amazing-journey/components/TravelProgressPanel.module.scss"],"names":[],"mappings":"AAAA,yCACE,qBAAA,CACA,iBAAA,CACA,WAAA,CACA,oCAAA,CACA,qBAAA,CACA,iBAAA,CACA,YAAA,CACA,WAAA,CACA,WAAA,CACA,OAAA,CACA,8BAAA,CACA,sBAAA,CAGF,yCACE,wBAAA,CACA,0BAAA,CACA,2BAAA,CACA,YAAA,CACA,6BAAA,CACA,kBAAA,CACA,iBAAA,CAEA,6EACE,QAAA,CACA,gBAAA,CACA,UAAA,CACA,cAAA,CACA,eAAA,CAIJ,iCACE,gBAAA,CAEA,iEACE,YAAA,CACA,6BAAA,CAEA,iGACE,cAAA,CAGF,oGACE,cAAA,CACA,eAAA","sourcesContent":["section.panel {\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 999;\n  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.18);\n  background-color: #fff;\n  border-radius: 8px;\n  height: 110px;\n  width: 189px;\n  right: 11.9%;\n  top: 58%;\n  pointer-events: auto !important;\n  cursor: auto !important;\n}\n\nheader.header {\n  background-color: #5f7280;\n  border-top-left-radius: 8px;\n  border-top-right-radius: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding-right: 8px;\n\n  h2.title {\n    flex: 1;\n    padding: 8px 16px;\n    color: #fff;\n    font-size: 14px;\n    font-weight: 500;\n  }\n}\n\n.rows {\n  padding: 8px 16px;\n\n  .row {\n    display: flex;\n    justify-content: space-between;\n\n    .key {\n      font-size: 12px;\n    }\n\n    .value {\n      font-size: 13px;\n      font-weight: 600;\n    }\n  }\n}\n\n"],"sourceRoot":""}]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"panel": `TravelProgressPanel_panel__McE4q`,
	"header": `TravelProgressPanel_header__hwZeU`,
	"title": `TravelProgressPanel_title__RHoV9`,
	"rows": `TravelProgressPanel_rows__I8BES`,
	"row": `TravelProgressPanel_row__fJduM`,
	"key": `TravelProgressPanel_key__N1yGr`,
	"value": `TravelProgressPanel_value__z3+ro`
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 701:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 80:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 182:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 236:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 213:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(701);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(236);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(80);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(850);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(182);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(213);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[5].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[5].use[2]!./node_modules/source-map-loader/dist/cjs.js!./src/index.css
var cjs_js_src = __webpack_require__(880);
;// CONCATENATED MODULE: ./src/index.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(cjs_js_src/* default */.Z, options);




       /* harmony default export */ const src = (cjs_js_src/* default */.Z && cjs_js_src/* default */.Z.locals ? cjs_js_src/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/utils/utils.ts
const APP_NAME="Stuff Unlocked";/**
 * Wrapped console.log function.
 *
 * @export
 * @param {*} args
 */function log(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}console.log("%c".concat(APP_NAME,":"),"color: purple; font-weight: bold",...args);}function error(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++){args[_key2]=arguments[_key2];}console.log("%c".concat(APP_NAME," [ERROR]:"),"color: red; font-weight: bold; border-bottom: 1px solid red;",...args);}/**
 * Ensure `callback` is called every time window.location changes
 * Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
 *
 * @export
 * @param {function} callback - function to be called when URL changes
 * @returns {MutationObserver} - MutationObserver that watches the URL
 */function addLocationChangeCallback(callback){// Run the callback once right at the start
window.setTimeout(callback,0);// Set up a `MutationObserver` to watch for changes in the URL
let oldHref=window.location.href;const body=document.querySelector("body");const observer=new MutationObserver(mutations=>{if(mutations.some(()=>oldHref!==document.location.href)){oldHref=document.location.href;callback();}});observer.observe(body,{childList:true,subtree:true});return observer;}/**
 * Awaits for an element with the specified `selector` to be found
 * and then returns the selected dom node.
 * This is used to delay rendering a widget until its parent appears.
 */async function awaitElement(selector){const MAX_TRIES=60;let tries=0;return new Promise((resolve,reject)=>{function probe(){tries++;return document.querySelector(selector);}function delayedProbe(){if(tries>=MAX_TRIES){log("Can't find element with selector",selector);reject();return;}const elm=probe();if(elm){resolve(elm);return;}window.setTimeout(delayedProbe,250);}delayedProbe();});}
// EXTERNAL MODULE: ./src/old-index.user.js
var old_index_user = __webpack_require__(680);
;// CONCATENATED MODULE: ./src/utils/feature.ts
function createFeature(feature){return{...feature,execute:async()=>applyExecuteTimeSpent(feature.name,feature.execute)};}const applyExecuteTimeSpent=async(name,callback)=>{const start=Date.now();await callback();const end=Date.now();log("Time spent executing ".concat(name,": ").concat(end-start,"ms"));};
;// CONCATENATED MODULE: ./src/utils/erep-global-info.ts
function getCitizenshipCurrencyName(){return erepublik.citizen.citizenshipCurrencyName;}function getCurrentRegionId(){return String(erepublik.citizen.residence.regionId);}function getAuthToken(){return erepublik.settings.pomelo.authToken;}function getCsrfToken(){return SERVER_DATA.csrfToken;}
;// CONCATENATED MODULE: ./src/utils/request.ts
function getCookieHeaders(){return{cookie:"erpk=".concat(getAuthToken())};}function objectToWwwFormUrlEncoded(obj){const searchParams=new URLSearchParams();Object.keys(obj).forEach(key=>{searchParams.append(key,obj[key]);});return searchParams.toString();}
;// CONCATENATED MODULE: ./src/requests/travel-data-request.ts
let TravelData;(function(_TravelData){async function sendRequest(body){const response=fetch("https://www.erepublik.com/en/main/travelData",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded",...getCookieHeaders()},body:objectToWwwFormUrlEncoded(body)});return response.then(response=>response.json());}_TravelData.sendRequest=sendRequest;let ZoneName=/*#__PURE__*/function(ZoneName){ZoneName["A1"]="A1";ZoneName["A2"]="A2";ZoneName["A3"]="A3";ZoneName["A4"]="A4";ZoneName["A5"]="A5";ZoneName["B1"]="B1";ZoneName["B3"]="B3";ZoneName["B4"]="B4";ZoneName["B5"]="B5";ZoneName["C1"]="C1";ZoneName["C2"]="C2";ZoneName["C3"]="C3";ZoneName["C4"]="C4";ZoneName["C5"]="C5";ZoneName["D2"]="D2";ZoneName["D3"]="D3";ZoneName["D5"]="D5";return ZoneName;}({});_TravelData.ZoneName=ZoneName;})(TravelData||(TravelData={}));
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/countries-cache.ts
class CountriesCache{constructor(){this.countries=void 0;this.currentRegionId=void 0;}async getCountries(){if(!this.countries){await this.fetchCountries();}return this.countries;}async getCurrentRegionId(){let flags=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{skipCache:false};if(flags.skipCache||!this.currentRegionId){await this.fetchCountries();}return this.currentRegionId;}updateCurrentRegionId(regionId){this.currentRegionId=regionId;}async fetchCountries(){const response=await TravelData.sendRequest({battleId:"0",_token:await getCsrfToken(),regionId:"0",holdingId:"0"});this.updateCurrentRegionId(String(response.citizen.region.id));this.countries=response.countries;}}
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(791);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[2]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[8].use[3]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[4]!./src/features/an-amazing-journey/components/AutoTravellerPanel.module.scss
var AutoTravellerPanel_module = __webpack_require__(71);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/AutoTravellerPanel.module.scss

      
      
      
      
      
      
      
      
      

var AutoTravellerPanel_module_options = {};

AutoTravellerPanel_module_options.styleTagTransform = (styleTagTransform_default());
AutoTravellerPanel_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      AutoTravellerPanel_module_options.insert = insertBySelector_default().bind(null, "head");
    
AutoTravellerPanel_module_options.domAPI = (styleDomAPI_default());
AutoTravellerPanel_module_options.insertStyleElement = (insertStyleElement_default());

var AutoTravellerPanel_module_update = injectStylesIntoStyleTag_default()(AutoTravellerPanel_module/* default */.Z, AutoTravellerPanel_module_options);




       /* harmony default export */ const components_AutoTravellerPanel_module = (AutoTravellerPanel_module/* default */.Z && AutoTravellerPanel_module/* default */.Z.locals ? AutoTravellerPanel_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs

var isCheckBoxInput = element => element.type === 'checkbox';
var isDateObject = value => value instanceof Date;
var isNullOrUndefined = value => value == null;
const isObjectType = value => typeof value === 'object';
var isObject = value => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = event => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var getNodeParentName = name => name.substring(0, name.search(/\.\d+(\.|$)/)) || name;
var isNameInFieldArray = (names, name) => names.has(getNodeParentName(name));
var isPlainObject = tempObject => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf');
};
var isWeb = typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined' && typeof document !== 'undefined';
function cloneObject(data) {
  let copy;
  const isArray = Array.isArray(data);
  if (data instanceof Date) {
    copy = new Date(data);
  } else if (data instanceof Set) {
    copy = new Set(data);
  } else if (!(isWeb && (data instanceof Blob || data instanceof FileList)) && (isArray || isObject(data))) {
    copy = isArray ? [] : {};
    if (!isArray && !isPlainObject(data)) {
      copy = data;
    } else {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          copy[key] = cloneObject(data[key]);
        }
      }
    }
  } else {
    return data;
  }
  return copy;
}
var compact = value => Array.isArray(value) ? value.filter(Boolean) : [];
var isUndefined = val => val === undefined;
var get = (obj, path, defaultValue) => {
  if (!path || !isObject(obj)) {
    return defaultValue;
  }
  const result = compact(path.split(/[,[\].]+?/)).reduce((result, key) => isNullOrUndefined(result) ? result : result[key], obj);
  return isUndefined(result) || result === obj ? isUndefined(obj[path]) ? defaultValue : obj[path] : result;
};
var isBoolean = value => typeof value === 'boolean';
const EVENTS = {
  BLUR: 'blur',
  FOCUS_OUT: 'focusout',
  CHANGE: 'change'
};
const VALIDATION_MODE = {
  onBlur: 'onBlur',
  onChange: 'onChange',
  onSubmit: 'onSubmit',
  onTouched: 'onTouched',
  all: 'all'
};
const INPUT_VALIDATION_RULES = {
  max: 'max',
  min: 'min',
  maxLength: 'maxLength',
  minLength: 'minLength',
  pattern: 'pattern',
  required: 'required',
  validate: 'validate'
};
const HookFormContext = react.createContext(null);
/**
 * This custom hook allows you to access the form context. useFormContext is intended to be used in deeply nested structures, where it would become inconvenient to pass the context as a prop. To be used with {@link FormProvider}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @returns return all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const useFormContext = () => React.useContext(HookFormContext);
/**
 * A provider component that propagates the `useForm` methods to all children components via [React Context](https://reactjs.org/docs/context.html) API. To be used with {@link useFormContext}.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformcontext) • [Demo](https://codesandbox.io/s/react-hook-form-v7-form-context-ytudi)
 *
 * @param props - all useForm methods
 *
 * @example
 * ```tsx
 * function App() {
 *   const methods = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   return (
 *     <FormProvider {...methods} >
 *       <form onSubmit={methods.handleSubmit(onSubmit)}>
 *         <NestedInput />
 *         <input type="submit" />
 *       </form>
 *     </FormProvider>
 *   );
 * }
 *
 *  function NestedInput() {
 *   const { register } = useFormContext(); // retrieve all hook methods
 *   return <input {...register("test")} />;
 * }
 * ```
 */
const FormProvider = props => {
  const {
    children,
    ...data
  } = props;
  return React.createElement(HookFormContext.Provider, {
    value: data
  }, children);
};
var getProxyFormState = function (formState, control, localProxyFormState) {
  let isRoot = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const result = {
    defaultValues: control._defaultValues
  };
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        localProxyFormState && (localProxyFormState[_key] = true);
        return formState[_key];
      }
    });
  }
  return result;
};
var isEmptyObject = value => isObject(value) && !Object.keys(value).length;
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const {
    name,
    ...formState
  } = formStateData;
  return isEmptyObject(formState) || Object.keys(formState).length >= Object.keys(_proxyFormState).length || Object.keys(formState).find(key => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var convertToArrayPayload = value => Array.isArray(value) ? value : [value];
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some(currentName => currentName && (exact ? currentName === signalName : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
function useSubscribe(props) {
  const _props = react.useRef(props);
  _props.current = props;
  react.useEffect(() => {
    const subscription = !props.disabled && _props.current.subject && _props.current.subject.subscribe({
      next: _props.current.next
    });
    return () => {
      subscription && subscription.unsubscribe();
    };
  }, [props.disabled]);
}

/**
 * This custom hook allows you to subscribe to each form state, and isolate the re-render at the custom hook level. It has its scope in terms of form state subscription, so it would not affect other useFormState and useForm. Using this hook can reduce the re-render impact on large and complex form application.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useformstate) • [Demo](https://codesandbox.io/s/useformstate-75xly)
 *
 * @param props - include options on specify fields to subscribe. {@link UseFormStateReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, control } = useForm({
 *     defaultValues: {
 *     firstName: "firstName"
 *   }});
 *   const { dirtyFields } = useFormState({
 *     control
 *   });
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("firstName")} placeholder="First Name" />
 *       {dirtyFields.firstName && <p>Field is dirty.</p>}
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFormState(props) {
  const methods = useFormContext();
  const {
    control = methods.control,
    disabled,
    name,
    exact
  } = props || {};
  const [formState, updateFormState] = React.useState(control._formState);
  const _mounted = React.useRef(true);
  const _localProxyFormState = React.useRef({
    isDirty: false,
    isLoading: false,
    dirtyFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  });
  const _name = React.useRef(name);
  _name.current = name;
  useSubscribe({
    disabled,
    next: value => _mounted.current && shouldSubscribeByName(_name.current, value.name, exact) && shouldRenderFormState(value, _localProxyFormState.current, control._updateFormState) && updateFormState({
      ...control._formState,
      ...value
    }),
    subject: control._subjects.state
  });
  React.useEffect(() => {
    _mounted.current = true;
    _localProxyFormState.current.isValid && control._updateValid(true);
    return () => {
      _mounted.current = false;
    };
  }, [control]);
  return getProxyFormState(formState, control, _localProxyFormState.current, false);
}
var isString = value => typeof value === 'string';
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map(fieldName => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};

/**
 * Custom hook to subscribe to field change and isolate re-rendering at the component level.
 *
 * @remarks
 *
 * [API](https://react-hook-form.com/docs/usewatch) • [Demo](https://codesandbox.io/s/react-hook-form-v7-ts-usewatch-h9i5e)
 *
 * @example
 * ```tsx
 * const { control } = useForm();
 * const values = useWatch({
 *   name: "fieldName"
 *   control,
 * })
 * ```
 */
function useWatch(props) {
  const methods = useFormContext();
  const {
    control = methods.control,
    name,
    defaultValue,
    disabled,
    exact
  } = props || {};
  const _name = React.useRef(name);
  _name.current = name;
  useSubscribe({
    disabled,
    subject: control._subjects.values,
    next: formState => {
      if (shouldSubscribeByName(_name.current, formState.name, exact)) {
        updateValue(cloneObject(generateWatchOutput(_name.current, control._names, formState.values || control._formValues, false, defaultValue)));
      }
    }
  });
  const [value, updateValue] = React.useState(control._getWatch(name, defaultValue));
  React.useEffect(() => control._removeUnmounted());
  return value;
}
var isKey = value => /^\w*$/.test(value);
var stringToPath = input => compact(input.replace(/["|']|\]/g, '').split(/\.|\[/));
function set(object, path, value) {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    object[key] = newValue;
    object = object[key];
  }
  return object;
}

/**
 * Custom hook to work with controlled component, this function provide you with both form and field level state. Re-render is isolated at the hook level.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller) • [Demo](https://codesandbox.io/s/usecontroller-0o8px)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns field properties, field and form state. {@link UseControllerReturn}
 *
 * @example
 * ```tsx
 * function Input(props) {
 *   const { field, fieldState, formState } = useController(props);
 *   return (
 *     <div>
 *       <input {...field} placeholder={props.name} />
 *       <p>{fieldState.isTouched && "Touched"}</p>
 *       <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *     </div>
 *   );
 * }
 * ```
 */
function useController(props) {
  const methods = useFormContext();
  const {
    name,
    disabled,
    control = methods.control,
    shouldUnregister
  } = props;
  const isArrayField = isNameInFieldArray(control._names.array, name);
  const value = useWatch({
    control,
    name,
    defaultValue: get(control._formValues, name, get(control._defaultValues, name, props.defaultValue)),
    exact: true
  });
  const formState = useFormState({
    control,
    name
  });
  const _registerProps = React.useRef(control.register(name, {
    ...props.rules,
    value
  }));
  _registerProps.current = control.register(name, props.rules);
  React.useEffect(() => {
    const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
    const updateMounted = (name, value) => {
      const field = get(control._fields, name);
      if (field) {
        field._f.mount = value;
      }
    };
    updateMounted(name, true);
    if (_shouldUnregisterField) {
      const value = cloneObject(get(control._options.defaultValues, name));
      set(control._defaultValues, name, value);
      if (isUndefined(get(control._formValues, name))) {
        set(control._formValues, name, value);
      }
    }
    return () => {
      (isArrayField ? _shouldUnregisterField && !control._state.action : _shouldUnregisterField) ? control.unregister(name) : updateMounted(name, false);
    };
  }, [name, control, isArrayField, shouldUnregister]);
  React.useEffect(() => {
    if (get(control._fields, name)) {
      control._updateDisabledField({
        disabled,
        fields: control._fields,
        name,
        value: get(control._fields, name)._f.value
      });
    }
  }, [disabled, name, control]);
  return {
    field: {
      name,
      value,
      ...(isBoolean(disabled) || isBoolean(formState.disabled) ? {
        disabled: formState.disabled || disabled
      } : {}),
      onChange: React.useCallback(event => _registerProps.current.onChange({
        target: {
          value: getEventValue(event),
          name: name
        },
        type: EVENTS.CHANGE
      }), [name]),
      onBlur: React.useCallback(() => _registerProps.current.onBlur({
        target: {
          value: get(control._formValues, name),
          name: name
        },
        type: EVENTS.BLUR
      }), [name, control]),
      ref: elm => {
        const field = get(control._fields, name);
        if (field && elm) {
          field._f.ref = {
            focus: () => elm.focus(),
            select: () => elm.select(),
            setCustomValidity: message => elm.setCustomValidity(message),
            reportValidity: () => elm.reportValidity()
          };
        }
      }
    },
    formState,
    fieldState: Object.defineProperties({}, {
      invalid: {
        enumerable: true,
        get: () => !!get(formState.errors, name)
      },
      isDirty: {
        enumerable: true,
        get: () => !!get(formState.dirtyFields, name)
      },
      isTouched: {
        enumerable: true,
        get: () => !!get(formState.touchedFields, name)
      },
      error: {
        enumerable: true,
        get: () => get(formState.errors, name)
      }
    })
  };
}

/**
 * Component based on `useController` hook to work with controlled component.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usecontroller/controller) • [Demo](https://codesandbox.io/s/react-hook-form-v6-controller-ts-jwyzw) • [Video](https://www.youtube.com/watch?v=N2UNk_UCVyA)
 *
 * @param props - the path name to the form field value, and validation rules.
 *
 * @returns provide field handler functions, field and form state.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control } = useForm<FormValues>({
 *     defaultValues: {
 *       test: ""
 *     }
 *   });
 *
 *   return (
 *     <form>
 *       <Controller
 *         control={control}
 *         name="test"
 *         render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => (
 *           <>
 *             <input
 *               onChange={onChange} // send value to hook form
 *               onBlur={onBlur} // notify when input is touched
 *               value={value} // return updated value
 *               ref={ref} // set ref for focus management
 *             />
 *             <p>{formState.isSubmitted ? "submitted" : ""}</p>
 *             <p>{fieldState.isTouched ? "touched" : ""}</p>
 *           </>
 *         )}
 *       />
 *     </form>
 *   );
 * }
 * ```
 */
const Controller = props => props.render(useController(props));
const POST_REQUEST = 'post';
/**
 * Form component to manage submission.
 *
 * @param props - to setup submission detail. {@link FormProps}
 *
 * @returns form component or headless render prop.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { control, formState: { errors } } = useForm();
 *
 *   return (
 *     <Form action="/api" control={control}>
 *       <input {...register("name")} />
 *       <p>{errors?.root?.server && 'Server error'}</p>
 *       <button>Submit</button>
 *     </Form>
 *   );
 * }
 * ```
 */
function Form(props) {
  const methods = useFormContext();
  const [mounted, setMounted] = React.useState(false);
  const {
    control = methods.control,
    onSubmit,
    children,
    action,
    method = POST_REQUEST,
    headers,
    encType,
    onError,
    render,
    onSuccess,
    validateStatus,
    ...rest
  } = props;
  const submit = async event => {
    let hasError = false;
    let type = '';
    await control.handleSubmit(async data => {
      const formData = new FormData();
      let formDataJson = '';
      try {
        formDataJson = JSON.stringify(data);
      } catch (_a) {}
      for (const name of control._names.mount) {
        formData.append(name, get(data, name));
      }
      if (onSubmit) {
        await onSubmit({
          data,
          event,
          method,
          formData,
          formDataJson
        });
      }
      if (action) {
        try {
          const shouldStringifySubmissionData = [headers && headers['Content-Type'], encType].some(value => value && value.includes('json'));
          const response = await fetch(action, {
            method,
            headers: {
              ...headers,
              ...(encType ? {
                'Content-Type': encType
              } : {})
            },
            body: shouldStringifySubmissionData ? formDataJson : formData
          });
          if (response && (validateStatus ? !validateStatus(response.status) : response.status < 200 || response.status >= 300)) {
            hasError = true;
            onError && onError({
              response
            });
            type = String(response.status);
          } else {
            onSuccess && onSuccess({
              response
            });
          }
        } catch (error) {
          hasError = true;
          onError && onError({
            error
          });
        }
      }
    })(event);
    if (hasError && props.control) {
      props.control._subjects.state.next({
        isSubmitSuccessful: false
      });
      props.control.setError('root.server', {
        type
      });
    }
  };
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return render ? React.createElement(React.Fragment, null, render({
    submit
  })) : React.createElement("form", {
    noValidate: mounted,
    action: action,
    method: method,
    encType: encType,
    onSubmit: submit,
    ...rest
  }, children);
}
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...(errors[name] && errors[name].types ? errors[name].types : {}),
    [type]: message || true
  }
} : {};
var generateId = () => {
  const d = typeof performance === 'undefined' ? Date.now() : performance.now() * 1000;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16 + d) % 16 | 0;
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
};
var getFocusFieldName = function (name, index) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return options.shouldFocus || isUndefined(options.shouldFocus) ? options.focusName || "".concat(name, ".").concat(isUndefined(options.focusIndex) ? index : options.focusIndex, ".") : '';
};
var getValidationModes = mode => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
var isWatched = (name, _names, isBlurEvent) => !isBlurEvent && (_names.watchAll || _names.watch.has(name) || [..._names.watch].some(watchName => name.startsWith(watchName) && /^\.\w+/.test(name.slice(watchName.length))));
const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const {
        _f,
        ...currentField
      } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          break;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          break;
        }
      } else if (isObject(currentField)) {
        iterateFieldsByAction(currentField, action);
      }
    }
  }
};
var updateFieldArrayRootError = (errors, error, name) => {
  const fieldArrayErrors = compact(get(errors, name));
  set(fieldArrayErrors, 'root', error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
var isFileInput = element => element.type === 'file';
var isFunction = value => typeof value === 'function';
var isHTMLElement = value => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMessage = value => isString(value);
var isRadioInput = element => element.type === 'radio';
var isRegex = value => value instanceof RegExp;
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = {
  value: true,
  isValid: true
};
var getCheckboxValue = options => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter(option => option && option.checked && !option.disabled).map(option => option.value);
      return {
        value: values,
        isValid: !!values.length
      };
    }
    return options[0].checked && !options[0].disabled ?
    // @ts-expect-error expected to work in the browser
    options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === '' ? validResult : {
      value: options[0].value,
      isValid: true
    } : validResult : defaultResult;
  }
  return defaultResult;
};
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = options => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getValidateError(result, ref) {
  let type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'validate';
  if (isMessage(result) || Array.isArray(result) && result.every(isMessage) || isBoolean(result) && !result) {
    return {
      type,
      message: isMessage(result) ? result : '',
      ref
    };
  }
}
var getValueAndMessage = validationData => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ''
};
var validateField = async (field, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const {
    ref,
    refs,
    required,
    maxLength,
    minLength,
    min,
    max,
    pattern,
    validate,
    name,
    valueAsNumber,
    mount,
    disabled
  } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabled) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = message => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      inputRef.setCustomValidity(isBoolean(message) ? '' : message || '');
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === '' || inputValue === '' || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = function (exceedMax, maxLengthMessage, minLengthMessage) {
    let maxType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : INPUT_VALIDATION_RULES.maxLength;
    let minType = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : INPUT_VALIDATION_RULES.minLength;
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const {
      value,
      message
    } = isMessage(required) ? {
      value: !!required,
      message: required
    } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = time => new Date(new Date().toDateString() + ' ' + time);
      const isTime = ref.type == 'time';
      const isWeek = ref.type == 'week';
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const {
      value: patternValue,
      message
    } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate) {
    if (isFunction(validate)) {
      const result = await validate(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const key in validate) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
function append(data, value) {
  return [...data, ...convertToArrayPayload(value)];
}
var fillEmptyArray = value => Array.isArray(value) ? value.map(() => undefined) : undefined;
function insert(data, index, value) {
  return [...data.slice(0, index), ...convertToArrayPayload(value), ...data.slice(index)];
}
var moveArrayAt = (data, from, to) => {
  if (!Array.isArray(data)) {
    return [];
  }
  if (isUndefined(data[to])) {
    data[to] = undefined;
  }
  data.splice(to, 0, data.splice(from, 1)[0]);
  return data;
};
function prepend(data, value) {
  return [...convertToArrayPayload(value), ...convertToArrayPayload(data)];
}
function removeAtIndexes(data, indexes) {
  let i = 0;
  const temp = [...data];
  for (const index of indexes) {
    temp.splice(index - i, 1);
    i++;
  }
  return compact(temp).length ? temp : [];
}
var removeArrayAt = (data, index) => isUndefined(index) ? [] : removeAtIndexes(data, convertToArrayPayload(index).sort((a, b) => a - b));
var swapArrayAt = (data, indexA, indexB) => {
  data[indexA] = [data[indexB], data[indexB] = data[indexA]][0];
};
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    object = isUndefined(object) ? index++ : object[updatePath[index++]];
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var updateAt = (fieldValues, index, value) => {
  fieldValues[index] = value;
  return fieldValues;
};

/**
 * A custom hook that exposes convenient methods to perform operations with a list of dynamic inputs that need to be appended, updated, removed etc. • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn) • [Video](https://youtu.be/4MrbfGSFY2A)
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/usefieldarray) • [Demo](https://codesandbox.io/s/react-hook-form-usefieldarray-ssugn)
 *
 * @param props - useFieldArray props
 *
 * @returns methods - functions to manipulate with the Field Arrays (dynamic inputs) {@link UseFieldArrayReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, control, handleSubmit, reset, trigger, setError } = useForm({
 *     defaultValues: {
 *       test: []
 *     }
 *   });
 *   const { fields, append } = useFieldArray({
 *     control,
 *     name: "test"
 *   });
 *
 *   return (
 *     <form onSubmit={handleSubmit(data => console.log(data))}>
 *       {fields.map((item, index) => (
 *          <input key={item.id} {...register(`test.${index}.firstName`)}  />
 *       ))}
 *       <button type="button" onClick={() => append({ firstName: "bill" })}>
 *         append
 *       </button>
 *       <input type="submit" />
 *     </form>
 *   );
 * }
 * ```
 */
function useFieldArray(props) {
  const methods = useFormContext();
  const {
    control = methods.control,
    name,
    keyName = 'id',
    shouldUnregister
  } = props;
  const [fields, setFields] = React.useState(control._getFieldArray(name));
  const ids = React.useRef(control._getFieldArray(name).map(generateId));
  const _fieldIds = React.useRef(fields);
  const _name = React.useRef(name);
  const _actioned = React.useRef(false);
  _name.current = name;
  _fieldIds.current = fields;
  control._names.array.add(name);
  props.rules && control.register(name, props.rules);
  useSubscribe({
    next: _ref => {
      let {
        values,
        name: fieldArrayName
      } = _ref;
      if (fieldArrayName === _name.current || !fieldArrayName) {
        const fieldValues = get(values, _name.current);
        if (Array.isArray(fieldValues)) {
          setFields(fieldValues);
          ids.current = fieldValues.map(generateId);
        }
      }
    },
    subject: control._subjects.array
  });
  const updateValues = React.useCallback(updatedFieldArrayValues => {
    _actioned.current = true;
    control._updateFieldArray(name, updatedFieldArrayValues);
  }, [control, name]);
  const append$1 = (value, options) => {
    const appendValue = convertToArrayPayload(cloneObject(value));
    const updatedFieldArrayValues = append(control._getFieldArray(name), appendValue);
    control._names.focus = getFocusFieldName(name, updatedFieldArrayValues.length - 1, options);
    ids.current = append(ids.current, appendValue.map(generateId));
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, append, {
      argA: fillEmptyArray(value)
    });
  };
  const prepend$1 = (value, options) => {
    const prependValue = convertToArrayPayload(cloneObject(value));
    const updatedFieldArrayValues = prepend(control._getFieldArray(name), prependValue);
    control._names.focus = getFocusFieldName(name, 0, options);
    ids.current = prepend(ids.current, prependValue.map(generateId));
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, prepend, {
      argA: fillEmptyArray(value)
    });
  };
  const remove = index => {
    const updatedFieldArrayValues = removeArrayAt(control._getFieldArray(name), index);
    ids.current = removeArrayAt(ids.current, index);
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, removeArrayAt, {
      argA: index
    });
  };
  const insert$1 = (index, value, options) => {
    const insertValue = convertToArrayPayload(cloneObject(value));
    const updatedFieldArrayValues = insert(control._getFieldArray(name), index, insertValue);
    control._names.focus = getFocusFieldName(name, index, options);
    ids.current = insert(ids.current, index, insertValue.map(generateId));
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, insert, {
      argA: index,
      argB: fillEmptyArray(value)
    });
  };
  const swap = (indexA, indexB) => {
    const updatedFieldArrayValues = control._getFieldArray(name);
    swapArrayAt(updatedFieldArrayValues, indexA, indexB);
    swapArrayAt(ids.current, indexA, indexB);
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, swapArrayAt, {
      argA: indexA,
      argB: indexB
    }, false);
  };
  const move = (from, to) => {
    const updatedFieldArrayValues = control._getFieldArray(name);
    moveArrayAt(updatedFieldArrayValues, from, to);
    moveArrayAt(ids.current, from, to);
    updateValues(updatedFieldArrayValues);
    setFields(updatedFieldArrayValues);
    control._updateFieldArray(name, updatedFieldArrayValues, moveArrayAt, {
      argA: from,
      argB: to
    }, false);
  };
  const update = (index, value) => {
    const updateValue = cloneObject(value);
    const updatedFieldArrayValues = updateAt(control._getFieldArray(name), index, updateValue);
    ids.current = [...updatedFieldArrayValues].map((item, i) => !item || i === index ? generateId() : ids.current[i]);
    updateValues(updatedFieldArrayValues);
    setFields([...updatedFieldArrayValues]);
    control._updateFieldArray(name, updatedFieldArrayValues, updateAt, {
      argA: index,
      argB: updateValue
    }, true, false);
  };
  const replace = value => {
    const updatedFieldArrayValues = convertToArrayPayload(cloneObject(value));
    ids.current = updatedFieldArrayValues.map(generateId);
    updateValues([...updatedFieldArrayValues]);
    setFields([...updatedFieldArrayValues]);
    control._updateFieldArray(name, [...updatedFieldArrayValues], data => data, {}, true, false);
  };
  React.useEffect(() => {
    control._state.action = false;
    isWatched(name, control._names) && control._subjects.state.next({
      ...control._formState
    });
    if (_actioned.current && (!getValidationModes(control._options.mode).isOnSubmit || control._formState.isSubmitted)) {
      if (control._options.resolver) {
        control._executeSchema([name]).then(result => {
          const error = get(result.errors, name);
          const existingError = get(control._formState.errors, name);
          if (existingError ? !error && existingError.type || error && (existingError.type !== error.type || existingError.message !== error.message) : error && error.type) {
            error ? set(control._formState.errors, name, error) : unset(control._formState.errors, name);
            control._subjects.state.next({
              errors: control._formState.errors
            });
          }
        });
      } else {
        const field = get(control._fields, name);
        if (field && field._f) {
          validateField(field, control._formValues, control._options.criteriaMode === VALIDATION_MODE.all, control._options.shouldUseNativeValidation, true).then(error => !isEmptyObject(error) && control._subjects.state.next({
            errors: updateFieldArrayRootError(control._formState.errors, error, name)
          }));
        }
      }
    }
    control._subjects.values.next({
      name,
      values: {
        ...control._formValues
      }
    });
    control._names.focus && iterateFieldsByAction(control._fields, (ref, key) => {
      if (control._names.focus && key.startsWith(control._names.focus) && ref.focus) {
        ref.focus();
        return 1;
      }
      return;
    });
    control._names.focus = '';
    control._updateValid();
    _actioned.current = false;
  }, [fields, name, control]);
  React.useEffect(() => {
    !get(control._formValues, name) && control._updateFieldArray(name);
    return () => {
      (control._options.shouldUnregister || shouldUnregister) && control.unregister(name);
    };
  }, [name, control, keyName, shouldUnregister]);
  return {
    swap: React.useCallback(swap, [updateValues, name, control]),
    move: React.useCallback(move, [updateValues, name, control]),
    prepend: React.useCallback(prepend$1, [updateValues, name, control]),
    append: React.useCallback(append$1, [updateValues, name, control]),
    remove: React.useCallback(remove, [updateValues, name, control]),
    insert: React.useCallback(insert$1, [updateValues, name, control]),
    update: React.useCallback(update, [updateValues, name, control]),
    replace: React.useCallback(replace, [updateValues, name, control]),
    fields: React.useMemo(() => fields.map((field, index) => ({
      ...field,
      [keyName]: ids.current[index] || generateId()
    })), [fields, keyName])
  };
}
function createSubject() {
  let _observers = [];
  const next = value => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = observer => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter(o => o !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
}
var isPrimitive = value => isNullOrUndefined(value) || !isObjectType(value);
function deepEqual(object1, object2) {
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return object1 === object2;
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return object1.getTime() === object2.getTime();
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    if (!keys2.includes(key)) {
      return false;
    }
    if (key !== 'ref') {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || isObject(val1) && isObject(val2) || Array.isArray(val1) && Array.isArray(val2) ? !deepEqual(val1, val2) : val1 !== val2) {
        return false;
      }
    }
  }
  return true;
}
var isMultipleSelect = element => element.type === "select-multiple";
var isRadioOrCheckbox = ref => isRadioInput(ref) || isCheckBoxInput(ref);
var live = ref => isHTMLElement(ref) && ref.isConnected;
var objectHasFunction = data => {
  for (const key in data) {
    if (isFunction(data[key])) {
      return true;
    }
  }
  return false;
};
function markFieldsDirty(data) {
  let fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const isParentNodeArray = Array.isArray(data);
  if (isObject(data) || isParentNodeArray) {
    for (const key in data) {
      if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
        fields[key] = Array.isArray(data[key]) ? [] : {};
        markFieldsDirty(data[key], fields[key]);
      } else if (!isNullOrUndefined(data[key])) {
        fields[key] = true;
      }
    }
  }
  return fields;
}
function getDirtyFieldsFromDefaultValues(data, formValues, dirtyFieldsFromValues) {
  const isParentNodeArray = Array.isArray(data);
  if (isObject(data) || isParentNodeArray) {
    for (const key in data) {
      if (Array.isArray(data[key]) || isObject(data[key]) && !objectHasFunction(data[key])) {
        if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
          dirtyFieldsFromValues[key] = Array.isArray(data[key]) ? markFieldsDirty(data[key], []) : {
            ...markFieldsDirty(data[key])
          };
        } else {
          getDirtyFieldsFromDefaultValues(data[key], isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
        }
      } else {
        dirtyFieldsFromValues[key] = !deepEqual(data[key], formValues[key]);
      }
    }
  }
  return dirtyFieldsFromValues;
}
var getDirtyFields = (defaultValues, formValues) => getDirtyFieldsFromDefaultValues(defaultValues, formValues, markFieldsDirty(formValues));
var getFieldValueAs = (value, _ref2) => {
  let {
    valueAsNumber,
    valueAsDate,
    setValueAs
  } = _ref2;
  return isUndefined(value) ? value : valueAsNumber ? value === '' ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
};
function getFieldValue(_f) {
  const ref = _f.ref;
  if (_f.refs ? _f.refs.every(ref => ref.disabled) : ref.disabled) {
    return;
  }
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(_ref3 => {
      let {
        value
      } = _ref3;
      return value;
    });
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var getRuleValue = rule => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var hasValidation = options => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split('.');
  while (names.length) {
    const fieldName = names.join('.');
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return {
        name
      };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
const defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
function createFormControl() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let flushRootRender = arguments.length > 1 ? arguments[1] : undefined;
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    submitCount: 0,
    isDirty: false,
    isLoading: isFunction(_options.defaultValues),
    isValidating: false,
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    touchedFields: {},
    dirtyFields: {},
    errors: {},
    disabled: false
  };
  let _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false
  };
  let _names = {
    mount: new Set(),
    unMount: new Set(),
    array: new Set(),
    watch: new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  const _proxyFormState = {
    isDirty: false,
    dirtyFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  const _subjects = {
    values: createSubject(),
    array: createSubject(),
    state: createSubject()
  };
  const shouldCaptureDirtyFields = props.resetOptions && props.resetOptions.keepDirtyValues;
  const validationModeBeforeSubmit = getValidationModes(_options.mode);
  const validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = callback => wait => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _updateValid = async shouldUpdateValid => {
    if (_proxyFormState.isValid || shouldUpdateValid) {
      const isValid = _options.resolver ? isEmptyObject((await _executeSchema()).errors) : await executeBuiltInValidation(_fields, true);
      if (isValid !== _formState.isValid) {
        _subjects.state.next({
          isValid
        });
      }
    }
  };
  const _updateIsValidating = value => _proxyFormState.isValidating && _subjects.state.next({
    isValidating: value
  });
  const _updateFieldArray = function (name) {
    let values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    let method = arguments.length > 2 ? arguments[2] : undefined;
    let args = arguments.length > 3 ? arguments[3] : undefined;
    let shouldSetValues = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    let shouldUpdateFieldsAndState = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    if (args && method) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if (_proxyFormState.touchedFields && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields) {
        _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      _state.mount && _updateValid();
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!isBlurEvent || shouldDirty) {
      if (_proxyFormState.isDirty) {
        isPreviousDirty = _formState.isDirty;
        _formState.isDirty = output.isDirty = _getDirty();
        shouldUpdateField = isPreviousDirty !== output.isDirty;
      }
      const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
      isPreviousDirty = get(_formState.dirtyFields, name);
      isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
      output.dirtyFields = _formState.dirtyFields;
      shouldUpdateField = shouldUpdateField || _proxyFormState.dirtyFields && isPreviousDirty !== !isCurrentFieldPristine;
    }
    if (isBlurEvent) {
      const isPreviousFieldTouched = get(_formState.touchedFields, name);
      if (!isPreviousFieldTouched) {
        set(_formState.touchedFields, name, isBlurEvent);
        output.touchedFields = _formState.touchedFields;
        shouldUpdateField = shouldUpdateField || _proxyFormState.touchedFields && isPreviousFieldTouched !== isBlurEvent;
      }
    }
    shouldUpdateField && shouldRender && _subjects.state.next(output);
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = _proxyFormState.isValid && isBoolean(isValid) && _formState.isValid !== isValid;
    if (props.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(props.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...(shouldUpdateValid && isBoolean(isValid) ? {
          isValid
        } : {}),
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
    _updateIsValidating(false);
  };
  const _executeSchema = async name => _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
  const executeSchemaAndUpdateState = async names => {
    const {
      errors
    } = await _executeSchema(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const executeBuiltInValidation = async function (fields, shouldOnlyCheckValid) {
    let context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      valid: true
    };
    for (const name in fields) {
      const field = fields[name];
      if (field) {
        const {
          _f,
          ...fieldValue
        } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const fieldError = await validateField(field, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !shouldOnlyCheckValid, isFieldArrayRoot);
          if (fieldError[_f.name]) {
            context.valid = false;
            if (shouldOnlyCheckValid) {
              break;
            }
          }
          !shouldOnlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
        }
        fieldValue && (await executeBuiltInValidation(fieldValue, shouldOnlyCheckValid, context));
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every(ref => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = new Set();
  };
  const _getDirty = (name, data) => (name && data && set(_formValues, name, data), !deepEqual(getValues(), _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ...(_state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? {
      [names]: defaultValue
    } : defaultValue)
  }, isGlobal, defaultValue);
  const _getFieldArray = name => compact(get(_state.mount ? _formValues : _defaultValues, name, props.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = function (name, value) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? '' : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach(optionRef => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.length > 1 ? fieldReference.refs.forEach(checkboxRef => (!checkboxRef.defaultChecked || !checkboxRef.disabled) && (checkboxRef.checked = Array.isArray(fieldValue) ? !!fieldValue.find(data => data === checkboxRef.value) : fieldValue === checkboxRef.value)) : fieldReference.refs[0] && (fieldReference.refs[0].checked = !!fieldValue);
          } else {
            fieldReference.refs.forEach(radioRef => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = '';
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type) {
            _subjects.values.next({
              name,
              values: {
                ..._formValues
              }
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, true);
    options.shouldValidate && trigger(name);
  };
  const setValues = (name, value, options) => {
    for (const fieldKey in value) {
      const fieldValue = value[fieldKey];
      const fieldName = "".concat(name, ".").concat(fieldKey);
      const field = get(_fields, fieldName);
      (_names.array.has(name) || !isPrimitive(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setValues(fieldName, fieldValue, options) : setFieldValue(fieldName, fieldValue, options);
    }
  };
  const setValue = function (name, value) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = cloneObject(value);
    set(_formValues, name, cloneValue);
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: {
          ..._formValues
        }
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields) && options.shouldDirty) {
        _subjects.state.next({
          name,
          dirtyFields: getDirtyFields(_defaultValues, _formValues),
          isDirty: _getDirty(name, cloneValue)
        });
      }
    } else {
      field && !field._f && !isNullOrUndefined(cloneValue) ? setValues(name, cloneValue, options) : setFieldValue(name, cloneValue, options);
    }
    isWatched(name, _names) && _subjects.state.next({
      ..._formState
    });
    _subjects.values.next({
      name,
      values: {
        ..._formValues
      }
    });
    !_state.mount && flushRootRender();
  };
  const onChange = async event => {
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const getCurrentFieldValue = () => target.type ? getFieldValue(field._f) : getEventValue(event);
    const _updateIsFieldValueUpdated = fieldValue => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || fieldValue === get(_formValues, name, fieldValue);
    };
    if (field) {
      let error;
      let isValid;
      const fieldValue = getCurrentFieldValue();
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const shouldSkipValidation = !hasValidation(field._f) && !_options.resolver && !get(_formState.errors, name) && !field._f.deps || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, validationModeAfterSubmit, validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        field._f.onBlur && field._f.onBlur(event);
        delayErrorCallback && delayErrorCallback(0);
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent, false);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.values.next({
        name,
        type: event.type,
        values: {
          ..._formValues
        }
      });
      if (shouldSkipValidation) {
        _proxyFormState.isValid && _updateValid();
        return shouldRender && _subjects.state.next({
          name,
          ...(watched ? {} : fieldState)
        });
      }
      !isBlurEvent && watched && _subjects.state.next({
        ..._formState
      });
      _updateIsValidating(true);
      if (_options.resolver) {
        const {
          errors
        } = await _executeSchema([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
          const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
          error = errorLookupResult.error;
          name = errorLookupResult.name;
          isValid = isEmptyObject(errors);
        }
      } else {
        error = (await validateField(field, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid = false;
          } else if (_proxyFormState.isValid) {
            isValid = await executeBuiltInValidation(_fields, true);
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async function (name) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let isValid;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    _updateIsValidating(true);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some(name => get(errors, name)) : isValid;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async fieldName => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation(field && field._f ? {
          [fieldName]: field
        } : field);
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _updateValid();
    } else {
      validationResult = isValid = await executeBuiltInValidation(_fields);
    }
    _subjects.state.next({
      ...(!isString(name) || _proxyFormState.isValid && isValid !== _formState.isValid ? {} : {
        name
      }),
      ...(_options.resolver || !name ? {
        isValid
      } : {}),
      errors: _formState.errors,
      isValidating: false
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = fieldNames => {
    const values = {
      ..._defaultValues,
      ...(_state.mount ? _formValues : {})
    };
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map(name => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name),
    error: get((formState || _formState).errors, name)
  });
  const clearErrors = name => {
    name && convertToArrayPayload(name).forEach(inputName => unset(_formState.errors, inputName));
    _subjects.state.next({
      errors: name ? _formState.errors : {}
    });
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, {
      _f: {}
    })._f || {}).ref;
    set(_formState.errors, name, {
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => isFunction(name) ? _subjects.values.subscribe({
    next: payload => name(_getWatch(undefined, defaultValue), payload)
  }) : _getWatch(name, defaultValue, true);
  const unregister = function (name) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.values.next({
      values: {
        ..._formValues
      }
    });
    _subjects.state.next({
      ..._formState,
      ...(!options.keepDirty ? {} : {
        isDirty: _getDirty()
      })
    });
    !options.keepIsValid && _updateValid();
  };
  const _updateDisabledField = _ref4 => {
    let {
      disabled,
      name,
      field,
      fields,
      value
    } = _ref4;
    if (isBoolean(disabled)) {
      const inputValue = disabled ? undefined : isUndefined(value) ? getFieldValue(field ? field._f : get(fields, name)._f) : value;
      set(_formValues, name, inputValue);
      updateTouchAndDirty(name, inputValue, false, false, true);
    }
  };
  const register = function (name) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled);
    set(_fields, name, {
      ...(field || {}),
      _f: {
        ...(field && field._f ? field._f : {
          ref: {
            name
          }
        }),
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field) {
      _updateDisabledField({
        field,
        disabled: options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...(disabledIsDefined ? {
        disabled: options.disabled
      } : {}),
      ...(_options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {}),
      name,
      onChange,
      onBlur: onChange,
      ref: ref => {
        if (ref) {
          register(name, options);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll('input,select,textarea')[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find(option => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...(radioOrCheckbox ? {
                refs: [...refs.filter(live), fieldRef, ...(Array.isArray(get(_defaultValues, name)) ? [{}] : [])],
                ref: {
                  type: fieldRef.type,
                  name
                }
              } : {
                ref: fieldRef
              })
            }
          });
          updateValidAndValue(name, false, undefined, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = disabled => {
    if (isBoolean(disabled)) {
      _subjects.state.next({
        disabled
      });
      iterateFieldsByAction(_fields, ref => {
        ref.disabled = disabled;
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async e => {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const {
        errors,
        values
      } = await _executeSchema();
      _formState.errors = errors;
      fieldValues = values;
    } else {
      await executeBuiltInValidation(_fields);
    }
    unset(_formState.errors, 'root');
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      await onValid(fieldValues, e);
    } else {
      if (onInvalid) {
        await onInvalid({
          ..._formState.errors
        }, e);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors),
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
  };
  const resetField = function (name) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, get(_defaultValues, name));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, options.defaultValue);
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, get(_defaultValues, name)) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _updateValid();
      }
      _subjects.state.next({
        ..._formState
      });
    }
  };
  const _reset = function (formValues) {
    let keepStateOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const values = formValues && !isEmptyObject(formValues) ? cloneUpdatedValues : _defaultValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues || shouldCaptureDirtyFields) {
        for (const fieldName of _names.mount) {
          get(_formState.dirtyFields, fieldName) ? set(values, fieldName, get(_formValues, fieldName)) : setValue(fieldName, get(values, fieldName));
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest('form');
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        _fields = {};
      }
      _formValues = props.shouldUnregister ? keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {} : cloneObject(values);
      _subjects.array.next({
        values: {
          ...values
        }
      });
      _subjects.values.next({
        values: {
          ...values
        }
      });
    }
    _names = {
      mount: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      watchAll: false,
      focus: ''
    };
    !_state.mount && flushRootRender();
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid;
    _state.watch = !!props.shouldUnregister;
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: keepStateOptions.keepDirty ? _formState.isDirty : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: keepStateOptions.keepDirtyValues ? _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, keepStateOptions);
  const setFocus = function (name) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        fieldRef.focus();
        options.shouldSelect && fieldRef.select();
      }
    }
  };
  const _updateFormState = updatedFormState => {
    _formState = {
      ..._formState,
      ...updatedFormState
    };
  };
  const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then(values => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  return {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _executeSchema,
      _getWatch,
      _getDirty,
      _updateValid,
      _removeUnmounted,
      _updateFieldArray,
      _updateDisabledField,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _updateFormState,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      set _formState(value) {
        _formState = value;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
      }
    },
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    resetField,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
}

/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */
function useForm() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const _formControl = react.useRef();
  const _values = react.useRef();
  const [formState, updateFormState] = react.useState({
    isDirty: false,
    isValidating: false,
    isLoading: isFunction(props.defaultValues),
    isSubmitted: false,
    isSubmitting: false,
    isSubmitSuccessful: false,
    isValid: false,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    errors: {},
    disabled: false,
    defaultValues: isFunction(props.defaultValues) ? undefined : props.defaultValues
  });
  if (!_formControl.current) {
    _formControl.current = {
      ...createFormControl(props, () => updateFormState(formState => ({
        ...formState
      }))),
      formState
    };
  }
  const control = _formControl.current.control;
  control._options = props;
  useSubscribe({
    subject: control._subjects.state,
    next: value => {
      if (shouldRenderFormState(value, control._proxyFormState, control._updateFormState, true)) {
        updateFormState({
          ...control._formState
        });
      }
    }
  });
  react.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  react.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty = control._getDirty();
      if (isDirty !== formState.isDirty) {
        control._subjects.state.next({
          isDirty
        });
      }
    }
  }, [control, formState.isDirty]);
  react.useEffect(() => {
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, control._options.resetOptions);
      _values.current = props.values;
    } else {
      control._resetDefaultValues();
    }
  }, [props.values, control]);
  react.useEffect(() => {
    if (!control._state.mount) {
      control._updateValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({
        ...control._formState
      });
    }
    control._removeUnmounted();
  });
  _formControl.current.formState = getProxyFormState(formState, control);
  return _formControl.current;
}

;// CONCATENATED MODULE: ./src/features/an-amazing-journey/hooks/HandleMapEvents.tsx
/**
 * Disable map when mouse is over the panel
 * Enable map when mouse is out of the panel
 */function HandleMapEvents(panelRef){(0,react.useEffect)(()=>{var _panelRef$current,_panelRef$current2,_panelRef$current3,_panelRef$current4;const disableMapCallback=()=>{try{disableMap();}catch(e){error(e);}};(_panelRef$current=panelRef.current)===null||_panelRef$current===void 0?void 0:_panelRef$current.addEventListener("mouseover",disableMapCallback);(_panelRef$current2=panelRef.current)===null||_panelRef$current2===void 0?void 0:_panelRef$current2.addEventListener("touchstart",disableMapCallback);const enableMapCallback=()=>{try{enableMap();}catch(e){error(e);}};(_panelRef$current3=panelRef.current)===null||_panelRef$current3===void 0?void 0:_panelRef$current3.addEventListener("mouseout",enableMapCallback);(_panelRef$current4=panelRef.current)===null||_panelRef$current4===void 0?void 0:_panelRef$current4.addEventListener("touchend",enableMapCallback);return()=>{var _panelRef$current5,_panelRef$current6,_panelRef$current7,_panelRef$current8;(_panelRef$current5=panelRef.current)===null||_panelRef$current5===void 0?void 0:_panelRef$current5.removeEventListener("mouseover",disableMapCallback);(_panelRef$current6=panelRef.current)===null||_panelRef$current6===void 0?void 0:_panelRef$current6.removeEventListener("touchstart",disableMapCallback);(_panelRef$current7=panelRef.current)===null||_panelRef$current7===void 0?void 0:_panelRef$current7.removeEventListener("mouseout",enableMapCallback);// eslint-disable-next-line react-hooks/exhaustive-deps
(_panelRef$current8=panelRef.current)===null||_panelRef$current8===void 0?void 0:_panelRef$current8.removeEventListener("touchend",enableMapCallback);};},[panelRef]);}
;// CONCATENATED MODULE: ./src/hooks/storage.ts
// a hook to preserve state in a localstorage and get it at init
const STORAGE_PREFIX="STUFF_UNLOCKED.";const useLocalStorage=(key,initialValue)=>{const[value,setValue]=(0,react.useState)(()=>{const item=window.localStorage.getItem(STORAGE_PREFIX+key);if(item){return JSON.parse(item);}return initialValue;});(0,react.useEffect)(()=>{window.localStorage.setItem(STORAGE_PREFIX+key,JSON.stringify(value));},[key,value]);return[value,setValue];};
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(694);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(184);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/AutoTravellerPanel.tsx
let AutoTravelFormState=/*#__PURE__*/function(AutoTravelFormState){AutoTravelFormState[AutoTravelFormState["IDLE"]=0]="IDLE";AutoTravelFormState[AutoTravelFormState["STARTED"]=1]="STARTED";AutoTravelFormState[AutoTravelFormState["STOPPING"]=2]="STOPPING";return AutoTravelFormState;}({});const AutoTravellerPanel=props=>{const panelRef=(0,react.useRef)(null);const[formValuesFromStorage,setFormValues]=useLocalStorage("AnAmazingJourney.autoTravellerForm",{targetDistanceKm:"1000",resourceUsed:"preferCurrency",travelBackAfterFinish:true});const{register,handleSubmit,formState:{errors},watch}=useForm({defaultValues:formValuesFromStorage});const formValues=watch();const stringifiedFormValues=JSON.stringify(formValues);(0,react.useEffect)(()=>{setFormValues(formValues);// eslint-disable-next-line react-hooks/exhaustive-deps
},[stringifiedFormValues]);HandleMapEvents(panelRef);const onStart=data=>{props.onStart(data);};const onStop=()=>{props.onStop();};return/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{ref:panelRef,className:components_AutoTravellerPanel_module.panel,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("header",{className:components_AutoTravellerPanel_module.header,children:/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{className:components_AutoTravellerPanel_module.title,children:"Auto Traveller"})}),/*#__PURE__*/(0,jsx_runtime.jsxs)("form",{className:components_AutoTravellerPanel_module.form,onSubmit:handleSubmit(onStart),autoComplete:"off",children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("fieldset",{children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:components_AutoTravellerPanel_module.label,...(errors.targetDistanceKm&&{"data-tooltip":errors.targetDistanceKm.message}),children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:"Target distance (km)"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{...register("targetDistanceKm",{required:{value:true,message:"Please enter a distance"},pattern:{value:/^[0-9]*$/,message:"Must be a positive natural number."},min:{value:1,message:"Must be a positive natural number."}}),className:classnames_default()(components_AutoTravellerPanel_module.input,{[components_AutoTravellerPanel_module.inputError]:errors.targetDistanceKm}),type:"text"})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:components_AutoTravellerPanel_module.label,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:"Resource Used"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("select",{...register("resourceUsed",{required:true}),className:components_AutoTravellerPanel_module.select,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"preferCurrency",children:"Prefer Currency"}),/*#__PURE__*/(0,jsx_runtime.jsx)("option",{value:"preferTicket",children:"Prefer Tickets"})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("label",{className:components_AutoTravellerPanel_module.label,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:"Travel back after finish"}),/*#__PURE__*/(0,jsx_runtime.jsx)("input",{...register("travelBackAfterFinish"),className:components_AutoTravellerPanel_module.checkbox,type:"checkbox"})]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{className:components_AutoTravellerPanel_module.actionBar,children:[props.state!==AutoTravelFormState.IDLE&&/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:components_AutoTravellerPanel_module.start,type:"button",onClick:onStop,disabled:props.state===AutoTravelFormState.STOPPING,children:"Stop"}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:components_AutoTravellerPanel_module.start,type:"submit",disabled:props.state!==AutoTravelFormState.IDLE,children:"Start"})]})]})]});};
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(250);
;// CONCATENATED MODULE: ./src/utils/render.ts
function renderElement(jsxElement){const div=document.createElement("div");const root=(0,client/* createRoot */.s)(div);root.render(jsxElement);return{before:element=>{if(!element){throw Error("Can't find element to insert before");}element.insertAdjacentElement("beforebegin",div);},after:element=>{if(!element){throw Error("Can't find element to insert after");}element.insertAdjacentElement("afterend",div);}};}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[2]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[8].use[3]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[4]!./src/features/an-amazing-journey/components/CollapseButtonPanel.module.scss
var CollapseButtonPanel_module = __webpack_require__(103);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/CollapseButtonPanel.module.scss

      
      
      
      
      
      
      
      
      

var CollapseButtonPanel_module_options = {};

CollapseButtonPanel_module_options.styleTagTransform = (styleTagTransform_default());
CollapseButtonPanel_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      CollapseButtonPanel_module_options.insert = insertBySelector_default().bind(null, "head");
    
CollapseButtonPanel_module_options.domAPI = (styleDomAPI_default());
CollapseButtonPanel_module_options.insertStyleElement = (insertStyleElement_default());

var CollapseButtonPanel_module_update = injectStylesIntoStyleTag_default()(CollapseButtonPanel_module/* default */.Z, CollapseButtonPanel_module_options);




       /* harmony default export */ const components_CollapseButtonPanel_module = (CollapseButtonPanel_module/* default */.Z && CollapseButtonPanel_module/* default */.Z.locals ? CollapseButtonPanel_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/CollapseButtonPanel.tsx
const CollapseButtonPanel=props=>{const panelRef=(0,react.useRef)(null);HandleMapEvents(panelRef);return/*#__PURE__*/(0,jsx_runtime.jsx)("section",{ref:panelRef,className:classnames_default()(components_CollapseButtonPanel_module.panel,{[components_CollapseButtonPanel_module.isCollapsed]:props.isCollapsed}),children:/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:classnames_default()(components_CollapseButtonPanel_module.button,{[components_CollapseButtonPanel_module.isCollapsed]:props.isCollapsed}),onClick:()=>props.onClick(!props.isCollapsed),title:props.isCollapsed?"Expand Auto Traveller":"Collapse Auto Traveller",children:/*#__PURE__*/(0,jsx_runtime.jsx)("svg",{fill:"#000000",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{d:"M15.2928932,12 L12.1464466,8.85355339 C11.9511845,8.65829124 11.9511845,8.34170876 12.1464466,8.14644661 C12.3417088,7.95118446 12.6582912,7.95118446 12.8535534,8.14644661 L16.8535534,12.1464466 C17.0488155,12.3417088 17.0488155,12.6582912 16.8535534,12.8535534 L12.8535534,16.8535534 C12.6582912,17.0488155 12.3417088,17.0488155 12.1464466,16.8535534 C11.9511845,16.6582912 11.9511845,16.3417088 12.1464466,16.1464466 L15.2928932,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 C4,12.2238576 4.22385763,12 4.5,12 L15.2928932,12 Z M19,5.5 C19,5.22385763 19.2238576,5 19.5,5 C19.7761424,5 20,5.22385763 20,5.5 L20,19.5 C20,19.7761424 19.7761424,20 19.5,20 C19.2238576,20 19,19.7761424 19,19.5 L19,5.5 Z"})})})});};
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[2]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[8].use[3]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[4]!./src/features/an-amazing-journey/components/TravelProgressPanel.module.scss
var TravelProgressPanel_module = __webpack_require__(493);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/TravelProgressPanel.module.scss

      
      
      
      
      
      
      
      
      

var TravelProgressPanel_module_options = {};

TravelProgressPanel_module_options.styleTagTransform = (styleTagTransform_default());
TravelProgressPanel_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      TravelProgressPanel_module_options.insert = insertBySelector_default().bind(null, "head");
    
TravelProgressPanel_module_options.domAPI = (styleDomAPI_default());
TravelProgressPanel_module_options.insertStyleElement = (insertStyleElement_default());

var TravelProgressPanel_module_update = injectStylesIntoStyleTag_default()(TravelProgressPanel_module/* default */.Z, TravelProgressPanel_module_options);




       /* harmony default export */ const components_TravelProgressPanel_module = (TravelProgressPanel_module/* default */.Z && TravelProgressPanel_module/* default */.Z.locals ? TravelProgressPanel_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/utils/format.ts
function formatNumber(number){return number.toLocaleString("en-US");}function formatStringNumberToInt(value){const string=String(value);return parseInt(string);}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[2]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[8].use[3]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[4]!./src/features/an-amazing-journey/components/StatusIndicator.module.scss
var StatusIndicator_module = __webpack_require__(990);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/StatusIndicator.module.scss

      
      
      
      
      
      
      
      
      

var StatusIndicator_module_options = {};

StatusIndicator_module_options.styleTagTransform = (styleTagTransform_default());
StatusIndicator_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      StatusIndicator_module_options.insert = insertBySelector_default().bind(null, "head");
    
StatusIndicator_module_options.domAPI = (styleDomAPI_default());
StatusIndicator_module_options.insertStyleElement = (insertStyleElement_default());

var StatusIndicator_module_update = injectStylesIntoStyleTag_default()(StatusIndicator_module/* default */.Z, StatusIndicator_module_options);




       /* harmony default export */ const components_StatusIndicator_module = (StatusIndicator_module/* default */.Z && StatusIndicator_module/* default */.Z.locals ? StatusIndicator_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/StatusIndicator.tsx
const StatusIndicator=props=>{return/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:components_StatusIndicator_module.statusIndicator,children:[props.status===TravelProgressStatus.InProgress&&/*#__PURE__*/(0,jsx_runtime.jsxs)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",className:components_StatusIndicator_module.inProgress,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("path",{d:"M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z",fill:"currentColor",opacity:".25"}),/*#__PURE__*/(0,jsx_runtime.jsx)("path",{d:"M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z",fill:"currentColor",className:components_StatusIndicator_module.spinner})]}),props.status===TravelProgressStatus.Completed&&/*#__PURE__*/(0,jsx_runtime.jsx)("svg",{height:"24",width:"24",viewBox:"0 -960 960 960",xmlns:"http://www.w3.org/2000/svg",className:components_StatusIndicator_module.completed,children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"})}),props.status===TravelProgressStatus.Error&&/*#__PURE__*/(0,jsx_runtime.jsx)("svg",{height:"24",width:"24",viewBox:"0 -960 960 960",xmlns:"http://www.w3.org/2000/svg",className:components_StatusIndicator_module.error,children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"})})]});};
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/TravelProgressPanel.tsx
let TravelProgressStatus=/*#__PURE__*/function(TravelProgressStatus){TravelProgressStatus[TravelProgressStatus["InProgress"]=0]="InProgress";TravelProgressStatus[TravelProgressStatus["Completed"]=1]="Completed";TravelProgressStatus[TravelProgressStatus["Error"]=2]="Error";return TravelProgressStatus;}({});const TravelProgressPanel=props=>{const panelRef=(0,react.useRef)(null);HandleMapEvents(panelRef);return/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{ref:panelRef,className:components_TravelProgressPanel_module.panel,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("header",{className:components_TravelProgressPanel_module.header,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("h2",{className:components_TravelProgressPanel_module.title,children:"Travel Progress"}),/*#__PURE__*/(0,jsx_runtime.jsx)(StatusIndicator,{status:props.state.status})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:components_TravelProgressPanel_module.rows,children:[/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:components_TravelProgressPanel_module.row,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:components_TravelProgressPanel_module.key,children:"Travels"}),/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:components_TravelProgressPanel_module.value,children:formatNumber(props.state.travelsCompleted)})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:components_TravelProgressPanel_module.row,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:components_TravelProgressPanel_module.key,children:"Distance"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{className:components_TravelProgressPanel_module.value,children:[formatNumber(props.state.travelledDistanceKm)," km"]})]}),/*#__PURE__*/(0,jsx_runtime.jsxs)("div",{className:components_TravelProgressPanel_module.row,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{className:components_TravelProgressPanel_module.key,children:"Resources"}),/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{className:components_TravelProgressPanel_module.value,children:[formatNumber(props.state.resourcesSpent.amount)," ",props.state.resourcesSpent.unit]})]})]})]});};
;// CONCATENATED MODULE: ./src/requests/travel-request.ts
let Travel;(function(_Travel){async function sendRequest(body){const response=fetch("https://www.erepublik.com/en/main/travel",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded",...getCookieHeaders()},body:objectToWwwFormUrlEncoded(body)});return response.then(response=>response.json());}_Travel.sendRequest=sendRequest;})(Travel||(Travel={}));
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/regions.ts
const MazuriaRegionId="423";const MazoviaRegionId="424";const travelRouteTest={regionIdA:MazuriaRegionId,regionIdB:MazoviaRegionId};const WellingtonRegionId="714";const CastillaYLeonRegionId="173";const travelRouteMain={regionIdA:CastillaYLeonRegionId,regionIdB:WellingtonRegionId};function findCountryIdFor(regionId,countries){var _Object$values$find;const countryId=(_Object$values$find=Object.values(countries).find(country=>{const currentRegions=country.currentRegions;if(typeof currentRegions==="number"){return currentRegions===Number(regionId);}if(typeof currentRegions==="string"){return currentRegions.split(",").includes(regionId);}return false;}))===null||_Object$values$find===void 0?void 0:_Object$values$find.id;if(!countryId){throw new Error("Cannot find countryId for regionId ".concat(regionId));}return String(countryId);}
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/travel.ts
function createNewTravelProgressState(unit){return{status:TravelProgressStatus.InProgress,travelledDistanceKm:0,travelsCompleted:0,resourcesSpent:{amount:0,unit:unit}};}async function executeTravel(nextTargetRegionId,form,countriesCache){let travelInfo;try{log("Getting travel info for region ".concat(nextTargetRegionId,"..."));travelInfo=await getTravelInfoTo(nextTargetRegionId);log("Got travel info for region ".concat(nextTargetRegionId),travelInfo);}catch(e){throw Error("Failed to get travel info for region ".concat(nextTargetRegionId),{cause:e});}try{log("Travelling to region ".concat(nextTargetRegionId,"..."));await travelTo(nextTargetRegionId,form.resourceUsed,countriesCache);log("Travelled to region ".concat(nextTargetRegionId));}catch(e){throw Error("Failed to travel to region ".concat(nextTargetRegionId),{cause:e});}return travelInfo;}async function getTravelInfoTo(regionId){const response=await TravelData.sendRequest({_token:getCsrfToken(),battleId:"0",regionId:regionId,holdingId:"0"});return{distanceKm:response.regions[regionId].distanceInKm,currencyCost:response.regions[regionId].cost,ticketCost:response.regions[regionId].ticketAmount};}async function travelTo(regionId,travelMethod,countriesCache){const response=await Travel.sendRequest({_token:getCsrfToken(),travelMethod:travelMethod,battleId:"0",inRegionId:regionId,toCountryId:findCountryIdFor(regionId,await countriesCache.getCountries())});if(response.error===1){throw Error("Failed to travel to ".concat(regionId,": ").concat(response.message));}}
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[2]!./node_modules/resolve-url-loader/index.js??ruleSet[1].rules[1].oneOf[8].use[3]!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[1].oneOf[8].use[4]!./src/features/an-amazing-journey/components/ErrorPanel.module.scss
var ErrorPanel_module = __webpack_require__(978);
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/ErrorPanel.module.scss

      
      
      
      
      
      
      
      
      

var ErrorPanel_module_options = {};

ErrorPanel_module_options.styleTagTransform = (styleTagTransform_default());
ErrorPanel_module_options.setAttributes = (setAttributesWithoutAttributes_default());

      ErrorPanel_module_options.insert = insertBySelector_default().bind(null, "head");
    
ErrorPanel_module_options.domAPI = (styleDomAPI_default());
ErrorPanel_module_options.insertStyleElement = (insertStyleElement_default());

var ErrorPanel_module_update = injectStylesIntoStyleTag_default()(ErrorPanel_module/* default */.Z, ErrorPanel_module_options);




       /* harmony default export */ const components_ErrorPanel_module = (ErrorPanel_module/* default */.Z && ErrorPanel_module/* default */.Z.locals ? ErrorPanel_module/* default */.Z.locals : undefined);

;// CONCATENATED MODULE: ./src/features/an-amazing-journey/components/ErrorPanel.tsx
const ErrorPanel=props=>{const panelRef=(0,react.useRef)(null);HandleMapEvents(panelRef);return/*#__PURE__*/(0,jsx_runtime.jsxs)("section",{ref:panelRef,className:components_ErrorPanel_module.panel,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("div",{className:components_ErrorPanel_module.errors,children:props.errors.map((error,index)=>{var _error$cause;return/*#__PURE__*/(0,jsx_runtime.jsxs)("p",{className:components_ErrorPanel_module.error,children:[/*#__PURE__*/(0,jsx_runtime.jsx)("span",{children:error.toString()}),(error.cause||null)&&/*#__PURE__*/(0,jsx_runtime.jsxs)("span",{children:[/*#__PURE__*/(0,jsx_runtime.jsx)("br",{}),"Caused by: ",(_error$cause=error.cause)===null||_error$cause===void 0?void 0:_error$cause.toString()]})]},index);})}),/*#__PURE__*/(0,jsx_runtime.jsx)("button",{className:components_ErrorPanel_module.close,title:"Dismiss",onClick:props.onClose,children:/*#__PURE__*/(0,jsx_runtime.jsx)("svg",{width:"24",height:"24",viewBox:"0 -960 960 960",xmlns:"http://www.w3.org/2000/svg",children:/*#__PURE__*/(0,jsx_runtime.jsx)("path",{fill:"currentColor",d:"m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"})})})]});};
;// CONCATENATED MODULE: ./src/features/an-amazing-journey/index.tsx
const countriesCache=new CountriesCache();const TIMER_INTERVAL_MS=5000;const currentTravelRoute=travelRouteTest;const AnAmazingJourneyFeature=createFeature({name:"An Amazing Journey",description:"An Amazing Journey is a feature where you auto travel between 2 locations to maximize efficiency of a distance travel.",canExecute:url=>url.includes("/main/anniversaryQuest"),execute:async()=>{renderElement(/*#__PURE__*/(0,jsx_runtime.jsx)(JourneyFeatureComponent,{})).before(document.querySelector("#cityInfoTopPopup"));}});const JourneyFeatureComponent=()=>{const[isCollapsed,setIsCollapsed]=useLocalStorage("AnAmazingJourney.isCollapsed",false);const[travelProgressState,setTravelProgressState]=(0,react.useState)();const[travelFormState,setTravelFormState]=(0,react.useState)(AutoTravelFormState.IDLE);const[shouldStop,setShouldStop]=(0,react.useState)(false);const shouldStopRef=(0,react.useRef)(shouldStop);(0,react.useEffect)(()=>{shouldStopRef.current=shouldStop;},[shouldStop]);const[errors,setErrors]=(0,react.useState)([]);const onStart=async form=>{log("Starting...",form);setTravelFormState(AutoTravelFormState.STARTED);const currencyUnit=form.resourceUsed==="preferCurrency"?getCitizenshipCurrencyName():"tickets";let travelledDistanceKm=0;setTravelProgressState(createNewTravelProgressState(currencyUnit));const initialRegionId=await countriesCache.getCurrentRegionId({skipCache:true});let nextTargetRegionId=initialRegionId===currentTravelRoute.regionIdA?currentTravelRoute.regionIdB:currentTravelRoute.regionIdA;let setIntervalId;const handleStop=async errorMessage=>{if(errorMessage){log("Stopping due to error: ".concat(errorMessage));}else{log("Stopping...");}const stopInternalHandler=async()=>{setShouldStop(false);setTravelProgressState(state=>{if(state){return{...state,status:errorMessage?TravelProgressStatus.Error:TravelProgressStatus.Completed,errorMessage};}return state;});// Stop button should be disabled immediately
setTravelFormState(AutoTravelFormState.STOPPING);// Start button should be enabled after 5 seconds
// to prevent spamming the server
setTimeout(()=>{setTravelFormState(AutoTravelFormState.IDLE);},TIMER_INTERVAL_MS);};clearInterval(setIntervalId);const isInInitialRegion=(await countriesCache.getCurrentRegionId({skipCache:true}))===initialRegionId;if(form.travelBackAfterFinish&&!isInInitialRegion){log("Waiting ".concat(TIMER_INTERVAL_MS,"ms to travel back..."));setTimeout(async()=>{const travelInfo=await executeTravel(initialRegionId,form,countriesCache);updateTravelProgressState(travelInfo);stopInternalHandler();},TIMER_INTERVAL_MS);}else{log("Stopping immediately...");stopInternalHandler();}};function updateTravelProgressState(travelInfo){const resourcesAmountSpentThisTravel=form.resourceUsed==="preferTicket"?travelInfo.ticketCost:travelInfo.currencyCost;travelledDistanceKm+=travelInfo.distanceKm;setTravelProgressState(state=>{if(state){return{...state,travelledDistanceKm:travelledDistanceKm,travelsCompleted:state.travelsCompleted+1,resourcesSpent:{amount:state.resourcesSpent.amount+resourcesAmountSpentThisTravel,unit:state.resourcesSpent.unit}};}return state;});}const callbackLogic=async()=>{if(shouldStopRef.current){await handleStop();return;}let travelInfo=await executeTravel(nextTargetRegionId,form,countriesCache);updateTravelProgressState(travelInfo);nextTargetRegionId=nextTargetRegionId===currentTravelRoute.regionIdA?currentTravelRoute.regionIdB:currentTravelRoute.regionIdA;if(travelledDistanceKm>=Number(form.targetDistanceKm)){await handleStop();}};const callback=async()=>{try{await callbackLogic();}catch(e){setErrors(errors=>[...errors,e]);error(e);try{await handleStop(e.message);}catch(e2){setErrors(errors=>[...errors,e2]);error(e2);}}};await callback();setIntervalId=window.setInterval(callback,TIMER_INTERVAL_MS);};const onStop=()=>{log("Stopping manually...");setTravelFormState(AutoTravelFormState.STOPPING);setShouldStop(true);};const onErrorClose=()=>{setErrors([]);};return/*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[/*#__PURE__*/(0,jsx_runtime.jsx)(CollapseButtonPanel,{isCollapsed:isCollapsed,onClick:setIsCollapsed}),!isCollapsed&&/*#__PURE__*/(0,jsx_runtime.jsx)(AutoTravellerPanel,{onStart:onStart,onStop:onStop,state:travelFormState}),!isCollapsed&&travelProgressState&&/*#__PURE__*/(0,jsx_runtime.jsx)(TravelProgressPanel,{state:travelProgressState}),errors.length>0&&/*#__PURE__*/(0,jsx_runtime.jsx)(ErrorPanel,{onClose:onErrorClose,errors:errors})]});};
;// CONCATENATED MODULE: ./src/index.tsx
log("React script has successfully started");const features=[AnAmazingJourneyFeature];async function onUrlChange(){log("Testing ".concat(features.length," features"));let executedWithSuccess=0;for(const feature of features){if(feature.canExecute(window.location.href)){try{await feature.execute();executedWithSuccess++;}catch(e){error("Feature ".concat(feature.name," failed to execute"));error(e);}}}log("Executed ".concat(executedWithSuccess,"/").concat(features.length," features"));}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",watchForUrlChange);}else{watchForUrlChange();}function watchForUrlChange(){// Call `onUrlChange()` every time the page URL changes, including on first load.
addLocationChangeCallback(()=>{// Greasemonkey doesn't bubble errors up to the onUrlChange console,
// so we have to catch them manually and log them
onUrlChange().catch(e=>{log(e);});});}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
        })(window.originalMap)