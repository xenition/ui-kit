/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { GlassPanel } from './GlassPanel';
import { composeGlassCss } from '../theme/glass';

/** The stylesheet `GlassPanel` injects, whatever else is on the page. */
function glassCss(): string {
  return document.getElementById('xen-glass-styles')?.textContent ?? '';
}

describe('GlassPanel', () => {
  it('renders children and marks its intensity and border on the element', () => {
    const { getByText } = render(
      <GlassPanel intensity="strong" bordered={false}>
        panel body
      </GlassPanel>
    );
    const el = getByText('panel body');
    expect(el.getAttribute('data-xen-glass')).toBe('strong');
    expect(el.getAttribute('data-bordered')).toBe('false');
  });

  it('defaults to regular + bordered', () => {
    const { getByText } = render(<GlassPanel>body</GlassPanel>);
    const el = getByText('body');
    expect(el.getAttribute('data-xen-glass')).toBe('regular');
    expect(el.getAttribute('data-bordered')).toBe('true');
  });

  it('fills from the glass token, not from a hand-picked slice of surface', () => {
    render(<GlassPanel>body</GlassPanel>);
    const css = glassCss();
    // The pre-token recipe was `color-mix(in srgb, var(--xen-surface) 65%, transparent)`
    // — a number chosen beside the theme rather than derived from it.
    expect(css).not.toContain('var(--xen-surface) 65%, transparent');
    expect(css).toContain(`[data-xen-glass="soft"] { background-color: ${composeGlassCss('soft')}; }`);
    expect(css).toContain(
      `[data-xen-glass="regular"] { background-color: ${composeGlassCss('regular')}; }`
    );
    expect(css).toContain(
      `[data-xen-glass="strong"] { background-color: ${composeGlassCss('strong')}; }`
    );
  });

  it('takes its border and its blur radius from the tokens too', () => {
    render(<GlassPanel>body</GlassPanel>);
    const css = glassCss();
    expect(css).toContain('border: 1px solid var(--xen-glass-border)');
    expect(css).toContain('backdrop-filter: blur(var(--xen-glass-blur))');
    // The blur used to be a literal 12px, unrelated to the theme.
    expect(css).not.toContain('blur(12px)');
  });

  it('never falls below the theme’s translucency floor', () => {
    // `soft` is the token itself; `regular`/`strong` mix toward the opaque
    // surface. Nothing mixes toward `transparent`, which is what would put text
    // on the panel below AA over dark artwork.
    render(<GlassPanel>body</GlassPanel>);
    const css = glassCss();
    expect(css).not.toContain('transparent');
  });

  it('introduces no literal colors', () => {
    render(<GlassPanel>body</GlassPanel>);
    expect(glassCss()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(glassCss()).not.toMatch(/\brgba?\(/);
  });
});
