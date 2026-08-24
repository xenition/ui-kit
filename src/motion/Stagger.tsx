import * as React from 'react';

export interface StaggerConfig {
  /** Delay increment between consecutive children, in ms. */
  interval: number;
  /** Base delay added to every child, in ms. */
  delay: number;
}

/** Provided by `Stagger`; consumed by `Reveal` to offset its delay. */
export const StaggerConfigContext = React.createContext<StaggerConfig | null>(null);

/** Position of a child inside the nearest `Stagger`. */
export const StaggerIndexContext = React.createContext<number>(0);

export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Delay increment between consecutive children, in ms. */
  interval?: number;
  /** Base delay added to every child, in ms. */
  delay?: number;
}

/**
 * Applies incremental transition delays to child `Reveal`s so lists cascade
 * in. Non-`Reveal` children render untouched (they still advance the index,
 * keeping visual order stable when items are mixed).
 */
export const Stagger = React.forwardRef<HTMLDivElement, StaggerProps>(function Stagger(
  { interval = 100, delay = 0, children, ...rest },
  ref
) {
  const config = React.useMemo<StaggerConfig>(() => ({ interval, delay }), [interval, delay]);
  const items = React.Children.toArray(children);

  return (
    <div ref={ref} data-xen-stagger="" {...rest}>
      <StaggerConfigContext.Provider value={config}>
        {items.map((child, index) => (
          <StaggerIndexContext.Provider key={index} value={index}>
            {child}
          </StaggerIndexContext.Provider>
        ))}
      </StaggerConfigContext.Provider>
    </div>
  );
});
