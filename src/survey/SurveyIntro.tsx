import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Card, Icon } from '../primitives';

/** A single meta stat shown in the intro (question count, time, anonymity…). */
export interface SurveyIntroMeta {
  /** Leading glyph/emoji. */
  icon?: string;
  /** The stat value (e.g. `'12'`, `'~3 min'`). */
  value: string;
  /** The stat caption (e.g. `'questions'`, `'to finish'`). */
  label: string;
}

export type SurveyIntroVariant = 'default' | 'hero';

export interface SurveyIntroProps {
  /** Survey title. */
  title: string;
  /** Short description / purpose. */
  description?: string;
  /** Optional leading glyph for a hero mark. */
  logoGlyph?: string;
  /** Meta stats row (question count, est. time…). */
  meta?: SurveyIntroMeta[];
  /** Primary CTA label. Default `'Start survey'`. */
  startLabel?: string;
  /** Fires when the CTA is clicked. */
  onStart?: () => void;
  /** Optional fine print under the CTA (e.g. `'Responses are anonymous.'`). */
  footnote?: string;
  /** `hero` centers the content and enlarges the mark. Default `'default'`. */
  variant?: SurveyIntroVariant;
  className?: string;
}

/**
 * Survey landing / intro screen — a token `Card` leading with the title and
 * purpose, an optional meta stats row (question count, estimated time), and a
 * primary start `Button`. `hero` centers the layout behind an enlarged mark. The
 * CTA carries an accessible name; no literal colors.
 */
export const SurveyIntro = React.forwardRef<HTMLDivElement, SurveyIntroProps>(function SurveyIntro(
  { title, description, logoGlyph, meta, startLabel = 'Start survey', onStart, footnote, variant = 'default', className },
  ref
) {
  const hero = variant === 'hero';

  return (
    <Card ref={ref} className={className}>
      <div className={cn('flex flex-col gap-md', hero ? 'items-center' : 'items-stretch')}>
        {logoGlyph ? (
          <span
            className={cn(
              'flex items-center justify-center rounded-full bg-primary',
              hero ? 'h-[72px] w-[72px] self-center' : 'h-[52px] w-[52px] self-start'
            )}
          >
            <Icon glyph={logoGlyph} size={hero ? '2xl' : 'xl'} color="onPrimary" />
          </span>
        ) : null}

        <h2 className={cn('text-2xl font-extrabold text-on-surface', hero ? 'text-center' : 'text-left')}>
          {title}
        </h2>

        {description ? (
          <p className={cn('text-base leading-relaxed text-muted', hero ? 'text-center' : 'text-left')}>
            {description}
          </p>
        ) : null}

        {meta && meta.length > 0 ? (
          <div className={cn('flex gap-lg py-sm', hero ? 'justify-center' : 'justify-start')}>
            {meta.map((m, i) => (
              <div key={`${m.label}-${i}`} className="flex flex-col items-center gap-0.5">
                {m.icon ? <Icon glyph={m.icon} size="lg" color="primary" /> : null}
                <span className="text-lg font-bold text-on-surface">{m.value}</span>
                <span className="text-xs text-muted">{m.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        <Button variant="primary" size="lg" onClick={onStart} aria-label={startLabel}>
          {startLabel}
        </Button>

        {footnote ? <p className="text-center text-xs text-muted">{footnote}</p> : null}
      </div>
    </Card>
  );
});
