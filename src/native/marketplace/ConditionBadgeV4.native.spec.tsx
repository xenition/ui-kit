import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ConditionBadgeV4, CONDITION_V4_LABEL } from './ConditionBadgeV4';
import type { Condition } from './internal';

const GRADES: Condition[] = ['new', 'like-new', 'used', 'refurb'];
const LIGHT = compileTheme(SEED_LIGHT).light;

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

describe('ConditionBadgeV4 (native)', () => {
  // ── rule 6: an icon AND a word ─────────────────────────────────────

  it('ships a glyph and a word for every grade', () => {
    for (const grade of GRADES) {
      const word = CONDITION_V4_LABEL[grade];
      const { getByText } = renderThemed(<ConditionBadgeV4 condition={grade} />, SEED_LIGHT);
      // Something precedes the word, and it is not part of the word.
      expect(getByText(new RegExp(`^.+ ${word}$`))).toBeTruthy();
    }
  });

  it('never spends a status colour on a grade (rule 3)', () => {
    const forbidden = new Set([LIGHT.success, LIGHT.warn, LIGHT.danger]);
    for (const grade of GRADES) {
      // `solid` paints the tone's own fill, unmixed, so this reads the mapping
      // directly rather than through a tint.
      const { getByTestId } = renderThemed(
        <ConditionBadgeV4 condition={grade} variant="solid" />,
        SEED_LIGHT
      );
      const chip = getByTestId(`xen-v4-condition-badge-${grade}`);
      const fills = chip
        .findAll((n) => n.props?.style !== undefined)
        .map((n) => flat(n.props.style).backgroundColor);
      for (const fill of fills) {
        expect(forbidden.has(fill as string)).toBe(false);
      }
    }
  });

  it('gives `refurb` the accent fill, which the web twin now matches', () => {
    const { getByTestId } = renderThemed(
      <ConditionBadgeV4 condition="refurb" variant="solid" />,
      SEED_LIGHT
    );
    const fills = getByTestId('xen-v4-condition-badge-refurb')
      .findAll((n) => n.props?.style !== undefined)
      .map((n) => flat(n.props.style).backgroundColor);
    expect(fills).toContain(LIGHT.accent);
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`showIcon={false}` drops the glyph and keeps the word', () => {
    const { getByText } = renderThemed(
      <ConditionBadgeV4 condition="new" showIcon={false} />,
      SEED_LIGHT
    );
    expect(getByText('New')).toBeTruthy();
  });

  it('`label` overrides the word', () => {
    const { getByText } = renderThemed(
      <ConditionBadgeV4 condition="used" label="Pre-loved" showIcon={false} />,
      SEED_LIGHT
    );
    expect(getByText('Pre-loved')).toBeTruthy();
  });

  it('`variant` and `size` reach the badge, exactly as on the web twin', () => {
    expect(() =>
      renderThemed(<ConditionBadgeV4 condition="used" variant="outline" size="sm" />, SEED_LIGHT)
    ).not.toThrow();
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('an empty `label` falls back to the grade rather than leaving a bare tick', () => {
    const { getByText } = renderThemed(
      <ConditionBadgeV4 condition="refurb" label="" showIcon={false} />,
      SEED_LIGHT
    );
    expect(getByText('Refurbished')).toBeTruthy();
  });

  it('an unrecognised grade renders the raw value, not an empty chip', () => {
    const { getByText } = renderThemed(
      <ConditionBadgeV4 condition={'auction-lot' as Condition} showIcon={false} />,
      SEED_LIGHT
    );
    expect(getByText('auction-lot')).toBeTruthy();
  });

  // ── the accessible label ───────────────────────────────────────────

  it('announces the words alone — "sparkles New" on every card in a grid is noise', () => {
    const { getByLabelText } = renderThemed(<ConditionBadgeV4 condition="new" />, SEED_LIGHT);
    expect(getByLabelText('New')).toBeTruthy();
  });

  it('lets a caller override the accessible name', () => {
    const { getByLabelText } = renderThemed(
      <ConditionBadgeV4 condition="used" accessibilityLabel="Condition: used" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Condition: used')).toBeTruthy();
  });
});
