import{R as m}from"../../../../../../react/index.js.4247Uq6c.js";import{u as l,a as c}from"../Mantine.context.mjs.c56K0rNB.js";import{c as u}from"../convert-css-variables/convert-css-variables.mjs.qgrA9H_V.js";import{g as d}from"./get-merged-variables.mjs.Dkf7iY2t.js";import{r as h}from"./remove-default-variables.mjs.yIK91man.js";import{u as f}from"../MantineThemeProvider/MantineThemeProvider.mjs.juLuSzjJ.js";function g(e){return`
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`}function b({cssVariablesSelector:e}){const s=f(),a=l(),o=c(),n=d({theme:s,generator:o}),t=e===":root",i=t?h(n):n,r=u(i,e);return r?m.createElement("style",{"data-mantine-styles":!0,nonce:a==null?void 0:a(),dangerouslySetInnerHTML:{__html:`${r}${t?"":g(e)}`}}):null}b.displayName="@mantine/CssVariables";export{b as M};
//# sourceMappingURL=MantineCssVariables.mjs.Eb6qpjvy.js.map
