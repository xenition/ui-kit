/** @jest-environment jsdom */
/**
 * Alternate onboarding designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of OnboardingSlides, PaywallScreen, PlanSelector, WelcomeScreen. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in inline styles beyond geometric widths), and (c)
 * honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { OnboardingSlidesV2 } from './OnboardingSlidesV2';
import { OnboardingSlidesV3 } from './OnboardingSlidesV3';
import { PaywallScreenV2 } from './PaywallScreenV2';
import { PaywallScreenV3 } from './PaywallScreenV3';
import { PlanSelectorV2 } from './PlanSelectorV2';
import { PlanSelectorV3 } from './PlanSelectorV3';
import { WelcomeScreenV2 } from './WelcomeScreenV2';
import { WelcomeScreenV3 } from './WelcomeScreenV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const SLIDES = [
  { id: '1', title: 'Welcome', description: 'Get set up', icon: '👋' },
  { id: '2', title: 'Go', description: 'Start now', icon: '🚀' },
];
const PLANS = [
  { id: 'pro', name: 'Pro', monthlyPrice: '$12', annualPrice: '$120', badge: 'Popular', features: ['All features'] },
  { id: 'team', name: 'Team', monthlyPrice: '$30', annualPrice: '$300' },
];

describe('WelcomeScreen alternates (web)', () => {
  it('V2 fires onGetStarted', () => {
    const onGetStarted = jest.fn();
    const { getByText, container } = render(<WelcomeScreenV2 title="Acme" subtitle="Do more" logoGlyph="⚡" onGetStarted={onGetStarted} />);
    expect(getByText('Acme')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Get started'));
    expect(onGetStarted).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact card', () => {
    const { getByText, container } = render(<WelcomeScreenV3 title="Acme" subtitle="Do more" logoGlyph="⚡" />);
    expect(getByText('Acme')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('OnboardingSlides alternates (web)', () => {
  it('V2 advances the slide', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, container } = render(<OnboardingSlidesV2 slides={SLIDES} onIndexChange={onIndexChange} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Next slide'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });
  it('V3 completes on the last slide', () => {
    const onComplete = jest.fn();
    const { getByLabelText, container } = render(<OnboardingSlidesV3 slides={SLIDES} index={1} onComplete={onComplete} finishLabel="Go" />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Go'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

describe('PlanSelector alternates (web)', () => {
  it('V2 selects a plan', () => {
    const onSelectPlan = jest.fn();
    const { getByText, container } = render(<PlanSelectorV2 plans={PLANS} onSelectPlan={onSelectPlan} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Team'));
    expect(onSelectPlan).toHaveBeenCalledWith('team');
  });
  it('V3 selects a plan', () => {
    const onSelectPlan = jest.fn();
    const { getByText, container } = render(<PlanSelectorV3 plans={PLANS} onSelectPlan={onSelectPlan} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Pro'));
    expect(onSelectPlan).toHaveBeenCalledWith('pro');
  });
});

describe('PaywallScreen alternates (web)', () => {
  it('V2 fires onSubscribe', () => {
    const onSubscribe = jest.fn();
    const { getByText, container } = render(
      <PaywallScreenV2 title="Go Pro" subtitle="Unlock" valueProps={[{ text: 'Faster' }]} plans={PLANS} ctaLabel="Subscribe" onSubscribe={onSubscribe} />
    );
    expect(getByText('Go Pro')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Subscribe'));
    expect(onSubscribe).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact sheet', () => {
    const { getByText, container } = render(<PaywallScreenV3 title="Go Pro" valueProps={[{ text: 'Faster' }]} plans={PLANS} />);
    expect(getByText('Go Pro')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
