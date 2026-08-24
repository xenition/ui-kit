/** @jest-environment jsdom */
/**
 * Web v2/v3 alternate designs for the HR module: each drop-in variant renders
 * (smoke), stays token-pure (no literal hex in inline styles), and honours one
 * key interaction / state contract. Base props unchanged — these are additive.
 * Plain `expect` (jest globals), jsdom via the docblock above.
 */
import { fireEvent, render } from '@testing-library/react';
import {
  EmployeeCardV2,
  EmployeeCardV3,
  LeaveRequestV2,
  LeaveRequestV3,
  PayslipRowV2,
  PayslipRowV3,
  PerformanceReviewV2,
  PerformanceReviewV3,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('EmployeeCard V2/V3', () => {
  it('V2 renders a banner card, is token-pure, and fires a contact action', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <EmployeeCardV2
        name="Ada Lovelace"
        title="Engineer"
        status="active"
        employmentType="fullTime"
        actions={[{ key: 'email', glyph: '✉', label: 'Email', onClick }]}
      />
    );
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    const btn = getByLabelText('Email');
    expect(btn.tagName).toBe('BUTTON');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row, is token-pure, and shows the status word', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <EmployeeCardV3 name="Grace Hopper" title="Rear Admiral" status="onLeave" onClick={onClick} />
    );
    expect(getByText('Grace Hopper')).toBeTruthy();
    // status conveyed by a word, never color alone
    expect(getByText('On leave')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Grace Hopper'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('LeaveRequest V2/V3', () => {
  it('V2 renders the range block, is token-pure, and approves', () => {
    const onApprove = jest.fn();
    const { getByText, container } = render(
      <LeaveRequestV2
        type="vacation"
        startDate="Aug 1"
        endDate="Aug 5"
        days={5}
        status="pending"
        actionable
        onApprove={onApprove}
      />
    );
    expect(getByText('From')).toBeTruthy();
    expect(getByText('To')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line, is token-pure, and shows the status word', () => {
    const { getAllByText, container } = render(
      <LeaveRequestV3 type="sick" startDate="Sep 2" days={1} status="approved" />
    );
    // status word rendered (dot + trailing label) — never color alone
    expect(getAllByText('Approved').length).toBeGreaterThan(0);
    expect(container.querySelector('[role="img"]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PayslipRow V2/V3', () => {
  it('V2 renders the hero net + breakdown, is token-pure, and is clickable', () => {
    const onClick = jest.fn();
    const { getAllByText, getByText, container } = render(
      <PayslipRowV2
        period="Aug 1–15"
        netCents={320000}
        grossCents={450000}
        deductionsCents={130000}
        status="paid"
        onClick={onClick}
      />
    );
    // Net figure appears as the hero and again in the breakdown's Net row.
    expect(getAllByText('$3,200.00').length).toBeGreaterThan(0);
    expect(getByText('Gross')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Gross'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with net + status word, token-pure', () => {
    const { getByText, container } = render(
      <PayslipRowV3 period="Jul 1–15" netCents={280050} status="processing" payDate="Jul 16" />
    );
    expect(getByText('$2,800.50')).toBeTruthy();
    expect(getByText('Processing')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PerformanceReview V2/V3', () => {
  it('V2 renders a star meter + goal ring, token-pure, and is clickable', () => {
    const onClick = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <PerformanceReviewV2
        cycle="H1 2026"
        reviewer="Alan Turing"
        rating={4}
        status="completed"
        goalCompletion={76}
        goalCount={5}
        onClick={onClick}
      />
    );
    expect(getByText('H1 2026')).toBeTruthy();
    expect(getByLabelText('Rating 4 of 5')).toBeTruthy();
    expect(getByLabelText('Goals 76%')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('H1 2026'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row with rating aria + status word, token-pure', () => {
    const { getByText, getByLabelText, container } = render(
      <PerformanceReviewV3 cycle="H2 2026" reviewer="Katherine J." rating={3} status="inProgress" goalCompletion={40} />
    );
    expect(getByText('H2 2026')).toBeTruthy();
    expect(getByLabelText('Rating 3 of 5')).toBeTruthy();
    expect(getByText('40% goals')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
