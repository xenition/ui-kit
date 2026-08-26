/**
 * The paywall family (native) — the screen that earns the money, so the one
 * that most has to hold its shape.
 *
 * These specs are about the anatomy the onboarding design spec fixes, not about
 * pixels: the §8 feature rows and their connecting rail, the §3 hero slot and
 * its medallion fallback, the §7 two-up plan cards, the value-framing block and
 * its `formatMoney`-formatted per-day price — plus every empty state the spec
 * names (no illustration, no features, one plan, no badge), because a paywall
 * that breaks on a thin offer breaks on the offer an app actually ships first.
 */
import * as React from 'react';
import { View } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { formatMoney } from '../commerce/money';
import { PaywallScreen, PaywallFeatureRows } from './PaywallScreen';
import { PaywallScreenV2 } from './PaywallScreenV2';
import { PaywallScreenV3 } from './PaywallScreenV3';
import { PlanSelector } from './PlanSelector';
import { PlanSelectorV2 } from './PlanSelectorV2';
import { PlanSelectorV3 } from './PlanSelectorV3';
import { TrialBanner } from './TrialBanner';
import { FeatureLockCard } from './FeatureLockCard';
import * as onboarding from './index';
import type { PaywallFeatureRow, PaywallScreenProps } from './PaywallScreen';
import type { PlanTier } from './types';
import type { ThemeSeed } from '../../theme/types';

const SEEDS: Array<[string, ThemeSeed]> = [
  ['light', SEED_LIGHT],
  ['dark', SEED_DARK],
];

const assertTokenPure = (root: ReactTestInstance, seed: ThemeSeed): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

const FEATURES: PaywallFeatureRow[] = [
  { id: 'a', icon: 'bolt', title: 'Everything, instantly', description: 'No waiting on a sync.' },
  { id: 'b', icon: 'lock', title: 'Private by default', description: 'Your work stays yours.' },
  { id: 'c', icon: 'chart', title: 'See what worked', description: 'Numbers, not vibes.' },
];

const PAIR: PlanTier[] = [
  { id: 'monthly', name: 'Monthly', monthlyPrice: '$12', annualPrice: '$12' },
  { id: 'annual', name: 'Annual', monthlyPrice: '$8', annualPrice: '$96', badge: 'SAVE 20%' },
];

const LINES: Array<[string, React.ComponentType<PaywallScreenProps>]> = [
  ['base', PaywallScreen],
  ['V2', PaywallScreenV2],
  ['V3', PaywallScreenV3],
];

describe('PaywallFeatureRows — the §8 pattern (native)', () => {
  it('draws a badge, a title and a description for every row', () => {
    const { getByText } = renderThemed(<PaywallFeatureRows rows={FEATURES} />, SEED_LIGHT);
    expect(getByText('Everything, instantly')).toBeTruthy();
    expect(getByText('No waiting on a sync.')).toBeTruthy();
    expect(getByText('See what worked')).toBeTruthy();
  });

  it('renders a heading when one is given, and nothing at all for zero rows', () => {
    const { getByText } = renderThemed(
      <PaywallFeatureRows rows={FEATURES} heading="What you unlock" />,
      SEED_LIGHT
    );
    expect(getByText('What you unlock')).toBeTruthy();

    const { toJSON } = renderThemed(<PaywallFeatureRows rows={[]} heading="Nothing" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('turns the rail on at three rows and leaves it off below that', () => {
    const three = renderThemed(<PaywallFeatureRows rows={FEATURES} />, SEED_LIGHT);
    // One rail per gap between badges — three rows, two gaps.
    expect(three.getAllByTestId('xen-paywall-rail')).toHaveLength(2);

    const two = renderThemed(<PaywallFeatureRows rows={FEATURES.slice(0, 2)} />, SEED_LIGHT);
    expect(two.queryAllByTestId('xen-paywall-rail')).toHaveLength(0);
  });

  it('lets `rail` override the default in both directions', () => {
    const off = renderThemed(<PaywallFeatureRows rows={FEATURES} rail={false} />, SEED_LIGHT);
    expect(off.queryAllByTestId('xen-paywall-rail')).toHaveLength(0);

    const on = renderThemed(<PaywallFeatureRows rows={FEATURES.slice(0, 2)} rail />, SEED_LIGHT);
    expect(on.getAllByTestId('xen-paywall-rail')).toHaveLength(1);
  });

  it('renders a row with no icon and no description', () => {
    const { getByText } = renderThemed(
      <PaywallFeatureRows rows={[{ title: 'Bare row' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Bare row')).toBeTruthy();
  });

  it.each(SEEDS)('stays token-pure (%s)', (_name, seed) => {
    const { root } = renderThemed(<PaywallFeatureRows rows={FEATURES} dense />, seed);
    assertTokenPure(root, seed);
  });
});

describe.each(LINES)('PaywallScreen %s — the shell', (name, Paywall) => {
  it('leads with the §8 rows and fires the sticky CTA', () => {
    const onSubscribe = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <Paywall
        title="Do your best work"
        subtitle="Unlock the full kit."
        features={FEATURES}
        featuresTitle="What you unlock"
        plans={PAIR}
        selectedPlanId="annual"
        ctaLabel="Start free trial"
        onSubscribe={onSubscribe}
        footnote="Cancel anytime."
      />,
      SEED_LIGHT
    );
    expect(getByText('What you unlock')).toBeTruthy();
    expect(getByText('Private by default')).toBeTruthy();
    expect(getByText('Your work stays yours.')).toBeTruthy();
    fireEvent.press(getByLabelText('Start free trial'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });

  it('folds legacy `valueProps` into the same rows', () => {
    const { getByText } = renderThemed(
      <Paywall title="Go Pro" valueProps={[{ text: 'Work offline anywhere' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Work offline anywhere')).toBeTruthy();
  });

  it('prefers `features` when both are supplied', () => {
    const { getByText, queryByText } = renderThemed(
      <Paywall title="Go Pro" features={FEATURES} valueProps={[{ text: 'Legacy line' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Everything, instantly')).toBeTruthy();
    expect(queryByText('Legacy line')).toBeNull();
  });

  it('renders the value-framing block with a formatMoney per-day price', () => {
    const { getByText } = renderThemed(
      <Paywall
        title="Go Pro"
        valueFraming={{
          title: 'Less than your everyday spending',
          perDayCents: 33,
          perDayCaption: 'billed yearly',
          rows: [{ icon: 'idea', title: 'Cheaper than a coffee', description: 'Every single day.' }],
        }}
      />,
      SEED_LIGHT
    );
    expect(getByText('Less than your everyday spending')).toBeTruthy();
    expect(getByText(`${formatMoney(33, 'USD')} per day`)).toBeTruthy();
    expect(getByText('billed yearly')).toBeTruthy();
    expect(getByText('Cheaper than a coffee')).toBeTruthy();
  });

  it('honours a custom per-day label and currency', () => {
    const { getByText } = renderThemed(
      <Paywall title="Go Pro" valueFraming={{ perDayCents: 50, currency: 'EUR', perDayLabel: 'a day' }} />,
      SEED_LIGHT
    );
    expect(getByText(`${formatMoney(50, 'EUR')} a day`)).toBeTruthy();
  });

  it('takes an illustration in the hero slot and falls back to the medallion without one', () => {
    const withArt = renderThemed(
      <Paywall title="Go Pro" showHero illustration={<View testID="hero-art" />} logoGlyph="⚡" />,
      SEED_LIGHT
    );
    expect(withArt.getByTestId('hero-art')).toBeTruthy();
    // The medallion is decorative, so it is hidden from the a11y tree — hence
    // `includeHiddenElements` on both sides of this assertion.
    expect(withArt.queryByText('⚡', { includeHiddenElements: true })).toBeNull();

    const bare = renderThemed(<Paywall title="Go Pro" showHero logoGlyph="⚡" />, SEED_LIGHT);
    expect(bare.getByText('⚡', { includeHiddenElements: true })).toBeTruthy();
  });

  it('survives its empty state: no illustration, no subtitle, no features, no plans', () => {
    const { getByText, getByLabelText } = renderThemed(<Paywall title="Go Pro" />, SEED_LIGHT);
    expect(getByText('Go Pro')).toBeTruthy();
    expect(getByLabelText('Start free trial')).toBeTruthy();
  });

  it('renders a single plan with no badge', () => {
    const { getAllByRole, getByText } = renderThemed(
      <Paywall
        title="Go Pro"
        plans={[{ id: 'solo', name: 'Solo', monthlyPrice: '$5', annualPrice: '$50' }]}
        selectedPlanId="solo"
      />,
      SEED_LIGHT
    );
    expect(getAllByRole('radio')).toHaveLength(1);
    expect(getByText('Solo')).toBeTruthy();
  });

  it('shows the dismiss link only when both copy and handler are given', () => {
    const onDismiss = jest.fn();
    const withLink = renderThemed(
      <Paywall title="Go Pro" dismissLabel="Maybe later" onDismiss={onDismiss} />,
      SEED_LIGHT
    );
    fireEvent.press(withLink.getByLabelText('Maybe later'));
    expect(onDismiss).toHaveBeenCalledTimes(1);

    const without = renderThemed(<Paywall title="Go Pro" dismissLabel="Maybe later" />, SEED_LIGHT);
    expect(without.queryByText('Maybe later')).toBeNull();
  });

  it.each(SEEDS)(`${name} stays token-pure (%s)`, (_seedName, seed) => {
    const { root } = renderThemed(
      <Paywall
        title="Do your best work"
        subtitle="Unlock the full kit."
        features={FEATURES}
        featuresTitle="What you unlock"
        valueFraming={{ title: 'Less than a coffee', perDayCents: 33 }}
        plans={PAIR}
        selectedPlanId="annual"
        trial={{ title: '7 days free', subtitle: 'No charge yet', daysLeft: 7 }}
        footnote="Cancel anytime."
        dismissLabel="Maybe later"
        onDismiss={jest.fn()}
      />,
      seed
    );
    assertTokenPure(root, seed);
  });
});

describe('PlanSelector — the §7 card pair (native)', () => {
  const SELECTORS = [
    ['base', PlanSelector],
    ['V2', PlanSelectorV2],
    ['V3', PlanSelectorV3],
  ] as const;

  it.each(SELECTORS)('%s exposes a radiogroup and selects on press', (_name, Selector) => {
    const onSelectPlan = jest.fn();
    const { getByLabelText, getAllByRole } = renderThemed(
      <Selector plans={PAIR} selectedPlanId="monthly" onSelectPlan={onSelectPlan} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Choose a plan')).toBeTruthy();
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    fireEvent.press(radios[1]!);
    expect(onSelectPlan).toHaveBeenCalledWith('annual');
  });

  it.each(SELECTORS)('%s renders the badge on the card it belongs to', (_name, Selector) => {
    const { getByText } = renderThemed(<Selector plans={PAIR} />, SEED_LIGHT);
    expect(getByText('SAVE 20%')).toBeTruthy();
  });

  it.each(SELECTORS)('%s renders a lone plan with no badge', (_name, Selector) => {
    const { getAllByRole } = renderThemed(
      <Selector plans={[{ id: 'solo', name: 'Solo', monthlyPrice: '$5', annualPrice: '$50' }]} />,
      SEED_LIGHT
    );
    expect(getAllByRole('radio')).toHaveLength(1);
  });

  it.each(SELECTORS)('%s guards an empty plan list', (_name, Selector) => {
    expect(renderThemed(<Selector plans={[]} />, SEED_LIGHT).getByText('No plans available.')).toBeTruthy();
  });

  it.each(SELECTORS)('%s honours both layouts', (_name, Selector) => {
    const cards = renderThemed(<Selector plans={PAIR} layout="cards" />, SEED_LIGHT);
    expect(cards.getAllByRole('radio')).toHaveLength(2);
    const list = renderThemed(<Selector plans={PAIR} layout="list" />, SEED_LIGHT);
    expect(list.getAllByRole('radio')).toHaveLength(2);
  });

  it('swaps every card to the annual price', () => {
    const { getByText } = renderThemed(
      <PlanSelector plans={PAIR} billingPeriod="annual" selectedPlanId="annual" />,
      SEED_LIGHT
    );
    expect(getByText('$96')).toBeTruthy();
  });

  it.each(SEEDS)('the card pair stays token-pure (%s)', (_name, seed) => {
    const { root } = renderThemed(
      <PlanSelector plans={PAIR} selectedPlanId="annual" annualSavingsLabel="Save 20%" billingPeriod="annual" />,
      seed
    );
    assertTokenPure(root, seed);
  });
});

describe('TrialBanner has no alternate — verified, not "fixed" (native)', () => {
  it('the module exports no TrialBannerV2/V3, so the base one is the whole line', () => {
    const exported = Object.keys(onboarding);
    expect(exported).toContain('TrialBanner');
    expect(exported).not.toContain('TrialBannerV2');
    expect(exported).not.toContain('TrialBannerV3');
  });

  it('renders bare — no subtitle, no countdown, no action', () => {
    const { getByText, queryByText } = renderThemed(<TrialBanner title="7 days of Pro" />, SEED_LIGHT);
    expect(getByText('7 days of Pro')).toBeTruthy();
    expect(queryByText('0 days left')).toBeNull();
  });

  it('fires its inline action only when both copy and handler are given', () => {
    const onActionPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <TrialBanner title="Trial running" actionLabel="Manage" onActionPress={onActionPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Manage'));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });
});

describe('FeatureLockCard — a §8 row with a CTA (native)', () => {
  it('renders with no description and fires unlock', () => {
    const onUnlock = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <FeatureLockCard title="Unlimited exports" onUnlock={onUnlock} />,
      SEED_LIGHT
    );
    expect(getByText('Unlimited exports')).toBeTruthy();
    fireEvent.press(getByLabelText('Unlock'));
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it.each(SEEDS)('both variants stay token-pure (%s)', (_name, seed) => {
    const card = renderThemed(
      <FeatureLockCard title="Unlimited exports" description="Export as much as you like." />,
      seed
    );
    assertTokenPure(card.root, seed);
    const inline = renderThemed(<FeatureLockCard title="Unlimited exports" variant="inline" />, seed);
    assertTokenPure(inline.root, seed);
  });
});
