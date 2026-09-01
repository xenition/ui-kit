import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { V4_MOTION } from '../primitives/internal/motion-v4';
import { StaggerConfigContext, StaggerIndexContext, type StaggerConfig } from './Stagger';

/**
 * The cap on the accumulated cascade offset, in ms.
 *
 * `interval * index` is unbounded, which is the guard brief §4 asks for: at the
 * default 100ms interval a list of forty rows puts the last one four seconds
 * behind the first, and a cascade that outlives the reader's attention has
 * stopped being a cascade and become a wait. On a phone this is the more likely
 * of the two twins to hit it — a `FlatList`-sized list is the normal case here,
 * not the long one.
 *
 * `enter * 2` (800ms), composed from the scale rather than picked, and the same
 * number as the web twin: the last child *starts* no later than twice the
 * longest single transition the scale defines. Past the cap the remaining
 * children arrive together; the first eight still cascade, and they are the
 * ones on screen.
 */
export const STAGGER_V4_MAX_DELAY = V4_MOTION.enter * 2;

export interface StaggerV4Props {
  /**
   * Delay increment between consecutive children, in ms. Defaults to
   * `V4_MOTION.quick` (100) — the number the base already used, said properly.
   */
  interval?: number;
  /** Base delay added to every child, in ms. */
  delay?: number;
  /**
   * Ceiling on the *accumulated* `interval * index` offset, in ms. Defaults to
   * {@link STAGGER_V4_MAX_DELAY} (800). `delay` is added on top and is never
   * capped: a base delay is an explicit instruction from the caller, while the
   * accumulation is an emergent number nobody chose.
   */
  maxDelay?: number;
  children?: React.ReactNode;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 stagger (native)** — the twin of the web `StaggerV4`, same props, same
 * defaults, same cap.
 *
 * 1. **`interval` comes from the scale.** The base defaulted to a hand-typed
 *    `100`, which is `V4_MOTION.quick` exactly — right number, wrong provenance
 *    (brief §1).
 * 2. **The cascade is bounded.** See {@link STAGGER_V4_MAX_DELAY}.
 *
 * **How the cap is enforced.** The base handed children a
 * `{ interval, delay }` config and let each `Reveal` compute
 * `delay + index * interval` itself, so a cap living here could only be a
 * request that a plain `Reveal` would ignore. This component resolves the
 * arithmetic instead and hands each child its final offset as
 * `{ interval: 0, delay: <resolved> }` — every existing consumer computes
 * `resolved + index * 0` and lands on the capped number without knowing the cap
 * exists. So `StaggerV4` bounds a subtree of plain `Reveal`s as well as one of
 * `RevealV4`s, and the contexts are the base's, imported not copied, for the
 * same reason.
 *
 * Non-`Reveal` children still advance the index, keeping visual order stable in
 * a mixed list — unchanged from the base. Reduced motion is not this
 * component's business: it adds delays, and a delay before a fade is still a
 * fade. `RevealV4` decides what the movement is.
 */
export function StaggerV4({
  interval = V4_MOTION.quick,
  delay = 0,
  maxDelay = STAGGER_V4_MAX_DELAY,
  children,
  style,
}: StaggerV4Props): React.ReactElement {
  const items = React.Children.toArray(children);
  const count = items.length;

  const configs = React.useMemo<StaggerConfig[]>(
    () =>
      Array.from({ length: count }, (_unused, index) => ({
        // Already resolved for this index, so the child multiplies by nothing.
        interval: 0,
        delay: delay + Math.min(index * interval, maxDelay),
      })),
    [count, interval, delay, maxDelay]
  );

  return (
    <View testID="xen-v4-stagger" style={style}>
      {items.map((child, index) => (
        <StaggerConfigContext.Provider key={index} value={configs[index] as StaggerConfig}>
          <StaggerIndexContext.Provider value={index}>{child}</StaggerIndexContext.Provider>
        </StaggerConfigContext.Provider>
      ))}
    </View>
  );
}
