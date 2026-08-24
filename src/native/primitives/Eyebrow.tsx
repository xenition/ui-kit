import * as React from 'react';
import { Text, View, type StyleProp, type TextStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type EyebrowTone = 'primary' | 'accent' | 'muted';

export interface EyebrowProps {
  /** Semantic color slot for the label (default `accent`). */
  tone?: EyebrowTone;
  /** Draw short hairline ticks flanking the label. */
  rule?: boolean;
  /** Horizontal alignment (default `start`; `center` for section openers). */
  align?: 'start' | 'center';
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

/**
 * Tracked small-caps kicker label — the native mirror of the web `Eyebrow`.
 * Color comes from the semantic `primary`/`accent`/`muted` tokens (auto-
 * contrast-checked by the compiler); the optional flanking rules inherit the
 * same token color. No literal colors.
 */
export function Eyebrow({
  tone = 'accent',
  rule = false,
  align = 'start',
  style,
  children,
}: EyebrowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const color =
    tone === 'primary' ? colors.primary : tone === 'muted' ? colors.muted : colors.accent;

  const tick = (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{ width: 24, height: 1, backgroundColor: color }}
    />
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        gap: tokens.spacing.xs,
      }}
    >
      {rule ? tick : null}
      <Text
        style={[
          {
            color,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 2,
          },
          style,
        ]}
      >
        {children}
      </Text>
      {rule ? tick : null}
    </View>
  );
}
