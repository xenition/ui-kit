/**
 * Shared plumbing for the **V4 screen-chrome line** on native — `DrawerV4`,
 * `SidebarV4`, `AppShellV4`, `PopconfirmV4`, `ContextMenuV4`, `ToggleGroupV4`,
 * `KanbanV4`, `VirtualListV4`.
 *
 * The mirror of `src/primitives/internal/chrome-v4.ts`. The state layers
 * themselves come from `internal/state-v4` (which reads `theme.state`, M3's
 * scale, verbatim); what lives here is the handful of things a screen frame
 * needs that no existing helper owns:
 *
 * - **an easing off the token scale**, so a chrome transition uses
 *   `theme.motion.easingStandard` rather than `Easing.out(Easing.cubic)`
 *   chosen by hand;
 * - **the disabled opacity**, M3's 0.38, instead of every component's own 0.5;
 * - **the tap target**, composed from the spacing scale once.
 *
 * Nothing here invents a number.
 */

import { Easing, type EasingFunction } from 'react-native';
import type { SpacingScale, StateLayerTokens } from '../../../theme/types';

/** An M3 easing quadruple as a React Native `Easing` function. */
export function easingOf(easing: readonly number[]): EasingFunction {
  return Easing.bezier(
    easing[0] as number,
    easing[1] as number,
    easing[2] as number,
    easing[3] as number
  );
}

/**
 * The opacity a disabled control's content drops to.
 *
 * M3's `disabledContent` — 0.38 — rather than the 0.5 each base component
 * picked for itself. A disabled control keeps its box and loses its ink, so the
 * layout never moves when something becomes unavailable (§36.11).
 */
export function disabledOpacity(state: StateLayerTokens, disabled: boolean | undefined): number {
  return disabled === true ? state.disabledContent : 1;
}

/**
 * The minimum comfortable tap target, composed from the spacing scale rather
 * than remembered as `44`.
 *
 * The same expression `ButtonV4` and the V4 navigation line use, so a nav row,
 * a toggle and a button land on one size instead of three that happen to be
 * close.
 */
export function minTap(spacing: SpacingScale): number {
  return spacing['2xl'] - spacing.xs;
}
