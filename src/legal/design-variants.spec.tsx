/** @jest-environment jsdom */
/**
 * Alternate legal designs (v2 / v3) for the web (React DOM) — drop-in redesigns of
 * CaseCard, DocumentRow, LegalAppointment, RetainerBalance. Each variant keeps the
 * base props; these specs prove they (a) mount, (b) stay token-pure (no literal hex
 * in inline styles beyond geometric widths), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CaseCardV2 } from './CaseCardV2';
import { CaseCardV3 } from './CaseCardV3';
import { DocumentRowV2 } from './DocumentRowV2';
import { DocumentRowV3 } from './DocumentRowV3';
import { LegalAppointmentV2 } from './LegalAppointmentV2';
import { LegalAppointmentV3 } from './LegalAppointmentV3';
import { RetainerBalanceV2 } from './RetainerBalanceV2';
import { RetainerBalanceV3 } from './RetainerBalanceV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('CaseCard alternates (web)', () => {
  it('V2 fires onOpen', () => {
    const onOpen = jest.fn();
    const { getByText, container } = render(<CaseCardV2 caseNumber="2026-CV-01184" title="Doe v. Acme" client="Jane Doe" status="open" priority="high" practiceArea="litigation" onOpen={onOpen} />);
    expect(getByText('Doe v. Acme')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Open case'));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<CaseCardV3 caseNumber="2026-CV-02" title="Roe Matter" status="pending" priority="normal" onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Roe Matter'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('DocumentRow alternates (web)', () => {
  it('V2 fires onDownload', () => {
    const onDownload = jest.fn();
    const { getByLabelText, container } = render(<DocumentRowV2 title="Complaint.pdf" kind="motion" status="final" version="v3" size="1.2 MB" onDownload={onDownload} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Download'));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<DocumentRowV3 title="Brief.docx" kind="brief" status="draft" version="v1" onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Brief.docx'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('LegalAppointment alternates (web)', () => {
  it('V2 fires onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText, container } = render(<LegalAppointmentV2 type="consultation" date="Mon, Aug 24" time="10:00 AM" client="Jane Doe" status="scheduled" actionable onConfirm={onConfirm} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onConfirm', () => {
    const onConfirm = jest.fn();
    const { getByText, container } = render(<LegalAppointmentV3 type="deposition" date="Tue" time="9 AM" client="Acme" status="scheduled" actionable onConfirm={onConfirm} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

describe('RetainerBalance alternates (web)', () => {
  it('V2 fires onReplenish when low', () => {
    const onReplenish = jest.fn();
    const { getByText, container } = render(<RetainerBalanceV2 balanceCents={5000} initialCents={100000} lowThresholdCents={10000} label="Doe matter" onReplenish={onReplenish} />);
    expect(getByText('Doe matter')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Replenish'));
    expect(onReplenish).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a healthy row', () => {
    const { getByText, container } = render(<RetainerBalanceV3 balanceCents={80000} initialCents={100000} lowThresholdCents={10000} label="Acme matter" />);
    expect(getByText('Acme matter')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
