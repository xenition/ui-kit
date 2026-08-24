import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Steps, Icon } from '../primitives';
import { withAlpha } from './internal/format';
import {
  permitStatus,
  PERMIT_STAGES,
  PERMIT_STATUS,
  type PermitStatusValue,
} from './internal/status';

export type { PermitStatusValue };

export interface PermitStatusProps {
  /** Current permit lifecycle status. */
  status: PermitStatusValue;
  /** Permit / application reference number (e.g. "BLD-2026-0417"). */
  permitNumber?: string;
  /** Human permit title (e.g. "Building permit — 12 Oak St"). */
  title?: string;
  /** Localized date of the most recent status change. */
  updatedDate?: string;
  /** Show a skeleton-free loading placeholder instead of the tracker. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a danger banner conveyed by **glyph + text +
 * color** (never color alone). Guarded against unknown statuses. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
export function PermitStatus({
  status,
  permitNumber,
  title,
  updatedDate,
  loading = false,
  style,
}: PermitStatusProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = permitStatus(status);
  const denied = status === 'denied';

  const steps = PERMIT_STAGES.map((stage) => ({ title: PERMIT_STATUS[stage].label }));
  // Clamp the active index into the stage list; `issued` (step 3) is the last.
  const current = denied ? 1 : Math.min(sd.step, steps.length - 1);

  return (
    <Card variant="elevated" style={style}>
      {title != null || permitNumber != null ? (
        <View style={{ marginBottom: tokens.spacing.md, gap: 2 }}>
          {title != null ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
            >
              {title}
            </Text>
          ) : null}
          {permitNumber != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{permitNumber}</Text>
          ) : null}
        </View>
      ) : null}

      {loading ? (
        <View
          accessibilityRole="progressbar"
          accessibilityLabel="Loading permit status"
          style={{
            height: 48,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.muted, 0.14),
          }}
        />
      ) : denied ? (
        <View
          accessibilityRole="alert"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            padding: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.danger, 0.12),
            borderWidth: 1,
            borderColor: colors.danger,
          }}
        >
          <Icon glyph={sd.glyph} color="danger" accessibilityLabel="Denied" />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              Permit denied
            </Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs }}>
              Review the notice and re-apply or appeal.
            </Text>
          </View>
        </View>
      ) : (
        <Steps steps={steps} current={current} />
      )}

      {updatedDate != null && !loading ? (
        <Text style={{ marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${sd.glyph} ${sd.label} · updated ${updatedDate}`}
        </Text>
      ) : null}
    </Card>
  );
}
