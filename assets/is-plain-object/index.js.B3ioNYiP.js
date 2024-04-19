import{i as f}from"../isobject/index.js.Qx9SLt0t.js";/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */var n=f;function o(t){return n(t)===!0&&Object.prototype.toString.call(t)==="[object Object]"}var a=function(i){var e,r;return!(o(i)===!1||(e=i.constructor,typeof e!="function")||(r=e.prototype,o(r)===!1)||r.hasOwnProperty("isPrototypeOf")===!1)};export{a as i};
