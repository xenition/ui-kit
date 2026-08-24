import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Icon, Button, type ButtonTone } from '../primitives';
import { withAlpha } from './internal/format';

/** Dispatch stage — text + glyph + color (never color-alone). */
export type DispatchStage = 'unassigned' | 'accepted' | 'en-route' | 'on-site' | 'complete';

interface StageDescriptor {
  label: string;
  glyph: string;
  /** Semantic slot used for the tinted status disc + icon. */
  slot: 'muted' | 'primary' | 'warn' | 'success';
  /** Label for the button that advances to the next stage. */
  advance?: string;
  /** The stage that pressing advance moves to. */
  next?: DispatchStage;
  /** Button accent for the advance action. */
  tone?: ButtonTone;
}

const DISPATCH_STAGE: Record<DispatchStage, StageDescriptor> = {
  unassigned: { label: 'Unassigned', glyph: '○', slot: 'muted', advance: 'Accept', next: 'accepted', tone: 'primary' },
  accepted: { label: 'Accepted', glyph: '✓', slot: 'primary', advance: 'Start driving', next: 'en-route', tone: 'primary' },
  'en-route': { label: 'En route', glyph: '→', slot: 'warn', advance: 'Arrive', next: 'on-site', tone: 'primary' },
  'on-site': { label: 'On site', glyph: '▶', slot: 'success', advance: 'Complete', next: 'complete', tone: 'success' },
  complete: { label: 'Complete', glyph: '✓', slot: 'success', advance: undefined, next: undefined, tone: 'success' },
};

export interface DispatchBarProps {
  /** Current dispatch stage — text + glyph + color. */
  stage: DispatchStage;
  /** Localized ETA / arrival window (e.g. "ETA 12 min"). */
  eta?: string;
  /** Work order / job label shown as the primary line. */
  jobLabel?: string;
  /** Fires with the next stage when the advance button is pressed. */
  onAdvance?: (next: DispatchStage) => void;
  /** Fires when the secondary Navigate action is pressed. */
  onNavigate?: () => void;
  /** Blocks the advance action and shows a spinner. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A dispatch status/action bar for the tech's active job. Shows the current
 * stage as a tinted glyph disc + label (text + glyph + a color that traces to a
 * `SemanticColors` slot — never color alone) with an optional ETA and job
 * label, plus a primary button that advances the workflow (accept → en-route →
 * on-site → complete) firing `onAdvance(next)`. An optional Navigate action
 * sits alongside. No literal colors.
 */
export function DispatchBar({
  stage,
  eta,
  jobLabel,
  onAdvance,
  onNavigate,
  loading = false,
  style,
}: DispatchBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = DISPATCH_STAGE[stage] ?? DISPATCH_STAGE.unassigned;
  const tint = sd.slot === 'muted' ? colors.muted : colors[sd.slot];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(tint, 0.14),
        }}
      >
        <Icon glyph={sd.glyph} color={sd.slot} accessibilityLabel={sd.label} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {jobLabel ?? sd.label}
        </Text>
        <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {sd.glyph} {sd.label}
          {eta != null ? ` · ${eta}` : ''}
        </Text>
      </View>
      {onNavigate ? (
        <Button variant="outline" size="sm" onPress={onNavigate}>
          Navigate
        </Button>
      ) : null}
      {sd.advance != null && sd.next != null ? (
        <Button
          variant="primary"
          size="sm"
          tone={sd.tone}
          loading={loading}
          onPress={() => onAdvance?.(sd.next as DispatchStage)}
        >
          {sd.advance}
        </Button>
      ) : null}
    </View>
  );
}
