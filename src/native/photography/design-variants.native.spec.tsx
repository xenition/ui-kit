import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { PortfolioGridV2 } from './PortfolioGridV2';
import { PortfolioGridV3 } from './PortfolioGridV3';
import { AlbumCardV2 } from './AlbumCardV2';
import { AlbumCardV3 } from './AlbumCardV3';
import { PhotoTileV2 } from './PhotoTileV2';
import { PhotoTileV3 } from './PhotoTileV3';
import { PackageCardV2 } from './PackageCardV2';
import { PackageCardV3 } from './PackageCardV3';
import {
  AlbumCardV4,
  PhotoTileV4,
  PortfolioGridV4,
  GalleryHeaderV4,
  LightboxThumbV4,
  PackageCardV4,
  PricePackageRowV4,
  ShootBookingCardV4,
  PrintOrderRowV4,
  ClientProofRowV4,
  EquipmentRowV4,
  ShotListItemV4,
} from './index';
import type { MediaItem } from '../../media/types';

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

const PHOTOS: MediaItem[] = [
  { url: 'https://cdn.test/a.jpg', alt: 'Bride portrait', width: 800, height: 1200, caption: 'Golden hour' },
  { url: 'https://cdn.test/b.jpg', alt: 'Ceremony', width: 1600, height: 900 },
  { url: 'https://cdn.test/c.jpg', alt: 'Rings', width: 1000, height: 1000 },
  { url: 'https://cdn.test/d.jpg', alt: 'First dance', width: 900, height: 1200 },
];

const FEATURES = ['8 hours coverage', 'Two photographers', 'Online gallery', '100 edited photos'];

describe('photography design variants — mount + core content', () => {
  it('PortfolioGridV2 / V3 render a title and the photos (and an empty grid)', () => {
    const v2 = renderThemed(<PortfolioGridV2 items={PHOTOS} title="Weddings" columns={3} onOpen={() => undefined} />, SEED_LIGHT);
    expect(v2.getByText('Weddings')).toBeTruthy();

    const v3 = renderThemed(<PortfolioGridV3 items={PHOTOS} title="Portraits" columns={4} />, SEED_DARK);
    expect(v3.getByText('Portraits')).toBeTruthy();

    // Empty PortfolioGrid — both variants show the empty state.
    const emptyV2 = renderThemed(<PortfolioGridV2 items={[]} emptyLabel="No shots yet" />, SEED_LIGHT);
    expect(emptyV2.getByText('No shots yet')).toBeTruthy();
    const emptyV3 = renderThemed(<PortfolioGridV3 items={[]} emptyLabel="Nothing here" />, SEED_DARK);
    expect(emptyV3.getByText('Nothing here')).toBeTruthy();

    // Loading skeletons mount without content.
    expect(renderThemed(<PortfolioGridV2 items={[]} loading loadingCount={5} />, SEED_LIGHT).getByLabelText('Loading photos')).toBeTruthy();
    expect(renderThemed(<PortfolioGridV3 items={[]} loading loadingCount={5} />, SEED_DARK).getByLabelText('Loading photos')).toBeTruthy();
  });

  it('AlbumCardV2 / V3 render title, count and date', () => {
    const v2 = renderThemed(
      <AlbumCardV2 title="Sato Wedding" photoCount={248} dateText="Aug 24, 2026" coverUrl="https://cdn.test/cover.jpg" isPrivate onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Sato Wedding')).toBeTruthy();
    expect(v2.getByText('248 photos · Aug 24, 2026')).toBeTruthy();
    expect(v2.getByText('Private')).toBeTruthy();

    const v3 = renderThemed(<AlbumCardV3 title="Tanaka Family" photoCount={64} dateText="Jul 2026" />, SEED_DARK);
    expect(v3.getByText('Tanaka Family')).toBeTruthy();
    expect(v3.getByText('64 photos · Jul 2026')).toBeTruthy();

    // Loading skeletons.
    expect(renderThemed(<AlbumCardV2 title="x" loading />, SEED_LIGHT).getByLabelText('Loading album')).toBeTruthy();
    expect(renderThemed(<AlbumCardV3 title="x" loading />, SEED_DARK).getByLabelText('Loading album')).toBeTruthy();
  });

  it('PhotoTileV2 / V3 render captions and expose selection state', () => {
    const v2 = renderThemed(
      <PhotoTileV2 url="https://cdn.test/a.jpg" alt="Portrait" caption="Golden hour" selected favorite onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Golden hour')).toBeTruthy();
    expect(v2.getByLabelText('Selected')).toBeTruthy();
    expect(v2.getByLabelText('Favourited')).toBeTruthy();

    const v3 = renderThemed(<PhotoTileV3 url="https://cdn.test/b.jpg" alt="Rings" selected onPress={() => undefined} />, SEED_DARK);
    expect(v3.getByLabelText('Selected')).toBeTruthy();

    // Loading skeletons.
    expect(renderThemed(<PhotoTileV2 loading />, SEED_LIGHT).getByLabelText('Loading photo')).toBeTruthy();
    expect(renderThemed(<PhotoTileV3 loading />, SEED_DARK).getByLabelText('Loading photo')).toBeTruthy();
  });

  it('PackageCardV2 / V3 render name, price, features (and empty-features fallback)', () => {
    const v2 = renderThemed(
      <PackageCardV2 name="Gold" tagline="Full day" priceCents={280000} priceSuffix="per event" features={FEATURES} featured onSelect={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Gold')).toBeTruthy();
    expect(v2.getByText('$2,800.00')).toBeTruthy();
    expect(v2.getByText('8 hours coverage')).toBeTruthy();
    expect(v2.getByText('Choose package')).toBeTruthy();

    const v3 = renderThemed(<PackageCardV3 name="Silver" tagline="Half day" priceCents={150000} features={FEATURES} onSelect={() => undefined} />, SEED_DARK);
    expect(v3.getByText('Silver')).toBeTruthy();
    expect(v3.getByText('$1,500.00')).toBeTruthy();
    expect(v3.getByText('Half day · 4 included')).toBeTruthy();

    // Empty features → fallback line.
    const emptyV2 = renderThemed(<PackageCardV2 name="Basic" priceCents={50000} emptyFeaturesLabel="TBD" />, SEED_LIGHT);
    expect(emptyV2.getByText('TBD')).toBeTruthy();
    const emptyV3 = renderThemed(<PackageCardV3 name="Basic" priceCents={50000} emptyFeaturesLabel="TBD" />, SEED_DARK);
    expect(emptyV3.getByText('TBD')).toBeTruthy();
  });
});

describe('photography design variants — interaction', () => {
  it('PortfolioGridV2 opens a photo by its original index', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = renderThemed(<PortfolioGridV2 items={PHOTOS} columns={2} onOpen={onOpen} />, SEED_LIGHT);
    // Round-robin into 2 columns keeps index 2 ("Rings") addressable.
    fireEvent.press(getByLabelText('Rings'));
    expect(onOpen).toHaveBeenCalledWith(2);
  });

  it('PortfolioGridV3 opens a photo by its index', () => {
    const onOpen = jest.fn();
    const { getByLabelText } = renderThemed(<PortfolioGridV3 items={PHOTOS} columns={3} onOpen={onOpen} />, SEED_DARK);
    fireEvent.press(getByLabelText('First dance'));
    expect(onOpen).toHaveBeenCalledWith(3);
  });

  it('AlbumCardV2 / V3 fire onPress', () => {
    const onPressV2 = jest.fn();
    const v2 = renderThemed(<AlbumCardV2 title="Sato Wedding" photoCount={10} onPress={onPressV2} />, SEED_LIGHT);
    fireEvent.press(v2.getByLabelText('Sato Wedding, 10 photos'));
    expect(onPressV2).toHaveBeenCalledTimes(1);

    const onPressV3 = jest.fn();
    const v3 = renderThemed(<AlbumCardV3 title="Tanaka Family" onPress={onPressV3} />, SEED_DARK);
    fireEvent.press(v3.getByLabelText('Tanaka Family'));
    expect(onPressV3).toHaveBeenCalledTimes(1);
  });

  it('PhotoTileV2 fires onPress and PackageCardV3 selects on the row', () => {
    const onPress = jest.fn();
    const tile = renderThemed(<PhotoTileV2 url="https://cdn.test/a.jpg" alt="Portrait" onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(tile.getByLabelText('Portrait'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const onSelect = jest.fn();
    const pkg = renderThemed(<PackageCardV3 name="Silver" priceCents={150000} onSelect={onSelect} />, SEED_DARK);
    fireEvent.press(pkg.getByLabelText('Silver'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('PackageCardV2 selects on its CTA', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(<PackageCardV2 name="Gold" priceCents={280000} featured onSelect={onSelect} ctaLabel="Book Gold" />, SEED_LIGHT);
    fireEvent.press(getByText('Book Gold'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('photography design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PortfolioGridV2 items={PHOTOS} title="Weddings" columns={3} onOpen={() => undefined} />
          <PortfolioGridV3 items={PHOTOS} title="Portraits" columns={4} onOpen={() => undefined} />
          <PortfolioGridV2 items={[]} loading loadingCount={4} />
          <PortfolioGridV3 items={[]} loading loadingCount={4} />
          <AlbumCardV2 title="Sato Wedding" photoCount={248} dateText="Aug 24, 2026" coverUrl="https://cdn.test/cover.jpg" isPrivate onPress={() => undefined} />
          <AlbumCardV2 title="No cover" loading />
          <AlbumCardV3 title="Tanaka Family" photoCount={64} dateText="Jul 2026" onPress={() => undefined} />
          <AlbumCardV3 title="Loading" loading />
          <PhotoTileV2 url="https://cdn.test/a.jpg" alt="Portrait" caption="Golden hour" selected favorite onPress={() => undefined} />
          <PhotoTileV2 loading />
          <PhotoTileV3 url="https://cdn.test/b.jpg" alt="Rings" selected favorite onPress={() => undefined} />
          <PhotoTileV3 loading />
          <PackageCardV2 name="Gold" tagline="Full day" priceCents={280000} priceSuffix="per event" features={FEATURES} featured onSelect={() => undefined} />
          <PackageCardV2 name="Basic" priceCents={50000} />
          <PackageCardV3 name="Silver" tagline="Half day" priceCents={150000} features={FEATURES} featured onSelect={() => undefined} />
          <PackageCardV3 name="Basic" priceCents={50000} />
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

describe('photography V4 "studio" line (native)', () => {
  it('mounts all 12 V4 components with representative props (SEED_LIGHT)', () => {
    const { getByText } = renderThemed(
      <>
        <AlbumCardV4 title="Sato Wedding" photoCount={248} dateText="Aug 24, 2026" coverUrl="https://cdn.test/cover.jpg" isPrivate variant="cover" onPress={() => undefined} />
        <AlbumCardV4 title="Tanaka Family" photoCount={64} dateText="Jul 2026" variant="list" />
        <AlbumCardV4 title="Studio Tests" photoCount={9} variant="compact" />

        <PhotoTileV4 url="https://cdn.test/a.jpg" alt="Portrait" caption="Golden hour" ratio="square" selected favorite onPress={() => undefined} />
        <PhotoTileV4 url="https://cdn.test/b.jpg" alt="Rings" ratio="portrait" />
        <PhotoTileV4 url="https://cdn.test/c.jpg" alt="Ceremony" ratio="landscape" />

        <PortfolioGridV4 items={PHOTOS} title="Weddings" columns={3} variant="grid" onOpen={() => undefined} />

        <GalleryHeaderV4 title="Client Gallery" subtitle="Sato · Aug 2026" photoCount={248} coverUrl="https://cdn.test/hero.jpg" variant="hero" />
        <GalleryHeaderV4 title="Brand Gradient Hero" subtitle="No cover" photoCount={12} variant="hero" />
        <GalleryHeaderV4 title="Compact Band" subtitle="A clean studio band" photoCount={30} variant="compact" />

        <LightboxThumbV4 url="https://cdn.test/t1.jpg" alt="Thumb one" size="sm" index={0} onPress={() => undefined} />
        <LightboxThumbV4 url="https://cdn.test/t2.jpg" alt="Thumb two" size="md" active onPress={() => undefined} />

        <PackageCardV4 name="Gold" tagline="Full day" priceCents={280000} priceSuffix="per event" features={FEATURES} featured onSelect={() => undefined} />
        <PricePackageRowV4 label="Extra edited photo" description="Beyond the package" priceCents={2500} unitSuffix="each" highlighted badgeLabel="Best value" onPress={() => undefined} />
        <ShootBookingCardV4 clientName="Aiko Sato" shootType="Wedding" dateText="Sat, Aug 30" timeText="2–5 PM" location="Kyoto" status="confirmed" priceCents={280000} onPress={() => undefined} />
        <PrintOrderRowV4 product="Fine Art Print" size="24×36" finish="Matte" quantity={2} unitPriceCents={9000} status="shipped" onPress={() => undefined} />
        <ClientProofRowV4 filename="IMG_0421.jpg" thumbUrl="https://cdn.test/p.jpg" decision="pending" selected onToggleSelect={() => undefined} onApprove={() => undefined} onReject={() => undefined} />
        <EquipmentRowV4 name="Canon R5" category="Bodies" glyph="📷" status="in-use" meta="SN 8842" onPress={() => undefined} />
        <ShotListItemV4 title="First dance" notes="Wide + close" priority="must" onToggle={() => undefined} />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Sato Wedding')).toBeTruthy();
    expect(getByText('Gold')).toBeTruthy();
    expect(getByText('First dance')).toBeTruthy();
  });

  it('AlbumCardV4 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AlbumCardV4 title="Sato Wedding" photoCount={10} isPrivate onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Sato Wedding, 10 photos, private'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('ShotListItemV4 toggles and EquipmentRowV4 fires onPress', () => {
    const onToggle = jest.fn();
    const shot = renderThemed(<ShotListItemV4 title="First dance" priority="must" onToggle={onToggle} />, SEED_DARK);
    fireEvent.press(shot.getByLabelText('First dance'));
    expect(onToggle).toHaveBeenCalledTimes(1);

    const onPress = jest.fn();
    const gear = renderThemed(<EquipmentRowV4 name="Canon R5" status="available" onPress={onPress} />, SEED_LIGHT);
    fireEvent.press(gear.getByLabelText('Canon R5, Available'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('LightboxThumbV4 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <LightboxThumbV4 url="https://cdn.test/t.jpg" alt="Thumb" index={3} onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText('Thumb'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('photography V4 studio line — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <AlbumCardV4 title="Sato Wedding" photoCount={248} dateText="Aug 24, 2026" coverUrl="https://cdn.test/cover.jpg" isPrivate variant="cover" onPress={() => undefined} />
          <AlbumCardV4 title="Tanaka Family" photoCount={64} dateText="Jul 2026" variant="list" />
          <AlbumCardV4 title="Studio Tests" photoCount={9} variant="compact" />
          <AlbumCardV4 title="Loading" loading />

          <PhotoTileV4 url="https://cdn.test/a.jpg" alt="Portrait" caption="Golden hour" ratio="square" selected favorite onPress={() => undefined} />
          <PhotoTileV4 url="https://cdn.test/b.jpg" alt="Rings" ratio="portrait" />
          <PhotoTileV4 url="https://cdn.test/c.jpg" alt="Ceremony" ratio="landscape" />
          <PhotoTileV4 loading />

          <PortfolioGridV4 items={PHOTOS} title="Weddings" columns={3} variant="grid" onOpen={() => undefined} />
          <PortfolioGridV4 items={[]} loading loadingCount={4} />
          <PortfolioGridV4 items={[]} emptyLabel="No shots yet" />

          {/* GalleryHeader hero WITHOUT a coverUrl — the reserved brand-gradient ground. */}
          <GalleryHeaderV4 title="Brand Gradient Hero" subtitle="No cover" photoCount={12} variant="hero" />
          {/* GalleryHeader hero WITH a coverUrl — the scrim path. */}
          <GalleryHeaderV4 title="Client Gallery" subtitle="Sato · Aug 2026" photoCount={248} coverUrl="https://cdn.test/hero.jpg" variant="hero" />
          <GalleryHeaderV4 title="Compact Band" subtitle="A clean studio band" photoCount={30} variant="compact" />

          <LightboxThumbV4 url="https://cdn.test/t1.jpg" alt="Thumb one" size="sm" index={0} onPress={() => undefined} />
          <LightboxThumbV4 url="https://cdn.test/t2.jpg" alt="Thumb two" size="md" active onPress={() => undefined} />

          <PackageCardV4 name="Gold" tagline="Full day" priceCents={280000} priceSuffix="per event" features={FEATURES} featured onSelect={() => undefined} />
          <PackageCardV4 name="Basic" priceCents={50000} />
          <PricePackageRowV4 label="Extra edited photo" description="Beyond the package" priceCents={2500} unitSuffix="each" highlighted badgeLabel="Best value" onPress={() => undefined} />
          <PricePackageRowV4 label="Second shooter" priceCents={30000} />
          <ShootBookingCardV4 clientName="Aiko Sato" shootType="Wedding" dateText="Sat, Aug 30" timeText="2–5 PM" location="Kyoto" status="requested" priceCents={280000} onConfirm={() => undefined} onPress={() => undefined} />
          <ShootBookingCardV4 clientName="Mika Tanaka" status="cancelled" />
          <PrintOrderRowV4 product="Fine Art Print" size="24×36" finish="Matte" quantity={2} unitPriceCents={9000} status="shipped" onPress={() => undefined} />
          <PrintOrderRowV4 product="Album" quantity={1} unitPriceCents={45000} status="delivered" />
          <ClientProofRowV4 filename="IMG_0421.jpg" thumbUrl="https://cdn.test/p.jpg" decision="pending" selected onToggleSelect={() => undefined} onApprove={() => undefined} onReject={() => undefined} />
          <ClientProofRowV4 filename="IMG_0500.jpg" decision="approved" />
          <EquipmentRowV4 name="Canon R5" category="Bodies" glyph="📷" status="in-use" meta="SN 8842" onPress={() => undefined} />
          <EquipmentRowV4 name="Broken Strobe" status="unavailable" />
          <ShotListItemV4 title="First dance" notes="Wide + close" priority="must" onToggle={() => undefined} />
          <ShotListItemV4 title="Cake cutting" priority="nice" done onToggle={() => undefined} />
          <ShotListItemV4 title="Details" priority="optional" />
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
