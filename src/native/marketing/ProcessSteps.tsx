import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ProcessStep {
  /** Step headline. */
  title: React.ReactNode;
  /** Supporting copy under the title. */
  description?: React.ReactNode;
  /** Optional content rendered inside the numbered marker instead of the number. */
  icon?: React.ReactNode;
}

export interface ProcessStepsProps {
  /** Ordered "how it works" steps (mirrors the web `steps` array). */
  steps: ProcessStep[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Numbered "how it works" flow — the native mirror of the web `ProcessSteps`.
 * The web version is horizontal on desktop / vertical on mobile with connector
 * lines; native renders a **token-styled numbered vertical list** with a
 * connector segment between markers (phones are always narrow, so the
 * horizontal desktop layout is dropped). Token-only.
 */
export function ProcessSteps({ steps, style }: ProcessStepsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View testID="xen-process-steps" style={[{ gap: tokens.spacing.lg }, style]}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <View
            key={index}
            style={{ flexDirection: 'row', gap: tokens.spacing.md }}
          >
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                }}
              >
                {step.icon !== undefined ? (
                  typeof step.icon === 'string' ? (
                    <Text
                      style={{
                        color: colors.onPrimary,
                        fontSize: tokens.typography.scale.base,
                        fontWeight: '600',
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
                      color: colors.onPrimary,
                      fontSize: tokens.typography.scale.base,
                      fontWeight: '600',
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
                    fontWeight: '600',
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
