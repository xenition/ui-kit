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
import {
  AppointmentCardV4,
  DoctorCardV4,
  HealthRecordRowV4,
  LabResultRowV4,
  MedicationScheduleV4,
  PatientCardV4,
  PrescriptionRowV4,
  SymptomSelectorV4,
  TelehealthCallBarV4,
  TriageLevelV4,
  VisitSummaryV4,
  VitalsPanelV4,
} from './index';

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

describe('medical V4 "clinic" line (web)', () => {
  it('mounts all 12 V4 together (statuses + compact + gradient hero) and stays token-pure', () => {
    const { getByText, container } = render(
      <>
        <AppointmentCardV4 doctorName="Dr. Ada Ng" specialty="Cardiology" date="Mon 24" time="10:30" mode="video" status="confirmed" onBook={() => {}} />
        <AppointmentCardV4 doctorName="Dr. Ray Lee" date="Tue 25" time="09:00" status="cancelled" variant="compact" />
        <DoctorCardV4 name="Dr. Sara Kim" specialty="Dermatology" rating={4.7} reviewCount={128} availability="available" onBook={() => {}} />
        <HealthRecordRowV4 type="lab" title="CBC panel" provider="Central Lab" date="24 Aug" unread onClick={() => {}} />
        <LabResultRowV4 name="Hemoglobin" value="14.2" unit="g/dL" referenceRange="13.5–17.5" status="normal" />
        <LabResultRowV4 name="Potassium" value="6.8" unit="mmol/L" status="critical" variant="compact" />
        <MedicationScheduleV4
          title="Today"
          doses={[
            { id: 'a', name: 'Metformin', dose: '500 mg', time: '08:00', taken: true },
            { id: 'b', name: 'Atorvastatin', dose: '20 mg', time: '20:00' },
          ]}
          onToggleTaken={() => {}}
        />
        <PatientCardV4 name="Jordan Reyes" age={54} sex="M" mrn="A1234" status="observation" room="4B" onClick={() => {}} />
        <PrescriptionRowV4 name="Lisinopril" dose="10 mg" frequency="Once daily" refillsLeft={1} status="refill-due" onRefill={() => {}} />
        <SymptomSelectorV4
          title="Symptoms"
          options={[
            { id: 'cough', label: 'Cough' },
            { id: 'fever', label: 'Fever' },
          ]}
          value={['fever']}
          onChange={() => {}}
        />
        <TelehealthCallBarV4 participantName="Dr. Ada Ng" state="active" elapsed="04:12" onEnd={() => {}} />
        <TriageLevelV4 level={2} />
        <VisitSummaryV4
          title="Follow-up visit"
          provider="Dr. Ada Ng"
          date="24 Aug"
          diagnosis="Hypertension"
          sections={[{ heading: 'Assessment', body: 'BP improved on current therapy.' }]}
        />
        <VitalsPanelV4
          title="Vitals"
          vitals={[
            { label: 'Heart rate', value: 72, unit: 'bpm', status: 'normal' },
            { label: 'SpO₂', value: 88, unit: '%', status: 'critical' },
          ]}
        />
      </>
    );
    expect(getByText('Dr. Sara Kim')).toBeTruthy();
    expect(getByText('Follow-up visit')).toBeTruthy();
    expect(getByText('Hypertension')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('AppointmentCardV4 fires onBook (video → Join call)', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(
      <AppointmentCardV4 doctorName="Dr. Ada" specialty="Cardiology" date="Mon 24" time="10:30" mode="video" status="upcoming" onBook={onBook} />
    );
    expect(getByText('Dr. Ada')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Join call'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('SymptomSelectorV4 toggles a symptom via onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText, container } = render(
      <SymptomSelectorV4
        options={[
          { id: 'cough', label: 'Cough' },
          { id: 'fever', label: 'Fever' },
        ]}
        value={[]}
        onChange={onChange}
      />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Fever'));
    expect(onChange).toHaveBeenCalledWith(['fever']);
  });

  it('MedicationScheduleV4 marks a dose taken', () => {
    const onToggleTaken = jest.fn();
    const { getByLabelText } = render(
      <MedicationScheduleV4
        doses={[{ id: 'x', name: 'Metformin', dose: '500 mg', time: '08:00' }]}
        onToggleTaken={onToggleTaken}
      />
    );
    fireEvent.click(getByLabelText('08:00, Metformin 500 mg, Pending'));
    expect(onToggleTaken).toHaveBeenCalledWith('x', true);
  });

  it('PatientCardV4 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <PatientCardV4 name="Jordan Reyes" age={54} sex="M" mrn="A1234" status="stable" onClick={onClick} />
    );
    expect(getByText('Jordan Reyes')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Jordan Reyes'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
