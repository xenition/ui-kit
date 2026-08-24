import * as React from 'react';
import { cn } from '../primitives/cn';

export type SkillTagVariant = 'default' | 'matched' | 'missing';

export interface SkillTagProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onClick' | 'children'> {
  /** Skill label, e.g. `'TypeScript'`. */
  label: string;
  /**
   * Visual emphasis:
   * - `default` — a neutral keyword chip.
   * - `matched` — the applicant has this skill (success tones + ✓ marker).
   * - `missing` — required but not on the résumé (danger tones + ! marker).
   */
  variant?: SkillTagVariant;
  /** Marks the chip as selected (e.g. an active filter). */
  selected?: boolean;
  /** Makes the chip pressable (toggle a filter, open detail). `onPress` → `onClick`. */
  onClick?: () => void;
  /** Renders a × affordance that calls this. */
  onRemove?: () => void;
}

/** [background, foreground] token classes per variant — no literal colors. */
const VARIANT_CLASS: Record<SkillTagVariant, string> = {
  default: 'bg-neutral-100 text-on-surface',
  matched: 'bg-success text-on-success',
  missing: 'bg-danger text-on-danger',
};

/**
 * A non-color signal so variant is not conveyed by color alone — a leading glyph
 * marker that survives for color-blind users and in monochrome.
 */
const MARKER: Record<SkillTagVariant, string> = {
  default: '',
  matched: '✓ ',
  missing: '! ',
};

/**
 * A skill / keyword chip for job cards and résumé matching. Mirrors the
 * primitive `Tag` shape but adds a jobs-specific `variant` axis (`matched` /
 * `missing`) that pairs a token color with a leading glyph marker. Optionally
 * pressable (`onClick`) and removable (`onRemove`). Token-only.
 */
export const SkillTag = React.forwardRef<HTMLSpanElement, SkillTagProps>(function SkillTag(
  { label, variant = 'default', selected = false, onClick, onRemove, className, ...rest },
  ref
) {
  const chipClass = cn(
    'inline-flex items-center gap-xs self-start rounded-sm px-sm py-[3px] text-xs font-medium',
    VARIANT_CLASS[variant],
    selected && 'ring-2 ring-primary',
    className
  );

  const inner = (
    <>
      <span>
        {MARKER[variant]}
        {label}
      </span>
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 font-semibold opacity-70 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      ) : null}
    </>
  );

  if (!onClick) {
    return (
      <span ref={ref} data-xen-skill-tag="" className={chipClass} {...rest}>
        {inner}
      </span>
    );
  }

  return (
    <button
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      type="button"
      data-xen-skill-tag=""
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(chipClass, 'transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary')}
      {...(rest as unknown as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
});
