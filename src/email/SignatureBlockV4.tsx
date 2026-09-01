import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { metaLine } from '../primitives/internal/tone-v4';
import { TONE_INK } from './internal/mail-v4';
import type { SignatureBlockProps, SignatureContactLine } from './SignatureBlock';

export interface SignatureBlockV4Props extends SignatureBlockProps {
  /**
   * Activate a contact line — open the mail client, dial the number, follow
   * the link. Without it the lines are drawn as plain text, because a line
   * that looks like a link and does nothing is worse than a line that does not
   * look like one.
   */
  onContactPress?: (line: SignatureContactLine) => void;
}

/**
 * **V4 signature block** — same props as {@link SignatureBlock} plus
 * `onContactPress`.
 *
 * ## Four changes
 *
 * 1. **A contact line either works or stops pretending to.** Every line was
 *    painted in the brand colour — the universal "this is a link" — with no
 *    `href`, no handler and no handler in the type at all. Clicking an email
 *    address in a signature did nothing, on both twins, forever.
 *    `onContactPress` makes them real buttons that clear 44; without it they
 *    are drawn as the plain text they are.
 * 2. **The brand colour is the `primaryText` slot.** `text-primary` is the
 *    *fill*: the pairing it carries is for ink drawn on top of it, not for a
 *    14px line drawn in it on a white card.
 * 3. **The avatar is pinned to one shape** so the web block and the native
 *    block are the same object — the shape was left to each twin's default.
 * 4. **The rule beside the block stops being a literal.** `border-l-[3px]`
 *    was a typed width in a kit with no typed widths anywhere else.
 */
export const SignatureBlockV4 = React.forwardRef<HTMLDivElement, SignatureBlockV4Props>(
  function SignatureBlockV4(
    { name, title, company, avatarUri, contacts, tagline, onContactPress, className },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const safeContacts = contacts ?? [];
    const roleLine = metaLine([title, company]);

    return (
      <div
        ref={ref}
        className={cn('flex gap-md border-l-2 border-primary py-md pl-md', className)}
      >
        {avatarUri || name ? (
          <AvatarV4 size="lg" shape="circle" src={avatarUri} name={name} alt="" />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="text-base font-bold text-on-surface">{name}</span>
          {roleLine ? <span className={cn('text-sm', TONE_INK.muted)}>{roleLine}</span> : null}
          {safeContacts.length > 0 ? (
            <div className="mt-xs flex flex-col">
              {safeContacts.map((contact) =>
                onContactPress ? (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => onContactPress(contact)}
                    data-xen-v4-state=""
                    style={
                      stateGroundVars(
                        'var(--xen-surface)',
                        'var(--xen-on-surface)'
                      ) as React.CSSProperties
                    }
                    className={cn(
                      'flex items-center gap-xs self-start rounded-[var(--xen-radius-sm)] pr-xs text-left',
                      MIN_TAP_CLASS,
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                    )}
                  >
                    {contact.glyph ? (
                      <span aria-hidden="true" className={cn('text-xs leading-none', TONE_INK.muted)}>
                        {contact.glyph}
                      </span>
                    ) : null}
                    <span className={cn('truncate text-sm font-semibold underline', TONE_INK.primary)}>
                      {contact.value}
                    </span>
                  </button>
                ) : (
                  <div key={contact.id} className="flex items-center gap-xs">
                    {contact.glyph ? (
                      <span aria-hidden="true" className={cn('text-xs leading-none', TONE_INK.muted)}>
                        {contact.glyph}
                      </span>
                    ) : null}
                    {/* Inert, so it is not painted as something that can be pressed. */}
                    <span className="truncate text-sm text-on-surface">{contact.value}</span>
                  </div>
                )
              )}
            </div>
          ) : null}
          {tagline ? <span className={cn('mt-xs text-xs', TONE_INK.muted)}>{tagline}</span> : null}
        </div>
      </div>
    );
  }
);
