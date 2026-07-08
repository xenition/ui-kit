/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { AuroraBackground } from './AuroraBackground';

/**
 * Matches hex color literals (`#fff`, `#7C3AED`, …). Guards the kit's hard
 * token rule: marketing visuals may only use `var(--xen-*)` colors.
 */
const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const auroraSheet = (): string => document.getElementById('xen-aurora-styles')?.textContent ?? '';

describe('AuroraBackground', () => {
  it('is decorative (aria-hidden) and absolutely positioned', () => {
    const { container } = render(<AuroraBackground />);
    const root = container.querySelector('[data-xen-aurora]');
    expect(root?.getAttribute('aria-hidden')).toBe('true');
    expect(root?.className).toContain('absolute inset-0');
  });

  it('renders 4 drifting blobs for the aurora variant', () => {
    const { container } = render(<AuroraBackground variant="aurora" />);
    expect(container.querySelectorAll('[data-xen-aurora-blob]')).toHaveLength(4);
  });

  it('renders 4 corner blobs for the mesh variant', () => {
    const { container } = render(<AuroraBackground variant="mesh" />);
    expect(container.querySelectorAll('[data-xen-aurora-blob]')).toHaveLength(4);
  });

  it('renders 2 pulsing blobs for the radial variant', () => {
    const { container } = render(<AuroraBackground variant="radial" />);
    expect(container.querySelectorAll('[data-xen-aurora-blob]')).toHaveLength(2);
  });

  it('colors every blob exclusively from theme ramp variables (400–700)', () => {
    const { container } = render(<AuroraBackground variant="aurora" />);
    const blobs = Array.from(container.querySelectorAll<HTMLElement>('[data-xen-aurora-blob]'));
    expect(blobs.length).toBeGreaterThan(0);
    const sheet = auroraSheet();
    for (const blob of blobs) {
      const ramp = blob.getAttribute('data-xen-aurora-blob');
      expect(ramp).toMatch(/^(primary|accent)-[4-7]00$/);
      expect(sheet).toContain(
        `[data-xen-aurora-blob="${ramp}"] { background-image: radial-gradient(circle closest-side, var(--xen-${ramp}), transparent); }`
      );
    }
  });

  it('emits NO hex color literals in style attributes or the injected sheet (token rule)', () => {
    for (const variant of ['aurora', 'mesh', 'radial'] as const) {
      const { container } = render(
        <AuroraBackground variant={variant} grain pattern="dots" />
      );
      const styles = inlineStyles(container);
      expect(styles.length).toBeGreaterThan(0);
      expect(styles).not.toMatch(HEX_LITERAL);
    }
    expect(auroraSheet().length).toBeGreaterThan(0);
    expect(auroraSheet()).not.toMatch(HEX_LITERAL);
  });

  it('renders the grain overlay (inline feTurbulence data URI) only when requested', () => {
    const { container, rerender } = render(<AuroraBackground />);
    expect(container.querySelector('[data-xen-aurora-grain]')).toBeNull();
    rerender(<AuroraBackground grain />);
    expect(container.querySelector('[data-xen-aurora-grain]')).not.toBeNull();
    const sheet = auroraSheet();
    expect(sheet).toContain('[data-xen-aurora-grain]');
    expect(sheet).toContain('data:image/svg+xml');
    expect(sheet).toContain('feTurbulence');
  });

  it('renders a token-colored dots pattern', () => {
    const { container } = render(<AuroraBackground pattern="dots" />);
    expect(container.querySelector('[data-xen-aurora-pattern="dots"]')).not.toBeNull();
    expect(auroraSheet()).toContain(
      'radial-gradient(var(--xen-on-surface) 1px, transparent 1px)'
    );
  });

  it('renders a token-colored grid pattern (and none by default)', () => {
    const { container, rerender } = render(<AuroraBackground pattern="grid" />);
    expect(container.querySelector('[data-xen-aurora-pattern="grid"]')).not.toBeNull();
    expect(auroraSheet()).toContain('linear-gradient(var(--xen-border) 1px, transparent 1px)');
    rerender(<AuroraBackground />);
    expect(container.querySelector('[data-xen-aurora-pattern]')).toBeNull();
  });

  it('injects drift keyframes with a prefers-reduced-motion kill switch', () => {
    render(<AuroraBackground />);
    const css = auroraSheet();
    expect(css).toContain('@keyframes xen-aurora-a');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('animation: none');
  });
});
