/**
 * The spine of the **V4 onboarding line** (web) — the twin of
 * `native/onboarding/internal/flow-v4.tsx`, at prop parity with it.
 *
 * Same reasoning as the native file: `ONBOARDING-DESIGN-SPEC.md` §1 draws one
 * anatomy, the 0.9.0 pass wrote that anatomy out inside each screen, and eight
 * copies of a rule are eight chances to get it wrong. Here it is once.
 *
 * Where the two platforms differ, they differ the way the rest of the kit
 * already does: the tints are `color-mix()` over the `--xen-*` custom
 * properties rather than hex arithmetic (so they follow `[data-theme="dark"]`
 * with no dark rule of their own), navigation is `onClick`, and the entrance is
 * a keyframe injected once instead of an `Animated.Value`.
 *
 * Nothing here is exported from the package.
 */
import * as React from 'react';
import type { IconName } from '../../primitives/icon-names';
/**
 * The page ground an app's funnel paints on. See the native twin for the full
 * reasoning; in short, it is the knob that lets two apps on one seed ship
 * funnels that do not look like the same app, and it is deliberately a
 * *ground* rather than a layout.
 */
export type OnboardingGroundV4 = 'plain' | 'tinted' | 'brand';
/** Which brand slot the hero tint, the badges and the bars answer in. */
export type OnboardingAccentV4 = 'primary' | 'accent';
/** The props every full-screen V4 in this module accepts, on top of its base. */
export interface OnboardingFlowV4Props {
    /** Page ground. Default `'plain'` — today's rendering. */
    ground?: OnboardingGroundV4;
    /** Brand slot for tints, badges and progress. Default `'primary'`. */
    accent?: OnboardingAccentV4;
}
/** One link in the legal row. */
export interface FlowLegalLink {
    id: string;
    label: string;
}
/** The local custom properties a screen's subtree reads its fills from. */
export interface FlowGroundVars extends React.CSSProperties {
    '--flow-page': string;
    '--flow-hero': string;
    '--flow-on-hero': string;
    '--flow-badge': string;
    '--flow-fill': string;
    '--flow-on-fill': string;
    '--flow-ink': string;
}
/**
 * Resolve a screen's grounds as CSS custom properties on its root.
 *
 * `color-mix()` over the semantic variables rather than a `--xen-primary-50`
 * ramp step, for the same reason the native twin mixes rather than ramps: the
 * ramps carry the light orientation, so `primary-50` is a near-white panel on
 * a dark page. A mix of `surface` and `primary` is correct in both schemes
 * with no dark rule, because both sides of the mix have already inverted.
 */
export declare function flowGroundVars(ground?: OnboardingGroundV4, accent?: OnboardingAccentV4): FlowGroundVars;
/** The `<style>` id the line's entrance shares. Injection is idempotent. */
export declare const FLOW_V4_STYLE_ID = "xen-v4-onboarding-flow";
/** How far apart the body's regions arrive, in ms (brief §8). */
export declare const FLOW_STAGGER = 60;
/**
 * The line's one entrance: a short fade-and-rise on the M3 `enter` duration.
 *
 * `prefers-reduced-motion` removes it entirely rather than shortening it — a
 * user who asked for less motion asked for less motion, not for the same
 * motion hurried. The rule sets the final state so nothing is left invisible.
 */
export declare const FLOW_V4_CSS: string;
/**
 * How many regions the entrance staggers before every later one arrives at
 * once. Three is where a stagger stops reading as choreography and starts
 * reading as a slow screen.
 */
export declare const FLOW_STAGGER_CAP = 3;
/** Mark a subtree as one staggered region of the entrance. */
export declare function flowRegion(index: number): {
    'data-xen-flow-region': string;
    style: React.CSSProperties;
};
export interface FlowHeaderV4Props {
    /** Back affordance. Omitted on the first screen — a dead chevron is worse. */
    onBack?: () => void;
    /** Dismiss affordance. Omitted in a flow the user may not escape. */
    onDismiss?: () => void;
    /** The progress indicator, already built by the screen (usually bars). */
    progress?: React.ReactNode;
}
/**
 * The header row from §1: back · progress · dismiss, each optional, each a
 * 44×44 tap target, with **spacers** where a control is absent so the progress
 * bars do not shift the moment one appears.
 *
 * Renders nothing when all three slots are empty (§10.6).
 */
export declare function FlowHeaderV4({ onBack, onDismiss, progress, }: FlowHeaderV4Props): React.ReactElement | null;
export interface FlowHeroV4Props {
    /** The app's artwork. The kit ships none and must not (§3). */
    illustration?: React.ReactNode;
    /** Fallback medallion glyph, promoted to hero size when artwork is absent. */
    logoGlyph?: string;
    /** `false` drops the panel — for a sheet or a short form. */
    show?: boolean;
}
/**
 * The hero slot (§3): a tinted 4:3 panel capped at 38% of the viewport,
 * holding the caller's artwork — or, when there is none, the brand medallion
 * at hero size. **Never empty space.**
 */
export declare function FlowHeroV4({ illustration, logoGlyph, show, }: FlowHeroV4Props): React.ReactElement | null;
export interface FlowHeadlineV4Props {
    title: string;
    subtitle?: string;
    /** `'left'` only in an explicit sheet presentation (§4). Default `'center'`. */
    align?: 'center' | 'left';
}
/**
 * The headline block (§4): `2xl` bold over a muted value line held to a
 * readable measure.
 *
 * The subhead takes `muted-text`, not `muted`. `muted` is a ramp step with no
 * contrast promise against `surface`, and it is the token every 0.9.0 screen
 * reached for.
 */
export declare function FlowHeadlineV4({ title, subtitle, align, }: FlowHeadlineV4Props): React.ReactElement | null;
export interface FlowLinkV4Props {
    label: string;
    onClick?: () => void;
    /** `'secondary'` is the declined choice; `'tertiary'` the required-but-quiet one. */
    emphasis?: 'secondary' | 'tertiary';
    disabled?: boolean;
}
/**
 * A footer text link.
 *
 * **Underlined**, which is the whole point. §31 asks for familiar
 * interactions, and a centred un-underlined label under a filled button is
 * indistinguishable from a caption — the 0.9.0 footers rendered "No thanks,
 * start my free trial" as muted text and users read it as fine print.
 */
export declare function FlowLinkV4({ label, onClick, emphasis, disabled, }: FlowLinkV4Props): React.ReactElement | null;
export interface FlowFooterV4Props {
    /** The CTA — normally a `GetStartedButtonV4`. */
    children?: React.ReactNode;
    /** Reassurance line above the CTA (brief §4.1). */
    reassurance?: string;
    /** Its glyph. Default `success` — monochrome, so it actually takes the tint. */
    reassuranceIcon?: IconName;
    /** The declined choice, under the CTA, underlined. */
    secondaryLabel?: string;
    onSecondary?: () => void;
    /** The required-but-quiet action — "Restore Purchases". */
    tertiaryLabel?: string;
    onTertiary?: () => void;
    /** Terms · Privacy, inline, separated by a middot. */
    legalLinks?: FlowLegalLink[];
    onLegalLinkClick?: (id: string) => void;
    /** Fine print above the reassurance line — store billing terms, usually. */
    footnote?: string;
    /** Pay the bottom safe-area inset. Default `true`. */
    safeArea?: boolean;
    className?: string;
}
/**
 * The footer stack from brief §4, in a fixed order so it cannot drift between
 * screens: footnote · reassurance · CTA · secondary · tertiary · legal.
 *
 * Built on `AuthStickyFooterV4`, which already pins the band and pays the
 * inset. Renders nothing when every slot is empty.
 */
export declare function FlowFooterV4({ children, reassurance, reassuranceIcon, secondaryLabel, onSecondary, tertiaryLabel, onTertiary, legalLinks, onLegalLinkClick, footnote, safeArea, className, }: FlowFooterV4Props): React.ReactElement | null;
export interface FlowScreenV4Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Page ground. */
    ground?: OnboardingGroundV4;
    /** Brand slot. */
    accent?: OnboardingAccentV4;
    /** The fixed header. */
    header?: React.ReactNode;
    /** The scrolling body. */
    children?: React.ReactNode;
    /** The pinned footer. */
    footer?: React.ReactNode;
    /** Centre a short body in the leftover space. Default `true`. */
    center?: boolean;
}
/**
 * The scroll/pin shell (brief §3) — the structural fix of this whole pass.
 *
 * Every 0.9.0 screen laid its body out as one flex column and centred it. That
 * is correct for a welcome screen and broken for a paywall: four feature rows
 * plus a plan card plus fine print does not fit a small viewport, and the
 * overflow was simply not reachable.
 *
 * `min-h-0` on the scrolling child is the part that is easy to get wrong: a
 * flex item defaults to `min-height: auto`, so without it the body grows to
 * its content and the page scrolls instead of the region — which un-pins the
 * footer.
 */
export declare const FlowScreenV4: React.ForwardRefExoticComponent<FlowScreenV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=flow-v4.d.ts.map