import * as React from 'react';
import { cn } from '../primitives/cn';
import type { SurveyIntroProps } from './SurveyIntro';

/** Drop-in for {@link SurveyIntroProps} — same props, the V4 "focus" design. */
export type SurveyIntroV4Props = SurveyIntroProps;

/**
 * SurveyIntro — **V4** "clean form / focus" design (web parity of the native V4).
 * The start of a survey is a peak moment, so this variant leads with a brand
 * gradient hero band (`bg-gradient-to-br from-primary-500 to-primary-700`) carrying
 * near-white ink (`text-primary-50` / `text-primary-100`): an optional glyph mark,
 * the title, the purpose line, and any meta stats rendered as frosted glass tiles
 * (`bg-primary-50/15 border border-primary-50/30`). Below the band a big ≥44px
 * primary Start CTA sits in the thumb zone with an accessible name, and the
 * footnote is quiet muted fine print. `hero` centers the band and enlarges the
 * mark. Same props/behavior as {@link SurveyIntroProps}; all colors from `--xen-*`
 * token classes + gradient utilities (no literal colors), dark-mode safe.
 */
export const SurveyIntroV4 = React.forwardRef<HTMLDivElement, SurveyIntroV4Props>(function SurveyIntroV4(
  { title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', className },
  ref
) {
  const hero = variant === 'hero';

  return (
    <div
      ref={ref}
      data-xen-survey-intro=""
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm',
        className
      )}
    >
      {/* Brand gradient hero band — the peak/start moment. */}
      <div
        className={cn(
          'flex flex-col gap-md bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
          hero ? 'items-center' : 'items-stretch'
        )}
      >
        {logoGlyph ? (
          <span
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center rounded-full bg-primary-50/15 border border-primary-50/30',
              hero ? 'h-[72px] w-[72px] self-center text-3xl' : 'h-[52px] w-[52px] self-start text-2xl'
            )}
          >
            {logoGlyph}
          </span>
        ) : null}

        <h2 className={cn('text-2xl font-extrabold text-primary-50', hero ? 'text-center' : 'text-left')}>
          {title}
        </h2>

        {description ? (
          <p className={cn('text-base leading-relaxed text-primary-100', hero ? 'text-center' : 'text-left')}>
            {description}
          </p>
        ) : null}

        {meta && meta.length > 0 ? (
          <div className={cn('flex flex-wrap gap-sm', hero ? 'justify-center' : 'justify-start')}>
            {meta.map((m, i) => (
              <div
                key={`${m.label}-${i}`}
                className="flex flex-1 min-w-[84px] flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
              >
                {m.icon ? (
                  <span aria-hidden="true" className="text-lg">
                    {m.icon}
                  </span>
                ) : null}
                <span className="text-lg font-extrabold text-primary-50">{m.value}</span>
                <span className="text-xs text-primary-100">{m.label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Calm form footer — big primary CTA in the thumb zone. */}
      <div className="flex flex-col gap-sm p-[var(--xen-space-lg)]">
        <button
          type="button"
          aria-label={startLabel}
          onClick={onStart}
          className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-primary py-[var(--xen-space-md)] text-base font-extrabold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {startLabel}
        </button>

        {footnote ? <p className="text-center text-xs text-muted">{footnote}</p> : null}
      </div>
    </div>
  );
});
