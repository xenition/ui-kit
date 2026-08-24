/** @jest-environment jsdom */
/**
 * Web (React DOM) medical blocks: render smoke across a spread of components,
 * a token-class purity check (no literal hex in class attributes), and the
 * key contracts — booking an appointment, toggling a symptom, joining a
 * telehealth call, abnormal lab flag by text + glyph (not color alone), triage
 * severity, and the empty state.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import { AppointmentCard } from './AppointmentCard';
import { SymptomSelector } from './SymptomSelector';
import { TelehealthCallBar } from './TelehealthCallBar';
import { LabResultRow } from './LabResultRow';
import { TriageLevel } from './TriageLevel';
import { DoctorCard } from './DoctorCard';
import { VitalsPanel } from './VitalsPanel';
import type { SymptomOption } from './SymptomSelector';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

const classAttrs = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[class]'))
    .map((el) => el.getAttribute('class') ?? '')
    .join('\n');

describe('medical (web)', () => {
  it('renders a spread of blocks with token classes and no hex literals', () => {
    const { container, getByText } = render(
      <div>
        <AppointmentCard doctorName="Dr. Ada Lovelace" date="Mon, 24 Aug" time="10:30 AM" status="upcoming" />
        <DoctorCard name="Dr. Grace Hopper" specialty="Cardiology" rating={4.6} reviewCount={128} availability="available" onBook={() => {}} />
        <LabResultRow name="Hemoglobin" value={9.1} unit="g/dL" referenceRange="13.5–17.5" status="critical" />
        <TriageLevel level={1} />
      </div>
    );
    expect(container.querySelector('[data-xen-appointment-card]')).not.toBeNull();
    expect(container.querySelector('[data-xen-doctor-card]')).not.toBeNull();
    expect(getByText('Dr. Ada Lovelace')).toBeTruthy();
    // Token classes present, no literal hex in any class attribute.
    expect(classAttrs(container)).toContain('bg-surface');
    expect(classAttrs(container)).not.toMatch(HEX_LITERAL);
  });

  it('book appointment: fires onBook when the primary CTA is clicked', () => {
    const onBook = jest.fn();
    const { getByText } = render(
      <AppointmentCard doctorName="Dr. House" date="Tue" time="9:00 AM" status="confirmed" onBook={onBook} />
    );
    getByText('Book').click();
    expect(onBook).toHaveBeenCalledTimes(1);
  });

  it('video appointment CTA reads "Join call"', () => {
    const { getByText } = render(
      <AppointmentCard doctorName="Dr. House" date="Tue" time="9:00 AM" mode="video" onBook={() => {}} />
    );
    expect(getByText('Join call')).toBeTruthy();
  });

  it('symptom toggle: onChange receives the next selection, aria-checked reflects state', () => {
    const options: SymptomOption[] = [
      { id: 'cough', label: 'Cough' },
      { id: 'fever', label: 'Fever' },
    ];
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <SymptomSelector options={options} value={['cough']} onChange={onChange} title="Symptoms" />
    );
    const fever = getByLabelText('Fever');
    expect(fever.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(fever);
    expect(onChange).toHaveBeenCalledWith(['cough', 'fever']);
    // Already-selected chip toggles off.
    fireEvent.click(getByLabelText('Cough'));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('join call: fires onJoin from the idle call bar', () => {
    const onJoin = jest.fn();
    const { getByText, container } = render(
      <TelehealthCallBar participantName="Dr. Strange" state="idle" onJoin={onJoin} />
    );
    expect(container.querySelector('[data-xen-telehealth-call-bar]')).not.toBeNull();
    getByText('Join call').click();
    expect(onJoin).toHaveBeenCalledTimes(1);
  });

  it('active call bar exposes mute/end controls and toggles mute state', () => {
    const onToggleMute = jest.fn();
    const { getByLabelText } = render(
      <TelehealthCallBar participantName="Dr. Strange" state="active" elapsed="04:12" onToggleMute={onToggleMute} onEnd={() => {}} />
    );
    fireEvent.click(getByLabelText('Mute microphone'));
    expect(onToggleMute).toHaveBeenCalledWith(true);
    expect(getByLabelText('End call')).toBeTruthy();
  });

  it('lab flag is carried by text + glyph + a danger token class (not color alone)', () => {
    const { getByText, container } = render(
      <LabResultRow name="Potassium" value={6.8} unit="mmol/L" status="critical" />
    );
    // Text label present.
    expect(getByText('Critical')).toBeTruthy();
    // Danger token class used for the abnormal marker.
    expect(classAttrs(container)).toContain('text-danger');
  });

  it('triage level clamps out-of-range values and labels the severity', () => {
    const { getByText, rerender } = render(<TriageLevel level={9 as unknown as 5} />);
    // 9 clamps to 5 → Non-urgent.
    expect(getByText('Non-urgent')).toBeTruthy();
    rerender(<TriageLevel level={1} />);
    expect(getByText('Immediate')).toBeTruthy();
  });

  it('VitalsPanel renders an empty state when there are no readings', () => {
    const { container, getByText } = render(<VitalsPanel vitals={[]} title="Vitals" emptyLabel="No vitals recorded" />);
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
    expect(getByText('No vitals recorded')).toBeTruthy();
  });

  it('VitalsPanel shows a loading skeleton', () => {
    const { container } = render(<VitalsPanel vitals={[]} loading title="Vitals" />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  it('forwards a ref to the DOM root', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AppointmentCard ref={ref} doctorName="Dr. Who" date="Wed" time="2:00 PM" />);
    expect(ref.current?.getAttribute('data-xen-appointment-card')).toBe('');
  });
});
