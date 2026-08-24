import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { AppShell } from './AppShell';
import { Sidebar } from './Sidebar';

describe('Sidebar (native)', () => {
  it('renders brand and nav rows and fires onSelect on press', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <Sidebar
        brand="Acme"
        items={[
          { label: 'Dashboard', active: true },
          { label: 'Settings', onSelect },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Acme')).toBeTruthy();
    expect(getByText('Dashboard')).toBeTruthy();
    fireEvent.press(getByText('Settings'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('marks the active row selected via accessibilityState', () => {
    const { getByText } = renderThemed(
      <Sidebar items={[{ label: 'Home', active: true }]} />,
      SEED_LIGHT
    );
    const row = getByText('Home').parent;
    // Walk up to the Pressable carrying the selected state.
    let node: typeof row = row;
    while (node && node.props?.accessibilityState === undefined) node = node.parent;
    expect(node?.props?.accessibilityState?.selected).toBe(true);
  });

  it('renders grouped rows with section headings', () => {
    const { getByText } = renderThemed(
      <Sidebar
        groups={[
          { label: 'Main', items: [{ label: 'Overview' }] },
          { label: 'Admin', items: [{ label: 'Members' }] },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Main')).toBeTruthy();
    expect(getByText('Members')).toBeTruthy();
  });
});

describe('AppShell (native)', () => {
  it('renders header and content and opens the drawer sidebar', () => {
    const onSelect = jest.fn();
    const { getByText, getByLabelText, queryByText } = renderThemed(
      <AppShell
        header="Overview"
        sidebar={<Sidebar items={[{ label: 'DrawerLink', onSelect }]} />}
        menuLabel="Open nav"
      >
        <Text>Body content</Text>
      </AppShell>,
      SEED_DARK
    );
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Body content')).toBeTruthy();
    // Drawer opens on toggle; its rows are then pressable.
    fireEvent.press(getByLabelText('Open nav'));
    const link = queryByText('DrawerLink');
    expect(link).toBeTruthy();
    fireEvent.press(link!);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('every rendered hex traces to a compiled token (both seeds)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <Sidebar
          brand="Acme"
          groups={[{ label: 'Main', items: [{ label: 'Home', active: true }, { label: 'Away' }] }]}
          footer={<Text>foot</Text>}
        />,
        seed
      );
      const allowed = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
