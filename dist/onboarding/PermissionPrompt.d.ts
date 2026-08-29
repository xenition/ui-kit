import * as React from 'react';
export type PermissionKind = 'notifications' | 'location' | 'camera' | 'microphone' | 'photos' | 'contacts' | 'generic';
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
export interface PermissionPromptProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
export declare const PermissionPrompt: React.ForwardRefExoticComponent<PermissionPromptProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PermissionPrompt.d.ts.map