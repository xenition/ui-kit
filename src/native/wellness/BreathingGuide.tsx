import * as React from 'react';
import { Animated, Easing, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { withAlpha } from '../primitives/internal/color';

export type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'holdOut';

export interface BreathStep {
  phase: BreathPhase;
  /** Seconds to spend in this phase. */
  seconds: number;
}

/** Named breathing patterns; expanded to steps when no explicit `steps`. */
export type BreathingPattern = 'box' | '4-7-8' | 'calm' | 'coherent';

const PATTERNS: Record<BreathingPattern, BreathStep[]> = {
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

const PHASE_META: Record<BreathPhase, { label: string; color: keyof SemanticColors }> = {
  inhale: { label: 'Breathe in', color: 'primary' },
  hold: { label: 'Hold', color: 'accent' },
  exhale: { label: 'Breathe out', color: 'success' },
  holdOut: { label: 'Hold', color: 'accent' },
};

const MIN_SCALE = 0.62;
const MAX_SCALE = 1;

export interface BreathingGuideProps {
  /** Named pattern; ignored when `steps` is supplied. Default `'box'`. */
  pattern?: BreathingPattern;
  /** Explicit phase sequence — overrides `pattern`. */
  steps?: BreathStep[];
  /** Drive the animation. When false the guide sits at rest. Default false. */
  running?: boolean;
  /** Circle diameter in px. Default 200. */
  size?: number;
  /** Fires when the active phase changes. */
  onPhaseChange?: (phase: BreathPhase, index: number) => void;
  /** Fires each time the full sequence loops. */
  onCycleComplete?: (cycle: number) => void;
  /** Overrides the auto phase caption (e.g. localized). */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * An animated breathing coach. A circle expands on inhale, holds, and contracts
 * on exhale, cycling through the chosen `pattern` (or explicit `steps`). Driven
 * by `Animated` and gated on the OS "Reduce Motion" setting — when reduced, the
 * circle snaps between sizes instead of easing and the caption still advances,
 * so the guidance never depends on motion alone. State (running / current
 * phase) is exposed to screen readers via the caption, not color. Token-only
 * colors (semantic slots + a `withAlpha` tint).
 */
export function BreathingGuide({
  pattern = 'box',
  steps,
  running = false,
  size = 200,
  onPhaseChange,
  onCycleComplete,
  label,
  style,
}: BreathingGuideProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();

  const resolved = steps && steps.length > 0 ? steps : PATTERNS[pattern] ?? PATTERNS.box;
  const signature = React.useMemo(
    () => resolved.map((s) => `${s.phase}:${s.seconds}`).join('|'),
    [resolved]
  );

  const scale = React.useRef(new Animated.Value(MIN_SCALE)).current;
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
    let timer: ReturnType<typeof setTimeout>;

    const step = (): void => {
      if (cancelled) return;
      const current = resolved[idx];
      if (!current) return;
      setPhaseIdx(idx);
      phaseCb.current?.(current.phase, idx);

      const target =
        current.phase === 'inhale' ? MAX_SCALE : current.phase === 'exhale' ? MIN_SCALE : null;
      if (target != null) {
        if (reduced) {
          scale.setValue(target);
        } else {
          Animated.timing(scale, {
            toValue: target,
            duration: current.seconds * 1000,
            easing: Easing.inOut(Easing.ease),
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
  const accent = colors[meta.color];

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Breathing guide, ${running ? caption : 'paused'}`}
      style={[{ alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.md }, style]}
    >
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: accent,
            backgroundColor: withAlpha(accent, 0.16),
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale }],
          }}
        >
          <Text
            style={{
              color: accent,
              fontSize: tokens.typography.scale.xl,
              fontWeight: '700',
              fontFamily: tokens.typography.fontHeading,
            }}
          >
            {caption}
          </Text>
        </Animated.View>
      </View>
      {active ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
          {cap(active.phase === 'holdOut' ? 'hold' : active.phase)} · {active.seconds}s
        </Text>
      ) : null}
    </View>
  );
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
