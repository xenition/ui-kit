"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarGroup = AvatarGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const Avatar_1 = require("./Avatar");
const CHIP = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-xl',
};
/** Overlapping avatar stack with a +N overflow chip — bound to the theme tokens. */
function AvatarGroup({ avatars, max = 4, size = 'md', className }) {
    const shown = avatars.slice(0, max);
    const extra = avatars.length - shown.length;
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center', className), children: [shown.map((a, i) => ((0, jsx_runtime_1.jsx)("span", { className: "-ml-2 rounded-full ring-2 ring-surface first:ml-0", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: a.name, src: a.src, size: size }) }, i))), extra > 0 && ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('-ml-2 inline-flex items-center justify-center rounded-full bg-neutral-100 font-medium text-on-surface ring-2 ring-surface', CHIP[size]), children: ["+", extra] }))] }));
}
//# sourceMappingURL=AvatarGroup.js.map