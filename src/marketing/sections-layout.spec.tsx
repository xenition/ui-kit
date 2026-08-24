/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { FeatureSplit } from './FeatureSplit';
import { LocationBlock } from './LocationBlock';

describe('FeatureSplit', () => {
  it('renders title, description, and check-marked bullets', () => {
    const { container, getByText } = render(
      <FeatureSplit
        eyebrow="Why us"
        title="Ship faster"
        description="Everything you need."
        bullets={['No config', 'Themed by seed']}
      />
    );
    expect(getByText('Ship faster')).toBeTruthy();
    expect(getByText('Everything you need.')).toBeTruthy();
    expect(getByText('Why us')).toBeTruthy();
    const items = container.querySelectorAll('ul li');
    expect(items.length).toBe(2);
    // each bullet carries a check svg marker
    expect(container.querySelectorAll('ul li svg').length).toBe(2);
  });

  it('falls back to a GenerativeCover when media is omitted, and flips order when reversed', () => {
    const { container } = render(<FeatureSplit title="Alpha" reverse />);
    // seeded generative cover placeholder
    expect(container.querySelector('[data-xen-cover]')).not.toBeNull();
    expect(container.querySelector('[data-xen-feature-split-media]')?.className).toContain(
      'lg:order-2'
    );
  });

  it('uses the provided media instead of the placeholder', () => {
    const { container, getByTestId } = render(
      <FeatureSplit title="Beta" media={<img data-testid="shot" src="x.png" alt="" />} />
    );
    expect(getByTestId('shot')).toBeTruthy();
    expect(container.querySelector('[data-xen-cover]')).toBeNull();
  });
});

describe('LocationBlock', () => {
  it('renders address, an hours table, and contact links', () => {
    const { container, getByText } = render(
      <LocationBlock
        name="Cafe One"
        address="1 Main St"
        hours={[
          { label: 'Mon–Fri', value: '9–17' },
          { label: 'Sat', value: 'Closed' },
        ]}
        phone="+1 555 0100"
        email="hi@cafe.test"
      />
    );
    expect(getByText('Cafe One')).toBeTruthy();
    expect(container.querySelector('address')?.textContent).toBe('1 Main St');
    expect(container.querySelectorAll('table tbody tr').length).toBe(2);
    expect(container.querySelector('a[href="tel:+1 555 0100"]')).not.toBeNull();
    expect(container.querySelector('a[href="mailto:hi@cafe.test"]')).not.toBeNull();
    // a11y label on the section
    expect(
      container.querySelector('[data-xen-location-block]')?.getAttribute('aria-label')
    ).toContain('Cafe One');
  });

  it('renders a titled map iframe when mapSrc is given', () => {
    const { container } = render(
      <LocationBlock name="Cafe One" address="1 Main St" mapSrc="https://maps.example/embed" />
    );
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe('https://maps.example/embed');
    expect(iframe?.getAttribute('title')).toBe('Map of Cafe One');
    expect(iframe?.getAttribute('loading')).toBe('lazy');
  });

  it('renders a directions placeholder when no map is given', () => {
    const { container, getByText } = render(
      <LocationBlock address="1 Main St" directionsUrl="https://maps.example/dir" />
    );
    expect(container.querySelector('iframe')).toBeNull();
    const link = getByText('Get directions');
    expect(link.getAttribute('href')).toBe('https://maps.example/dir');
  });
});
