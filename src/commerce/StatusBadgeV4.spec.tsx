/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { ICON_GLYPHS } from '../primitives/icon-names';
import { STATUS_PREFIX } from './internal/status-v4';
import { STATUS_ANATOMY, StatusBadgeV4 } from './StatusBadgeV4';
import type { OrderStatus } from './StatusBadge';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'sharp',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

const badge = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-v4-status-badge]') as HTMLElement;
const icon = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-v4-icon]') as HTMLElement;

const STATUSES = Object.keys(STATUS_ANATOMY) as OrderStatus[];

beforeEach(() => {
  installMatchMedia(false);
});

describe('StatusBadgeV4 (web)', () => {
  // ── rule 6: never colour alone ──────────────────────────────────────

  it('gives every status an icon AND a word', () => {
    STATUSES.forEach((status) => {
      const c = mount(<StatusBadgeV4 status={status} />);
      const glyph = ICON_GLYPHS[STATUS_ANATOMY[status].icon];
      expect(icon(c)).not.toBeNull();
      expect(icon(c).textContent).toBe(glyph);
      expect(badge(c).textContent).toContain(status.charAt(0).toUpperCase() + status.slice(1));
    });
  });

  it('stays legible with the colour removed — the greyscale read', () => {
    // The claim rule 6 actually makes: strip the tone and the six statuses are
    // still six different badges, because the glyph and the word carry them.
    const marks = STATUSES.map((s) => `${ICON_GLYPHS[STATUS_ANATOMY[s].icon]}|${s}`);
    expect(new Set(marks).size).toBe(STATUSES.length);
  });

  it('tints the glyph with the badge’s own on-pair, never with a fill slot', () => {
    STATUSES.forEach((status) => {
      const c = mount(<StatusBadgeV4 status={status} />);
      const ink = STATUS_ANATOMY[status].ink;
      const expected = {
        onSurface: 'text-on-surface',
        onPrimary: 'text-on-primary',
        onSuccess: 'text-on-success',
        onWarn: 'text-on-warn',
        onDanger: 'text-on-danger',
      }[ink];
      expect(icon(c).className).toContain(expected);
    });
  });

  it('keeps the semantic slots for what they mean — paid is not danger', () => {
    expect(STATUS_ANATOMY.paid.tone).toBe('success');
    expect(STATUS_ANATOMY.fulfilled.tone).toBe('success');
    expect(STATUS_ANATOMY.cancelled.tone).toBe('danger');
    expect(STATUS_ANATOMY.pending.tone).toBe('warn');
    expect(STATUS_ANATOMY.refunded.tone).toBe('neutral');
  });

  // ── it composes BadgeV4 ─────────────────────────────────────────────

  it('is a BadgeV4, so the shape follows the seed instead of defaulting to a pill', () => {
    const c = mount(<StatusBadgeV4 status="paid" />);
    expect(badge(c).getAttribute('data-xen-v4-badge')).toBe('solid');
    // A word is a tag: `radius.sm`, which a `sharp` seed makes square.
    expect(badge(c).className).toContain('rounded-[var(--xen-radius-sm)]');
    expect(badge(c).className).not.toContain('radius-full');
    // …and none of the base's re-rolled geometry survives.
    expect(badge(c).className).not.toContain('py-0.5');
  });

  it('keeps the base’s data attribute so an order summary can still query it', () => {
    const c = mount(<StatusBadgeV4 status="shipped" />);
    expect(badge(c).getAttribute('data-xen-status-badge')).toBe('shipped');
  });

  // ── the new props ───────────────────────────────────────────────────

  it('takes a glyph override without losing the word or the tone', () => {
    const c = mount(<StatusBadgeV4 status="shipped" iconName="location" />);
    expect(icon(c).textContent).toBe(ICON_GLYPHS.location);
    expect(badge(c).textContent).toContain('Shipped');
    expect(badge(c).getAttribute('data-xen-status-badge')).toBe('shipped');
  });

  it('takes the two badge sizes, defaulting to md', () => {
    const md = mount(<StatusBadgeV4 status="paid" />);
    const sm = mount(<StatusBadgeV4 status="paid" size="sm" />);
    expect(badge(md).className).toContain('min-h-[var(--xen-space-lg)]');
    expect(badge(sm).className).not.toContain('min-h-[var(--xen-space-lg)]');
  });

  it('lets a caller replace the word', () => {
    const c = mount(<StatusBadgeV4 status="fulfilled">Ready for pickup</StatusBadgeV4>);
    expect(badge(c).textContent).toContain('Ready for pickup');
    expect(badge(c).textContent).not.toContain('Fulfilled');
    expect(icon(c)).not.toBeNull();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('announces "Order status: X" rather than a bare word', () => {
    const c = mount(<StatusBadgeV4 status="paid" />);
    const hidden = badge(c).querySelector('.sr-only') as HTMLElement;
    expect(hidden.textContent).toBe(STATUS_PREFIX);
    // The glyph is `aria-hidden`, so what is announced is the tail of this.
    expect(badge(c).textContent).toBe(`${ICON_GLYPHS.check}${STATUS_PREFIX}Paid`);
  });

  it('leaves the glyph decorative so the emoji’s name is not read first', () => {
    const c = mount(<StatusBadgeV4 status="paid" />);
    expect(icon(c).getAttribute('aria-hidden')).toBe('true');
    expect(icon(c).getAttribute('aria-label')).toBeNull();
    expect(icon(c).getAttribute('role')).not.toBe('img');
  });

  // ── the empty case ──────────────────────────────────────────────────

  it('has no empty case that renders a blank pill — a status is always a word', () => {
    // `status` is required and the label falls back to the status itself, so
    // the badge can never be an empty coloured rectangle.
    const c = mount(<StatusBadgeV4 status="refunded">{undefined}</StatusBadgeV4>);
    expect(badge(c).textContent).toBe(`${ICON_GLYPHS.refresh}${STATUS_PREFIX}Refunded`);
    expect(icon(c).textContent).toBe(ICON_GLYPHS.refresh);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const c = mount(
      <StatusBadgeV4
        status="paid"
        id="sb"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(c.querySelector('#sb'));
  });
});
