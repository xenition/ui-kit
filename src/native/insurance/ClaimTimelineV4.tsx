import * as React from 'react';
import { View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney, type MoneyFormatter } from '../../commerce/money';
import { isAdverse } from '../../insurance/coverage-v4';
import {
  DECORATIVE,
  chipGround,
  skeletonFill,
  spokenLine,
  toneFill,
  toneInk,
} from './internal/tone-v4';

/** What happened. Identity, not a verdict — except `decision`, which is one. */
export type ClaimTimelineKind = 'filed' | 'note' | 'document' | 'payment' | 'decision';

/** One dated thing that happened to a claim. */
export interface ClaimTimelineEntry {
  /** Stable key. Falls back to the index when omitted. */
  id?: string;
  /** Localized date or date-time, already formatted by the caller. */
  date: string;
  /** What happened, in a few words. */
  title: string;
  /** The body — an adjuster's note, what document was requested, why. */
  detail?: string;
  /** Kind of activity. Default `'note'`. */
  kind?: ClaimTimelineKind;
  /** Money moved by this entry, in integer **cents**. */
  amountCents?: number;
  /** Who recorded it — an adjuster, a body shop, the policyholder. */
  actor?: string;
  /**
   * For a `decision` entry: the outcome, one of the module's claim statuses or
   * any string the caller uses. `denied` and its siblings mark the entry
   * adverse, which is the entry that carries a reason.
   */
  outcome?: string;
}

export interface ClaimTimelineV4Props {
  /** The activity, newest first or oldest first — the caller's order is kept. */
  items: ClaimTimelineEntry[];
  /** Heading above the timeline. Default `'Claim activity'`. */
  title?: string;
  /** ISO 4217 currency code. Default `'USD'`. */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Draw placeholder entries instead of content. */
  loading?: boolean;
  /** How many placeholders a loading timeline draws. Default `3`. */
  skeletonRows?: number;
  /** Announced while the placeholders are up. Default `'Loading claim activity'`. */
  loadingLabel?: string;
  /** Headline when there is no activity. Default `'No claim activity yet'`. */
  emptyLabel?: string;
  /** The next-step sentence under {@link ClaimTimelineV4Props.emptyLabel}. */
  emptyDescription?: string;
  /** Override the five kind words. */
  kindLabels?: Partial<Record<ClaimTimelineKind, string>>;
  /** Test hook, matching the rest of the module. */
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/** Non-colour marks, one per kind. */
const KIND_GLYPH: Record<ClaimTimelineKind, string> = {
  filed: '✎',
  note: '💬',
  document: '📎',
  payment: '💵',
  decision: '⚖',
};

const KIND_LABEL: Record<ClaimTimelineKind, string> = {
  filed: 'Filed',
  note: 'Note',
  document: 'Document',
  payment: 'Payment',
  decision: 'Decision',
};

/** The empty state's next-step sentence. */
const EMPTY_DESCRIPTION = 'Adjuster notes, document requests and payments appear here.';

/**
 * **V4 claim timeline** — a new component. There is no base to extend, so the
 * props are plain `ClaimTimelineV4Props`.
 *
 * ## Why it exists
 *
 * `ClaimStatusTracker` gives a claim four fixed stages and one `updated`
 * string, and that is the whole of what this module could say about a claim's
 * history. It is not enough for the thing people actually ask — *what is
 * happening to my claim, and what do you need from me?* An adjuster's note, a
 * request for a repair estimate, a partial payment and a denial are all dated
 * events with a body, and none of them fits in a four-step rail.
 *
 * **This is where a denial reason belongs.** The tracker invented one because
 * it had four stages and nowhere to put prose; here a `decision` entry carries
 * its own `detail`, in the caller's words, with the date it was made and the
 * adjuster who made it. `ClaimStatusTrackerV4` gained a `denialReason` prop for
 * the summary line — this is the full account it summarises.
 *
 * ## What it does with the module's rules
 *
 * 1. **The rail is decorative.** The dots and the connecting line are geometry:
 *    they are hidden from the reader, and each entry is one accessible stop
 *    naming its date, kind, title, actor, amount and body in that order — the
 *    order somebody asks for them in.
 * 2. **A kind is identity.** Four of the five marks are a glyph and a word on
 *    the neutral chip ground. Only `decision` takes a tone, and only when its
 *    `outcome` is adverse — `isAdverse` decides, the same function
 *    `PolicyCardV4` and `ClaimStatusTrackerV4` use, so "which states owe a
 *    reason" is answered in one place for the whole module.
 * 3. **Empty and loading are real.** An empty timeline says what will fill it;
 *    a loading one draws placeholders in the shape of the entries, opaque and
 *    composited against the card's own ground.
 * 4. **Money goes through the shared formatter**, in integer cents, with an
 *    override — negative included, because a reversed payment is a fact a
 *    claimant is owed.
 */
export function ClaimTimelineV4({
  items,
  title = 'Claim activity',
  currency = 'USD',
  formatMoney: format = formatMoney,
  loading = false,
  skeletonRows = 3,
  loadingLabel = 'Loading claim activity',
  emptyLabel = 'No claim activity yet',
  emptyDescription = EMPTY_DESCRIPTION,
  kindLabels,
  testID,
  style,
}: ClaimTimelineV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  const rows = Array.isArray(items) ? items : [];
  const dot = tokens.spacing.lg;

  const heading = (
    <TextV4 accessibilityRole="header" size="base" weight="bold" tone="onCard">
      {title}
    </TextV4>
  );

  if (loading) {
    const bar = (width: DimensionValue): React.ReactElement => (
      <View
        style={{
          height: tokens.typography.scale.sm,
          borderRadius: tokens.radius.sm,
          backgroundColor: skeletonFill(theme),
          width,
        }}
      />
    );
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.md }, style]}>
        {heading}
        <View accessible accessibilityLabel={loadingLabel} style={{ gap: tokens.spacing.md }}>
          {Array.from({ length: Math.max(1, skeletonRows) }, (_, i) => (
            <View
              key={i}
              {...DECORATIVE}
              style={{ flexDirection: 'row', gap: tokens.spacing.md }}
            >
              <View
                style={{
                  width: dot,
                  height: dot,
                  borderRadius: tokens.radius.full,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View style={{ flex: 1, gap: tokens.spacing.xs }}>
                {bar('40%')}
                {bar('85%')}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View testID={testID} style={[{ gap: tokens.spacing.md }, style]}>
        {heading}
        <EmptyStateV4 title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View testID={testID} style={[{ gap: tokens.spacing.md }, style]}>
      {heading}
      <View>
        {rows.map((entry, i) => {
          const kind = entry.kind ?? 'note';
          const word = kindLabels?.[kind] ?? KIND_LABEL[kind];
          const adverse = kind === 'decision' && entry.outcome != null && isAdverse(entry.outcome);
          const amount =
            typeof entry.amountCents === 'number' && Number.isFinite(entry.amountCents)
              ? format(Math.trunc(entry.amountCents), currency)
              : null;
          const last = i === rows.length - 1;

          return (
            <View
              accessible
              accessibilityLabel={spokenLine([
                entry.date,
                word,
                entry.title,
                entry.actor,
                amount,
                entry.detail,
              ])}
              key={entry.id ?? `${entry.date}-${i}`}
              style={{ flexDirection: 'row', gap: tokens.spacing.md }}
            >
              {/* Geometry, not content — see change 1. */}
              <View {...DECORATIVE} style={{ alignItems: 'center', width: dot }}>
                <View
                  style={{
                    width: dot,
                    height: dot,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: adverse ? toneFill(theme, 'danger') : chipGround(theme),
                  }}
                >
                  <TextV4
                    size="xs"
                    style={{ color: adverse ? colors.onDanger : colors.onCard }}
                  >
                    {KIND_GLYPH[kind]}
                  </TextV4>
                </View>
                {!last ? (
                  <View style={{ flex: 1, width: 1, backgroundColor: colors.border }} />
                ) : null}
              </View>

              <View
                style={{
                  flex: 1,
                  minWidth: 0,
                  gap: tokens.spacing.xs / 2,
                  paddingBottom: last ? 0 : tokens.spacing.md,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                  }}
                >
                  <TextV4 size="xs" tone="mutedText" numeric="tabular">
                    {entry.date}
                  </TextV4>
                  {amount ? (
                    <TextV4 size="sm" weight="bold" tone="onCard" numeric="tabular">
                      {amount}
                    </TextV4>
                  ) : null}
                </View>
                <TextV4
                  size="sm"
                  weight="semibold"
                  style={{ color: adverse ? toneInk(theme, 'danger') : colors.onCard }}
                >
                  {entry.title}
                </TextV4>
                {entry.detail ? (
                  <TextV4 size="xs" tone="mutedText">
                    {entry.detail}
                  </TextV4>
                ) : null}
                <TextV4 size="xs" tone="mutedText">
                  {entry.actor ? `${word} · ${entry.actor}` : word}
                </TextV4>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
