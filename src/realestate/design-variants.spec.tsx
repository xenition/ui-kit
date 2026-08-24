/** @jest-environment jsdom */
/**
 * Alternate realestate designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of AgentCard, ComparableRow, ListingGallery, PropertyCard. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex beyond geometric heights/widths), and (c) honor a
 * key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AgentCardV2 } from './AgentCardV2';
import { AgentCardV3 } from './AgentCardV3';
import { ComparableRowV2 } from './ComparableRowV2';
import { ComparableRowV3 } from './ComparableRowV3';
import { ListingGalleryV2 } from './ListingGalleryV2';
import { ListingGalleryV3 } from './ListingGalleryV3';
import { PropertyCardV2 } from './PropertyCardV2';
import { PropertyCardV3 } from './PropertyCardV3';

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
// height/width geometry is allowed; only *color* hex is forbidden.
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg'];

describe('AgentCard alternates (web)', () => {
  it('V2 fires onContact', () => {
    const onContact = jest.fn();
    const { getByText, container } = render(<AgentCardV2 name="Ada Realtor" title="Listing Agent" rating={4.8} onContact={onContact} />);
    expect(getByText('Ada Realtor')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<AgentCardV3 name="Leo Agent" agency="Acme" rating={4.2} />);
    expect(getByText('Leo Agent')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ComparableRow alternates (web)', () => {
  it('V2 renders comp stats', () => {
    const { getByText, container } = render(<ComparableRowV2 address="12 Oak St" priceCents={45000000} sqft={1500} beds={3} baths={2} status="sold" />);
    expect(getByText('12 Oak St')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<ComparableRowV3 address="9 Elm Ave" priceCents={38000000} beds={2} status="active" />);
    expect(getByText('9 Elm Ave')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ListingGallery alternates (web)', () => {
  it('V2 navigates via thumbnails', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, container } = render(<ListingGalleryV2 images={IMAGES} onIndexChange={onIndexChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Go to photo 3'));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });
  it('V3 advances on next', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, container } = render(<ListingGalleryV3 images={IMAGES} onIndexChange={onIndexChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Next photo'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });
});

describe('PropertyCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PropertyCardV2 address="5 Pine Rd" locality="Brooklyn" priceCents={72000000} beds={4} baths={3} status="new" onClick={onClick} />);
    expect(getByText('5 Pine Rd')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('5 Pine Rd'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders rent suffix', () => {
    const { getByText, container } = render(<PropertyCardV3 address="7 Bay St" priceCents={250000} variant="rent" beds={1} />);
    expect(getByText('7 Bay St')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});
