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
