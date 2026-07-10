/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { AppShell } from './AppShell';
import { Sidebar, type SidebarItem } from './Sidebar';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('Sidebar', () => {
  it('renders brand, nav rows, and marks the active row with aria-current', () => {
    const items: SidebarItem[] = [
      { label: 'Dashboard', href: '#/', active: true },
      { label: 'Customers', href: '#/customers' },
    ];
    const { getByText } = render(<Sidebar brand={<span>Acme</span>} items={items} />);
    expect(getByText('Acme')).toBeTruthy();
    expect(getByText('Dashboard').closest('a')?.getAttribute('aria-current')).toBe('page');
    expect(getByText('Customers').closest('a')?.getAttribute('aria-current')).toBeNull();
  });

  it('fires onSelect when a row is activated', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <Sidebar items={[{ label: 'Settings', onSelect }]} />
    );
    fireEvent.click(getByText('Settings'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders grouped rows with section headings', () => {
    const { getByText } = render(
      <Sidebar
        groups={[
          { label: 'Main', items: [{ label: 'Home' }] },
          { label: 'Admin', items: [{ label: 'Users' }] },
        ]}
      />
    );
    expect(getByText('Main')).toBeTruthy();
    expect(getByText('Users')).toBeTruthy();
  });

  it('uses only token-bound classes (no literal hex)', () => {
    const { container } = render(<Sidebar items={[{ label: 'X', active: true }]} />);
    expect(container.innerHTML).not.toMatch(HEX_LITERAL);
  });
});

describe('AppShell', () => {
  it('renders the sidebar, header, and content slots', () => {
    const { getByText } = render(
      <AppShell
        sidebar={<Sidebar items={[{ label: 'Home', active: true }]} />}
        header={<h1>Overview</h1>}
      >
        <p>Body content</p>
      </AppShell>
    );
    // Sidebar renders twice (rail + drawer markup is only mounted when open),
    // so `Home` appears once here.
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Overview')).toBeTruthy();
    expect(getByText('Body content')).toBeTruthy();
  });

  it('toggles the mobile drawer open via the hamburger', () => {
    const { getByLabelText, queryByText } = render(
      <AppShell
        sidebar={<Sidebar items={[{ label: 'DrawerLink' }]} />}
        header={<h1>T</h1>}
        menuLabel="Open nav"
      >
        content
      </AppShell>
    );
    // Closed: only the persistent rail copy is present.
    expect(queryByText('DrawerLink')).toBeTruthy();
    const toggle = getByLabelText('Open nav');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('applies the sidebarWidth to the rail', () => {
    const { container } = render(
      <AppShell sidebar={<Sidebar items={[]} />} sidebarWidth={320}>
        x
      </AppShell>
    );
    const aside = container.querySelector('aside');
    expect(aside?.getAttribute('style')).toContain('width: 320px');
  });
});
