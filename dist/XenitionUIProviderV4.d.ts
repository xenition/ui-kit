import * as React from 'react';
import type { XenitionUIProviderProps } from './provider';
export type { XenitionUIProviderProps as XenitionUIProviderV4Props };
/**
 * The sheets **shared** across the V4 line, as `[id, css]` pairs.
 *
 * Shared is the whole selection rule. Seventy-eight files under
 * `src/primitives/` call `injectStyleOnce` from their render body, and most of
 * those calls are for a sheet only one component uses (`xen-v4-button-styles`,
 * `xen-v4-checkbox-styles`). Hoisting a private sheet would mean exporting it
 * from its component file — seventy-odd edits to save a document mutation that
 * happens once, for a component the app may never render. What is on this list
 * is the eleven sheets that `src/primitives/internal/` already exports because
 * more than one component needs them; between them they back the form line, the
 * nav line, the pickers, the sliders, the overlay surfaces, the chrome, and the
 * row/table/code data views — which is nearly every V4 control a first screen
 * paints.
 *
 * Five of the ids are string literals here rather than imported constants,
 * because `nav-v4.ts`, `picker-v4.ts` and `surface-v4.ts` export the CSS but
 * not an id — their consumers type the id at the call site. They are copied
 * verbatim from those call sites, and the spec beside this file mounts a real
 * consumer of each and asserts the document still holds exactly one sheet under
 * that id, so a typo or a future rename fails a test rather than silently
 * double-injecting.
 */
export declare const V4_SHARED_SHEETS: ReadonlyArray<readonly [id: string, css: string]>;
/**
 * **V4 root provider** — everything {@link XenitionUIProvider} does, plus the
 * shared V4 stylesheets already in the document before the first V4 control
 * renders.
 *
 * ## What the V4 changes
 *
 * Nothing it paints. This provider's whole output is still a `<style>` tag of
 * `--xen-*` custom properties and a `data-theme` wrapper — the V4 is about
 * *what it provides*, not how it looks.
 *
 * What it changes is *when*. In the base line, a V4 control's stylesheet
 * reaches the document on that control's first render — so opening a screen
 * means eleven possible `document.head.appendChild` calls interleaved with the
 * first paint, each one invalidating style for the tree below it. That is the
 * textbook shape of a flash of restyled content, and it lands in the most
 * latency-sensitive moment an app has. Mounting this provider moves all of it
 * to app start, where there is nothing on screen to reflow. The components are
 * untouched and keep their own `injectStyleOnce` calls: the id guard makes the
 * second attempt a single `getElementById`, so a V4 control still works
 * perfectly under the plain provider, and works slightly better under this one.
 *
 * ## One context, not two
 *
 * It **composes** {@link XenitionUIProvider} rather than reimplementing it. The
 * compiled-theme context is a module-private constant in `provider.tsx`, and a
 * second copy of it would leave `useXenitionCompiledTheme()` and
 * `useOptionalCompiledTheme()` reading `null` underneath this provider —
 * silently turning off gradient and elevation handling for the entire V4 line,
 * with no error to notice. Composing also means `theme`, `mode`, seed
 * compilation and the `data-theme` resolution have exactly one implementation
 * and cannot drift apart.
 *
 * ## No new custom properties
 *
 * The obvious addition — publishing the V4 state and motion scales so a
 * consumer can reach them from their own CSS — is already done. `toCssVars`
 * emits `--xen-state-hover|focus|pressed|dragged|disabled-content|
 * disabled-container` and `--xen-motion-quick|standard|enter` with the three
 * easings, and the base provider writes them. Re-emitting them here would give
 * the same numbers two sources and one of them would eventually go stale. So
 * this provider adds no variables at all.
 *
 * ## `display: contents` stays
 *
 * Inherited from the base, and kept on purpose. The documented accessibility
 * bug is real — WebKit through Safari 15.4 and Chromium through 88 dropped
 * `display: contents` elements from the accessibility tree — but what it drops
 * is the element's *own* semantics, and this element is a bare `<div>` with the
 * `generic` role and no accessible name. There is nothing to lose, and children
 * are unaffected in every version of the bug. Against that, the alternatives
 * are worse: a `display: block` wrapper injects an extra box between the app
 * root and its layout, so every root-level flex or grid an app writes silently
 * stops working; and stamping `data-theme` on `<html>` or `<body>` means a
 * library reaching outside its own tree, which breaks two providers on one page
 * and cannot server-render. Keeping it is also the only choice compatible with
 * the additive-only rule — changing it would mean editing `provider.tsx` and
 * moving the DOM under every existing caller.
 *
 * @example
 * ```tsx
 * <XenitionUIProviderV4 theme={seed} mode="dark">
 *   <App />
 * </XenitionUIProviderV4>
 * ```
 */
export declare function XenitionUIProviderV4({ theme, mode, children, }: XenitionUIProviderProps): React.ReactElement;
//# sourceMappingURL=XenitionUIProviderV4.d.ts.map