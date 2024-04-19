function e(n){return n.reduce((u,r)=>"group"in r?{...u,...e(r.items)}:(u[r.value]=r,u),{})}export{e as g};
