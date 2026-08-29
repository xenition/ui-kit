/** @jest-environment jsdom */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import type { ActionSheet } from './ActionSheet';
import { ActionSheetV4 } from './ActionSheetV4';
import { scrimCss } from './internal/surface-v4';

const seed: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ACTIONS = [
  { label: 'Rename' },
  { label: 'Delete', destructive: true },
  { label: 'Duplicate' },
  { label: 'Archive', disabled: true },
];

function open(
  props: Partial<React.ComponentProps<typeof ActionSheetV4>> = {},
  depth?: ThemeSeed['depth']
) {
  return render(
    <XenitionUIProvider theme={{ ...seed, depth }}>
      <ActionSheetV4 open onClose={() => {}} actions={ACTIONS} {...props} />
    </XenitionUIProvider>
  );
}

/* The LAST match: a test that opens twice leaves two portals in the body. */
const last = (sel: string): HTMLElement => {
  const all = document.querySelectorAll(sel);
  return all[all.length - 1] as HTMLElement;
};
const groups = (): HTMLElement[] => Array.from(document.querySelectorAll('[role="menu"]'));
const v4css = (): string => document.getElementById('xen-surface-v4-styles')?.textContent ?? '';
const rowFor = (label: string): HTMLElement =>
  Array.from(document.querySelectorAll('[role="menuitem"]')).find(
    (el) => el.textContent === label
  ) as HTMLElement;

describe('ActionSheetV4', () => {
  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof ActionSheet> = {
      open: true,
      onClose: () => {},
      title: 'File',
      actions: ACTIONS,
      cancelLabel: 'Not now',
      className: 'extra',
    };
    const asV4: React.ComponentProps<typeof ActionSheetV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders nothing until open, then portals every action to the body', () => {
    const closed = render(
      <XenitionUIProvider theme={seed}>
        <ActionSheetV4 open={false} onClose={() => {}} actions={ACTIONS} />
      </XenitionUIProvider>
    );
    expect(closed.queryByText('Rename')).toBeNull();

    const { getByText } = open();
    for (const action of ACTIONS) expect(getByText(action.label)).toBeTruthy();
  });

  it('puts the destructive action in its own group, after the ordinary ones', () => {
    open();
    const [ordinary, destructiveGroup] = groups();
    expect(ordinary!.textContent).toContain('Rename');
    expect(ordinary!.textContent).toContain('Duplicate');
    expect(ordinary!.textContent).not.toContain('Delete');
    expect(destructiveGroup!.textContent).toBe('Delete');
    // Physical separation is the friction (§25) — the destructive row is not
    // one mis-scroll away from Rename.
    expect(ordinary!.compareDocumentPosition(destructiveGroup!)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('preserves the caller’s order inside each group', () => {
    open({
      actions: [
        { label: 'B' },
        { label: 'Wipe', destructive: true },
        { label: 'A' },
        { label: 'Purge', destructive: true },
      ],
    });
    const [ordinary, destructiveGroup] = groups();
    expect(ordinary!.textContent).toBe('BA');
    expect(destructiveGroup!.textContent).toBe('WipePurge');
  });

  it('renders one group when nothing is destructive', () => {
    open({ actions: [{ label: 'Rename' }, { label: 'Duplicate' }] });
    expect(groups()).toHaveLength(1);
  });

  it('colours only the destructive row — everything else is plain ink', () => {
    open();
    // The base tints EVERY row with `primary`, leaving no hierarchy at all, and
    // `primary` is a fill colour with no contrast promise as text.
    expect(rowFor('Rename').className).toContain('text-on-surface');
    expect(rowFor('Rename').className).not.toContain('text-primary');
    // `danger-text`, the contrast-corrected form — not the `danger` fill.
    expect(rowFor('Delete').className).toContain('text-danger-text');
    expect(rowFor('Delete').className).not.toMatch(/text-danger(?!-text)/);
  });

  it('lifts every group to the same altitude, and nests none inside another', () => {
    open();
    for (const group of groups()) {
      expect(group.getAttribute('data-xen-v4-panel')).toBe('solid');
      expect(group.querySelector('[data-xen-v4-panel]')).toBeNull();
    }
    expect(v4css()).toContain('box-shadow: var(--xen-elevation-sheet);');
  });

  it('scrims from the shadow colour, which does not invert with the scheme', () => {
    open();
    expect(v4css()).toContain(scrimCss());
    expect(scrimCss()).toContain('--xen-elevation-color');
    expect(last('[data-xen-v4-scrim]').className).not.toContain('neutral-950');
  });

  it('turns translucent only when the seed asks for glass', () => {
    open({}, 'soft');
    expect(groups()[0]!.getAttribute('data-xen-v4-panel')).toBe('solid');
    open({}, 'glass');
    expect(groups()[groups().length - 1]!.getAttribute('data-xen-v4-panel')).toBe('glass');
  });

  it('fires onSelect and closes, and a disabled row does neither', () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    open({ onClose, actions: [{ label: 'Rename', onSelect }, { label: 'Archive', disabled: true }] });
    fireEvent.click(rowFor('Rename'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    expect((rowFor('Archive') as HTMLButtonElement).disabled).toBe(true);
  });

  it('closes on Cancel, on the scrim, and on Escape', () => {
    const onClose = jest.fn();
    const { getByText } = open({ onClose, cancelLabel: 'Not now' });
    fireEvent.click(getByText('Not now'));
    fireEvent.click(last('[data-xen-v4-scrim]'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('renders the title in plain ink, because the card may be glass', () => {
    const { getByText } = open({ title: 'File actions' });
    // `muted` measurably falls below AA on glass; size does the de-emphasis.
    expect(getByText('File actions').className).toContain('text-on-surface');
    expect(getByText('File actions').className).toContain('text-sm');
    expect(getByText('File actions').className).not.toContain('text-muted');
  });

  it('gives every row a tap target from the spacing scale', () => {
    open();
    expect(rowFor('Rename').className).toContain('min-h-[var(--xen-space-2xl)]');
  });

  it('introduces no literal colours', () => {
    open({}, 'glass');
    expect(v4css()).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    for (const el of [...groups(), last('[data-xen-v4-scrim]')]) {
      expect(el.getAttribute('style') ?? '').not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});
