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
exports.SignInScreenV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuthCard_1 = require("../primitives/AuthCard");
const SignInScreen_1 = require("./SignInScreen");
/**
 * Sign-in / register — **V2, editorial** (§11).
 *
 * The base line stacks brand, headline and form down one column. V2 turns the
 * top of the screen into a full-bleed tinted panel that runs to the very edge
 * and carries the brand tile and headline, then lets the form sheet **rise
 * over it** — `radius.lg` on its top corners, `surface` fill, pulled up so it
 * overlaps the panel. The overlap is the whole idea: it reads as a card handed
 * to you rather than a form printed on a page, and it gives the headline
 * somewhere to sit that is not the same plane as the inputs.
 *
 * Same parts as the base line, same props, same 56px controls, same sticky
 * CTA (§5) — only the arrangement differs.
 */
exports.SignInScreenV2 = React.forwardRef(function SignInScreenV2(props, ref) {
    const parts = (0, SignInScreen_1.useSignInParts)(props);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex min-h-full flex-col bg-primary-50', props.className), ...(0, SignInScreen_1.signInDomProps)(props), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col overflow-y-auto", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-lg bg-primary-50 px-xl pb-2xl pt-2xl", children: [parts.brand, parts.heading] }), (0, jsx_runtime_1.jsxs)("div", { className: "-mt-lg flex flex-1 flex-col gap-lg rounded-t-[var(--xen-radius-lg)] bg-surface p-xl", children: [parts.alert, parts.fields, parts.providers, parts.switchFooter] })] }), (0, jsx_runtime_1.jsx)(AuthCard_1.AuthStickyFooter, { children: parts.cta })] }));
});
//# sourceMappingURL=SignInScreenV2.js.map