import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

/**
 * The corner steps a framed panel may take. `full` is deliberately absent — a
 * pill-shaped media frame is not a shape this product has, and `radius.full`
 * on a 16:9 box reads as a mistake rather than a decision.
 */
export type AspectRatioRadius = 'sm' | 'md' | 'lg';

export interface AspectRatioV4Props extends ViewProps {
  /** Width-to-height ratio, e.g. `16 / 9` or `1`. */
  ratio: number;
  /**
   * Clip children to a token corner radius. `true` keeps the base's `lg` —
   * the card radius (§4.2) — so a hero panel matches the cards around it;
   * `'sm'` / `'md'` are for a thumbnail, which at 44–64px wears `lg` like a
   * circle.
   */
  rounded?: boolean | AspectRatioRadius;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/** `rounded` as a radius step. `true` is the base's `lg`, unchanged. */
function radiusOf(rounded: boolean | AspectRatioRadius): AspectRatioRadius | null {
  if (rounded === false) return null;
  if (rounded === true) return 'lg';
  return rounded;
}

/**
 * **V4 aspect ratio** — the native twin of the web `AspectRatioV4`, the base's
 * props with a widened `rounded`.
 *
 * §5 calls this one "structure only, no visual change": both twins were
 * already token-pure, so nothing here moves a colour, a spacing or a default.
 *
 * ## What V4 changes
 *
 * **`rounded` is a step, not a switch.** The base hardcoded `radius.lg` behind
 * a boolean, so a 320pt hero panel and a 44pt thumbnail were forced to the
 * same corner — and on a thumbnail `lg` is most of the box. `rounded` now
 * takes `'sm' | 'md' | 'lg'` as well, with `true` still meaning `lg`, so the
 * default rendering is untouched (§1.4) and the caller can size the corner to
 * the frame.
 *
 * **`overflow: 'hidden'` is asserted, not assumed.** §5 asks for it explicitly
 * on this twin: Android does not clip a child to its parent's `borderRadius`
 * unless the parent hides its overflow, so a rounded frame with a full-bleed
 * `Image` in it had square corners on Android and round ones on iOS. It was
 * already in the base style; the spec now pins it so it cannot be dropped.
 *
 * ## What it deliberately does not do
 *
 * **No shadow.** §4.6 gives a shadow to a card, a sheet and the one dominant
 * action. A ratio box is a frame around media — usually media already inside a
 * card, and §4.6 forbids nesting a shadow in a shadow. A caller that wants the
 * card treatment composes `CardV4` around this. (`overflow: 'hidden'` and an
 * RN shadow are mutually exclusive on Android anyway.)
 *
 * **An empty frame still draws.** §4.5 says a component with nothing to show
 * renders nothing rather than a blank bordered box — but this component's
 * entire job is *reserving* the space before the media arrives, and it paints
 * no border and no ground to leave behind. Rendering `null` while the image
 * loads would collapse the layout and reflow the screen around it, which is
 * the defect the ratio box exists to prevent. So the empty case keeps its
 * geometry and stays invisible.
 *
 * `ratio` and the `'100%'` width are the only bare values here, and both are
 * geometric — layout constants the caller owns, not design values (§1.1).
 */
export function AspectRatioV4({
  ratio,
  rounded = false,
  style,
  children,
  ...rest
}: AspectRatioV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const radius = radiusOf(rounded);
  return (
    <View
      style={[
        {
          width: '100%',
          aspectRatio: ratio,
          // Android will not clip a child to `borderRadius` without this.
          overflow: 'hidden',
          borderRadius: radius ? tokens.radius[radius] : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
