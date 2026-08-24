import * as React from 'react';
/** Advisory category. Drives the default glyph. */
export type AdvisoryKind = 'frost' | 'heat' | 'rain' | 'wind' | 'drought' | 'storm' | 'general';
/** Advisory severity — colors the banner and is stated as a text chip. */
export type AdvisorySeverity = 'info' | 'watch' | 'warning' | 'severe';
export interface WeatherAdvisoryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Advisory headline (e.g. "Frost expected overnight"). */
    title: string;
    /** Supporting detail (e.g. "Lows near -2°C, 03:00–07:00"). */
    message?: string;
    /** Category. Default `'general'` — selects the leading glyph. */
    kind?: AdvisoryKind;
    /** Severity. Default `'info'` — colors the banner + text chip. */
    severity?: AdvisorySeverity;
    /** Valid-window / timing hint (e.g. "Tonight → 7am"). */
    timeframe?: string;
    /** Override the leading glyph/emoji. */
    icon?: string;
}
/**
 * A weather advisory banner — a token-tinted, accent-barred callout carrying a
 * category glyph, headline, optional message + timeframe, and a severity
 * {@link Badge}. Severity drives the accent color, but the text chip states it
 * too, so the alert never relies on color alone. Announced to assistive tech
 * via `role="alert"`. The tint and left edge come from token classes
 * (`bg-neutral-50` + `border-<tone>`) — no literal colors.
 */
export declare const WeatherAdvisory: React.ForwardRefExoticComponent<WeatherAdvisoryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherAdvisory.d.ts.map