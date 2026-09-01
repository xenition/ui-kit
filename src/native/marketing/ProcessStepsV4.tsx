import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { ProcessStepsProps } from './ProcessSteps';

/** Drop-in for {@link ProcessStepsProps} — same props, the V4 "showcase" design. */
export type ProcessStepsV4Props = ProcessStepsProps;

/**
 * ProcessSteps — **V4** "showcase" design (native mirror of the web V4). A
 * refined numbered "how it works" flow: each step opens with a big soft-primary
 * numbered token (a `withAlpha(colors.primary, 0.1)` circle carrying the bold
 * step number, or the step's `icon`), connected to the next by a hairline rule.
 * Bold step `title` and muted `description`. As on the native base, phones are
 * narrow so this is a vertical list (the web desktop-horizontal layout is
 * dropped). NOT a gradient surface. Honors every `step` (`title`,
 * `description`, `icon`). Same props/behavior as {@link ProcessStepsProps};
 * token-only colors, no literals.
 */
export function ProcessStepsV4({ steps, style }: ProcessStepsV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-process-steps" style={[{ gap: tokens.spacing.lg }, style]}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <View key={index} style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: withAlpha(colors.primary, 0.1),
                }}
              >
                {step.icon !== undefined ? (
                  typeof step.icon === 'string' ? (
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '800',
                      }}
                    >
                      {step.icon}
                    </Text>
                  ) : (
                    step.icon
                  )
                ) : (
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: tokens.typography.scale.lg,
                      fontWeight: '800',
                    }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              {!isLast ? (
                <View
                  style={{
                    marginTop: tokens.spacing.xs,
                    width: 1,
                    flex: 1,
                    backgroundColor: colors.border,
                  }}
                />
              ) : null}
            </View>
            <View
              style={{
                flex: 1,
                gap: tokens.spacing.xs,
                paddingBottom: isLast ? 0 : tokens.spacing.md,
              }}
            >
              {typeof step.title === 'string' ? (
                <Text
                  style={{
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                  }}
                >
                  {step.title}
                </Text>
              ) : (
                step.title
              )}
              {step.description !== undefined && step.description !== null ? (
                typeof step.description === 'string' ? (
                  <Text
                    style={{
                      color: colors.muted,
                      fontSize: tokens.typography.scale.sm,
                      lineHeight: tokens.typography.scale.sm * 1.5,
                    }}
                  >
                    {step.description}
                  </Text>
                ) : (
                  step.description
                )
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
