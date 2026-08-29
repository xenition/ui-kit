import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Text } from '../primitives/Text';
import { GetStartedButton } from './GetStartedButton';

/*
  Geometry, not theme. ONBOARDING-DESIGN-SPEC §10 allows exactly these bare
  numbers: 44 (`h-11`) — the minimum tap target for a header control or a text
  link (§7) and the diameter of a feature-row badge (§8) — and the medallion
  diameters below. Every colour, radius, gap and font size here is a token class.
*/
const TAP_TARGET_CLASS = 'min-h-11';
/** The card form's medallion — unchanged from the original screen. */
const MEDALLION_CLASS = 'h-[72px] w-[72px]';
/** The full-screen form's medallion, sized to fill the hero panel (§3). */
const HERO_MEDALLION_CLASS = 'h-[88px] w-[88px]';

export type PermissionKind =
  | 'notifications'
  | 'location'
  | 'camera'
  | 'microphone'
  | 'photos'
  | 'contacts'
  | 'generic';

/**
 * Where the pre-prompt is in its lifecycle.
 *
 * Deliberately **not** extended with an `'unavailable'` member: nothing in this
 * component would render differently for a permission the device cannot offer
 * that `'denied'` plus a `deniedMessage` does not already cover, and inventing a
 * state the hosts do not produce is how an enum grows a member nobody sets. If a
 * host ever needs to distinguish "the browser said no" from "this device has no
 * camera", that is a real product decision and belongs in a separate change.
 */
export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied';

/** One "here is what you get" row under the rationale (§1/§8). */
export interface PermissionBenefit {
  /** Stable key for list rendering. */
  id: string;
  /** Row title — an outcome, not the permission's name. */
  title: string;
  /** Optional supporting line. */
  description?: string;
  /** Optional leading glyph for the row's badge. */
  icon?: string;
}

export interface PermissionPromptProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Which OS permission this pre-prompt is priming. Sets the default glyph. */
  kind?: PermissionKind;
  /** Explicit glyph override for the medallion. */
  icon?: string;
  /** Outcome-oriented headline (e.g. `'Never miss a reply'`). */
  title: string;
  /**
   * The "why" shown before the OS dialog — the explain half of explain-then-ask
   * (design.md §17). Say what the user gets, not what you access.
   */
  rationale: string;
  /** Allow-button copy. Default `'Allow'`. */
  allowLabel?: string;
  /** Decline-link copy. Default `'Not now'`. */
  denyLabel?: string;
  /** Fires when the user opts in — the host then triggers the real OS request. */
  onAllow?: () => void;
  /** Fires when the user declines the pre-prompt. */
  onDeny?: () => void;
  /** Drives the button/affordance states. Default `'idle'`. */
  state?: PermissionState;
  /** Message shown in the `denied` state. */
  deniedMessage?: string;
  /**
   * Render as a full onboarding **step screen** — hero slot, headline block,
   * benefit rows, sticky CTA footer (§1) — instead of the inline card. Default
   * `false`, which is the card this component has always been, so existing
   * callers that drop it into a list or a sheet are untouched.
   */
  fullScreen?: boolean;
  /** Hero art for the step (§3). Falls back to the medallion when absent. */
  illustration?: React.ReactNode;
  /** "Here is what you get" rows under the rationale. Empty renders none. */
  benefits?: PermissionBenefit[];
  /**
   * Header progress slot (§1/§2) — pass the segmented bars, e.g.
   * `<ProgressDots variant="bars" count={4} activeIndex={2} />`. Full-screen
   * form only.
   */
  progress?: React.ReactNode;
  /** Renders the header's back control (full-screen form only). */
  onBack?: () => void;
  /** Renders the header's dismiss (✕) control (full-screen form only). */
  onDismiss?: () => void;
  /** Copy for the granted state. Default `"You're all set."`. */
  grantedMessage?: string;
}

const KIND_GLYPH: Record<PermissionKind, string> = {
  notifications: '🔔',
  location: '📍',
  camera: '📷',
  microphone: '🎤',
  photos: '🖼️',
  contacts: '👥',
  generic: '🔒',
};

/**
 * Contextual permission pre-prompt — the in-app "explain, then ask" screen that
 * precedes the real OS/browser dialog so the system prompt only fires once the
 * user has already said yes (design.md §17). **This screen must never trigger a
 * permission dialog on mount**: `onAllow` is what the host hangs the real
 * request on, and it fires only from a deliberate click.
 *
 * Two forms, one set of props. By default it is the inline **card** it has
 * always been — for a settings list, a sheet, a mid-flow nudge. With
 * `fullScreen` it becomes a step screen in the shell from
 * `ONBOARDING-DESIGN-SPEC.md` §1: header (back · progress · dismiss), hero slot,
 * centred headline block, benefit rows, and the sticky CTA footer with the
 * decline link beneath — never beside — the primary action.
 *
 * Reflects `requesting`/`granted`/`denied` (granted replaces the actions with a
 * success line in a polite live region; denied keeps them and adds the recovery
 * hint). Every new prop is optional. No literal colors.
 */
export const PermissionPrompt = React.forwardRef<HTMLDivElement, PermissionPromptProps>(
  function PermissionPrompt(
    {
      kind = 'generic',
      icon,
      title,
      rationale,
      allowLabel = 'Allow',
      denyLabel = 'Not now',
      onAllow,
      onDeny,
      state = 'idle',
      deniedMessage = 'You can enable this later in Settings.',
      fullScreen = false,
      illustration,
      benefits = [],
      progress,
      onBack,
      onDismiss,
      grantedMessage = "You're all set.",
      className,
      ...rest
    },
    ref
  ) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';
    const showHeader = fullScreen && (onBack != null || onDismiss != null || progress != null);

    const medallion = (sizeClass: string): React.ReactElement => (
      <span
        className={cn(
          'flex items-center justify-center rounded-full',
          sizeClass,
          granted ? 'bg-success' : 'bg-primary'
        )}
      >
        <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onPrimary'} />
      </span>
    );

    const headline = (
      <div className="flex flex-col gap-sm">
        <h2>
          <Text size="2xl" weight="bold" tone="onSurface" align="center" numberOfLines={2} className="block">
            {title}
          </Text>
        </h2>
        <Text size="base" tone="muted" align="center" className="block">
          {rationale}
        </Text>
      </div>
    );

    const rows =
      benefits.length > 0 ? (
        <ul className="flex flex-col gap-md">
          {benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-center gap-md text-left">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50">
                <Icon glyph={benefit.icon ?? '✓'} size="base" color="primary" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-xs">
                <Text size="base" weight="semibold" tone="onSurface">
                  {benefit.title}
                </Text>
                {benefit.description ? (
                  <Text size="sm" tone="muted">
                    {benefit.description}
                  </Text>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      ) : null;

    const grantedLine = (
      <p aria-live="polite" className="flex items-center justify-center gap-xs">
        <Icon name="check" size="sm" color="success" />
        <Text size="sm" weight="semibold" tone="successText">
          {grantedMessage}
        </Text>
      </p>
    );

    const actions = (
      <>
        <GetStartedButton label={allowLabel} trailingArrow={false} loading={state === 'requesting'} onClick={onAllow} />
        <button
          type="button"
          aria-label={denyLabel}
          onClick={onDeny}
          className={cn('flex items-center justify-center text-center', TAP_TARGET_CLASS)}
        >
          <Text size="base" weight="medium" tone="muted">
            {denyLabel}
          </Text>
        </button>
        {state === 'denied' ? (
          <p aria-live="polite" className="flex items-center justify-center gap-xs">
            <Icon name="info" size="sm" color="muted" />
            <Text size="sm" tone="muted" align="center">
              {deniedMessage}
            </Text>
          </p>
        ) : null}
      </>
    );

    if (!fullScreen) {
      return (
        <Card ref={ref} className={cn('flex flex-col gap-md text-center', className)} {...rest}>
          <div className="flex justify-center">{medallion(MEDALLION_CLASS)}</div>
          {headline}
          {rows}
          {granted ? grantedLine : <div className="mt-xs flex w-full flex-col gap-sm">{actions}</div>}
        </Card>
      );
    }

    return (
      <div ref={ref} className={cn('flex min-h-full flex-col gap-lg bg-surface', className)} {...rest}>
        {showHeader ? (
          <div className="flex items-center gap-sm">
            {onBack ? (
              <button type="button" aria-label="Back" onClick={onBack} className="flex h-11 w-11 items-center justify-center">
                <Icon name="chevron-left" size="xl" color="onSurface" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
            <div className="flex flex-1 justify-center">{progress}</div>
            {onDismiss ? (
              <button type="button" aria-label="Dismiss" onClick={onDismiss} className="flex h-11 w-11 items-center justify-center">
                <Icon name="close" size="lg" color="muted" />
              </button>
            ) : (
              <span className="h-11 w-11" />
            )}
          </div>
        ) : null}

        <div className="flex aspect-[4/3] max-h-[38vh] items-center justify-center overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50 p-lg">
          {illustration ?? medallion(HERO_MEDALLION_CLASS)}
        </div>

        {headline}
        {rows}

        <div className="mt-auto flex flex-col gap-sm border-t border-border bg-surface pb-lg pt-md">
          {granted ? grantedLine : actions}
        </div>
      </div>
    );
  }
);
