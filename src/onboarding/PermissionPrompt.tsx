import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { GetStartedButton } from './GetStartedButton';

export type PermissionKind =
  | 'notifications'
  | 'location'
  | 'camera'
  | 'microphone'
  | 'photos'
  | 'contacts'
  | 'generic';

export type PermissionState = 'idle' | 'requesting' | 'granted' | 'denied';

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
 * user has already said yes (design.md §17). Renders a rationale, an
 * `Allow`/`Not now` pair, and reflects `requesting`/`granted`/`denied` states
 * (granted shows a success line in a polite live region; denied shows a recovery
 * hint). Colors come from the success and primary tokens. No literal colors.
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
      className,
      ...rest
    },
    ref
  ) {
    const glyph = icon ?? KIND_GLYPH[kind];
    const granted = state === 'granted';

    return (
      <Card ref={ref} className={cn('flex flex-col items-center gap-3 text-center', className)} {...rest}>
        <div
          className={cn(
            'flex h-[72px] w-[72px] items-center justify-center rounded-full',
            granted ? 'bg-success' : 'bg-primary'
          )}
        >
          <Icon glyph={granted ? '✓' : glyph} size="2xl" color={granted ? 'onSuccess' : 'onPrimary'} />
        </div>

        <h2 className="text-xl font-bold text-on-surface">{title}</h2>

        <p className="text-base leading-relaxed text-muted">{rationale}</p>

        {granted ? (
          <p aria-live="polite" className="text-sm font-semibold text-success">
            You're all set.
          </p>
        ) : (
          <div className="mt-1 flex w-full flex-col gap-2">
            <GetStartedButton
              label={allowLabel}
              loading={state === 'requesting'}
              onClick={onAllow}
            />
            <button
              type="button"
              aria-label={denyLabel}
              onClick={onDeny}
              className="py-2 text-center text-base font-medium text-muted"
            >
              {denyLabel}
            </button>
            {state === 'denied' ? (
              <p aria-live="polite" className="text-center text-sm text-muted">
                {deniedMessage}
              </p>
            ) : null}
          </div>
        )}
      </Card>
    );
  }
);
