import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import {
  AppointmentCard,
  PrescriptionRow,
  SymptomSelector,
  LabResultRow,
  PatientCard,
  TelehealthCallBar,
  VitalsPanel,
  MedicationSchedule,
  DoctorCard,
  VisitSummary,
  TriageLevel,
  HealthRecordRow,
} from './index';

describe('AppointmentCard (native)', () => {
  it('renders identity + status and fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AppointmentCard
        doctorName="Dr. Alice Ng"
        specialty="Cardiology"
        date="Mon, 24 Aug"
        time="10:30 AM"
        mode="in-person"
        status="confirmed"
        onBook={onBook}
      />,
      SEED_LIGHT
    );
    expect(getByText('Dr. Alice Ng')).toBeTruthy();
    expect(getByText('Confirmed')).toBeTruthy();
    expect(getByLabelText(/appointment with Dr. Alice Ng/)).toBeTruthy();
    fireEvent.press(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('shows a video appointment as Join call', () => {
    const { getByText } = renderThemed(
      <AppointmentCard doctorName="Dr. Ray" date="Tue" time="9:00 AM" mode="video" onBook={() => {}} />,
      SEED_DARK
    );
    expect(getByText('Join call')).toBeTruthy();
  });

  it('renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(
      <AppointmentCard doctorName="Dr. X" date="—" time="—" loading />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading appointment')).toBeTruthy();
  });
});

describe('SymptomSelector (native)', () => {
  it('toggles a symptom on and returns the next selection', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <SymptomSelector
        title="What are you feeling?"
        options={[
          { id: 'fever', label: 'Fever', glyph: '🌡' },
          { id: 'cough', label: 'Cough' },
        ]}
        value={['fever']}
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Cough'));
    expect(onChange).toHaveBeenCalledWith(['fever', 'cough']);
  });

  it('renders an empty state when there are no options', () => {
    const { getByText } = renderThemed(
      <SymptomSelector options={[]} value={[]} onChange={() => {}} />,
      SEED_DARK
    );
    expect(getByText('No symptoms to choose from')).toBeTruthy();
  });
});

describe('LabResultRow (native)', () => {
  it('flags a critical result with a token danger color plus glyph + label', () => {
    const { getByText, getByLabelText } = renderThemed(
      <LabResultRow name="Potassium" value={6.8} unit="mmol/L" referenceRange="3.5–5.1" status="critical" />,
      SEED_LIGHT
    );
    // Text label, not color alone.
    expect(getByText('Critical')).toBeTruthy();
    expect(getByLabelText(/Potassium: 6.8 mmol\/L, Critical/)).toBeTruthy();

    const allowed = tokenHexSet(SEED_LIGHT);
    const label = getByText('Critical');
    const color = (label.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);
  });
});

describe('TelehealthCallBar (native)', () => {
  it('fires onJoin from the idle Join call button', () => {
    const onJoin = jest.fn();
    const { getByLabelText } = renderThemed(
      <TelehealthCallBar participantName="Dr. Lee" state="idle" onJoin={onJoin} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Join call'));
    expect(onJoin).toHaveBeenCalledTimes(1);
  });

  it('exposes mute/end controls while active and toggles mute', () => {
    const onToggleMute = jest.fn();
    const { getByLabelText } = renderThemed(
      <TelehealthCallBar participantName="Dr. Lee" state="active" elapsed="02:15" onToggleMute={onToggleMute} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Mute microphone'));
    expect(onToggleMute).toHaveBeenCalledWith(true);
    expect(getByLabelText('End call')).toBeTruthy();
  });
});

describe('MedicationSchedule (native)', () => {
  it('toggles a dose taken', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <MedicationSchedule
        doses={[{ id: 'd1', name: 'Metformin', dose: '500 mg', time: '08:00' }]}
        onToggleTaken={onToggle}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/08:00, Metformin 500 mg, not taken/));
    expect(onToggle).toHaveBeenCalledWith('d1', true);
  });

  it('renders an empty state', () => {
    const { getByText } = renderThemed(<MedicationSchedule doses={[]} />, SEED_DARK);
    expect(getByText('No medications scheduled')).toBeTruthy();
  });
});

describe('TriageLevel (native)', () => {
  it('shows the number, label, and hint, and clamps out-of-range levels', () => {
    const { getByText, getByLabelText } = renderThemed(
      <TriageLevel level={2} />,
      SEED_LIGHT
    );
    expect(getByText('Emergent')).toBeTruthy();
    expect(getByLabelText(/Triage level 2, Emergent/)).toBeTruthy();

    const clamped = renderThemed(<TriageLevel level={9 as 5} />, SEED_DARK);
    expect(clamped.getByLabelText(/Triage level 5/)).toBeTruthy();
  });
});

describe('VitalsPanel + others (native, mount + empty)', () => {
  it('mounts a vitals grid and its empty state', () => {
    const filled = renderThemed(
      <VitalsPanel
        title="Vitals"
        vitals={[
          { label: 'Heart rate', value: 72, unit: 'bpm', status: 'normal' },
          { label: 'BP', value: '150/95', unit: 'mmHg', status: 'high' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(filled.getByLabelText(/Heart rate: 72 bpm, Normal/)).toBeTruthy();
    expect(filled.getByText('High')).toBeTruthy();

    const empty = renderThemed(<VitalsPanel vitals={[]} />, SEED_DARK);
    expect(empty.getByText('No vitals recorded')).toBeTruthy();
  });
});

describe('token purity (native medical, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <AppointmentCard doctorName="Dr. Ng" specialty="Cardiology" date="Mon" time="10:30" mode="video" status="upcoming" onBook={() => {}} onReschedule={() => {}} />
          <PrescriptionRow name="Atorvastatin" dose="20 mg" frequency="Once daily" refillsLeft={2} status="refill-due" onRefill={() => {}} />
          <SymptomSelector options={[{ id: 'a', label: 'Fever' }, { id: 'b', label: 'Cough' }]} value={['a']} onChange={() => {}} />
          <LabResultRow name="Hemoglobin" value={9.1} unit="g/dL" referenceRange="13.5–17.5" status="low" />
          <PatientCard name="Jane Roe" age={54} sex="F" mrn="00219" status="observation" room="4B" onPress={() => {}} />
          <TelehealthCallBar participantName="Dr. Lee" state="active" elapsed="02:15" onToggleMute={() => {}} onEnd={() => {}} />
          <VitalsPanel title="Vitals" vitals={[{ label: 'SpO₂', value: 98, unit: '%', status: 'normal' }]} />
          <MedicationSchedule doses={[{ id: 'd1', name: 'Metformin', dose: '500 mg', time: '08:00', missed: true }]} onToggleTaken={() => {}} />
          <DoctorCard name="Dr. Sara Kim" specialty="Dermatology" rating={4.5} reviewCount={128} availability="available" onBook={() => {}} />
          <VisitSummary title="Follow-up" provider="Dr. Ng" date="24 Aug" diagnosis="Hypertension" sections={[{ heading: 'Plan', body: 'Continue meds.' }]} />
          <TriageLevel level={3} />
          <HealthRecordRow type="lab" title="CBC panel" provider="Central Lab" date="24 Aug" unread onPress={() => {}} />
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
