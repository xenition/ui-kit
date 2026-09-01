import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { TextV4 } from '../primitives/TextV4';
import { BADGE_V4, placeholderGround, spokenLine } from './internal/event-v4';
import type { TicketStubProps } from './TicketStub';

export interface TicketStubV4Props extends TicketStubProps {
  /** How the code is printed and announced. Default: the code as given. */
  formatCode?: (code: string) => string;
}

/** How many bars the placeholder band draws. */
const BAR_COUNT = 28;

/**
 * **V4 ticket stub** — same props as {@link TicketStub} plus `formatCode`.
 *
 * ## Four changes
 *
 * 1. **The barcode survives dark mode.** The band was
 *    `tokens.ramps.neutral[50]` and the dark bars were `colors.onSurface`, and
 *    the native ramps keep their light orientation in both schemes — so in
 *    dark mode a near-white ink was drawn on a near-white band and the stub's
 *    only scannable-looking artefact simply vanished. The web twin inverts
 *    correctly, so the two twins did not even fail the same way. The band is
 *    now the shared placeholder ground and the bars are the card's own ink.
 * 2. **The stub's name lands.** `accessibilityRole="summary"` and a label sat
 *    on a plain `View`; without `accessible` neither platform reads it, so the
 *    holder, the date, the tier and every field went unannounced.
 * 3. **The name carries the whole stub** — event, tier, holder, date, each
 *    field as "label value", and the code — rather than only the title and the
 *    code.
 * 4. **The band height and the letter-spacing come off the scale**, not from
 *    the literals `2` and `1`, so a re-scaled seed moves them with everything
 *    else. The code is tabular, which is what makes a printed reference
 *    readable a character at a time.
 *
 * **Renders nothing without an `eventTitle`.**
 */
export function TicketStubV4({
  eventTitle,
  holderName,
  dateLabel,
  fields = [],
  code,
  tier,
  formatCode,
  variant = 'default',
  style,
}: TicketStubV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  if (!eventTitle) return null;

  const printedCode = (formatCode ?? ((c: string) => c))(code ?? '');

  // Deterministic bar widths from the code characters (guarded, token-colored).
  const chars = code && code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 3) + 1; // 1..3
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });

  const showFields = variant !== 'compact' && fields.length > 0;

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={spokenLine([
        eventTitle,
        tier,
        holderName,
        dateLabel,
        ...(showFields ? fields.map((f) => `${f.label} ${f.value}`) : []),
        printedCode,
      ])}
      style={[
        {
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: tokens.spacing.sm,
          }}
        >
          <TextV4 size="lg" weight="bold" tone="onCard" numberOfLines={2} style={{ flex: 1 }}>
            {eventTitle}
          </TextV4>
          {tier ? (
            <BadgeV4 {...BADGE_V4} tone="primary">
              {tier}
            </BadgeV4>
          ) : null}
        </View>
        {holderName ? (
          <TextV4 size="sm" tone="mutedText">
            {holderName}
          </TextV4>
        ) : null}
        {dateLabel ? (
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {dateLabel}
          </TextV4>
        ) : null}

        {showFields ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: tokens.spacing.lg,
              marginTop: tokens.spacing.xs,
            }}
          >
            {fields.map((f, i) => (
              <View key={`${f.label}-${i}`} style={{ gap: tokens.spacing.xs / 2 }}>
                <TextV4
                  size="xs"
                  weight="semibold"
                  tone="mutedText"
                  style={{ letterSpacing: tokens.spacing.xs / 4 }}
                >
                  {f.label.toUpperCase()}
                </TextV4>
                <TextV4 size="base" weight="semibold" tone="onCard">
                  {f.value}
                </TextV4>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {/* Perforation-style divider + placeholder barcode band. */}
      <View style={{ height: 1, backgroundColor: colors.border }} />
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: tokens.spacing.xs / 2,
          height: tokens.spacing['2xl'],
          paddingVertical: tokens.spacing.sm,
          backgroundColor: placeholderGround(theme),
        }}
      >
        {bars.map((b, i) => (
          <View
            key={i}
            style={{
              width: b.width,
              height: '100%',
              // `onCard` and `muted` against the card's own placeholder ground:
              // both read in either scheme, which the ramp steps did not.
              backgroundColor: b.dark ? colors.onCard : colors.muted,
            }}
          />
        ))}
      </View>
      <TextV4
        size="xs"
        tone="mutedText"
        align="center"
        numeric="tabular"
        style={{ letterSpacing: tokens.spacing.xs / 2, paddingBottom: tokens.spacing.sm }}
      >
        {printedCode}
      </TextV4>
    </View>
  );
}
