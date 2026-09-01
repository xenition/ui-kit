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
exports.WaveformScrubberV4 = WaveformScrubberV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * WaveformScrubber — **V4** "spotlight" design. A refined, more tactile
 * waveform: played bars render in **primary**, unplayed bars in soft-muted
 * (`onSurface` at low alpha), and a clear primary playhead marks the current
 * position. Seeks by tap: the tap's x maps to a `[0, 1]` fraction reported
 * through `onSeek`, exposed to screen readers as an `adjustable` control with a
 * percentage value. Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; token-only colors via `useXenitionTheme()` —
 * no literal hex.
 */
function WaveformScrubberV4({ peaks = [], progress = 0, variant = 'bars', height = 48, onSeek, disabled = false, accessibilityLabel = 'Seek', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const widthRef = React.useRef(0);
    const frac = clamp01(progress);
    const softTrack = (0, color_1.withAlpha)(colors.onSurface, 0.16);
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "adjustable", accessibilityLabel: accessibilityLabel, accessibilityValue: { min: 0, max: 100, now: Math.round(frac * 100) }, accessibilityState: { disabled }, disabled: disabled || !onSeek, onPress: handlePress, onLayout: onLayout, style: [{ width: '100%', height, opacity: disabled ? 0.5 : 1 }, style], children: [count === 0 ? (
            // Empty / unanalyzed: a single flat rail with a played fill.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: softTrack,
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
                    const barHeight = Math.max(3, amp * height);
                    const played = i < playedBars;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flex: 1,
                            height: barHeight,
                            borderRadius: tokens.radius.full,
                            backgroundColor: played ? colors.primary : softTrack,
                        } }, i));
                }) })), !disabled && (onSeek || frac > 0) ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${frac * 100}%`,
                    width: 2,
                    marginLeft: -1,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                } })) : null] }));
}
//# sourceMappingURL=WaveformScrubberV4.js.map