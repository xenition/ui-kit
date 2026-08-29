import * as React from 'react';
import { KeyboardAvoidingView, Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { flatStyle } from '../spec-support/surface-v4';
import { KeyboardAvoiderV4 } from './KeyboardAvoiderV4';

/** The fixed top inset the safe-area mock reports for a notch-like device. */
const MOCK_TOP_INSET = 24;

function avoiderOf(root: ReactTestInstance): ReactTestInstance {
  return root.findAllByType(KeyboardAvoidingView)[0]!;
}

describe('KeyboardAvoiderV4 (native)', () => {
  it('lifts content with the platform-correct behaviour — unchanged (§1.4)', () => {
    // `padding` on iOS, `height` on Android; the jest preset runs as iOS.
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 />, SEED_LIGHT);
    expect(avoiderOf(root).props.behavior).toBe('padding');
  });

  it('lets a caller override the behaviour outright', () => {
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 behavior="position" />, SEED_LIGHT);
    expect(avoiderOf(root).props.behavior).toBe('position');
  });

  it('takes `flex: 1` ahead of the caller’s style — §5 asks this be written down', () => {
    // `KeyboardAvoidingView` lifts content by shrinking its OWN frame, so a
    // view sized to its content has nothing to shrink.
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 />, SEED_LIGHT);
    expect(flatStyle(avoiderOf(root).props.style).flex).toBe(1);
  });

  it('still lets the caller’s style win, for a sized panel rather than a screen', () => {
    const { UNSAFE_root: root } = renderThemed(
      <KeyboardAvoiderV4 style={{ flex: 0, marginTop: 8 }} />,
      SEED_LIGHT
    );
    const style = flatStyle(avoiderOf(root).props.style);
    expect(style.flex).toBe(0);
    expect(style.marginTop).toBe(8);
  });

  it('adds no offset by default — the base passed none (§1.4)', () => {
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 />, SEED_LIGHT);
    expect(avoiderOf(root).props.keyboardVerticalOffset).toBe(0);
  });

  it('passes `offset` through, which a screen with a sticky footer needs (§5)', () => {
    // Without it the footer the keyboard pushes up covers the field that
    // opened the keyboard.
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 offset={56} />, SEED_LIGHT);
    expect(avoiderOf(root).props.keyboardVerticalOffset).toBe(56);
  });

  it('honours a raw `keyboardVerticalOffset`, and lets `offset` win over it', () => {
    const raw = renderThemed(<KeyboardAvoiderV4 keyboardVerticalOffset={40} />, SEED_LIGHT);
    expect(avoiderOf(raw.UNSAFE_root).props.keyboardVerticalOffset).toBe(40);

    const both = renderThemed(
      <KeyboardAvoiderV4 offset={56} keyboardVerticalOffset={40} />,
      SEED_LIGHT
    );
    expect(avoiderOf(both.UNSAFE_root).props.keyboardVerticalOffset).toBe(56);
  });

  it('reads no safe-area inset by default — the base read none (§1.4)', () => {
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 offset={8} />, SEED_LIGHT);
    expect(avoiderOf(root).props.keyboardVerticalOffset).toBe(8);
  });

  it('accounts for a top inset an ancestor already consumed, on request', () => {
    // The view measures its frame against the WINDOW, so mounted below the
    // status bar its idea of where the keyboard starts is off by that inset
    // and the lifted content stops short of clearing the keyboard.
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 safeArea />, SEED_LIGHT);
    expect(avoiderOf(root).props.keyboardVerticalOffset).toBe(MOCK_TOP_INSET);
  });

  it('stacks the inset onto an explicit offset rather than replacing it', () => {
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 safeArea offset={56} />, SEED_LIGHT);
    expect(avoiderOf(root).props.keyboardVerticalOffset).toBe(56 + MOCK_TOP_INSET);
  });

  it('renders the form it is handed, untouched', () => {
    const { getByText } = renderThemed(
      <KeyboardAvoiderV4>
        <Text>Email</Text>
      </KeyboardAvoiderV4>,
      SEED_LIGHT
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('empty state: an empty avoider keeps the screen’s height rather than collapsing', () => {
    // It paints nothing at all — no ground, no border, no rule — so there is no
    // blank box to leave behind, and its `flex: 1` is holding the height.
    const { UNSAFE_root: root, toJSON } = renderThemed(<KeyboardAvoiderV4 />, SEED_LIGHT);
    expect(toJSON()).toBeTruthy();
    expect(flatStyle(avoiderOf(root).props.style).flex).toBe(1);
  });

  it('empty state: paints no ground, no border and no shadow of its own', () => {
    const { UNSAFE_root: root } = renderThemed(<KeyboardAvoiderV4 />, SEED_LIGHT);
    const style = flatStyle(avoiderOf(root).props.style);
    expect(style.backgroundColor).toBeUndefined();
    expect(style.borderWidth).toBeUndefined();
    expect(style.shadowOpacity).toBeUndefined();
  });

  it('passes view props through', () => {
    const { UNSAFE_root: root, getByTestId } = renderThemed(
      <KeyboardAvoiderV4 testID="avoider" enabled={false} />,
      SEED_LIGHT
    );
    // `enabled` is consumed by the avoider itself; `testID` reaches the host.
    expect(avoiderOf(root).props.enabled).toBe(false);
    expect(getByTestId('avoider')).toBeTruthy();
  });

  it('names no colour of its own — it paints nothing (§1.1)', () => {
    const allowed = tokenHexSet(SEED_LIGHT);
    const { UNSAFE_root: root } = renderThemed(
      <KeyboardAvoiderV4 safeArea offset={56}>
        <Text>Email</Text>
      </KeyboardAvoiderV4>,
      SEED_LIGHT
    );
    const hexes = renderedStyleHexes(root);
    expect(hexes).toHaveLength(0);
    hexes.forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
