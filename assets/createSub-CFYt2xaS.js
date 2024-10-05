import{r as R}from"./jsx-runtime-JVR6BLX4.js";const T={"@@functional/placeholder":!0};function l(r){return r===T}function p(r){return function t(e){return arguments.length===0||l(e)?t:r.apply(this,arguments)}}function C(r){return function t(e,n){switch(arguments.length){case 0:return t;case 1:return l(e)?t:p(function(a){return r(e,a)});default:return l(e)&&l(n)?t:l(e)?p(function(a){return r(a,n)}):l(n)?p(function(a){return r(e,a)}):r(e,n)}}}function k(r,t){switch(r){case 0:return function(){return t.apply(this,arguments)};case 1:return function(e){return t.apply(this,arguments)};case 2:return function(e,n){return t.apply(this,arguments)};case 3:return function(e,n,a){return t.apply(this,arguments)};case 4:return function(e,n,a,o){return t.apply(this,arguments)};case 5:return function(e,n,a,o,s){return t.apply(this,arguments)};case 6:return function(e,n,a,o,s,f){return t.apply(this,arguments)};case 7:return function(e,n,a,o,s,f,c){return t.apply(this,arguments)};case 8:return function(e,n,a,o,s,f,c,O){return t.apply(this,arguments)};case 9:return function(e,n,a,o,s,f,c,O,B){return t.apply(this,arguments)};case 10:return function(e,n,a,o,s,f,c,O,B,tr){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function F(r,t,e){return function(){for(var n=[],a=0,o=r,s=0,f=!1;s<t.length||a<arguments.length;){var c;s<t.length&&(!l(t[s])||a>=arguments.length)?c=t[s]:(c=arguments[a],a+=1),n[s]=c,l(c)?f=!0:o-=1,s+=1}return!f&&o<=0?e.apply(this,n):k(Math.max(0,o),F(r,n,e))}}var V=C(function(t,e){return t===1?p(e):k(t,F(t,[],e))});const X=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function q(r){return r!=null&&typeof r["@@transducer/step"]=="function"}function N(r,t,e){return function(){if(arguments.length===0)return e();var n=arguments[arguments.length-1];if(!X(n)){for(var a=0;a<r.length;){if(typeof n[r[a]]=="function")return n[r[a]].apply(n,Array.prototype.slice.call(arguments,0,-1));a+=1}if(q(n)){var o=t.apply(null,Array.prototype.slice.call(arguments,0,-1));return o(n)}}return e.apply(this,arguments)}}const E={init:function(){return this.xf["@@transducer/init"]()},result:function(r){return this.xf["@@transducer/result"](r)}};function w(r,t){return Object.prototype.hasOwnProperty.call(t,r)}var P=Object.prototype.toString,D=function(){return P.call(arguments)==="[object Arguments]"?function(t){return P.call(t)==="[object Arguments]"}:function(t){return w("callee",t)}}(),G=!{toString:null}.propertyIsEnumerable("toString"),j=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],I=function(){return arguments.propertyIsEnumerable("length")}(),H=function(t,e){for(var n=0;n<t.length;){if(t[n]===e)return!0;n+=1}return!1},J=p(typeof Object.keys=="function"&&!I?function(t){return Object(t)!==t?[]:Object.keys(t)}:function(t){if(Object(t)!==t)return[];var e,n,a=[],o=I&&D(t);for(e in t)w(e,t)&&(!o||e!=="length")&&(a[a.length]=e);if(G)for(n=j.length-1;n>=0;)e=j[n],w(e,t)&&!H(a,e)&&(a[a.length]=e),n-=1;return a});function K(r,t){for(var e=0,n=t.length,a=Array(n);e<n;)a[e]=r(t[e]),e+=1;return a}function Q(r,t,e){for(var n=0,a=e.length;n<a;)t=r(t,e[n]),n+=1;return t}var U=function(){function r(t,e){this.xf=e,this.f=t}return r.prototype["@@transducer/init"]=E.init,r.prototype["@@transducer/result"]=E.result,r.prototype["@@transducer/step"]=function(t,e){return this.xf["@@transducer/step"](t,this.f(e))},r}(),W=function(t){return function(e){return new U(t,e)}},M=C(N(["fantasy-land/map","map"],W,function(t,e){switch(Object.prototype.toString.call(e)){case"[object Function]":return V(e.length,function(){return t.call(this,e.apply(this,arguments))});case"[object Object]":return Q(function(n,a){return n[a]=t(e[a]),n},{},J(e));default:return K(t,e)}})),L={exports:{}},u={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=Symbol.for("react.element"),A=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),m=Symbol.for("react.strict_mode"),g=Symbol.for("react.profiler"),h=Symbol.for("react.provider"),d=Symbol.for("react.context"),Y=Symbol.for("react.server_context"),v=Symbol.for("react.forward_ref"),b=Symbol.for("react.suspense"),S=Symbol.for("react.suspense_list"),_=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),z;z=Symbol.for("react.module.reference");function i(r){if(typeof r=="object"&&r!==null){var t=r.$$typeof;switch(t){case $:switch(r=r.type,r){case y:case g:case m:case b:case S:return r;default:switch(r=r&&r.$$typeof,r){case Y:case d:case v:case x:case _:case h:return r;default:return t}}case A:return t}}}u.ContextConsumer=d;u.ContextProvider=h;u.Element=$;u.ForwardRef=v;u.Fragment=y;u.Lazy=x;u.Memo=_;u.Portal=A;u.Profiler=g;u.StrictMode=m;u.Suspense=b;u.SuspenseList=S;u.isAsyncMode=function(){return!1};u.isConcurrentMode=function(){return!1};u.isContextConsumer=function(r){return i(r)===d};u.isContextProvider=function(r){return i(r)===h};u.isElement=function(r){return typeof r=="object"&&r!==null&&r.$$typeof===$};u.isForwardRef=function(r){return i(r)===v};u.isFragment=function(r){return i(r)===y};u.isLazy=function(r){return i(r)===x};u.isMemo=function(r){return i(r)===_};u.isPortal=function(r){return i(r)===A};u.isProfiler=function(r){return i(r)===g};u.isStrictMode=function(r){return i(r)===m};u.isSuspense=function(r){return i(r)===b};u.isSuspenseList=function(r){return i(r)===S};u.isValidElementType=function(r){return typeof r=="string"||typeof r=="function"||r===y||r===g||r===m||r===b||r===S||r===Z||typeof r=="object"&&r!==null&&(r.$$typeof===x||r.$$typeof===_||r.$$typeof===h||r.$$typeof===d||r.$$typeof===v||r.$$typeof===z||r.getModuleId!==void 0)};u.typeOf=i;L.exports=u;var rr=L.exports;function nr(r){const t=R.memo,e=n=>rr.isValidElementType(n)?t(n):M(e,n);return M(e,r)}export{l as _,C as a,p as b,nr as c,X as d,k as e};