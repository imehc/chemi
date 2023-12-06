function n(r){return typeof r=="string"?{value:r,label:r}:typeof r=="number"?{value:r.toString(),label:r.toString()}:"group"in r?{group:r.group,items:r.items.map(u=>n(u))}:r}function o(r){return r?r.map(n):[]}export{o as g};
//# sourceMappingURL=get-parsed-combobox-data.mjs.HbwXSL_s.js.map
