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
exports.Marquee = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const inject_1 = require("./internal/inject");
const MARQUEE_CSS = `
@keyframes xen-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
[data-xen-marquee-track] {
  animation-name: xen-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
[data-xen-marquee][data-pause-on-hover="true"]:hover [data-xen-marquee-track] {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-marquee-track] { animation: none !important; }
}
`;
const FALLBACK_DURATION_S = 24;
/**
 * Infinite horizontal loop (pure CSS keyframes — the content is rendered
 * twice and the track translates by -50%). The duplicate copy is
 * `aria-hidden` so assistive tech reads the content once. Reduced-motion
 * users get a static, non-animated row.
 */
exports.Marquee = React.forwardRef(function Marquee({ speed = 40, pauseOnHover = true, className, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-marquee-styles', MARQUEE_CSS);
    const trackRef = React.useRef(null);
    const [durationS, setDurationS] = React.useState(FALLBACK_DURATION_S);
    React.useEffect(() => {
        const track = trackRef.current;
        if (track === null)
            return;
        const contentWidth = track.scrollWidth / 2;
        if (contentWidth > 0 && speed > 0) {
            setDurationS(contentWidth / speed);
        }
    }, [speed, children]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-marquee": "", "data-pause-on-hover": pauseOnHover ? 'true' : 'false', className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { ref: trackRef, "data-xen-marquee-track": "", className: "flex w-max items-center gap-[var(--xen-space-lg)]", style: { animationDuration: `${durationS}s` }, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex shrink-0 items-center gap-[var(--xen-space-lg)]", children: children }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex shrink-0 items-center gap-[var(--xen-space-lg)]", children: children })] }) }));
});
//# sourceMappingURL=Marquee.js.map