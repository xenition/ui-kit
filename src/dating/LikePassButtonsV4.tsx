import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import type { IconSize } from '../primitives/Icon';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { ACTION_TONE, TONE_INK, type ToneV4 } from './internal/profile-v4';
import type { LikePassButtonsProps, LikePassSize, SwipeAction } from './LikePassButtons';

/**
 * The deck's five actions, under the name the V4 spec uses for them.
 *
 * A pure alias of the base's `SwipeAction` — the same five strings — so
 * `SwipeDeckV4`'s `actions` prop and this component's `actionLabels` can be
 * spelled the way the spec spells them without renaming anything the base
 * already exports.
 */
export type LikePassAction = SwipeAction;

export interface LikePassButtonsV4Props extends LikePassButtonsProps {
  /**
   * Override the five action names. Five English strings lived inside the
   * component, on the only controls in the deck a screen-reader user has.
   */
  actionLabels?: Partial<Record<LikePassAction, string>>;
}

/**
 * The skin an action's tone wears, shared with `SwipeCardV4`'s decision stamps
 * so a LIKE button and a LIKE stamp are demonstrably the same colour.
 *
 * **An opaque 12% tint with a 1px ring**, which is the shape the native twin
 * already drew and the shape the web twin did not: web painted a bare
 * `surface` circle with a 2px coloured border, so one control was two
 * different objects on the two platforms. The tint is *mixed* rather than
 * layered because a translucent wash over an unknown ground is a different
 * colour on a card, on the page and over a photo — and this row sits on all
 * three.
 *
 * `ground` is the same value as `fill`, spelled as a raw CSS expression rather
 * than a Tailwind arbitrary value, because the state layer needs it as a
 * custom property and a class cannot be read back out of one.
 */
export interface ActionSkinV4 {
  /** The opaque tint, as a Tailwind arbitrary value. */
  fill: string;
  /** The same colour as a raw CSS expression, for {@link stateGroundVars}. */
  ground: string;
  /** The 1px ring around the disc. */
  ring: string;
  /** The tone's own fill as a custom property — the state layer's ink. */
  mix: string;
}

const NEUTRAL_SKIN: ActionSkinV4 = {
  fill: 'bg-[color-mix(in_srgb,var(--xen-on-surface)_12%,var(--xen-surface))]',
  ground: 'color-mix(in srgb, var(--xen-on-surface) 12%, var(--xen-surface))',
  ring: 'border-border',
  mix: 'var(--xen-on-surface)',
};

export const ACTION_SKIN: Record<ToneV4, ActionSkinV4> = {
  neutral: NEUTRAL_SKIN,
  muted: NEUTRAL_SKIN,
  primary: {
    fill: 'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))',
    ring: 'border-primary',
    mix: 'var(--xen-primary)',
  },
  accent: {
    fill: 'bg-[color-mix(in_srgb,var(--xen-accent)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-accent) 12%, var(--xen-surface))',
    ring: 'border-accent',
    mix: 'var(--xen-accent)',
  },
  success: {
    fill: 'bg-[color-mix(in_srgb,var(--xen-success)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-success) 12%, var(--xen-surface))',
    ring: 'border-success',
    mix: 'var(--xen-success)',
  },
  warn: {
    fill: 'bg-[color-mix(in_srgb,var(--xen-warn)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-warn) 12%, var(--xen-surface))',
    ring: 'border-warn',
    mix: 'var(--xen-warn)',
  },
  danger: {
    fill: 'bg-[color-mix(in_srgb,var(--xen-danger)_12%,var(--xen-surface))]',
    ground: 'color-mix(in srgb, var(--xen-danger) 12%, var(--xen-surface))',
    ring: 'border-danger',
    mix: 'var(--xen-danger)',
  },
};

/** The glyph and the default name for each of the five actions. */
const SPEC: Record<LikePassAction, { glyph: string; label: string }> = {
  rewind: { glyph: '↺', label: 'Rewind' },
  pass: { glyph: '✕', label: 'Pass' },
  superlike: { glyph: '★', label: 'Super like' },
  like: { glyph: '♥', label: 'Like' },
  boost: { glyph: '⚡', label: 'Boost' },
};

/**
 * The three diameters, composed from the spacing scale rather than picked.
 *
 * `sm` is the 44 tap floor exactly (`2xl - xs`), `md` is 56 (`2xl + sm`) and
 * `lg` is **64** (`2xl + md`) — the number the web twin already drew. Native
 * drew 68, one of a pair of nearly-equal sizes for one idea; 64 wins because it
 * lands on the scale and 68 does not, so a seed that re-scales its rhythm
 * re-scales the button row with it.
 */
const DIAMETER: Record<LikePassSize, string> = {
  sm: 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
  md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]',
  lg: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]',
};

/** The glyph scales with the disc rather than staying one size in three circles. */
const GLYPH_SIZE: Record<LikePassSize, IconSize> = { sm: 'lg', md: 'xl', lg: '2xl' };

const DEFAULT_ACTIONS: LikePassAction[] = ['pass', 'superlike', 'like'];

/**
 * **V4 like/pass buttons** — the web twin of the native `LikePassButtonsV4`,
 * same props as {@link LikePassButtons} plus `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is no longer an error.** The row spent four *status*
 *    slots on five *identities* — `rewind → warn`, `pass → danger`,
 *    `like → success` — so a toolbar of ordinary, non-destructive choices was
 *    painted in the two colours that mean something has gone wrong. `ACTION_TONE`
 *    gives them identity tones and the glyph carries which action it is.
 * 2. **The row is one control on both platforms.** Web drew a bare `surface`
 *    circle with a 2px coloured border, native a 12% tint with a 1px border,
 *    and `lg` was 64 on one and 68 on the other. See {@link ACTION_SKIN} and
 *    {@link DIAMETER}.
 * 3. **`role="toolbar"` now means what it says.** The base claimed the role and
 *    left five separate tab stops behind it, so a keyboard user got the
 *    announcement of arrow-key navigation and none of the behaviour. Focus is
 *    roving: one tab stop for the row, arrows between the buttons, and a
 *    disabled action is stepped over rather than focused into.
 * 4. **Press is a state layer, not a dim.** `hover:bg-neutral-100` is a
 *    light-oriented ramp step that paints a near-white disc on a dark page, and
 *    `disabled:opacity-40` is not M3's 0.38 disabled band.
 * 5. **The five names are props.** They were English string literals on the
 *    only controls in the deck a screen-reader user can reach.
 */
export const LikePassButtonsV4 = React.forwardRef<HTMLDivElement, LikePassButtonsV4Props>(
  function LikePassButtonsV4(
    {
      actions = DEFAULT_ACTIONS,
      onAction,
      disabledActions,
      size = 'md',
      actionLabels,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
    const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;

    const [focused, setFocused] = React.useState(0);
    const buttons = React.useRef<Array<HTMLButtonElement | null>>([]);

    // The roving tab stop has to land on something focusable: a disabled
    // action cannot take focus, and a row whose first action is `rewind` with
    // nothing to undo is the common case.
    const firstEnabled = list.findIndex((action) => !disabledSet.has(action));
    const held = list[focused];
    const roving = held != null && !disabledSet.has(held) ? focused : Math.max(0, firstEnabled);

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      if (delta === 0 || firstEnabled < 0) return;
      event.preventDefault();
      let next = roving;
      for (let step = 0; step < list.length; step += 1) {
        next = (next + delta + list.length) % list.length;
        const candidate = list[next];
        if (candidate != null && !disabledSet.has(candidate)) break;
      }
      setFocused(next);
      buttons.current[next]?.focus();
    };

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cn('flex items-center justify-center gap-md', className)}
        {...rest}
      >
        {list.map((action, i) => {
          const spec = SPEC[action];
          const tone = ACTION_TONE[action] ?? 'neutral';
          const skin = ACTION_SKIN[tone];
          const disabled = disabledSet.has(action);
          return (
            <button
              key={action}
              ref={(node) => {
                buttons.current[i] = node;
              }}
              type="button"
              aria-label={actionLabels?.[action] ?? spec.label}
              disabled={disabled}
              tabIndex={i === roving ? 0 : -1}
              onFocus={() => setFocused(i)}
              onClick={() => onAction?.(action)}
              data-xen-v4-state=""
              style={stateGroundVars(skin.ground, skin.mix)}
              className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-full border font-bold',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                V4_DISABLED_CLASS,
                MIN_TAP_SQUARE_CLASS,
                DIAMETER[size],
                skin.fill,
                skin.ring,
                TONE_INK[tone]
              )}
            >
              <IconV4 glyph={spec.glyph} size={GLYPH_SIZE[size]} />
            </button>
          );
        })}
      </div>
    );
  }
);
