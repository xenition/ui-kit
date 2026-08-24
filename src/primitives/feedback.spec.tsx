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
