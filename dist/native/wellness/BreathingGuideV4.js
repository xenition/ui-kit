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
exports.BreathingGuideV4 = BreathingGuideV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
const GradientSurface_1 = require("./internal/GradientSurface");
const calm_1 = require("./internal/calm");
const PATTERNS = {
    box: [
        { phase: 'inhale', seconds: 4 },
        { phase: 'hold', seconds: 4 },
        { phase: 'exhale', seconds: 4 },
        { phase: 'holdOut', seconds: 4 },
    ],
    '4-7-8': [
        { phase: 'inhale', seconds: 4 },
        { phase: 'hold', seconds: 7 },
        { phase: 'exhale', seconds: 8 },
    ],
    calm: [
        { phase: 'inhale', seconds: 4 },
        { phase: 'exhale', seconds: 6 },
    ],
    coherent: [
        { phase: 'inhale', seconds: 5 },
        { phase: 'exhale', seconds: 5 },
    ],
};
const PHASE_META = {
    inhale: { label: 'Breathe in', color: 'primary' },
    hold: { label: 'Hold', color: 'accent' },
    exhale: { label: 'Breathe out', color: 'success' },
    holdOut: { label: 'Hold', color: 'accent' },
};
const MIN_SCALE = 0.62;
const MAX_SCALE = 1;
/**
 * BreathingGuideV4 — the "calm" restyle of {@link BreathingGuide}. The Animated
 * scale, the phase timer, and the reduced-motion behavior are copied exactly, so
 * the same props, callbacks (`onPhaseChange`/`onCycleComplete`) and a11y hold;
 * only the visuals change: the breathing circle is a soft gradient surface with
 * the phase caption in near-white ink and the sub-caption in `mutedText`.
 */
function BreathingGuideV4({ pattern = 'box', steps, running = false, size = 200, onPhaseChange, onCycleComplete, label, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const resolved = steps && steps.length > 0 ? steps : PATTERNS[pattern] ?? PATTERNS.box;
    const signature = React.useMemo(() => resolved.map((s) => `${s.phase}:${s.seconds}`).join('|'), [resolved]);
    const scale = React.useRef(new react_native_1.Animated.Value(MIN_SCALE)).current;
    const [phaseIdx, setPhaseIdx] = React.useState(0);
    // Keep callbacks fresh without restarting the loop.
    const phaseCb = React.useRef(onPhaseChange);
    const cycleCb = React.useRef(onCycleComplete);
    phaseCb.current = onPhaseChange;
    cycleCb.current = onCycleComplete;
    React.useEffect(() => {
        if (!running || resolved.length === 0) {
            setPhaseIdx(0);
            return;
        }
        let cancelled = false;
        let idx = 0;
        let cycle = 0;
        let timer;
        const step = () => {
            if (cancelled)
                return;
            const current = resolved[idx];
            if (!current)
                return;
            setPhaseIdx(idx);
            phaseCb.current?.(current.phase, idx);
            const target = current.phase === 'inhale' ? MAX_SCALE : current.phase === 'exhale' ? MIN_SCALE : null;
            if (target != null) {
                if (reduced) {
                    scale.setValue(target);
                }
                else {
                    react_native_1.Animated.timing(scale, {
                        toValue: target,
                        duration: current.seconds * 1000,
                        easing: react_native_1.Easing.inOut(react_native_1.Easing.ease),
                        useNativeDriver: true,
                    }).start();
                }
            }
            timer = setTimeout(() => {
                idx += 1;
                if (idx >= resolved.length) {
                    idx = 0;
                    cycle += 1;
                    cycleCb.current?.(cycle);
                }
                step();
            }, current.seconds * 1000);
        };
        step();
        return () => {
            cancelled = true;
            clearTimeout(timer);
            scale.stopAnimation();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [running, reduced, signature]);
    const active = resolved[phaseIdx] ?? resolved[0];
    const meta = active ? PHASE_META[active.phase] : PHASE_META.inhale;
    const caption = label ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `Breathing guide, ${running ? caption : 'paused'}`, style: [{ alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        overflow: 'hidden',
                        transform: [{ scale }],
                    }, children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                            width: size,
                            height: size,
                            borderRadius: size / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: (0, calm_1.calmInk)(r),
                                fontSize: tokens.typography.scale.xl,
                                fontWeight: '700',
                                fontFamily: tokens.typography.fontHeading,
                            }, children: caption }) }) }) }), active ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: [cap(active.phase === 'holdOut' ? 'hold' : active.phase), " \u00B7 ", active.seconds, "s"] })) : null] }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=BreathingGuideV4.js.map