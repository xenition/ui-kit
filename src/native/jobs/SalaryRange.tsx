import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { Salary } from './types';
import { formatSalary } from './format';

export type SalaryRangeSize = 'sm' | 'md' | 'lg';

export interface SalaryRangeProps {
  /** The salary band. Either bound may be omitted. */
  salary?: Salary | null;
  /** Text size from the type scale. Default `'md'`. */
  size?: SalaryRangeSize;
  /** Override the rendered label (bypasses the built-in formatter). */
  format?: (salary: Salary) => string;
  /** Shown when the band has no bounds. Default `'Salary not disclosed'`. */
  emptyLabel?: string;
  /** Leading glyph. Default `'💰'`; pass `null` to hide. */
  glyph?: string | null;
  style?: StyleProp<ViewStyle>;
}

const TEXT_KEY: Record<SalaryRangeSize, 'sm' | 'base' | 'lg'> = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
};

/**
 * Inline salary-band label — e.g. `💰 $90k – $120k/yr`. Data-only: pass a
 * {@link Salary} and it formats a compact range, a `From …`/`Up to …` label for
 * a single bound, or the `emptyLabel` when nothing is disclosed. All colors come
 * from theme tokens (`onSurface` for the amount, `muted` for the empty hint).
 */
export function SalaryRange({
  salary,
  size = 'md',
  format,
  emptyLabel = 'Salary not disclosed',
  glyph = '💰',
  style,
}: SalaryRangeProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const fontSize = tokens.typography.scale[TEXT_KEY[size]];

  const label =
    salary && format ? format(salary) : formatSalary(salary);
  const disclosed = label != null;
  const text = disclosed ? label : emptyLabel;

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={disclosed ? `Salary ${text}` : emptyLabel}
      style={[{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style]}
    >
      {glyph && disclosed ? (
        <Text allowFontScaling={false} style={{ fontSize }}>
          {glyph}
        </Text>
      ) : null}
      <Text
        style={{
          color: disclosed ? colors.onSurface : colors.muted,
          fontSize,
          fontWeight: disclosed ? '600' : '400',
          fontStyle: disclosed ? 'normal' : 'italic',
        }}
      >
        {text}
      </Text>
    </View>
  );
}
