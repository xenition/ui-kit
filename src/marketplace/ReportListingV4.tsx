import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import {
  V4_CARD_GROUND_ATTR,
  V4_CARD_GROUND_CSS,
  V4_CARD_GROUND_STYLE_ID,
} from '../primitives/internal/card-ground-v4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { InputV4 } from '../primitives/InputV4';
import { PopconfirmV4 } from '../primitives/PopconfirmV4';
import { TextV4 } from '../primitives/TextV4';
import type { ReportListingProps, ReportReason } from './ReportListing';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
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
 * on a single click of a button that sat exactly where "Save" sits on every
 * other form in the kit. §25 asks for friction proportional to risk, and this
 * is the highest-risk button in either module — so the submit is wrapped in
 * `PopconfirmV4`, the kit's existing confirmation affordance, rather than a new
 * one invented here. Popconfirm already gets the parts that are easy to get
 * wrong right: it clones the trigger instead of wrapping it (so a disabled
 * submit stays disabled), it focuses **Cancel** by default, and the destructive
 * button is the only coloured thing in the bubble.
 *
 * A single tap now opens the bubble and submits nothing.
 *
 * ## Everything else
 *
 * 1. **The reasons are an option list, not a radio list.** Same treatment as
 *    `ShippingOptionV4`, for the same HIG rule: a persistent `selected`
 *    highlight plus a trailing checkmark. The 18px hand-drawn dot and its
 *    `border-2` go, and so does `h-2 w-2` — both literals brief §1 names. Each
 *    reason is still a real `role="radio"` inside a `role="radiogroup"`.
 * 2. **The rows are the family's rows**, on the 56 metric with `md` gutters,
 *    so a list of reasons is a list rather than a stack of outlined chips.
 * 3. **The details field is `InputV4`** — the 48/`radius.md` metric — and its
 *    requirement is a **sentence** when it is unmet, not a red outline
 *    (Addendum item 2, the same exception `MakeOfferFormV4` takes).
 * 4. **Both twins degrade to `EmptyStateV4`.** The web base composed the
 *    commerce `EmptyState`; the native base rendered a bare grey line of text.
 *    That is the parity defect this pass keeps finding, and it is closed here.
 * 5. **The panel is a card on `card`** (rule 4), not `surface`.
 */
export const ReportListingV4 = React.forwardRef<HTMLDivElement, ReportListingV4Props>(
  function ReportListingV4(
    {
      reasons,
      title = 'Report this listing',
      submitLabel = 'Submit report',
      loading = false,
      onSubmit,
      onCancel,
      confirmMessage = 'Report this listing? A moderator will review it, and the seller is not told who reported it.',
      confirmLabel = 'Report',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_CARD_GROUND_STYLE_ID, V4_CARD_GROUND_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

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
        ref={ref}
        data-xen-report-listing=""
        variant="outlined"
        padding="lg"
        radius="lg"
        // Rule 4: a card's ground is `card`, not `surface` — and this cannot
        // be said in `className`. `cn()` is a plain join with no
        // `tailwind-merge`, so `bg-card` and `CardV4`'s own `bg-surface` both
        // land on the element and the sheet's ordering picks the winner, which
        // is `bg-surface`. This panel shipped painting the page colour while
        // every card around it was lifted. The ground comes from the shared
        // specificity rule instead.
        {...V4_CARD_GROUND_ATTR}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
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
          <div role="radiogroup" aria-label={title} className="flex flex-col">
            {reasons.map((reason) => {
              const isSel = reason.id === selectedId;
              return (
                <button
                  key={reason.id}
                  type="button"
                  role="radio"
                  data-xen-v4-row=""
                  data-xen-v4-state=""
                  data-xen-report-reason=""
                  aria-checked={isSel}
                  aria-label={reason.label}
                  onClick={() => setSelectedId(reason.id)}
                  className={cn(
                    ROW_V4_BASE_CLASS,
                    rowHeightClass(false),
                    rowGroundClass(isSel),
                    'rounded-[var(--xen-radius-md)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                  )}
                  style={
                    isSel
                      ? rowStateVars('var(--xen-selected)', 'var(--xen-on-selected)')
                      : rowStateVars()
                  }
                >
                  <span className={ROW_V4_TEXT_CLASS}>
                    <TextV4 size="base" tone={isSel ? 'onSelected' : 'onSurface'}>
                      {reason.label}
                    </TextV4>
                  </span>
                  {isSel ? (
                    <span className={ROW_V4_TRAILING_CLASS}>
                      {/* HIG's option-list confirmation; `aria-checked` already
                          says it, so the mark is decorative. */}
                      <IconV4 name="check" size="base" color="primary" data-xen-report-check="" />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        )}

        {selected != null ? (
          <InputV4
            data-testid="xen-mkt-report-details"
            label={detailsRequired ? 'Details (required)' : 'Details (optional)'}
            placeholder="Add any specifics"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            error={detailsError}
          />
        ) : null}

        <div className="flex gap-sm">
          {onCancel != null ? (
            <ButtonV4 variant="ghost" onClick={onCancel} className="flex-1">
              Cancel
            </ButtonV4>
          ) : null}
          {/*
            `PopconfirmV4`'s root is an `inline-block` anchor for the bubble, so
            it shrink-wraps its trigger. One arbitrary variant stretches it to
            the flex track, which is what lets the submit stay full width
            without Popconfirm growing a `className` prop it does not have.
          */}
          <div className="flex-1 [&>div]:w-full">
            <PopconfirmV4
              message={confirmMessage}
              confirmLabel={confirmLabel}
              onConfirm={submit}
              trigger={
                <ButtonV4
                  variant="danger"
                  disabled={!valid || loading}
                  className="w-full"
                  data-xen-report-submit=""
                >
                  {loading ? 'Submitting…' : submitLabel}
                </ButtonV4>
              }
            />
          </div>
        </div>
      </CardV4>
    );
  }
);
