import * as React from 'react';
import { Text, Pressable } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { Alert } from './Alert';
import { Progress } from './Progress';
import { Skeleton } from './Skeleton';
import { ToastProvider, useToast } from './Toast';

describe('Alert (native)', () => {
  it('renders its title and body', () => {
    const { getByText } = renderThemed(
      <Alert tone="success" title="Saved">
        Your changes are live.
      </Alert>,
      SEED_LIGHT
    );
    expect(getByText('Saved')).toBeTruthy();
    expect(getByText('Your changes are live.')).toBeTruthy();
  });

  it('fires onClose from the dismiss control and uses the alert role for danger', () => {
    const onClose = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <Alert tone="danger" onClose={onClose}>
        Boom
      </Alert>,
      SEED_LIGHT
    );
    // The danger alert exposes accessibilityRole="alert" on a plain View; match
    // it by role the way the passing primitives spec does.
    expect(root.findAll((n) => n.props?.accessibilityRole === 'alert').length).toBeGreaterThan(0);
    fireEvent.press(getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps every rendered hex traceable to a compiled token', () => {
    const { root } = renderThemed(
      <Alert tone="warn" title="Heads up" onClose={() => undefined}>
        Careful
      </Alert>,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('Progress (native)', () => {
  it('exposes progressbar semantics for the value/max', () => {
    const { root } = renderThemed(<Progress value={30} max={60} />, SEED_LIGHT);
    // Progress is a plain View with accessibilityRole="progressbar"; locate it by
    // role via the tree (getByRole skips non-a11y-element Views in RNTL 12).
    const bar = root.findAll((n) => n.props?.accessibilityRole === 'progressbar')[0];
    expect(bar).toBeTruthy();
    expect(bar!.props.accessibilityValue).toEqual({ min: 0, max: 60, now: 30 });
  });

  it('sizes the fill to the clamped percentage', () => {
    const { root } = renderThemed(<Progress value={200} max={100} />, SEED_LIGHT);
    const bar = root.findAll((n) => n.props?.accessibilityRole === 'progressbar')[0];
    expect(bar).toBeTruthy();
    // value 200/100 clamps to a 100%-wide fill.
    const widths = bar!
      .findAllByType(require('react-native').View)
      .map((n: { props: { style?: { width?: unknown } } }) => n.props.style?.width)
      .filter((w: unknown) => typeof w === 'string');
    expect(widths).toContain('100%');
  });

  it('keeps every rendered hex traceable to a compiled token', () => {
    const { root } = renderThemed(<Progress value={50} tone="success" />, SEED_LIGHT);
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('Skeleton (native)', () => {
  it('renders the requested number of text lines', () => {
    const { UNSAFE_getAllByType } = renderThemed(<Skeleton variant="text" lines={3} />, SEED_LIGHT);
    const blocks = UNSAFE_getAllByType(require('react-native').Animated.View);
    expect(blocks).toHaveLength(3);
  });

  it('renders a single block for a non-text variant and stays token-pure', () => {
    const { UNSAFE_getAllByType, root } = renderThemed(
      <Skeleton variant="circle" width={40} height={40} />,
      SEED_LIGHT
    );
    expect(UNSAFE_getAllByType(require('react-native').Animated.View)).toHaveLength(1);
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});

describe('Toast (native)', () => {
  function Probe(): React.ReactElement {
    const { toast } = useToast();
    return (
      <Pressable
        accessibilityLabel="fire"
        onPress={() => toast({ title: 'Uploaded', description: 'All set', duration: 0 })}
      >
        <Text>fire</Text>
      </Pressable>
    );
  }

  it('shows a toast via the useToast() trigger', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
      SEED_LIGHT
    );
    expect(queryByText('Uploaded')).toBeNull();
    fireEvent.press(getByLabelText('fire'));
    expect(queryByText('Uploaded')).toBeTruthy();
    expect(queryByText('All set')).toBeTruthy();
  });

  it('dismisses a toast from its dismiss control', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('fire'));
    expect(queryByText('Uploaded')).toBeTruthy();
    fireEvent.press(getByLabelText('Dismiss'));
    expect(queryByText('Uploaded')).toBeNull();
  });

  it('throws when useToast is used outside a provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => renderThemed(<Probe />, SEED_LIGHT)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });
});
