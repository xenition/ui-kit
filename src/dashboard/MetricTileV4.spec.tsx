/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { MetricTileV4, METRIC_TILE_V4_STYLE_ID } from './MetricTileV4';
import { V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function tile(ui: ReactElement): HTMLElement | null {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-metric-tile]');
}

/** The sheet this component injects — where the `card` ground override lives. */
function sheet(): string {
  return document.getElementById(METRIC_TILE_V4_STYLE_ID)?.textContent ?? '';
}

describe('MetricTileV4 (web)', () => {
  // ── §4.2: the card ground ──────────────────────────────────────────

  it('paints `card`, not the page colour — the pass’s headline fix', () => {
    const el = tile(<MetricTileV4 label="Open" value={12} />) as HTMLElement;

    // It really is a `CardV4` (the recipe is composed, not re-rolled)…
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    // …and the ground is overridden on top of it by specificity rather than
    // by class order: two attributes (0-2-0) beat CardV4's `.bg-surface`
    // (0-1-0) wherever the two sheets happen to land.
    const css = sheet();
    expect(css).toContain('[data-xen-v4-card][data-xen-v4-metric-tile]');
    expect(css).toContain('background-color: var(--xen-card)');
    expect(css).toContain('color: var(--xen-on-card)');
    expect(css).not.toContain('var(--xen-surface)');
  });

  it('drops the border — a hairline box inside a hairline box is the ruled look §3 rules out', () => {
    expect(sheet()).toContain('border-color: transparent');
    // …while keeping the 1px, so a raised tile and a flat one are the same
    // size to the pixel.
    const el = tile(<MetricTileV4 label="Open" value={12} />) as HTMLElement;
    expect(el.className).toContain('border');
  });

  // ── §5: the tone is a *Text slot, not a fill ───────────────────────

  it('inks the value with the contrast-corrected TEXT slot — the web twin catches up', () => {
    const cases = [
      ['primary', 'text-primary-text', 'text-primary'],
      ['success', 'text-success-text', 'text-success'],
      ['warn', 'text-warn-text', 'text-warn'],
      ['danger', 'text-danger-text', 'text-danger'],
    ] as const;
    for (const [tone, want, fill] of cases) {
      const el = tile(<MetricTileV4 label="Open" value={12} tone={tone} />) as HTMLElement;
      const value = el.querySelector('.text-2xl') as HTMLElement;
      expect(value.className).toContain(want);
      // The fill was measured at 2.32:1 as ink; it must not survive.
      expect(value.className.split(' ')).not.toContain(fill);
    }
  });

  it('inks a neutral value on the card’s own pair, not the page’s', () => {
    const el = tile(<MetricTileV4 label="Open" value={12} />) as HTMLElement;
    const value = el.querySelector('.text-2xl') as HTMLElement;
    expect(value.className).toContain('text-on-card');
    expect(value.className.split(' ')).not.toContain('text-on-surface');
  });

  // ── §3 / §4.1: the ramp and the anatomy ────────────────────────────

  it('puts a `sm` `mutedText` label ABOVE a `2xl` bold value', () => {
    const el = tile(<MetricTileV4 label="Open" value={12} />) as HTMLElement;
    const label = el.querySelector('.text-sm') as HTMLElement;
    const value = el.querySelector('.text-2xl') as HTMLElement;
    expect(label.textContent).toBe('Open');
    expect(label.className).toContain('text-muted-text');
    // `muted` is a FILL and carries no contrast promise as ink (§4.3). The
    // base set this label in it, at `xs`, beside the icon.
    expect(label.className.split(' ')).not.toContain('text-muted');
    expect(el.querySelector('.text-xs')).toBeNull();
    expect(value.className).toContain('font-bold');
    expect(label.compareDocumentPosition(value)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('renders `iconName` in a soft tinted circular badge, `icon` in the same 44 slot', () => {
    const named = tile(<MetricTileV4 label="Open" value={1} iconName="chart" />) as HTMLElement;
    const badge = named.querySelector('[data-xen-v4-icon]') as HTMLElement;
    expect(badge.getAttribute('data-badge')).toBe('soft');
    expect(badge.getAttribute('data-shape')).toBe('circle');

    const custom = tile(
      <MetricTileV4 label="Open" value={1} icon={<svg data-testid="art" />} />
    ) as HTMLElement;
    const slot = custom.querySelector('span.inline-flex') as HTMLElement;
    expect(slot.querySelector('svg')).not.toBeNull();
    expect(slot.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  // ── §4.3 / §1.7: press feedback is the state layer ─────────────────

  it('replaces `hover:opacity-80` with the state layer, on the card’s own pair', () => {
    const el = tile(<MetricTileV4 label="Open" value={1} />) as HTMLElement;
    expect(el.className).not.toContain('opacity');

    const onClick = jest.fn();
    const pressable = tile(
      <MetricTileV4 label="Open" value={1} onClick={onClick} />
    ) as HTMLElement;
    expect(pressable.className).not.toContain('hover:opacity-80');
    expect(pressable.hasAttribute('data-xen-v4-state')).toBe(true);
    // Opaque, and named: the value's contrast is a promise about `card`.
    expect(pressable.style.getPropertyValue('--xen-v4-state-ground')).toBe('var(--xen-card)');
    expect(pressable.style.getPropertyValue('--xen-v4-state-ink')).toBe('var(--xen-on-card)');
    expect(document.getElementById(V4_STATE_STYLE_ID)).not.toBeNull();
  });

  it('is an operable button when `onClick` is set — pointer and keyboard alike', () => {
    const onClick = jest.fn();
    const el = tile(<MetricTileV4 label="Open" value={1} onClick={onClick} />) as HTMLElement;
    expect(el.getAttribute('role')).toBe('button');
    expect(el.tabIndex).toBe(0);
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: 'Enter' });
    fireEvent.keyDown(el, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
    fireEvent.keyDown(el, { key: 'a' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('is not a control at all without `onClick`', () => {
    const el = tile(<MetricTileV4 label="Open" value={1} />) as HTMLElement;
    expect(el.getAttribute('role')).toBeNull();
    expect(el.hasAttribute('data-xen-v4-state')).toBe(false);
  });

  // ── §4.6: elevation ────────────────────────────────────────────────

  it('is flat by default — it is the tile INSIDE a card — and raised on request', () => {
    expect((tile(<MetricTileV4 label="a" value={1} />) as HTMLElement).getAttribute('data-raised')).toBe(
      'false'
    );
    expect(
      (tile(<MetricTileV4 label="a" value={1} raised />) as HTMLElement).getAttribute('data-raised')
    ).toBe('true');
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING when it has neither a label nor a value', () => {
    expect(tile(<MetricTileV4 label="" value="" />)).toBeNull();
    expect(tile(<MetricTileV4 label="" value={undefined as unknown as string} />)).toBeNull();
  });

  it('survives a half-empty tile rather than drawing a blank box', () => {
    const labelOnly = tile(<MetricTileV4 label="Open" value="" />) as HTMLElement;
    expect(labelOnly.textContent).toBe('Open');
    expect(labelOnly.querySelector('.text-2xl')).toBeNull();

    const valueOnly = tile(<MetricTileV4 label="" value={12} />) as HTMLElement;
    expect(valueOnly.textContent).toBe('12');
    expect(valueOnly.querySelector('.text-sm')).toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('announces the metric and takes a className', () => {
    const el = tile(
      <MetricTileV4 label="Open" value={12} className="col-span-2" />
    ) as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('Open: 12');
    expect(el.className).toContain('col-span-2');
    expect(el.className).toContain('w-full');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    // No `iconName` here on purpose: a badged `IconV4` stamps compiled colours
    // as inline custom properties, which is the theme, not a literal.
    const el = tile(<MetricTileV4 label="Open" value={12} tone="success" raised />) as HTMLElement;
    // `CardV4` stamps the compiled `elevation.card` shadow as two inline
    // custom properties — that IS the theme, not a literal.
    const markup = el.outerHTML.replace(/--xen-v4-shadow-[ld]: [^;]+;/g, '');
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
    expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
