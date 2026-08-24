import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  MATTER_STAGE_META,
  MATTER_STAGE_ORDER,
  clampPct,
  toneColor,
  type MatterStage,
} from './internal';

export type MatterStatusVariant = 'default' | 'compact';

export interface MatterStatusProps {
  /** Matter title / caption. */
  title?: string;
  /** Current workflow stage — drives the meter fill + pill. */
  stage: MatterStage;
  /** Optional 0–100 progress within the current stage (default derived from stage). */
  progressPct?: number;
  /** Pre-formatted opened / age label. */
  opened?: string;
  /** Responsible attorney. */
  attorney?: string;
  /** Density. */
  variant?: MatterStatusVariant;
  /** Tap handler. */
  onPress?: () => void;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Stage tracker for a legal matter: a segmented progress meter across the
 * intake → active → discovery → trial → settlement → closed workflow, with the
 * current stage as a glyph + word pill (never color alone). Segments up to and
 * including the current stage fill with the primary token; the rest use the
 * border token. All colors are theme tokens — no literals.
 */
export function MatterStatus({
  title,
  stage,
  progressPct,
  opened,
  attorney,
  variant = 'default',
  onPress,
  testID,
  style,
}: MatterStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const currentIndex = Math.max(0, MATTER_STAGE_ORDER.indexOf(stage));
  const total = MATTER_STAGE_ORDER.length;
  const derivedPct = clampPct(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
  const stageMeta = MATTER_STAGE_META[stage];
  const fillColor = toneColor(colors, stageMeta.tone);

  const body = (
    <Card variant="outlined" padding={compact ? 'sm' : 'md'} style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 2 }}>
          {title ? (
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {title}
            </Text>
          ) : null}
          {!compact && (opened || attorney) ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {[opened, attorney].filter(Boolean).join(' · ')}
            </Text>
          ) : null}
        </View>
        <StatusPill meta={stageMeta} size="sm" />
      </View>

      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: derivedPct }}
        accessibilityLabel={`${stageMeta.label}, ${derivedPct}% complete`}
        style={{ flexDirection: 'row', gap: 3 }}
      >
        {MATTER_STAGE_ORDER.map((s, i) => {
          const done = i <= currentIndex;
          return (
            <View
              key={s}
              style={{
                flex: 1,
                height: 6,
                borderRadius: tokens.radius.full,
                backgroundColor: done ? fillColor : colors.border,
              }}
            />
          );
        })}
      </View>

      {!compact ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          Stage {currentIndex + 1} of {total} · {derivedPct}%
        </Text>
      ) : null}
    </Card>
  );

  if (onPress) {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`Matter ${title ?? stageMeta.label}`} onPress={onPress} testID={testID}>
        {body}
      </Pressable>
    );
  }
  return <View testID={testID}>{body}</View>;
}
