/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { ParticleField, computeParticles } from './ParticleField';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const sheet = (): string => document.getElementById('xen-particle-styles')?.textContent ?? '';

describe('computeParticles (deterministic layout)', () => {
  it('is pure: same (mood, density, seed) always yields the same layout', () => {
    const a = computeParticles('ember', 18, 1);
    const b = computeParticles('ember', 18, 1);
    expect(a).toEqual(b);
  });

  it('different seeds yield different layouts', () => {
    const a = computeParticles('ember', 18, 1);
    const b = computeParticles('ember', 18, 2);
    expect(a).not.toEqual(b);
  });

  it('clamps density to 0–80', () => {
    expect(computeParticles('snow', -5, 1)).toHaveLength(0);
    expect(computeParticles('snow', 500, 1)).toHaveLength(80);
    expect(computeParticles('snow', 24, 1)).toHaveLength(24);
  });

  it('respects mood tuning ranges (sparks smaller and faster than embers)', () => {
    const sparks = computeParticles('sparks', 30, 3);
    const embers = computeParticles('ember', 30, 3);
    for (const p of sparks) {
      expect(parseFloat(p.size)).toBeLessThanOrEqual(4.5);
      expect(parseFloat(p.duration)).toBeLessThanOrEqual(9);
    }
    const maxEmberSize = Math.max(...embers.map((p) => parseFloat(p.size)));
    expect(maxEmberSize).toBeGreaterThan(4.5);
  });
});

describe('ParticleField', () => {
  it('is decorative and renders the seeded particle spans', () => {
    const { container } = render(<ParticleField />);
    const root = container.querySelector('[data-xen-particles]');
    expect(root?.getAttribute('aria-hidden')).toBe('true');
    expect(root?.getAttribute('data-xen-particles')).toBe('ember');
    expect(container.querySelectorAll('[data-xen-particle]')).toHaveLength(18);
    expect(sheet()).toContain('pointer-events: none');
  });

  it('renders identical markup for identical seeds (SSR === client)', () => {
    const a = render(<ParticleField mood="fireflies" density={12} seed={7} />);
    const b = render(<ParticleField mood="fireflies" density={12} seed={7} />);
    expect(a.container.innerHTML).toBe(b.container.innerHTML);
    const c = render(<ParticleField mood="fireflies" density={12} seed={8} />);
    expect(c.container.innerHTML).not.toBe(a.container.innerHTML);
  });

  it('colors every mood exclusively from ramp variables', () => {
    for (const mood of ['ember', 'snow', 'fireflies', 'sparks'] as const) {
      render(<ParticleField mood={mood} density={4} />);
    }
    const css = sheet();
    expect(css).toContain(
      '[data-xen-particles="ember"] [data-xen-particle]'
    );
    expect(css).toContain('var(--xen-accent-100)');
    expect(css).toContain('var(--xen-neutral-50)');
    expect(css).toContain('var(--xen-accent-500)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('moves particles per mood: rise, fall, or blink keyframes', () => {
    render(<ParticleField />);
    const css = sheet();
    expect(css).toContain('@keyframes xen-particle-rise');
    expect(css).toContain('@keyframes xen-particle-fall');
    expect(css).toContain('@keyframes xen-particle-blink');
    expect(css).toContain('animation-name: xen-particle-fall');
  });

  it('freezes into a static scatter under prefers-reduced-motion', () => {
    render(<ParticleField />);
    const css = sheet();
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('animation: none !important');
    // rest pose is deterministic per particle via the unitless y factor
    expect(css).toContain('var(--xen-particle-yn)');
  });

  it('carries geometry only in inline styles — no hex anywhere', () => {
    const { container } = render(<ParticleField mood="sparks" density={10} seed={3} />);
    const styles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(styles.length).toBeGreaterThan(0);
    expect(styles).not.toMatch(HEX_LITERAL);
    expect(styles).toContain('--xen-particle-x');
    expect(styles).toContain('--xen-particle-drift');
  });
});
