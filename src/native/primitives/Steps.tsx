import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export interface StepsProps {
  steps: StepItem[];
  /** Zero-based index of the active step. */
  current: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Horizontal step indicator — the native mirror of the web `Steps`. A row of
 * numbered/checked markers with titles; done steps fill with the primary color,
 * the active step is outlined. For wizards/checkout. No literal colors.
 *
 * **This is a progress indicator, not an instruction list.** Each step gets
 * `flex: 1` of the row, so it is at its best with three or four one-word
 * titles ("Cart · Shipping · Pay") and falls apart past that: at eight steps
 * every title collapses to nothing, and there is nowhere to put a body.
 *
 * If what you have is *content* — a recipe method, an onboarding checklist
 * body, a setup guide — reach for {@link StepList} instead. It is the vertical
 * sibling: same numbering, but it grows downward and each step carries a title
 * and a description. `Steps` answers "where am I in this flow"; `StepList`
 * answers "here are the instructions".
 */
export function Steps({ steps, current, style }: StepsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'flex-start' }, style]}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <View key={i} style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: done ? colors.primary : 'transparent',
                borderWidth: done ? 0 : 2,
                borderColor: active ? colors.primary : colors.border,
              }}
            >
              <Text
                style={{
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                  color: done ? colors.onPrimary : active ? colors.primary : colors.muted,
                }}
              >
                {done ? '✓' : i + 1}
              </Text>
            </View>
            <View style={{ marginTop: tokens.spacing.xs, alignItems: 'center' }}>
              {typeof s.title === 'string' ? (
                <Text
                  style={{
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '500',
                    textAlign: 'center',
                    color: active || done ? colors.onSurface : colors.muted,
                  }}
                >
                  {s.title}
                </Text>
              ) : (
                s.title
              )}
              {s.description != null ? (
                typeof s.description === 'string' ? (
                  <Text
                    style={{ fontSize: tokens.typography.scale.xs, textAlign: 'center', color: colors.muted }}
                  >
                    {s.description}
                  </Text>
                ) : (
                  s.description
                )
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}
