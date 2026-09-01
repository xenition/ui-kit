import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import type { MailSwipeActionsProps, SwipeActionTone } from './MailSwipeActions';

export interface MailSwipeActionsV4Props extends MailSwipeActionsProps {
  /**
   * Ids that destroy something. An action listed here takes **two** presses:
   * the first arms it and repaints the panel with `confirmLabel`, the second
   * fires `onPress`. Empty by default, so nothing changes for a caller who
   * says nothing.
   */
  destructiveIds?: string[];
  /** The armed panel's word. Default `` `Confirm ${label}` ``. */
  confirmLabel?: (label: string) => string;
  /** The rail's accessible name. Default `'Message actions'`. */
  toolbarLabel?: string;
}

/**
 * The ground and the ink each tone paints with — **a guaranteed pair in every
 * row**.
 *
 * `neutral` was `muted` (a ramp step) carrying `surface` (the page colour) as
 * its ink: two slots the compiler promises nothing about together, which is
 * why the web twin ended up drawing an `on-surface` glyph beside a `surface`
 * word on the same panel. A neutral panel is a raised surface, so it takes the
 * pair that was split out for exactly that.
 */
const TONE_SLOTS: Record<SwipeActionTone, { bg: keyof SemanticColors; fg: keyof SemanticColors }> =
  {
    neutral: { bg: 'card', fg: 'onCard' },
    primary: { bg: 'primary', fg: 'onPrimary' },
    success: { bg: 'success', fg: 'onSuccess' },
    warn: { bg: 'warn', fg: 'onWarn' },
    danger: { bg: 'danger', fg: 'onDanger' },
  };

/**
 * **V4 mail swipe rail** — same props as {@link MailSwipeActions} plus
 * `destructiveIds`, `confirmLabel` and `toolbarLabel`.
 *
 * ## Five changes
 *
 * 1. **A destructive action asks first.** Delete fired on a single tap, with
 *    no confirmation, no undo, and no prop through which a caller could ask
 *    for either — on a rail that is often the only route to it. An id in
 *    `destructiveIds` arms on the first press and fires on the second, and the
 *    armed state is a **word** ("Confirm Delete"), not a colour, so it survives
 *    a colour-blind user and a screen reader alike. Arming one action disarms
 *    any other.
 * 2. **The reading order matches the painted order.** `side="trailing"` was
 *    drawn with `flexDirection: 'row-reverse'`, which reverses the paint and
 *    leaves traversal running the other way — on a rail whose last item is
 *    typically Delete. V4 reverses the *array* and lays it out in `row`, so
 *    the picture is identical and a switch-control walks it left to right.
 * 3. **The rail has a name.** An unnamed `toolbar` announces as a container
 *    with nothing in it worth saying.
 * 4. **The glyph and its label are the same colour**, and it is the panel
 *    fill's guaranteed pair. See {@link TONE_SLOTS}.
 * 5. **Press is a state layer and the panel clears 44.** `opacity: 0.85`
 *    dimmed the content, which is M3's language for *disabled*.
 */
export function MailSwipeActionsV4({
  actions,
  side = 'trailing',
  destructiveIds,
  confirmLabel = (label) => `Confirm ${label}`,
  toolbarLabel = 'Message actions',
  style,
}: MailSwipeActionsV4Props): React.ReactElement | null {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [armed, setArmed] = React.useState<string | null>(null);

  const safe = actions ?? [];
  const destructive = destructiveIds ?? [];

  // The paint the base achieved with `row-reverse`, reached by reordering the
  // list instead — so what a reader walks is what a user sees.
  const ordered = side === 'trailing' ? [...safe].reverse() : safe;

  if (safe.length === 0) return null;

  return (
    <View
      accessibilityRole="toolbar"
      accessibilityLabel={toolbarLabel}
      style={[{ flexDirection: 'row', alignItems: 'stretch' }, style]}
    >
      {ordered.map((a) => {
        const tone = a.tone ?? 'neutral';
        const slots = TONE_SLOTS[tone];
        const ground = colors[slots.bg];
        const ink = colors[slots.fg];
        const guarded = destructive.includes(a.id);
        const isArmed = guarded && armed === a.id;
        const word = isArmed ? confirmLabel(a.label) : a.label;

        return (
          <Pressable
            key={a.id}
            accessibilityRole="button"
            accessibilityLabel={word}
            onPress={() => {
              if (guarded && !isArmed) {
                setArmed(a.id);
                return;
              }
              setArmed(null);
              a.onPress?.();
            }}
            style={({ pressed }) => ({
              // The base's 72, composed off the scale instead of typed.
              minWidth: tokens.spacing['2xl'] + tokens.spacing.lg,
              minHeight: minTap(tokens.spacing),
              paddingHorizontal: tokens.spacing.md,
              paddingVertical: tokens.spacing.md,
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              // The panel owns its fill, so the layer is composited into it.
              backgroundColor: pressed ? pressOver(theme, ground, ink) : ground,
            })}
          >
            <IconV4 glyph={a.glyph} size="lg" style={{ color: ink }} />
            <TextV4 size="xs" weight="semibold" numberOfLines={1} style={{ color: ink }}>
              {word}
            </TextV4>
          </Pressable>
        );
      })}
    </View>
  );
}
