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
exports.FollowButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Button_1 = require("../primitives/Button");
const Spinner_1 = require("../primitives/Spinner");
const DEFAULT_LABELS = {
    follow: 'Follow',
    following: 'Following',
    requested: 'Requested',
};
// `follow` reads as the primary CTA; once connected/pending it de-emphasizes
// to a bordered secondary so "unfollow"/"cancel" is a deliberate second tap.
const VARIANT = {
    follow: 'primary',
    following: 'secondary',
    requested: 'secondary',
};
/**
 * Follow / Following / Requested toggle built on the primitive `Button`. The
 * three states cover public follow, an already-following relationship, and a
 * pending request to a private account. Stateless — the parent owns `state`
 * and flips it in `onClick`. Web parity of the native `FollowButton`; token-only
 * via `Button`. `aria-pressed` marks the connected/pending states.
 */
exports.FollowButton = React.forwardRef(function FollowButton({ state = 'follow', size = 'sm', loading = false, disabled = false, onClick, labels, className }, ref) {
    const label = labels?.[state] ?? DEFAULT_LABELS[state];
    return ((0, jsx_runtime_1.jsx)(Button_1.Button, { ref: ref, variant: VARIANT[state], size: size, disabled: disabled || loading, "aria-label": label, "aria-pressed": state !== 'follow', "aria-busy": loading || undefined, onClick: onClick ? () => onClick(state) : undefined, className: className, children: loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": label }) : label }));
});
//# sourceMappingURL=FollowButton.js.map