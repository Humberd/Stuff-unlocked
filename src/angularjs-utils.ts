export function getAngularjsControllerScope<T>(controllerName: string): T {
  const controllerScope = getAngularjsControllerScopeOrNull<T>(controllerName);
  if (!controllerScope) {
    throw new Error(`Controller ${controllerName} not found`);
  }

  return controllerScope;
}

export function getAngularjsControllerScopeOrNull<T>(
  controllerName: string,
): T | null {
  const controllerElement = document.querySelector(
    `[ng-controller="${controllerName}"]`,
  );
  const controllerScope = angular.element(controllerElement).scope();
  if (!controllerScope) {
    return null;
  }

  return controllerScope as T;
}

/**
 * Replaces `controller[field]` with a function that calls the original one
 * and `callback`, either before or after it.
 * Returns a function that puts the original one back.
 */
export function wrapAngularjsCallback<
  C extends object,
  K extends keyof C & string,
>(
  controller: C,
  field: K,
  callback: (this: C, ...args: Parameters<Extract<C[K], AnyFunction>>) => void,
  where: "before" | "after" = "before",
) {
  const originalCallback = controller[field] as AnyFunction;
  const wrapped = function (this: C, ...args: unknown[]) {
    if (where === "before") {
      callback.apply(this, args as Parameters<typeof callback>);
    }
    originalCallback.apply(this, args);
    if (where === "after") {
      callback.apply(this, args as Parameters<typeof callback>);
    }
  };
  controller[field] = wrapped as C[K];

  return () => {
    if (controller[field] === wrapped) {
      controller[field] = originalCallback as C[K];
    }
  };
}

export function executeInAngularScope(callback: () => void) {
  const scope = angular.element(document.body).scope();
  if (!scope) {
    throw new Error("Angular root scope not found");
  }
  scope.$apply(callback);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => unknown;
