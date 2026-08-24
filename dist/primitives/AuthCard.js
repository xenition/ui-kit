"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCard = AuthCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const Card_1 = require("./Card");
/** Centered card shell for auth screens (LoginForm/SignupForm/…). Bound to the theme tokens. */
function AuthCard({ title, subtitle, children, footer, className }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('mx-auto w-full max-w-sm', className), children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { className: "p-6", children: [(title != null || subtitle != null) && ((0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [title != null && (0, jsx_runtime_1.jsx)("h1", { className: "text-xl font-bold text-on-surface", children: title }), subtitle != null && (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-muted", children: subtitle })] })), children, footer != null && (0, jsx_runtime_1.jsx)("div", { className: "mt-4 text-center text-sm text-muted", children: footer })] }) }));
}
//# sourceMappingURL=AuthCard.js.map