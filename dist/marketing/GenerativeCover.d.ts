import * as React from 'react';
export type CoverForm = 'arc' | 'bands' | 'orbit' | 'grid' | 'wave' | 'stack';
/**
 * A token role a cover color may take: a ramp step (`primary-600`,
 * `neutral-100`, …) or a semantic slot (`surface`, `accent`, …). Resolved to
 * `var(--xen-*)` — never a literal color.
 */
export type CoverColorRole = string;
export interface GenerativeCoverProps extends React.SVGAttributes<SVGSVGElement> {
    /** Anything stable — slug, title, id. Same seed, same art, every render and runtime. */
    seed: string | number;
    /** Force a composition; omitted, the form is derived from the seed. */
    form?: CoverForm;
    /** Token role for the foreground "ink" (default `primary-600`). */
    ink?: CoverColorRole;
    /** Token role for the background "paper" (default `neutral-100`). */
    paper?: CoverColorRole;
    /**
     * Accessible name (e.g. the project title). When provided the SVG is
     * announced via `role="img"`; when omitted it is decorative (`aria-hidden`).
     */
    label?: string;
}
export declare const COVER_FORMS: readonly CoverForm[];
/** FNV-1a — tiny, stable string hash for seeding. */
export declare function hashSeed(seed: string | number): number;
/**
 * Deterministic generative cover art — the portfolio template's "print
 * plates" as a kit component. Two token color roles (`ink` over `paper`), six
 * composition grammars, and a seeded PRNG for geometry, so covers need no
 * stock imagery and restyle with the theme. Same `{seed, form, ink, paper}`
 * always renders identical markup (SSR === client === e2e). Static SVG — no
 * motion, nothing to reduce. Invalid color roles throw at render, never
 * "best-effort" paint.
 */
export declare const GenerativeCover: React.ForwardRefExoticComponent<GenerativeCoverProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=GenerativeCover.d.ts.map