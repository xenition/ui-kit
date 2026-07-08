import * as React from 'react';
import type { CompiledTheme, ThemeSeed } from './theme/types';
/** Narrow a `ThemeSeed | CompiledTheme` union to the compiled form. */
export declare function isCompiledTheme(theme: ThemeSeed | CompiledTheme): theme is CompiledTheme;
export interface XenitionUIProviderProps {
    /** A raw seed (compiled on the fly) or an already-compiled theme. */
    theme: ThemeSeed | CompiledTheme;
    /**
     * Active color scheme. Defaults from the seed: `'dark'` when
     * `seed.mode === 'dark'`, otherwise `'light'`. Only meaningful when the
     * seed mode is `'both'`, where it toggles the `data-theme` attribute.
     */
    mode?: 'light' | 'dark';
    children?: React.ReactNode;
}
/**
 * Root theme provider for web apps.
 *
 * Compiles the seed (if needed), injects the `--xen-*` CSS custom properties
 * via a `<style>` tag, and stamps `data-theme` on a wrapper so the
 * `[data-theme="dark"]` overrides apply. Place once at the app root, above
 * any `@xenition/ui` component.
 */
export declare function XenitionUIProvider({ theme, mode, children, }: XenitionUIProviderProps): React.ReactElement;
/** Access the compiled theme from anywhere below `XenitionUIProvider`. */
export declare function useXenitionCompiledTheme(): CompiledTheme;
//# sourceMappingURL=provider.d.ts.map