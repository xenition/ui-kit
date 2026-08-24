import * as React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tip content. */
  label: React.ReactNode;
  /** Retained for web prop parity; not used to anchor on native (see note). */
  side?: TooltipSide;
  children: React.ReactNode;
}

/**
 * Themed tooltip — the native mirror of the web `Tooltip`. Native has no hover,
 * so the tip is revealed by press / long-press on the trigger instead of
 * mouse-enter, and shows as a centered `Modal` bubble rather than a bubble
 * anchored to `side` (native simplification — `side` is kept for prop parity
 * only). The bubble uses the inverted `onSurface`/`surface` token pair. No
 * literal colors.
 */
export function Tooltip({ label, side = 'top', children }: TooltipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/*
        A transparent tap surface, and deliberately NOT a `button`.

        Same defect the Popover/Menu/Popconfirm triggers had: this wraps whatever
        the caller passed as `children`, and the natural thing to attach a tooltip
        to is a control that is already pressable. Claiming
        `accessibilityRole="button"` here makes react-native-web render both as
        real `<button>` elements — a `<button>` inside a `<button>`, which is
        invalid HTML, logs two validateDOMNesting errors per mount, and leaves the
        tap target up to the browser. A screen reader hears "button" twice.

        The role belongs to the wrapped control, which already declares its own.
        This layer only needs to catch the press.
      */}
      <Pressable
        onPress={() => setOpen((o) => !o)}
        onLongPress={() => setOpen(true)}
      >
        {children}
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: tokens.spacing.lg }}>
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
            accessibilityRole="text"
            style={{
              backgroundColor: colors.onSurface,
              borderRadius: tokens.radius.sm,
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.sm,
            }}
          >
            {typeof label === 'string' ? (
              <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.surface }}>{label}</Text>
            ) : (
              label
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
