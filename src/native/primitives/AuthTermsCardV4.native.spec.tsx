import * as React from 'react';
import { Pressable } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { minTap } from './internal/nav-v4';
import { AUTH_DEFAULT_TERMS_LINKS, AuthTermsCardV4 } from './AuthTermsCardV4';

const THEME = compileTheme(SEED_LIGHT);
const TAP = minTap(THEME.spacing);

/** Every style object in the tree, flattened one level out of arrays. */
function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

/** The bordered card itself. */
function card(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find(
    (s) => s.borderWidth === 1 && s.borderRadius === THEME.radius.lg && s.padding === THEME.spacing.md
  );
}

/** The card's press wrapper — `accessible={false}`, so it is never a second control. */
function pressWrapper(root: ReactTestInstance): ReactTestInstance[] {
  return root.findAllByType(Pressable).filter((n) => n.props.accessible === false);
}

describe('AuthTermsCardV4 (native)', () => {
  it('draws the bordered card §9 asks for, with both default links inline', () => {
    const { root, getAllByRole, getByText } = renderThemed(<AuthTermsCardV4 />, SEED_LIGHT);
    expect(card(root)?.backgroundColor).toBe(THEME.light.surface);
    expect(card(root)?.borderColor).toBe(THEME.light.border);
    expect(card(root)?.flexDirection).toBe('row');
    expect(getByText('I agree to the')).toBeTruthy();
    expect(getAllByRole('link').map((n) => n.props.accessibilityLabel)).toEqual(
      AUTH_DEFAULT_TERMS_LINKS.map((l) => l.label)
    );
    // The joining word sits between them, so the row still reads as a sentence.
    expect(getByText('and')).toBeTruthy();
  });

  it('reports the ticked state through onCheckedChange', () => {
    const onCheckedChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <AuthTermsCardV4 onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('reports the unticking of an already-ticked box', () => {
    const onCheckedChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <AuthTermsCardV4 checked onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('I agree to the'));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('makes the whole card the target, without becoming a second control', () => {
    const onCheckedChange = jest.fn();
    const { root } = renderThemed(
      <AuthTermsCardV4 onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    const wrapper = pressWrapper(root);
    expect(wrapper).toHaveLength(1);
    fireEvent.press(wrapper[0]);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('drops the card press when pressToToggle is off', () => {
    const { root } = renderThemed(<AuthTermsCardV4 pressToToggle={false} />, SEED_LIGHT);
    expect(pressWrapper(root)).toHaveLength(0);
    // The card is still drawn — only its press is gone.
    expect(card(root)).toBeDefined();
  });

  it('answers a tick on the card border, not only inside the box', () => {
    const { root } = renderThemed(<AuthTermsCardV4 checked />, SEED_LIGHT);
    expect(card(root)?.borderColor).toBe(THEME.light.primary);
  });

  it('fires onLinkPress with the link id, and never ticks the box doing it', () => {
    const onLinkPress = jest.fn();
    const onCheckedChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <AuthTermsCardV4 onLinkPress={onLinkPress} onCheckedChange={onCheckedChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('link')[1]);
    expect(onLinkPress).toHaveBeenCalledWith('privacy');
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('gives every link — and the copy beside it — a full tap target', () => {
    const { root, getAllByRole } = renderThemed(<AuthTermsCardV4 />, SEED_LIGHT);
    getAllByRole('link').forEach((link) => {
      const style =
        typeof link.props.style === 'function' ? link.props.style({ pressed: false }) : link.props.style;
      expect(style.minHeight).toBe(TAP);
    });
    // The lead-in copy shares the height, so the sentence sits on one baseline.
    expect(styles(root).filter((s) => s.minHeight === TAP).length).toBeGreaterThanOrEqual(3);
  });

  it('renders custom links and the joining word between them', () => {
    const { getAllByRole, getByText } = renderThemed(
      <AuthTermsCardV4
        label="I accept the"
        separator="&"
        links={[
          { id: 'a', label: 'Rules' },
          { id: 'b', label: 'Charter' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('I accept the')).toBeTruthy();
    expect(getByText('&')).toBeTruthy();
    expect(getAllByRole('link')).toHaveLength(2);
  });

  it('renders the description under the consent, and nothing when it is absent', () => {
    const { getByText } = renderThemed(
      <AuthTermsCardV4 description="You can withdraw consent at any time." />,
      SEED_LIGHT
    );
    expect(getByText('You can withdraw consent at any time.')).toBeTruthy();

    const plain = renderThemed(<AuthTermsCardV4 />, SEED_LIGHT);
    expect(plain.queryByText('You can withdraw consent at any time.')).toBeNull();
  });

  it('aligns the box to the copy on request', () => {
    const { root } = renderThemed(<AuthTermsCardV4 />, SEED_LIGHT);
    expect(card(root)?.alignItems).toBe('center');
    const top = renderThemed(<AuthTermsCardV4 align="top" />, SEED_LIGHT);
    expect(card(top.root)?.alignItems).toBe('flex-start');
  });

  it('carries an error as a message, never as colour alone (§6)', () => {
    const { root, getByRole } = renderThemed(
      <AuthTermsCardV4 error="Please accept the terms to continue." />,
      SEED_LIGHT
    );
    const message = getByRole('alert');
    expect(message.props.children).toBe('Please accept the terms to continue.');
    expect(card(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('never renders a message row when there is no error (§12)', () => {
    const { queryByRole, root } = renderThemed(<AuthTermsCardV4 />, SEED_LIGHT);
    expect(queryByRole('alert')).toBeNull();
    expect(card(root)?.borderColor).toBe(THEME.light.border);
  });

  it('survives links={[]} with no dangling separator (§12)', () => {
    const { queryAllByRole, getByText, queryByText, getByLabelText } = renderThemed(
      <AuthTermsCardV4 links={[]} />,
      SEED_LIGHT
    );
    expect(queryAllByRole('link')).toHaveLength(0);
    expect(queryByText('and')).toBeNull();
    expect(getByText('I agree to the')).toBeTruthy();
    // The consent itself still works with nothing to link to.
    expect(getByLabelText('I agree to the')).toBeTruthy();
  });

  it('shows no separator when there is exactly one link (§12)', () => {
    const { queryAllByRole, queryByText } = renderThemed(
      <AuthTermsCardV4 links={[{ id: 'terms', label: 'Terms' }]} />,
      SEED_LIGHT
    );
    expect(queryAllByRole('link')).toHaveLength(1);
    expect(queryByText('and')).toBeNull();
  });

  it('disables the box and the links together', () => {
    const { root, getAllByRole } = renderThemed(<AuthTermsCardV4 disabled />, SEED_LIGHT);
    expect(card(root)?.opacity).toBe(THEME.state.disabledContent);
    getAllByRole('link').forEach((link) =>
      expect(link.props.accessibilityState?.disabled).toBe(true)
    );
  });

  it('paints only from the theme — every colour traces to a token', () => {
    const { root } = renderThemed(
      <AuthTermsCardV4 checked description="Withdraw any time." />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
