import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { PropertyCardV2 } from './PropertyCardV2';
import { PropertyCardV3 } from './PropertyCardV3';
import { AgentCardV2 } from './AgentCardV2';
import { AgentCardV3 } from './AgentCardV3';
import { ListingGalleryV2 } from './ListingGalleryV2';
import { ListingGalleryV3 } from './ListingGalleryV3';
import { ComparableRowV2 } from './ComparableRowV2';
import { ComparableRowV3 } from './ComparableRowV3';

describe('PropertyCard design variants (native)', () => {
  it('V2 renders full-bleed price/address and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PropertyCardV2
        address="123 Elm St"
        locality="Brooklyn, NY"
        priceCents={72500000}
        beds={3}
        baths={2}
        sqft={1450}
        status="new"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('3 bd')).toBeTruthy();
    fireEvent.press(getByLabelText(/123 Elm St/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the price rail row and appends /mo for rentals', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PropertyCardV3 address="9 Rent Rd" priceCents={320000} variant="rent" beds={1} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('9 Rent Rd')).toBeTruthy();
    expect(getByText('/mo')).toBeTruthy();
    fireEvent.press(getByLabelText(/9 Rent Rd/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('AgentCard design variants (native)', () => {
  it('V2 renders a centered hero and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <AgentCardV2 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={onContact} />,
      SEED_LIGHT
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the compact row and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <AgentCardV3 name="Dana Reyes" agency="Xen Realty" rating={4.2} reviewCount={87} onContact={onContact} />,
      SEED_DARK
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('ListingGallery design variants (native)', () => {
  const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg'];

  it('V2 selects a thumbnail and reports the new index', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ListingGalleryV2 images={IMAGES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    expect(getByText('1 / 3')).toBeTruthy();
    fireEvent.press(getByLabelText('Show photo 2'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('2 / 3')).toBeTruthy();
  });

  it('V3 selects a grid tile and reports the new index', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <ListingGalleryV3 images={IMAGES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Photo 3 of 3'));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('both variants render an empty state with no images', () => {
    const v2 = renderThemed(<ListingGalleryV2 images={[]} />, SEED_DARK);
    expect(v2.getByText('No photos yet')).toBeTruthy();
    const v3 = renderThemed(<ListingGalleryV3 images={[]} />, SEED_DARK);
    expect(v3.getByText('No photos yet')).toBeTruthy();
  });
});

describe('ComparableRow design variants (native)', () => {
  it('V2 renders the stat strip and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComparableRowV2 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('10 Oak Ave')).toBeTruthy();
    expect(getByText('Price')).toBeTruthy();
    expect(getByText('$/sq ft')).toBeTruthy();
    fireEvent.press(getByLabelText(/10 Oak Ave/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the compact leaderboard line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComparableRowV3 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="active" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('10 Oak Ave')).toBeTruthy();
    fireEvent.press(getByLabelText(/10 Oak Ave/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native realestate design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PropertyCardV2 address="123 Elm St" locality="Brooklyn, NY" priceCents={72500000} beds={3} baths={2} sqft={1450} status="active" imageUrl="x.jpg" />
          <PropertyCardV2 address="No Photo Rd" priceCents={500000} variant="rent" loading />
          <PropertyCardV3 address="123 Elm St" priceCents={72500000} beds={3} baths={2} sqft={1450} status="new" variant="rent" />
          <AgentCardV2 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={() => {}} />
          <AgentCardV3 name="Dana Reyes" agency="Xen Realty" rating={4.2} reviewCount={87} onContact={() => {}} onPress={() => {}} />
          <ListingGalleryV2 images={['a.jpg', 'b.jpg']} />
          <ListingGalleryV2 images={[]} />
          <ListingGalleryV3 images={['a.jpg', 'b.jpg', 'c.jpg']} />
          <ListingGalleryV3 images={[]} />
          <ComparableRowV2 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
          <ComparableRowV3 address="12 Oak Ave" priceCents={70000000} sqft={1500} beds={4} baths={3} status="pending" />
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
