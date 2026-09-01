import * as React from 'react';
export interface WeatherDetailItem {
    /** Metric name (e.g. `'Humidity'`). */
    label: string;
    /** The metric value; a string, number, or node. */
    value: React.ReactNode;
    /** Optional unit suffix beside the value (e.g. `'%'`, `'km/h'`). */
    unit?: string;
    /** Optional leading glyph beside the label. */
    glyph?: string;
    /** Optional line beneath the label. */
    caption?: string;
}
export interface WeatherDetailGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The metric rows to render. */
    items: WeatherDetailItem[];
    /** Rows grouped per card. Default `3` (so 6 items → 2 cards). */
    perCard?: number;
}
/**
 * WeatherDetailGrid — weather detail metrics grouped into elevated cards (web
 * parity of the native `WeatherDetailGrid`). Items are chunked `perCard` at a
 * time (default 3) into clean list cards: each row is a gradient glyph badge +
 * label/caption on the left and a big value + unit on the right, separated by
 * hairline dividers. Every color comes from `--xen-*` Tailwind classes
 * (`surface`/`on-surface`/`muted`/`border`), so it adapts to light AND dark. No
 * literal colors.
 */
export declare const WeatherDetailGrid: React.ForwardRefExoticComponent<WeatherDetailGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WeatherDetailGrid.d.ts.map