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
exports.WaveformScrubber = WaveformScrubber;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_2 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A token-bar waveform scrubber — renders `peaks` as amplitude bars, tints the
 * played portion `primary` and the rest `border`, and seeks by tap: the tap's x
 * position maps to a `[0, 1]` fraction reported through `onSeek`. Exposed to
 * screen readers as an `adjustable` control with a percentage value. Pure UI —
 * no audio analysis or playback here; feed it precomputed `peaks`. Token-only.
 */
function WaveformScrubber({ peaks = [], progress = 0, variant = 'bars', height = 40, onSeek, disabled = false, accessibilityLabel = 'Seek', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const widthRef = React.useRef(0);
    const frac = clamp01(progress);
    const onLayout = (e) => {
        widthRef.current = e.nativeEvent.layout.width;
    };
    const handlePress = (e) => {
        if (disabled || !onSeek)
            return;
        const w = widthRef.current;
        if (w <= 0)
            return;
        onSeek(clamp01(e.nativeEvent.locationX / w));
    };
    const count = peaks.length;
    // How many bars fall inside the played region (guarded against empty peaks).
    const playedBars = count > 0 ? Math.round(frac * count) : 0;
    return ((0, jsx_runtime_1.jsx)(react_native_2.Pressable, { accessibilityRole: "adjustable", accessibilityLabel: accessibilityLabel, accessibilityValue: { min: 0, max: 100, now: Math.round(frac * 100) }, accessibilityState: { disabled }, disabled: disabled || !onSeek, onPress: handlePress, onLayout: onLayout, style: [{ width: '100%', height, opacity: disabled ? 0.5 : 1 }, style], children: count === 0 ? (
        // Empty / unanalyzed: a single flat rail with a played fill.
        (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 4,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${frac * 100}%`,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.primary,
                    } }) }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                flex: 1,
                flexDirection: 'row',
                alignItems: variant === 'mirror' ? 'center' : 'flex-end',
                gap: 2,
            }, children: peaks.map((raw, i) => {
                const amp = clamp01(raw);
                const barHeight = Math.max(2, amp * height);
                const played = i < playedBars;
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: barHeight,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: played ? colors.primary : colors.border,
                    } }, i));
            }) })) }));
}
//# sourceMappingURL=WaveformScrubber.js.map