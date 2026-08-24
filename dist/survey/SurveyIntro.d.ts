import * as React from 'react';
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
export declare const SurveyIntro: React.ForwardRefExoticComponent<SurveyIntroProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SurveyIntro.d.ts.map