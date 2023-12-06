import{c as a}from"../css-object-to-string/css-object-to-string.mjs.v0zCVQW-.js";function y({selector:r,styles:s,media:t}){const n=s?a(s):"",e=Array.isArray(t)?t.map(o=>`@media${o.query}{${r}{${a(o.styles)}}}`):[];return`${n?`${r}{${n}}`:""}${e.join("")}`.trim()}export{y as s};
//# sourceMappingURL=styles-to-string.mjs.wjYeAz3N.js.map
