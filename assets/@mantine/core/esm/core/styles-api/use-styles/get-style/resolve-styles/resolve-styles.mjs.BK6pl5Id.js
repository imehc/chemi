function f({theme:t,styles:r,props:a,stylesCtx:o}){return(Array.isArray(r)?r:[r]).reduce((n,e)=>typeof e=="function"?{...n,...e(t,a,o)}:{...n,...e},{})}export{f as r};
