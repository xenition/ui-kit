import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AlertV4 } from '../primitives/AlertV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { clearsHazard, hazardCount, nextVerdict } from '../../fieldservice/verdict-v4';
import { BADGE_V4, discGround, discInk, skeletonFill, spokenLine, type ToneV4 } from './internal/job-v4';
import type { SafetyChecklistProps, SafetyVerdict } from './SafetyChecklist';

export interface SafetyChecklistV4Props extends SafetyChecklistProps {
  /**
   * The name the row takes once a hazard clearance is armed and waiting for
   * the confirming press. Default `` `Confirm clearing hazard: ${label}` ``.
   */
  confirmHazardLabel?: (label: string) => string;
  /** Override the three verdict names — they lived inside the component. */
  verdictLabels?: Partial<Record<SafetyVerdict, string>>;
  /** Announced and shown for a blocking checkpoint. Default `'Hazard'`. */
  hazardLabel?: string;
  /** Build the hazard banner's sentence from the blocking-failure count. */
  formatHazardCount?: (count: number) => string;
}

/** Verdict → its glyph, its tone and its default name. */
const VERDICT_META: Record<SafetyVerdict, { glyph: string; tone: ToneV4; label: string }> = {
  pass: { glyph: '✓', tone: 'success', label: 'Pass' },
  fail: { glyph: '✕', tone: 'danger', label: 'Fail' },
  unchecked: { glyph: '○', tone: 'neutral', label: 'Unchecked' },
};

/** How many skeleton rows stand in for the list while it loads. */
const SKELETON_ROWS = 3;

/**
 * **V4 safety checklist** — same props as {@link SafetyChecklist} plus
 * `confirmHazardLabel`, `verdictLabels`, `hazardLabel` and `formatHazardCount`.
 *
 * ## Five changes
 *
 * 1. **A stray tap no longer certifies a site as safe.** The base cycled
 *    `fail → unchecked` on one press: that dropped the item out of the hazard
 *    count, unmounted the red "Hazard — do not proceed" banner and flipped the
 *    header to "All clear" — on a 40px target, tapped one-handed, outdoors, in
 *    gloves, with no confirmation and no prop a host app could use to ask for
 *    one. `clearsHazard()` names that one transition; when it is true the first
 *    press only **arms** the row, says so through `confirmHazardLabel`, and a
 *    second press does the work. Every other transition is unchanged and
 *    immediate, because passing is the ordinary case and making it cost two
 *    taps would be a worse component rather than a safer one.
 * 2. **The row says what pressing will do, and carries the hazard flag.** The
 *    base's name was `"${label}, ${verdict}"`, which replaced the subtree — so
 *    the ⚠ Hazard badge beside it was never spoken. The name now carries it,
 *    and the hint carries the verdict the next press records.
 * 3. **A row you cannot change is not a button.** Without `onToggle` the base
 *    still rendered a live `Pressable` that did nothing at all.
 * 4. **Rows clear 44 and press as a state layer.** 40px and `opacity: 0.7`
 *    both go — 0.38 is M3's *disabled* band, so dimming a pressed row made it
 *    read as unavailable.
 * 5. **The verdict is announced once.** The disc carried an
 *    `accessibilityLabel`, so a reader stopped on it and then read the same
 *    verdict again out of the row; it is decorative now.
 */
export function SafetyChecklistV4({
  title,
  items,
  onToggle,
  loading = false,
  emptyLabel = 'No safety items',
  confirmHazardLabel = (label) => `Confirm clearing hazard: ${label}`,
  verdictLabels,
  hazardLabel = 'Hazard',
  formatHazardCount = (count) =>
    `${count} blocking safety ${count === 1 ? 'item is' : 'items are'} failing.`,
  style,
}: SafetyChecklistV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  // Which row is one press away from clearing its hazard. One at a time: arming
  // a second row disarms the first, so a forgotten arm cannot fire later.
  const [armed, setArmed] = React.useState<string | null>(null);

  const list = Array.isArray(items) ? items : [];
  const hazards = hazardCount(list);
  const failCount = list.filter((item) => item.verdict === 'fail').length;
  const tap = minTap(tokens.spacing);

  if (loading) {
    return (
      <CardV4 variant="outlined" style={[{ backgroundColor: colors.card }, style]}>
        {/* Rows in the shape they are about to be, not a spinner that collapses
            the layout and then jumps when the data lands. */}
        <View accessible accessibilityLabel="Loading safety checklist" style={{ gap: tokens.spacing.sm }}>
          {Array.from({ length: SKELETON_ROWS }, (_, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, minHeight: tap }}
            >
              <View
                style={{
                  width: tap,
                  height: tap,
                  borderRadius: tokens.radius.full,
                  backgroundColor: skeletonFill(theme),
                }}
              />
              <View
                style={{
                  flex: 1,
                  height: tokens.spacing.md,
                  borderRadius: tokens.radius.sm,
                  backgroundColor: skeletonFill(theme),
                }}
              />
            </View>
          ))}
        </View>
      </CardV4>
    );
  }

  if (list.length === 0) {
    return (
      <EmptyStateV4 title={emptyLabel} description="Safety checkpoints will appear here." style={style} />
    );
  }

  return (
    <CardV4 variant="outlined" style={[{ backgroundColor: colors.card }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {title != null ? (
          <TextV4 size="base" weight="bold" tone="onCard">
            {title}
          </TextV4>
        ) : (
          <View />
        )}
        <BadgeV4 tone={failCount > 0 ? 'danger' : 'success'} {...BADGE_V4}>
          {failCount > 0 ? `✕ ${failCount} failing` : '✓ All clear'}
        </BadgeV4>
      </View>

      {hazards > 0 ? (
        <View style={{ marginTop: tokens.spacing.md }}>
          <AlertV4 tone="danger" title="Hazard — do not proceed">
            {formatHazardCount(hazards)}
          </AlertV4>
        </View>
      ) : null}

      <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
        {list.map((item) => {
          const meta = VERDICT_META[item.verdict] ?? VERDICT_META.unchecked;
          const next = nextVerdict(item.verdict);
          const nextMeta = VERDICT_META[next] ?? VERDICT_META.unchecked;
          const verdictWord = verdictLabels?.[item.verdict] ?? meta.label;
          const nextWord = verdictLabels?.[next] ?? nextMeta.label;
          const guarded = clearsHazard(item, next);
          const isArmed = armed === item.id;

          const name = isArmed
            ? confirmHazardLabel(item.label)
            : spokenLine([item.label, verdictWord, item.hazard === true ? hazardLabel : null]);

          const body = (pressed: boolean): React.ReactElement => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: tap,
                paddingVertical: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: pressed ? pressOver(theme, colors.card, colors.onCard) : 'transparent',
              }}
            >
              {/* Decorative: the verdict is already in the row's own name, and
                  a labelled disc made a reader stop twice for one fact. */}
              <View
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={{
                  width: tap,
                  height: tap,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: discGround(theme, meta.tone),
                }}
              >
                <IconV4 glyph={meta.glyph} size="sm" style={{ color: discInk(theme, meta.tone) }} />
              </View>
              <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
                <TextV4 size="sm" weight="medium" tone="onCard">
                  {item.label}
                </TextV4>
                {isArmed ? (
                  <TextV4 size="xs" style={{ color: colors.dangerText }}>
                    {confirmHazardLabel(item.label)}
                  </TextV4>
                ) : null}
              </View>
              {item.hazard === true ? (
                <BadgeV4 tone="danger" {...BADGE_V4}>
                  {`⚠ ${hazardLabel}`}
                </BadgeV4>
              ) : null}
            </View>
          );

          // No handler, no button: the base shipped a live `Pressable` that
          // cycled nothing when a caller left `onToggle` off.
          if (!onToggle) {
            return (
              <View key={item.id} accessible accessibilityLabel={name}>
                {body(false)}
              </View>
            );
          }

          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={name}
              accessibilityHint={nextWord}
              accessibilityLiveRegion={isArmed ? 'polite' : 'none'}
              onPress={() => {
                if (guarded && !isArmed) {
                  setArmed(item.id);
                  return;
                }
                setArmed(null);
                onToggle(item.id, next);
              }}
              style={{ borderRadius: tokens.radius.md }}
            >
              {({ pressed }) => body(pressed)}
            </Pressable>
          );
        })}
      </View>
    </CardV4>
  );
}
