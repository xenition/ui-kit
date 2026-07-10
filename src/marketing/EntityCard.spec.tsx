/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { EntityCard } from './EntityCard';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('EntityCard', () => {
  it('renders a blog post (seed media fallback + date meta)', () => {
    const { container, getByText, getByRole } = render(
      <EntityCard
        title="Restyle by prompt"
        media={{ seed: 'restyle-by-prompt' }}
        meta="Mar 3, 2026"
        href="/blog/restyle"
      />
    );
    expect(getByText('Restyle by prompt').closest('h3')).not.toBeNull();
    // No imageUrl → a GenerativeCover (role=img via label) is drawn, not an <img>.
    expect(container.querySelector('img')).toBeNull();
    expect(getByRole('img', { name: 'Restyle by prompt' })).toBeTruthy();
    expect(container.querySelector('[data-xen-entity-meta]')?.textContent).toBe('Mar 3, 2026');
    // title + media link to href.
    expect(container.querySelectorAll('a[href="/blog/restyle"]').length).toBeGreaterThanOrEqual(1);
  });

  it('renders a service (price · duration meta)', () => {
    const { container } = render(
      <EntityCard title="Deep Tissue Massage" meta="$120 · 60 min" media={{ seed: 'massage' }} />
    );
    expect(container.querySelector('[data-xen-entity-meta]')?.textContent).toBe('$120 · 60 min');
  });

  it('renders a speaker (eyebrow=company, meta=talk)', () => {
    const { getByText } = render(
      <EntityCard
        title="Ada Lovelace"
        eyebrow="Analytical Engines Inc."
        meta="Keynote: Computing the Future"
        media={{ imageUrl: 'https://cdn.example/ada.jpg' }}
      />
    );
    expect(getByText('Analytical Engines Inc.')).toBeTruthy();
    expect(getByText('Keynote: Computing the Future')).toBeTruthy();
  });

  it('renders a listing (imageUrl media, Featured badge, price meta)', () => {
    const { container, getByText } = render(
      <EntityCard
        title="Loft in Mitte"
        eyebrow="Apartments"
        meta="$2,400 / mo"
        media={{ imageUrl: 'https://cdn.example/loft.jpg', aspect: 1.5 }}
        badge={<span>Featured</span>}
      />
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('src')).toBe('https://cdn.example/loft.jpg');
    expect(img?.getAttribute('alt')).toBe('Loft in Mitte');
    expect(container.querySelector('[data-xen-entity-badge]')?.textContent).toBe('Featured');
    expect(getByText('$2,400 / mo')).toBeTruthy();
    // custom aspect flows to the media box via a token custom property.
    expect(inlineStyles(container)).toContain('--xen-entity-aspect: 1.5');
  });

  it('renders a program (eyebrow + description + footer, no media)', () => {
    const { container, getByText } = render(
      <EntityCard
        title="Intro to Ceramics"
        eyebrow="Weekend Workshop"
        description="Six sessions covering wheel-throwing and glazing."
        footer={<button type="button">Enroll</button>}
      />
    );
    expect(getByText('Weekend Workshop')).toBeTruthy();
    expect(getByText('Six sessions covering wheel-throwing and glazing.')).toBeTruthy();
    expect(getByText('Enroll')).toBeTruthy();
    // no media descriptor → no media box, no cover.
    expect(container.querySelector('[role="img"]')).toBeNull();
    expect(container.querySelector('img')).toBeNull();
  });

  it('emits no hex literals across all five shapes', () => {
    const { container } = render(
      <div>
        <EntityCard title="Post" media={{ seed: 'p' }} meta="date" href="/x" />
        <EntityCard title="Service" meta="$1 · 1m" media={{ seed: 's' }} />
        <EntityCard title="Speaker" eyebrow="Co" meta="Talk" media={{ imageUrl: 'u' }} />
        <EntityCard title="Listing" eyebrow="Cat" meta="$1" media={{ imageUrl: 'u' }} badge={<span>Featured</span>} />
        <EntityCard title="Program" eyebrow="WS" description="d" footer={<span>go</span>} />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
