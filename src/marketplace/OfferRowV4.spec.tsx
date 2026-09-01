/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { OfferRowV4 } from './OfferRowV4';
import { rowHeightClass } from '../dashboard/internal/row-v4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function block(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-offer-row]');
}

function innerRow(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-offer-row] [data-xen-v4-row]');
}

describe('OfferRowV4 (web) — props', () => {
  it('keeps every base prop working and fires all three answers', () => {
    const onAccept = jest.fn();
    const onCounter = jest.fn();
    const onDecline = jest.fn();
    const { container, getByText } = renderThemed(
      <OfferRowV4
        party="Grace"
        amountCents={9900}
        timeLabel="2h ago"
        note="Would you take this?"
        onAccept={onAccept}
        onCounter={onCounter}
        onDecline={onDecline}
        className="custom"
      />
    );
    expect(getByText('Grace')).toBeTruthy();
    expect(getByText('$99.00')).toBeTruthy();
    expect(getByText('2h ago')).toBeTruthy();
    expect(getByText('Would you take this?')).toBeTruthy();
    expect(block(container)?.className).toContain('custom');

    fireEvent.click(getByText('Accept'));
    fireEvent.click(getByText('Counter'));
    fireEvent.click(getByText('Decline'));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onCounter).toHaveBeenCalledTimes(1);
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('hides the actions unless the offer is still pending', () => {
    const onAccept = jest.fn();
    const { queryByText } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={9900} status="accepted" onAccept={onAccept} />
    );
    expect(queryByText('Accept')).toBeNull();
  });

  it('showAvatar (new) drops the avatar and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderThemed(
      <OfferRowV4 ref={ref} party="Grace" amountCents={100} showAvatar={false} />
    );
    expect(container.querySelector('[data-xen-v4-avatar]')).toBeNull();
    expect(ref.current?.getAttribute('data-xen-offer-row')).toBe('');
  });
});

describe('OfferRowV4 (web) — the design line', () => {
  it('sets the money in tabular figures through formatMoney', () => {
    const { getByText } = renderThemed(<OfferRowV4 party="Grace" amountCents={120450} />);
    expect(getByText('$1,204.50').className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('takes the row metric and no card of its own', () => {
    const oneLine = renderThemed(<OfferRowV4 party="Grace" amountCents={100} />);
    expect(innerRow(oneLine.container)?.className).toContain(rowHeightClass(false));

    const twoLine = renderThemed(<OfferRowV4 party="Grace" amountCents={100} timeLabel="2h ago" />);
    expect(innerRow(twoLine.container)?.className).toContain(rowHeightClass(true));
    expect(innerRow(twoLine.container)?.className).toContain('bg-transparent');
  });

  it('gives every status a glyph and a word, never a tone alone (rule 6)', () => {
    const cases = [
      { status: 'pending', glyph: resolveIconGlyph('clock'), word: 'Pending' },
      { status: 'accepted', glyph: resolveIconGlyph('check'), word: 'Accepted' },
      { status: 'declined', glyph: resolveIconGlyph('close'), word: 'Declined' },
      { status: 'countered', glyph: resolveIconGlyph('refresh'), word: 'Countered' },
      { status: 'expired', glyph: resolveIconGlyph('error'), word: 'Expired' },
    ] as const;
    cases.forEach(({ status, glyph, word }) => {
      const { container, getByText } = renderThemed(
        <OfferRowV4 party="Grace" amountCents={100} status={status} />
      );
      const glyphs = Array.from(container.querySelectorAll('[data-xen-v4-icon]')).map(
        (el) => el.textContent
      );
      expect(glyphs).toContain(glyph);
      expect(getByText(word)).toBeTruthy();
    });
  });

  it('does not spend warn on an offer that is merely waiting (rule 3)', () => {
    const { container } = renderThemed(<OfferRowV4 party="Grace" amountCents={100} status="pending" />);
    expect(block(container)?.outerHTML).not.toContain('warn');
  });

  it('paints no literal colour in anything it draws itself', () => {
    const { container } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={100} status="declined" note="A note" showAvatar={false} />
    );
    // Scoped to the row this file draws, with the two primitives that publish
    // compiled hexes as inline custom properties left out: `ButtonV4` writes
    // its elevation shadow and `AvatarV4` its monogram pair, and both of those
    // ARE tokens — asserting over them would be asserting about them.
    const inline = Array.from(innerRow(container)?.querySelectorAll<HTMLElement>('[style]') ?? [])
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(inline).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

describe('OfferRowV4 (web) — the empty case and the label', () => {
  it('renders nothing for an offer with no party', () => {
    const { container } = renderThemed(<OfferRowV4 party="  " amountCents={9900} />);
    expect(container.querySelector('[data-xen-offer-row]')).toBeNull();
  });

  it('survives having no time, no note and no actions', () => {
    const { container, getByText } = renderThemed(<OfferRowV4 party="Grace" amountCents={9900} />);
    expect(getByText('Grace')).toBeTruthy();
    expect(block(container)?.querySelectorAll('button')).toHaveLength(0);
  });

  it('announces the party, the status and the amount as one thing', () => {
    const { container } = renderThemed(
      <OfferRowV4 party="Grace" amountCents={9900} status="countered" />
    );
    expect(block(container)?.getAttribute('aria-label')).toBe('Grace, Countered, $99.00');
  });
});
