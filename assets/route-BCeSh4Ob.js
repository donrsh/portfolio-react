import{j as e}from"./jsx-runtime-JVR6BLX4.js";import{u as i}from"./useToggler-DAZg9NR_.js";import{S as a}from"./SourceCodeRefs-Dx3g2ru6.js";import{B as s}from"./button-C0O-YeUW.js";import"./link-DV1BXbd1.js";import"./react-icons.esm-BfbKpci0.js";import"./index-C1zmamBb.js";import"./cn-BRrbDnA6.js";import"./index-Cl91VgWi.js";const n=[{title:"This page",link:"https://github.com/donrsh/portfolio-react/blob/main/app/routes/demo.useToggler/route.tsx"},{title:e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"useToggler"})," hook"]}),link:"https://github.com/donrsh/web-apps-workspace/tree/main/libs/react/src/hooks/useToggler"}],m="popover",c=[{name:"dog",emoji:"🐶"},{name:"cat",emoji:"🐱"},{name:"chicken",emoji:"🐥"},{name:"pig",emoji:"🐷"},{name:"fish",emoji:"🐟"}];function f(){var t;const o=i();return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"flex gap-2 mb-4",children:c.map(r=>e.jsx(s,{onClick:()=>o.openWithData(r),style:{width:"fit-content"},children:r.name},r.name))}),e.jsxs("dialog",{className:"border-2 border-gray-300 dark:bg-black dark:text-white",open:o.isOpen,children:[e.jsx(s,{variant:"outline",className:"border-0 absolute top-0 right-0",onClick:o.close,children:"╳"}),e.jsx("br",{}),e.jsx("div",{id:m,children:e.jsx("span",{className:"m-4 text-[256px]",children:(t=o.data)==null?void 0:t.emoji})})]}),e.jsx("hr",{}),e.jsx(a,{open:!0,data:n})]})}export{f as default};