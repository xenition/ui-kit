/** @jest-environment jsdom */
/**
 * The **V4 hr line** (web) — the workforce pass, and the finding this module
 * exists for: Enter on Approve navigated away and left the request pending.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { deductionParts, hoursParts, isAdverse, ratingParts } from './workforce-v4';
import { LeaveRequestV4 } from './LeaveRequestV4';
import { PayslipRowV4 } from './PayslipRowV4';
import { PerformanceReviewV4 } from './PerformanceReviewV4';

describe('workforce-v4', () => {
  it('never draws more rating than it prints', () => {
    // The star row used `Math.round(rated)` while the text printed `rated`
    // raw, so 4.5 drew FIVE filled stars — a perfect score — beside the words
    // "4.5/5".
    const half = ratingParts(4.5, 5);
    expect(half.value).toBe(4.5);
    expect(half.filled).toBe(4);
    expect(half.partial).toBe(true);
  });

  it('survives a rating scale that arrived as NaN', () => {
    // `Math.max(1, Math.floor(NaN))` is NaN, and it reached both the visible
    // string and the accessible name as the literal text "NaN/NaN".
    const broken = ratingParts(4, Number.NaN);
    expect(Number.isNaN(broken.max)).toBe(false);
    expect(broken.max).toBe(5);
    expect(Number.isNaN(broken.value)).toBe(false);

    expect(ratingParts(Number.NaN, 5).value).toBe(0);
    // A rating above its own scale is the scale, not a sixth star.
    expect(ratingParts(9, 5).value).toBe(5);
    expect(ratingParts(-2, 5).value).toBe(0);
  });

  it('keeps overtime inside the day it belongs to', () => {
    // Overtime is documented as *included in* `hours`, but the row only ever
    // tested `overtimeHours > 0` — so `hours={2} overtimeHours={10}` rendered
    // "2h 0m" with "+10h 0m OT" beneath it, both as though true.
    const bad = hoursParts(2, 10);
    expect(bad.total).toBe(2);
    expect(bad.overtime).toBe(2);
    expect(bad.regular).toBe(0);
    expect(bad.inconsistent).toBe(true);

    const ordinary = hoursParts(9, 1);
    expect(ordinary).toMatchObject({ total: 9, overtime: 1, regular: 8, inconsistent: false });
  });

  it('reads a refunded deduction as a credit, not as a negative debit', () => {
    // The base prepended a literal U+2212 to `formatMoney(cents)`, which
    // already signs a negative — so a refunded deduction printed "−-$50.00".
    expect(deductionParts(5000)).toMatchObject({ direction: 'debit', magnitudeCents: 5000 });
    expect(deductionParts(-5000)).toMatchObject({ direction: 'credit', magnitudeCents: 5000 });
    expect(deductionParts(0)).toMatchObject({ direction: 'zero', magnitudeCents: 0 });
    expect(deductionParts(Number.NaN)).toMatchObject({ direction: 'zero' });
  });

  it('knows which statuses owe the reader a reason', () => {
    // Six components carry an adverse member and not one had a field for why.
    expect(isAdverse('denied')).toBe(true);
    expect(isAdverse('rejected')).toBe(true);
    expect(isAdverse('failed')).toBe(true);
    expect(isAdverse('overdue')).toBe(true);
    expect(isAdverse('blocked')).toBe(true);
    expect(isAdverse('approved')).toBe(false);
    expect(isAdverse('pending')).toBe(false);
    expect(isAdverse('paid')).toBe(false);
  });
});

describe('LeaveRequestV4 — the headline', () => {
  it('keeps Approve out of the card own activation', () => {
    // The base guarded the click path and left the key path open: the card's
    // handler caught the bubbled keydown, preventDefault()ed the button's own
    // synthesised click and fired the card. The manager navigated away and the
    // request stayed pending, with nothing to say so.
    const onClick = jest.fn();
    const onApprove = jest.fn();
    const { getByRole } = render(
      <LeaveRequestV4
        type="vacation"
        startDate="1 Sep"
        days={3}
        status="pending"
        actionable
        onApprove={onApprove}
        onDeny={jest.fn()}
        onClick={onClick}
      />
    );
    const approve = getByRole('button', { name: /approve/i });
    // A real button, and NOT a descendant of the card's activation.
    expect(approve.closest('button')).toBe(approve);
    expect(approve.closest('[role="button"]')).toBeNull();

    fireEvent.click(approve);
    expect(onApprove).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  it('has somewhere to put the reason a request was denied', () => {
    // The only free-text prop was `reason`, the REQUESTER's own note, so a
    // denial could show "Denied by Priya" and the employee's "Family wedding"
    // and nothing else.
    const { container } = render(
      <LeaveRequestV4
        type="vacation"
        startDate="1 Sep"
        days={3}
        status="denied"
        approver="Priya"
        decisionReason="Two people are already off that week."
      />
    );
    expect(container.textContent).toContain('Two people are already off that week.');
  });
});

describe('PayslipRowV4', () => {
  it('does not say a failed payment was paid', () => {
    // The base hard-coded "Paid " before `payDate` whatever the status was, so
    // a failed run rendered "Paid 15 Aug" one line above a "✕ Failed" pill.
    const { container } = render(
      <PayslipRowV4 period="Aug 1–15" netCents={320000} status="failed" payDate="15 Aug" />
    );
    expect(container.textContent).not.toContain('Paid 15 Aug');
    expect(container.textContent).toContain('15 Aug');
  });

  it('still says Paid when the money actually moved', () => {
    const { container } = render(
      <PayslipRowV4 period="Aug 1–15" netCents={320000} status="paid" payDate="15 Aug" />
    );
    expect(container.textContent).toContain('Paid 15 Aug');
  });
});

describe('PerformanceReviewV4', () => {
  it('does not render the string NaN when the scale arrives broken', () => {
    const { container } = render(
      <PerformanceReviewV4 cycle="H1 2026" rating={4} ratingMax={Number.NaN} />
    );
    expect(container.textContent).not.toContain('NaN');
  });

  it('exposes the goal meter outside the card own activation', () => {
    // `role="button"` takes presentational children, so the review announced
    // "Review H1 2026" and nothing else — no rating, no status, no 76%.
    const { container } = render(
      <PerformanceReviewV4
        cycle="H1 2026"
        rating={4}
        goalCompletion={76}
        status="inProgress"
        onClick={jest.fn()}
      />
    );
    const meters = Array.from(container.querySelectorAll('[role="progressbar"]'));
    expect(meters.length).toBeGreaterThan(0);
    meters.forEach((meter) => {
      expect(meter.closest('[role="button"]')).toBeNull();
      expect(meter.closest('button')).toBeNull();
    });
  });
});
