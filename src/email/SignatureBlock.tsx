import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';

export interface SignatureContactLine {
  id: string;
  /** Glyph for the line (e.g. '✉️', '📞', '🌐'). */
  glyph?: string;
  /** The value text (email, phone, url). */
  value: string;
}

export interface SignatureBlockProps {
  /** Signer name. */
  name: string;
  /** Job title / role. */
  title?: string;
  /** Company / organisation. */
  company?: string;
  /** Avatar / logo image URL. */
  avatarUri?: string;
  /** Contact lines (email, phone, website…). */
  contacts?: SignatureContactLine[];
  /** Optional freeform tagline under the contacts. */
  tagline?: string;
  className?: string;
}

/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule (token border) anchors it.
 * All colors from token classes. No literal colors.
 */
export const SignatureBlock = React.forwardRef<HTMLDivElement, SignatureBlockProps>(
  function SignatureBlock({ name, title, company, avatarUri, contacts, tagline, className }, ref) {
    const safeContacts = contacts ?? [];
    const roleLine = [title, company].filter(Boolean).join(' · ');

    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-[var(--xen-space-md)] border-l-[3px] border-primary py-[var(--xen-space-md)] pl-[var(--xen-space-md)]',
          className
        )}
      >
        {avatarUri || name ? <Avatar size="lg" src={avatarUri} name={name} /> : null}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">{name}</span>
          {roleLine ? <span className="text-sm text-muted">{roleLine}</span> : null}
          {safeContacts.length > 0 ? (
            <div className="mt-[var(--xen-space-xs)] flex flex-col gap-0.5">
              {safeContacts.map((c) => (
                <div key={c.id} className="flex items-center gap-[var(--xen-space-xs)]">
                  {c.glyph ? <Icon glyph={c.glyph} size="xs" color="muted" /> : null}
                  <span className="text-sm text-primary">{c.value}</span>
                </div>
              ))}
            </div>
          ) : null}
          {tagline ? <span className="mt-[var(--xen-space-xs)] text-xs text-muted">{tagline}</span> : null}
        </div>
      </div>
    );
  }
);
