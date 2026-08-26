/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { ToolbarV4 } from './ToolbarV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

const ACTIONS = [
  { key: 'share', label: 'Share' },
  { key: 'delete', label: 'Delete', destructive: true },
];
const OVERFLOW = [
  { key: 'export', label: 'Export' },
  { key: 'archive', label: 'Archive', disabled: true },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

describe('ToolbarV4 (web)', () => {
  it('renders a toolbar with a title and its inline actions', () => {
    const { getByRole, getByText } = renderThemed(
      <ToolbarV4 title="Order #4821" actions={ACTIONS} />
    );
    expect(getByRole('toolbar')).toBeTruthy();
    expect(getByText('Order #4821')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
  });

  it('is a bar, not a capsule (§8)', () => {
    const { getByRole } = renderThemed(<ToolbarV4 title="T" actions={ACTIONS} />);
    const bar = getByRole('toolbar');
    expect(bar.className).toContain('rounded-[var(--xen-radius-md)]');
    expect(bar.className).not.toContain('radius-full');
  });

  it('colours actions with the contrast-safe text slots, never the fills', () => {
    const { getByText } = renderThemed(<ToolbarV4 actions={ACTIONS} />);
    expect(getByText('Share').className).toContain('text-primary-text');
    expect(getByText('Share').className).not.toMatch(/\btext-primary(?![-\w])/);
    expect(getByText('Delete').className).toContain('text-danger-text');
    expect(getByText('Delete').className).not.toMatch(/\btext-danger(?![-\w])/);
  });

  it('says "disabled" in colour AND opacity', () => {
    const { getByText } = renderThemed(
      <ToolbarV4 actions={[{ key: 'x', label: 'Publish', disabled: true }]} />
    );
    const button = getByText('Publish');
    expect(button.className).toContain('disabled:text-muted');
    expect(button.className).toContain('disabled:opacity-[0.38]');
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('gives every action and the overflow toggle a 44px target', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />
    );
    expect(getByText('Share').className).toContain(
      'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
    );
    const toggle = getByLabelText('More actions');
    expect(toggle.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    expect(toggle.className).toContain('min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });

  it('opens the overflow as a menu at the same altitude as MenuV4', () => {
    const { getByLabelText, getByRole, queryByRole } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />
    );
    expect(queryByRole('menu')).toBeNull();
    fireEvent.click(getByLabelText('More actions'));
    const menu = getByRole('menu');
    expect(menu.getAttribute('data-xen-v4-nav-panel')).toBe('solid');
    expect(menu.className).not.toContain('shadow-lg');
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    expect(css).toContain('box-shadow: var(--xen-elevation-sheet)');
  });

  it('reports the overflow expanded state', () => {
    const { getByLabelText } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />
    );
    const toggle = getByLabelText('More actions');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('fires an overflow action and closes the panel', () => {
    const onClick = jest.fn();
    const { getByLabelText, getByText, queryByRole } = renderThemed(
      <ToolbarV4 overflowActions={[{ key: 'export', label: 'Export', onClick }]} />
    );
    fireEvent.click(getByLabelText('More actions'));
    fireEvent.click(getByText('Export'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(queryByRole('menu')).toBeNull();
  });

  it('grounds hover from `border`, never a raw ramp step', () => {
    const { getByText } = renderThemed(<ToolbarV4 actions={ACTIONS} />);
    expect(getByText('Share').className).not.toContain('neutral');
    expect(getByText('Share').getAttribute('data-xen-v4-nav-item')).toBe('');
  });

  it('renders no overflow toggle when there is nothing to overflow', () => {
    const { queryByLabelText } = renderThemed(<ToolbarV4 actions={ACTIONS} />);
    expect(queryByLabelText('More actions')).toBeNull();
  });

  it('names no literal colour — every value is a token', () => {
    const { getByRole } = renderThemed(
      <ToolbarV4 title="T" actions={ACTIONS} overflowActions={OVERFLOW} />
    );
    expect(getByRole('toolbar').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const { getByRole } = renderThemed(
      <ToolbarV4
        actions={ACTIONS}
        ref={(n) => {
          node = n;
        }}
        id="bar"
      />
    );
    const el = getByRole('toolbar');
    expect(node).toBe(el);
    expect(el.getAttribute('id')).toBe('bar');
  });
});
