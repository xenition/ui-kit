/** @jest-environment jsdom */
/**
 * Alternate government designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of CivicAppointment, PermitStatus, RepresentativeCard, ServiceCard.
 * Each variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex in inline styles), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { CivicAppointmentV2 } from './CivicAppointmentV2';
import { CivicAppointmentV3 } from './CivicAppointmentV3';
import { PermitStatusV2 } from './PermitStatusV2';
import { PermitStatusV3 } from './PermitStatusV3';
import { RepresentativeCardV2 } from './RepresentativeCardV2';
import { RepresentativeCardV3 } from './RepresentativeCardV3';
import { ServiceCardV2 } from './ServiceCardV2';
import { ServiceCardV3 } from './ServiceCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('CivicAppointment alternates (web)', () => {
  it('V2 fires onCheckIn', () => {
    const onCheckIn = jest.fn();
    const { getByText, container } = render(<CivicAppointmentV2 service="License renewal" office="DMV" date="Mon, Aug 24" time="10:30 AM" status="scheduled" reference="A-042" onCheckIn={onCheckIn} />);
    expect(getByText('License renewal')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Check in'));
    expect(onCheckIn).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onCheckIn', () => {
    const onCheckIn = jest.fn();
    const { getByText, container } = render(<CivicAppointmentV3 service="Passport" office="Post Office" date="Tue" time="9 AM" status="confirmed" onCheckIn={onCheckIn} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Check in'));
    expect(onCheckIn).toHaveBeenCalledTimes(1);
  });
});

describe('PermitStatus alternates (web)', () => {
  it('V2 renders the tracker', () => {
    const { getAllByText, container } = render(<PermitStatusV2 status="review" title="Building permit" permitNumber="BLD-2026-0417" updatedDate="Aug 20" />);
    expect(getAllByText('Under review').length).toBeGreaterThan(0);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a compact line', () => {
    const { getByText, container } = render(<PermitStatusV3 status="approved" title="Zoning" permitNumber="Z-1" />);
    expect(getByText(/Approved/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('RepresentativeCard alternates (web)', () => {
  it('V2 fires onCall', () => {
    const onCall = jest.fn();
    const { getByText, container } = render(<RepresentativeCardV2 name="Jane Doe" office="City Council · District 4" party="independent" district="District 4" phone="555-0100" inOffice onCall={onCall} />);
    expect(getByText('Jane Doe')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Call'));
    expect(onCall).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onEmail', () => {
    const onEmail = jest.fn();
    const { getByLabelText, container } = render(<RepresentativeCardV3 name="John Roe" office="Mayor" party="nonpartisan" email="j@city.gov" inOffice onEmail={onEmail} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Email'));
    expect(onEmail).toHaveBeenCalledTimes(1);
  });
});

describe('ServiceCard alternates (web)', () => {
  it('V2 fires onStart', () => {
    const onStart = jest.fn();
    const { getByText, container } = render(<ServiceCardV2 category="license" title="Renew driver license" description="Online renewal" channel="online" estimatedTime="10 min" onStart={onStart} />);
    expect(getByText('Renew driver license')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onStart', () => {
    const onStart = jest.fn();
    const { getByText, container } = render(<ServiceCardV3 category="tax" title="File taxes" channel="online" estimatedTime="30 min" onStart={onStart} />);
    expect(getByText('File taxes')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Start'));
    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
