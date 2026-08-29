/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { PaginationV4 } from './PaginationV4';

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

describe('PaginationV4 (web)', () => {
  it('renders nothing at all for a single page', () => {
    const { container } = renderThemed(
      <PaginationV4 page={1} pageCount={1} onPageChange={() => {}} />
    );
    expect(container.querySelector('nav')).toBeNull();
  });

  it('truncates with an ellipsis exactly as the base does', () => {
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={5} pageCount={20} onPageChange={() => {}} />
    );
    const nav = getByLabelText('Pagination');
    // first · … · 4 5 6 · … · last
    expect(nav.textContent).toContain('…');
    expect(getByLabelText('Page 1')).toBeTruthy();
    expect(getByLabelText('Page 20')).toBeTruthy();
    expect(getByLabelText('Page 4')).toBeTruthy();
    expect(getByLabelText('Page 6')).toBeTruthy();
  });

  it('fills exactly one cell — the page you are on', () => {
    const { getByLabelText, getAllByRole } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    const current = getByLabelText('Page 3');
    expect(current.getAttribute('aria-current')).toBe('page');
    expect(current.className).toContain('bg-primary');
    expect(current.className).toContain('text-on-primary');
    expect(current.className).toContain('font-semibold');

    const filled = getAllByRole('button').filter((b) => b.className.includes('bg-primary'));
    expect(filled).toHaveLength(1);
  });

  it('leaves every other cell without chrome', () => {
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    const other = getByLabelText('Page 2');
    expect(other.className).toContain('text-on-surface');
    expect(other.className).not.toContain('bg-primary');
    expect(other.className).not.toContain('border');
  });

  it('gives every cell a 44 x 44 target — the base was 32', () => {
    const { getAllByRole } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    getAllByRole('button').forEach((cell) => {
      expect(cell.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
      expect(cell.className).toContain('min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
      expect(cell.className).not.toContain('h-8');
    });
  });

  it('labels each number so a screen reader says "Page 3", not "3"', () => {
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    expect(getByLabelText('Page 3').textContent).toBe('3');
    expect(getByLabelText('Previous')).toBeTruthy();
    expect(getByLabelText('Next')).toBeTruthy();
  });

  it('says "you cannot go back" in colour AND opacity', () => {
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={1} pageCount={5} onPageChange={() => {}} />
    );
    const previous = getByLabelText('Previous') as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
    expect(previous.className).toContain('disabled:text-muted');
    expect(previous.className).toContain('disabled:opacity-[0.38]');
    expect((getByLabelText('Next') as HTMLButtonElement).disabled).toBe(false);
  });

  it('emits the page that was clicked, and steps with the arrows', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={onPageChange} />
    );
    fireEvent.click(getByLabelText('Page 5'));
    expect(onPageChange).toHaveBeenCalledWith(5);
    fireEvent.click(getByLabelText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
    fireEvent.click(getByLabelText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('keeps the ellipsis a gap marker, not a page', () => {
    const { getByLabelText, getAllByRole } = renderThemed(
      <PaginationV4 page={10} pageCount={20} onPageChange={() => {}} />
    );
    expect(getByLabelText('Pagination').textContent).toContain('…');
    getAllByRole('button').forEach((button) => {
      expect(button.textContent).not.toBe('…');
    });
  });

  it('grounds hover from `border`, never a raw ramp step', () => {
    const { getAllByRole } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    getAllByRole('button').forEach((cell) => {
      expect(cell.className).not.toContain('neutral');
      expect(cell.getAttribute('data-xen-v4-nav-item')).toBe('');
    });
    const css = document.getElementById('xen-v4-nav-styles')?.textContent ?? '';
    // The filled cell is exempt: it does not need to react to a pointer.
    expect(css).toContain(':not([aria-current="page"])');
  });

  it('names no literal colour — every value is a token', () => {
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />
    );
    expect(getByLabelText('Pagination').outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
