import{r as t,j as r}from"./jsx-runtime-JVR6BLX4.js";function o(e){const s=t.useRef(0);return t.useEffect(()=>{s.current=s.current+1}),t.useEffect(()=>()=>{},[]),r.jsx("span",{...e,onClick:t.useCallback(()=>alert(s.current),[]),style:{backgroundColor:"lightgray",padding:"2px 8px",borderRadius:4,...e.style},children:s.current+1})}function d(){const[,e]=t.useReducer(s=>s+1,0);return e}function a(){const e=t.useRef(!1);return t.useLayoutEffect(()=>{e.current=!0},[]),e}function f(e,s,c=!0){const n=d(),u=a();t.useEffect(()=>{c&&!u.current&&n()},[]),t.useEffect(()=>{e==null||e.classList.add(s)}),t.useEffect(()=>{e==null||e.addEventListener("animationend",i=>{i.currentTarget.classList.remove(s)})},[e,s])}function x(){const e=d(),[,s]=t.useState({}),[,c]=t.useState(null),n=t.useRef(null);return f(n.current,"outline-blink"),r.jsxs("div",{ref:n,children:[r.jsxs("div",{children:["#rendered = ",r.jsx(o,{})]}),r.jsxs("div",{style:{display:"flex",alignItems:"self-start",gap:4},children:[r.jsx("button",{onClick:e,children:"rerender"}),r.jsx("button",{onClick:()=>s(u=>u),children:r.jsxs("code",{children:["setState(x =",">"," x)"]})})]}),r.jsxs("div",{ref:c,style:{border:"1px solid gray",marginTop:8},children:["This div accept ",r.jsx("code",{children:"stateDivRef"})," as ref, which is actually from"," ",r.jsx("code",{children:"useState"}),".",r.jsx("br",{}),"So every rerender should trigger a ",r.jsx("code",{children:"setState"})," under the hood.",r.jsx("br",{}),"Does it cause additional rerender (except for the first render)?"]})]})}export{x as default};