import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Badge } from '../primitives';
import { withAlpha } from './internal/format';
import { permitStatus } from './internal/status';
import type { PermitStatusProps } from './PermitStatus';

/** Drop-in replacement for {@link PermitStatus} — identical props, distinct design. */
export type PermitStatusV3Props = PermitStatusProps;

/**
 * PermitStatus, alternate design **V3** — a compact status pill row. The permit
 * title / number ride the left of a single line, and the current status reads
 * as one glyph + text + color pill on the right (a `denied` permit shows the
 * danger-toned pill; `role="alert"` is preserved). An optional updated-date sits
 * below. Dense enough for a permits list. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
export function PermitStatusV3({
  status,
  permitNumber,
  title,
  updatedDate,
  loading = false,
  style,
}: PermitStatusV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = permitStatus(status);
  const denied = status === 'denied';

  if (loading) {
    return (
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Loading permit status"
        style={[
          { height: 44, borderRadius: tokens.radius.md, backgroundColor: withAlpha(colors.muted, 0.14) },
          style,
        ]}
      />
    );
  }

  return (
    <View style={[{ paddingVertical: tokens.spacing.sm, gap: 2 }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View style={{ flex: 1, gap: 1 }}>
          {title != null ? (
            <Text
              numberOfLines={1}
              style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
            >
              {title}
            </Text>
          ) : null}
          {permitNumber != null ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {permitNumber}
            </Text>
          ) : null}
        </View>
        <View {...(denied ? { accessibilityRole: 'alert' as const } : {})}>
          <Badge tone={sd.tone} variant="soft" size="sm">
            {`${sd.glyph} ${sd.label}`}
          </Badge>
        </View>
      </View>
      {updatedDate != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Updated {updatedDate}</Text>
      ) : null}
    </View>
  );
}
