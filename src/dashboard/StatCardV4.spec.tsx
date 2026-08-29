/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { StatCardV4, STAT_CARD_V4_STYLE_ID } from './StatCardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function card(ui: ReactElement): HTMLElement | null {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container.querySelector('[data-xen-v4-stat-card]');
}

/** The sheet this component injects — where the `card` ground override lives. */
function sheet(): string {
  return document.getElementById(STAT_CARD_V4_STYLE_ID)?.textContent ?? '';
}

/** The delta line, which carries the trend ink and the direction glyph. */
function delta(root: HTMLElement): HTMLElement | null {
  return root.querySelector('[data-xen-v4-stat-delta]');
}

describe('StatCardV4 (web)', () => {
  // ── §4.2: the card ground ──────────────────────────────────────────

  it('paints `card`, not the page colour — the pass’s headline fix', () => {
    const el = card(<StatCardV4 label="Revenue" value="$12.4k" />) as HTMLElement;

    // It really is a `CardV4` (the recipe is composed, not re-rolled)…
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    // …and the ground is overridden on top of it, by specificity rather than
    // by class order: two attributes (0-2-0) beat CardV4's `.bg-surface`
    // (0-1-0) wherever the two sheets happen to land.
    const css = sheet();
    expect(css).toContain('[data-xen-v4-card][data-xen-v4-stat-card]');
    expect(css).toContain('background-color: var(--xen-card)');
    expect(css).toContain('color: var(--xen-on-card)');
    // The bug this pass exists to fix: the card must not be painted the same
    // colour as the page it sits on.
    expect(css).not.toContain('var(--xen-surface)');
  });

  it('inks the value on the card’s own pair, never on the page’s', () => {
    const el = card(<StatCardV4 label="Revenue" value="$12.4k" />) as HTMLElement;
    const value = el.querySelector('.text-3xl') as HTMLElement;
    expect(value.className).toContain('text-on-card');
    expect(value.className.split(' ')).not.toContain('text-on-surface');
  });

  // ── §3: the type ramp ──────────────────────────────────────────────

  it('sets the value as the loudest thing in the block, in tabular figures', () => {
    const el = card(<StatCardV4 label="Revenue" value="1,204" />) as HTMLElement;
    const value = el.querySelector('.text-3xl') as HTMLElement;
    expect(value.textContent).toBe('1,204');
    expect(value.className).toContain('font-bold');
    expect(value.className).toContain('[font-variant-numeric:tabular-nums]');
    // `2xl` ties the page title; §5 moves the value up a step.
    expect(el.querySelector('.text-2xl')).toBeNull();
  });

  it('puts a small calm label ABOVE the value, in `mutedText` and not the fill', () => {
    const el = card(<StatCardV4 label="Revenue" value="1,204" />) as HTMLElement;
    const label = el.querySelector('.text-sm') as HTMLElement;
    expect(label.textContent).toBe('Revenue');
    expect(label.className).toContain('text-muted-text');
    // `muted` is a FILL and carries no contrast promise as ink (§4.3).
    expect(label.className.split(' ')).not.toContain('text-muted');
    // Label first, value second — HIG's "short descriptive headline" order.
    expect(label.compareDocumentPosition(el.querySelector('.text-3xl') as HTMLElement)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('renders `caption` as the quiet "vs last month" line, below the delta', () => {
    const el = card(
      <StatCardV4 label="Revenue" value="1,204" delta="+12%" trend="up" caption="vs last month" />
    ) as HTMLElement;
    const caption = el.querySelector('.text-xs.text-muted-text') as HTMLElement;
    expect(caption.textContent).toBe('vs last month');
    expect((delta(el) as HTMLElement).compareDocumentPosition(caption)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  // ── the trend indicator is not colour alone ────────────────────────

  it('pairs the trend colour with a direction glyph, so colour is never the only signal', () => {
    const up = card(<StatCardV4 label="a" value="1" delta="+12%" trend="up" />) as HTMLElement;
    const upDelta = delta(up) as HTMLElement;
    expect(upDelta.className).toContain('text-success-text');
    expect(upDelta.querySelector('[data-xen-v4-icon]')).not.toBeNull();

    const down = card(<StatCardV4 label="a" value="1" delta="-3%" trend="down" />) as HTMLElement;
    const downDelta = delta(down) as HTMLElement;
    expect(downDelta.className).toContain('text-danger-text');
    expect(downDelta.querySelector('[data-xen-v4-icon]')).not.toBeNull();

    // The two directions must not draw the same mark, or the glyph adds
    // nothing and the indicator is colour-only after all.
    expect(upDelta.querySelector('[data-xen-v4-icon]')?.textContent).not.toBe(
      downDelta.querySelector('[data-xen-v4-icon]')?.textContent
    );
  });

  it('uses the contrast-corrected `*Text` slots, never the fills', () => {
    const up = card(<StatCardV4 label="a" value="1" delta="+1" trend="up" />) as HTMLElement;
    expect((delta(up) as HTMLElement).className.split(' ')).not.toContain('text-success');
    const down = card(<StatCardV4 label="a" value="1" delta="-1" trend="down" />) as HTMLElement;
    expect((delta(down) as HTMLElement).className.split(' ')).not.toContain('text-danger');
  });

  it('falls to a flat, muted delta when no direction was given', () => {
    const el = card(<StatCardV4 label="a" value="1" delta="0%" />) as HTMLElement;
    const flat = delta(el) as HTMLElement;
    expect(flat.className).toContain('text-muted-text');
    expect(flat.querySelector('[data-xen-v4-icon]')).not.toBeNull();
  });

  it('draws the direction through IconV4 — the literal ▲ / ▼ characters are gone', () => {
    const up = card(<StatCardV4 label="a" value="1" delta="+1" trend="up" />) as HTMLElement;
    const down = card(<StatCardV4 label="a" value="1" delta="-1" trend="down" />) as HTMLElement;
    expect(up.textContent).not.toContain('▲');
    expect(down.textContent).not.toContain('▼');
    // …and the mark is decorative: "▲ 12%" must be announced as "12%".
    expect(up.querySelector('[data-xen-v4-icon]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('omits the delta line entirely when there is no delta', () => {
    const el = card(<StatCardV4 label="a" value="1" />) as HTMLElement;
    expect(delta(el)).toBeNull();
  });

  // ── §4.7: the badge ────────────────────────────────────────────────

  it('renders `iconName` in a soft tinted circular badge at the top of the block', () => {
    const el = card(<StatCardV4 label="Revenue" value="1" iconName="chart" />) as HTMLElement;
    const badge = el.querySelector('[data-xen-v4-icon]') as HTMLElement;
    expect(badge.getAttribute('data-badge')).toBe('soft');
    expect(badge.getAttribute('data-shape')).toBe('circle');
    // Above the label — §3's order, not the base's top-right float.
    expect(badge.compareDocumentPosition(el.querySelector('.text-sm') as HTMLElement)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('tints the badge from the stat’s semantic family', () => {
    const ground = (tone?: 'success'): string => {
      const el = card(
        <StatCardV4 label="Earned" value="$1" iconName="chart" tone={tone} />
      ) as HTMLElement;
      const badge = el.querySelector('[data-xen-v4-icon]') as HTMLElement;
      return badge.style.getPropertyValue('--xen-v4-icon-ground-l');
    };
    // A compiled colour, not a literal — and `success` is a different wash
    // from the `primary` default, which is what "tinted by family" means.
    expect(ground()).not.toBe('');
    expect(ground('success')).not.toBe('');
    expect(ground('success')).not.toBe(ground());
  });

  it('keeps `icon` for parity, in the same 44 slot and drawn untinted', () => {
    const el = card(
      <StatCardV4 label="Revenue" value="1" icon={<svg data-testid="art" />} />
    ) as HTMLElement;
    const slot = el.querySelector('span.inline-flex') as HTMLElement;
    expect(slot.querySelector('svg')).not.toBeNull();
    // The 44 tap/badge square, composed from the scale — never a literal.
    expect(slot.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    expect(slot.className).toContain('min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  // ── §4.6: elevation ────────────────────────────────────────────────

  it('is raised on the page by default and flat inside another card', () => {
    const onPage = card(<StatCardV4 label="a" value="1" />) as HTMLElement;
    expect(onPage.getAttribute('data-raised')).toBe('true');
    const inCard = card(<StatCardV4 label="a" value="1" raised={false} />) as HTMLElement;
    expect(inCard.getAttribute('data-raised')).toBe('false');
  });

  // ── §4.5: the empty case ───────────────────────────────────────────

  it('renders NOTHING when it has neither a label nor a value', () => {
    expect(card(<StatCardV4 label="" value="" />)).toBeNull();
    expect(card(<StatCardV4 label="" value={undefined as unknown as string} />)).toBeNull();
  });

  it('survives a half-empty stat rather than drawing a blank box', () => {
    const labelOnly = card(<StatCardV4 label="Revenue" value="" />) as HTMLElement;
    expect(labelOnly.textContent).toBe('Revenue');
    expect(labelOnly.querySelector('.text-3xl')).toBeNull();

    const valueOnly = card(<StatCardV4 label="" value="1,204" />) as HTMLElement;
    expect(valueOnly.textContent).toBe('1,204');
    expect(valueOnly.querySelector('.text-sm')).toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('announces the stat, takes a className and forwards the rest', () => {
    const el = card(
      <StatCardV4 label="Revenue" value="$12.4k" delta="+12%" trend="up" className="col-span-2" id="kpi" />
    ) as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('Revenue: $12.4k, +12%');
    expect(el.className).toContain('col-span-2');
    expect(el.className).toContain('flex-col');
    expect(el.id).toBe('kpi');
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    // No `iconName` here on purpose: a badged `IconV4` stamps compiled colours
    // as inline custom properties, which is the theme, not a literal.
    const el = card(
      <StatCardV4 label="Revenue" value="$12.4k" delta="+12%" trend="up" caption="vs last month" />
    ) as HTMLElement;
    // `CardV4` stamps the compiled `elevation.card` shadow as two inline
    // custom properties. That IS the theme — a seed decision made once, and
    // the one that gets MORE opacity in dark — so it is excluded rather than
    // counted as a literal.
    const markup = el.outerHTML.replace(/--xen-v4-shadow-[ld]: [^;]+;/g, '');
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    expect(el.className).not.toMatch(/\[\d+px\]/);
    expect(sheet()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
