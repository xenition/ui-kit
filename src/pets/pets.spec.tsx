/** @jest-environment jsdom */
/**
 * Web `pets` module: render smoke for the full set, a token-class assertion
 * (every component paints with `--xen-*`-bound utility classes, never a literal
 * color), and the behavioral contracts — feeding toggle, medication mark-taken,
 * vaccine renew, adoption apply, activity-ring goal guard, and the empty state.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  PetProfileCard,
  VaccineRecord,
  VetAppointmentCard,
  BreedCard,
  PetHealthLog,
  FeedingSchedule,
  GroomingCard,
  AdoptionCard,
  PetActivityRing,
  MedicationReminder,
  WeightTracker,
  LostPetAlert,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('pets (web) — render + tokens', () => {
  it('renders PetProfileCard identity and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText } = render(
      <PetProfileCard ref={ref} name="Biscuit" species="dog" breed="Corgi" age="3 yrs" sex="male" fixed />
    );
    expect(getByText('Biscuit')).toBeTruthy();
    expect(getByText(/Corgi/)).toBeTruthy();
    expect(ref.current?.tagName).toBe('DIV');
    // Card root paints via token classes, not a literal color.
    expect(ref.current?.className).toContain('bg-surface');
    expect(HEX_LITERAL.test(ref.current?.getAttribute('style') ?? '')).toBe(false);
  });

  it('activates an interactive PetProfileCard by keyboard', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<PetProfileCard name="Biscuit" species="cat" onClick={onClick} />);
    const card = getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows a PetProfileCard loading skeleton', () => {
    const { getByLabelText } = render(<PetProfileCard name="Biscuit" species="cat" loading />);
    expect(getByLabelText('Loading pet profile')).toBeTruthy();
  });

  it('VaccineRecord surfaces its status label and fires onRenew when not current', () => {
    const onRenew = jest.fn();
    const { getByText, getByLabelText } = render(
      <VaccineRecord name="Rabies" status="overdue" nextDue="Jan 2026" onRenew={onRenew} />
    );
    expect(getByLabelText(/Rabies vaccine, Overdue/)).toBeTruthy();
    fireEvent.click(getByText('Book booster'));
    expect(onRenew).toHaveBeenCalledTimes(1);
  });

  it('VetAppointmentCard fires the confirm action for an open visit', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <VetAppointmentCard vetName="Dr. Paws" clinic="City Vet" reason="checkup" date="Mar 3" time="10:00" status="upcoming" onAction={onAction} />
    );
    expect(getByText('Dr. Paws')).toBeTruthy();
    fireEvent.click(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('BreedCard renders the energy label from dots + text', () => {
    const { getByText, getByLabelText } = render(
      <BreedCard name="Border Collie" species="Dog" size="medium" energy="high" lifespan="12–15 yrs" traits={['Smart', 'Active']} />
    );
    expect(getByText('Border Collie')).toBeTruthy();
    expect(getByLabelText('High energy')).toBeTruthy();
  });

  it('FeedingSchedule renders an explicit empty state', () => {
    const { getByText } = render(<FeedingSchedule meals={[]} />);
    expect(getByText('No meals scheduled')).toBeTruthy();
  });

  it('FeedingSchedule toggles a meal fed state via a real checkbox button', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <FeedingSchedule
        meals={[
          { type: 'breakfast', time: '7:30 AM', food: 'Kibble', amount: '1 cup', fed: false },
          { type: 'dinner', time: '6:00 PM', food: 'Wet food', fed: true },
        ]}
        onToggle={onToggle}
      />
    );
    const cell = getByLabelText(/Kibble, 7:30 AM, not fed/);
    expect(cell.tagName).toBe('BUTTON');
    expect(cell.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(cell);
    expect(onToggle).toHaveBeenCalledWith(0, true);
  });

  it('PetHealthLog renders entries and an empty state', () => {
    const filled = render(
      <PetHealthLog title="Log" entries={[{ kind: 'symptom', text: 'Limping on left paw', timestamp: 'Today' }]} />
    );
    expect(filled.getByText('Limping on left paw')).toBeTruthy();

    const empty = render(<PetHealthLog entries={[]} />);
    expect(empty.getByText('No health entries yet')).toBeTruthy();
  });

  it('MedicationReminder fires mark-taken and paints the control in a token class', () => {
    const onMarkTaken = jest.fn();
    const { getByLabelText } = render(
      <MedicationReminder name="Apoquel" dosage="5 mg" form="pill" state="due" nextDose="8:00 AM" onMarkTaken={onMarkTaken} />
    );
    const btn = getByLabelText('Mark taken: Apoquel');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.className).toContain('text-warn');
    fireEvent.click(btn);
    expect(onMarkTaken).toHaveBeenCalledTimes(1);
  });

  it('WeightTracker classifies against the ideal range and renders an empty state', () => {
    const { getByLabelText } = render(
      <WeightTracker current={32} unit="kg" delta={-0.4} idealRange={[28, 34]} history={[33, 32.5, 32]} />
    );
    expect(getByLabelText(/Weight 32 kg, Ideal weight/)).toBeTruthy();

    const empty = render(<WeightTracker current={NaN} />);
    expect(empty.getByText('No weight logged yet')).toBeTruthy();
  });

  it('PetActivityRing summarizes progress and guards a zero goal', () => {
    const { getByLabelText } = render(<PetActivityRing variant="walk" value={20} goal={30} />);
    expect(getByLabelText(/Walk: 20 of 30 min, 67%/)).toBeTruthy();

    const noGoal = render(<PetActivityRing variant="play" value={0} goal={0} />);
    expect(noGoal.getByText('No goal set')).toBeTruthy();
  });

  it('LostPetAlert mounts as an alert and reports a sighting', () => {
    const onReportSighting = jest.fn();
    const { getByText, getByRole } = render(
      <LostPetAlert name="Milo" status="lost" lastSeen="Central Park" reward="$500" onReportSighting={onReportSighting} />
    );
    expect(getByRole('alert')).toBeTruthy();
    fireEvent.click(getByText('Report sighting'));
    expect(onReportSighting).toHaveBeenCalledTimes(1);
  });

  it('GroomingCard + AdoptionCard render, and adoption apply does not double-fire the card', () => {
    const groom = render(
      <GroomingCard service="full" status="due" groomer="Fluffy Salon" nextDue="Next week" price="$45" onBook={() => {}} />
    );
    expect(groom.getByText('Full groom')).toBeTruthy();
    expect(groom.getByText('Book')).toBeTruthy();

    const onApply = jest.fn();
    const onClick = jest.fn();
    const adopt = render(
      <AdoptionCard name="Luna" breed="Tabby cat" age="2 yrs" shelter="Happy Tails" status="available" fee="$120" onApply={onApply} onClick={onClick} />
    );
    expect(adopt.getByText('Luna')).toBeTruthy();
    fireEvent.click(adopt.getByText('Apply to adopt'));
    expect(onApply).toHaveBeenCalledTimes(1);
    // Inner button stops propagation to the card's onClick.
    expect(onClick).not.toHaveBeenCalled();
  });
});
