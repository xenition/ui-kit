/** @jest-environment jsdom */
/**
 * Web HR module: render smoke for the core blocks, the token-class contract
 * (every color is a `--xen-*` token class — no literals), status-by-glyph+word,
 * the empty state, and the two headline interactions (leave approve + onboarding
 * task toggle). Plain `expect` (jest globals), jsdom via the docblock above.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  EmployeeCard,
  LeaveRequest,
  PayslipRow,
  OnboardingTask,
  PerformanceReview,
  ExpenseClaim,
  ShiftSchedule,
  StatusPill,
  LEAVE_STATUS_META,
} from './index';

describe('web hr module', () => {
  it('StatusPill renders glyph + word and a token text class (no color-alone)', () => {
    const { getByText, container } = render(<StatusPill meta={LEAVE_STATUS_META.approved} />);
    // Word half of the glyph+word contract.
    expect(getByText('Approved')).toBeTruthy();
    // Glyph half.
    expect(getByText(LEAVE_STATUS_META.approved.glyph)).toBeTruthy();
    // Color resolves from a token class, never a literal.
    const root = container.querySelector('span[aria-label="Approved"]');
    expect(root?.className).toContain('text-success');
  });

  it('EmployeeCard renders on a token surface and shows a loading skeleton', () => {
    const { getByText, container } = render(
      <EmployeeCard name="Ada Lovelace" title="Engineer" status="active" employmentType="fullTime" />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    // Card primitive binds the surface via a token class.
    expect(container.firstElementChild?.className).toContain('bg-surface');

    const { getByLabelText } = render(<EmployeeCard name="Ada" loading />);
    expect(getByLabelText('Loading employee')).toBeTruthy();
  });

  it('EmployeeCard contact actions are real <button>s that fire onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <EmployeeCard
        name="Grace Hopper"
        actions={[{ key: 'email', glyph: '✉', label: 'Email', onClick }]}
      />
    );
    const btn = getByLabelText('Email');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('LeaveRequest fires onApprove when the manager approves a pending request', () => {
    const onApprove = jest.fn();
    const onDeny = jest.fn();
    const { getByText } = render(
      <LeaveRequest
        type="vacation"
        startDate="Aug 1"
        endDate="Aug 5"
        days={5}
        status="pending"
        actionable
        onApprove={onApprove}
        onDeny={onDeny}
      />
    );
    fireEvent.click(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onDeny).not.toHaveBeenCalled();
  });

  it('OnboardingTask toggles completion through the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(
      <OnboardingTask title="Sign contract" status="todo" onToggle={onToggle} />
    );
    const box = getByRole('checkbox') as HTMLInputElement;
    expect(box.checked).toBe(false);
    fireEvent.click(box);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('PayslipRow formats integer cents as a stable 2-decimal amount', () => {
    const { getByText } = render(<PayslipRow period="Aug 1–15" netCents={523400} status="paid" />);
    expect(getByText('$5,234.00')).toBeTruthy();
    expect(getByText('Paid')).toBeTruthy();
  });

  it('PerformanceReview announces the rating and renders a goal progressbar', () => {
    const { getByLabelText, getByRole } = render(
      <PerformanceReview cycle="H1 2026" rating={4} status="completed" goalCompletion={75} goalCount={6} />
    );
    expect(getByLabelText('Rating 4 of 5')).toBeTruthy();
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('75');
  });

  it('ExpenseClaim flags a missing receipt by word (not color alone)', () => {
    const { getByText } = render(
      <ExpenseClaim merchant="Acme" category="travel" amountCents={12900} status="submitted" hasReceipt={false} />
    );
    expect(getByText('⚠ No receipt')).toBeTruthy();
  });

  it('ShiftSchedule renders a token-styled empty state when there are no shifts', () => {
    const { getByText, container } = render(<ShiftSchedule shifts={[]} emptyLabel="Nothing on today" />);
    expect(getByText('Nothing on today')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).toBeTruthy();
  });

  it('forwards a ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<PayslipRow ref={ref} period="Sep" netCents={1000} />);
    expect(ref.current?.tagName).toBe('DIV');
  });
});
