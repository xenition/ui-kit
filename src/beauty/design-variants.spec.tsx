/** @jest-environment jsdom */
/**
 * Alternate beauty designs (v2 / v3) for the web (React DOM) — drop-in redesigns
 * of LoyaltyCard, ServiceMenuItem, StylistCard, TreatmentCard. Each variant keeps
 * the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles beyond geometric widths), and (c) honor a key
 * interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { LoyaltyCardV2 } from './LoyaltyCardV2';
import { LoyaltyCardV3 } from './LoyaltyCardV3';
import { ServiceMenuItemV2 } from './ServiceMenuItemV2';
import { ServiceMenuItemV3 } from './ServiceMenuItemV3';
import { StylistCardV2 } from './StylistCardV2';
import { StylistCardV3 } from './StylistCardV3';
import { TreatmentCardV2 } from './TreatmentCardV2';
import { TreatmentCardV3 } from './TreatmentCardV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('LoyaltyCard alternates (web)', () => {
  it('V2 shows points + progress', () => {
    const { getByText, container } = render(<LoyaltyCardV2 memberName="Ada" points={1200} tier="gold" nextTierAt={2000} nextTierLabel="Platinum" memberId="XN-9001" />);
    expect(getByText('Ada')).toBeTruthy();
    expect(getByText('1,200')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<LoyaltyCardV3 memberName="Leo" points={340} tier="silver" />);
    expect(getByText('Leo')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ServiceMenuItem alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ServiceMenuItemV2 name="Balayage" priceCents={12000} category="hair" durationMin={120} popular onClick={onClick} />);
    expect(getByText('Balayage')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Balayage'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ServiceMenuItemV3 name="Manicure" priceCents={4000} category="nails" durationMin={45} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Manicure'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('StylistCard alternates (web)', () => {
  it('V2 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(<StylistCardV2 name="Mia" role="Senior Colorist" rating={4.9} specialties={['Balayage']} priceFromCents={9000} availability="Today 3pm" onBook={onBook} />);
    expect(getByText('Mia')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(<StylistCardV3 name="Ken" role="Barber" rating={4.5} priceFromCents={3000} onBook={onBook} />);
    expect(getByText('Ken')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});

describe('TreatmentCard alternates (web)', () => {
  it('V2 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(<TreatmentCardV2 name="Deep-tissue massage" priceCents={11000} variant="massage" durationMin={60} onBook={onBook} />);
    expect(getByText('Deep-tissue massage')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onBook', () => {
    const onBook = jest.fn();
    const { getByText, container } = render(<TreatmentCardV3 name="Facial" priceCents={8000} variant="facial" durationMin={50} onBook={onBook} />);
    expect(getByText('Facial')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});
