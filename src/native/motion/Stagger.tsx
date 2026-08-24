import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

export interface StaggerConfig {
  /** Delay increment between consecutive children, in ms. */
  interval: number;
  /** Base delay added to every child, in ms. */
  delay: number;
}

/** Provided by `Stagger`; consumed by `Reveal` to offset its mount delay. */
export const StaggerConfigContext = React.createContext<StaggerConfig | null>(null);

/** Position of a child inside the nearest `Stagger`. */
export const StaggerIndexContext = React.createContext<number>(0);

export interface StaggerProps {
  /** Delay increment between consecutive children, in ms. */
  interval?: number;
  /** Base delay added to every child, in ms. */
  delay?: number;
  children?: React.ReactNode;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Sequences child `Reveal` mount delays so lists cascade in — the native mirror
 * of the web `Stagger`. Each child gets `delay + index * interval` added to its
 * own `Reveal` delay via context. Non-`Reveal` children still advance the index,
 * keeping visual order stable when items are mixed. Under reduced motion the
 * child `Reveal`s render immediately, so the cascade simply collapses.
 */
export function Stagger({
  interval = 100,
  delay = 0,
  children,
  style,
}: StaggerProps): React.ReactElement {
  const config = React.useMemo<StaggerConfig>(() => ({ interval, delay }), [interval, delay]);
  const items = React.Children.toArray(children);

  return (
    <View style={style}>
      <StaggerConfigContext.Provider value={config}>
        {items.map((child, index) => (
          <StaggerIndexContext.Provider key={index} value={index}>
            {child}
          </StaggerIndexContext.Provider>
        ))}
      </StaggerConfigContext.Provider>
    </View>
  );
}
