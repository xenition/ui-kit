import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale } from '../primitives/internal/motion';
import type { MultipleChoiceProps } from './MultipleChoice';
import type { SurveyChoice } from './types';

/** Same Props as {@link MultipleChoice} — a drop-in alternate design. */
export type MultipleChoiceV2Props = MultipleChoiceProps;

/** A→Z letter for a 0-based index (wraps back to A past 25 — guarded). */
function letterFor(index: number): string {
  return String.fromCharCode(65 + (((index % 26) + 26) % 26));
}

interface OptionCardProps {
  opt: SurveyChoice;
  letter: string;
  selected: boolean;
  multiple: boolean;
  disabled: boolean;
  onPress: () => void;
}

function OptionCard({ opt, letter, selected, multiple, disabled, onPress }: OptionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole={multiple ? 'checkbox' : 'radio'}
        accessibilityState={multiple ? { checked: selected, disabled } : { selected, disabled }}
        accessibilityLabel={opt.label}
        disabled={disabled}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: selected ? 2 : 1,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.06) : colors.surface,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
          ...(selected ? shadow('sm', tokens) : null),
        }}
      >
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? colors.primary : withAlpha(colors.primary, 0.1),
          }}
        >
          <Text
            style={{
              color: selected ? colors.onPrimary : colors.primaryText,
              fontSize: tokens.typography.scale.base,
              fontWeight: '800',
            }}
          >
            {letter}
          </Text>
        </View>

        {opt.icon ? <Icon glyph={opt.icon} size="lg" color="onSurface" /> : null}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: selected ? '800' : '600',
            }}
          >
            {opt.label}
          </Text>
          {opt.description ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{opt.description}</Text>
          ) : null}
        </View>

        {selected ? (
          <Icon glyph={multiple ? '✓' : '●'} size="sm" color="primary" accessibilityLabel="selected" />
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

/**
 * MultipleChoice, design V2 — **option cards led by letter badges**. Each choice
 * is a padded, rounded card with an A/B/C… badge (filled primary when selected),
 * the label and optional description, and a trailing check/dot on selection —
 * the selected card also gains a primary border, a soft tint and a lift. Reads
 * like a quiz / poll card deck rather than the original's plain rows.
 * `single` = `radiogroup`+`radio`, `multiple` = `list`+`checkbox`, state
 * announced (never color-alone). Empty options render a muted state. Token-pure.
 */
export function MultipleChoiceV2({
  options,
  value,
  onChange,
  selection = 'single',
  accessibilityLabel = 'Answer options',
  disabled = false,
  style,
}: MultipleChoiceV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const multiple = selection === 'multiple';

  const selectedSet = React.useMemo(() => {
    if (multiple) return new Set(Array.isArray(value) ? value : []);
    return new Set(typeof value === 'string' ? [value] : []);
  }, [multiple, value]);

  const toggle = (id: string): void => {
    if (multiple) {
      const next = new Set(selectedSet);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange(Array.from(next));
    } else {
      onChange(id);
    }
  };

  if (options.length === 0) {
    return (
      <View accessibilityRole="summary" style={[{ padding: tokens.spacing.lg, alignItems: 'center' }, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>No options available.</Text>
      </View>
    );
  }

  return (
    <View
      accessibilityRole={multiple ? 'list' : 'radiogroup'}
      accessibilityLabel={accessibilityLabel}
      style={[{ gap: tokens.spacing.sm }, style]}
    >
      {options.map((opt, i) => (
        <OptionCard
          key={opt.id}
          opt={opt}
          letter={letterFor(i)}
          selected={selectedSet.has(opt.id)}
          multiple={multiple}
          disabled={disabled}
          onPress={() => toggle(opt.id)}
        />
      ))}
    </View>
  );
}
