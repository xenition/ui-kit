import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { flowGradient, flowInk, flowInkSoft, flowTile, flowBorder } from './internal/flow';

export interface TodayHeaderProps {
  /** Greeting line above the date (default `'Good morning'`). */
  greeting?: string;
  /** The person's name, appended to the greeting (e.g. `'Sam'` → "Good morning, Sam"). */
  userName?: string;
  /** Localized date label (e.g. "Monday, Aug 31"). */
  dateLabel?: string;
  /** Number of tasks due today — the big near-white headline numeral. */
  dueToday: number;
  /** Number of tasks completed today — a frosted stat tile + progress source. */
  completedToday: number;
  /**
   * Explicit completion percentage `0–100` for the progress bar. When omitted it
   * is derived from `completedToday / (completedToday + dueToday)`.
   */
  progressPct?: number;
  /** Optional "next up" focus task label, rendered as a frosted focus tile. */
  focusLabel?: string;
  /** Outer style override for layout composition. */
  style?: StyleProp<ViewStyle>;
}

/**
 * TodayHeader — the "today" dashboard hero and the **peak** of the productivity
 * V4 "flow" line. A brand-gradient panel that greets the person, shows the date,
 * and states the day in one glance: a big near-white **"N tasks due today"**
 * numeral, a near-white progress bar with its percentage, frosted done/remaining
 * tiles, and an optional "next up" focus tile. Presentational — shaped data only,
 * nothing fetches. Every color derives from the brand ramp via `GradientSurface`
 * + `flow*(tokens.ramps)` — no literals, light + dark. The one vivid, motivating
 * surface at the top of the day.
 */
export function TodayHeader({
  greeting = 'Good morning',
  userName,
  dateLabel,
  dueToday,
  completedToday,
  progressPct,
  focusLabel,
  style,
}: TodayHeaderProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = flowInk(r);
  const inkSoft = flowInkSoft(r);
  const tile = flowTile(r);
  const border = flowBorder(r);

  const due = Math.max(0, Math.trunc(dueToday || 0));
  const done = Math.max(0, Math.trunc(completedToday || 0));
  const total = done + due;
  const pct = Math.max(
    0,
    Math.min(100, Math.round(progressPct ?? (total > 0 ? (done / total) * 100 : 0)))
  );
  const heading = userName ? `${greeting}, ${userName}` : greeting;

  const Tile = ({ label, value }: { label: string; value: string }) => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        borderRadius: tokens.radius.md,
        backgroundColor: tile,
        borderWidth: 1,
        borderColor: border,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
      }}
    >
      <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{value}</Text>
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={flowGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{heading}</Text>
          {dateLabel ? (
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{dateLabel}</Text>
          ) : null}
        </View>

        <View>
          <Text
            accessibilityLabel={`${due} ${due === 1 ? 'task' : 'tasks'} due today`}
            allowFontScaling={false}
            style={{ color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }}
          >
            {due}
          </Text>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {due === 1 ? 'task due today' : 'tasks due today'}
          </Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Today's progress</Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{`${pct}%`}</Text>
          </View>
          <View
            accessibilityRole="progressbar"
            accessibilityLabel={`${pct}% complete today`}
            accessibilityValue={{ min: 0, max: 100, now: pct }}
            style={{
              marginTop: tokens.spacing.xs,
              height: 8,
              borderRadius: tokens.radius.full,
              backgroundColor: tile,
              overflow: 'hidden',
            }}
          >
            <View style={{ width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: ink }} />
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          <Tile label="Done" value={String(done)} />
          <Tile label="Remaining" value={String(due)} />
        </View>

        {focusLabel ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              backgroundColor: tile,
              borderWidth: 1,
              borderColor: border,
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
            }}
          >
            <Icon glyph="▶" size="sm" />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>Next up</Text>
              <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {focusLabel}
              </Text>
            </View>
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
