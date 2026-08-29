import * as React from 'react';
import { cn } from './cn';
import type { LabelProps } from './Label';

export type { LabelProps as LabelV4Props };

/**
 * **V4 form label** — the web twin of the native `LabelV4`, same props as
 * {@link Label}, a different design line.
 *
 * A label is the least decorative thing in a kit and the easiest to get
 * quietly wrong, so V4 changes three things and nothing else.
 *
 * 1. **"Required" is announced, not just drawn.** The base label rendered a
 *    red `*` marked `aria-hidden`, so the single fact the marker exists to
 *    carry never reached a screen reader at all. A visual-only requirement is
 *    not a requirement (§46). The glyph stays hidden — an asterisk read aloud
 *    is noise — and the word rides along in a visually-hidden span, so the
 *    field announces itself as required when it takes focus.
 * 2. **The marker takes the measured red.** `text-danger` is the FILL slot;
 *    the compiler guarantees `on-danger` against it and guarantees nothing
 *    about it as ink on `surface`. `text-danger-text` is the same hue walked
 *    until it clears AA — and this glyph is small, which is precisely where
 *    the difference shows.
 * 3. **The offset comes from the scale.** `ml-0.5` is Tailwind's rhythm, not
 *    the seed's; the marker now sits half a spacing step off the word.
 *
 * No container, no fill, no gradient. A label is typography, and §10 asks that
 * typography do this work before anything else is reached for.
 */
export const LabelV4 = React.forwardRef<HTMLLabelElement, LabelProps>(function LabelV4(
  { className, required = false, children, ...rest },
  ref
) {
  return (
    <label
      ref={ref}
      data-xen-v4-label=""
      className={cn('font-body text-sm font-semibold text-on-surface', className)}
      {...rest}
    >
      {children}
      {required ? (
        <>
          <span
            aria-hidden="true"
            className="ml-[calc(var(--xen-space-xs)/2)] text-danger-text"
          >
            *
          </span>
          {/* The asterisk is decoration; this is the fact it stands for. */}
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
});
