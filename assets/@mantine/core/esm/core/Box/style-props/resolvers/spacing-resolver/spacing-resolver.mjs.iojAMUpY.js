import{r as i}from"../../../../utils/units-converters/rem.mjs.Vi1x7Y7A.js";function c(r,s){if(typeof r=="number")return i(r);if(typeof r=="string"){const n=r.replace("-","");if(!(n in s.spacing))return i(r);const t=`--mantine-spacing-${n}`;return r.startsWith("-")?`calc(var(${t}) * -1)`:`var(${t})`}return r}export{c as s};
//# sourceMappingURL=spacing-resolver.mjs.iojAMUpY.js.map
