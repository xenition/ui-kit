import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { InputV4 } from '../primitives/InputV4';
import { PopconfirmV4 } from '../primitives/PopconfirmV4';
import { TextV4 } from '../primitives/TextV4';
import type { ReportListingProps, ReportReason } from './ReportListing';
import {
  rowContainerStyle,
  rowGround,
  rowTextStyle,
  rowTrailingStyle,
} from '../dashboard/internal/row-v4';

export type { ReportReason };

export interface ReportListingV4Props extends ReportListingProps {
  /**
   * What the confirmation step asks. Default names the consequence and the one
   * thing a reporter is usually afraid of.
   *
   * §26 asks that a destructive consequence be *legible*: "Are you sure?" is
   * not legible, it is a speed bump. The default says what happens and what
   * does not.
   */
  confirmMessage?: string;
  /** The confirm button's label inside the bubble. Default `'Report'`. */
  confirmLabel?: string;
}

/**
 * **V4 report-a-listing form** — the one component in Group D where `danger`
 * is spent honestly, and the one that grows a step it did not have.
 *
 * ## The confirmation step
 *
 * Reporting is **outward-facing and hard to reverse**: it names another person
 * to a moderator, and nothing in the product un-names them. The base fired it
 * on a single tap of a button that sat exactly where "Save" sits on every other
 * form in the kit. §25 asks for friction proportional to risk, and this is the
 * highest-risk tap in either module — so the submit is wrapped in
 * `PopconfirmV4`, the kit's existing confirmation affordance, rather than a new
 * one invented here. Popconfirm already gets the parts that are easy to get
 * wrong right: it clones the trigger instead of nesting a second `Pressable`
 * under it (which on native would eat the responder and make the whole thing a
 * silent no-op), the destructive button is the only coloured thing in the
 * bubble, and the scrim is the shadow colour rather than `onSurface`, which
 * inverts.
 *
 * A single tap now opens the sheet and submits nothing.
 *
 * ## Everything else
 *
 * 1. **The reasons are an option list, not a radio list.** Same treatment as
 *    `ShippingOptionV4`, for the same HIG rule: a persistent `selected`
 *    highlight plus a trailing checkmark. The 18pt hand-drawn dot, its
 *    `borderWidth: 2` and the `withAlpha(primary, 0.08)` tint all go.
 *    `accessibilityRole="radio"` and the `selected` state stay.
 * 2. **The rows are the family's rows**, on the 56 metric with `md` gutters,
 *    so a list of reasons is a list rather than a stack of outlined chips.
 * 3. **The details field is `InputV4`** — the 48/`radius.md` metric — and its
 *    requirement is a **sentence** when it is unmet, not a red outline
 *    (Addendum item 2, the same exception `MakeOfferFormV4` takes).
 * 4. **Both twins degrade to `EmptyStateV4`.** This twin rendered a bare grey
 *    line of text where the web one composed an empty state — the parity defect
 *    this pass keeps finding, closed here.
 * 5. **The panel is a card on `card`** (rule 4), not `surface`.
 */
export function ReportListingV4({
  reasons,
  title = 'Report this listing',
  submitLabel = 'Submit report',
  loading = false,
  onSubmit,
  onCancel,
  confirmMessage = 'Report this listing? A moderator will review it, and the seller is not told who reported it.',
  confirmLabel = 'Report',
  style,
}: ReportListingV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [details, setDetails] = React.useState('');

  const selected = reasons.find((r) => r.id === selectedId) ?? null;
  const detailsRequired = selected?.requiresDetails === true;
  const detailsOk = !detailsRequired || details.trim().length > 0;
  const valid = selected != null && detailsOk;

  // Words, not a border. Only once the user has typed and cleared the box —
  // shouting at an empty field nobody has touched is not a validation.
  const detailsError =
    detailsRequired && !detailsOk && details.length > 0
      ? 'Tell us what happened — this reason needs details.'
      : undefined;

  const submit = (): void => {
    if (!valid || loading || selected == null) return;
    onSubmit?.(selected.id, details.trim() ? details.trim() : undefined);
  };

  return (
    <CardV4
      variant="outlined"
      padding="lg"
      radius="lg"
      style={[
        // Rule 4: a card's ground is `card`, not `surface`.
        { backgroundColor: colors.card, gap: tokens.spacing.md },
        style,
      ]}
    >
      <TextV4 size="lg" weight="bold" tone="onCard">
        {title}
      </TextV4>

      {reasons.length === 0 ? (
        <EmptyStateV4
          title="No report reasons available"
          description="There is nothing to report against on this listing yet."
        />
      ) : (
        <View accessibilityRole="radiogroup" accessibilityLabel={title}>
          {reasons.map((reason) => {
            const isSel = reason.id === selectedId;
            return (
              <Pressable
                key={reason.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSel }}
                accessibilityLabel={reason.label}
                onPress={() => setSelectedId(reason.id)}
                style={({ pressed }): StyleProp<ViewStyle> => [
                  rowContainerStyle(theme),
                  {
                    borderRadius: tokens.radius.md,
                    backgroundColor: rowGround(theme, { pressed, selected: isSel }),
                  },
                ]}
              >
                <View style={rowTextStyle(theme)}>
                  <TextV4 size="base" tone={isSel ? 'onSelected' : 'onSurface'}>
                    {reason.label}
                  </TextV4>
                </View>
                {isSel ? (
                  <View style={rowTrailingStyle(theme)} testID="xen-report-check">
                    {/* HIG's option-list confirmation; the `selected` a11y state
                        already says it, so the mark is decorative. */}
                    <IconV4 name="check" size="base" color="primary" />
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      )}

      {selected != null ? (
        <InputV4
          testID="xen-mkt-report-details"
          label={detailsRequired ? 'Details (required)' : 'Details (optional)'}
          placeholder="Add any specifics"
          value={details}
          onChangeText={setDetails}
          error={detailsError}
          multiline
        />
      ) : null}

      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {onCancel != null ? (
          <ButtonV4 variant="ghost" onPress={onCancel} style={{ flex: 1 }}>
            Cancel
          </ButtonV4>
        ) : null}
        <View style={{ flex: 1 }}>
          <PopconfirmV4
            message={confirmMessage}
            confirmLabel={confirmLabel}
            onConfirm={submit}
            trigger={
              <ButtonV4 variant="primary" tone="danger" disabled={!valid || loading} loading={loading}>
                {submitLabel}
              </ButtonV4>
            }
          />
        </View>
      </View>
    </CardV4>
  );
}
