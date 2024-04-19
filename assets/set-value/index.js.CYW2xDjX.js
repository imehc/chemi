import{s as c}from"../split-string/index.js.su87N4oj.js";import{e as u}from"../extend-shallow/index.js.C0AOJ74M.js";import{i as m}from"../is-plain-object/index.js.B3ioNYiP.js";import{a as v}from"../is-extendable/index.js.pcIfiZkQ.js";/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */var p=c,d=u,o=m,l=v,w=function(r,a,e){if(!l(r)||(Array.isArray(a)&&(a=[].concat.apply([],a).join(".")),typeof a!="string"))return r;for(var s=p(a,{sep:".",brackets:!0}).filter(x),f=s.length,n=-1,t=r;++n<f;){var i=s[n];if(n!==f-1){l(t[i])||(t[i]={}),t=t[i];continue}o(t[i])&&o(e)?t[i]=d({},t[i],e):t[i]=e}return r};function x(r){return r!=="__proto__"&&r!=="constructor"&&r!=="prototype"}export{w as s};
