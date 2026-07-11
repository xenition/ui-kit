import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { FeatureGrid } from './FeatureGrid';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { PricingTable } from './PricingTable';
import { StatBar } from './StatBar';
import { LogoCloud } from './LogoCloud';

describe('FeatureGrid (native)', () => {
  it('renders every feature title + description', () => {
    const { queryByText } = renderThemed(
      <FeatureGrid
        features={[
          { icon: '★', title: 'Fast', description: 'Ships in milliseconds.' },
          { title: 'Themed', description: 'Token-driven styling.' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Fast')).toBeTruthy();
    expect(queryByText('Ships in milliseconds.')).toBeTruthy();
    expect(queryByText('Themed')).toBeTruthy();
  });
});

describe('Testimonials (native)', () => {
  it('renders quotes, authors, and an initials-fallback avatar', () => {
    const { queryByText } = renderThemed(
      <Testimonials
        items={[
          { quote: 'Best kit ever.', author: 'Ada Lovelace', role: 'Engineer' },
          { quote: 'Saved us weeks.', author: 'Grace Hopper' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Best kit ever.')).toBeTruthy();
    expect(queryByText('Ada Lovelace')).toBeTruthy();
    expect(queryByText('Engineer')).toBeTruthy();
    // Initials derived from the author name (no avatar node given). The initials
    // avatar is decorative (accessibilityElementsHidden), so include hidden nodes.
    expect(queryByText('GH', { includeHiddenElements: true })).toBeTruthy();
  });
});

describe('FAQ (native)', () => {
  it('hides answers until the question is pressed', () => {
    const { queryByText, getByText } = renderThemed(
      <FAQ
        items={[
          { question: 'Is it free?', answer: 'Yes, for open source.' },
          { question: 'Native ready?', answer: 'Fully.' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Is it free?')).toBeTruthy();
    expect(queryByText('Yes, for open source.')).toBeNull();
    fireEvent.press(getByText('Is it free?'));
    expect(queryByText('Yes, for open source.')).toBeTruthy();
  });
});

describe('PricingTable (native)', () => {
  it('renders plans + badge and fires the cta onPress', () => {
    const onPress = jest.fn();
    const { queryByText, getByLabelText, getByTestId } = renderThemed(
      <PricingTable
        plans={[
          {
            name: 'Pro',
            price: '$19',
            period: '/mo',
            features: ['Unlimited projects', 'Priority support'],
            highlighted: true,
            cta: { label: 'Start trial', onPress },
          },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Pro')).toBeTruthy();
    expect(queryByText('Unlimited projects')).toBeTruthy();
    expect(getByTestId('xen-pricing-badge')).toBeTruthy();
    fireEvent.press(getByLabelText('Start trial'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('StatBar (native)', () => {
  it('renders each stat label with prefix/suffix affixes', () => {
    const { queryByText, getAllByTestId } = renderThemed(
      <StatBar
        stats={[
          { value: 0, label: 'Uptime', suffix: '%' },
          { value: 0, label: 'Customers', prefix: '$' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(queryByText('Uptime')).toBeTruthy();
    expect(queryByText('Customers')).toBeTruthy();
    expect(getAllByTestId('xen-stat')).toHaveLength(2);
  });
});

describe('LogoCloud (native)', () => {
  it('renders a label and each logo slot', () => {
    const { queryByText, getAllByTestId } = renderThemed(
      <LogoCloud label="Trusted by" logos={['Acme', 'Globex', <Text key="k">Initech</Text>]} />,
      SEED_LIGHT
    );
    expect(queryByText('Trusted by')).toBeTruthy();
    expect(queryByText('Acme')).toBeTruthy();
    expect(queryByText('Initech')).toBeTruthy();
    expect(getAllByTestId('xen-logo')).toHaveLength(3);
  });
});
