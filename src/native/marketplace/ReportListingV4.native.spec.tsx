import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ReportListingV4 } from './ReportListingV4';
import type { ReportReason } from './ReportListing';

const theme = compileTheme(SEED_LIGHT);

const REASONS: ReportReason[] = [
  { id: 'counterfeit', label: 'Counterfeit item' },
  { id: 'other', label: 'Something else', requiresDetails: true },
];

function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

describe('ReportListingV4 (native) — the confirmation step', () => {
  it('does not submit on a single tap — it opens the confirmation', () => {
    const onSubmit = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );

    fireEvent.press(getByText('Counterfeit item'));
    expect(queryByText('Report')).toBeNull();

    fireEvent.press(getByText('Submit report'));
    // One tap: a question, not a report.
    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText('Report')).toBeTruthy();
  });

  it('submits only once the confirmation is answered', () => {
    const onSubmit = jest.fn();
    const { getByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Counterfeit item'));
    fireEvent.press(getByText('Submit report'));
    fireEvent.press(getByText('Report'));
    expect(onSubmit).toHaveBeenCalledWith('counterfeit', undefined);
  });

  it('lets the confirmation be backed out of, with nothing sent', () => {
    const onSubmit = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Counterfeit item'));
    fireEvent.press(getByText('Submit report'));
    fireEvent.press(getByText('Cancel'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(queryByText('Report')).toBeNull();
  });

  it("confirmMessage and confirmLabel (new) are the caller's words", () => {
    const { getByText } = renderThemed(
      <ReportListingV4
        reasons={REASONS}
        confirmMessage="This goes to a moderator."
        confirmLabel="Send it"
        onSubmit={jest.fn()}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Counterfeit item'));
    fireEvent.press(getByText('Submit report'));
    expect(getByText('This goes to a moderator.')).toBeTruthy();
    expect(getByText('Send it')).toBeTruthy();
  });

  it('keeps a disabled submit from opening anything at all', () => {
    const onSubmit = jest.fn();
    const { getByText, queryByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    // No reason chosen yet.
    fireEvent.press(getByText('Submit report'));
    expect(queryByText('Report')).toBeNull();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('ReportListingV4 (native) — props and selection', () => {
  it('keeps every base prop working', () => {
    const onCancel = jest.fn();
    const { getByText } = renderThemed(
      <ReportListingV4
        reasons={REASONS}
        title="Report it"
        submitLabel="File report"
        onCancel={onCancel}
      />,
      SEED_LIGHT
    );
    expect(getByText('Report it')).toBeTruthy();
    expect(getByText('File report')).toBeTruthy();

    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('confirms the chosen reason with a highlight and a mark, never a tone alone', () => {
    const { getByText, getByLabelText, queryByTestId, queryAllByTestId } = renderThemed(
      <ReportListingV4 reasons={REASONS} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Counterfeit item').props.accessibilityState.selected).toBe(false);
    expect(queryByTestId('xen-report-check')).toBeNull();

    fireEvent.press(getByText('Counterfeit item'));
    expect(getByLabelText('Counterfeit item').props.accessibilityState.selected).toBe(true);
    // Exactly one mark: the chosen reason, and nothing else in the list.
    expect(queryAllByTestId('xen-report-check')).toHaveLength(1);

    const rowStyle = flat(getByLabelText('Counterfeit item').props.style);
    expect(rowStyle.backgroundColor).toBe(theme.light.selected);
  });

  it('asks for details in words when the reason requires them', () => {
    const onSubmit = jest.fn();
    const { getByText, getByTestId, queryByText } = renderThemed(
      <ReportListingV4 reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Something else'));
    expect(getByText('Details (required)')).toBeTruthy();
    expect(queryByText('Tell us what happened — this reason needs details.')).toBeNull();

    fireEvent.changeText(getByTestId('xen-mkt-report-details'), '   ');
    expect(getByText('Tell us what happened — this reason needs details.')).toBeTruthy();

    fireEvent.changeText(getByTestId('xen-mkt-report-details'), 'It arrived broken');
    fireEvent.press(getByText('Submit report'));
    fireEvent.press(getByText('Report'));
    expect(onSubmit).toHaveBeenCalledWith('other', 'It arrived broken');
  });
});

describe('ReportListingV4 (native) — the empty case and the label', () => {
  it('degrades to EmptyStateV4 with no reasons', () => {
    const { getByText, queryByLabelText } = renderThemed(
      <ReportListingV4 reasons={[]} />,
      SEED_LIGHT
    );
    expect(getByText('No report reasons available')).toBeTruthy();
    expect(queryByLabelText('Counterfeit item')).toBeNull();
  });

  it('hides cancel entirely when nothing is listening for it', () => {
    const { queryByText } = renderThemed(<ReportListingV4 reasons={REASONS} />, SEED_LIGHT);
    expect(queryByText('Cancel')).toBeNull();
  });

  it('names the reason group and every reason in it', () => {
    const { getByLabelText } = renderThemed(<ReportListingV4 reasons={REASONS} />, SEED_LIGHT);
    expect(getByLabelText('Report this listing')).toBeTruthy();
    expect(getByLabelText('Counterfeit item')).toBeTruthy();
    expect(getByLabelText('Something else')).toBeTruthy();
  });
});
