import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Eyebrow } from '../primitives/Eyebrow';
import type { SectionHeadingProps } from './SectionHeading';

/** Drop-in for {@link SectionHeadingProps} — same props, the V4 "showcase" design. */
export type SectionHeadingV4Props = SectionHeadingProps;

/**
 * SectionHeading — **V4** "showcase" design (native mirror of the web V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow, an extra-bold tight-tracked heading, and a muted supporting lede.
 * Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as`); the `as` heading-level prop is kept
 * for web parity but is inert on native. Token-only colors, no literals.
 */
export function SectionHeadingV4({
  eyebrow,
  title,
  lede,
  align = 'left',
  as: _as = 'h2',
  style,
}: SectionHeadingV4Props): React.ReactElement {
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
            fontWeight: '800',
            letterSpacing: -0.5,
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
