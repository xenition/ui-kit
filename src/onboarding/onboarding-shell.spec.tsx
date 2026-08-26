/** @jest-environment jsdom */
/**
 * The onboarding shell (web) — the anatomy every entry screen shares: header
 * (back · segmented progress · dismiss) → hero slot → headline block → sticky
 * footer CTA. The native twin of this file asserts the same things against the
 * same prop names; keep the two in step, because prop parity between the twins
 * is the whole reason an app can move a screen between platforms.
 *
 * These specs cover the props added for the shell and, just as importantly, the
 * **empty states**: no illustration, no subtitle, no glyph, a single step, zero
 * slides. A screen with an empty hero slot still has to look composed.
 */
import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { WelcomeScreen } from './WelcomeScreen';
import { WelcomeScreenV2 } from './WelcomeScreenV2';
import { WelcomeScreenV3 } from './WelcomeScreenV3';
import { OnboardingSlides } from './OnboardingSlides';
import { OnboardingSlidesV2 } from './OnboardingSlidesV2';
import { OnboardingSlidesV3 } from './OnboardingSlidesV3';
import { ProgressDots } from './ProgressDots';
import { GetStartedButton } from './GetStartedButton';
import type { WelcomeScreenProps } from './WelcomeScreen';
import type { OnboardingSlidesProps } from './OnboardingSlides';
import type { OnboardingSlide } from './types';

/** No colour may reach the DOM as a literal — every one is a token class. */
const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const SLIDES: OnboardingSlide[] = [
  { id: 'a', title: 'Capture anything', description: 'One inbox for every idea.', icon: '💡' },
  { id: 'b', title: 'Find it instantly', description: 'Search across everything.', icon: '🔍' },
];

const ART = <span>hero-art</span>;

/*
  Testing Library binds its queries to `document.body`, not to the container it
  just created, so a second `render` inside one test leaves the first still
  mounted and every query starts matching two elements. Where a test genuinely
  needs to compare two renders, it unmounts the first explicitly.
*/

const WELCOMES: ReadonlyArray<[string, React.ComponentType<WelcomeScreenProps>]> = [
  ['base', WelcomeScreen],
  ['V2', WelcomeScreenV2],
  ['V3', WelcomeScreenV3],
];

const SLIDE_LINES: ReadonlyArray<[string, React.ComponentType<OnboardingSlidesProps>]> = [
  ['base', OnboardingSlides],
  ['V2', OnboardingSlidesV2],
  ['V3', OnboardingSlidesV3],
];

describe('ProgressDots — the `bars` treatment (§2)', () => {
  it('defaults to dots, so nothing that already shipped moves', () => {
    const { getByRole } = render(<ProgressDots count={3} activeIndex={1} />);
    // The dot treatment sizes each dot; the bar treatment never does.
    expect(getByRole('progressbar').innerHTML).toContain('w-2');
  });

  it('fills every step up to the current one and leaves the rest on border', () => {
    const { getByRole } = render(<ProgressDots variant="bars" count={4} activeIndex={2} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('2');
    expect(bar.innerHTML.match(/bg-primary/g)).toHaveLength(3);
    expect(bar.innerHTML.match(/bg-border/g)).toHaveLength(1);
    expect(bar.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('makes each segment a labelled button when it is navigable', () => {
    const onDotClick = jest.fn();
    const { getAllByRole } = render(
      <ProgressDots variant="bars" count={3} activeIndex={0} onDotClick={onDotClick} />
    );
    const segments = getAllByRole('button');
    expect(segments).toHaveLength(3);
    fireEvent.click(segments[2]!);
    expect(onDotClick).toHaveBeenCalledWith(2);
  });

  it('survives a single step and a zero count', () => {
    const one = render(<ProgressDots variant="bars" count={1} activeIndex={0} />);
    expect(one.getByRole('progressbar').innerHTML).toContain('bg-primary');
    cleanup();
    const none = render(<ProgressDots variant="bars" count={0} activeIndex={0} />);
    expect(none.getByRole('progressbar').innerHTML).toBe('');
  });
});

describe('GetStartedButton — the §5 sticky CTA', () => {
  it('carries a trailing arrow by default and drops it on a terminal action', () => {
    const forward = render(<GetStartedButton label="Continue" />);
    expect(forward.getByRole('button').textContent).toContain('→');
    cleanup();

    const terminal = render(<GetStartedButton label="Done" trailingArrow={false} />);
    expect(terminal.getByRole('button').textContent).not.toContain('→');
  });

  it('keeps the label findable by text once the arrow is beside it', () => {
    const { getByText } = render(<GetStartedButton label="Get started" />);
    expect(getByText('Get started')).toBeTruthy();
  });

  it('takes the hero bar at `lg` and leaves a small button small', () => {
    const hero = render(<GetStartedButton label="Go" />);
    expect(hero.getByRole('button').className).toContain('h-14');
    expect(hero.getByRole('button').getAttribute('style')).toContain('--xen-radius-full');
    cleanup();

    const inline = render(<GetStartedButton label="Go" size="sm" />);
    expect(inline.getByRole('button').className).not.toContain('h-14');
  });
});

describe.each(WELCOMES)('WelcomeScreen %s — the shell', (_name, Welcome) => {
  it('renders the caller illustration in the hero slot instead of the medallion', () => {
    const { getByText, queryByText } = render(
      <Welcome title="Xenition" logoGlyph="⚡" illustration={ART} />
    );
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByText('⚡')).toBeNull();
  });

  it('falls back to the logo medallion when there is no illustration', () => {
    const { getByText } = render(<Welcome title="Xenition" logoGlyph="⚡" />);
    expect(getByText('⚡')).toBeTruthy();
  });

  it('composes with nothing in it: no illustration, no subtitle, no glyph', () => {
    const { getByText, container } = render(<Welcome title="Xenition" />);
    expect(getByText('Xenition')).toBeTruthy();
    // The hero slot still has something in it — the default mark, not a hole.
    expect(getByText('✦')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('hides both header controls until they are asked for', () => {
    const { queryByLabelText } = render(<Welcome title="Xenition" />);
    expect(queryByLabelText('Go back')).toBeNull();
    expect(queryByLabelText('Dismiss')).toBeNull();
  });

  it('fires the header back and dismiss affordances', () => {
    const onBack = jest.fn();
    const onDismiss = jest.fn();
    const { getByLabelText } = render(
      <Welcome title="Xenition" onBack={onBack} onDismiss={onDismiss} />
    );
    fireEvent.click(getByLabelText('Go back'));
    fireEvent.click(getByLabelText('Dismiss'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('shows the segmented progress bars only when the flow has steps', () => {
    expect(render(<Welcome title="Xenition" />).queryByRole('progressbar')).toBeNull();
    cleanup();
    const stepped = render(<Welcome title="Xenition" stepCount={3} stepIndex={1} />);
    expect(stepped.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('1');
  });

  it('puts the secondary action below the CTA as a muted link', () => {
    const onSecondary = jest.fn();
    const { getByLabelText } = render(
      <Welcome title="Xenition" secondaryLabel="I already have an account" onSecondary={onSecondary} />
    );
    const link = getByLabelText('I already have an account');
    expect(link.innerHTML).toContain('text-muted');
    fireEvent.click(link);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });
});

describe.each(SLIDE_LINES)('OnboardingSlides %s — the shell', (_name, Slides) => {
  it('renders the caller illustration in the hero slot instead of the slide glyph', () => {
    const { getByText, queryByText } = render(<Slides slides={SLIDES} illustration={ART} />);
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByText('💡')).toBeNull();
  });

  it('hides the back chevron on the first slide and walks back from the second', () => {
    expect(render(<Slides slides={SLIDES} />).queryByLabelText('Previous slide')).toBeNull();
    cleanup();

    const onIndexChange = jest.fn();
    const second = render(<Slides slides={SLIDES} index={1} onIndexChange={onIndexChange} />);
    fireEvent.click(second.getByLabelText('Previous slide'));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('routes the header dismiss to onSkip, and hides it when showSkip is off', () => {
    const onSkip = jest.fn();
    const { getByLabelText } = render(<Slides slides={SLIDES} onSkip={onSkip} />);
    fireEvent.click(getByLabelText('Skip intro'));
    expect(onSkip).toHaveBeenCalledTimes(1);
    cleanup();

    expect(
      render(<Slides slides={SLIDES} showSkip={false} />).queryByLabelText('Skip intro')
    ).toBeNull();
  });

  it('renders a single slide with no description and no glyph', () => {
    const { getByText, container } = render(<Slides slides={[{ id: 'only', title: 'One thing' }]} />);
    expect(getByText('One thing')).toBeTruthy();
    expect(getByText('✦')).toBeTruthy();
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });

  it('renders the empty state for zero slides', () => {
    expect(render(<Slides slides={[]} />).getByText('Nothing to show yet.')).toBeTruthy();
  });
});
