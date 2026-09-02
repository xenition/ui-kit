import * as React from 'react';
import { Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { chambersGradient, chambersInk, chambersInkSoft, chambersTile, chambersBorder } from './internal/chambers';
import { MATTER_STAGE_META, MATTER_STAGE_ORDER, clampPct, toneColor } from './internal';
import type { MatterStatusProps } from './MatterStatus';

/** Drop-in for {@link MatterStatusProps} — same props, the V4 "chambers" design. */
export type MatterStatusV4Props = MatterStatusProps;

/**
 * MatterStatus — **V4** "chambers" design (native twin of the web V4), and the
 * ONE reserved gradient moment of the legal V4 "chambers" line: the header
 * (matter title, current stage glyph + word, and a frosted "Stage N of 6" chip)
 * rides a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`chambersGradient`) in near-white ink (`chambersInk` / `chambersInkSoft`). The
 * body — the segmented **intake → active → discovery → trial → settlement →
 * closed** meter — stays on the plain surface: segments up to the current stage
 * fill with the stage tone token, the rest use the border token. Status is
 * carried by glyph + stage word, never color alone; exposes an ARIA
 * `progressbar`. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()` + the chambers ramp helpers, dark-mode safe.
 */
export function MatterStatusV4({
  title,
  stage,
  progressPct,
  opened,
  attorney,
  variant = 'default',
  onPress,
  testID,
  style,
}: MatterStatusV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = chambersInk(r);
  const inkSoft = chambersInkSoft(r);
  const compact = variant === 'compact';
  const currentIndex = Math.max(0, MATTER_STAGE_ORDER.indexOf(stage));
  const total = MATTER_STAGE_ORDER.length;
  const derivedPct = clampPct(progressPct ?? Math.round(((currentIndex + 1) / total) * 100));
  const stageMeta = MATTER_STAGE_META[stage];
  const fillColor = toneColor(colors, stageMeta.tone);

  const shell: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
  };

  const body = (
    <View style={[shell, style]}>
      {/* Reserved gradient moment: the matter hero header. */}
      <GradientSurface
        colors={chambersGradient(r)}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, paddingHorizontal: compact ? tokens.spacing.md : tokens.spacing.lg, paddingVertical: compact ? tokens.spacing.sm : tokens.spacing.lg }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          {title ? <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text> : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{stageMeta.glyph}</Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{stageMeta.label}</Text>
          </View>
          {!compact && (opened || attorney) ? (
            <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{[opened, attorney].filter(Boolean).join('  ·  ')}</Text>
          ) : null}
        </View>
        <View style={{ paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: chambersTile(r), borderWidth: 1, borderColor: chambersBorder(r) }}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }}>Stage {currentIndex + 1} of {total}</Text>
        </View>
      </GradientSurface>

      {/* Clean body: the segmented stage meter on the plain surface. */}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: derivedPct }}
          accessibilityLabel={`${stageMeta.label}, ${derivedPct}% complete`}
          style={{ flexDirection: 'row', gap: 3 }}
        >
          {MATTER_STAGE_ORDER.map((s, i) => (
            <View key={s} style={{ flex: 1, height: 8, borderRadius: tokens.radius.full, backgroundColor: i <= currentIndex ? fillColor : colors.border }} />
          ))}
        </View>
        {!compact ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>Stage {currentIndex + 1} of {total} · {derivedPct}%</Text>
        ) : null}
      </View>
    </View>
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
