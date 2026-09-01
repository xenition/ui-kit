import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

/** Visual tone for the security/status pill. */
export type HomeStatusTone = 'success' | 'warn' | 'danger';

export interface HomeHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The home's display name — the hero headline (e.g. "Willow House"). */
  homeName: string;
  /** Optional time-of-day greeting above the name (e.g. "Good evening"). */
  greeting?: string;
  /** Optional at-a-glance security/status label (e.g. "All secure"). */
  statusLabel?: string;
  /** Semantic tone for the status pill; meaning is never carried by color alone. Default `'success'`. */
  statusTone?: HomeStatusTone;
  /** Optional weather glance shown as a frosted tile. */
  weather?: {
    /** Temperature string, already formatted (e.g. "72°"). */
    temp: string;
    /** Optional emoji/glyph for the condition (e.g. "☀️"). */
    glyph?: string;
    /** Optional condition label (e.g. "Clear"). */
    condition?: string;
  };
  /** Optional at-a-glance metrics rendered as frosted tiles (e.g. "Devices on 4"). */
  metrics?: readonly { label: string; value: string }[];
  /** Optional quick-scene chips (e.g. "Movie", "Away"). */
  scenes?: readonly { id: string; label: string; glyph?: string }[];
  /** Fires with the scene `id` when a quick-scene chip is activated. */
  onScene?: (id: string) => void;
}

const TONE_GLYPH: Record<HomeStatusTone, string> = {
  success: '🛡️',
  warn: '⚠️',
  danger: '🚨',
};

/**
 * HomeHeader — the smart-home dashboard **hero** and the module's peak moment
 * (web parity of the native twin). A brand-gradient ground carries a near-white
 * greeting + home name, a frosted security/status pill (tone + glyph, never
 * color alone), a weather glance and a run of metric tiles, then an optional row
 * of quick-scene chips. Every color derives from the brand ramp — the gradient
 * is `from-primary-500 to-primary-700`, ink is `text-primary-50/100`, and the
 * frosted tiles are `bg-primary-50/15` with a `border-primary-50/30` hairline —
 * token-only, no literals, light + dark. Presentational: shaped data +
 * callbacks, nothing fetches.
 */
export const HomeHeader = React.forwardRef<HTMLDivElement, HomeHeaderProps>(function HomeHeader(
  { homeName, greeting, statusLabel, statusTone = 'success', weather, metrics, scenes, onScene, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] overflow-hidden',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <div className="min-w-0 flex-1">
          {greeting ? (
            <p className="truncate text-sm font-semibold text-primary-100">{greeting}</p>
          ) : null}
          <p className="truncate text-3xl font-extrabold tracking-tight text-primary-50">{homeName}</p>
        </div>
        {statusLabel ? (
          <span
            role="status"
            className="inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]"
          >
            <Icon glyph={TONE_GLYPH[statusTone]} size="sm" aria-hidden />
            <span className="text-sm font-semibold text-primary-50">{statusLabel}</span>
          </span>
        ) : null}
      </div>

      {weather || (metrics && metrics.length > 0) ? (
        <div className="mt-[var(--xen-space-lg)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {weather ? (
            <div className="flex min-w-[112px] flex-1 items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
              {weather.glyph ? (
                <Icon glyph={weather.glyph} size="xl" aria-hidden />
              ) : null}
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-primary-50">{weather.temp}</p>
                {weather.condition ? (
                  <p className="truncate text-xs text-primary-100">{weather.condition}</p>
                ) : null}
              </div>
            </div>
          ) : null}
          {(metrics ?? []).map((m) => (
            <div
              key={m.label}
              className="flex min-w-[112px] flex-1 flex-col justify-center rounded-[var(--xen-radius-md)] bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]"
            >
              <p className="truncate text-lg font-bold text-primary-50">{m.value}</p>
              <p className="truncate text-xs text-primary-100">{m.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      {scenes && scenes.length > 0 ? (
        <div className="mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-sm)]">
          {scenes.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.label}
              onClick={() => onScene?.(s.id)}
              className="inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
            >
              {s.glyph ? <Icon glyph={s.glyph} size="sm" aria-hidden /> : null}
              {s.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
});
