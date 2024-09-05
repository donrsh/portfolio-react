import{r as m,g as j}from"./jsx-runtime-JVR6BLX4.js";var D={BASE_URL:"/portfolio-react/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const x=e=>{let t;const r=new Set,u=(s,f)=>{const c=typeof s=="function"?s(t):s;if(!Object.is(c,t)){const i=t;t=f??(typeof c!="object"||c===null)?c:Object.assign({},t,c),r.forEach(a=>a(t,i))}},n=()=>t,S={setState:u,getState:n,getInitialState:()=>p,subscribe:s=>(r.add(s),()=>r.delete(s)),destroy:()=>{(D?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},p=t=e(u,n,S);return S},J=e=>e?x(e):x;var w={exports:{}},g={},_={exports:{}},b={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=m;function O(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var $=typeof Object.is=="function"?Object.is:O,V=d.useState,R=d.useEffect,I=d.useLayoutEffect,k=d.useDebugValue;function q(e,t){var r=t(),u=V({inst:{value:r,getSnapshot:t}}),n=u[0].inst,o=u[1];return I(function(){n.value=r,n.getSnapshot=t,y(n)&&o({inst:n})},[e,r,t]),R(function(){return y(n)&&o({inst:n}),e(function(){y(n)&&o({inst:n})})},[e]),k(r),r}function y(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!$(e,r)}catch{return!0}}function A(e,t){return t()}var C=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?A:q;b.useSyncExternalStore=d.useSyncExternalStore!==void 0?d.useSyncExternalStore:C;_.exports=b;var L=_.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=m,M=L;function P(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var T=typeof Object.is=="function"?Object.is:P,B=M.useSyncExternalStore,F=E.useRef,U=E.useEffect,W=E.useMemo,z=E.useDebugValue;g.useSyncExternalStoreWithSelector=function(e,t,r,u,n){var o=F(null);if(o.current===null){var l={hasValue:!1,value:null};o.current=l}else l=o.current;o=W(function(){function S(i){if(!p){if(p=!0,s=i,i=u(i),n!==void 0&&l.hasValue){var a=l.value;if(n(a,i))return f=a}return f=i}if(a=f,T(s,i))return a;var h=u(i);return n!==void 0&&n(a,h)?a:(s=i,f=h)}var p=!1,s,f,c=r===void 0?null:r;return[function(){return S(t())},c===null?void 0:function(){return S(c())}]},[t,r,u,n]);var v=B(e,o[0],o[1]);return U(function(){l.hasValue=!0,l.value=v},[v]),z(v),v};w.exports=g;var G=w.exports;const K=j(G);export{J as c,K as u};
