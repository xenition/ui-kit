import * as React from 'react';
import { cn } from '../primitives/cn';

export interface LocationHour {
  /** Day or range label (e.g. "Mon–Fri"). */
  label: string;
  /** Opening hours (e.g. "9:00–17:00" or "Closed"). */
  value: string;
}

export interface LocationBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Business or venue name. */
  name?: string;
  /** Street address, rendered in an `<address>`. */
  address: string;
  /** Opening-hours rows. */
  hours?: LocationHour[];
  /** Phone number; rendered as a `tel:` link. */
  phone?: string;
  /** Email; rendered as a `mailto:` link. */
  email?: string;
  /** Embed URL for a map `<iframe>`. */
  mapSrc?: string;
  /** External directions link (used by the placeholder and the map caption). */
  directionsUrl?: string;
}

/** Contact/location section — address, hours, and links beside an embedded map. */
export const LocationBlock = React.forwardRef<HTMLElement, LocationBlockProps>(
  function LocationBlock(
    { name, address, hours, phone, email, mapSrc, directionsUrl, className, ...rest },
    ref
  ) {
    const mapTitle = name ? `Map of ${name}` : 'Location map';

    return (
      <section
        ref={ref}
        data-xen-location-block=""
        aria-label={name ? `${name} location and contact` : 'Location and contact'}
        className={cn(
          'grid grid-cols-1 gap-[var(--xen-space-xl)] lg:grid-cols-2',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-md)]">
          {name ? (
            <h2 className="font-heading text-2xl font-bold leading-tight text-on-surface">
              {name}
            </h2>
          ) : null}
          <address className="not-italic leading-relaxed text-muted">{address}</address>

          {hours && hours.length > 0 ? (
            <table className="w-full text-sm">
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {hours.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <th
                      scope="row"
                      className="py-[var(--xen-space-xs)] pr-[var(--xen-space-md)] text-left font-medium text-on-surface"
                    >
                      {row.label}
                    </th>
                    <td className="py-[var(--xen-space-xs)] text-right text-muted">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {phone || email ? (
            <ul className="flex flex-col gap-[var(--xen-space-xs)] text-sm">
              {phone ? (
                <li>
                  <a href={`tel:${phone}`} className="text-primary hover:underline">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="text-primary hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <div className="aspect-video overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-100">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              title={mapTitle}
              loading="lazy"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-[var(--xen-space-sm)] text-muted">
              <span className="text-sm">{address}</span>
              {directionsUrl ? (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Get directions
                </a>
              ) : null}
            </div>
          )}
        </div>
      </section>
    );
  }
);
