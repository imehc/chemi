/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var p=function(t,l){if(t===null||typeof t>"u")throw new TypeError("expected first argument to be an object.");if(typeof l>"u"||typeof Symbol>"u"||typeof Object.getOwnPropertySymbols!="function")return t;for(var u=Object.prototype.propertyIsEnumerable,o=Object(t),b=arguments.length,a=0;++a<b;)for(var e=Object(arguments[a]),f=Object.getOwnPropertySymbols(e),n=0;n<f.length;n++){var r=f[n];u.call(e,r)&&(o[r]=e[r])}return o};export{p as a};
//# sourceMappingURL=index.js.eJNoaxSn.js.map
