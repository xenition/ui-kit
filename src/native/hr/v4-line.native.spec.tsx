/**
 * The **V4 hr line** (native) — the twin of `hr/v4-line.spec.tsx`. The
 * workforce pass is the same pure module, so the rating, overtime, deduction
 * and adverse-status findings are pinned once and hold on both sides.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { deductionParts, hoursParts, isAdverse, ratingParts } from '../../hr/workforce-v4';
import { LeaveRequestV4 } from './LeaveRequestV4';
import { PayslipRowV4 } from './PayslipRowV4';

describe('workforce-v4', () => {
  it('never draws more rating than it prints', () => {
    const half = ratingParts(4.5, 5);
    expect(half.value).toBe(4.5);
    expect(half.filled).toBe(4);
    expect(half.partial).toBe(true);
  });

  it('survives a rating scale that arrived as NaN', () => {
    const broken = ratingParts(4, Number.NaN);
    expect(Number.isNaN(broken.max)).toBe(false);
    expect(broken.max).toBe(5);
    expect(ratingParts(Number.NaN, 5).value).toBe(0);
    expect(ratingParts(9, 5).value).toBe(5);
    expect(ratingParts(-2, 5).value).toBe(0);
  });

  it('keeps overtime inside the day it belongs to', () => {
    const bad = hoursParts(2, 10);
    expect(bad).toMatchObject({ total: 2, overtime: 2, regular: 0, inconsistent: true });
    expect(hoursParts(9, 1)).toMatchObject({
      total: 9,
      overtime: 1,
      regular: 8,
      inconsistent: false,
    });
  });

  it('reads a refunded deduction as a credit, not as a negative debit', () => {
    expect(deductionParts(5000)).toMatchObject({ direction: 'debit', magnitudeCents: 5000 });
    expect(deductionParts(-5000)).toMatchObject({ direction: 'credit', magnitudeCents: 5000 });
    expect(deductionParts(0)).toMatchObject({ direction: 'zero', magnitudeCents: 0 });
  });

  it('knows which statuses owe the reader a reason', () => {
    expect(isAdverse('denied')).toBe(true);
    expect(isAdverse('rejected')).toBe(true);
    expect(isAdverse('failed')).toBe(true);
    expect(isAdverse('overdue')).toBe(true);
    expect(isAdverse('blocked')).toBe(true);
    expect(isAdverse('approved')).toBe(false);
    expect(isAdverse('paid')).toBe(false);
  });
});

describe('LeaveRequestV4 — the headline', () => {
  it('leaves Approve reachable instead of flattening it into the card', () => {
    // The base wrapped the whole card in a `Pressable` carrying the card's own
    // label. A `Pressable` is `accessible` by default and collapses its
    // subtree, so on a queue of pending requests VoiceOver reached one leaf
    // per card and Approve/Deny were not focus stops at all.
    //
    // This asserts the CONTRACT rather than firing a press: RNTL's
    // `fireEvent.press` walks up the tree looking for a handler, so a press
    // test passes whether or not the button is its own element.
    const { getByLabelText } = renderThemed(
      <LeaveRequestV4
        type="vacation"
        startDate="1 Sep"
        days={3}
        status="pending"
        actionable
        onApprove={jest.fn()}
        onDeny={jest.fn()}
        onPress={jest.fn()}
      />,
      SEED_LIGHT
    );
    const approve = getByLabelText(/approve/i);
    expect(approve.props.accessibilityRole).toBe('button');
    expect(approve.props.accessibilityState?.disabled).not.toBe(true);
  });

  it('has somewhere to put the reason a request was denied', () => {
    const { getByText } = renderThemed(
      <LeaveRequestV4
        type="vacation"
        startDate="1 Sep"
        days={3}
        status="denied"
        approver="Priya"
        decisionReason="Two people are already off that week."
      />,
      SEED_LIGHT
    );
    expect(getByText(/Two people are already off that week\./)).toBeTruthy();
  });
});

describe('PayslipRowV4', () => {
  it('does not say a failed payment was paid', () => {
    // The base hard-coded "Paid " before `payDate` whatever the status was.
    const { queryByText, getByText } = renderThemed(
      <PayslipRowV4 period="Aug 1-15" netCents={320000} status="failed" payDate="15 Aug" />,
      SEED_LIGHT
    );
    expect(queryByText(/Paid 15 Aug/)).toBeNull();
    expect(getByText(/15 Aug/)).toBeTruthy();
  });

  it('still says Paid when the money actually moved', () => {
    const { getByText } = renderThemed(
      <PayslipRowV4 period="Aug 1-15" netCents={320000} status="paid" payDate="15 Aug" />,
      SEED_LIGHT
    );
    expect(getByText(/Paid 15 Aug/)).toBeTruthy();
  });
});
