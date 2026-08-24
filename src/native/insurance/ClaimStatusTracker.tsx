import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Steps, Icon, type StepItem } from '../primitives';
import { withAlpha } from './internal/format';
import { claimStatus, type ClaimStatus } from './internal/status';

export type { ClaimStatus };

export interface ClaimStatusTrackerProps {
  /** Current claim lifecycle status. */
  status: ClaimStatus;
  /** Localized last-updated string (already formatted by the caller). */
  updated?: string;
  style?: StyleProp<ViewStyle>;
}

/** Happy-path stages, in order. `denied` branches off `review`. */
const HAPPY_PATH: StepItem[] = [
  { title: 'Filed' },
  { title: 'In review' },
  { title: 'Approved' },
  { title: 'Paid' },
];

/**
 * A stage tracker for a single claim. The happy path (Filed → In review →
 * Approved → Paid) reuses the `Steps` primitive, with `current` derived from the
 * status descriptor (`paid` marks every stage done). A `denied` claim branches
 * off the review stage and renders a distinct `danger`-toned banner conveyed by
 * **glyph + text + color** — never color alone. Token-bound throughout.
 */
export function ClaimStatusTracker({
  status,
  updated,
  style,
}: ClaimStatusTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const sd = claimStatus(status);

  if (status === 'denied') {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        <View
          accessibilityLabel="Claim denied"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.danger,
            backgroundColor: withAlpha(colors.danger, 0.1),
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          <Icon glyph={sd.glyph} color="danger" accessibilityLabel="Denied" />
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              Claim denied
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              Reviewed after filing. Contact your agent to appeal.
            </Text>
          </View>
        </View>
        {updated != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Updated {updated}</Text>
        ) : null}
      </View>
    );
  }

  // `paid` (step 3) marks the final stage done too → current past the last index.
  const current = status === 'paid' ? HAPPY_PATH.length : sd.step;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <Steps steps={HAPPY_PATH} current={current} />
      <Text
        accessibilityLabel={`Claim status: ${sd.label}`}
        style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }}
      >
        {sd.glyph} {sd.label}
        {updated != null ? ` · Updated ${updated}` : ''}
      </Text>
    </View>
  );
}
