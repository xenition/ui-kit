/** @jest-environment jsdom */
/**
 * Alternate medical designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of AppointmentCard, DoctorCard, LabResultRow, PrescriptionRow. Each variant
 * keeps the base props, so these specs prove they (a) mount, (b) stay token-pure
 * (no literal hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AppointmentCardV2 } from './AppointmentCardV2';
import { AppointmentCardV3 } from './AppointmentCardV3';
import { DoctorCardV2 } from './DoctorCardV2';
import { DoctorCardV3 } from './DoctorCardV3';
import { LabResultRowV2 } from './LabResultRowV2';
import { LabResultRowV3 } from './LabResultRowV3';
import { PrescriptionRowV2 } from './PrescriptionRowV2';
import { PrescriptionRowV3 } from './PrescriptionRowV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('AppointmentCard alternates (web)', () => {
  it('V2 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(
      <AppointmentCardV2 doctorName="Dr. Ada" specialty="Cardiology" date="Mon 24" time="10:30" status="upcoming" onBook={onBook} />
    );
    expect(getByText('Dr. Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(
      <AppointmentCardV3 doctorName="Dr. Lee" date="Tue 25" time="09:00" mode="video" status="confirmed" />
    );
    expect(getByText(/Dr. Lee/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('DoctorCard alternates (web)', () => {
  it('V2 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(
      <DoctorCardV2 name="Dr. Ada" specialty="Dermatology" rating={4.7} availability="available" onBook={onBook} />
    );
    expect(getByText('Dr. Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<DoctorCardV3 name="Dr. Kim" specialty="ENT" availability="busy" />);
    expect(getByText('Dr. Kim')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('LabResultRow alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <LabResultRowV2 name="Hemoglobin" value="14.2" unit="g/dL" referenceRange="13.5–17.5" status="normal" onClick={onClick} />
    );
    expect(getByText('Hemoglobin')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Hemoglobin'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a critical result', () => {
    const { getByText, container } = render(<LabResultRowV3 name="Potassium" value="6.8" unit="mmol/L" status="critical" />);
    expect(getByText('Potassium')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PrescriptionRow alternates (web)', () => {
  it('V2 fires onRefill when due', () => {
    const onRefill = jest.fn();
    const { getByText, container } = render(
      <PrescriptionRowV2 name="Atorvastatin" dose="20 mg" frequency="Once daily" refillsLeft={1} status="refill-due" onRefill={onRefill} />
    );
    expect(getByText('Atorvastatin')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Refill'));
    expect(onRefill).toHaveBeenCalledTimes(1);
  });
  it('V3 renders an active line', () => {
    const { getByText, container } = render(<PrescriptionRowV3 name="Metformin" dose="500 mg" status="active" />);
    expect(getByText('Metformin')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
