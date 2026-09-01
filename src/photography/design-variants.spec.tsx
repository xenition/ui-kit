/** @jest-environment jsdom */
/**
 * Alternate photography designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of AlbumCard, PackageCard, PhotoTile, PortfolioGrid. Each variant
 * keeps the base props; these specs prove they (a) mount, (b) stay token-pure (no
 * literal hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AlbumCardV2 } from './AlbumCardV2';
import { AlbumCardV3 } from './AlbumCardV3';
import { PackageCardV2 } from './PackageCardV2';
import { PackageCardV3 } from './PackageCardV3';
import { PhotoTileV2 } from './PhotoTileV2';
import { PhotoTileV3 } from './PhotoTileV3';
import { PortfolioGridV2 } from './PortfolioGridV2';
import { PortfolioGridV3 } from './PortfolioGridV3';
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

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const ITEMS = [
  { url: 'a.jpg', alt: 'One', caption: 'One' },
  { url: 'b.jpg', alt: 'Two' },
];

describe('AlbumCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<AlbumCardV2 title="Summer" photoCount={12} dateText="Aug" isPrivate onClick={onClick} />);
    expect(getByText('Summer')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Summer'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<AlbumCardV3 title="Trip" photoCount={4} />);
    expect(getByText('Trip')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PackageCard alternates (web)', () => {
  it('V2 fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(<PackageCardV2 name="Gold" priceCents={50000} features={['10 hrs']} featured onSelect={onSelect} />);
    expect(getByText('Gold')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Choose package'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
  it('V3 fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText, container } = render(<PackageCardV3 name="Silver" priceCents={20000} onSelect={onSelect} />);
    expect(getByText('Silver')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Choose'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('PhotoTile alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<PhotoTileV2 url="x.jpg" alt="Sunset" caption="Sunset" onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Sunset'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders selected + favorite', () => {
    const { getByLabelText, container } = render(<PhotoTileV3 url="x.jpg" alt="Beach" selected favorite />);
    expect(getByLabelText('Selected')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('PortfolioGrid alternates (web)', () => {
  it('V2 opens a tile', () => {
    const onOpen = jest.fn();
    const { getByLabelText, container } = render(<PortfolioGridV2 items={ITEMS} onOpen={onOpen} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('One'));
    expect(onOpen).toHaveBeenCalledWith(0);
  });
  it('V3 opens a tile', () => {
    const onOpen = jest.fn();
    const { getByLabelText, container } = render(<PortfolioGridV3 items={ITEMS} onOpen={onOpen} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Two'));
    expect(onOpen).toHaveBeenCalledWith(1);
  });
});

describe('photography V4 "studio" line (web)', () => {
  it('mounts all 12 V4 components with representative props and stays token-pure', () => {
    const { getByText, container } = render(
      <>
        {/* AlbumCard across all three variant layouts. */}
        <AlbumCardV4 title="Sato Wedding" photoCount={248} dateText="Aug 24, 2026" coverUrl="cover.jpg" isPrivate variant="cover" onClick={() => undefined} />
        <AlbumCardV4 title="Tanaka Family" photoCount={64} dateText="Jul 2026" variant="list" />
        <AlbumCardV4 title="Studio Tests" photoCount={9} variant="compact" />

        {/* PhotoTile across every ratio. */}
        <PhotoTileV4 url="a.jpg" alt="Portrait" caption="Golden hour" ratio="square" selected favorite onClick={() => undefined} />
        <PhotoTileV4 url="b.jpg" alt="Rings" ratio="portrait" />
        <PhotoTileV4 url="c.jpg" alt="Ceremony" ratio="landscape" />

        {/* PortfolioGrid grid + masonry. */}
        <PortfolioGridV4 items={ITEMS} title="Weddings" variant="grid" onOpen={() => undefined} />
        <PortfolioGridV4 items={ITEMS} title="Editorial" variant="masonry" onOpen={() => undefined} />

        {/* GalleryHeader hero (cover + gradient) and compact. */}
        <GalleryHeaderV4 title="Client Gallery" subtitle="Sato · Aug 2026" photoCount={248} coverUrl="hero.jpg" variant="hero" />
        <GalleryHeaderV4 title="Brand Gradient Hero" subtitle="No cover" photoCount={12} variant="hero" />
        <GalleryHeaderV4 title="Compact Band" subtitle="A clean studio band" photoCount={30} variant="compact" />

        {/* LightboxThumb sm + md + active. */}
        <LightboxThumbV4 url="t1.jpg" alt="Thumb one" size="sm" index={0} onClick={() => undefined} />
        <LightboxThumbV4 url="t2.jpg" alt="Thumb two" size="md" active onClick={() => undefined} />

        {/* The rest of the studio line. */}
        <PackageCardV4 name="Gold" tagline="Full day" priceCents={280000} priceSuffix="per event" features={['8 hours coverage', 'Two photographers']} featured onSelect={() => undefined} />
        <PricePackageRowV4 label="Extra edited photo" description="Beyond the package" priceCents={2500} unitSuffix="each" highlighted badgeLabel="Best value" onClick={() => undefined} />
        <ShootBookingCardV4 clientName="Aiko Sato" shootType="Wedding" dateText="Sat, Aug 30" timeText="2–5 PM" location="Kyoto" status="confirmed" priceCents={280000} onConfirm={() => undefined} onClick={() => undefined} />
        <PrintOrderRowV4 product="Fine Art Print" size="24×36" finish="Matte" quantity={2} unitPriceCents={9000} status="shipped" onClick={() => undefined} />
        <ClientProofRowV4 filename="IMG_0421.jpg" thumbUrl="p.jpg" decision="pending" selected onToggleSelect={() => undefined} onApprove={() => undefined} onReject={() => undefined} />
        <EquipmentRowV4 name="Canon R5" category="Bodies" glyph="📷" status="in-use" meta="SN 8842" onClick={() => undefined} />
        <ShotListItemV4 title="First dance" notes="Wide + close" priority="must" onToggle={() => undefined} />
      </>
    );
    expect(getByText('Sato Wedding')).toBeTruthy();
    expect(getByText('Gold')).toBeTruthy();
    expect(getByText('First dance')).toBeTruthy();
    expect(getByText('Brand Gradient Hero')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('AlbumCardV4 fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(<AlbumCardV4 title="Summer" photoCount={12} isPrivate onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Summer, 12 photos, private'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('ShootBookingCardV4 confirm fires onConfirm for status="requested" (without triggering the card)', () => {
    const onConfirm = jest.fn();
    const onClick = jest.fn();
    const { getByText } = render(
      <ShootBookingCardV4 clientName="Aiko Sato" shootType="Wedding" status="requested" onConfirm={onConfirm} onClick={onClick} confirmLabel="Confirm" />
    );
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('LightboxThumbV4 fires onClick and PortfolioGridV4 opens a tile', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(<LightboxThumbV4 url="t.jpg" alt="Thumb" index={3} onClick={onClick} />);
    fireEvent.click(getByLabelText('Thumb'));
    expect(onClick).toHaveBeenCalledTimes(1);

    const onOpen = jest.fn();
    const grid = render(<PortfolioGridV4 items={ITEMS} onOpen={onOpen} />);
    fireEvent.click(grid.getByLabelText('One'));
    expect(onOpen).toHaveBeenCalledWith(0);
  });
});
