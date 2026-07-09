/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { installMatchMedia } from '../spec-support/mock-io';
import { OrnamentRule } from './OrnamentRule';
import { PriceList, PriceRow } from './PriceList';
import { SectionDivider } from './SectionDivider';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('OrnamentRule', () => {
  it('renders a separator with a centered diamond by default (accent-tinted)', () => {
    const { getByRole } = render(<OrnamentRule />);
    const rule = getByRole('separator');
    expect(rule.getAttribute('data-xen-ornament-rule')).toBe('diamond');
    expect(rule.getAttribute('data-tone')).toBe('accent');
    expect(rule.querySelector('[data-xen-ornament="diamond"]')).not.toBeNull();
    const css = sheet('xen-ornament-rule-styles');
    expect(css).toContain('transform: rotate(45deg)');
    expect(css).toContain('color-mix(in srgb, var(--xen-accent-400) 65%, transparent)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('supports dot/line/none ornaments and primary/border tones', () => {
    const { container, rerender } = render(<OrnamentRule ornament="dot" tone="primary" />);
    let rule = container.querySelector('[data-xen-ornament-rule]');
    expect(rule?.getAttribute('data-xen-ornament-rule')).toBe('dot');
    expect(rule?.getAttribute('data-tone')).toBe('primary');

    rerender(<OrnamentRule ornament="none" tone="border" />);
    rule = container.querySelector('[data-xen-ornament-rule]');
    expect(rule?.getAttribute('data-xen-ornament-rule')).toBe('none');
    const css = sheet('xen-ornament-rule-styles');
    expect(css).toContain('[data-xen-ornament-rule="none"] [data-xen-ornament] { display: none; }');
    expect(css).toContain('var(--xen-border)');
    expect(css).toContain('var(--xen-primary-400)');
  });
});

describe('PriceList / PriceRow', () => {
  it('renders group heading, ornament, and dotted-leader rows', () => {
    const { getByText, container } = render(
      <PriceList heading="From the Hearth">
        <PriceRow
          name="Ember-roasted chicken"
          price="$34"
          description="Half bird, burnt lemon, pan drippings."
        />
        <PriceRow name="Coal-baked flatbread" price="$12" />
      </PriceList>
    );
    expect(getByText('From the Hearth')).toBeTruthy();
    expect(container.querySelector('[data-xen-ornament-rule]')).not.toBeNull();
    expect(container.querySelectorAll('[data-xen-price-row]')).toHaveLength(2);
    expect(getByText('Ember-roasted chicken').tagName).toBe('H3');
    expect(getByText('$34')).toBeTruthy();
    expect(getByText('Half bird, burnt lemon, pan drippings.')).toBeTruthy();
  });

  it('keeps the leader decorative and accent-dotted from tokens', () => {
    const { container } = render(
      <PriceList>
        <PriceRow name="Item" price="$9" />
      </PriceList>
    );
    const leader = container.querySelector('[data-xen-price-leader]');
    expect(leader?.getAttribute('aria-hidden')).toBe('true');
    const css = sheet('xen-price-styles');
    expect(css).toContain('border-bottom: 1px dotted color-mix(in srgb, var(--xen-accent-400) 40%, transparent)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('supports heading-level override and ornament=none', () => {
    const { container, getByText } = render(
      <PriceList ornament="none">
        <PriceRow name="Quiet row" price="$1" as="h4" />
      </PriceList>
    );
    expect(container.querySelector('[data-xen-ornament-rule]')).toBeNull();
    expect(getByText('Quiet row').tagName).toBe('H4');
  });
});

describe('SectionDivider', () => {
  beforeEach(() => {
    installMatchMedia(false);
  });

  it('renders a token-gradient hairline separator by default', () => {
    const { getByRole } = render(<SectionDivider />);
    const divider = getByRole('separator');
    expect(divider.getAttribute('data-xen-section-divider')).toBe('hairline');
    const css = sheet('xen-section-divider-styles');
    expect(css).toContain('color-mix(in srgb, var(--xen-primary-500) 55%, transparent)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('delegates the ornament variant to OrnamentRule', () => {
    const { container } = render(
      <SectionDivider variant="ornament" ornament="dot" tone="primary" />
    );
    const rule = container.querySelector('[data-xen-ornament-rule]');
    expect(rule?.getAttribute('data-xen-ornament-rule')).toBe('dot');
    expect(rule?.getAttribute('data-tone')).toBe('primary');
  });

  it('renders a surface fade variant', () => {
    const { container } = render(<SectionDivider variant="fade" />);
    expect(container.querySelector('[data-xen-section-divider="fade"]')).not.toBeNull();
    expect(sheet('xen-section-divider-styles')).toContain(
      'linear-gradient(to bottom, transparent, var(--xen-surface))'
    );
  });

  it('wraps in Parallax only when a parallax speed is requested', () => {
    const plain = render(<SectionDivider />);
    expect(plain.container.querySelector('[data-xen-parallax]')).toBeNull();
    const drifting = render(<SectionDivider parallax={0.2} />);
    expect(drifting.container.querySelector('[data-xen-parallax]')).not.toBeNull();
    expect(
      drifting.container.querySelector('[data-xen-parallax] [role="separator"]')
    ).not.toBeNull();
  });
});
