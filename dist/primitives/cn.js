"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cn = cn;
/** Tiny class-name joiner (no dependency on clsx). */
function cn(...parts) {
    return parts.filter(Boolean).join(' ');
}
//# sourceMappingURL=cn.js.map