import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import type { TextSize } from '../primitives/Text';
import { salaryText, spokenName } from './internal/tone-v4';
import type { SalaryRangeProps, SalaryRangeSize } from './SalaryRange';

export interface SalaryRangeV4Props extends SalaryRangeProps {
  /** Render one bound. Default the module's compact money formatter. */
  formatMoney?: (amount: number, currency?: string) => string;
  /** Cadence suffixes. Default `/yr`, `/hr`, `/mo`. */
  periodLabels?: { year?: string; hour?: string; month?: string };
  /**
   * Shown when bounds were supplied but none is usable — `NaN`, `Infinity`, a
   * negative wage. Default `'Salary range unavailable'`.
   */
  invalidLabel?: string;
}

/** Size → type-scale step. The base's own mapping. */
const TEXT_SIZE: Record<SalaryRangeSize, TextSize> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * **V4 salary range** — same props as {@link SalaryRange} plus `formatMoney`,
 * `periodLabels` and `invalidLabel`.
 *
 * ## Four changes
 *
 * 1. **The band is spoken at all.** The base put its `accessibilityLabel` on a
 *    `View` that was never `accessible`, so the pay — the single fact a job
 *    seeker scans for — was silent on every screen in the module. The `View`
 *    is now `accessible`, which is the whole fix and the reason this file
 *    exists.
 * 2. **A band that runs backwards is no longer drawn backwards.**
 *    `formatSalary` tested `typeof min === 'number'`, which `NaN` passes, so
 *    `{min: 120000, max: 90000}` rendered "$120K – $90K/yr" and `{min: NaN}`
 *    rendered "From $NaN/yr" — with the accessible label repeating it.
 *    `salaryParts` validates: inverted bounds are swapped so the band reads
 *    forwards, and a band with nothing usable says `invalidLabel` instead of
 *    printing the arithmetic's failure.
 * 3. **Undisclosed and broken are different sentences.** "Salary not
 *    disclosed" is a fact about the posting; "Salary range unavailable" is a
 *    fact about the data. The base could not tell them apart.
 * 4. **`muted` was inking the text.** `muted` is a ramp step with no contrast
 *    promise — it is a fill. The empty hint now takes `mutedText`, the slot
 *    that is measured against the surface, and the 💰 is hidden from the
 *    reader because "money bag, ninety thousand dollars" is not the sentence.
 *
 * **Renders nothing without a `salary` and without an `emptyLabel`** (§4.5) —
 * a frame around no band is worse than no frame.
 */
export function SalaryRangeV4({
  salary,
  size = 'md',
  format,
  emptyLabel = 'Salary not disclosed',
  invalidLabel = 'Salary range unavailable',
  formatMoney,
  periodLabels,
  glyph = '💰',
  style,
}: SalaryRangeV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();

  // `format` bypasses the built-in formatter entirely, exactly as on the base —
  // an app that already renders pay its own way keeps doing so.
  const override = salary && format ? format(salary) : null;
  const parts = override != null ? null : salaryText(salary, { formatMoney, periodLabels });

  const disclosed = override != null || parts?.text != null;
  const broken = parts?.broken === true;
  const text = override ?? parts?.text ?? (broken ? invalidLabel : emptyLabel);

  if (!text) return null;

  const step = TEXT_SIZE[size];

  return (
    <View
      // The base set a label here and never set `accessible`, so nothing was
      // spoken. This one line is the module's headline finding.
      accessible
      accessibilityLabel={disclosed ? spokenName(['Salary', text]) : text}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      {glyph && disclosed ? (
        <TextV4
          size={step}
          allowFontScaling={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          {glyph}
        </TextV4>
      ) : null}
      <TextV4
        size={step}
        tone={disclosed ? 'onSurface' : 'mutedText'}
        weight={disclosed ? 'semibold' : 'regular'}
        style={{ fontStyle: disclosed ? 'normal' : 'italic' }}
      >
        {text}
      </TextV4>
    </View>
  );
}
