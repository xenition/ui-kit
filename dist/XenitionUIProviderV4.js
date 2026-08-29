"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.V4_SHARED_SHEETS = void 0;
exports.XenitionUIProviderV4 = XenitionUIProviderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const provider_1 = require("./provider");
const inject_1 = require("./motion/internal/inject");
const chrome_v4_1 = require("./primitives/internal/chrome-v4");
const field_v4_1 = require("./primitives/internal/field-v4");
const nav_v4_1 = require("./primitives/internal/nav-v4");
const picker_v4_1 = require("./primitives/internal/picker-v4");
const surface_v4_1 = require("./primitives/internal/surface-v4");
const v4_data_1 = require("./primitives/internal/v4-data");
const v4_state_1 = require("./primitives/internal/v4-state");
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
exports.V4_SHARED_SHEETS = [
    [v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS],
    [field_v4_1.FIELD_V4_STYLE_ID, field_v4_1.FIELD_V4_CSS],
    [chrome_v4_1.CHROME_V4_STYLE_ID, chrome_v4_1.CHROME_V4_CSS],
    [v4_data_1.V4_ROW_STYLE_ID, v4_data_1.V4_ROW_CSS],
    [v4_data_1.V4_TABLE_STYLE_ID, v4_data_1.V4_TABLE_CSS],
    [v4_data_1.V4_CODE_STYLE_ID, v4_data_1.V4_CODE_CSS],
    ['xen-v4-nav-styles', nav_v4_1.NAV_V4_CSS],
    ['xen-v4-picker-styles', picker_v4_1.PICKER_V4_CSS],
    ['xen-v4-slider-styles', picker_v4_1.SLIDER_V4_CSS],
    ['xen-surface-v4-styles', surface_v4_1.SURFACE_V4_CSS],
    ['xen-surface-v4-drawer-styles', surface_v4_1.SURFACE_V4_DRAWER_CSS],
];
/**
 * Put the shared V4 sheets in the document, once, during **render**.
 *
 * Placement is the point, and it is deliberate rather than sloppy. React runs a
 * parent's render body before any of its children's, and runs effects in the
 * opposite order — children first. So a `useEffect` here would fire *after*
 * every V4 child had already rendered and injected for itself, which is the
 * exact ordering this component exists to fix. A render-body call is also
 * precisely what the seventy-eight components do (`ButtonV4` line 134,
 * `CheckboxV4` line 90), so this is the house pattern, not a new one.
 *
 * The usual objection to side effects in render — a discarded concurrent render
 * leaves debris — does not apply: `injectStyleOnce` is keyed by element id and
 * returns early when that id is present, so a torn render costs at most one
 * `getElementById` and the sheet it might have added is one the app wants
 * anyway. `useMemo(…, [])` holds it to once per provider instance rather than
 * once per re-render; the id guard already makes repeats free, and this keeps
 * eleven `getElementById` calls out of every theme change.
 *
 * SSR is safe because `injectStyleOnce` returns immediately when `document` is
 * undefined. That does mean a server render emits none of these — see
 * {@link V4_SHARED_SHEETS}, which a server renderer can walk itself to write the
 * same sheets into its own `<head>`; the ids match, so the client provider then
 * finds them present and adds nothing.
 */
function usePreinjectedV4Sheets() {
    React.useMemo(() => {
        for (const [id, css] of exports.V4_SHARED_SHEETS)
            (0, inject_1.injectStyleOnce)(id, css);
    }, []);
}
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
function XenitionUIProviderV4({ theme, mode, children, }) {
    usePreinjectedV4Sheets();
    return ((0, jsx_runtime_1.jsx)(provider_1.XenitionUIProvider, { theme: theme, mode: mode, children: children }));
}
//# sourceMappingURL=XenitionUIProviderV4.js.map