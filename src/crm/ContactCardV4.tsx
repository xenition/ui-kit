import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TagV4 } from '../primitives/TagV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { PLACEHOLDER_CLASS, spokenLine } from './internal/crm-v4';
import type { ContactCardProps } from './ContactCard';

export interface ContactCardV4Props extends ContactCardProps {
  /** Announced while the skeleton is up. Default `'Loading contact'`. */
  loadingLabel?: string;
}

/**
 * **V4 contact card** — the web twin of the native `ContactCardV4`, same props
 * as {@link ContactCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **Tapping "Call" no longer opens the contact as well.** This is the
 *    module's headline defect. The quick-action pills were real `<Button>`s
 *    sitting *inside* a root that `activate()` had turned into a
 *    `role="button"` with its own handler, and nothing stopped the event — so
 *    one tap dialled *and* navigated. The sibling `QuoteCard` guarded the
 *    identical nesting with `stopPropagation`, so the hazard was known; this
 *    card never got the guard, and native never had the bug at all because its
 *    inner `Pressable` consumed the touch. Same props, two behaviours.
 *
 *    The fix is structural rather than another `stopPropagation`: the card's
 *    own activation is a real `<button>` around **only the identity region**,
 *    and the pills are that button's **siblings**. A quick action does one
 *    thing, and the invalid nesting — interactive content inside
 *    `role="button"` — goes away with it.
 * 2. **`compact` actually densifies.** `padding` was passed on native only, so
 *    the web card dropped its tags and actions and kept its full `lg` inset.
 * 3. **One accessible name.** `Contact Ada` replaced the subtree, so the role
 *    and the company were never announced. Both join the name.
 * 4. **The skeleton is the shared placeholder**, not `bg-neutral-100` — a ramp
 *    step, and therefore a pale plate punched into a dark page — and the
 *    loading card is never clickable.
 * 5. **A press is a state layer**, and the pills and tags are drawn the same
 *    way on both twins: `soft` pills, `size="sm"` tags.
 */
export const ContactCardV4 = React.forwardRef<HTMLDivElement, ContactCardV4Props>(
  function ContactCardV4(
    {
      name,
      title,
      company,
      avatarUrl,
      tags,
      actions,
      variant = 'default',
      loading = false,
      loadingLabel = 'Loading contact',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // A card with nobody on it is the blank bordered box the line rules out.
    if (!name) return null;

    const compact = variant === 'compact';
    const hasTags = !compact && Array.isArray(tags) && tags.length > 0;
    const hasActions = !compact && Array.isArray(actions) && actions.length > 0;
    const interactive = onClick != null && !loading;
    const subtitle = [title, company].filter(Boolean).join(' · ');

    const identity = (
      <>
        <AvatarV4 size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} alt="" />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="truncate font-bold text-on-surface">{name}</span>
          {subtitle ? <span className="truncate text-sm text-muted-text">{subtitle}</span> : null}
        </span>
      </>
    );

    return (
      <Card
        ref={ref}
        // `padding` reaches the card on this twin too, so `compact` is a
        // density and not just a content cut.
        padding={compact ? 'md' : undefined}
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {loading ? (
          <div
            role="status"
            aria-live="polite"
            aria-label={loadingLabel}
            className="flex items-center gap-sm"
          >
            {/*
              The radius rides on `style` rather than a class: `cn()` is a
              plain join with no tailwind-merge behind it, so a second
              `rounded-[…]` utility next to the placeholder's own would let
              stylesheet order pick the winner.
            */}
            <div
              style={{ borderRadius: 'var(--xen-radius-full)' }}
              className={cn('h-2xl w-2xl shrink-0', PLACEHOLDER_CLASS)}
            />
            <div className="flex flex-1 flex-col gap-xs">
              <div className={cn('h-md w-[60%]', PLACEHOLDER_CLASS)} />
              <div className={cn('h-sm w-[40%]', PLACEHOLDER_CLASS)} />
            </div>
          </div>
        ) : (
          <>
            {interactive ? (
              <button
                type="button"
                aria-label={spokenLine([name, title, company])}
                onClick={onClick}
                data-xen-v4-state=""
                style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
                className={cn(
                  'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] text-left',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  MIN_TAP_CLASS
                )}
              >
                {identity}
              </button>
            ) : (
              <div className="flex items-center gap-sm">{identity}</div>
            )}

            {hasTags ? (
              <div className="flex flex-wrap gap-xs">
                {tags!.map((t, i) => (
                  <TagV4 key={`${t}-${i}`} tone="neutral" size="sm">
                    {t}
                  </TagV4>
                ))}
              </div>
            ) : null}

            {/*
              Siblings of the card's own button, never descendants of it. That
              is the whole fix: there is no ancestor handler left to fire, so a
              pill needs no `stopPropagation` to do one thing.
            */}
            {hasActions ? (
              <div className="flex flex-wrap gap-xs">
                {actions!.map((a) => (
                  <ButtonV4
                    key={a.key}
                    variant="soft"
                    size="sm"
                    aria-label={a.label}
                    onClick={a.onClick}
                    className={MIN_TAP_CLASS}
                  >
                    <span aria-hidden="true">{a.glyph}</span>
                    <span className="ml-xs">{a.label}</span>
                  </ButtonV4>
                ))}
              </div>
            ) : null}
          </>
        )}
      </Card>
    );
  }
);
