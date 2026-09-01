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
exports.FollowButtonV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Spinner_1 = require("../primitives/Spinner");
const DEFAULT_LABELS = {
    follow: 'Follow',
    following: 'Following',
    requested: 'Requested',
};
// V4 "feed" identity: one accent = primary. `follow` is the solid-primary CTA;
// `following` de-emphasizes to a soft-primary tint (a deliberate second tap to
// unfollow); `requested` reads muted while a private request is pending.
const VARIANT = {
    follow: 'primary',
    following: 'soft',
    requested: 'ghost',
};
/**
 * FollowButton — **V4** "feed" design (web parity of the native V4). The clean
 * pill toggle over Follow / Following / Requested: `follow` is a solid-**primary**
 * pill, `following` a soft-primary tint, `requested` a muted state — one accent,
 * big ≥44px tap target, fully rounded. Stateless: the parent owns `state` and
 * flips it in `onClick`. Same props/behavior as {@link FollowButtonProps}; all
 * colors from `--xen-*` token classes (no literals). `aria-pressed` marks the
 * connected/pending states.
 */
exports.FollowButtonV4 = React.forwardRef(function FollowButtonV4({ state = 'follow', size = 'sm', loading = false, disabled = false, onClick, labels, className }, ref) {
    const label = labels?.[state] ?? DEFAULT_LABELS[state];
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { ref: ref, variant: VARIANT[state], size: size, disabled: disabled || loading, "aria-label": label, "aria-pressed": state !== 'follow', "aria-busy": loading || undefined, onClick: onClick ? () => onClick(state) : undefined, className: (0, cn_1.cn)('min-h-[44px] rounded-full px-lg font-semibold', state === 'requested' && 'text-muted', className), children: loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": label }) : label }));
});
//# sourceMappingURL=FollowButtonV4.js.map