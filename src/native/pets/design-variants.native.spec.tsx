import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, SEED_DARK, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import {
  PetProfileCardV2,
  PetProfileCardV3,
  VetAppointmentCardV2,
  VetAppointmentCardV3,
  PetActivityRingV2,
  PetActivityRingV3,
  AdoptionCardV2,
  AdoptionCardV3,
} from './index';

describe('PetProfileCard variants (native)', () => {
  it('V2 mounts, shows identity, and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PetProfileCardV2 name="Biscuit" species="dog" breed="Corgi" age="3 yrs" sex="male" weight="12 kg" fixed microchipId="985141000123456" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Biscuit')).toBeTruthy();
    fireEvent.press(getByLabelText(/Biscuit, Corgi/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V2 renders a loading skeleton', () => {
    const { getByLabelText } = renderThemed(<PetProfileCardV2 name="Biscuit" species="cat" loading />, SEED_DARK);
    expect(getByLabelText('Loading pet profile')).toBeTruthy();
  });

  it('V3 mounts as a compact row and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PetProfileCardV3 name="Milo" species="cat" breed="Tabby" age="2 yrs" sex="female" fixed onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Milo')).toBeTruthy();
    fireEvent.press(getByLabelText(/Milo, Tabby/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('VetAppointmentCard variants (native)', () => {
  it('V2 mounts and fires the confirm action for an open visit', () => {
    const onAction = jest.fn();
    const { getByText } = renderThemed(
      <VetAppointmentCardV2 vetName="Dr. Paws" clinic="City Vet" reason="checkup" date="Mar 3" time="10:00" status="upcoming" petName="Biscuit" notes="Fast 12h" onAction={onAction} onCancel={() => {}} />,
      SEED_LIGHT
    );
    expect(getByText('Dr. Paws')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts as a minimal line and fires the inline action', () => {
    const onAction = jest.fn();
    const { getByText } = renderThemed(
      <VetAppointmentCardV3 vetName="Dr. Bones" clinic="Paws Clinic" reason="vaccination" date="Apr 1" time="09:00" status="today" onAction={onAction} />,
      SEED_DARK
    );
    expect(getByText('Dr. Bones')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('V3 shows a read-only status chip for a closed visit', () => {
    const { getByText } = renderThemed(
      <VetAppointmentCardV3 vetName="Dr. Paws" reason="dental" date="Feb 2" status="completed" />,
      SEED_LIGHT
    );
    expect(getByText('Completed')).toBeTruthy();
  });
});

describe('PetActivityRing variants (native)', () => {
  it('V2 renders the hero ring and caption', () => {
    const { getByText } = renderThemed(<PetActivityRingV2 variant="walk" value={30} goal={45} />, SEED_LIGHT);
    expect(getByText(/Walk/)).toBeTruthy();
    expect(getByText(/30 \/ 45/)).toBeTruthy();
  });

  it('V2 guards a non-positive goal', () => {
    const { getByLabelText } = renderThemed(<PetActivityRingV2 variant="steps" value={100} goal={0} />, SEED_DARK);
    expect(getByLabelText('Steps: no goal set')).toBeTruthy();
  });

  it('V3 renders a compact ring row with inline value', () => {
    const { getByText } = renderThemed(<PetActivityRingV3 variant="play" value={20} goal={20} />, SEED_DARK);
    expect(getByText('100%')).toBeTruthy();
    expect(getByText(/20 \/ 20/)).toBeTruthy();
  });

  it('V3 guards a non-positive goal', () => {
    const { getByLabelText } = renderThemed(<PetActivityRingV3 variant="calories" value={5} goal={0} />, SEED_LIGHT);
    expect(getByLabelText('Calories: no goal set')).toBeTruthy();
  });
});

describe('AdoptionCard variants (native)', () => {
  it('V2 mounts the photo hero and fires apply + favorite', () => {
    const onApply = jest.fn();
    const onFavorite = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AdoptionCardV2 name="Luna" breed="Tabby" age="2 yrs" sex="F" shelter="Happy Tails" status="available" fee="$120" onApply={onApply} onFavorite={onFavorite} />,
      SEED_LIGHT
    );
    expect(getByText('Luna')).toBeTruthy();
    fireEvent.press(getByText('Apply to adopt'));
    expect(onApply).toHaveBeenCalledTimes(1);
    fireEvent.press(getByLabelText('Add Luna to favorites'));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });

  it('V3 mounts a media-left row (empty photo → glyph) and fires apply', () => {
    const onApply = jest.fn();
    const { getByText } = renderThemed(
      <AdoptionCardV3 name="Rex" breed="Beagle" age="1 yr" status="available" fee="$80" onApply={onApply} onFavorite={() => {}} />,
      SEED_DARK
    );
    expect(getByText('Rex')).toBeTruthy();
    fireEvent.press(getByText('Apply'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });
});

describe('design-variants token purity (native)', () => {
  it.each([SEED_LIGHT, SEED_DARK])('every rendered style hex traces to a token', (seed) => {
    const { root } = renderThemed(
      <>
        <PetProfileCardV2 name="Biscuit" species="dog" breed="Corgi" age="3 yrs" sex="male" weight="12 kg" fixed microchipId="985141000123456" onPress={() => {}} />
        <PetProfileCardV3 name="Milo" species="cat" breed="Tabby" age="2 yrs" sex="female" fixed onPress={() => {}} />
        <VetAppointmentCardV2 vetName="Dr. Paws" clinic="City Vet" reason="dental" date="Mar 3" time="10:00" status="today" petName="Biscuit" notes="Fast 12h" onAction={() => {}} onCancel={() => {}} />
        <VetAppointmentCardV3 vetName="Dr. Bones" clinic="Paws Clinic" reason="checkup" date="Apr 1" time="09:00" status="upcoming" onAction={() => {}} />
        <PetActivityRingV2 variant="exercise" value={30} goal={45} />
        <PetActivityRingV3 variant="steps" value={4200} goal={6000} />
        <AdoptionCardV2 name="Luna" breed="Tabby" age="2 yrs" sex="F" shelter="Happy Tails" status="pending" fee="$120" favorited onApply={() => {}} onFavorite={() => {}} onPress={() => {}} />
        <AdoptionCardV3 name="Rex" breed="Beagle" age="1 yr" status="available" fee="$80" onApply={() => {}} onFavorite={() => {}} onPress={() => {}} />
      </>,
      seed
    );
    const allowed = tokenHexSet(seed);
    const found = renderedStyleHexes(root);
    expect(found.length).toBeGreaterThan(0);
    found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
