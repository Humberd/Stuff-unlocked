declare var angular: any;

export function getAngularjsControllerScope<T>(controllerName: string): T {
  var controllerScope = getAngularjsControllerScopeOrNull<T>(controllerName);
  if (!controllerScope) {
    throw new Error(`Controller ${controllerName} not found`);
  }

  return controllerScope;
}

export function getAngularjsControllerScopeOrNull<T>(
  controllerName: string,
): T | null {
  var controllerElement = document.querySelector(
    `[ng-controller="${controllerName}"]`,
  );
  var controllerScope = angular.element(controllerElement).scope();
  if (!controllerScope) {
    return null;
  }

  return controllerScope as T;
}

export function wrapAngularjsCallback(
  controller: any,
  field: string,
  callback: Function,
  where: 'before' | 'after' = 'before',
) {
  var originalCallback = controller[field];
  controller[field] = function (this: any) {
    if (where === 'before') {
      callback.apply(this, arguments);
    }
    originalCallback.apply(this, arguments);
    if (where === 'after') {
      callback.apply(this, arguments);
    }
  };
}

export function executeInAngularScope(callback: () => void) {
  const scope = angular.element(document.body).scope();
  scope.$apply(callback);
}