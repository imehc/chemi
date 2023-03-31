import type { AttributifyAttributes } from 'unocss/preset-attributify';

/**
 * unocss docs
 * @link https://venerable-strudel-d42cce.netlify.app/presets/attributify.html
 */
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
