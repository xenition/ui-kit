import * as React from 'react';
import { Modal, Pressable, ScrollView, Text, View, type GestureResponderEvent } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ContextMenuAction, ContextMenuProps } from './ContextMenu';
import { disabledOpacity, minTap } from './internal/chrome-v4';
import { panelMinWidth } from './internal/nav-v4';
import { pressFill } from './internal/state-v4';
import { elevationStyle, panelSkin, scrimColor } from './internal/surface-v4';
import { useReducedMotion } from './internal/useReducedMotion';

export type { ContextMenuProps as ContextMenuV4Props, ContextMenuAction };

/** The one prop ContextMenu injects into an element child. */
interface TriggerProps {
  onLongPress?: (event: GestureResponderEvent) => void;
  delayLongPress?: number;
}

/**
 * How long a press has to be held before it counts as a long press.
 *
 * The platform default is 500ms and the base picked 350. It stays 350 here for
 * one reason: it is the number the base shipped and a gesture threshold is
 * muscle memory, not styling — changing it would make every existing app's
 * context menus feel different for no design gain. §31: use familiar
 * interactions.
 */
const LONG_PRESS_MS = 350;

/**
 * `ContextMenu`, V4 — the same props, and a long press that actually reaches
 * the thing you pressed.
 *
 * ## The child is the target
 *
 * This is the one behavioural change, and it is the same fix `Popconfirm` and
 * `Menu` already carry. On native the deepest `Pressable` under the finger wins
 * the touch responder whether or not it has a handler of its own, so the base's
 * wrapping `<Pressable onLongPress>` only ever worked while its child was
 * inert. Long-press a row that happens to be a kit `<Button>`, a `ListRow`, a
 * `Card` with an `onPress` — anything pressable, which is most of what people
 * attach a context menu to — and the child claims the responder, the wrapper
 * never fires, and the menu never opens.
 *
 * So V4 clones the child and injects `onLongPress` into it: one pressable
 * instead of two nested ones, so there is no responder to lose. A `disabled`
 * child stays disabled, because the press dies in its own `Pressable`, which is
 * what `disabled` means. Anything the child already did on long press runs
 * first. A child that cannot take the prop — a bare string, a plain `<View>` —
 * has nothing to clone onto and nothing that could steal the responder either,
 * so it keeps the wrapper it has always had.
 *
 * ## What the depth is saying
 *
 * The action list is a floating layer, so it takes `elevation.sheet` and the
 * shared `panelSkin` — the same altitude and glass rule as `MenuV4`, `ModalV4`
 * and `DrawerV4`, because all four are one kind of object at four sizes. The
 * rows inside are flat; §8's "cards inside cards inside cards" is what a menu
 * becomes when every item gains a surface.
 *
 * The scrim is the shadow colour at a fixed alpha. The base painted
 * `colors.onSurface` at 0.5, which INVERTS with the scheme and lays a white
 * veil over a dark page.
 *
 * ## Reading the list
 *
 * The destructive row is `dangerText` — the compiler's contrast-corrected red,
 * not the `danger` FILL slot the base used as text, which carries no promise
 * when it is ink. That makes it the **only** coloured thing in the menu, so it
 * is unmistakable because it is different rather than because it shouts (§32).
 *
 * Every row clears 44pt, composed from the spacing scale. Press feedback is the
 * M3 state layer at `state.pressed` rather than a fill of `colors.border` — a
 * hairline colour used as a surface. A disabled row drops to M3's 0.38 rather
 * than each component's own 0.5.
 */
export function ContextMenuV4({
  actions,
  children,
  accessibilityLabel,
}: ContextMenuProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();
  const [open, setOpen] = React.useState(false);

  const renderedChild = React.isValidElement<TriggerProps>(children) ? (
    React.cloneElement(children, {
      onLongPress: (event: GestureResponderEvent) => {
        children.props.onLongPress?.(event);
        setOpen(true);
      },
      delayLongPress: children.props.delayLongPress ?? LONG_PRESS_MS,
    })
  ) : (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Open context menu'}
      accessibilityHint="Long press for actions"
      onLongPress={() => setOpen(true)}
      delayLongPress={LONG_PRESS_MS}
    >
      {children}
    </Pressable>
  );

  const tap = minTap(tokens.spacing);

  return (
    <>
      {renderedChild}
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
            alignItems: 'center',
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
            accessibilityLabel={accessibilityLabel ?? 'Context menu'}
            accessibilityViewIsModal
            style={[
              panelSkin(theme),
              elevationStyle(theme.elevation.sheet),
              {
                minWidth: panelMinWidth(tokens.spacing),
                maxHeight: '70%',
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
              },
            ]}
          >
            <ScrollView>
              {actions.map((action, index) => (
                <Pressable
                  key={index}
                  accessibilityRole="menuitem"
                  // The label rather than the Text child: an icon-only action
                  // would otherwise be announced as nothing at all (§46).
                  accessibilityLabel={action.label}
                  accessibilityState={{ disabled: action.disabled }}
                  disabled={action.disabled}
                  onPress={() => {
                    action.onSelect?.();
                    setOpen(false);
                  }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    minHeight: tap,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.lg,
                    opacity: disabledOpacity(theme.state, action.disabled),
                    // The M3 state layer, not a hairline colour used as a
                    // surface. A tiny action deserves tiny feedback (§36.8),
                    // and the row must not compete with the one coloured item.
                    backgroundColor: pressed ? pressFill(theme) : 'transparent',
                  })}
                >
                  {action.icon != null ? <View>{action.icon}</View> : null}
                  <Text
                    style={{
                      fontFamily: tokens.typography.fontBody,
                      fontSize: tokens.typography.scale.base,
                      fontWeight: '500',
                      // `dangerText`, not `danger`: the plain slot is a FILL
                      // colour and carries no promise as text.
                      color: action.danger === true ? colors.dangerText : colors.onSurface,
                    }}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
