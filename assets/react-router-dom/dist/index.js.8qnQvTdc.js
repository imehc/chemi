import{r,$ as T}from"../../react/index.js.4247Uq6c.js";import"../../react-dom/index.js.CRFhJLVO.js";import{R as w}from"../../react-router/dist/index.js.nrn2ViLP.js";import{c as F}from"../../@remix-run/router/dist/router.js.KqmLvEzq.js";/**
 * React Router DOM v6.19.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const R="startTransition",l=T[R];function d(t){let{basename:S,children:f,future:h,window:p}=t,s=r.useRef();s.current==null&&(s.current=F({window:p,v5Compat:!0}));let e=s.current,[o,i]=r.useState({action:e.action,location:e.location}),{v7_startTransition:n}=h||{},a=r.useCallback(c=>{n&&l?l(()=>i(c)):i(c)},[i,n]);return r.useLayoutEffect(()=>e.listen(a),[e,a]),r.createElement(w,{basename:S,children:f,location:o.location,navigationType:o.action,navigator:e})}var u;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(u||(u={}));var m;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(m||(m={}));export{d as B};
//# sourceMappingURL=index.js.8qnQvTdc.js.map
