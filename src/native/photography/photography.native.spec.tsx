import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import type { MediaItem } from '../../media/types';
import { PortfolioGrid } from './PortfolioGrid';
import { AlbumCard } from './AlbumCard';
import { PhotoTile } from './PhotoTile';
import { ShootBookingCard } from './ShootBookingCard';
import { PrintOrderRow } from './PrintOrderRow';
import { PackageCard } from './PackageCard';
import { GalleryHeader } from './GalleryHeader';
import { ClientProofRow } from './ClientProofRow';
import { LightboxThumb } from './LightboxThumb';
import { EquipmentRow } from './EquipmentRow';
import { ShotListItem } from './ShotListItem';
import { PricePackageRow } from './PricePackageRow';

const PHOTOS: MediaItem[] = [
  { url: 'https://x/1.jpg', alt: 'One', width: 800, height: 600 },
  { url: 'https://x/2.jpg', alt: 'Two', width: 600, height: 800 },
  { url: 'https://x/3.jpg', alt: 'Three', width: 800, height: 800 },
];

describe('PortfolioGrid (native)', () => {
  it('renders a title + populated grid', () => {
    const { getByText } = renderThemed(
      <PortfolioGrid title="Selected work" items={PHOTOS} />,
      SEED_LIGHT
    );
    expect(getByText('Selected work')).toBeTruthy();
  });

  it('renders an empty state when there are no photos', () => {
    const { getByText } = renderThemed(
      <PortfolioGrid items={[]} emptyLabel="No photos yet" emptyDescription="Upload some" />,
      SEED_DARK
    );
    expect(getByText('No photos yet')).toBeTruthy();
    expect(getByText('Upload some')).toBeTruthy();
  });

  it('renders a token-pure loading skeleton', () => {
    const { root, getByLabelText } = renderThemed(
      <PortfolioGrid items={[]} loading loadingCount={4} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading photos')).toBeTruthy();
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('AlbumCard (native)', () => {
  it('renders title, count line, and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <AlbumCard title="Kyoto 2026" photoCount={128} dateText="Aug 24, 2026" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('Kyoto 2026')).toBeTruthy();
    expect(getByText('128 photos · Aug 24, 2026')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('shows a private badge (labelled, not color-alone)', () => {
    const { getByText } = renderThemed(
      <AlbumCard title="Unlisted" isPrivate variant="list" />,
      SEED_DARK
    );
    expect(getByText('Private')).toBeTruthy();
  });
});

describe('PhotoTile (native)', () => {
  it('exposes a selected accessibility state and fires onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <PhotoTile url="https://x/1.jpg" alt="Cover" selected onPress={onPress} />,
      SEED_LIGHT
    );
    const btn = getByRole('button');
    expect(btn.props.accessibilityState.selected).toBe(true);
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a caption overlay', () => {
    const { getByText } = renderThemed(
      <PhotoTile url="https://x/2.jpg" caption="Golden hour" ratio="portrait" />,
      SEED_DARK
    );
    expect(getByText('Golden hour')).toBeTruthy();
  });
});

describe('ShootBookingCard (native)', () => {
  it('renders client + status and fires onConfirm when requested', () => {
    const onConfirm = jest.fn();
    const { getByText } = renderThemed(
      <ShootBookingCard
        clientName="A. Okafor"
        shootType="Wedding"
        dateText="Sat, Aug 30"
        location="Rosewood Gardens"
        status="requested"
        priceCents={180000}
        onConfirm={onConfirm}
      />,
      SEED_LIGHT
    );
    expect(getByText('A. Okafor')).toBeTruthy();
    expect(getByText('Requested')).toBeTruthy();
    expect(getByText('$1,800.00')).toBeTruthy();
    fireEvent.press(getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('hides the confirm button once confirmed', () => {
    const { getByText, queryByText } = renderThemed(
      <ShootBookingCard clientName="B. Lee" status="confirmed" onConfirm={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Confirmed')).toBeTruthy();
    expect(queryByText('Confirm')).toBeNull();
  });
});

describe('PrintOrderRow (native)', () => {
  it('computes a line total from unit price × clamped quantity', () => {
    const { getByText } = renderThemed(
      <PrintOrderRow product="Matte print" size="16 × 24 in" quantity={3} unitPriceCents={2500} status="shipped" />,
      SEED_LIGHT
    );
    // 2500 × 3 = 7500 → $75.00
    expect(getByText('$75.00')).toBeTruthy();
    expect(getByText('Shipped')).toBeTruthy();
    expect(getByText('16 × 24 in · ×3')).toBeTruthy();
  });
});

describe('PackageCard (native)', () => {
  it('renders features and fires the CTA', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <PackageCard
        name="Wedding — Gold"
        priceCents={250000}
        priceSuffix="per event"
        features={['8 hours coverage', '400 edited photos']}
        featured
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    expect(getByText('Wedding — Gold')).toBeTruthy();
    expect(getByText('Popular')).toBeTruthy();
    expect(getByText('8 hours coverage')).toBeTruthy();
    fireEvent.press(getByText('Choose package'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('falls back to an empty-features line', () => {
    const { getByText } = renderThemed(
      <PackageCard name="Mini" priceCents={50000} emptyFeaturesLabel="Details coming soon" />,
      SEED_DARK
    );
    expect(getByText('Details coming soon')).toBeTruthy();
  });
});

describe('GalleryHeader (native)', () => {
  it('renders a compact header with count meta', () => {
    const { getByText } = renderThemed(
      <GalleryHeader title="Smith Wedding" subtitle="Aug 2026" photoCount={640} variant="compact" />,
      SEED_LIGHT
    );
    expect(getByText('Smith Wedding')).toBeTruthy();
    expect(getByText('640 photos')).toBeTruthy();
  });
});

describe('ClientProofRow (native)', () => {
  it('toggles selection via the checkbox and fires approve', () => {
    const onToggleSelect = jest.fn();
    const onApprove = jest.fn();
    const { getByRole, getByText } = renderThemed(
      <ClientProofRow
        filename="IMG_0421.jpg"
        decision="pending"
        selected
        onToggleSelect={onToggleSelect}
        onApprove={onApprove}
      />,
      SEED_LIGHT
    );
    const box = getByRole('checkbox');
    expect(box.props.accessibilityState.checked).toBe(true);
    fireEvent.press(box);
    expect(onToggleSelect).toHaveBeenCalledTimes(1);
    fireEvent.press(getByText('Approve'));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('hides actions once a decision is made', () => {
    const { getByText, queryByText } = renderThemed(
      <ClientProofRow filename="IMG_0422.jpg" decision="approved" onApprove={() => undefined} />,
      SEED_DARK
    );
    expect(getByText('Approved')).toBeTruthy();
    expect(queryByText('Approve')).toBeNull();
  });
});

describe('LightboxThumb (native)', () => {
  it('reports its active state and fires onPress', () => {
    const onPress = jest.fn();
    const { getByRole } = renderThemed(
      <LightboxThumb url="https://x/1.jpg" alt="Frame 2" active index={2} onPress={onPress} />,
      SEED_LIGHT
    );
    const btn = getByRole('button');
    expect(btn.props.accessibilityState.selected).toBe(true);
    fireEvent.press(btn);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('EquipmentRow (native)', () => {
  it('renders name + availability badge', () => {
    const { getByText } = renderThemed(
      <EquipmentRow name="Canon R5" category="Camera body" status="in-use" />,
      SEED_DARK
    );
    expect(getByText('Canon R5')).toBeTruthy();
    expect(getByText('In use')).toBeTruthy();
  });
});

describe('ShotListItem (native)', () => {
  it('toggles done state via the checkbox', () => {
    const onToggle = jest.fn();
    const { getByRole } = renderThemed(
      <ShotListItem title="First look" notes="85mm, backlit" done priority="must" onToggle={onToggle} />,
      SEED_LIGHT
    );
    const box = getByRole('checkbox');
    expect(box.props.accessibilityState.checked).toBe(true);
    fireEvent.press(box);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});

describe('PricePackageRow (native)', () => {
  it('renders a highlighted row with badge + suffix', () => {
    const onPress = jest.fn();
    const { getByText, getByRole } = renderThemed(
      <PricePackageRow
        label="Extra edited photo"
        priceCents={1500}
        unitSuffix="each"
        highlighted
        badgeLabel="Best value"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Extra edited photo')).toBeTruthy();
    expect(getByText('Best value')).toBeTruthy();
    expect(getByText('each')).toBeTruthy();
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native photography, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PortfolioGrid items={[]} loading />
          <PortfolioGrid items={[]} emptyLabel="Empty" />
          <AlbumCard title="Kyoto" photoCount={12} isPrivate onPress={() => undefined} />
          <PhotoTile url="https://x/1.jpg" caption="Cap" selected favorite />
          <ShootBookingCard
            clientName="A. Okafor"
            status="requested"
            priceCents={180000}
            onConfirm={() => undefined}
          />
          <PrintOrderRow product="Matte" quantity={2} unitPriceCents={2500} status="printing" onPress={() => undefined} />
          <PackageCard
            name="Gold"
            priceCents={250000}
            features={['A', 'B']}
            featured
            onSelect={() => undefined}
          />
          <GalleryHeader title="Header" subtitle="sub" photoCount={100} variant="compact" />
          <ClientProofRow filename="a.jpg" decision="pending" selected onToggleSelect={() => undefined} onApprove={() => undefined} onReject={() => undefined} />
          <LightboxThumb url="https://x/1.jpg" active onPress={() => undefined} />
          <EquipmentRow name="R5" category="Body" status="maintenance" onPress={() => undefined} />
          <ShotListItem title="Shot" notes="n" done priority="must" onToggle={() => undefined} />
          <PricePackageRow label="Extra" priceCents={1500} unitSuffix="each" highlighted badgeLabel="Best" onPress={() => undefined} />
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
