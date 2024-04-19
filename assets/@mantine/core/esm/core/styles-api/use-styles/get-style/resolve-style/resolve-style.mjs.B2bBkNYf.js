function i({style:r,theme:n}){return Array.isArray(r)?[...r].reduce((u,f)=>({...u,...i({style:f,theme:n})}),{}):typeof r=="function"?r(n):r??{}}export{i as r};
