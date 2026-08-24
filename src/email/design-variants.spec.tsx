/** @jest-environment jsdom */
/**
 * Web email v2/v3 alternate designs: render smoke, token-class purity (no inline
 * hex), and one key interaction per variant. Plain `@testing-library/react` +
 * bare `expect` — no jest-dom.
 */
import { fireEvent, render } from '@testing-library/react';
import { ComposeBarV2 } from './ComposeBarV2';
import { ComposeBarV3 } from './ComposeBarV3';
import { EmailThreadV2 } from './EmailThreadV2';
import { EmailThreadV3 } from './EmailThreadV3';
import { FolderRowV2 } from './FolderRowV2';
import { FolderRowV3 } from './FolderRowV3';
import { MessageListRowV2 } from './MessageListRowV2';
import { MessageListRowV3 } from './MessageListRowV3';
import type { ThreadMessage } from './EmailThread';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const messages: ThreadMessage[] = [
  { id: 'a', sender: 'Ada Lovelace', body: 'First note', timestamp: '09:41' },
  { id: 'b', sender: 'Alan Turing', body: 'Reply here', timestamp: '10:02' },
];

describe('ComposeBarV2 (pill + floating send button)', () => {
  it('renders a rounded pill and assembles the draft on send', () => {
    const onSend = jest.fn();
    const { getByLabelText, container } = render(
      <ComposeBarV2 body="Hello" onChangeBody={() => undefined} onSend={onSend} />
    );
    fireEvent.click(getByLabelText('Send email'));
    expect(onSend).toHaveBeenCalledWith({ to: undefined, subject: undefined, body: 'Hello' });
    expect(container.querySelector('.rounded-full')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('blocks send with an empty body', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<ComposeBarV2 body="" onSend={onSend} />);
    fireEvent.click(getByLabelText('Send email'));
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('ComposeBarV3 (flat bar + inline text actions)', () => {
  it('renders a bordered bar with a text Send action that fires', () => {
    const onSend = jest.fn();
    const { getByRole, container } = render(
      <ComposeBarV3 body="Hi" onChangeBody={() => undefined} onSend={onSend} />
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('border-t');
    fireEvent.click(getByRole('button', { name: 'Send email' }));
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('EmailThreadV2 (elevated message cards)', () => {
  it('renders shadowed cards and toggles a message open', () => {
    const onToggleMessage = jest.fn();
    const { getByLabelText, container } = render(
      <EmailThreadV2 subject="Notes" messages={messages} expandedIds={[]} onToggleMessage={onToggleMessage} />
    );
    expect(container.querySelector('.shadow-sm')).not.toBeNull();
    fireEvent.click(getByLabelText(/Expand message from Ada Lovelace/));
    expect(onToggleMessage).toHaveBeenCalledWith('a');
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('EmailThreadV3 (quoted left-rail)', () => {
  it('renders left-accent rails and stays token-pure', () => {
    const { container, getByRole } = render(
      <EmailThreadV3 subject="Digest" messages={messages} expandedIds={['a']} />
    );
    expect(getByRole('heading', { name: 'Digest' })).toBeTruthy();
    expect(container.querySelector('.border-l-4')).not.toBeNull();
    expect(container.querySelector('.border-l-primary')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('FolderRowV2 (tile)', () => {
  it('renders an elevated tile, reports aria-current, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, container } = render(
      <FolderRowV2 name="Inbox" glyph="📥" count={12} selected onClick={onClick} />
    );
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-current')).toBe('page');
    expect(btn.className).toContain('rounded-[var(--xen-radius-lg)]');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('FolderRowV3 (compact indented line)', () => {
  it('renders a dense line with a right-aligned count and fires onClick', () => {
    const onClick = jest.fn();
    const { getByRole, getByText, container } = render(
      <FolderRowV3 name="Archive" glyph="🗄" count={3} onClick={onClick} />
    );
    expect(getByText('3')).toBeTruthy();
    fireEvent.click(getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('MessageListRowV2 (card row)', () => {
  it('announces unread (not color-alone), shows a New pill, and opens on click', () => {
    const onClick = jest.fn();
    const { getByLabelText, getByText, container } = render(
      <MessageListRowV2 sender="Ada" subject="Hi" preview="Body" unread onClick={onClick} />
    );
    const row = getByLabelText(/Unread, from Ada/);
    expect(getByText('New')).toBeTruthy();
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('stars from the row without opening it', () => {
    const onClick = jest.fn();
    const onToggleStar = jest.fn();
    const { getByLabelText } = render(
      <MessageListRowV2 sender="Al" subject="Hi" starred={false} onClick={onClick} onToggleStar={onToggleStar} />
    );
    fireEvent.click(getByLabelText('Not starred'));
    expect(onToggleStar).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('MessageListRowV3 (dense line)', () => {
  it('renders a hairline row, opens via keyboard, and stays token-pure', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <MessageListRowV3 sender="Grace" subject="Report" preview="See attached" timestamp="Tue" onClick={onClick} />
    );
    const row = getByLabelText(/from Grace/);
    expect(row.className).toContain('border-b');
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
