import * as React from 'react';
import { Text, StyleSheet, AccessibilityInfo } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Reveal } from './Reveal';
import { Stagger } from './Stagger';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

describe('Reveal (native)', () => {
  it('renders its children under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByText } = renderThemed(
        <Reveal>
          <Text>Hello</Text>
        </Reveal>,
        seed
      );
      expect(getByText('Hello')).toBeTruthy();
    });
  });

  it('animates on mount (opacity starts hidden at 0, not the static reveal-1)', () => {
    const { getByTestId } = renderThemed(
      <Reveal effect="fade-up">
        <Text>Body</Text>
      </Reveal>,
      SEED_LIGHT
    );
    // The Animated opacity begins at its hidden 0 start value (native driver
    // leaves the JS value at the start in the test env) — distinct from the
    // reduced-motion static 1.
    const opacity = flatten(getByTestId('xen-reveal').props.style).opacity;
    expect(opacity).toBe(0);
    expect(opacity).not.toBe(1);
  });

  it('applies a translateY transform for fade-up and a scale for zoom', () => {
    const up = renderThemed(
      <Reveal effect="fade-up">
        <Text>u</Text>
      </Reveal>,
      SEED_LIGHT
    );
    const upTransform = flatten(up.getByTestId('xen-reveal').props.style).transform as Array<Record<string, unknown>>;
    expect(upTransform.some((t) => 'translateY' in t)).toBe(true);

    const zoom = renderThemed(
      <Reveal effect="zoom">
        <Text>z</Text>
      </Reveal>,
      SEED_LIGHT
    );
    const zoomTransform = flatten(zoom.getByTestId('xen-reveal').props.style).transform as Array<Record<string, unknown>>;
    expect(zoomTransform.some((t) => 'scale' in t)).toBe(true);
  });

  it('renders immediately (no animation) under reduced motion', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { getByTestId, getByText } = renderThemed(
      <Reveal effect="zoom">
        <Text>Now</Text>
      </Reveal>,
      SEED_LIGHT
    );
    // Content is present immediately …
    expect(getByText('Now')).toBeTruthy();
    // … and the wrapper is fully visible with no animated opacity (static 1).
    await waitFor(() => expect(flatten(getByTestId('xen-reveal').props.style).opacity).toBe(1));
  });
});

describe('Stagger (native)', () => {
  it('renders all child Reveals (cascade collapses safely)', () => {
    const { getByText } = renderThemed(
      <Stagger interval={80} delay={40}>
        <Reveal>
          <Text>One</Text>
        </Reveal>
        <Reveal>
          <Text>Two</Text>
        </Reveal>
        <Reveal>
          <Text>Three</Text>
        </Reveal>
      </Stagger>,
      SEED_DARK
    );
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
    expect(getByText('Three')).toBeTruthy();
  });

  it('leaves non-Reveal children untouched', () => {
    const { getByText } = renderThemed(
      <Stagger>
        <Text>Plain</Text>
        <Reveal>
          <Text>Animated</Text>
        </Reveal>
      </Stagger>,
      SEED_LIGHT
    );
    expect(getByText('Plain')).toBeTruthy();
    expect(getByText('Animated')).toBeTruthy();
  });
});

describe('token purity (native motion)', () => {
  it('introduces no hardcoded colors (motion is theme-agnostic)', () => {
    const { root } = renderThemed(
      <Stagger>
        <Reveal effect="fade-up">
          <Text>a</Text>
        </Reveal>
        <Reveal effect="zoom">
          <Text>b</Text>
        </Reveal>
      </Stagger>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    // No color literals at all is the expected case; any that appear must be tokens.
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
