/** @jest-environment jsdom */
/**
 * The **V4 email line** (web) — the expansion pass, the send guard, and the
 * finding this module exists for: an uncontrolled `EmailThread` was frozen.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { canSendMail, useThreadExpansion } from './thread-state-v4';
import { EmailThreadV4 } from './EmailThreadV4';
import { MessageListRowV4 } from './MessageListRowV4';

describe('canSendMail', () => {
  it('refuses to send with an empty recipient field', () => {
    // The finding: the base tested the body and the attachments and never
    // tested `to`, so one character of body fired `onSend({ to: '', … })`.
    expect(canSendMail({ to: '', body: 'hello' })).toBe(false);
    expect(canSendMail({ to: '   ', body: 'hello' })).toBe(false);
    expect(canSendMail({ to: '', hasAttachments: true })).toBe(false);
  });

  it('does not break a reply bar, which has no recipient field at all', () => {
    // `to === undefined` means the field is not rendered — the thread already
    // knows who it is going to. Requiring one here would stop every reply bar
    // in the kit from sending, a wider break than the bug being fixed.
    expect(canSendMail({ body: 'hello' })).toBe(true);
    expect(canSendMail({ hasAttachments: true })).toBe(true);
  });

  it('still needs something to send', () => {
    expect(canSendMail({ to: 'a@b.c' })).toBe(false);
    expect(canSendMail({ to: 'a@b.c', body: '   ' })).toBe(false);
    expect(canSendMail({ to: 'a@b.c', body: 'hi' })).toBe(true);
    expect(canSendMail({ to: 'a@b.c', hasAttachments: true })).toBe(true);
  });

  it('respects disabled and in-flight', () => {
    expect(canSendMail({ to: 'a@b.c', body: 'hi', disabled: true })).toBe(false);
    expect(canSendMail({ to: 'a@b.c', body: 'hi', sending: true })).toBe(false);
  });
});

/** A host for the hook, so the frozen-thread finding is asserted directly. */
function ExpansionHost({ controlled }: { controlled?: string[] }): React.ReactElement {
  const expansion = useThreadExpansion(controlled, 'm2');
  return (
    <div>
      <span data-testid="state">{expansion.isOpen('m1') ? 'open' : 'shut'}</span>
      <button type="button" onClick={() => expansion.toggle('m1')}>
        toggle
      </button>
    </div>
  );
}

describe('useThreadExpansion', () => {
  it('moves when nobody is controlling it', () => {
    // The finding. The base recomputed the set from props every render and
    // held no state, so an uncontrolled thread never opened anything: the tap
    // fired a callback nobody was listening to.
    const { getByText, getByTestId } = render(<ExpansionHost />);
    expect(getByTestId('state').textContent).toBe('shut');
    fireEvent.click(getByText('toggle'));
    expect(getByTestId('state').textContent).toBe('open');
    fireEvent.click(getByText('toggle'));
    expect(getByTestId('state').textContent).toBe('shut');
  });

  it('opens the message it was seeded with', () => {
    const expansion = { current: null as unknown };
    function Seeded(): React.ReactElement {
      expansion.current = useThreadExpansion(undefined, 'm2');
      return <span />;
    }
    render(<Seeded />);
    expect((expansion.current as { isOpen: (id: string) => boolean }).isOpen('m2')).toBe(true);
  });

  it('leaves the controlled path alone — the caller still owns it', () => {
    const { getByText, getByTestId } = render(<ExpansionHost controlled={[]} />);
    fireEvent.click(getByText('toggle'));
    // A controlled thread does not move itself; that is the caller's job.
    expect(getByTestId('state').textContent).toBe('shut');
  });
});

describe('EmailThreadV4', () => {
  it('opens a collapsed message with no expandedIds prop at all', () => {
    const { getAllByRole } = render(
      <EmailThreadV4
        subject="Re: quote"
        messages={[
          { id: 'm1', sender: 'Ada', body: 'First' },
          { id: 'm2', sender: 'Priya', body: 'Second' },
        ]}
      />
    );
    const toggles = getAllByRole('button', { expanded: false });
    expect(toggles.length).toBeGreaterThan(0);
    fireEvent.click(toggles[0] as HTMLElement);
    // The base left this collapsed forever.
    expect(getAllByRole('button', { expanded: true }).length).toBeGreaterThan(0);
  });
});

describe('MessageListRowV4', () => {
  it('announces the preview the base made presentational', () => {
    // `role="button"` makes children presentational, so the preview, the
    // thread count and every label chip left the accessibility tree.
    const { getByRole } = render(
      <MessageListRowV4
        sender="Ada"
        subject="Re: quote"
        preview="See you then"
        timestamp="09:12"
        onClick={jest.fn()}
      />
    );
    expect(getByRole('button').getAttribute('aria-label') ?? '').toContain('See you then');
  });
});
