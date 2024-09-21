import{r as s,j as e}from"./jsx-runtime-JVR6BLX4.js";import{B as g}from"./button-CQLrvouU.js";import{c as m}from"./createLucideIcon-CPprh6VQ.js";import{T as k}from"./typogrphy-CnSYUxEe.js";import{d as p,e as M,O as j}from"./index-3XVkSrjk.js";import{u as w,m as S,_ as T,L as v,M as b,n as L,S as N}from"./components-Cc8OPAFj.js";import"./cn-DTPrpecD.js";import"./index-C1zmamBb.js";/**
 * @remix-run/react v2.9.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let u="positions";function I({getKey:t,...r}){let{isSpaMode:a}=w(),i=p(),n=M();S({getKey:t,storageKey:u});let l=s.useMemo(()=>{if(!t)return null;let o=t(i,n);return o!==i.key?o:null},[]);if(a)return null;let d=((o,y)=>{if(!window.history.state||!window.history.state.key){let c=Math.random().toString(32).slice(2);window.history.replaceState({key:c},"")}try{let h=JSON.parse(sessionStorage.getItem(o)||"{}")[y||window.history.state.key];typeof h=="number"&&window.scrollTo(0,h)}catch(c){console.error(c),sessionStorage.removeItem(o)}}).toString();return s.createElement("script",T({},r,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${d})(${JSON.stringify(u)}, ${JSON.stringify(l)})`}}))}const f=()=>{if(typeof window>"u")return"light";const t=localStorage.getItem("ui-theme-mode"),r=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return t??r??"light"},E={themeMode:f(),setThemeMode:()=>null,toggleThemeMode:()=>null},x=s.createContext(E);function H({children:t,defaultThemeMode:r=f(),storageKey:a="ui-theme-mode",...i}){const[n,l]=s.useState(()=>localStorage.getItem(a)||r);s.useEffect(()=>{const o=window.document.documentElement;o.classList.remove("light","dark"),o.classList.add(n),localStorage.setItem(a,n)},[n]);const d={themeMode:n,setThemeMode:o=>{localStorage.setItem(a,o),l(o)},toggleThemeMode:()=>{l(o=>o==="light"?"dark":"light")}};return e.jsx(x.Provider,{...i,value:d,children:t})}const R=()=>{const t=s.useContext(x);if(t===void 0)throw new Error("useThemeMode must be used within a ThemeModeProvider");return t};/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=m("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=m("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.441.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=m("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function $(){const{toggleThemeMode:t}=R(),[r,a]=s.useState(!1);return s.useEffect(()=>{setTimeout(()=>{a(!0)},100)},[]),r?e.jsxs(g,{variant:"outline",size:"icon",onClick:t,children:[e.jsx(P,{className:"h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"}),e.jsx(O,{className:"absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"}),e.jsx("span",{className:"sr-only",children:"Toggle theme"})]}):null}function z(){const{pathname:t}=p();return e.jsxs("header",{className:"px-4 py-6 flex items-center",children:[e.jsx(k,{variant:"h2",className:"mr-auto border-b-0 pb-0",children:e.jsx(v,{to:"/",children:t==="/"?"Don's React Portfolio":e.jsx(C,{className:"ml-1"})})}),e.jsx($,{})]})}function Y({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("link",{rel:"manifest",href:"/portfolio-react/app.webmanifest"}),e.jsx("link",{rel:"shortcut icon",href:"/portfolio-react/react-favicon.png",type:"image/x-icon"}),e.jsx(b,{}),e.jsx(L,{})]}),e.jsxs("body",{children:[t,e.jsx(I,{}),e.jsx(N,{})]})]})}function Z(){return e.jsxs(H,{children:[e.jsx(z,{}),e.jsx(j,{})]})}function G(){return e.jsx("p",{children:"Loading..."})}export{G as HydrateFallback,Y as Layout,Z as default};
