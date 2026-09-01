/** @jest-environment jsdom */
/**
 * The **V4 government line** (web) — the civic pass, and the finding this
 * module exists for: a permit whose status appeared nowhere at all.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { isAdverse, labelledId, statusSentence } from './civic-v4';
import { CivicAlertV4 } from './CivicAlertV4';
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
    // The base gated the only human-readable status on `updatedDate`.
    const { container } = render(<PermitStatusV4 status="review" title="Building permit" />);
    expect(container.textContent).toMatch(/review/i);
  });

  it('marks which step is current, rather than leaving it to colour', () => {
    const { container } = render(<PermitStatusV4 status="review" title="Building permit" />);
    expect(container.querySelector('[aria-current="step"]')).toBeTruthy();
  });

  it('carries a denial reason, which the base had no field for', () => {
    const { container } = render(
      <PermitStatusV4
        status="denied"
        title="Building permit"
        reason="Setback is 1.2m short of the minimum."
      />
    );
    expect(container.textContent).toContain('Setback is 1.2m short');
  });
});

describe('ServiceCardV4', () => {
  it('keeps Start out of the card\'s own activation', () => {
    // Space on Start started nothing and navigated away: the card's key
    // handler caught the bubbled keydown, preventDefault()ed the button's own
    // activation and fired the card instead.
    const onClick = jest.fn();
    const onStart = jest.fn();
    const { getByRole } = render(
      <ServiceCardV4
        category="permit"
        title="Apply for a permit"
        actionLabel="Start"
        onClick={onClick}
        onStart={onStart}
      />
    );
    const start = getByRole('button', { name: /Start/i });
    expect(start.closest('button')).toBe(start);

    fireEvent.click(start);
    expect(onStart).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('CivicAlertV4', () => {
  it('announces through a live region rather than a role present at mount', () => {
    // `role="alert"` on content that exists at first paint does not announce —
    // live regions announce *changes*.
    const { container } = render(
      <CivicAlertV4 severity="emergency" title="Flood warning" message="Evacuate via Route 9." />
    );
    expect(container.querySelector('[aria-live]')).toBeTruthy();
  });

  it('does not dismiss an emergency on one press', () => {
    const onDismiss = jest.fn();
    const { getAllByRole } = render(
      <CivicAlertV4 severity="emergency" title="Flood warning" onDismiss={onDismiss} />
    );
    const dismiss = getAllByRole('button').find((b) => /dismiss/i.test(b.getAttribute('aria-label') ?? ''));
    if (dismiss) {
      fireEvent.click(dismiss);
      expect(onDismiss).not.toHaveBeenCalled();
      fireEvent.click(dismiss);
      expect(onDismiss).toHaveBeenCalled();
    }
  });
});
