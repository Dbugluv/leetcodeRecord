const ReactCurrentDispatcher = {
  current: null,
};

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current
  return dispatcher
}

export function useState(initialState){
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}


// important！
const ContextOnlyDispatcher = {
  useState:throwInvalidHookError
}
function throwInvalidHookError() {
invariant(
  false,
  'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for' +
    ' one of the following reasons:\n' +
    '1. You might have mismatching versions of React and the renderer (such as React DOM)\n' +
    '2. You might be breaking the Rules of Hooks\n' +
    '3. You might have more than one copy of React in the same app\n' +
    'See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.',
);
}

// Hook 对象
const HooksDispatcherOnMount = {
  useCallback: mountCallback,
  useEffect: mountEffect,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
};
const HooksDispatcherOnUpdate = {
  useCallback: updateCallback,
  useEffect: updateEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState
};

// renderWithHooks 执行函数

export function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  secondArg,
  nextRenderExpirationTime,
) {
  renderExpirationTime = nextRenderExpirationTime;
  currentlyRenderingFiber = workInProgress;

  workInProgress.memoizedState = null;  // 存放state信息，【在一次调和渲染过程中，以链表的形式存放hooks信息。】
  workInProgress.updateQueue = null;
  workInProgress.expirationTime = NoWork; // 确定更新的优先级。

  ReactCurrentDispatcher.current =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;

  let children = Component(props, secondArg);

  if (workInProgress.expirationTime === renderExpirationTime) { 
       // ....这里的逻辑我们先放一放
  }

  /* 由于js是单线程的，也就是说我们没有在函数组件中，调用的hooks，都是ContextOnlyDispatcher对象上调用hooks！
    这样通过执行的不同时期赋予不同的current ，判断 hooks 执行是否在组件内部。
  */
  ReactCurrentDispatcher.current = ContextOnlyDispatcher; 

  renderExpirationTime = NoWork;
  currentlyRenderingFiber = null;

  currentHook = null
  workInProgressHook = null;

  didScheduleRenderPhaseUpdate = false;

  return children;
}

// 组件初始化
renderWithHooks(
  null,                // current Fiber
  workInProgress,      // workInProgress Fiber
  Component,           // 函数组件本身
  props,               // props
  context,             // 上下文
  renderExpirationTime,// 渲染 ExpirationTime
);

//function组件更新：
renderWithHooks(
  current,
  workInProgress,
  render,
  nextProps,
  context,
  renderExpirationTime,
);