import * as React from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed, renderedStyleHexes, tokenHexSet } from '../spec-support/render-native';
import { Icon } from './Icon';
import { FloatButton } from './FloatButton';
import { BottomNav } from './BottomNav';
import { Banner } from './Banner';
import { Callout } from './Callout';
import { Result } from './Result';
import { LoadingOverlay } from './LoadingOverlay';
import { ButtonGroup } from './ButtonGroup';
import { Watermark } from './Watermark';
import { ActionSheet } from './ActionSheet';
import { Button } from './Button';

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

describe('Icon (native)', () => {
  it('renders the glyph and exposes its accessibility label', () => {
    const { getByText, getByLabelText } = renderThemed(
      <Icon glyph="★" color="primary" accessibilityLabel="star" />,
      SEED_LIGHT
    );
    expect(getByText('★')).toBeTruthy();
    expect(getByLabelText('star')).toBeTruthy();
  });

  it('colors the glyph from a semantic token', () => {
    const { root } = renderThemed(<Icon glyph="✓" color="success" />, SEED_LIGHT);
    assertTokenPure(root);
  });
});

describe('FloatButton (native)', () => {
  it('fires onPress and stays token-pure', () => {
    const onPress = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <FloatButton label="Compose" onPress={onPress} icon={<Icon glyph="+" color="onPrimary" />} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Compose'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('BottomNav (native)', () => {
  it('renders tabs and reports selection', () => {
    const onChange = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <BottomNav
        active="home"
        onChange={onChange}
        items={[
          { key: 'home', label: 'Home' },
          { key: 'search', label: 'Search' },
        ]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Search'));
    expect(onChange).toHaveBeenCalledWith('search');
    const tabs = root.findAll((n) => n.props?.accessibilityRole === 'tab');
    expect(tabs.length).toBeGreaterThanOrEqual(2);
    assertTokenPure(root);
  });
});

describe('Banner (native)', () => {
  it('renders content, fires action, and uses the alert role for danger', () => {
    const onAction = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <Banner tone="danger" actionLabel="Retry" onAction={onAction}>
        Upload failed
      </Banner>,
      SEED_LIGHT
    );
    expect(getByText('Upload failed')).toBeTruthy();
    expect(root.findAll((n) => n.props?.accessibilityRole === 'alert').length).toBeGreaterThan(0);
    fireEvent.press(getByLabelText('Retry'));
    expect(onAction).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('Callout (native)', () => {
  it('renders title + body and stays token-pure', () => {
    const { getByText, root } = renderThemed(
      <Callout tone="success" title="Tip" icon={<Icon glyph="💡" />}>
        You can undo this.
      </Callout>,
      SEED_LIGHT
    );
    expect(getByText('Tip')).toBeTruthy();
    expect(getByText('You can undo this.')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('Result (native)', () => {
  it('renders status title/description and primary action', () => {
    const onAction = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <Result status="error" title="Payment failed" description="Try again." actionLabel="Back" onAction={onAction} />,
      SEED_LIGHT
    );
    expect(getByText('Payment failed')).toBeTruthy();
    fireEvent.press(getByLabelText('Back'));
    expect(onAction).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('LoadingOverlay (native)', () => {
  it('renders nothing when hidden and a labelled overlay when visible', () => {
    const hidden = renderThemed(<LoadingOverlay visible={false} label="Saving" />, SEED_LIGHT);
    expect(hidden.queryByText('Saving')).toBeNull();

    const { getByText, root } = renderThemed(<LoadingOverlay visible label="Saving" />, SEED_LIGHT);
    expect(getByText('Saving')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('ButtonGroup (native)', () => {
  it('joins its button children and stays token-pure', () => {
    const { getByText, root } = renderThemed(
      <ButtonGroup>
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </ButtonGroup>,
      SEED_LIGHT
    );
    expect(getByText('Day')).toBeTruthy();
    expect(getByText('Month')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('Watermark (native)', () => {
  it('overlays its children with repeated text', () => {
    const { getAllByText, getByText, root } = renderThemed(
      <Watermark text="DRAFT" count={6}>
        <Text>Document body</Text>
      </Watermark>,
      SEED_LIGHT
    );
    expect(getByText('Document body')).toBeTruthy();
    // The watermark overlay is hidden from accessibility by design, so opt into
    // hidden elements to count the repeated marks (RNTL 12 excludes them by default).
    expect(getAllByText('DRAFT', { includeHiddenElements: true }).length).toBeGreaterThanOrEqual(6);
    assertTokenPure(root);
  });
});

describe('ActionSheet (native)', () => {
  it('renders actions when open and invokes onSelect + onClose', () => {
    const onClose = jest.fn();
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <ActionSheet
        open
        onClose={onClose}
        title="Photo"
        actions={[
          { label: 'Take Photo', onSelect },
          { label: 'Delete', destructive: true },
        ]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Take Photo'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
