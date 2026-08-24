/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { BentoCard, BentoGrid } from './Bento';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const sheet = (): string => document.getElementById('xen-bento-styles')?.textContent ?? '';

describe('BentoGrid / BentoCard', () => {
  it('renders an asymmetric span-configured grid (4/2 over 2/4)', () => {
    const { container } = render(
      <BentoGrid>
        <BentoCard span={4} title="Live streams" />
        <BentoCard span={2} title="Radar" />
        <BentoCard span={2} title="Rewind" />
        <BentoCard span={4} title="Broadcast" />
      </BentoGrid>
    );
    expect(
      container.querySelector('[data-xen-bento-grid]')?.getAttribute('style')
    ).toContain('--xen-bento-cols: 6');
    const cards = container.querySelectorAll<HTMLElement>('[data-xen-bento-card]');
    expect(cards).toHaveLength(4);
    expect(cards[0]?.getAttribute('style')).toContain('--xen-bento-span: 4');
    expect(cards[1]?.getAttribute('style')).toContain('--xen-bento-span: 2');
    const css = sheet();
    expect(css).toContain('repeat(var(--xen-bento-cols, 6), minmax(0, 1fr))');
    expect(css).toContain('span var(--xen-bento-span, 2)');
  });

  it('supports custom column counts and row spans', () => {
    const { container } = render(
      <BentoGrid columns={4}>
        <BentoCard span={2} rowSpan={2} title="Tall" />
      </BentoGrid>
    );
    expect(
      container.querySelector('[data-xen-bento-grid]')?.getAttribute('style')
    ).toContain('--xen-bento-cols: 4');
    expect(
      container.querySelector('[data-xen-bento-card]')?.getAttribute('style')
    ).toContain('--xen-bento-row: 2');
  });

  it('renders all card slots: icon tile, metric chip, title, body, visual, detail', () => {
    const { getByText, container } = render(
      <BentoGrid>
        <BentoCard
          icon={<svg data-testid="icon" />}
          metric="38ms p99"
          title="Instant"
          visual={<div data-testid="visual" />}
          detail="Zero sampled, zero dropped"
        >
          Everything updates in real time.
        </BentoCard>
      </BentoGrid>
    );
    expect(container.querySelector('[data-xen-bento-icon] svg')).not.toBeNull();
    expect(getByText('38ms p99')).toBeTruthy();
    expect(getByText('Instant').tagName).toBe('H3');
    expect(getByText('Everything updates in real time.')).toBeTruthy();
    expect(container.querySelector('[data-xen-bento-visual]')).not.toBeNull();
    expect(getByText('Zero sampled, zero dropped')).toBeTruthy();
    const css = sheet();
    expect(css).toContain('linear-gradient(135deg, var(--xen-primary-600), var(--xen-accent-600))');
    expect(css).toContain('color: var(--xen-on-primary)');
  });

  it('applies the token energy wash on hover by default and can disable it', () => {
    const { container, rerender } = render(
      <BentoGrid>
        <BentoCard title="A" />
      </BentoGrid>
    );
    expect(
      container.querySelector('[data-xen-bento-card]')?.getAttribute('data-wash')
    ).toBe('true');
    const css = sheet();
    expect(css).toContain('[data-xen-bento-card][data-wash="true"]:hover::after { opacity: 1; }');
    expect(css).toContain('color-mix(in srgb, var(--xen-primary-500) 14%, transparent)');

    rerender(
      <BentoGrid>
        <BentoCard title="A" wash={false} />
      </BentoGrid>
    );
    expect(
      container.querySelector('[data-xen-bento-card]')?.getAttribute('data-wash')
    ).toBe('false');
  });

  it('disables hover transitions under prefers-reduced-motion and emits no hex', () => {
    const { container } = render(
      <BentoGrid>
        <BentoCard title="A" metric="m" icon={<svg />} />
      </BentoGrid>
    );
    const css = sheet();
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('transition: none');
    expect(css).not.toMatch(HEX_LITERAL);
    const styles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(styles).not.toMatch(HEX_LITERAL);
  });
});
