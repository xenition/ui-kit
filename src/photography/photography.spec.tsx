/** @jest-environment jsdom */
/**
 * Web photography components: render smoke, token-purity (no hex/rgb literal in
 * any className), the empty state, and the core interactions (tile selection,
 * card press, confirm/approve actions, checkbox toggle). Plain jsdom via the
 * docblock; no provider needed since assertions are on static token classes.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import type { MediaItem } from '../media';
import { PortfolioGrid } from './PortfolioGrid';
import { AlbumCard } from './AlbumCard';
import { PhotoTile } from './PhotoTile';
import { ShootBookingCard } from './ShootBookingCard';
import { PackageCard } from './PackageCard';
import { PricePackageRow } from './PricePackageRow';
import { ShotListItem } from './ShotListItem';
import { ClientProofRow } from './ClientProofRow';
import { PrintOrderRow } from './PrintOrderRow';
import { GalleryHeader } from './GalleryHeader';
import { LightboxThumb } from './LightboxThumb';
import { EquipmentRow } from './EquipmentRow';

const HEX_OR_RGB = /#[0-9a-fA-F]{3,8}\b|\brgba?\(/;

const items: MediaItem[] = [
  { url: '/a.jpg', alt: 'Alpha', width: 800, height: 600 },
  { url: '/b.jpg', alt: 'Beta', width: 600, height: 900 },
];

/** Collect every className string in a tree — used for the token-purity sweep. */
function allClassNames(root: HTMLElement): string {
  return Array.from(root.querySelectorAll<HTMLElement>('*'))
    .map((el) => el.getAttribute('class') ?? '')
    .join(' ');
}

describe('PortfolioGrid', () => {
  it('renders the media grid when populated', () => {
    const { container } = render(<PortfolioGrid items={items} title="Portfolio" />);
    expect(container.querySelector('[data-xen-portfolio-grid]')).not.toBeNull();
    expect(container.querySelectorAll('img').length).toBe(2);
  });

  it('renders an empty state when there are no photos', () => {
    const { getByText } = render(
      <PortfolioGrid items={[]} emptyLabel="No photos yet" emptyDescription="Upload some shots" />
    );
    expect(getByText('No photos yet')).not.toBeNull();
    expect(getByText('Upload some shots')).not.toBeNull();
  });

  it('fires onOpen(index) when a tile is activated', () => {
    const onOpen = jest.fn();
    const { container } = render(<PortfolioGrid items={items} onOpen={onOpen} />);
    const tiles = container.querySelectorAll('[data-xen-gallery-item] button');
    fireEvent.click(tiles[1]!);
    expect(onOpen).toHaveBeenCalledWith(1);
  });
});

describe('PhotoTile', () => {
  it('exposes a selected token accent ring and reports aria-pressed', () => {
    const { getByRole } = render(<PhotoTile url="/a.jpg" alt="A" selected onClick={() => undefined} />);
    const el = getByRole('button');
    expect(el.className).toContain('ring-accent');
    expect(el.getAttribute('aria-pressed')).toBe('true');
  });

  it('fires onClick and forwards the ref to the DOM root', () => {
    const onClick = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const { getByRole } = render(<PhotoTile ref={ref} url="/a.jpg" alt="A" onClick={onClick} />);
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(ref.current?.getAttribute('data-xen-photo-tile')).toBe('');
  });
});

describe('AlbumCard', () => {
  it('renders the title, a private badge, and is keyboard-operable', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <AlbumCard title="Summer 2026" photoCount={42} isPrivate onClick={onClick} />
    );
    expect(getByText('Summer 2026')).not.toBeNull();
    expect(getByText('Private')).not.toBeNull();
    const card = getByRole('button');
    expect(card.className).toContain('bg-surface');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('ShootBookingCard', () => {
  it('shows the status label + price and fires confirm without bubbling to the card', () => {
    const onConfirm = jest.fn();
    const onClick = jest.fn();
    const { getByText } = render(
      <ShootBookingCard
        clientName="Ada Lovelace"
        status="requested"
        priceCents={125000}
        onConfirm={onConfirm}
        onClick={onClick}
      />
    );
    expect(getByText('Requested')).not.toBeNull();
    expect(getByText('$1,250.00')).not.toBeNull();
    fireEvent.click(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('PackageCard', () => {
  it('rings a featured package with the accent token and shows the badge', () => {
    const onSelect = jest.fn();
    const { container, getByText } = render(
      <PackageCard name="Gold" priceCents={99900} featured features={['8 hours']} onSelect={onSelect} />
    );
    const root = container.querySelector<HTMLElement>('[data-xen-package-card]')!;
    expect(root.className).toContain('border-accent');
    expect(getByText('Popular')).not.toBeNull();
    fireEvent.click(getByText('Choose package'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('falls back to an empty-features line', () => {
    const { getByText } = render(<PackageCard name="Basic" priceCents={1000} />);
    expect(getByText('Details coming soon')).not.toBeNull();
  });
});

describe('PricePackageRow', () => {
  it('applies the accent tint token when highlighted', () => {
    const { container } = render(
      <PricePackageRow label="Extra photo" priceCents={2500} highlighted badgeLabel="Best value" />
    );
    const root = container.querySelector<HTMLElement>('[data-xen-price-package-row]')!;
    expect(root.className).toContain('bg-accent-50');
  });
});

describe('ShotListItem', () => {
  it('toggles via the checkbox role and reflects aria-checked', () => {
    const onToggle = jest.fn();
    const { getByRole } = render(<ShotListItem title="First look" done onToggle={onToggle} />);
    const box = getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('true');
    fireEvent.click(box);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('ClientProofRow', () => {
  it('fires approve from the action button, not the selection body', () => {
    const onApprove = jest.fn();
    const onToggleSelect = jest.fn();
    const { getByText } = render(
      <ClientProofRow
        filename="IMG_0421.jpg"
        onApprove={onApprove}
        onToggleSelect={onToggleSelect}
      />
    );
    fireEvent.click(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onToggleSelect).not.toHaveBeenCalled();
  });
});

describe('token purity', () => {
  it('uses no hex/rgb literal in any className across the module', () => {
    const { container } = render(
      <div>
        <PortfolioGrid items={items} title="P" />
        <AlbumCard title="A" photoCount={3} isPrivate variant="list" onClick={() => undefined} />
        <PhotoTile url="/a.jpg" alt="A" selected favorite caption="Golden hour" onClick={() => undefined} />
        <ShootBookingCard clientName="C" status="confirmed" priceCents={5000} dateText="Sat" />
        <PackageCard name="Gold" priceCents={9900} featured features={['x']} onSelect={() => undefined} />
        <PricePackageRow label="L" priceCents={100} highlighted badgeLabel="B" />
        <ShotListItem title="S" priority="must" done onToggle={() => undefined} />
        <ClientProofRow filename="f.jpg" decision="approved" />
        <PrintOrderRow product="Print" size="16 × 24 in" unitPriceCents={4000} quantity={2} status="shipped" onClick={() => undefined} />
        <GalleryHeader title="Wedding" subtitle="Ada & Grace" photoCount={120} coverUrl="/cover.jpg" />
        <GalleryHeader title="Compact" variant="compact" photoCount={8} />
        <LightboxThumb url="/t.jpg" alt="Thumb" active index={1} onClick={() => undefined} />
        <EquipmentRow name="Canon R5" category="Camera body" status="in-use" onClick={() => undefined} />
      </div>
    );
    expect(allClassNames(container)).not.toMatch(HEX_OR_RGB);
  });
});
