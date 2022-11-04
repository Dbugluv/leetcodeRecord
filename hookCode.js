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



// 组件初始化的时候，每一个hook执行，都会调用 mountWorkInProgressHook

function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,  // useState中 保存 state信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和deps ｜ useRef中保存的是ref 对象
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  if (workInProgressHook === null) { // 例子中的第一个`hooks`-> useState(0) 走的就是这样。
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}

//dispatchAction 无状态组件更新机制
// useState和useReducer触发函数更新的方法都是dispatchAction

function dispatchAction(fiber, queue, action) {

  // 计算 expirationTime 过程略过。
  /* 创建一个update */
  const update= {
    expirationTime,
    suspenseConfig,
    action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  }
  /* 把创建的update */
  const pending = queue.pending;
  if (pending === null) {  // 证明第一次更新
    update.next = update;
  } else { // 不是第一次更新
    update.next = pending.next;
    pending.next = update;
  }
  
  queue.pending = update;
  const alternate = fiber.alternate;
  /* 判断当前是否在渲染阶段 
  dispatchAction第二步就是判断当前函数组件的fiber对象是否处于渲染阶段，如果处于渲染阶段，
  那么不需要我们在更新当前函数组件，只需要更新一下当前update的expirationTime即可。*/
  if ( fiber === currentlyRenderingFiber || (alternate !== null && alternate === currentlyRenderingFiber)) {
    didScheduleRenderPhaseUpdate = true;
    update.expirationTime = renderExpirationTime;
    currentlyRenderingFiber.expirationTime = renderExpirationTime;
  } else { /* 当前函数组件对应fiber没有处于调和渲染阶段 ，那么获取最新state , 执行更新 */
    if (fiber.expirationTime === NoWork && (alternate === null || alternate.expirationTime === NoWork)) {
      const lastRenderedReducer = queue.lastRenderedReducer;
      if (lastRenderedReducer !== null) {
        let prevDispatcher;
        try {
          const currentState = queue.lastRenderedState; /* 上一次的state */
          const eagerState = lastRenderedReducer(currentState, action); /*
          调用lastRenderedReducer获取最新的state,和上一次的currentState，进行浅比较，如果相等，*/
          update.eagerReducer = lastRenderedReducer;
          update.eagerState = eagerState;
          if (is(eagerState, currentState)) { 
            return
          }
        } 
      }
    }
    scheduleUpdateOnFiber(fiber, expirationTime);
  }
}

function mountEffect( // 在组件第一次渲染的时候会调用mountEffect方法
  create,
  deps,
) {
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookEffectTag, 
    create, // useEffect 第一次参数，就是副作用函数
    undefined,
    nextDeps, // useEffect 第二次参数，deps
  );
}
