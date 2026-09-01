import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { flowGradient, flowInk, flowInkSoft, flowTile, flowBorder } from './internal/flow';

/** Project delivery status — drives the frosted status pill's glyph + label. */
export type ProjectStatus = 'on-track' | 'at-risk' | 'off-track' | 'done';

export interface ProjectHeaderProps {
  /** Project name — the near-white headline on the gradient. */
  name: string;
  /** Optional one-line description under the name. */
  description?: string;
  /** Completion percentage `0–100`; shown as a near-white progress bar + numeral. */
  progressPct: number;
  /** Done / total task counts, rendered as a frosted stat tile. */
  taskCounts?: { done: number; total: number };
  /** Members on the project — rendered as an overlapping avatar stack (max 5 shown). */
  members?: readonly { name: string; avatarUrl?: string }[];
  /** Localized due-date label, rendered as a frosted stat tile. */
  dueLabel?: string;
  /** Delivery status; rendered as a frosted status pill. */
  status?: ProjectStatus;
  /** Fires on the "Add task" CTA. Hidden when unset. */
  onAddTask?: () => void;
  /** Fires on the settings (gear) action. Hidden when unset. */
  onSettings?: () => void;
  /** Outer style override for layout composition. */
  style?: StyleProp<ViewStyle>;
}

const STATUS_META: Record<ProjectStatus, { glyph: string; label: string }> = {
  'on-track': { glyph: '🟢', label: 'On track' },
  'at-risk': { glyph: '🟡', label: 'At risk' },
  'off-track': { glyph: '🔴', label: 'Off track' },
  done: { glyph: '✓', label: 'Done' },
};

/**
 * ProjectHeader — the project-detail hero for the productivity **V4 "flow"** line.
 * A brand-gradient panel that opens a project workspace: the near-white project
 * name + description, a near-white progress bar with its numeral, frosted stat
 * tiles (done/total, due), an overlapping member avatar stack, and a frosted
 * status pill. "Add task" (a near-white pill) and a frosted settings button each
 * appear only when their handler is set. Presentational — shaped data +
 * callbacks, nothing fetches. Every color derives from the brand ramp via
 * `GradientSurface` + `flow*(tokens.ramps)` — no literals, light + dark.
 */
export function ProjectHeader({
  name,
  description,
  progressPct,
  taskCounts,
  members,
  dueLabel,
  status,
  onAddTask,
  onSettings,
  style,
}: ProjectHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = flowInk(r);
  const inkSoft = flowInkSoft(r);
  const tile = flowTile(r);
  const border = flowBorder(r);

  const pct = Math.max(0, Math.min(100, Math.round(progressPct || 0)));
  const shown = members?.slice(0, 5) ?? [];
  const overflow = (members?.length ?? 0) - shown.length;
  const statusMeta = status ? STATUS_META[status] : null;

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
      <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text>
      <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={flowGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.sm }}>
              <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }}>
                {name}
              </Text>
              {statusMeta ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tile,
                    borderWidth: 1,
                    borderColor: border,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                  }}
                >
                  <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs }}>
                    {statusMeta.glyph}
                  </Text>
                  <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{statusMeta.label}</Text>
                </View>
              ) : null}
            </View>
            {description ? (
              <Text numberOfLines={2} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }}>
                {description}
              </Text>
            ) : null}
          </View>
          {onSettings ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Project settings"
              onPress={onSettings}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Icon glyph="⚙️" size="lg" />
            </Pressable>
          ) : null}
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Progress</Text>
            <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{`${pct}%`}</Text>
          </View>
          <View
            accessibilityRole="progressbar"
            accessibilityLabel={`Progress ${pct}%`}
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

        {taskCounts || dueLabel ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {taskCounts ? <Tile label="Tasks" value={`${taskCounts.done} / ${taskCounts.total}`} /> : null}
            {dueLabel ? <Tile label="Due" value={dueLabel} /> : null}
          </View>
        ) : null}

        {shown.length > 0 || onAddTask ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.md }}>
            {shown.length > 0 ? (
              <View
                accessibilityLabel={`${members?.length} members`}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                {shown.map((m, i) => (
                  <View key={`${m.name}-${i}`} style={{ marginLeft: i > 0 ? -8 : 0, borderRadius: tokens.radius.full, borderWidth: 2, borderColor: r.primary[600] }}>
                    <Avatar src={m.avatarUrl} name={m.name} size="sm" />
                  </View>
                ))}
                {overflow > 0 ? (
                  <View
                    style={{
                      marginLeft: -8,
                      width: 32,
                      height: 32,
                      borderRadius: tokens.radius.full,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: tile,
                      borderWidth: 2,
                      borderColor: r.primary[600],
                    }}
                  >
                    <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{`+${overflow}`}</Text>
                  </View>
                ) : null}
              </View>
            ) : (
              <View />
            )}
            {onAddTask ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Add task"
                onPress={onAddTask}
                style={({ pressed }) => ({
                  minHeight: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.xs,
                  borderRadius: tokens.radius.md,
                  backgroundColor: ink,
                  paddingHorizontal: tokens.spacing.lg,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>+ Add task</Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
