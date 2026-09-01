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
exports.AgentPerformanceCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * AgentPerformanceCard — a gradient "console" stats hero for an agent. The agent
 * name and period sit as near-white ink over a `from-primary-500 to-primary-700`
 * ground; each metric renders as a frosted tile (`bg-primary-50/15`,
 * `border-primary-50/30`) with a big value and a soft label. A calm peak-moment
 * surface, dark-mode safe, every color from the brand ramp (token-only, no
 * literals). Presentational — shaped stats only, nothing fetches.
 */
exports.AgentPerformanceCard = React.forwardRef(function AgentPerformanceCard({ agentName, agentAvatar, stats, period = 'This week', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", name: agentName, src: agentAvatar }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xl font-extrabold tracking-tight text-primary-50", children: agentName }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-primary-100", children: period })] })] }), stats.length > 0 ? ((0, jsx_runtime_1.jsx)("dl", { className: "grid grid-cols-3 gap-[var(--xen-space-sm)]", children: stats.map((stat) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-xs font-semibold uppercase tracking-wide text-primary-100", children: stat.label }), (0, jsx_runtime_1.jsx)("dd", { className: "text-2xl font-extrabold tracking-tight text-primary-50", children: stat.value })] }, stat.label))) })) : null] }));
});
//# sourceMappingURL=AgentPerformanceCard.js.map