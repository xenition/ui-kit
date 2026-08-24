/** @jest-environment jsdom */
import { render, fireEvent, act } from '@testing-library/react';
import { Alert } from './Alert';
import { Progress } from './Progress';
import { Skeleton } from './Skeleton';
import { ToastProvider, useToast } from './Toast';

describe('Alert', () => {
  it('renders title + body and dismisses', () => {
    const onClose = jest.fn();
    const { getByText, getByLabelText } = render(
      <Alert tone="danger" title="Heads up" onClose={onClose}>
        Something happened
      </Alert>
    );
    expect(getByText('Heads up')).toBeTruthy();
    expect(getByText('Something happened')).toBeTruthy();
    fireEvent.click(getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the subtle default look and layers solid/outline variants', () => {
    const subtle = render(<Alert tone="info">hi</Alert>).getByText('hi');
    // Subtle default is the bordered left-rule card on a neutral surface.
    expect(subtle.closest('[role]')?.className).toContain('border-l-4');
    expect(subtle.closest('[role]')?.className).toContain('bg-neutral-50');

    const solid = render(
      <Alert tone="success" variant="solid">
        ok
      </Alert>
    ).getByText('ok');
    expect(solid.closest('[role]')?.className).toContain('bg-success');

    const outline = render(
      <Alert tone="danger" variant="outline">
        bad
      </Alert>
    ).getByText('bad');
    const root = outline.closest('[role]');
    expect(root?.className).toContain('border-danger');
    expect(root?.className).toContain('bg-surface');
  });

  it('renders an optional trailing action', () => {
    const { getByText } = render(
      <Alert tone="info" action={<button>Undo</button>}>
        moved
      </Alert>
    );
    expect(getByText('Undo')).toBeTruthy();
  });
});

describe('Progress', () => {
  it('clamps and exposes aria values', () => {
    const { getByRole } = render(<Progress value={150} max={100} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('150');
    const fill = bar.firstElementChild as HTMLElement;
    expect(fill.style.width).toBe('100%'); // clamped
  });
});

describe('Skeleton', () => {
  it('renders N lines for the text variant', () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(3);
  });
});

describe('Toast', () => {
  it('shows a toast via useToast and auto-dismisses', () => {
    jest.useFakeTimers();
    function Trigger() {
      const { toast } = useToast();
      return <button onClick={() => toast({ title: 'Saved', duration: 1000 })}>go</button>;
    }
    const { getByText, queryByText } = render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );
    fireEvent.click(getByText('go'));
    expect(getByText('Saved')).toBeTruthy();
    act(() => {
      jest.advanceTimersByTime(1100);
    });
    expect(queryByText('Saved')).toBeNull();
    jest.useRealTimers();
  });
});
