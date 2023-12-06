function r(t){return typeof t=="number"?!0:typeof t=="string"?t.startsWith("calc(")||t.startsWith("var(")||t.includes(" ")&&t.trim()!==""?!0:/[0-9]/.test(t.trim().replace("-","")[0]):!1}export{r as i};
//# sourceMappingURL=is-number-like.mjs.IzWfUMVh.js.map
