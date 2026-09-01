import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';

/**
 * A soft-primary quick-pick chip descriptor. When `active` the chip reads as a
 * filled soft-primary; otherwise it is a calm outlined affordance. Every color
 * traces to a theme token — no literals.
 */
export interface QuickAddChip {
  /** Visible chip label (e.g. a priority, a due date, a project name). */
  label: string;
  /** Optional leading glyph rendered before the label (decorative). */
  glyph?: string;
  /** Whether the chip currently reads as chosen (solid soft-primary). */
  active?: boolean;
}

export interface QuickAddTaskProps {
  /** Current composer text (controlled). */
  value: string;
  /** Fires with the next text on every keystroke — the controlled change handler. */
  onChangeText: (text: string) => void;
  /** Placeholder shown when the field is empty. Defaults to `'Add a task…'`. */
  placeholder?: string;
  /** Fires when the task is submitted (Add button or keyboard submit) with the trimmed text. */
  onAdd?: (text: string) => void;
  /** When set, the Add button shows a busy state and submission is blocked. */
  adding?: boolean;
  /** Accessible label for the text field. Defaults to `'Add a task'`. */
  label?: string;
  /** Label for the primary Add button. Defaults to `'Add'`. */
  addLabel?: string;
  /** Leading composer glyph (the calm ⊕/checkbox affordance). Defaults to `'⊕'`. */
  glyph?: string;
  /** Priority quick-pick chip; omit to hide it. */
  priority?: QuickAddChip;
  /** Fires when the priority chip is pressed. */
  onPriority?: () => void;
  /** Due-date quick-pick chip; omit to hide it. */
  dueLabel?: QuickAddChip;
  /** Fires when the due-date chip is pressed. */
  onDue?: () => void;
  /** Project quick-pick chip; omit to hide it. */
  projectLabel?: QuickAddChip;
  /** Fires when the project chip is pressed. */
  onProject?: () => void;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/** A single soft-primary quick-pick chip. Active = filled soft-primary; idle = outlined. */
function Chip({ chip, onPress }: { chip: QuickAddChip; onPress?: () => void }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const active = chip.active ?? false;
  const fg = active ? colors.primaryText : colors.mutedText;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={chip.label}
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.xs,
        minHeight: 32,
        paddingVertical: tokens.spacing.xs,
        paddingHorizontal: tokens.spacing.md,
        borderRadius: tokens.radius.full,
        backgroundColor: active ? withAlpha(colors.primary, 0.14) : colors.surface,
        borderWidth: active ? 0 : 1,
        borderColor: colors.border,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {chip.glyph ? (
        <Icon glyph={chip.glyph} size="sm" color={active ? 'primaryText' : 'mutedText'} />
      ) : null}
      <Text style={{ color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
        {chip.label}
      </Text>
    </Pressable>
  );
}

/**
 * QuickAddTask — **V4** "flow" quick-add composer (native twin of the web
 * component). A calm, rounded, elevated card: a leading ⊕ glyph seated in a
 * **soft-primary disc**, a big legible controlled {@link TextInput}, a row of
 * soft-primary quick-pick chips (priority / due / project), and one **primary**
 * {@link Button} (≥44px, disabled while empty or `adding`). Controlled — the
 * caller owns `value` and is handed the next text via `onChangeText`; `onAdd`
 * fires on the button or keyboard submit with the trimmed value. Presentational
 * only. Token-only colors via `useXenitionTheme()` — no literals.
 */
export function QuickAddTask({
  value,
  onChangeText,
  placeholder = 'Add a task…',
  onAdd,
  adding = false,
  label = 'Add a task',
  addLabel = 'Add',
  glyph = '⊕',
  priority,
  onPriority,
  dueLabel,
  onDue,
  projectLabel,
  onProject,
  style,
}: QuickAddTaskProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const trimmed = value.trim();
  const canAdd = trimmed.length > 0 && !adding;
  const hasChips = Boolean(priority || dueLabel || projectLabel);

  const submit = (): void => {
    if (canAdd) onAdd?.(trimmed);
  };

  return (
    <View
      style={[
        {
          gap: tokens.spacing.md,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.14),
          }}
        >
          <Icon glyph={glyph} size="xl" color="primaryText" />
        </View>

        <TextInput
          accessibilityLabel={label}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          editable={!adding}
          onChangeText={onChangeText}
          onSubmitEditing={submit}
          returnKeyType="done"
          style={{
            flex: 1,
            padding: 0,
            color: colors.onCard,
            fontSize: tokens.typography.scale.base,
            fontWeight: '500',
            fontFamily: tokens.typography.fontBody,
            opacity: adding ? 0.5 : 1,
          }}
        />

        <Button
          onPress={submit}
          disabled={!canAdd}
          loading={adding}
          accessibilityLabel={addLabel}
          style={{ minHeight: 44, minWidth: 44 }}
        >
          {addLabel}
        </Button>
      </View>

      {hasChips ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingLeft: 44 + tokens.spacing.md,
          }}
        >
          {priority ? <Chip chip={priority} onPress={onPriority} /> : null}
          {dueLabel ? <Chip chip={dueLabel} onPress={onDue} /> : null}
          {projectLabel ? <Chip chip={projectLabel} onPress={onProject} /> : null}
        </View>
      ) : null}
    </View>
  );
}
