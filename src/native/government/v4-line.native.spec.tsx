/**
 * The **V4 government line** (native) — the twin of
 * `government/v4-line.spec.tsx`. The civic pass is the same pure module, so
 * the status, reason and identifier findings are pinned once and hold on both
 * sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { isAdverse, labelledId, statusSentence } from '../../government/civic-v4';
import { PermitStatusV4 } from './PermitStatusV4';
import { ServiceCardV4 } from './ServiceCardV4';

describe('civic-v4', () => {
  it('always yields a status, with or without a position', () => {
    // The finding. The status label was gated on `updatedDate`, an *optional*
    // prop, so <PermitStatus status="review" title="Building permit" />
    // rendered a card in which "Under review" appeared nowhere at all.
    expect(statusSentence('Under review', 1, 4)).toBe('Under review, step 2 of 4');
    expect(statusSentence('Under review', undefined, undefined)).toBe('Under review');
    expect(statusSentence('Issued', 3, 4)).toBe('Issued, step 4 of 4');
  });

  it('clamps a step into its own tracker', () => {
    expect(statusSentence('X', 99, 4)).toBe('X, step 4 of 4');
    expect(statusSentence('X', -4, 4)).toBe('X, step 1 of 4');
    // No total is no position, not a division.
    expect(statusSentence('X', 1, 0)).toBe('X');
  });

  it('takes the caller\'s phrasing', () => {
    expect(statusSentence('Filed', 0, 3, (l, s, t) => `${l} (${s}/${t})`)).toBe('Filed (1/3)');
  });

  it('knows which states owe the reader a reason', () => {
    // Five components carry a rejection state and not one had a field for why.
    expect(isAdverse('denied')).toBe(true);
    expect(isAdverse('rejected')).toBe(true);
    expect(isAdverse('suspended')).toBe(true);
    expect(isAdverse('action-needed')).toBe(true);
    expect(isAdverse('no-show')).toBe(true);
    expect(isAdverse('overdue')).toBe(true);
    // The ordinary path owes nothing.
    expect(isAdverse('approved')).toBe(false);
    expect(isAdverse('review')).toBe(false);
    expect(isAdverse('issued')).toBe(false);
  });

  it('labels an identifier so it is not a bare string of digits', () => {
    // Six components rendered a permit, form, request, ticket, case or queue
    // number with no visible or accessible label at all.
    expect(labelledId('Permit', 'BLD-2026-0417')).toBe('Permit BLD-2026-0417');
    expect(labelledId('Permit', '  ')).toBeUndefined();
    expect(labelledId('Permit', undefined)).toBeUndefined();
  });
});

describe('PermitStatusV4 — the headline', () => {
  it('renders the status without being handed a date', () => {
    // "Under review" now appears twice — the step marker *and* the status
    // line the base only rendered when handed a date. Both are the fix.
    const { getAllByText } = renderThemed(
      <PermitStatusV4 status="review" title="Building permit" />,
      SEED_LIGHT
    );
    expect(getAllByText(/review/i).length).toBeGreaterThan(1);
  });

  it('carries a denial reason, which the base had no field for', () => {
    const { getByText } = renderThemed(
      <PermitStatusV4
        status="denied"
        title="Building permit"
        reason="Setback is 1.2m short of the minimum."
      />,
      SEED_LIGHT
    );
    expect(getByText(/Setback is 1.2m short/)).toBeTruthy();
  });
});

describe('ServiceCardV4', () => {
  it('renders a service card', () => {
    const { getByText } = renderThemed(
      <ServiceCardV4 category="permit" title="Apply for a permit" />,
      SEED_LIGHT
    );
    expect(getByText('Apply for a permit')).toBeTruthy();
  });
});
