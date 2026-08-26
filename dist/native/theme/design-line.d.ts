import * as React from 'react';
/**
 * Which design line an app renders.
 *
 * The kit ships each screen in several designs as separate exports with
 * identical props — `SignInScreen`, `SignInScreenV2`, `SignInScreenV3`. That
 * is the right shape for the library (a component's props stay honest, and a
 * V2 cannot quietly grow a prop V1 lacks), but it is the wrong shape for an
 * APP: picking a line means editing every import, and "use the newest design"
 * is unexpressible.
 *
 * So the line is chosen once, at the root, and every screen follows:
 *
 * ```tsx
 * <XenitionUIProvider theme={seed} design="latest">
 * ```
 *
 * `'latest'` resolves to the newest line a given component actually has —
 * NOT to a fixed name. A screen with three designs renders its V3; a screen
 * with only a base renders the base. That asymmetry is the whole point: an
 * app should not have to know which components have caught up.
 */
export type DesignLine = 'base' | 'v2' | 'v3' | 'v4' | 'latest';
export interface DesignLineProviderProps {
    design?: DesignLine;
    children?: React.ReactNode;
}
/**
 * Usually mounted for you by `XenitionUIProvider`. Nest it to override the
 * line for one flow — a marketing splash on `'v4'` inside an app that is
 * otherwise `'base'` — without touching the rest.
 */
export declare function DesignLineProvider({ design, children, }: DesignLineProviderProps): React.ReactElement;
/**
 * The app's design line. Defaults to `'base'` rather than `'latest'` on
 * purpose: an app that never opts in must keep rendering exactly what it
 * rendered before, or a kit upgrade silently redesigns someone's product.
 */
export declare function useDesignLine(): DesignLine;
/** The designs a component family actually ships. `base` is required. */
export interface DesignSet<P> {
    base: React.ComponentType<P>;
    v2?: React.ComponentType<P>;
    v3?: React.ComponentType<P>;
    v4?: React.ComponentType<P>;
}
/**
 * Pick a component from its family for the given line.
 *
 * Falls back rather than throwing: asking for `'v4'` from a family that stops
 * at V2 gives you the V2, not a crash and not a blank screen. A missing design
 * is a gap in the kit, and an app should degrade to the nearest thing rather
 * than break because the kit has not caught up.
 */
export declare function resolveDesign<P>(set: DesignSet<P>, line: DesignLine): React.ComponentType<P>;
/**
 * Build one component that follows the app's line.
 *
 * ```tsx
 * export const SignIn = designed({ base: SignInScreen, v2: SignInScreenV2, v3: SignInScreenV3 })
 * // <SignIn /> renders V3 under design="latest", base under design="base"
 * ```
 *
 * The explicit exports stay exported. An app that wants one exact design
 * imports it by name and is unaffected by the provider — which is what a
 * design system that is also a product dependency has to allow.
 */
export declare function designed<P extends object>(set: DesignSet<P>): React.ComponentType<P & {
    design?: DesignLine;
}>;
//# sourceMappingURL=design-line.d.ts.map