import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon } from '../primitives';
import { withAlpha } from './internal/format';
import { permitStatus, PERMIT_STAGES, PERMIT_STATUS } from './internal/status';
import type { PermitStatusProps } from './PermitStatus';

/** Drop-in replacement for {@link PermitStatus} — identical props, distinct design. */
export type PermitStatusV2Props = PermitStatusProps;

/**
 * PermitStatus, alternate design **V2** — a big **vertical timeline**. Each
 * happy-path stage (submitted → review → approved → issued) is its own row with
 * a numbered/checked marker joined by a connecting rail; done stages fill with
 * primary, the active stage rings, and upcoming stages stay muted. A `denied`
 * permit branches into a danger banner (`role="alert"`, glyph + text + color,
 * never color alone) above the rail. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
export function PermitStatusV2({
  status,
  permitNumber,
  title,
  updatedDate,
  loading = false,
  style,
}: PermitStatusV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = permitStatus(status);
  const denied = status === 'denied';
  const stages = PERMIT_STAGES;
  const current = denied ? 1 : Math.min(sd.step, stages.length - 1);

  return (
    <Card variant="elevated" style={style}>
      {title != null || permitNumber != null ? (
        <View style={{ marginBottom: tokens.spacing.md, gap: 2 }}>
          {title != null ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
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
          style={{ height: 120, borderRadius: tokens.radius.md, backgroundColor: withAlpha(colors.muted, 0.14) }}
        />
      ) : (
        <>
          {denied ? (
            <View
              accessibilityRole="alert"
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.md,
                marginBottom: tokens.spacing.md,
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
          ) : null}

          <View>
            {stages.map((stage, i) => {
              const desc = PERMIT_STATUS[stage] ?? PERMIT_STATUS.submitted;
              const done = i < current;
              const active = i === current && !denied;
              const last = i === stages.length - 1;
              const markerBg = done ? colors.primary : active ? withAlpha(colors.primary, 0.16) : withAlpha(colors.muted, 0.12);
              const markerBorder = done || active ? colors.primary : withAlpha(colors.muted, 0.3);
              const labelColor = done || active ? colors.onSurface : colors.muted;
              return (
                <View key={stage} style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
                  <View style={{ alignItems: 'center', width: 32 }}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: markerBg,
                        borderWidth: 2,
                        borderColor: markerBorder,
                      }}
                    >
                      {done ? (
                        <Icon glyph="✓" size="sm" color="onPrimary" accessibilityLabel="Done" />
                      ) : (
                        <Text
                          style={{
                            color: active ? colors.primary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                          }}
                        >
                          {i + 1}
                        </Text>
                      )}
                    </View>
                    {!last ? (
                      <View
                        style={{
                          width: 2,
                          flex: 1,
                          minHeight: 20,
                          backgroundColor: done ? colors.primary : withAlpha(colors.muted, 0.25),
                        }}
                      />
                    ) : null}
                  </View>
                  <View style={{ flex: 1, paddingBottom: last ? 0 : tokens.spacing.md, gap: 1 }}>
                    <Text style={{ color: labelColor, fontSize: tokens.typography.scale.base, fontWeight: active ? '800' : '600' }}>
                      {desc.glyph} {desc.label}
                    </Text>
                    {active ? (
                      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Current stage</Text>
                    ) : null}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}

      {updatedDate != null && !loading ? (
        <Text style={{ marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${sd.glyph} ${sd.label} · updated ${updatedDate}`}
        </Text>
      ) : null}
    </Card>
  );
}
