import{r as s,j as e}from"./jsx-runtime-JVR6BLX4.js";import{S as n}from"./SourceCodeRefs-BEihfqrU.js";function i(){const r=s.useRef(null);return s.useEffect(()=>{const t=r.current;if(t){const o=l=>{l.deltaY!==0&&(l.preventDefault(),t.scrollTo({left:t.scrollLeft+l.deltaY}))};return t.addEventListener("wheel",o),()=>t.removeEventListener("wheel",o)}},[]),r}const a=[{title:"This page",link:"https://github.com/donrsh/portfolio-react/blob/main/app/routes/demo.useHorizontalScroll/route.tsx"},{title:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"useHorizontalScroll"})," hook"]}),link:"https://github.com/donrsh/web-apps-workspace/tree/main/libs/react/src/hooks/useHorizontalScroll"}];function h(){const r=i();return e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("p",{children:"Use your mouse wheel to scroll horizontally"}),e.jsx("div",{ref:r,style:{display:"flex",overflowX:"auto",whiteSpace:"nowrap",padding:"20px 0",maxWidth:"100%"},children:[...Array(20)].map((t,o)=>e.jsxs("div",{style:{flex:"0 0 auto",width:"200px",height:"200px",margin:"0 10px",backgroundColor:`hsl(${o*20}, 70%, 60%)`,display:"flex",justifyContent:"center",alignItems:"center",fontSize:"24px",color:"white"},children:["Item ",o+1]},o))})]}),e.jsx("hr",{}),e.jsx(n,{open:!0,data:a,style:{marginBlock:16}})]})}export{h as default};
