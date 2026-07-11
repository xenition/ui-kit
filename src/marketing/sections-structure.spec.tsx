/** @jest-environment jsdom */
import { act, fireEvent, render } from '@testing-library/react';
import { AnnouncementBar } from './AnnouncementBar';
import { Countdown } from './Countdown';
import { ProcessSteps } from './ProcessSteps';
import { TeamGrid } from './TeamGrid';
import { VideoEmbed } from './VideoEmbed';

describe('ProcessSteps', () => {
  it('renders every step with its number and title', () => {
    const { container, getByText } = render(
      <ProcessSteps
        steps={[
          { title: 'Sign up', description: 'Create an account.' },
          { title: 'Configure', description: 'Pick your seed.' },
          { title: 'Ship', description: 'Publish the site.' },
        ]}
      />
    );
    expect(container.querySelectorAll('[data-xen-process-step]').length).toBe(3);
    expect(getByText('Sign up')).toBeTruthy();
    expect(getByText('Configure')).toBeTruthy();
    expect(getByText('Ship')).toBeTruthy();
    // numbered markers 1..3
    const numbers = Array.from(
      container.querySelectorAll('[data-xen-process-number]')
    ).map((el) => el.textContent);
    expect(numbers).toEqual(['1', '2', '3']);
  });
});

describe('TeamGrid', () => {
  it('renders each member with an initials-fallback avatar', () => {
    const { container, getByText } = render(
      <TeamGrid
        members={[
          { name: 'Ada Lovelace', role: 'Engineer' },
          { name: 'Alan Turing', role: 'Cryptanalyst', avatar: 'https://cdn.example/alan.jpg' },
        ]}
      />
    );
    expect(container.querySelectorAll('[data-xen-team-member]').length).toBe(2);
    expect(getByText('Ada Lovelace')).toBeTruthy();
    expect(getByText('Engineer')).toBeTruthy();
    // Ada has no avatar → initials fallback; Alan has an <img>.
    expect(getByText('AL')).toBeTruthy();
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      'https://cdn.example/alan.jpg'
    );
  });
});

describe('AnnouncementBar', () => {
  it('renders the message and hides after dismiss', () => {
    const onDismiss = jest.fn();
    const { container, queryByText, getByLabelText } = render(
      <AnnouncementBar message="Launch week is here" onDismiss={onDismiss} />
    );
    expect(queryByText('Launch week is here')).toBeTruthy();
    fireEvent.click(getByLabelText('Dismiss announcement'));
    expect(queryByText('Launch week is here')).toBeNull();
    expect(container.querySelector('[data-xen-announcement-bar]')).toBeNull();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe('VideoEmbed', () => {
  it('renders an iframe with an accessible title for embed URLs', () => {
    const { container } = render(
      <VideoEmbed src="https://www.youtube.com/embed/abc123" title="Product tour" />
    );
    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe('https://www.youtube.com/embed/abc123');
    expect(iframe?.getAttribute('title')).toBe('Product tour');
    expect(container.querySelector('[data-xen-video-play]')).not.toBeNull();
  });

  it('renders a native video for file URLs', () => {
    const { container } = render(<VideoEmbed src="https://cdn.example/clip.mp4" title="Clip" />);
    expect(container.querySelector('video')?.getAttribute('src')).toBe(
      'https://cdn.example/clip.mp4'
    );
    expect(container.querySelector('iframe')).toBeNull();
  });
});

describe('Countdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders four time boxes for a future target', () => {
    const { container } = render(<Countdown to="2026-01-02T01:02:03Z" />);
    const boxes = container.querySelectorAll('[data-xen-countdown-box]');
    expect(boxes.length).toBe(4);
    // 1 day, 1 hour, 2 mins, 3 secs remaining → padded values.
    const values = Array.from(boxes).map(
      (b) => b.querySelector('span')?.textContent
    );
    expect(values).toEqual(['01', '01', '02', '03']);
  });

  it('fires onComplete when the target passes', () => {
    const onComplete = jest.fn();
    render(<Countdown to="2026-01-01T00:00:02Z" onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});
