import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Input, Button } from '../primitives';
import { withAlpha } from './internal';

export interface ReportReason {
  /** Stable reason id passed back on submit. */
  id: string;
  /** Human-readable reason label. */
  label: string;
  /** When true, the details field becomes required for this reason. */
  requiresDetails?: boolean;
}

export interface ReportListingProps {
  /** Selectable report reasons. */
  reasons: ReportReason[];
  /** Heading text (default "Report this listing"). */
  title?: string;
  /** Submit button label (default "Submit report"). */
  submitLabel?: string;
  /** Show a spinner and block submission. */
  loading?: boolean;
  /** Fires with the chosen reason id and any details once valid. */
  onSubmit?: (reasonId: string, details?: string) => void;
  /** Fires when the cancel action is pressed. Omit to hide cancel. */
  onCancel?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A report-a-listing form — a single-select list of reasons plus a details
 * field that becomes required when the chosen reason sets `requiresDetails`.
 * Reasons render as radios (selection carried by an accent ring, a filled dot,
 * and the a11y `selected` state — not color alone); submit is disabled until a
 * valid reason (and any required details) is present, and an empty `reasons`
 * list degrades to a token-styled empty note. Presentational: a valid submit
 * calls `onSubmit(reasonId, details?)`. Reuses `Input`/`Button`; token-only
 * colors with a token-derived alpha tint.
 */
export function ReportListing({
  reasons,
  title = 'Report this listing',
  submitLabel = 'Submit report',
  loading = false,
  onSubmit,
  onCancel,
  style,
}: ReportListingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [details, setDetails] = React.useState('');

  const selected = reasons.find((r) => r.id === selectedId) ?? null;
  const detailsRequired = selected?.requiresDetails === true;
  const detailsOk = !detailsRequired || details.trim().length > 0;
  const valid = selected != null && detailsOk;

  const submit = (): void => {
    if (!valid || loading) return;
    onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
  };

  return (
    <View
      style={[
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
        {title}
      </Text>

      {reasons.length === 0 ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No report reasons available</Text>
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>
          {reasons.map((reason) => {
            const isSel = reason.id === selectedId;
            const dot = 18;
            return (
              <Pressable
                key={reason.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSel }}
                accessibilityLabel={reason.label}
                onPress={() => setSelectedId(reason.id)}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: tokens.spacing.md,
                  borderRadius: tokens.radius.md,
                  borderWidth: 1,
                  borderColor: isSel ? colors.primary : colors.border,
                  backgroundColor: isSel ? withAlpha(colors.primary, 0.08) : colors.surface,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <View
                  style={{
                    width: dot,
                    height: dot,
                    borderRadius: dot / 2,
                    borderWidth: 2,
                    borderColor: isSel ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSel ? (
                    <View style={{ width: dot / 2, height: dot / 2, borderRadius: dot / 4, backgroundColor: colors.primary }} />
                  ) : null}
                </View>
                <Text style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
                  {reason.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {selected ? (
        <Input
          testID="xen-mkt-report-details"
          label={detailsRequired ? 'Details (required)' : 'Details (optional)'}
          placeholder="Add any specifics"
          value={details}
          onChangeText={setDetails}
          invalid={detailsRequired && !detailsOk && details.length > 0}
          multiline
        />
      ) : null}

      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {onCancel ? (
          <Button variant="ghost" onPress={onCancel} style={{ flex: 1 }}>
            Cancel
          </Button>
        ) : null}
        <Button variant="primary" tone="danger" onPress={submit} disabled={!valid} loading={loading} style={{ flex: 1 }}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
}
