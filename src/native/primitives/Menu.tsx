import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface MenuItem {
  label: React.ReactNode;
  /** Fires on select; the menu closes afterwards (`onClick`→`onSelect`). */
  onSelect?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders the item in the danger tone (e.g. Delete). */
  danger?: boolean;
}

export interface MenuProps {
  /** Pressable trigger (e.g. a Button or icon). */
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
}

/**
 * Themed dropdown menu — the native mirror of the web `Menu`. RN has no
 * anchored DOM portal, so the items open in a `Modal` sheet over a translucent
 * backdrop rather than floating next to the trigger; `align` shifts the sheet
 * left / right within the overlay (native simplification). Selecting an item
 * fires `onSelect` and closes the menu. No literal colors.
 */
export function Menu({ trigger, items, align = 'start' }: MenuProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/*
        A transparent tap surface, and deliberately NOT a `button`.

        This wraps whatever the caller passed as `trigger`, and the natural thing
        to pass is a `<Button>` — which is itself a `Pressable`. Give this wrapper
        `accessibilityRole="button"` and react-native-web renders both as real
        `<button>` elements, so the trigger becomes a `<button>` inside a
        `<button>`: invalid HTML, two React `validateDOMNesting` errors on every
        mount, and an unpredictable click target. On native it is just as wrong,
        announcing "button" twice to a screen reader.

        The web twin does the same thing for the same reason — it wraps the
        trigger in a plain `<span onClick>`. The role belongs to the trigger,
        which already declares its own; this layer only needs to catch the press.
      */}
      <Pressable onPress={() => setOpen(true)}>
        {trigger}
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: align === 'end' ? 'flex-end' : 'flex-start',
            padding: tokens.spacing.lg,
          }}
        >
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.onSurface,
              opacity: 0.5,
            }}
          />
          <View
            accessibilityRole="menu"
            style={{
              minWidth: 160,
              maxHeight: '70%',
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {items.map((it, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: it.disabled }}
                  disabled={it.disabled}
                  onPress={() => {
                    it.onSelect?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    opacity: it.disabled ? 0.5 : 1,
                    backgroundColor: pressed ? colors.border : colors.surface,
                  })}
                >
                  {it.icon != null && <View>{it.icon}</View>}
                  {typeof it.label === 'string' ? (
                    <Text
                      style={{
                        fontSize: tokens.typography.scale.sm,
                        color: it.danger ? colors.danger : colors.onSurface,
                      }}
                    >
                      {it.label}
                    </Text>
                  ) : (
                    it.label
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
