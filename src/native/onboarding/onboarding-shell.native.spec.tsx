/**
 * The onboarding shell (native) — the anatomy every entry screen shares:
 * header (back · segmented progress · dismiss) → hero slot → headline block →
 * sticky footer CTA. These specs cover the props added for it and, just as
 * importantly, the **empty states**: no illustration, no subtitle, no glyph, a
 * single step, zero slides. A screen with an empty hero slot still has to look
 * composed, and the only way that stays true is if it is asserted.
 */
import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
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
import type { ThemeSeed } from '../../theme/types';
import type { ReactTestInstance } from 'react-test-renderer';

const assertTokenPure = (root: ReactTestInstance, seed: ThemeSeed): void => {
  const allowed = tokenHexSet(seed);
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
};

const SLIDES: OnboardingSlide[] = [
  { id: 'a', title: 'Capture anything', description: 'One inbox for every idea.', icon: '💡' },
  { id: 'b', title: 'Find it instantly', description: 'Search across everything.', icon: '🔍' },
];

const ART = <RNText>hero-art</RNText>;

/**
 * `Icon` marks itself decorative — `importantForAccessibility="no-hide-
 * descendants"` — so its glyph is invisible to the default queries. The
 * medallion fallback IS a glyph, so asserting it needs the hidden tree.
 */
const HIDDEN = { includeHiddenElements: true } as const;

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
    const { getByLabelText } = renderThemed(<ProgressDots count={3} activeIndex={1} />, SEED_LIGHT);
    expect(getByLabelText('Step 2 of 3')).toBeTruthy();
  });

  it('draws one pressable segment per step in `bars` and reports the tap', () => {
    const onDotPress = jest.fn();
    const { getAllByRole, root } = renderThemed(
      <ProgressDots variant="bars" count={4} activeIndex={2} onDotPress={onDotPress} />,
      SEED_LIGHT
    );
    const segments = getAllByRole('button');
    expect(segments).toHaveLength(4);
    assertTokenPure(root, SEED_LIGHT);
    fireEvent.press(segments[3]!);
    expect(onDotPress).toHaveBeenCalledWith(3);
  });

  it('survives a single step and a zero count', () => {
    expect(
      renderThemed(<ProgressDots variant="bars" count={1} activeIndex={0} />, SEED_LIGHT).getByLabelText(
        'Step 1 of 1'
      )
    ).toBeTruthy();
    // Nothing to draw, but still a labelled group rather than a crash.
    expect(
      renderThemed(<ProgressDots variant="bars" count={0} activeIndex={0} />, SEED_LIGHT).getByLabelText(
        'Step 0 of 0'
      )
    ).toBeTruthy();
  });
});

describe('GetStartedButton — the §5 sticky CTA', () => {
  it('carries a trailing arrow by default and drops it on a terminal action', () => {
    const forward = renderThemed(<GetStartedButton label="Continue" />, SEED_LIGHT);
    expect(forward.getByText('→', HIDDEN)).toBeTruthy();

    const terminal = renderThemed(<GetStartedButton label="Done" trailingArrow={false} />, SEED_LIGHT);
    expect(terminal.queryByText('→', HIDDEN)).toBeNull();
    expect(terminal.getByText('Done')).toBeTruthy();
  });

  it('announces `accessibilityLabel` over the visible label', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <GetStartedButton label="Next" accessibilityLabel="Next slide" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Next slide'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('keeps its shape while disabled and stays token-pure in both schemes', () => {
    ([SEED_LIGHT, SEED_DARK] as const).forEach((seed) => {
      const { root } = renderThemed(<GetStartedButton label="Start" disabled />, seed);
      assertTokenPure(root, seed);
    });
  });
});

describe.each(WELCOMES)('WelcomeScreen %s — the shell', (_name, Welcome) => {
  it('renders the caller illustration in the hero slot instead of the medallion', () => {
    const { getByText, queryByText } = renderThemed(
      <Welcome title="Xenition" logoGlyph="⚡" illustration={ART} />,
      SEED_LIGHT
    );
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByText('⚡', HIDDEN)).toBeNull();
  });

  it('falls back to the logo medallion when there is no illustration', () => {
    const { getByText } = renderThemed(<Welcome title="Xenition" logoGlyph="⚡" />, SEED_LIGHT);
    expect(getByText('⚡', HIDDEN)).toBeTruthy();
  });

  it('composes with nothing in it: no illustration, no subtitle, no glyph', () => {
    const { getByText, root } = renderThemed(<Welcome title="Xenition" />, SEED_LIGHT);
    expect(getByText('Xenition')).toBeTruthy();
    // The hero slot still has something in it — the default mark, not a hole.
    expect(getByText('✦', HIDDEN)).toBeTruthy();
    assertTokenPure(root, SEED_LIGHT);
  });

  it('hides both header controls until they are asked for', () => {
    const { queryByLabelText } = renderThemed(<Welcome title="Xenition" />, SEED_LIGHT);
    expect(queryByLabelText('Go back')).toBeNull();
    expect(queryByLabelText('Dismiss')).toBeNull();
  });

  it('fires the header back and dismiss affordances', () => {
    const onBack = jest.fn();
    const onDismiss = jest.fn();
    const { getByLabelText } = renderThemed(
      <Welcome title="Xenition" onBack={onBack} onDismiss={onDismiss} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Go back'));
    fireEvent.press(getByLabelText('Dismiss'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('shows the segmented progress bars only when the flow has steps', () => {
    expect(
      renderThemed(<Welcome title="Xenition" />, SEED_LIGHT).queryByLabelText('Step 1 of 3')
    ).toBeNull();
    expect(
      renderThemed(<Welcome title="Xenition" stepCount={3} stepIndex={1} />, SEED_LIGHT).getByLabelText(
        'Step 2 of 3'
      )
    ).toBeTruthy();
  });

  it('puts the secondary action below the CTA as a muted link', () => {
    const onSecondary = jest.fn();
    const { getByLabelText } = renderThemed(
      <Welcome title="Xenition" secondaryLabel="I already have an account" onSecondary={onSecondary} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('I already have an account'));
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });
});

describe.each(SLIDE_LINES)('OnboardingSlides %s — the shell', (_name, Slides) => {
  it('renders the caller illustration in the hero slot instead of the slide glyph', () => {
    const { getByText, queryByText } = renderThemed(
      <Slides slides={SLIDES} illustration={ART} />,
      SEED_LIGHT
    );
    expect(getByText('hero-art')).toBeTruthy();
    expect(queryByText('💡', HIDDEN)).toBeNull();
  });

  it('hides the back chevron on the first slide and walks back from the second', () => {
    const onIndexChange = jest.fn();
    const first = renderThemed(<Slides slides={SLIDES} />, SEED_LIGHT);
    expect(first.queryByLabelText('Previous slide')).toBeNull();

    const second = renderThemed(
      <Slides slides={SLIDES} index={1} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    fireEvent.press(second.getByLabelText('Previous slide'));
    expect(onIndexChange).toHaveBeenCalledWith(0);
  });

  it('routes the header dismiss to onSkip, and hides it when showSkip is off', () => {
    const onSkip = jest.fn();
    const { getByLabelText } = renderThemed(
      <Slides slides={SLIDES} onSkip={onSkip} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Skip intro'));
    expect(onSkip).toHaveBeenCalledTimes(1);

    expect(
      renderThemed(<Slides slides={SLIDES} showSkip={false} />, SEED_LIGHT).queryByLabelText('Skip intro')
    ).toBeNull();
  });

  it('renders a single slide with no description and no glyph', () => {
    const { getByText, root } = renderThemed(
      <Slides slides={[{ id: 'only', title: 'One thing' }]} />,
      SEED_LIGHT
    );
    expect(getByText('One thing')).toBeTruthy();
    expect(getByText('✦', HIDDEN)).toBeTruthy();
    assertTokenPure(root, SEED_LIGHT);
  });

  it('renders the empty state for zero slides', () => {
    expect(renderThemed(<Slides slides={[]} />, SEED_LIGHT).getByText('Nothing to show yet.')).toBeTruthy();
  });
});
