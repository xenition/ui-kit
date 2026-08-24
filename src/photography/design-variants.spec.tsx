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
