import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { GradientHero } from './GradientHero';
import { SectionHeading } from './SectionHeading';
import { CTABanner } from './CTABanner';
import { Footer } from './Footer';
import { Button } from '../primitives/Button';

describe('GradientHero (native)', () => {
  it('renders eyebrow + title + subtitle and fires an action press', () => {
    const onPress = jest.fn();
    const { queryByText, getByText } = renderThemed(
      <GradientHero
        eyebrow="New"
        title="Restyle by prompt"
        subtitle="Ship a themed app in minutes."
        actions={<Button onPress={onPress}>Get started</Button>}
      />,
      SEED_LIGHT
    );
    expect(queryByText('New')).toBeTruthy();
    expect(queryByText('Restyle by prompt')).toBeTruthy();
    expect(queryByText('Ship a themed app in minutes.')).toBeTruthy();
    fireEvent.press(getByText('Get started'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SectionHeading (native)', () => {
  it('renders eyebrow + title + lede', () => {
    const { queryByText } = renderThemed(
      <SectionHeading
        eyebrow="Features"
        title="Everything token-driven"
        lede="One seed restyles the whole surface."
        align="center"
      />,
      SEED_LIGHT
    );
    expect(queryByText('Features')).toBeTruthy();
    expect(queryByText('Everything token-driven')).toBeTruthy();
    expect(queryByText('One seed restyles the whole surface.')).toBeTruthy();
  });
});

describe('CTABanner (native)', () => {
  it('renders title + description and fires the action press', () => {
    const onPress = jest.fn();
    const { queryByText, getByText } = renderThemed(
      <CTABanner
        title="Ready to build?"
        description="Spin up your first template today."
        action={<Button onPress={onPress}>Start free</Button>}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Ready to build?')).toBeTruthy();
    expect(queryByText('Spin up your first template today.')).toBeTruthy();
    fireEvent.press(getByText('Start free'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('Footer (native)', () => {
  it('renders logo, columns, bottom and fires a link press', () => {
    const onPress = jest.fn();
    const { queryByText, getByText } = renderThemed(
      <Footer
        logo={<Text>Xenition</Text>}
        columns={[
          {
            title: 'Product',
            links: [
              { label: 'Pricing', onPress },
              { label: 'Docs' },
            ],
          },
        ]}
        bottom={<Text>© 2026 Xenition</Text>}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Xenition')).toBeTruthy();
    expect(queryByText('Product')).toBeTruthy();
    expect(queryByText('© 2026 Xenition')).toBeTruthy();
    fireEvent.press(getByText('Pricing'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
