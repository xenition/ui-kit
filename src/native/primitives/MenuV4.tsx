import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { minTap, panelMinWidth } from './internal/nav-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';
import type { MenuItem, MenuProps } from './Menu';
import { pressLayer } from './internal/state-v4';

export type { MenuProps as MenuV4Props, MenuItem };

/** The one prop Menu injects into an element trigger. */
interface TriggerProps {
  onPress?: (event: GestureResponderEvent) => void;
}

/**
 * **V4 menu** — same props as {@link Menu}, a different design line.
 *
 * ## What the depth is saying
 *
 * A menu is above the page and nothing is above it, so it takes
 * `elevation.sheet` — the same altitude as `ModalV4` and `BottomSheetV4`,
 * because a menu and a sheet are the same kind of object at different sizes and
 * a kit where they drift apart has two depth systems. The rows inside it are
 * flat; §8's "cards inside cards inside cards" is exactly what a menu becomes
 * when every item gains its own surface.
 *
 * The scrim is built from the shadow colour at a fixed alpha, not from
 * `colors.onSurface` — which INVERTS with the scheme and paints a 50% white
 * veil over a dark page, the bug this component has today. `scrimColor` is
 * shared with the V4 sheets so there is one answer to "how dark is a scrim".
 *
 * Glass applies only when the seed asked for `depth: 'glass'`. Everything else
 * is consumed unconditionally, so a `depth: 'flat'` seed gets a flat menu with
 * no branch in this file — the compiler already zeroed the tokens.
 *
 * ## Reading the list
 *
 * Rows are `onSurface`, and the destructive one is `dangerText` — the
 * compiler's contrast-corrected red, not the `danger` FILL slot the base used
 * as text. That makes the destructive item **the only coloured thing in the
 * menu**, so it is unmistakable because it is different rather than because it
 * shouts (§32), and §25's friction-proportional-to-risk is paid in attention
 * rather than in an extra tap.
 *
 * Every row is a 44pt target composed from the spacing scale.
 *
 * ## The trigger is the button
 *
 * Unchanged from the base, and deliberately so. On native the deepest
 * `Pressable` under the finger wins the touch responder whether or not it has
 * an `onPress`, so wrapping the trigger in Menu's own `Pressable` only ever
 * worked while the trigger was inert — pass a kit `<Button>` and the Button
 * claims the responder and the menu never opens. Cloning the element and
 * injecting `onPress` means there is one pressable instead of two nested ones,
 * a `disabled` trigger stays disabled because the press dies in its own
 * `Pressable`, and no `<button>`-inside-a-`<button>` can arise under
 * react-native-web. Anything the trigger already did on press runs first. A
 * non-element trigger (a bare string) has nothing to clone onto — and nothing
 * that could steal the responder — so it keeps the transparent wrapper.
 */
export function MenuV4({ trigger, items, align = 'start' }: MenuProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const renderedTrigger = React.isValidElement<TriggerProps>(trigger) ? (
    React.cloneElement(trigger, {
      onPress: (event: GestureResponderEvent) => {
        trigger.props.onPress?.(event);
        setOpen(true);
      },
    })
  ) : (
    <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
  );

  return (
    <>
      {renderedTrigger}
      <Modal
        visible={open}
        transparent
        // §36.10: the fade is the whole transition, so removing it is the
        // reduced-motion answer rather than replacing it with something else.
        animationType={reduced ? 'none' : 'fade'}
        onRequestClose={() => setOpen(false)}
      >
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
              // Black at a fixed alpha. `onSurface` inverts and would paint a
              // white veil over a dark page.
              backgroundColor: scrimColor(theme),
            }}
          />
          <View
            accessibilityRole="menu"
            accessibilityViewIsModal
            style={[
              {
                minWidth: panelMinWidth(tokens.spacing),
                maxHeight: '70%',
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
              },
              panelSkin(theme),
              elevationStyle(theme.elevation.sheet),
            ]}
          >
            <ScrollView>
              {items.map((item, index) => (
                <Pressable
                  key={index}
                  accessibilityRole="menuitem"
                  accessibilityState={{ disabled: item.disabled }}
                  disabled={item.disabled}
                  onPress={() => {
                    item.onSelect?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: minTap(tokens.spacing),
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    opacity: item.disabled === true ? theme.state.disabledContent : 1,
                    // One border step, not a flash: a tiny action deserves tiny
                    // feedback (§36.8), and the row must not compete with the
                    // one coloured item in the list.
                    backgroundColor: pressed ? pressLayer(theme) : 'transparent',
                  })}
                >
                  {item.icon != null ? <View>{item.icon}</View> : null}
                  {typeof item.label === 'string' ? (
                    <Text
                      style={{
                        fontSize: tokens.typography.scale.base,
                        fontFamily: tokens.typography.fontBody,
                        fontWeight: '500',
                        // `dangerText`, not `danger`: the plain slot is a FILL
                        // colour and carries no promise as text.
                        color: item.danger === true ? colors.dangerText : colors.onSurface,
                      }}
                    >
                      {item.label}
                    </Text>
                  ) : (
                    item.label
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
