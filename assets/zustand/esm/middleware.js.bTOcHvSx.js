const y=u=>(s,b,t)=>{const S=t.subscribe;return t.subscribe=(c,l,i)=>{let n=c;if(l){const a=(i==null?void 0:i.equalityFn)||Object.is;let e=c(t.getState());n=f=>{const r=c(f);if(!a(e,r)){const d=e;l(e=r,d)}},i!=null&&i.fireImmediately&&l(e,e)}return S(n)},u(s,b,t)};export{y as s};
//# sourceMappingURL=middleware.js.bTOcHvSx.js.map
