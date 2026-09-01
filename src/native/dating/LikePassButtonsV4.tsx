import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import type { XenitionNativeTheme } from '../theme';
import type { SpacingScale } from '../../theme/types';
import { TextV4 } from '../primitives/TextV4';
import type { TextSize } from '../primitives/Text';
import { mixToken } from '../../primitives/internal/v4-depth';
import { disabledOpacity, minTap } from '../primitives/internal/chrome-v4';
import { pressOver } from '../primitives/internal/state-v4';
import { toneFill } from '../primitives/internal/tone-v4';
import { ACTION_TONE, toneInk, type ToneV4 } from './internal/profile-v4';
import type { LikePassButtonsProps, LikePassSize, SwipeAction } from './LikePassButtons';

export interface LikePassButtonsV4Props extends LikePassButtonsProps {
  /** Per-action names. Defaults `Rewind` / `Pass` / `Super like` / `Like` / `Boost`. */
  actionLabels?: Partial<Record<SwipeAction, string>>;
}

/**
 * How a deck action is painted: an opaque 12% tint of its tone with a 1px ring
 * of the tone itself.
 *
 * This is the native treatment, and the web twin has moved onto it — the two
 * platforms drew the same control two ways, a 12% tint with a 1px border here
 * and a `surface` circle with a 2px border there. The tint is **mixed** rather
 * than layered because a translucent wash over an unknown ground is a
 * different colour on a card, on the page and over a photo, and this row sits
 * on all three.
 *
 * It lives in this file rather than in `internal/` because `SwipeCardV4` and
 * `BoostBannerV4` both need it, and one exported definition beats three
 * copies.
 */
export interface ActionSkinV4 {
  /** The opaque tint behind the glyph. */
  ground: string;
  /** The 1px ring around the disc. */
  ring: string;
  /** The tone's own fill — what a state layer over this skin is mixed from. */
  mix: string;
}

/** The 12% tone tint the skin is composited at. */
const SKIN_MIX = 0.12;

export function ACTION_SKIN(theme: XenitionNativeTheme, tone: ToneV4): ActionSkinV4 {
  const { colors } = theme;
  // `neutral` resolves to `muted` — a ramp step with no contrast promise — so
  // it mixes from the page's own ink and rings with the hairline instead.
  const neutral = tone === 'neutral';
  const mix = neutral ? colors.onSurface : toneFill(theme, tone);
  return {
    ground: mixToken(colors.surface, mix, SKIN_MIX),
    ring: neutral ? colors.border : mix,
    mix,
  };
}

/** The glyph and the default name for each of the five actions. */
const SPEC: Record<SwipeAction, { glyph: string; label: string }> = {
  rewind: { glyph: '↺', label: 'Rewind' },
  pass: { glyph: '✕', label: 'Pass' },
  superlike: { glyph: '★', label: 'Super like' },
  like: { glyph: '♥', label: 'Like' },
  boost: { glyph: '⚡', label: 'Boost' },
};

/**
 * Button diameters, composed from the spacing scale rather than remembered:
 * `sm` is the 44 tap floor exactly (`2xl - xs`), `md` is 56 (`2xl + sm`) and
 * `lg` is **64** (`2xl + md`) — the number the web twin already drew. Native
 * drew 68, one of a pair of nearly-equal sizes for one idea; 64 wins because
 * it lands on the scale and 68 does not, so a seed that re-scales its rhythm
 * re-scales the button row with it.
 */
function diameter(spacing: SpacingScale, size: LikePassSize): number {
  if (size === 'sm') return spacing['2xl'] - spacing.xs;
  return spacing['2xl'] + (size === 'md' ? spacing.sm : spacing.md);
}

/** The glyph scales with the disc rather than staying one size in three circles. */
const GLYPH_SIZE: Record<LikePassSize, TextSize> = { sm: 'lg', md: 'xl', lg: '2xl' };

const DEFAULT_ACTIONS: SwipeAction[] = ['pass', 'superlike', 'like'];

/**
 * **V4 like/pass row** — same props as {@link LikePassButtons} plus
 * `actionLabels`.
 *
 * ## Five changes
 *
 * 1. **Passing on someone is not an error.** The row typed `rewind → warn`,
 *    `pass → danger`, `like → success` — four status slots spent on five
 *    identities, sitting side by side in one toolbar, so the palette that is
 *    supposed to mean "something has gone wrong" meant "this is the left-hand
 *    button". `ACTION_TONE` gives pass and rewind a neutral identity and
 *    leaves the glyph to say which is which.
 * 2. **One control, one size, one skin.** `lg` was 64 on the web and 68 here,
 *    and the two platforms painted the disc differently besides. See
 *    {@link ACTION_SKIN} and {@link diameter}.
 * 3. **The row does not claim keyboard navigation it does not have.** The base
 *    set `accessibilityRole="toolbar"`, which promises arrow-key movement
 *    between the controls; nothing implemented it, and React Native has no
 *    contract to implement it *with* — the web twin has real roving focus, and
 *    here each button is simply its own reachable control.
 * 4. **Press is a state layer and disabled is 0.38.** The base drew press as
 *    `opacity: 0.85` and disabled as `0.4` — two numbers in the same band, so
 *    a pressed button and an unavailable one looked alike.
 * 5. **The row clears the home indicator.** This is the deck's pinned action
 *    row and it read no safe-area inset, so on a notched phone the like button
 *    sat under the home bar. It pays `insets.bottom` now; a caller embedding
 *    the row inside a card (as `ProfileCardV4` does) passes
 *    `style={{ paddingBottom: 0 }}` to take it back.
 *
 * The base's `emphasis` field is not carried over: every action was `'ghost'`
 * and nothing ever read it.
 */
export function LikePassButtonsV4({
  actions = DEFAULT_ACTIONS,
  onAction,
  disabledActions,
  size = 'md',
  actionLabels,
  style,
}: LikePassButtonsV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  // Needs a `SafeAreaProvider` above it (Expo mounts one by default).
  const insets = useSafeAreaInsets();

  const disabledSet = React.useMemo(() => new Set(disabledActions ?? []), [disabledActions]);
  const list = actions.length > 0 ? actions : DEFAULT_ACTIONS;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: tokens.spacing.md,
          paddingBottom: insets.bottom,
        },
        style,
      ]}
    >
      {list.map((action) => {
        const tone = ACTION_TONE[action] ?? 'neutral';
        const skin = ACTION_SKIN(theme, tone);
        const ink = toneInk(theme, tone);
        const d = Math.max(diameter(tokens.spacing, size), minTap(tokens.spacing));
        const disabled = disabledSet.has(action);
        return (
          <Pressable
            key={action}
            accessibilityRole="button"
            accessibilityLabel={actionLabels?.[action] ?? SPEC[action].label}
            accessibilityState={{ disabled }}
            disabled={disabled}
            onPress={() => onAction?.(action)}
            style={({ pressed }) => ({
              width: d,
              height: d,
              // Geometry, not `radius.full`: these are circles in every brand,
              // including a `sharp` seed where the token compiles to 0.
              borderRadius: d / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pressed ? pressOver(theme, skin.ground, skin.mix) : skin.ground,
              borderWidth: 1,
              borderColor: skin.ring,
              opacity: disabledOpacity(theme.state, disabled),
            })}
          >
            <TextV4
              size={GLYPH_SIZE[size]}
              weight="bold"
              allowFontScaling={false}
              style={{ color: ink }}
            >
              {SPEC[action].glyph}
            </TextV4>
          </Pressable>
        );
      })}
    </View>
  );
}
