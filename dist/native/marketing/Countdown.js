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
exports.Countdown = Countdown;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DEFAULT_LABELS = { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' };
/** Remaining time between now and `target`, clamped at zero. */
function computeParts(target) {
    const diff = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        done: diff === 0,
    };
}
const pad = (n) => String(n).padStart(2, '0');
/**
 * Counts down to a target date/time in days/hours/mins/secs boxes — the native
 * mirror of the web `Countdown`. A 1s `setInterval` ticks the display and is
 * cleaned up on unmount. The time text is information (not motion), so the
 * interval still runs under reduced motion — only decorative animation would be
 * gated. Token-only — box surface/border/text all trace to theme tokens.
 */
function Countdown({ to, onComplete, labels = DEFAULT_LABELS, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const target = React.useMemo(() => new Date(to).getTime(), [to]);
    const [parts, setParts] = React.useState(() => computeParts(target));
    const firedRef = React.useRef(false);
    React.useEffect(() => {
        firedRef.current = false;
        setParts(computeParts(target));
        const id = setInterval(() => {
            const next = computeParts(target);
            setParts(next);
            if (next.done && !firedRef.current) {
                firedRef.current = true;
                onComplete?.();
                clearInterval(id);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [target, onComplete]);
    const boxes = [
        { value: parts.days, label: labels.days },
        { value: parts.hours, label: labels.hours },
        { value: parts.minutes, label: labels.minutes },
        { value: parts.seconds, label: labels.seconds },
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-countdown", accessibilityRole: "text", style: [{ flexDirection: 'row', gap: tokens.spacing.sm }, style], children: boxes.map((box) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                minWidth: 56,
                alignItems: 'center',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.md,
            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale['2xl'],
                        fontWeight: '700',
                    }, children: pad(box.value) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.muted,
                        fontSize: tokens.typography.scale.xs,
                        textTransform: 'uppercase',
                    }, children: box.label })] }, box.label))) }));
}
//# sourceMappingURL=Countdown.js.map