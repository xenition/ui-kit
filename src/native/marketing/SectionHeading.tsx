import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';

export interface SectionHeadingProps {
  /** Small kicker line above the title. */
  eyebrow?: React.ReactNode;
  /** Section title. */
  title: React.ReactNode;
  /** Supporting paragraph under the title. */
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  /**
   * Heading level — accepted for parity with the web `SectionHeading`; React
   * Native has no heading semantics, so it has no visual effect here.
   */
  as?: 'h1' | 'h2' | 'h3';
  style?: StyleProp<ViewStyle>;
}

/**
 * Eyebrow + title + lede — the native mirror of the web `SectionHeading`, the
 * standard section opener. Token-only. The web `as` heading-level prop is kept
 * for prop parity but is inert on native (no DOM heading elements).
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: _as = 'h2',
  style,
}: SectionHeadingProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const centered = align === 'center';

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          alignItems: centered ? 'center' : 'flex-start',
        },
        style,
      ]}
    >
      {eyebrow !== undefined && eyebrow !== null ? (
        typeof eyebrow === 'string' ? (
          <Eyebrow tone="primary" align={centered ? 'center' : 'start'}>
            {eyebrow}
          </Eyebrow>
        ) : (
          eyebrow
        )
      ) : null}

      {typeof title === 'string' ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {title}
        </Text>
      ) : (
        title
      )}

      {lede !== undefined && lede !== null ? (
        typeof lede === 'string' ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.lg,
              textAlign: centered ? 'center' : 'left',
            }}
          >
            {lede}
          </Text>
        ) : (
          lede
        )
      ) : null}
    </View>
  );
}
