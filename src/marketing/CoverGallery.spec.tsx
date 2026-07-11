/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { CoverGallery } from './CoverGallery';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const WORKS = [
  { seed: 'aurora', form: 'wave' as const, ink: 'primary-700', caption: 'Aurora Study', meta: 'Oil, 2025', href: '/works/aurora' },
  { seed: 'monolith', form: 'stack' as const, caption: 'Monolith', meta: 'Bronze, 2024' },
  { seed: 'drift', form: 'orbit' as const, caption: 'Drift' },
];

describe('CoverGallery', () => {
  it('renders one image-free generative plate per item (no <img>)', () => {
    const { container } = render(<CoverGallery items={WORKS} />);
    expect(container.querySelectorAll('[data-xen-cover-tile]').length).toBe(3);
    // Image-free: covers are SVG GenerativeCovers, never <img>.
    expect(container.querySelector('img')).toBeNull();
  });

  it('renders captions and meta', () => {
    const { getByText, container } = render(<CoverGallery items={WORKS} />);
    expect(getByText('Aurora Study')).toBeTruthy();
    expect(container.querySelector('[data-xen-cover-meta]')?.textContent).toBe('Oil, 2025');
  });

  it('wraps a tile in a stretched link when href is set', () => {
    const { container } = render(<CoverGallery items={WORKS} />);
    const link = container.querySelector('a[href="/works/aurora"]');
    expect(link).not.toBeNull();
    // Stretched link overlay spans the (relative) figure.
    expect(link?.className).toContain('after:inset-0');
    expect(link?.getAttribute('aria-label')).toBe('Aurora Study');
  });

  it('omits the figcaption when neither caption nor meta is given', () => {
    const { container } = render(<CoverGallery items={[{ seed: 'x' }]} />);
    expect(container.querySelector('figcaption')).toBeNull();
  });

  it('applies the responsive column class', () => {
    const { container } = render(<CoverGallery items={WORKS} columns={4} />);
    expect(container.querySelector('[data-xen-cover-gallery]')?.className).toContain('lg:grid-cols-4');
  });

  it('uses only token roles — no literal hex', () => {
    const { container } = render(<CoverGallery items={WORKS} aspect={0.75} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});
