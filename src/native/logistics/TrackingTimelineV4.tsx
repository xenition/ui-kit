import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { dispatchGradient, dispatchInk, dispatchInkSoft, dispatchTile, dispatchBorder } from './internal/dispatch';
import { TRACKING_ORDER, TRACKING_META, trackingIndex, toneColor, type TrackingStage } from './internal';
import type { TrackingTimelineProps, TrackingEvent } from './TrackingTimeline';

/** Drop-in for {@link TrackingTimelineProps} — same props, the V4 "dispatch" design. */
export type TrackingTimelineV4Props = TrackingTimelineProps;

/**
 * TrackingTimeline — **V4** "dispatch" design (native twin of the web V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`dispatchGradient`) in near-white ink (`dispatchInk` / `dispatchInkSoft`). The
 * body — the canonical **picked → in-transit → out-for-delivery → delivered**
 * rail — stays on the plain surface: reached stages fill with their tone token +
 * a glyph, the current stage is ringed, upcoming stages are muted. Status is
 * carried by glyph + stage word (+ a redundant per-node `accessibilityLabel`),
 * never color alone; an `exception` current stage flags the hero with a danger
 * word. Empty/loading states supported. Token-only colors via
 * `useXenitionTheme()` + the dispatch ramp helpers, dark-mode safe.
 */
export function TrackingTimelineV4({
  current,
  events,
  loading = false,
  style,
}: TrackingTimelineV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = dispatchInk(r);
  const inkSoft = dispatchInkSoft(r);

  const shell: ViewStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
  };

  if (loading) {
    return (
      <View accessibilityLabel="Loading tracking" style={[shell, style]}>
        <GradientSurface colors={dispatchGradient(r)} style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
          <View style={{ height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: dispatchTile(r, 0.28) }} />
          <View style={{ height: 12, width: '33%', borderRadius: tokens.radius.sm, backgroundColor: dispatchTile(r, 0.22) }} />
        </GradientSurface>
        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.md }}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
              <View style={{ width: 22, height: 22, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] }} />
              <View style={{ height: 10, flex: 1, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] }} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  const isException = current === 'exception';
  const currentIdx = isException ? -1 : trackingIndex(current);
  const headMeta = TRACKING_META[current] ?? TRACKING_META.picked;
  const reachedCount = isException ? 0 : currentIdx + 1;
  const eventFor = (stage: TrackingStage): TrackingEvent | undefined =>
    Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;

  return (
    <View accessibilityLabel={`Tracking: ${headMeta.label}`} style={[shell, style]}>
      {/* Reserved gradient moment: the tracking hero header. */}
      <GradientSurface colors={dispatchGradient(r)} style={{ padding: tokens.spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, minWidth: 0, gap: 2 }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 }}>Tracking</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.xl }}>{headMeta.glyph}</Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>{headMeta.label}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: dispatchTile(r), borderWidth: 1, borderColor: dispatchBorder(r) }}>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
            {isException ? '⚠ Exception' : `${reachedCount} of ${TRACKING_ORDER.length}`}
          </Text>
        </View>
      </GradientSurface>

      {/* Clean body: the vertical stage rail on the plain surface. */}
      <View style={{ padding: tokens.spacing.lg }}>
        {TRACKING_ORDER.map((stage, i) => {
          const meta = TRACKING_META[stage];
          const reached = currentIdx >= 0 && i <= currentIdx;
          const isCurrent = i === currentIdx;
          const last = i === TRACKING_ORDER.length - 1;
          const dotColor = reached ? toneColor(colors, meta.tone) : colors.border;
          const ev = eventFor(stage);

          return (
            <View
              key={stage}
              accessibilityRole="text"
              accessibilityLabel={`${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`}
              style={{ flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }}
            >
              <View style={{ alignItems: 'center' }}>
                <View style={{ width: 22, height: 22, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: reached ? dotColor : 'transparent', borderWidth: reached ? 0 : 2, borderColor: isCurrent ? colors.primary : colors.border }}>
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }}>
                    {reached ? (last ? '✓' : meta.glyph) : i + 1}
                  </Text>
                </View>
                {!last ? (
                  <View style={{ width: 2, flex: 1, marginTop: 2, backgroundColor: currentIdx >= 0 && i < currentIdx ? toneColor(colors, meta.tone) : colors.border }} />
                ) : null}
              </View>

              <View style={{ flex: 1, minWidth: 0, paddingBottom: tokens.spacing.xs }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: tokens.typography.scale.sm, fontWeight: isCurrent ? '700' : '600', color: reached ? colors.onSurface : colors.muted }}>{meta.label}</Text>
                  {ev?.time ? <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }}>{ev.time}</Text> : null}
                </View>
                {ev?.detail ? <Text numberOfLines={2} style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{ev.detail}</Text> : null}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
