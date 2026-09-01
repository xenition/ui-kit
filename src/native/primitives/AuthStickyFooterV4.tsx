import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useXenitionTheme } from '../theme';
import { AuthSwitchFooterV4 } from './AuthSwitchFooterV4';
import type { AuthStickyFooterProps } from './AuthCard';

export interface AuthStickyFooterV4Props extends AuthStickyFooterProps {
  /**
   * §5's secondary action — "No thanks", "Back". Rendered **below** the CTA as
   * a centred, muted text link, never beside it.
   */
  secondaryLabel?: string;
  /** Fires when the secondary link is pressed. */
  onSecondaryPress?: () => void;
  /** Freezes the secondary link. The CTA's own disabled state is its own. */
  secondaryDisabled?: boolean;
  /**
   * Pad the band by the device's bottom safe-area inset. Default `true` — §5
   * says the footer sits *above* the inset.
   *
   * Turn it off only when an ancestor has already consumed the inset (a
   * `SafeAreaView`, a `BottomSheetV4`); paying for it twice leaves a visible
   * gap under the CTA.
   */
  safeArea?: boolean;
}

/**
 * **V4 auth sticky footer** — the native twin of the web `AuthStickyFooterV4`,
 * the base's props plus the §5 secondary action and safe-area handling.
 *
 * §5's anatomy exactly: a hairline `border` divider on top and an opaque
 * `surface` behind it, pinned under the scrolling content so the page passes
 * **under** the action rather than colliding with it.
 *
 * ## What V4 changes
 *
 * **It clears the home indicator.** §5 says "above the safe-area inset" and the
 * base read no inset at all, so on a notched phone the CTA sat under the home
 * indicator — the one bug that tells a user this screen was not built for their
 * device. The band pays `spacing.lg` *plus* `insets.bottom`, via
 * `useSafeAreaInsets()`, which is how every other edge-anchored V4 component
 * here does it (`BottomNavV4`, `BottomSheetV4`, `FloatButtonV4`). Needs a
 * `SafeAreaProvider` above it, which Expo mounts by default.
 *
 * **The secondary action has a place.** §5: a secondary action goes below the
 * CTA as a centred muted text link, "never beside it competing for the same
 * weight". The base exposed only `children`, so where the "No thanks" landed
 * was up to whoever assembled the screen. `secondaryLabel` puts it under the
 * CTA by construction, drawn by `AuthSwitchFooterV4` at `tone="muted"` rather
 * than hand-rolled here (§10.5) — the two footer lines are one anatomy at two
 * volumes, so the tap target, the press layer and the disabled opacity are the
 * same object in both.
 *
 * **No shadow.** A bottom bar that floats gets `elevation.sheet` — this one
 * does not, because §5 asks for a hairline and because the CTA inside it
 * already carries `elevation.action`. Two stacked shadows read as a UI element
 * that has come loose from the screen, not as depth.
 *
 * **Nothing renders when there is nothing to pin** (§10.6/§12). An empty band
 * is a hairline and a strip of surface across the bottom of the screen with no
 * explanation.
 */
export function AuthStickyFooterV4({
  children,
  secondaryLabel,
  onSecondaryPress,
  secondaryDisabled = false,
  safeArea = true,
  style,
}: AuthStickyFooterV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();

  // `toArray` drops `null`, `undefined` and booleans, so a CTA behind a false
  // conditional counts as absent rather than as a child.
  const hasChildren = React.Children.toArray(children).length > 0;
  if (!hasChildren && !secondaryLabel) return null;

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.lg,
          paddingBottom: tokens.spacing.lg + (safeArea ? insets.bottom : 0),
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      {children}
      {secondaryLabel ? (
        <AuthSwitchFooterV4
          tone="muted"
          label={secondaryLabel}
          onPress={onSecondaryPress}
          disabled={secondaryDisabled}
        />
      ) : null}
    </View>
  );
}
