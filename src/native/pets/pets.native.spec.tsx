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

describe('PetProfileCard (native)', () => {
  it('renders identity and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PetProfileCard name="Biscuit" species="dog" breed="Corgi" age="3 yrs" sex="male" fixed onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Biscuit')).toBeTruthy();
    expect(getByText(/Corgi/)).toBeTruthy();
    fireEvent.press(getByLabelText(/Biscuit, Corgi/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<PetProfileCard name="Biscuit" species="cat" loading />, SEED_DARK);
    expect(getByLabelText('Loading pet profile')).toBeTruthy();
  });
});

describe('VaccineRecord (native)', () => {
  it('surfaces the status label and fires onRenew when not current', () => {
    const onRenew = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <VaccineRecord name="Rabies" status="overdue" nextDue="Jan 2026" onRenew={onRenew} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Rabies vaccine, Overdue/)).toBeTruthy();
    fireEvent.press(getByText('Book booster'));
    expect(onRenew).toHaveBeenCalledTimes(1);
  });
});

describe('VetAppointmentCard (native)', () => {
  it('mounts and fires the confirm action for an open visit', () => {
    const onAction = jest.fn();
    const { getByText } = renderThemed(
      <VetAppointmentCard vetName="Dr. Paws" clinic="City Vet" reason="checkup" date="Mar 3" time="10:00" status="upcoming" onAction={onAction} />,
      SEED_DARK
    );
    expect(getByText('Dr. Paws')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe('BreedCard (native)', () => {
  it('renders the energy label from dots + text', () => {
    const { getByText, getByLabelText } = renderThemed(
      <BreedCard name="Border Collie" species="Dog" size="medium" energy="high" lifespan="12–15 yrs" traits={['Smart', 'Active']} />,
      SEED_LIGHT
    );
    expect(getByText('Border Collie')).toBeTruthy();
    expect(getByLabelText('High energy')).toBeTruthy();
  });
});

describe('FeedingSchedule (native)', () => {
  it('renders an explicit empty state', () => {
    const { getByText } = renderThemed(<FeedingSchedule meals={[]} />, SEED_DARK);
    expect(getByText('No meals scheduled')).toBeTruthy();
  });

  it('toggles a meal fed state', () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <FeedingSchedule
        meals={[
          { type: 'breakfast', time: '7:30 AM', food: 'Kibble', amount: '1 cup', fed: false },
          { type: 'dinner', time: '6:00 PM', food: 'Wet food', fed: true },
        ]}
        onToggle={onToggle}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Kibble, 7:30 AM, not fed/));
    expect(onToggle).toHaveBeenCalledWith(0, true);
  });
});

describe('PetHealthLog (native)', () => {
  it('renders entries and an empty state', () => {
    const filled = renderThemed(
      <PetHealthLog title="Log" entries={[{ kind: 'symptom', text: 'Limping on left paw', timestamp: 'Today' }]} />,
      SEED_LIGHT
    );
    expect(filled.getByText('Limping on left paw')).toBeTruthy();

    const empty = renderThemed(<PetHealthLog entries={[]} />, SEED_DARK);
    expect(empty.getByText('No health entries yet')).toBeTruthy();
  });
});

describe('MedicationReminder (native)', () => {
  it('fires mark-taken and paints the value in a token color', () => {
    const onMarkTaken = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <MedicationReminder name="Apoquel" dosage="5 mg" form="pill" state="due" nextDose="8:00 AM" onMarkTaken={onMarkTaken} />,
      SEED_LIGHT
    );
    const title = getByText('Apoquel · 5 mg');
    const allowed = tokenHexSet(SEED_LIGHT);
    const color = (title.props.style as { color?: string }).color?.toLowerCase();
    expect(color && allowed.has(color)).toBe(true);

    fireEvent.press(getByLabelText('Mark taken: Apoquel'));
    expect(onMarkTaken).toHaveBeenCalledTimes(1);
  });
});

describe('WeightTracker (native)', () => {
  it('classifies against the ideal range and renders an empty state', () => {
    const { getByLabelText } = renderThemed(
      <WeightTracker current={32} unit="kg" delta={-0.4} idealRange={[28, 34]} history={[33, 32.5, 32]} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Weight 32 kg, Ideal weight/)).toBeTruthy();

    const empty = renderThemed(<WeightTracker current={NaN} />, SEED_DARK);
    expect(empty.getByText('No weight logged yet')).toBeTruthy();
  });
});

describe('PetActivityRing (native)', () => {
  it('summarizes progress and guards a zero goal', () => {
    const { getByLabelText } = renderThemed(<PetActivityRing variant="walk" value={20} goal={30} />, SEED_LIGHT);
    expect(getByLabelText(/Walk: 20 of 30 min, 67%/)).toBeTruthy();

    const noGoal = renderThemed(<PetActivityRing variant="play" value={0} goal={0} />, SEED_DARK);
    expect(noGoal.getByText('No goal set')).toBeTruthy();
  });
});

describe('LostPetAlert (native)', () => {
  it('mounts as an alert and reports a sighting', () => {
    const onReportSighting = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <LostPetAlert name="Milo" status="lost" lastSeen="Central Park" reward="$500" onReportSighting={onReportSighting} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/Lost: Milo/)).toBeTruthy();
    fireEvent.press(getByText('Report sighting'));
    expect(onReportSighting).toHaveBeenCalledTimes(1);
  });
});

describe('GroomingCard / AdoptionCard (native)', () => {
  it('render service + adoption listings', () => {
    const groom = renderThemed(
      <GroomingCard service="full" status="due" groomer="Fluffy Salon" nextDue="Next week" price="$45" onBook={() => {}} />,
      SEED_LIGHT
    );
    expect(groom.getByText('Full groom')).toBeTruthy();
    expect(groom.getByText('Book')).toBeTruthy();

    const adopt = renderThemed(
      <AdoptionCard name="Luna" breed="Tabby cat" age="2 yrs" shelter="Happy Tails" status="available" fee="$120" onApply={() => {}} />,
      SEED_DARK
    );
    expect(adopt.getByText('Luna')).toBeTruthy();
    expect(adopt.getByText('Apply to adopt')).toBeTruthy();
  });
});

describe('token purity (native pets, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PetProfileCard name="Biscuit" species="dog" breed="Corgi" age="3 yrs" sex="male" weight="12 kg" fixed microchipId="982000123456789" onPress={() => {}} />
          <VaccineRecord name="Rabies" status="due-soon" administered="Jan 2025" nextDue="Jan 2026" administeredBy="City Vet" lotNumber="A12" onRenew={() => {}} />
          <VetAppointmentCard vetName="Dr. Paws" clinic="City Vet" reason="dental" date="Mar 3" time="10:00" status="today" petName="Biscuit" notes="Fast 12h before" onAction={() => {}} onCancel={() => {}} />
          <BreedCard name="Border Collie" species="Dog" size="large" energy="high" lifespan="12–15 yrs" traits={['Smart', 'Active']} onPress={() => {}} />
          <PetHealthLog title="Log" entries={[{ kind: 'symptom', text: 'Limping', timestamp: 'Today', author: 'Sam' }, { kind: 'note', text: 'Ate well' }]} />
          <FeedingSchedule meals={[{ type: 'breakfast', time: '7:30 AM', food: 'Kibble', amount: '1 cup', fed: true }]} onToggle={() => {}} />
          <GroomingCard service="bath" status="overdue" groomer="Fluffy Salon" lastDone="Feb 1" nextDue="Mar 1" price="$30" onBook={() => {}} />
          <AdoptionCard name="Luna" breed="Tabby" age="2 yrs" sex="F" shelter="Happy Tails" status="pending" fee="$120" favorited onApply={() => {}} onFavorite={() => {}} onPress={() => {}} />
          <PetActivityRing variant="steps" value={4200} goal={6000} />
          <MedicationReminder name="Apoquel" dosage="5 mg" form="pill" frequency="Twice daily" nextDose="8:00 AM" state="missed" dosesLeft={4} onMarkTaken={() => {}} />
          <WeightTracker current={32} unit="kg" delta={-0.4} idealRange={[28, 34]} status="ideal" history={[33, 32.5, 32]} />
          <LostPetAlert name="Milo" status="lost" lastSeen="Central Park" lastSeenAt="2h ago" reward="$500" description="Black collar" contact="555-1234" onReportSighting={() => {}} onShare={() => {}} />
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
