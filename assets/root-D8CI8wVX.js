import{r as i,j as e}from"./jsx-runtime-JVR6BLX4.js";import{u as m,w as x,x as h,y,_ as S,O as j,M as w,L as g,S as k}from"./components-DTjhsaST.js";/**
 * @remix-run/react v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:t,...l}){let{isSpaMode:c}=m(),o=x(),u=h();y({getKey:t,storageKey:a});let p=i.useMemo(()=>{if(!t)return null;let r=t(o,u);return r!==o.key?r:null},[]);if(c)return null;let d=((r,f)=>{if(!window.history.state||!window.history.state.key){let s=Math.random().toString(32).slice(2);window.history.replaceState({key:s},"")}try{let n=JSON.parse(sessionStorage.getItem(r)||"{}")[f||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(s){console.error(s),sessionStorage.removeItem(r)}}).toString();return i.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${d})(${JSON.stringify(a)}, ${JSON.stringify(p)})`}}))}function $({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("link",{rel:"manifest",href:"/portfolio-react/app.webmanifest"}),e.jsx("link",{rel:"shortcut icon",href:"/portfolio-react/react-favicon.png",type:"image/x-icon"}),e.jsx(w,{}),e.jsx(g,{})]}),e.jsxs("body",{children:[t,e.jsx(M,{}),e.jsx(k,{})]})]})}function b(){return e.jsx(j,{})}function v(){return e.jsx("p",{children:"Loading..."})}export{v as HydrateFallback,$ as Layout,b as default};
