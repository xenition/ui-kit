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
exports.Stat = Stat;
exports.StatBar = StatBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const defaultFormat = (n) => Math.round(n).toLocaleString();
/**
 * One statistic with a count-up number and a label — the native mirror of the
 * web `Stat`. The web `AnimatedCounter` starts when scrolled into view; native
 * has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing` (simplification). Token-only.
 */
function Stat({ value, to, label, prefix, suffix, duration = 1200, format = defaultFormat, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const target = to ?? value;
    const anim = React.useRef(new react_native_1.Animated.Value(0)).current;
    const [display, setDisplay] = React.useState(0);
    React.useEffect(() => {
        const id = anim.addListener(({ value: v }) => setDisplay(v));
        const animation = react_native_1.Animated.timing(anim, {
            toValue: target,
            duration,
            useNativeDriver: false,
        });
        animation.start();
        // Stop the animation AND drop the listener on unmount so no frame timer
        // fires after the component (or a test's jest env) is gone.
        return () => {
            animation.stop();
            anim.removeListener(id);
        };
    }, [anim, target, duration]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-stat", style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '700',
                }, children: [prefix ?? '', format(display), suffix ?? ''] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })] }));
}
/**
 * Horizontal row of `Stat`s — the native mirror of the web `StatBar`. The web
 * version composes children; native takes a `stats` data array and wraps them
 * in a centered flex row. Token-only.
 */
function StatBar({ stats, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-statbar", style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: tokens.spacing['2xl'],
            },
            style,
        ], children: stats.map((s, i) => ((0, jsx_runtime_1.jsx)(Stat, { ...s }, i))) }));
}
//# sourceMappingURL=StatBar.js.map