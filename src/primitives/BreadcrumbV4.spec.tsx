/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { BreadcrumbV4 } from './BreadcrumbV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

describe('BreadcrumbV4 (web)', () => {
  it('renders the trail in order, with the last item as the current page', () => {
    const { getByLabelText, getByText } = renderThemed(
      <BreadcrumbV4
        items={[{ label: 'Home', href: '/' }, { label: 'Orders', href: '/o' }, { label: '#4821' }]}
      />
    );
    expect(getByLabelText('Breadcrumb')).toBeTruthy();
    const current = getByText('#4821');
    expect(current.getAttribute('aria-current')).toBe('page');
    expect(current.className).toContain('font-semibold');
    expect(current.className).toContain('text-on-surface');
  });

  it('keeps to two registers: where you are, and the way back', () => {
    const { getByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Orders' }]} />
    );
    expect(getByText('Home').className).toContain('text-muted');
    expect(getByText('Home').className).toContain('font-normal');
    expect(getByText('Orders').className).toContain('text-on-surface');
  });

  it('separates with a chevron by default — direction, not a filesystem path', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Orders' }]} />
    );
    expect(getByLabelText('Breadcrumb').textContent).toContain('›');
    expect(queryByText('/')).toBeNull();
  });

  it('hides the separator from assistive tech — the order carries the nesting', () => {
    const { container } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Orders' }]} />
    );
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden).toHaveLength(1);
    expect(hidden[0]!.textContent).toBe('›');
  });

  it('honours a caller-supplied separator', () => {
    const { getByLabelText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'A', href: '/' }, { label: 'B' }]} separator="/" />
    );
    expect(getByLabelText('Breadcrumb').textContent).toContain('/');
  });

  it('renders a click-only crumb as a BUTTON, so a keyboard can reach it', () => {
    const onClick = jest.fn();
    const { getByRole } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Back', onClick }, { label: 'Here' }]} />
    );
    // A hrefless `<a>` is not in the tab order and does not fire on Enter.
    const button = getByRole('button', { name: 'Back' });
    expect(button.tagName).toBe('BUTTON');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a crumb with a destination as an anchor', () => {
    const { getByRole } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/home' }, { label: 'Here' }]} />
    );
    const link = getByRole('link', { name: 'Home' });
    expect(link.getAttribute('href')).toBe('/home');
  });

  it('never makes the current page a link, even when it carries a handler', () => {
    const onClick = jest.fn();
    const { queryByRole, getByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Here', onClick }]} />
    );
    expect(queryByRole('button', { name: 'Here' })).toBeNull();
    expect(getByText('Here').getAttribute('aria-current')).toBe('page');
  });

  it('gives every crumb a 44px target composed from the spacing scale', () => {
    const { getByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Here' }]} />
    );
    ['Home', 'Here'].forEach((label) => {
      expect(getByText(label).className).toContain(
        'min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]'
      );
    });
  });

  it('names no literal colour — every value is a token', () => {
    const { getByLabelText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', href: '/' }, { label: 'Here' }]} />
    );
    expect(getByLabelText('Breadcrumb').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('renders a single-item trail as just the current page', () => {
    const { container, getByText } = renderThemed(<BreadcrumbV4 items={[{ label: 'Home' }]} />);
    expect(getByText('Home').getAttribute('aria-current')).toBe('page');
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
});
