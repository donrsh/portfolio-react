import{r as _,g as Se,j as y}from"./jsx-runtime-JVR6BLX4.js";import{u as _e}from"./useToggler-DAZg9NR_.js";const xe={"@@functional/placeholder":!0};function c(e){return e===xe}function v(e){return function t(r){return arguments.length===0||c(r)?t:e.apply(this,arguments)}}function d(e){return function t(r,n){switch(arguments.length){case 0:return t;case 1:return c(r)?t:v(function(o){return e(r,o)});default:return c(r)&&c(n)?t:c(r)?v(function(o){return e(o,n)}):c(n)?v(function(o){return e(r,o)}):e(r,n)}}}function P(e,t){switch(e){case 0:return function(){return t.apply(this,arguments)};case 1:return function(r){return t.apply(this,arguments)};case 2:return function(r,n){return t.apply(this,arguments)};case 3:return function(r,n,o){return t.apply(this,arguments)};case 4:return function(r,n,o,u){return t.apply(this,arguments)};case 5:return function(r,n,o,u,i){return t.apply(this,arguments)};case 6:return function(r,n,o,u,i,a){return t.apply(this,arguments)};case 7:return function(r,n,o,u,i,a,p){return t.apply(this,arguments)};case 8:return function(r,n,o,u,i,a,p,L){return t.apply(this,arguments)};case 9:return function(r,n,o,u,i,a,p,L,O){return t.apply(this,arguments)};case 10:return function(r,n,o,u,i,a,p,L,O,M){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function se(e,t,r){return function(){for(var n=[],o=0,u=e,i=0,a=!1;i<t.length||o<arguments.length;){var p;i<t.length&&(!c(t[i])||o>=arguments.length)?p=t[i]:(p=arguments[o],o+=1),n[i]=p,c(p)?a=!0:u-=1,i+=1}return!a&&u<=0?r.apply(this,n):P(Math.max(0,u),se(e,n,r))}}var be=d(function(t,r){return t===1?v(r):P(t,se(t,[],r))});function G(e){return function t(r,n,o){switch(arguments.length){case 0:return t;case 1:return c(r)?t:d(function(u,i){return e(r,u,i)});case 2:return c(r)&&c(n)?t:c(r)?d(function(u,i){return e(u,n,i)}):c(n)?d(function(u,i){return e(r,u,i)}):v(function(u){return e(r,n,u)});default:return c(r)&&c(n)&&c(o)?t:c(r)&&c(n)?d(function(u,i){return e(u,i,o)}):c(r)&&c(o)?d(function(u,i){return e(u,n,i)}):c(n)&&c(o)?d(function(u,i){return e(r,u,i)}):c(r)?v(function(u){return e(u,n,o)}):c(n)?v(function(u){return e(r,u,o)}):c(o)?v(function(u){return e(r,n,u)}):e(r,n,o)}}}const Q=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function je(e){return e!=null&&typeof e["@@transducer/step"]=="function"}function Le(e,t,r){return function(){if(arguments.length===0)return r();var n=arguments[arguments.length-1];if(!Q(n)){for(var o=0;o<e.length;){if(typeof n[e[o]]=="function")return n[e[o]].apply(n,Array.prototype.slice.call(arguments,0,-1));o+=1}if(je(n)){var u=t.apply(null,Array.prototype.slice.call(arguments,0,-1));return u(n)}}return r.apply(this,arguments)}}const re={init:function(){return this.xf["@@transducer/init"]()},result:function(e){return this.xf["@@transducer/result"](e)}};function q(e,t){return Object.prototype.hasOwnProperty.call(t,e)}var ne=Object.prototype.toString,Oe=function(){return ne.call(arguments)==="[object Arguments]"?function(t){return ne.call(t)==="[object Arguments]"}:function(t){return q("callee",t)}}(),Ae=!{toString:null}.propertyIsEnumerable("toString"),oe=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],ue=function(){return arguments.propertyIsEnumerable("length")}(),Ce=function(t,r){for(var n=0;n<t.length;){if(t[n]===r)return!0;n+=1}return!1},Me=v(typeof Object.keys=="function"&&!ue?function(t){return Object(t)!==t?[]:Object.keys(t)}:function(t){if(Object(t)!==t)return[];var r,n,o=[],u=ue&&Oe(t);for(r in t)q(r,t)&&(!u||r!=="length")&&(o[o.length]=r);if(Ae)for(n=oe.length-1;n>=0;)r=oe[n],q(r,t)&&!Ce(o,r)&&(o[o.length]=r),n-=1;return o});function Pe(e,t){for(var r=0,n=t.length,o=Array(n);r<n;)o[r]=e(t[r]),r+=1;return o}function Te(e,t,r){for(var n=0,o=r.length;n<o;)t=e(t,r[n]),n+=1;return t}var Ie=function(){function e(t,r){this.xf=r,this.f=t}return e.prototype["@@transducer/init"]=re.init,e.prototype["@@transducer/result"]=re.result,e.prototype["@@transducer/step"]=function(t,r){return this.xf["@@transducer/step"](t,this.f(r))},e}(),$e=function(t){return function(r){return new Ie(t,r)}},ie=d(Le(["fantasy-land/map","map"],$e,function(t,r){switch(Object.prototype.toString.call(r)){case"[object Function]":return be(r.length,function(){return t.call(this,r.apply(this,arguments))});case"[object Object]":return Te(function(n,o){return n[o]=t(r[o]),n},{},Me(r));default:return Pe(t,r)}}));const ke=Number.isInteger||function(t){return t<<0===t};function ce(e){return Object.prototype.toString.call(e)==="[object String]"}function De(e,t){var r=e<0?t.length+e:e;return ce(t)?t.charAt(r):t[r]}var Fe=d(function(t,r){if(r!=null)return ke(t)?De(t,r):r[t]}),ze=v(function(t){return Q(t)?!0:!t||typeof t!="object"||ce(t)?!1:t.length===0?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1}),ae=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function Re(e,t,r){return function(o,u,i){if(ze(i))return e(o,u,i);if(i==null)return u;if(typeof i["fantasy-land/reduce"]=="function")return t(o,u,i,"fantasy-land/reduce");if(i[ae]!=null)return r(o,u,i[ae]());if(typeof i.next=="function")return r(o,u,i);if(typeof i.reduce=="function")return t(o,u,i,"reduce");throw new TypeError("reduce: list must be array or iterable")}}function Xe(e,t,r){for(var n=0,o=r.length;n<o;){if(t=e["@@transducer/step"](t,r[n]),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n+=1}return e["@@transducer/result"](t)}var Ne=d(function(t,r){return P(t.length,function(){return t.apply(r,arguments)})});function Ve(e,t,r){for(var n=r.next();!n.done;){if(t=e["@@transducer/step"](t,n.value),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n=r.next()}return e["@@transducer/result"](t)}function We(e,t,r,n){return e["@@transducer/result"](r[n](Ne(e["@@transducer/step"],e),t))}var He=Re(Xe,We,Ve),Be=function(){function e(t){this.f=t}return e.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},e.prototype["@@transducer/result"]=function(t){return t},e.prototype["@@transducer/step"]=function(t,r){return this.f(t,r)},e}();function Ye(e){return new Be(e)}var Je=G(function(e,t,r){return He(typeof e=="function"?Ye(e):e,t,r)});function Ke(e,t){return function(){return t.call(this,e.apply(this,arguments))}}function le(e,t){return function(){var r=arguments.length;if(r===0)return t();var n=arguments[r-1];return Q(n)||typeof n[e]!="function"?t.apply(this,arguments):n[e].apply(n,Array.prototype.slice.call(arguments,0,r-1))}}var Ue=G(le("slice",function(t,r,n){return Array.prototype.slice.call(n,t,r)})),qe=v(le("tail",Ue(1,1/0)));function Ge(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return P(arguments[0].length,Je(Ke,arguments[0],qe(arguments)))}var Qe=d(function(t,r){return r==null||r!==r?t:r}),Ze=G(function(t,r,n){var o=t(r),u=t(n);return o>u?-1:o<u?1:0}),et=d(function(t,r){return Array.prototype.slice.call(r,0).sort(function(n,o){for(var u=0,i=0;u===0&&i<t.length;)u=t[i](n,o),i+=1;return u})}),fe={exports:{}},s={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Z=Symbol.for("react.element"),ee=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),I=Symbol.for("react.strict_mode"),$=Symbol.for("react.profiler"),k=Symbol.for("react.provider"),D=Symbol.for("react.context"),tt=Symbol.for("react.server_context"),F=Symbol.for("react.forward_ref"),z=Symbol.for("react.suspense"),R=Symbol.for("react.suspense_list"),X=Symbol.for("react.memo"),N=Symbol.for("react.lazy"),rt=Symbol.for("react.offscreen"),pe;pe=Symbol.for("react.module.reference");function w(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case Z:switch(e=e.type,e){case T:case $:case I:case z:case R:return e;default:switch(e=e&&e.$$typeof,e){case tt:case D:case F:case N:case X:case k:return e;default:return t}}case ee:return t}}}s.ContextConsumer=D;s.ContextProvider=k;s.Element=Z;s.ForwardRef=F;s.Fragment=T;s.Lazy=N;s.Memo=X;s.Portal=ee;s.Profiler=$;s.StrictMode=I;s.Suspense=z;s.SuspenseList=R;s.isAsyncMode=function(){return!1};s.isConcurrentMode=function(){return!1};s.isContextConsumer=function(e){return w(e)===D};s.isContextProvider=function(e){return w(e)===k};s.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Z};s.isForwardRef=function(e){return w(e)===F};s.isFragment=function(e){return w(e)===T};s.isLazy=function(e){return w(e)===N};s.isMemo=function(e){return w(e)===X};s.isPortal=function(e){return w(e)===ee};s.isProfiler=function(e){return w(e)===$};s.isStrictMode=function(e){return w(e)===I};s.isSuspense=function(e){return w(e)===z};s.isSuspenseList=function(e){return w(e)===R};s.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===T||e===$||e===I||e===z||e===R||e===rt||typeof e=="object"&&e!==null&&(e.$$typeof===N||e.$$typeof===X||e.$$typeof===k||e.$$typeof===D||e.$$typeof===F||e.$$typeof===pe||e.getModuleId!==void 0)};s.typeOf=w;fe.exports=s;var nt=fe.exports;function ot(e){const t=_.memo,r=n=>nt.isValidElementType(n)?t(n):ie(r,n);return ie(r,e)}var me={exports:{}};(function(e){var t=Object.assign||function(n){for(var o,u=1;u<arguments.length;u++)for(var i in o=arguments[u],o)Object.prototype.hasOwnProperty.call(o,i)&&(n[i]=o[i]);return n},r=function(n,o){if(n){typeof window<"u"&&function(){function l(m,E){E=E||{bubbles:!1,cancelable:!1,detail:void 0};var x=document.createEvent("CustomEvent");return x.initCustomEvent(m,E.bubbles,E.cancelable,E.detail),x}return typeof window.CustomEvent!="function"&&(l.prototype=window.Event.prototype,void(window.CustomEvent=l))}(),o||(o={}),o=t({},{minHorizontal:10,minVertical:10,deltaHorizontal:3,deltaVertical:5,preventScroll:!1,lockAxis:!0,touch:!0,mouse:!0},o);var u=[],i=!1,a=function(){i=!0},p=function(l){i=!1,O(l)},L=function(l){i&&(l.changedTouches=[{clientX:l.clientX,clientY:l.clientY}],M(l))};o.mouse&&(n.addEventListener("mousedown",a),n.addEventListener("mouseup",p),n.addEventListener("mousemove",L));var O=function(l){var m=Math.abs,E=Math.max,x=Math.min;if(u.length){for(var A=typeof TouchEvent=="function"&&l instanceof TouchEvent,h=[],g=[],f={top:!1,right:!1,bottom:!1,left:!1},j=0;j<u.length;j++)h.push(u[j].x),g.push(u[j].y);var W=h[0],H=h[h.length-1],B=g[0],Y=g[g.length-1],J={x:[W,H],y:[B,Y]};if(1<u.length){var ye={detail:t({touch:A,target:l.target},J)},de=new CustomEvent("swiperelease",ye);n.dispatchEvent(de)}var C=h[0]-h[h.length-1],b="none";b=0<C?"left":"right";var S,K=x.apply(Math,h),U=E.apply(Math,h);if(m(C)>=o.minHorizontal&&(b=="left"?(S=m(K-h[h.length-1]),S<=o.deltaHorizontal&&(f.left=!0)):b=="right"&&(S=m(U-h[h.length-1]),S<=o.deltaHorizontal&&(f.right=!0))),C=g[0]-g[g.length-1],b="none",b=0<C?"top":"bottom",K=x.apply(Math,g),U=E.apply(Math,g),m(C)>=o.minVertical&&(b=="top"?(S=m(K-g[g.length-1]),S<=o.deltaVertical&&(f.top=!0)):b=="bottom"&&(S=m(U-g[g.length-1]),S<=o.deltaVertical&&(f.bottom=!0))),u=[],f.top||f.right||f.bottom||f.left){o.lockAxis&&((f.left||f.right)&&m(W-H)>m(B-Y)?f.top=f.bottom=!1:(f.top||f.bottom)&&m(W-H)<m(B-Y)&&(f.left=f.right=!1));var ve={detail:t({directions:f,touch:A,target:l.target},J)},we=new CustomEvent("swipe",ve);n.dispatchEvent(we)}else{var Ee=new CustomEvent("swipecancel",{detail:t({touch:A,target:l.target},J)});n.dispatchEvent(Ee)}}},M=function(l){var m=l.changedTouches[0];if(u.push({x:m.clientX,y:m.clientY}),1<u.length){var E=u[0].x,x=u[u.length-1].x,A=u[0].y,h=u[u.length-1].y,g={detail:{x:[E,x],y:[A,h],touch:typeof TouchEvent=="function"&&l instanceof TouchEvent,target:l.target}},f=new CustomEvent("swiping",g),j=o.preventScroll===!0||typeof o.preventScroll=="function"&&o.preventScroll(f);j&&l.preventDefault(),n.dispatchEvent(f)}},V=!1;try{var te=Object.defineProperty({},"passive",{get:function(){V={passive:!o.preventScroll}}});window.addEventListener("testPassive",null,te),window.removeEventListener("testPassive",null,te)}catch{}return o.touch&&(n.addEventListener("touchmove",M,V),n.addEventListener("touchend",O)),{off:function(){n.removeEventListener("touchmove",M,V),n.removeEventListener("touchend",O),n.removeEventListener("mousedown",a),n.removeEventListener("mouseup",p),n.removeEventListener("mousemove",L)}}}};e.exports=r,e.exports.default=r})(me);var ut=me.exports;const it=Se(ut),he="applet.fullscreen-emoji.emoji-cache",ge=Ge(()=>localStorage.getItem(he)??"null",JSON.parse,Qe([]),et([Ze(Fe("usedTimes"))])),at=e=>{const t=ge(),r=t.find(n=>n.emoji===e);r?r.usedTimes+=1:t.push({emoji:e,usedTimes:1}),localStorage.setItem(he,JSON.stringify(t))},st="/portfolio-react/assets/emoji-favicon-Da_G2-bh.png",ct=ot({Dialog:({emoji:e,onClose:t})=>{const r=_.useRef(null);return _.useEffect(()=>{const n=r.current;if(n)return it(n),n.addEventListener("swipe",t),()=>n.removeEventListener("swipe",t)},[t]),y.jsx("div",{ref:r,className:"dialog center",style:{},children:y.jsx("div",{className:"emoji",children:e})})}});function pt(){const{isOpen:e,openWithData:t,close:r,data:n}=_e(),o=_.useCallback(a=>{t(a),at(a)},[t]),u=_.useCallback(a=>{const p=(a.currentTarget.value??"").trim();p&&a.key==="Enter"&&(a.currentTarget.value="",o(p))},[o]),i=_.useCallback(a=>{const p=a.currentTarget.dataset.emoji;p&&o(p)},[o]);return _.useEffect(()=>{const a=p=>{p.key==="Escape"&&r()};return window.addEventListener("keydown",a),()=>window.removeEventListener("keydown",a)},[r]),_.useEffect(()=>{let a=document.querySelector("link[rel~='icon']");a||(a=document.createElement("link"),a.rel="icon",document.head.appendChild(a)),a.href=st},[]),y.jsxs(y.Fragment,{children:[e&&y.jsx(ct.Dialog,{emoji:n,onClose:r}),y.jsxs("div",{children:[y.jsxs("label",{children:[y.jsx("span",{children:"Choose an emoji and hit enter"}),y.jsx("br",{}),y.jsx("input",{type:"text",onKeyUp:u})]}),y.jsx("hr",{}),y.jsx("div",{className:"shortcut-buttons",children:ge().map(a=>y.jsx("button",{"data-emoji":a.emoji,onClick:i,children:a.emoji},a.emoji))})]})]})}export{pt as default};
