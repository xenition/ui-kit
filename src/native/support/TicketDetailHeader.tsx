import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives/Avatar';
import { GradientSurface } from './internal/GradientSurface';
import { consoleGradient, consoleInk, consoleInkSoft, consoleTile, consoleBorder } from './internal/console';
import type { TicketStatus } from './TicketRow';
import type { Priority } from './TicketPriority';

/** Status glyph + label for the frosted status tile — status is never color-only. */
const STATUS_META: Record<TicketStatus, { glyph: string; label: string }> = {
  open: { glyph: '◉', label: 'Open' },
  pending: { glyph: '◐', label: 'Pending' },
  solved: { glyph: '✓', label: 'Solved' },
  closed: { glyph: '✕', label: 'Closed' },
};

/** Priority glyph + label for the frosted priority tile. */
const PRIORITY_META: Record<Priority, { glyph: string; label: string }> = {
  low: { glyph: '▽', label: 'Low' },
  normal: { glyph: '▷', label: 'Normal' },
  high: { glyph: '△', label: 'High' },
  urgent: { glyph: '⚑', label: 'Urgent' },
};

export interface TicketDetailHeaderProps {
  /** Ticket subject line — the big near-white headline on the gradient. */
  subject: string;
  /** Human-readable ticket reference (e.g. `"#4821"`). */
  ticketId: string;
  /** Lifecycle status; rendered as a glyph + label frosted tile. */
  status: TicketStatus;
  /** Optional priority; rendered as a second frosted tile when set. */
  priority?: Priority;
  /** Requester display name (drives the avatar fallback + requester row). */
  requester?: string;
  /** Optional requester avatar URL. */
  requesterAvatar?: string;
  /** Agent the ticket is assigned to; shown in the requester row when set. */
  assignee?: string;
  /** SLA countdown/label (e.g. `"Due in 2h 05m"`); rendered as a frosted tile. */
  slaLabel?: string;
  /** When `true`, the SLA tile reads as breached (warning glyph + "breached" a11y). */
  slaBreached?: boolean;
  /** Optional free-form tags rendered as small frosted chips. */
  tags?: readonly string[];
  /** Primary "solve" CTA handler; the button is hidden when unset. */
  onSolve?: () => void;
  /** Primary CTA label (default `"Solve"`). */
  solveLabel?: string;
  /** Secondary "assign" CTA handler; the button is hidden when unset. */
  onAssign?: () => void;
  /** Secondary CTA label (default `"Assign"`). */
  assignLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * TicketDetailHeader — the gradient "console" hero shown when an agent opens a
 * ticket. The one saturated surface at the top of the detail view: the subject
 * reads as big near-white ink over the console gradient, with the ticket id,
 * status, optional priority, and SLA countdown carried on frosted tiles. A
 * requester row (avatar + requester → assignee), optional tag chips, and a
 * near-white primary "Solve" pill beside a ghost "Assign" button complete it.
 * Status/priority/SLA carry a glyph so meaning is never color-only.
 * Presentational — shaped data + callbacks only; every color derives from the
 * compiled theme ramps (token-only, no literals), light + dark safe.
 */
export function TicketDetailHeader({
  subject,
  ticketId,
  status,
  priority,
  requester,
  requesterAvatar,
  assignee,
  slaLabel,
  slaBreached = false,
  tags,
  onSolve,
  solveLabel = 'Solve',
  onAssign,
  assignLabel = 'Assign',
  style,
}: TicketDetailHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = consoleInk(r);
  const inkSoft = consoleInkSoft(r);
  const statusMeta = STATUS_META[status] ?? STATUS_META.open;
  const priorityMeta = priority ? PRIORITY_META[priority] : undefined;

  const Tile = ({ glyph, label, a11yLabel }: { glyph: string; label: string; a11yLabel: string }) => (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={a11yLabel}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.xs,
        borderRadius: tokens.radius.full,
        backgroundColor: consoleTile(r),
        borderWidth: 1,
        borderColor: consoleBorder(r),
      }}
    >
      <Text allowFontScaling={false} style={{ color: ink, fontSize: tokens.typography.scale.sm }}>
        {glyph}
      </Text>
      <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{label}</Text>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={consoleGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{ticketId}</Text>
          <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800', letterSpacing: -0.5 }}>
            {subject}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          <Tile glyph={statusMeta.glyph} label={statusMeta.label} a11yLabel={`Status ${statusMeta.label}`} />
          {priorityMeta ? (
            <Tile glyph={priorityMeta.glyph} label={priorityMeta.label} a11yLabel={`Priority ${priorityMeta.label}`} />
          ) : null}
          {slaLabel ? (
            <Tile
              glyph={slaBreached ? '⚠' : '⏱'}
              label={slaLabel}
              a11yLabel={slaBreached ? `SLA breached, ${slaLabel}` : `SLA, ${slaLabel}`}
            />
          ) : null}
        </View>

        {requester || assignee ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
            <Avatar size="md" name={requester} src={requesterAvatar} />
            <View style={{ flex: 1, minWidth: 0 }}>
              {requester ? (
                <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                  {requester}
                </Text>
              ) : null}
              {assignee ? (
                <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
                  {`Assigned to ${assignee}`}
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}

        {tags && tags.length > 0 ? (
          <View accessibilityLabel="Tags" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {tags.map((tag) => (
              <View
                key={tag}
                style={{
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 2,
                  borderRadius: tokens.radius.full,
                  backgroundColor: consoleTile(r),
                  borderWidth: 1,
                  borderColor: consoleBorder(r),
                }}
              >
                <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{tag}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {onSolve || onAssign ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {onSolve ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={solveLabel}
                onPress={onSolve}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.lg,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: ink,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
                  {solveLabel}
                </Text>
              </Pressable>
            ) : null}
            {onAssign ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={assignLabel}
                onPress={onAssign}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 44,
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.lg,
                  borderRadius: tokens.radius.md,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: consoleBorder(r),
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                  {assignLabel}
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
