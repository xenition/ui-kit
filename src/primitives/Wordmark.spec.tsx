/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Wordmark } from './Wordmark';

describe('Wordmark', () => {
  it('renders the name with the default token logomark', () => {
    const { container, getByText } = render(<Wordmark name="Acme" />);
    expect(getByText('Acme')).toBeTruthy();
    // default mark square present, name in the heading font
    expect(container.querySelector('[data-xen-wordmark-mark]')).not.toBeNull();
    expect(container.querySelector('[data-xen-wordmark]')?.className).toContain('font-heading');
  });

  it('renders as a link with href when as="a", and honors a custom mark', () => {
    const { container, queryByText } = render(
      <Wordmark as="a" href="/home" name="Acme" mark={<i data-testid="custom" />} />
    );
    const root = container.querySelector('a[data-xen-wordmark]');
    expect(root?.getAttribute('href')).toBe('/home');
    // custom mark replaces the default square
    expect(container.querySelector('[data-testid="custom"]')).not.toBeNull();
    expect(container.querySelector('[data-xen-wordmark-mark]')).toBeNull();
    expect(queryByText('Acme')).toBeTruthy();
  });
});
