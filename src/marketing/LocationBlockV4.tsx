import * as React from 'react';
import { cn } from '../primitives/cn';
import type { LocationBlockProps } from './LocationBlock';

/** Drop-in for {@link LocationBlockProps} — same props, the V4 "showcase" design. */
export type LocationBlockV4Props = LocationBlockProps;

/**
 * LocationBlock — **V4** "showcase" design (web parity of the native V4). An
 * elevated contact card: the venue `name`, an `<address>`, an opening-`hours`
 * list and `phone`/`email` links sit in a clean surface card beside the map.
 * When `mapSrc` is present it embeds the interactive map `<iframe>`; otherwise
 * the map slot is a **soft-primary well** placeholder carrying the address and
 * an optional `directionsUrl`. NOT a brand-gradient surface — refined and
 * elevated (`rounded-lg border border-border bg-surface shadow-sm`). Same
 * props/behavior as {@link LocationBlockProps}; every color is a `--xen-*`
 * token — no literals.
 */
export const LocationBlockV4 = React.forwardRef<HTMLElement, LocationBlockV4Props>(
  function LocationBlockV4(
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
          'grid grid-cols-1 gap-[var(--xen-space-xl)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm',
          'p-[var(--xen-space-lg)] lg:grid-cols-2',
          className
        )}
        {...rest}
      >
        <div className="flex flex-col gap-[var(--xen-space-md)]">
          {name ? (
            <h2 className="font-heading text-2xl font-extrabold leading-tight tracking-tight text-on-surface">
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
                      className="py-[var(--xen-space-sm)] pr-[var(--xen-space-md)] text-left font-semibold text-on-surface"
                    >
                      {row.label}
                    </th>
                    <td className="py-[var(--xen-space-sm)] text-right tabular-nums text-muted">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {phone || email ? (
            <ul className="flex flex-col gap-[var(--xen-space-xs)] text-sm">
              {phone ? (
                <li>
                  <a href={`tel:${phone}`} className="font-medium text-primary hover:underline">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
            </ul>
          ) : null}
        </div>

        <div className="aspect-video overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-primary-50">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              title={mapTitle}
              loading="lazy"
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-[var(--xen-space-sm)] p-[var(--xen-space-md)] text-center text-muted">
              <span className="text-sm">{address}</span>
              {directionsUrl ? (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
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
