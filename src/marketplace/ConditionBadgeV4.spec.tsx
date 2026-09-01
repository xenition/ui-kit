/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ConditionBadgeV4, CONDITION_V4_LABEL } from './ConditionBadgeV4';
import type { Condition } from './internal';

const chip = (ui: ReactElement): HTMLElement => {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-condition-badge]') as HTMLElement;
};

const GRADES: Condition[] = ['new', 'like-new', 'used', 'refurb'];

describe('ConditionBadgeV4 (web)', () => {
  // ── rule 6: an icon AND a word ─────────────────────────────────────

  it('ships a glyph and a word for every grade', () => {
    for (const grade of GRADES) {
      const el = chip(<ConditionBadgeV4 condition={grade} />);
      const text = el.textContent ?? '';
      // The word is always there…
      expect(text).toContain(CONDITION_V4_LABEL[grade]);
      // …and something precedes it that is not part of the word.
      expect(text.replace(CONDITION_V4_LABEL[grade], '').trim().length).toBeGreaterThan(0);
    }
  });

  it('never spends a status colour on a grade (rule 3)', () => {
    for (const grade of GRADES) {
      const el = chip(<ConditionBadgeV4 condition={grade} />);
      const cls = el.className;
      expect(cls).not.toMatch(/success/);
      expect(cls).not.toMatch(/warn/);
      expect(cls).not.toMatch(/danger/);
    }
  });

  it('gives `refurb` the accent tone on the web too — the twins agreed at last', () => {
    const el = chip(<ConditionBadgeV4 condition="refurb" />);
    expect(el.className).toMatch(/accent/);
  });

  // ── the new props ──────────────────────────────────────────────────

  it('honours `variant` on the web, which the base accepted and ignored', () => {
    expect(chip(<ConditionBadgeV4 condition="used" />).getAttribute('data-xen-v4-badge')).toBe('soft');
    expect(
      chip(<ConditionBadgeV4 condition="used" variant="outline" />).getAttribute('data-xen-v4-badge')
    ).toBe('outline');
    expect(
      chip(<ConditionBadgeV4 condition="used" variant="solid" />).getAttribute('data-xen-v4-badge')
    ).toBe('solid');
  });

  it('honours `size` on the web, which the base also dropped on the floor', () => {
    const md = chip(<ConditionBadgeV4 condition="used" />).className;
    const sm = chip(<ConditionBadgeV4 condition="used" size="sm" />).className;
    expect(md).not.toEqual(sm);
  });

  it('`showIcon={false}` drops the glyph and keeps the word', () => {
    const el = chip(<ConditionBadgeV4 condition="new" showIcon={false} />);
    expect(el.textContent).toBe('New');
  });

  it('`label` overrides the word', () => {
    expect(chip(<ConditionBadgeV4 condition="used" label="Pre-loved" />).textContent).toContain(
      'Pre-loved'
    );
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('an empty `label` falls back to the grade rather than leaving a bare tick', () => {
    const el = chip(<ConditionBadgeV4 condition="refurb" label="" />);
    expect(el.textContent).toContain('Refurbished');
  });

  it('an unrecognised grade renders neutral with the raw value, not an empty chip', () => {
    const el = chip(<ConditionBadgeV4 condition={'auction-lot' as Condition} />);
    expect(el.textContent).toContain('auction-lot');
    expect(el.className).not.toMatch(/danger|warn|success/);
  });

  // ── the accessible label ───────────────────────────────────────────

  it('announces the words alone — "sparkles New" on every card in a grid is noise', () => {
    const el = chip(<ConditionBadgeV4 condition="new" />);
    expect(el.getAttribute('aria-label')).toBe('New');
    // …and the glyph is still on screen.
    expect(el.textContent).not.toBe('New');
  });

  it('lets a caller override the accessible name', () => {
    const el = chip(<ConditionBadgeV4 condition="used" aria-label="Condition: used" />);
    expect(el.getAttribute('aria-label')).toBe('Condition: used');
  });
});
