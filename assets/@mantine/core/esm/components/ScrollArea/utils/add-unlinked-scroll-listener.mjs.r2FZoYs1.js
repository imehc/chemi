function s(o,n=()=>{}){let t={left:o.scrollLeft,top:o.scrollTop},i=0;return function r(){const l={left:o.scrollLeft,top:o.scrollTop},e=t.left!==l.left,c=t.top!==l.top;(e||c)&&n(),t=l,i=window.requestAnimationFrame(r)}(),()=>window.cancelAnimationFrame(i)}export{s as a};
//# sourceMappingURL=add-unlinked-scroll-listener.mjs.r2FZoYs1.js.map
