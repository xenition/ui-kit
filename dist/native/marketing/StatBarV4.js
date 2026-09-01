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
exports.StatV4 = StatV4;
exports.StatBarV4 = StatBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const defaultFormat = (n) => Math.round(n).toLocaleString();
/**
 * Stat — **V4** "showcase" design (native mirror of the web V4). One statistic:
 * a big extra-bold **tabular-nums** numeral that counts up over a muted label.
 * NOT a gradient surface — clean numerals on the page ground. As on the base,
 * native has no IntersectionObserver, so the count-up runs once on mount via
 * `Animated.timing`. Same props/behavior as the base `StatItem`. Token-only.
 */
function StatV4({ value, to, label, prefix, suffix, duration = 1200, format = defaultFormat, }) {
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
        return () => {
            animation.stop();
            anim.removeListener(id);
        };
    }, [anim, target, duration]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-stat", style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    letterSpacing: -0.5,
                    fontVariant: ['tabular-nums'],
                }, children: [prefix ?? '', format(display), suffix ?? ''] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })] }));
}
/**
 * StatBar — **V4** "showcase" design (native mirror of the web V4). A content
 * section: a centered, wrapping row of `StatV4`s. Mirrors the web V4; native
 * takes the base's `stats` data array. Same props/behavior as
 * {@link StatBarProps}. Token-only colors, no literals.
 */
function StatBarV4({ stats, style }) {
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
        ], children: stats.map((s, i) => ((0, jsx_runtime_1.jsx)(StatV4, { ...s }, i))) }));
}
//# sourceMappingURL=StatBarV4.js.map