/**
 * The **V4 email line** (native) — the twin of `email/v4-line.spec.tsx`. The
 * expansion pass and the send guard are the same pure module, so both are
 * pinned once and hold on both sides.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { canSendMail } from '../../email/thread-state-v4';
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

describe('EmailThreadV4', () => {
  it('renders a thread with no expandedIds prop at all', () => {
    const { getByText } = renderThemed(
      <EmailThreadV4
        subject="Re: quote"
        messages={[
          { id: 'm1', sender: 'Ada', body: 'First' },
          { id: 'm2', sender: 'Priya', body: 'Second' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Re: quote')).toBeTruthy();
  });
});

describe('MessageListRowV4', () => {
  it('announces the preview the row label used to replace', () => {
    const { getByLabelText } = renderThemed(
      <MessageListRowV4
        sender="Ada"
        subject="Re: quote"
        preview="See you then"
        timestamp="09:12"
        onPress={jest.fn()}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText(/See you then/)).toBeTruthy();
  });
});
