import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { FamilyMemberRowProps, FamilyRole } from './FamilyMemberRow';
import { captionLine, FOCUS_RING_CLASS, spokenLine, type IdentityTone } from './internal/tone-v4';

export interface FamilyMemberRowV4Props extends FamilyMemberRowProps {
  /** Replace the seven role words. They were hard-coded English. */
  roleLabels?: Partial<Record<FamilyRole, string>>;
  /** The word for a member who is present. Default `'Online'`. */
  onlineLabel?: string;
  /** The word for a member who is not. Default `'Offline'`. */
  offlineLabel?: string;
}

/**
 * Default word and chip tone per role.
 *
 * Every tone here is identity — the two brand slots and neutral. `caregiver`
 * was `success` on both twins, which said a paid carer is *good news* in the
 * same vocabulary the kit uses to say a payment cleared. A family role is who
 * somebody is.
 *
 * `child` and `sibling` are `accent` on both twins now; the web file had them
 * flattened onto `primary` by a comment claiming the web `Badge` has no
 * `accent` tone, which stopped being true some time ago.
 */
const ROLE_META_V4: Record<FamilyRole, { label: string; tone: IdentityTone }> = {
  parent: { label: 'Parent', tone: 'primary' },
  guardian: { label: 'Guardian', tone: 'primary' },
  child: { label: 'Child', tone: 'accent' },
  sibling: { label: 'Sibling', tone: 'accent' },
  grandparent: { label: 'Grandparent', tone: 'neutral' },
  caregiver: { label: 'Caregiver', tone: 'neutral' },
  other: { label: 'Family', tone: 'neutral' },
};

/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Six changes
 *
 * 1. **A family role is not a status.** `caregiver → success` spent the kit's
 *    "this went well" colour on who somebody is. Every role now takes an
 *    identity tone — the two brand slots or neutral — and carries its word.
 * 2. **`child` and `sibling` are `accent` again**, matching the native twin.
 *    A comment in this file said the web `Badge` had no `accent` tone; it has
 *    had one for a while, and the note had quietly flattened two roles onto
 *    `primary` on one platform only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore. The
 *    name now belongs to a real `<button>`, and a static row is read from its
 *    visible text.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a family roster, a settings list and a conversation list
 *    are visibly one product. Press is that state layer, not
 *    `hover:bg-neutral-50`, which paints a near-white slab on a dark page.
 * 6. **Presence is the avatar's own dot plus a word.** It was a hand-drawn
 *    `bg-neutral-300` circle — a ramp step that inverts under
 *    `[data-theme="dark"]` — beside text the row's name already carried.
 */
export const FamilyMemberRowV4 = React.forwardRef<HTMLDivElement, FamilyMemberRowV4Props>(
  function FamilyMemberRowV4(
    {
      name,
      role = 'other',
      photoUrl,
      relationLabel,
      online,
      roleLabels,
      onlineLabel = 'Online',
      offlineLabel = 'Offline',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!name) return null;

    const meta = ROLE_META_V4[role];
    const roleWord = roleLabels?.[role] ?? meta.label;
    const presence = online === undefined ? undefined : online ? onlineLabel : offlineLabel;
    const caption = captionLine([relationLabel, presence]);
    const label = spokenLine([name, roleWord, relationLabel, presence]);

    const body = (
      <>
        <span className={ROW_V4_LEADING_CLASS}>
          <AvatarV4
            size="md"
            src={photoUrl}
            name={name}
            alt=""
            status={online === undefined ? undefined : online ? 'online' : 'offline'}
          />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{name}</span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {roleWord}
          </BadgeV4>
        </span>
      </>
    );

    const shell = cn(
      ROW_V4_BASE_CLASS,
      rowHeightClass(caption !== ''),
      rowGroundClass(false),
      className
    );

    if (!onClick) {
      return (
        <div {...rest} ref={ref} data-xen-family-member-row="" className={shell}>
          {body}
        </div>
      );
    }

    return (
      <button
        // Spread first: the base spread `{...rest}` after `onClick`, so a
        // caller's handler silently replaced the row's own.
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        ref={ref as unknown as React.Ref<HTMLButtonElement>}
        type="button"
        data-xen-family-member-row=""
        aria-label={label}
        onClick={() => onClick()}
        data-xen-v4-row=""
        data-interactive="true"
        data-xen-v4-state=""
        style={rowStateVars()}
        className={cn(shell, FOCUS_RING_CLASS)}
      >
        {body}
      </button>
    );
  }
);
