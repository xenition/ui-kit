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
exports.SignInScreenV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SignInScreen_1 = require("./SignInScreen");
/**
 * Sign-in / register — **V3, compact** (§11).
 *
 * No hero panel and no `3xl` display headline. The brand tile moves onto the
 * **same row** as an `xl` headline, so the identity and the ask occupy one
 * band instead of three, and the rows below tighten to `sm`/`md` rhythm. This
 * is the line for a bottom sheet, a modal, or a second-visit screen where the
 * user already knows what app they are in and wants the field, not the pitch.
 *
 * One deliberate difference from §5: the CTA sits **in flow** at the end of
 * the form rather than in a sticky footer. A sheet is sized to its content —
 * there is no scroll for the action to hide under, and pinning it would draw a
 * hairline across the bottom of a card that already has an edge. Everything
 * else about the button is unchanged: full width, 56 tall, `radius.full`,
 * trailing `→`.
 *
 * Same parts, same props, same 56px controls as the base line.
 */
exports.SignInScreenV3 = React.forwardRef(function SignInScreenV3(props, ref) {
    const parts = (0, SignInScreen_1.useSignInParts)(props, { headingSize: 'xl' });
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col gap-md bg-surface p-lg', props.className), ...(0, SignInScreen_1.signInDomProps)(props), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [parts.brand, (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: parts.heading })] }), parts.alert, parts.fields, parts.cta, parts.providers, parts.switchFooter] }));
});
//# sourceMappingURL=SignInScreenV3.js.map