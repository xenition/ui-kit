/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Eyebrow } from './Eyebrow';
import { GlassPanel } from './GlassPanel';
import { GradientText } from './GradientText';
import { StatusDot } from './StatusDot';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const sheet = (id: string): string => document.getElementById(id)?.textContent ?? '';

describe('GradientText', () => {
  it('renders clipped gradient text from ramp variables only', () => {
    const { getByText } = render(
      <h1>
        Launch <GradientText>faster</GradientText>
      </h1>
    );
    const el = getByText('faster');
    expect(el.getAttribute('data-xen-gradient-text')).toBe('primary-accent');
    const css = sheet('xen-gradient-text-styles');
    expect(css).toContain('background-clip: text');
    expect(css).toContain('var(--xen-primary-300)');
    expect(css).toContain('var(--xen-accent-400)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('supports ramp recipes, custom angle, and element choice', () => {
    const { getByText } = render(
      <GradientText ramp="accent" angle={135} as="strong">
        hot
      </GradientText>
    );
    const el = getByText('hot');
    expect(el.tagName).toBe('STRONG');
    expect(el.getAttribute('data-xen-gradient-text')).toBe('accent');
    expect(el.getAttribute('style')).toContain('--xen-gradient-text-angle: 135deg');
    expect(sheet('xen-gradient-text-styles')).toContain('[data-xen-gradient-text="accent"]');
  });
});

describe('Eyebrow', () => {
  it('renders a tracked small-caps label on a semantic tone class', () => {
    const { getByText } = render(<Eyebrow>Now in beta</Eyebrow>);
    const el = getByText('Now in beta');
    expect(el.getAttribute('data-xen-eyebrow')).toBe('accent');
    expect(el.className).toContain('uppercase');
    expect(el.className).toContain('tracking-[0.22em]');
    expect(el.className).toContain('text-accent');
  });

  it('supports tones, centering, and decorative flanking rules', () => {
    const { getByText } = render(
      <Eyebrow tone="primary" align="center" rule>
        Features
      </Eyebrow>
    );
    const el = getByText('Features');
    expect(el.className).toContain('text-primary');
    expect(el.className).toContain('justify-center');
    const rules = el.querySelectorAll('span[aria-hidden="true"]');
    expect(rules).toHaveLength(2);
    for (const rule of Array.from(rules)) {
      expect(rule.className).toContain('bg-current');
    }
  });
});

describe('GlassPanel', () => {
  it('mixes the translucent surface from surface/border tokens', () => {
    const { container } = render(<GlassPanel>content</GlassPanel>);
    const el = container.querySelector('[data-xen-glass]');
    expect(el?.getAttribute('data-xen-glass')).toBe('regular');
    expect(el?.getAttribute('data-bordered')).toBe('true');
    const css = sheet('xen-glass-styles');
    expect(css).toContain('color-mix(in srgb, var(--xen-surface) 65%, transparent)');
    expect(css).toContain('color-mix(in srgb, var(--xen-border) 60%, transparent)');
    expect(css).toContain('backdrop-filter: blur(12px)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('offers soft/strong intensities and a borderless mode', () => {
    const { container, rerender } = render(<GlassPanel intensity="soft" bordered={false} />);
    const el = container.querySelector('[data-xen-glass]');
    expect(el?.getAttribute('data-xen-glass')).toBe('soft');
    expect(el?.getAttribute('data-bordered')).toBe('false');
    rerender(<GlassPanel intensity="strong" />);
    expect(container.querySelector('[data-xen-glass="strong"]')).not.toBeNull();
    expect(sheet('xen-glass-styles')).toContain('[data-xen-glass="strong"]');
  });
});

describe('StatusDot', () => {
  it('renders a semantic-toned dot with a pulsing echo', () => {
    const { container } = render(<StatusDot />);
    const dot = container.querySelector('[data-xen-status-dot]');
    expect(dot?.getAttribute('data-xen-status-dot')).toBe('success');
    expect(dot?.getAttribute('aria-hidden')).toBe('true');
    expect(dot?.querySelector('[data-xen-status-echo]')).not.toBeNull();
    const css = sheet('xen-status-dot-styles');
    expect(css).toContain('@keyframes xen-status-echo');
    expect(css).toContain('var(--xen-success)');
    expect(css).not.toMatch(HEX_LITERAL);
  });

  it('honors tone, pulse=false, and an accessible label', () => {
    const { container, getByRole } = render(
      <StatusDot tone="danger" pulse={false} label="Offline" />
    );
    const dot = getByRole('img', { name: 'Offline' });
    expect(dot.getAttribute('data-xen-status-dot')).toBe('danger');
    expect(container.querySelector('[data-xen-status-echo]')).toBeNull();
    expect(sheet('xen-status-dot-styles')).toContain('var(--xen-danger)');
  });

  it('kills the echo animation under prefers-reduced-motion (CSS rule)', () => {
    render(<StatusDot />);
    const css = sheet('xen-status-dot-styles');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('animation: none');
  });

  it('emits no hex literals in inline styles', () => {
    const { container } = render(
      <div>
        <GradientText>x</GradientText>
        <Eyebrow rule>y</Eyebrow>
        <GlassPanel />
        <StatusDot tone="accent" />
      </div>
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
