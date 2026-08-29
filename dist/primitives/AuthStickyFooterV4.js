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
exports.AuthStickyFooterV4 = AuthStickyFooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const AuthSwitchFooterV4_1 = require("./AuthSwitchFooterV4");
/*
  The band's own padding, spelled as whole literals because Tailwind's content
  scanner reads source text and cannot follow a composed string.

  `env(safe-area-inset-bottom)` is 0 on every ground where there is no inset —
  a desktop browser, an Android device with on-screen keys — so the class needs
  no media query and no branch: the same expression is correct everywhere. It
  is the same shape `BottomNavV4` uses for the tab bar, so the CTA and the tab
  bar clear the home indicator by the same amount.
*/
const PAD_SAFE = 'pb-[calc(var(--xen-space-lg)_+_env(safe-area-inset-bottom))]';
const PAD_PLAIN = 'pb-lg';
/**
 * **V4 auth sticky footer** — the web twin of the native `AuthStickyFooterV4`,
 * the base's props plus the §5 secondary action and safe-area handling.
 *
 * §5's anatomy exactly: pinned to the bottom, a hairline `border` divider on
 * top and an opaque `surface` behind it, so scrolling content passes **under**
 * the action instead of colliding with it.
 *
 * ## What V4 changes
 *
 * **It clears the safe-area inset.** §5 says "above the safe-area inset" and
 * the base did not read one at all: on a notched phone the CTA sat under the
 * home indicator, which is the single most visible way a web surface admits it
 * was not designed for a phone. The band now pays `spacing.lg` *plus* the
 * inset, and `safeArea={false}` gives it back to an ancestor that already
 * consumed it.
 *
 * **The secondary action has a place.** §5: a secondary action goes below the
 * CTA as a centred muted text link, "never beside it competing for the same
 * weight". The base exposed only `children`, so where the "No thanks" landed
 * was up to whoever assembled the screen — and on the shipped screens it landed
 * beside the CTA. `secondaryLabel` puts it under the CTA, centred, at the muted
 * tone, by construction. It is drawn by `AuthSwitchFooterV4` at `tone="muted"`
 * rather than hand-rolled here (§10.5): the two footer lines are one anatomy at
 * two volumes, and this way the tap target, the state layer and the focus ring
 * are the same object in both.
 *
 * **It stacks.** The base was `sticky` with no stacking order, so a
 * transformed or positioned child of the scrolling content could paint over
 * the CTA — which defeats the entire point of the band.
 *
 * **Nothing renders when there is nothing to pin** (§10.6/§12). An empty band
 * is a hairline and a strip of surface across the bottom of the screen with no
 * explanation, the same defect as §9's divider above no providers.
 */
function AuthStickyFooterV4({ children, secondaryLabel, onSecondaryClick, secondaryDisabled = false, safeArea = true, className, ...rest }) {
    // `toArray` drops `null`, `undefined` and booleans, so a CTA behind a false
    // conditional counts as absent rather than as a child.
    const hasChildren = React.Children.toArray(children).length > 0;
    if (!hasChildren && !secondaryLabel)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-auth-footer": "", className: (0, cn_1.cn)('sticky bottom-0 z-10 flex flex-col gap-sm', 'border-t border-border bg-surface px-lg pt-lg', safeArea ? PAD_SAFE : PAD_PLAIN, className), ...rest, children: [children, secondaryLabel ? ((0, jsx_runtime_1.jsx)(AuthSwitchFooterV4_1.AuthSwitchFooterV4, { tone: "muted", label: secondaryLabel, onClick: onSecondaryClick, disabled: secondaryDisabled })) : null] }));
}
//# sourceMappingURL=AuthStickyFooterV4.js.map