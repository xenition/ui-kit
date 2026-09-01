/** @jest-environment jsdom */
/**
 * Alternate pets designs (v2 / v3) for the web (React DOM) — drop-in redesigns of
 * AdoptionCard, PetActivityRing, PetProfileCard, VetAppointmentCard. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles beyond geometric widths), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AdoptionCardV2 } from './AdoptionCardV2';
import { AdoptionCardV3 } from './AdoptionCardV3';
import { PetActivityRingV2 } from './PetActivityRingV2';
import { PetActivityRingV3 } from './PetActivityRingV3';
import { PetProfileCardV2 } from './PetProfileCardV2';
import { PetProfileCardV3 } from './PetProfileCardV3';
import { VetAppointmentCardV2 } from './VetAppointmentCardV2';
import { VetAppointmentCardV3 } from './VetAppointmentCardV3';
import {
  AdoptionCardV4,
  BreedCardV4,
  FeedingScheduleV4,
  GroomingCardV4,
  LostPetAlertV4,
  MedicationReminderV4,
  PetActivityRingV4,
  PetHealthLogV4,
  PetProfileCardV4,
  VaccineRecordV4,
  VetAppointmentCardV4,
  WeightTrackerV4,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('AdoptionCard alternates (web)', () => {
  it('V2 fires onApply', () => {
    const onApply = jest.fn();
    const { getByText, container } = render(<AdoptionCardV2 name="Milo" breed="Tabby" status="available" onApply={onApply} />);
    expect(getByText('Milo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Apply to adopt'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });
  it('V3 toggles favorite', () => {
    const onFavorite = jest.fn();
    const { getByLabelText, container } = render(<AdoptionCardV3 name="Rex" status="available" onFavorite={onFavorite} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Favorite'));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });
});

describe('PetActivityRing alternates (web)', () => {
  it('V2 shows the percentage', () => {
    const { getAllByText, container } = render(<PetActivityRingV2 variant="walk" value={30} goal={60} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    expect(getAllByText('50%').length).toBeGreaterThan(0);
  });
  it('V3 renders a compact bar', () => {
    const { getByText, container } = render(<PetActivityRingV3 variant="play" value={5} goal={10} />);
    expect(getByText('Play')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PetProfileCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PetProfileCardV2 name="Buddy" species="dog" breed="Lab" age="3 yrs" fixed onClick={onClick} />);
    expect(getByText(/Buddy/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText(/Buddy/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<PetProfileCardV3 name="Coco" species="cat" breed="Siamese" />);
    expect(getByText(/Coco/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('VetAppointmentCard alternates (web)', () => {
  it('V2 fires onAction', () => {
    const onAction = jest.fn();
    const { getByText, container } = render(<VetAppointmentCardV2 vetName="Dr. Paws" reason="checkup" date="Mon 24" time="10:00" status="upcoming" petName="Milo" onAction={onAction} />);
    expect(getByText('Dr. Paws')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<VetAppointmentCardV3 vetName="Dr. Paws" reason="dental" date="Tue 25" status="today" petName="Rex" />);
    expect(getByText(/Dr. Paws/)).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('pets V4 "companion" line (web)', () => {
  it('mounts all 12 V4 components token-purely', () => {
    const { getByText, container } = render(
      <>
        <AdoptionCardV4 name="Milo" breed="Tabby" age="2 yrs" sex="M" shelter="Happy Tails" status="available" fee="$120" favorited onApply={() => {}} onFavorite={() => {}} onClick={() => {}} />
        <BreedCardV4 name="Border Collie" species="Dog" size="medium" energy="high" lifespan="12–15 yrs" traits={['Smart', 'Loyal']} onClick={() => {}} />
        <FeedingScheduleV4 meals={[{ type: 'breakfast', time: '7:30 AM', food: 'Kibble', amount: '1 cup', fed: true }, { type: 'dinner', time: '6:00 PM', food: 'Wet food' }]} onToggle={() => {}} />
        <GroomingCardV4 service="bath" status="due" groomer="Fluffy Cuts" lastDone="Jan 2" nextDue="Feb 2" price="$45" onBook={() => {}} />
        <LostPetAlertV4 name="Rex" status="lost" lastSeen="Central Park" lastSeenAt="2h ago" reward="$500" description="Brown collar" contact="555-1234" onReportSighting={() => {}} onShare={() => {}} />
        <MedicationReminderV4 name="Apoquel" dosage="5 mg" form="pill" frequency="Twice daily" nextDose="8:00 PM" state="due" dosesLeft={4} onMarkTaken={() => {}} />
        <PetActivityRingV4 variant="walk" value={30} goal={60} />
        <PetActivityRingV4 variant="steps" value={4200} goal={6000} />
        <PetActivityRingV4 variant="calories" value={5} goal={0} />
        <PetHealthLogV4 entries={[{ kind: 'symptom', text: 'Limping', timestamp: 'Mon', author: 'Vet' }, { kind: 'note', text: 'Ate well' }]} title="Health log" />
        <PetProfileCardV4 name="Buddy" species="dog" breed="Lab" age="3 yrs" sex="male" weight="12 kg" fixed microchipId="985141000123456" onClick={() => {}} />
        <VaccineRecordV4 name="Rabies" status="overdue" administered="Jan 2023" nextDue="Jan 2024" administeredBy="City Vet" lotNumber="A1B2" onRenew={() => {}} />
        <VetAppointmentCardV4 vetName="Dr. Paws" clinic="City Vet" reason="checkup" date="Mon 24" time="10:00" status="upcoming" petName="Milo" notes="Fast 12h" onAction={() => {}} onCancel={() => {}} />
        <WeightTrackerV4 current={12} unit="kg" delta={-0.5} history={[13, 12.5, 12]} idealRange={[10, 14]} />
      </>
    );
    expect(getByText('Milo')).toBeTruthy();
    expect(getByText('Border Collie')).toBeTruthy();
    expect(getByText(/Buddy/)).toBeTruthy();
    expect(getByText('Dr. Paws')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('AdoptionCardV4 fires onApply and onFavorite', () => {
    const onApply = jest.fn();
    const onFavorite = jest.fn();
    const { getByText, getByLabelText, container } = render(
      <AdoptionCardV4 name="Luna" breed="Tabby" status="available" fee="$80" onApply={onApply} onFavorite={onFavorite} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Apply to adopt'));
    expect(onApply).toHaveBeenCalledTimes(1);
    fireEvent.click(getByLabelText('Add Luna to favorites'));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it('PetProfileCardV4 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <PetProfileCardV4 name="Coco" species="cat" breed="Siamese" age="4 yrs" fixed onClick={onClick} />
    );
    expect(getByText('Coco')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Coco'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('VetAppointmentCardV4 confirm fires onAction', () => {
    const onAction = jest.fn();
    const { getByText, container } = render(
      <VetAppointmentCardV4 vetName="Dr. Bones" reason="dental" date="Tue 25" time="09:00" status="today" onAction={onAction} onCancel={() => {}} />
    );
    expect(getByText('Dr. Bones')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
