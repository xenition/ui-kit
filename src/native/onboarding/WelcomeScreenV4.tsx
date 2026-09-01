import * as React from 'react';
import { Animated } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GetStartedButtonV4 } from './GetStartedButtonV4';
import { PaywallFeatureRowsV4 } from './PaywallFeatureRowsV4';
import { ProgressDotsV4 } from './ProgressDotsV4';
import {
  FlowFooterV4,
  FlowHeaderV4,
  FlowHeadlineV4,
  FlowHeroV4,
  FlowScreenV4,
  flowGrounds,
  useFlowEntrance,
  type FlowLegalLink,
  type OnboardingFlowV4Props,
} from './internal/flow-v4';
import type { PaywallFeatureRow } from './PaywallScreen';
import type { WelcomeScreenProps } from './WelcomeScreen';
import type { IconName } from '../../primitives/icon-names';

export interface WelcomeScreenV4Props extends WelcomeScreenProps, OnboardingFlowV4Props {
  /**
   * The §8 feature rows, between the headline and the CTA.
   *
   * This is what the reference welcome-offer screen actually is — a hero, a
   * headline, three rows on a connecting rail and one CTA — and the base could
   * not draw it, so hosts reached for `PaywallScreen` (dragging a plan
   * selector and a billing toggle they did not want) or rebuilt the rows.
   */
  features?: PaywallFeatureRow[];
  /** Optional heading above the rows. */
  featuresTitle?: string;
  /** Force the connecting rail on or off. Default: on at three or more rows. */
  featureRail?: boolean;
  /** Reassurance line above the CTA. */
  reassurance?: string;
  /** Its glyph. Default `success`. */
  reassuranceIcon?: IconName;
  /** A third, quieter action under the secondary link. */
  tertiaryLabel?: string;
  onTertiary?: () => void;
  /** Terms · Privacy, inline at the very bottom. */
  legalLinks?: FlowLegalLink[];
  onLegalLinkPress?: (id: string) => void;
  /** Trailing mark on the CTA. Overrides the default `→`. */
  ctaTrailing?: React.ReactNode;
}

/**
 * **V4 first-launch welcome** — the base's props plus `features`,
 * `reassurance`, the two extra footer slots, and the line's `ground`/`accent`.
 *
 * ## Five changes
 *
 * 1. **It scrolls.** The base centred its body with `flex: 1`. Add three
 *    feature rows to a 5.4" phone and the bottom of the copy was simply
 *    unreachable. `FlowScreenV4` keeps the centring for a short screen and
 *    scrolls a long one, with the header and footer pinned either way.
 * 2. **The CTA clears the home indicator.** Via `AuthStickyFooterV4`, which
 *    the base's hand-rolled band did not use, so on a notched phone the button
 *    sat under the home bar.
 * 3. **It can carry the value proposition.** `features` — see above.
 * 4. **The secondary action reads as a choice.** Underlined, `onSurface`, its
 *    own tap target, instead of muted text the eye files as a caption.
 * 5. **The hero tint survives dark mode without a branch**, and the medallion
 *    scales with the viewport instead of sitting at a fixed 96 on a tablet.
 *
 * `variant="bottomSheet"` still left-aligns the headline block — the one place
 * §4 allows it — and now also stops centring the body, because a sheet is
 * anchored to its top edge. Every part is optional; the screen composes with
 * no illustration, no subtitle, no header controls and no secondary action.
 */
export function WelcomeScreenV4({
  title,
  subtitle,
  logoGlyph,
  illustration,
  primaryLabel = 'Get started',
  onGetStarted,
  secondaryLabel,
  onSecondary,
  onBack,
  onDismiss,
  stepCount,
  stepIndex = 0,
  loading = false,
  variant = 'centered',
  features,
  featuresTitle,
  featureRail,
  reassurance,
  reassuranceIcon,
  tertiaryLabel,
  onTertiary,
  legalLinks,
  onLegalLinkPress,
  ctaTrailing,
  ground = 'plain',
  accent = 'primary',
  style,
}: WelcomeScreenV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;
  const grounds = flowGrounds(theme, ground, accent);
  const sheet = variant === 'bottomSheet';

  const hero = useFlowEntrance(0);
  const heading = useFlowEntrance(1);
  const rows = useFlowEntrance(2);

  return (
    <FlowScreenV4
      grounds={grounds}
      center={!sheet}
      style={style}
      header={
        <FlowHeaderV4
          onBack={onBack}
          onDismiss={onDismiss}
          progress={
            stepCount != null && stepCount > 0 ? (
              <ProgressDotsV4
                variant="bars"
                accent={accent}
                count={stepCount}
                activeIndex={stepIndex}
              />
            ) : null
          }
        />
      }
      footer={
        <FlowFooterV4
          reassurance={reassurance}
          reassuranceIcon={reassuranceIcon}
          secondaryLabel={onSecondary ? secondaryLabel : undefined}
          onSecondary={onSecondary}
          tertiaryLabel={tertiaryLabel}
          onTertiary={onTertiary}
          legalLinks={legalLinks}
          onLegalLinkPress={onLegalLinkPress}
        >
          <GetStartedButtonV4
            label={primaryLabel}
            onPress={onGetStarted}
            loading={loading}
            trailing={ctaTrailing}
          />
        </FlowFooterV4>
      }
    >
      <Animated.View style={[{ alignSelf: 'stretch' }, hero]}>
        {/* A sheet is a short presentation; a 38%-tall hero panel inside one
            leaves no room for what the sheet is asking. */}
        <FlowHeroV4
          show={!sheet}
          illustration={illustration}
          logoGlyph={logoGlyph}
          grounds={grounds}
        />
      </Animated.View>

      <Animated.View style={[{ alignSelf: 'stretch' }, heading]}>
        <FlowHeadlineV4 title={title} subtitle={subtitle} align={sheet ? 'left' : 'center'} />
      </Animated.View>

      {features?.length ? (
        <Animated.View style={[{ alignSelf: 'stretch', gap: tokens.spacing.lg }, rows]}>
          <PaywallFeatureRowsV4
            rows={features}
            heading={featuresTitle}
            rail={featureRail}
            accent={accent}
          />
        </Animated.View>
      ) : null}
    </FlowScreenV4>
  );
}
