import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';

export interface AgentProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Agent's full name (the headline). */
  name: string;
  /** Role line under the name (e.g. "Listing Agent"). */
  title?: string;
  /** Brokerage / agency name. */
  agency?: string;
  /** Avatar photo URL. Omit for a token-styled monogram fallback. */
  photoUrl?: string;
  /** Average rating, 0–5, rendered as stars. Omit to hide the rating row. */
  rating?: number;
  /** Headline stats as frosted tiles (e.g. sales, years, reviews). */
  stats?: readonly { label: string; value: string }[];
  /** Shows a verified check next to the name when true. */
  verified?: boolean;
  /** Fires on the primary Call CTA. Hidden when unset. */
  onCall?: () => void;
  /** Fires on the Message CTA. Hidden when unset. */
  onMessage?: () => void;
}

function stars(rating: number): string {
  const clamped = Math.max(0, Math.min(5, rating));
  const full = Math.round(clamped);
  return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
}

/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line (web parity of the native twin). The avatar (photo or token
 * monogram), near-white name + agency, an optional star rating, and headline
 * stats as frosted tiles sit on the brand gradient (`from-primary-500
 * to-primary-700`); near-white Call / Message CTAs anchor the bottom.
 * Presentational — shaped data + callbacks, nothing fetches. Token-only colors
 * (`--xen-*` classes + gradient utilities), dark-mode safe.
 */
export const AgentProfileHeader = React.forwardRef<HTMLDivElement, AgentProfileHeaderProps>(
  function AgentProfileHeader(
    { name, title, agency, photoUrl, rating, stats, verified = false, onCall, onMessage, className, ...rest },
    ref
  ) {
    const monogram = name.trim().charAt(0).toUpperCase() || '?';

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="h-16 w-16 flex-shrink-0 rounded-full border border-primary-50/30 object-cover"
            />
          ) : (
            <span
              role="img"
              aria-label={name}
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-2xl font-extrabold text-primary-50"
            >
              {monogram}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-[var(--xen-space-xs)]">
              <p className="truncate text-xl font-extrabold text-primary-50">{name}</p>
              {verified ? (
                <span role="img" aria-label="Verified">
                  <Icon glyph="✓" size="sm" color="onPrimary" aria-hidden="true" />
                </span>
              ) : null}
            </div>
            {title ? <p className="truncate text-sm font-semibold text-primary-100">{title}</p> : null}
            {agency ? <p className="truncate text-sm text-primary-100">{agency}</p> : null}
            {typeof rating === 'number' ? (
              <p
                aria-label={`Rated ${Math.max(0, Math.min(5, rating)).toFixed(1)} out of 5`}
                className="mt-0.5 text-sm font-semibold text-primary-50"
              >
                <span aria-hidden="true">{stars(rating)}</span>{' '}
                {Math.max(0, Math.min(5, rating)).toFixed(1)}
              </p>
            ) : null}
          </div>
        </div>

        {stats && stats.length > 0 ? (
          <div className="grid grid-cols-3 gap-[var(--xen-space-sm)]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-md)] text-center"
              >
                <span className="text-lg font-extrabold text-primary-50">{s.value}</span>
                <span className="text-xs font-semibold text-primary-100">{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {onCall || onMessage ? (
          <div className="flex flex-col gap-[var(--xen-space-sm)] sm:flex-row">
            {onCall ? (
              <button
                type="button"
                aria-label={`Call ${name}`}
                onClick={onCall}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
              >
                <span aria-hidden="true">📞</span> Call
              </button>
            ) : null}
            {onMessage ? (
              <button
                type="button"
                aria-label={`Message ${name}`}
                onClick={onMessage}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
              >
                <span aria-hidden="true">💬</span> Message
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
