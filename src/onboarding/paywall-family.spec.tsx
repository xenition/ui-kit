/** @jest-environment jsdom */
/**
 * The paywall family (web) — the twin of `paywall-family.native.spec.tsx`, and
 * deliberately the same list of assertions, because prop parity between the two
 * platforms is only real if the same behaviours are proved on both.
 *
 * Covered: the §8 feature rows and their connecting rail, the §3 hero slot with
 * its medallion fallback, the §7 two-up plan cards, the value-framing block with
 * its `formatMoney`-formatted per-day price, and every empty state the design
 * spec names — no illustration, no features, one plan, no badge.
 */
import { cleanup, fireEvent, render } from '@testing-library/react';
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
import type { PlanSelectorProps } from './PlanSelector';
import type { PlanTier } from './types';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

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
  ['v2', PaywallScreenV2],
  ['v3', PaywallScreenV3],
];

const SELECTORS: Array<[string, React.ComponentType<PlanSelectorProps>]> = [
  ['base', PlanSelector],
  ['v2', PlanSelectorV2],
  ['v3', PlanSelectorV3],
];

describe('PaywallFeatureRows — the §8 pattern (web)', () => {
  it('draws a badge, a title and a description for every row', () => {
    const { getByText } = render(<PaywallFeatureRows rows={FEATURES} />);
    expect(getByText('Everything, instantly')).toBeTruthy();
    expect(getByText('No waiting on a sync.')).toBeTruthy();
    expect(getByText('See what worked')).toBeTruthy();
  });

  it('renders a heading when given one, and nothing whatsoever for zero rows', () => {
    const { getByText } = render(<PaywallFeatureRows rows={FEATURES} heading="What you unlock" />);
    expect(getByText('What you unlock')).toBeTruthy();

    const { container } = render(<PaywallFeatureRows rows={[]} heading="Nothing" />);
    expect(container.innerHTML).toBe('');
  });

  it('turns the rail on from three rows and leaves it off below that', () => {
    // One rail per gap between badges — three rows, two gaps.
    expect(render(<PaywallFeatureRows rows={FEATURES} />).getAllByTestId('xen-paywall-rail')).toHaveLength(2);
    // RTL queries are bound to `document.body`, so a second render in the same
    // test would still see the first one — clean up between them.
    cleanup();
    expect(
      render(<PaywallFeatureRows rows={FEATURES.slice(0, 2)} />).queryAllByTestId('xen-paywall-rail')
    ).toHaveLength(0);
  });

  it('lets `rail` override the default in both directions', () => {
    expect(
      render(<PaywallFeatureRows rows={FEATURES} rail={false} />).queryAllByTestId('xen-paywall-rail')
    ).toHaveLength(0);
    cleanup();
    expect(
      render(<PaywallFeatureRows rows={FEATURES.slice(0, 2)} rail />).getAllByTestId('xen-paywall-rail')
    ).toHaveLength(1);
  });

  it('renders a row with no icon and no description, token-only', () => {
    const { getByText, container } = render(<PaywallFeatureRows rows={[{ title: 'Bare row' }]} />);
    expect(getByText('Bare row')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe.each(LINES)('PaywallScreen %s — the shell (web)', (_name, Paywall) => {
  it('leads with the §8 rows and fires the CTA', () => {
    const onSubscribe = jest.fn();
    const { getByText, getByRole, container } = render(
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
      />
    );
    expect(getByText('What you unlock')).toBeTruthy();
    expect(getByText('Private by default')).toBeTruthy();
    expect(getByText('Your work stays yours.')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Start free trial' }));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });

  it('folds legacy `valueProps` into the same rows', () => {
    const { getByText } = render(
      <Paywall title="Go Pro" valueProps={[{ text: 'Work offline anywhere' }]} />
    );
    expect(getByText('Work offline anywhere')).toBeTruthy();
  });

  it('prefers `features` when both are supplied', () => {
    const { getByText, queryByText } = render(
      <Paywall title="Go Pro" features={FEATURES} valueProps={[{ text: 'Legacy line' }]} />
    );
    expect(getByText('Everything, instantly')).toBeTruthy();
    expect(queryByText('Legacy line')).toBeNull();
  });

  it('renders the value-framing block with a formatMoney per-day price', () => {
    const { getByText } = render(
      <Paywall
        title="Go Pro"
        valueFraming={{
          title: 'Less than your everyday spending',
          perDayCents: 33,
          perDayCaption: 'billed yearly',
          rows: [{ icon: 'idea', title: 'Cheaper than a coffee', description: 'Every single day.' }],
        }}
      />
    );
    expect(getByText('Less than your everyday spending')).toBeTruthy();
    expect(getByText(`${formatMoney(33, 'USD')} per day`)).toBeTruthy();
    expect(getByText('billed yearly')).toBeTruthy();
    expect(getByText('Cheaper than a coffee')).toBeTruthy();
  });

  it('honours a custom per-day label and currency', () => {
    const { getByText } = render(
      <Paywall title="Go Pro" valueFraming={{ perDayCents: 50, currency: 'EUR', perDayLabel: 'a day' }} />
    );
    expect(getByText(`${formatMoney(50, 'EUR')} a day`)).toBeTruthy();
  });

  it('takes an illustration in the hero slot and falls back to the medallion without one', () => {
    const withArt = render(
      <Paywall title="Go Pro" showHero illustration={<span data-testid="hero-art" />} logoGlyph="⚡" />
    );
    expect(withArt.getByTestId('hero-art')).toBeTruthy();
    expect(withArt.queryByText('⚡')).toBeNull();
    cleanup();

    expect(render(<Paywall title="Go Pro" showHero logoGlyph="⚡" />).getByText('⚡')).toBeTruthy();
  });

  it('survives its empty state: no illustration, no subtitle, no features, no plans', () => {
    const { getByText, getByRole, container } = render(<Paywall title="Go Pro" />);
    expect(getByText('Go Pro')).toBeTruthy();
    expect(getByRole('button', { name: 'Start free trial' })).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('renders a single plan with no badge', () => {
    const { getAllByRole, getByText } = render(
      <Paywall
        title="Go Pro"
        plans={[{ id: 'solo', name: 'Solo', monthlyPrice: '$5', annualPrice: '$50' }]}
        selectedPlanId="solo"
      />
    );
    expect(getAllByRole('radio')).toHaveLength(1);
    expect(getByText('Solo')).toBeTruthy();
  });

  it('shows the dismiss link only when both copy and handler are given', () => {
    const onDismiss = jest.fn();
    const withLink = render(
      <Paywall title="Go Pro" dismissLabel="Maybe later" onDismiss={onDismiss} />
    );
    fireEvent.click(withLink.getByRole('button', { name: 'Maybe later' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    cleanup();

    // Copy without a handler is not a link — it is nothing.
    expect(render(<Paywall title="Go Pro" dismissLabel="Maybe later" />).queryByText('Maybe later')).toBeNull();
  });
});

describe.each(SELECTORS)('PlanSelector %s — the §7 card pair (web)', (_name, Selector) => {
  it('exposes a radiogroup and selects on click', () => {
    const onSelectPlan = jest.fn();
    const { getAllByRole } = render(
      <Selector plans={PAIR} selectedPlanId="monthly" onSelectPlan={onSelectPlan} />
    );
    const radios = getAllByRole('radio');
    expect(radios).toHaveLength(2);
    fireEvent.click(radios[1]!);
    expect(onSelectPlan).toHaveBeenCalledWith('annual');
  });

  it('renders the badge on the card it belongs to', () => {
    const { getByText } = render(<Selector plans={PAIR} />);
    expect(getByText('SAVE 20%')).toBeTruthy();
  });

  it('renders a lone plan with no badge', () => {
    const { getAllByRole } = render(
      <Selector plans={[{ id: 'solo', name: 'Solo', monthlyPrice: '$5', annualPrice: '$50' }]} />
    );
    expect(getAllByRole('radio')).toHaveLength(1);
  });

  it('guards an empty plan list', () => {
    const { getByText } = render(<Selector plans={[]} />);
    expect(getByText(/No plans available/)).toBeTruthy();
  });

  it('honours both layouts, token-only', () => {
    const cards = render(<Selector plans={PAIR} layout="cards" />);
    expect(cards.getAllByRole('radio')).toHaveLength(2);
    expect(inlineStyles(cards.container)).not.toMatch(HEX_LITERAL);
    cleanup();

    expect(render(<Selector plans={PAIR} layout="list" />).getAllByRole('radio')).toHaveLength(2);
  });

  it('swaps every card to the annual price', () => {
    const { getByText } = render(<Selector plans={PAIR} billingPeriod="annual" selectedPlanId="annual" />);
    expect(getByText('$96')).toBeTruthy();
  });
});

describe('TrialBanner has no alternate — verified, not "fixed" (web)', () => {
  it('the module exports no TrialBannerV2/V3, so the base one is the whole line', () => {
    const exported = Object.keys(onboarding);
    expect(exported).toContain('TrialBanner');
    expect(exported).not.toContain('TrialBannerV2');
    expect(exported).not.toContain('TrialBannerV3');
  });

  it('renders bare — no subtitle, no countdown, no action', () => {
    const { getByText, queryByText } = render(<TrialBanner title="7 days of Pro" />);
    expect(getByText('7 days of Pro')).toBeTruthy();
    expect(queryByText('0 days left')).toBeNull();
  });

  it('fires its inline action only when both copy and handler are given', () => {
    const onAction = jest.fn();
    const { getByRole } = render(
      <TrialBanner title="Trial running" actionLabel="Manage" onAction={onAction} />
    );
    fireEvent.click(getByRole('button', { name: 'Manage' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('FeatureLockCard — a §8 row with a CTA (web)', () => {
  it('renders with no description and fires unlock', () => {
    const onUnlock = jest.fn();
    const { getByText, getByRole, container } = render(
      <FeatureLockCard title="Unlimited exports" onUnlock={onUnlock} />
    );
    expect(getByText('Unlimited exports')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByRole('button', { name: 'Unlock' }));
    expect(onUnlock).toHaveBeenCalledTimes(1);
  });

  it('renders the inline variant', () => {
    const { getByText } = render(
      <FeatureLockCard title="Unlimited exports" description="Export freely" variant="inline" />
    );
    expect(getByText('Export freely')).toBeTruthy();
  });
});
