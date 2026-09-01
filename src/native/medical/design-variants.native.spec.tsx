/**
 * Alternate medical designs (v2 / v3) — the drop-in redesigns of the four
 * most-used native medical blocks (AppointmentCard, DoctorCard, PrescriptionRow,
 * LabResultRow). Each variant keeps its base component's exact props, so these
 * specs prove they (a) mount, (b) stay token-pure under BOTH seeds (no hardcoded
 * hex — every color traces to a compiled token), and (c) remain interactive
 * where the base was.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { AppointmentCardV2 } from './AppointmentCardV2';
import { AppointmentCardV3 } from './AppointmentCardV3';
import { DoctorCardV2 } from './DoctorCardV2';
import { DoctorCardV3 } from './DoctorCardV3';
import { PrescriptionRowV2 } from './PrescriptionRowV2';
import { PrescriptionRowV3 } from './PrescriptionRowV3';
import { LabResultRowV2 } from './LabResultRowV2';
import { LabResultRowV3 } from './LabResultRowV3';
import { AppointmentCardV4 } from './AppointmentCardV4';
import { DoctorCardV4 } from './DoctorCardV4';
import { HealthRecordRowV4 } from './HealthRecordRowV4';
import { LabResultRowV4 } from './LabResultRowV4';
import { MedicationScheduleV4 } from './MedicationScheduleV4';
import { PatientCardV4 } from './PatientCardV4';
import { PrescriptionRowV4 } from './PrescriptionRowV4';
import { SymptomSelectorV4 } from './SymptomSelectorV4';
import { TelehealthCallBarV4 } from './TelehealthCallBarV4';
import { TriageLevelV4 } from './TriageLevelV4';
import { VisitSummaryV4 } from './VisitSummaryV4';
import { VitalsPanelV4 } from './VitalsPanelV4';

describe('AppointmentCard alternates (native)', () => {
  it('V2 renders a hero card with date block + mode, and fires onBook (video → Join call)', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AppointmentCardV2
        doctorName="Dr. Alice Ng"
        specialty="Cardiology"
        date="Mon, 24 Aug"
        time="10:30 AM"
        mode="video"
        status="confirmed"
        onBook={onBook}
      />,
      SEED_LIGHT
    );
    expect(getByText('Dr. Alice Ng')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
    expect(getByLabelText(/appointment with Dr. Alice Ng/)).toBeTruthy();
    fireEvent.press(getByText('Join call'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('V2 renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(
      <AppointmentCardV2 doctorName="Dr. X" date="—" time="—" loading />,
      SEED_DARK
    );
    expect(getByLabelText('Loading appointment')).toBeTruthy();
  });

  it('V3 renders a dense line with a status word and fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AppointmentCardV3
        doctorName="Dr. Ray"
        date="Tue"
        time="9:00 AM"
        mode="in-person"
        status="upcoming"
        onBook={onBook}
      />,
      SEED_DARK
    );
    expect(getByText('Upcoming')).toBeTruthy();
    fireEvent.press(getByLabelText(/appointment with Dr. Ray/));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});

describe('DoctorCard alternates (native)', () => {
  it('V2 renders a centered profile card with rating + availability and books', () => {
    const onBook = jest.fn();
    const { getByText } = renderThemed(
      <DoctorCardV2
        name="Dr. Sara Kim"
        specialty="Dermatology"
        rating={4.5}
        reviewCount={128}
        credentials="12 yrs experience"
        availability="available"
        onBook={onBook}
      />,
      SEED_LIGHT
    );
    expect(getByText('Dr. Sara Kim')).toBeTruthy();
    expect(getByText(/Available today/)).toBeTruthy();
    fireEvent.press(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row with a rating figure and fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <DoctorCardV3
        name="Dr. Lee"
        specialty="Neurology"
        rating={4.8}
        reviewCount={64}
        availability="busy"
        onBook={onBook}
      />,
      SEED_DARK
    );
    expect(getByText('Dr. Lee')).toBeTruthy();
    expect(getByText(/★ 4.8/)).toBeTruthy();
    fireEvent.press(getByLabelText(/Dr. Lee, Neurology/));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});

describe('PrescriptionRow alternates (native)', () => {
  it('V2 renders a med card and fires the refill CTA', () => {
    const onRefill = jest.fn();
    const { getByText } = renderThemed(
      <PrescriptionRowV2
        name="Atorvastatin"
        dose="20 mg"
        frequency="Once daily"
        refillsLeft={2}
        status="refill-due"
        onRefill={onRefill}
      />,
      SEED_LIGHT
    );
    expect(getByText('Atorvastatin')).toBeTruthy();
    expect(getByText('Refill due')).toBeTruthy();
    fireEvent.press(getByText('Refill'));
    expect(onRefill).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with a status chip and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PrescriptionRowV3 name="Metformin" dose="500 mg" frequency="Twice daily" status="active" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Metformin')).toBeTruthy();
    expect(getByText('Active')).toBeTruthy();
    fireEvent.press(getByLabelText(/Metformin, 500 mg/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('LabResultRow alternates (native)', () => {
  it('V2 renders a value card with a status band and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <LabResultRowV2
        name="Potassium"
        value={6.8}
        unit="mmol/L"
        referenceRange="3.5–5.1"
        status="critical"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Critical')).toBeTruthy();
    expect(getByLabelText(/Potassium: 6.8 mmol\/L, Critical/)).toBeTruthy();
    fireEvent.press(getByLabelText(/Potassium: 6.8 mmol\/L, Critical/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense line with a glyph + word status and value on the right', () => {
    const { getByText, getByLabelText } = renderThemed(
      <LabResultRowV3 name="Hemoglobin" value={9.1} unit="g/dL" referenceRange="13.5–17.5" status="low" />,
      SEED_DARK
    );
    expect(getByText('Hemoglobin')).toBeTruthy();
    expect(getByText('Low')).toBeTruthy();
    expect(getByLabelText(/Hemoglobin: 9.1 g\/dL, Low/)).toBeTruthy();
  });
});

describe('token purity — medical alternates (both seeds)', () => {
  it('every rendered style hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <AppointmentCardV2 doctorName="Dr. Ng" specialty="Cardiology" date="Mon" time="10:30" mode="video" status="upcoming" onBook={() => {}} onReschedule={() => {}} />
          <AppointmentCardV3 doctorName="Dr. Ray" specialty="ENT" date="Tue" time="9:00" mode="phone" status="cancelled" onBook={() => {}} />
          <DoctorCardV2 name="Dr. Sara Kim" specialty="Dermatology" rating={4.5} reviewCount={128} credentials="12 yrs" availability="available" onBook={() => {}} />
          <DoctorCardV3 name="Dr. Lee" specialty="Neurology" rating={4.8} reviewCount={64} availability="busy" onBook={() => {}} />
          <PrescriptionRowV2 name="Atorvastatin" dose="20 mg" frequency="Once daily" refillsLeft={2} status="refill-due" onRefill={() => {}} />
          <PrescriptionRowV3 name="Metformin" dose="500 mg" frequency="Twice daily" refillsLeft={1} status="expired" onPress={() => {}} />
          <LabResultRowV2 name="Potassium" value={6.8} unit="mmol/L" referenceRange="3.5–5.1" status="critical" collectedAt="24 Aug" onPress={() => {}} />
          <LabResultRowV3 name="Hemoglobin" value={9.1} unit="g/dL" referenceRange="13.5–17.5" status="low" collectedAt="24 Aug" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

/** All 12 V4 "clinic" components in ONE tree — the gradient VisitSummaryV4 hero
 * is always present, plus compact variants and critical-status tones. Shared by
 * the mount test and the both-seeds token-purity block. */
const AllMedicalV4 = (
  <>
    <AppointmentCardV4 doctorName="Dr. Ada Ng" specialty="Cardiology" date="Mon 24" time="10:30" mode="video" status="confirmed" onBook={() => {}} />
    <AppointmentCardV4 doctorName="Dr. Ray Lee" date="Tue 25" time="09:00" status="cancelled" variant="compact" />
    <DoctorCardV4 name="Dr. Sara Kim" specialty="Dermatology" rating={4.7} reviewCount={128} availability="available" onBook={() => {}} />
    <HealthRecordRowV4 type="lab" title="CBC panel" provider="Central Lab" date="24 Aug" unread onPress={() => {}} />
    <LabResultRowV4 name="Hemoglobin" value={14.2} unit="g/dL" referenceRange="13.5–17.5" status="normal" collectedAt="24 Aug" />
    <LabResultRowV4 name="Potassium" value={6.8} unit="mmol/L" status="critical" variant="compact" onPress={() => {}} />
    <MedicationScheduleV4
      title="Today"
      doses={[
        { id: 'a', name: 'Metformin', dose: '500 mg', time: '08:00', taken: true },
        { id: 'b', name: 'Atorvastatin', dose: '20 mg', time: '20:00' },
      ]}
      onToggleTaken={() => {}}
    />
    <PatientCardV4 name="Jordan Reyes" age={54} sex="M" mrn="A1234" status="critical" room="4B" onPress={() => {}} />
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

describe('medical V4 "clinic" line (native)', () => {
  it('mounts all 12 V4 together (SEED_LIGHT) with the gradient hero + statuses', () => {
    const { getByText } = renderThemed(AllMedicalV4, SEED_LIGHT);
    expect(getByText('Dr. Sara Kim')).toBeTruthy();
    expect(getByText('Follow-up visit')).toBeTruthy();
    expect(getByText('Hypertension')).toBeTruthy();
  });

  it('AppointmentCardV4 fires onBook (video → Join call)', () => {
    const onBook = jest.fn();
    const { getByText } = renderThemed(
      <AppointmentCardV4 doctorName="Dr. Ada" specialty="Cardiology" date="Mon 24" time="10:30" mode="video" status="upcoming" onBook={onBook} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Join call'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('SymptomSelectorV4 toggles a symptom via onChange', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <SymptomSelectorV4
        options={[
          { id: 'cough', label: 'Cough' },
          { id: 'fever', label: 'Fever' },
        ]}
        value={[]}
        onChange={onChange}
      />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Fever'));
    expect(onChange).toHaveBeenCalledWith(['fever']);
  });

  it('PatientCardV4 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PatientCardV4 name="Jordan Reyes" age={54} sex="M" mrn="A1234" status="stable" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Jordan Reyes/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity — medical V4 "clinic" line (both seeds)', () => {
  it.each([SEED_LIGHT, SEED_DARK])('every rendered V4 style hex traces to a compiled token (%s)', (seed) => {
    const { root } = renderThemed(AllMedicalV4, seed);
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
