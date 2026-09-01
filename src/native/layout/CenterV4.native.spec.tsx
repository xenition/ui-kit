import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed, renderedStyleHexes } from '../spec-support/render-native';
import { Center } from './Center';
import { CenterV4, type CenterV4Props } from './CenterV4';

/** Flatten the `style` array RN components compose into one object. */
function flatStyle(node: ReactTestInstance): Record<string, unknown> {
  const style = node.props.style as unknown;
  const parts = (Array.isArray(style) ? style : [style]).filter(Boolean);
  return Object.assign({}, ...parts) as Record<string, unknown>;
}

describe('CenterV4 (native)', () => {
  it('IS the base component — two alignment enums are not a design line', () => {
    expect(CenterV4).toBe(Center);
  });

  it('takes exactly the base component’s props', () => {
    const same: React.ComponentProps<typeof Center> = { fill: true };
    const asV4: CenterV4Props = same;
    expect(asV4).toBe(same);
  });

  it('centers on both axes', () => {
    const { getByTestId, getByText } = renderThemed(
      <CenterV4 testID="c">
        <Text>content</Text>
      </CenterV4>,
      SEED_LIGHT
    );
    const flat = flatStyle(getByTestId('c'));
    expect(flat.alignItems).toBe('center');
    expect(flat.justifyContent).toBe('center');
    expect(getByText('content')).toBeTruthy();
  });

  it('does not fill by default and takes flex: 1 when asked to', () => {
    const { getByTestId } = renderThemed(<CenterV4 testID="c" />, SEED_LIGHT);
    expect(flatStyle(getByTestId('c')).flex).toBeUndefined();

    const { getByTestId: getFill } = renderThemed(<CenterV4 testID="f" fill />, SEED_LIGHT);
    expect(flatStyle(getFill('f')).flex).toBe(1);
  });

  it('renders an empty view with no children — centering nothing must not throw or paint', () => {
    const { getByTestId } = renderThemed(<CenterV4 testID="c" fill />, SEED_LIGHT);
    const el = getByTestId('c');
    expect(React.Children.count(el.props.children)).toBe(0);
    expect(flatStyle(el).alignItems).toBe('center');
  });

  it('adds no padding of its own — that is Inset’s job (brief §5)', () => {
    const { getByTestId } = renderThemed(<CenterV4 testID="c" fill />, SEED_LIGHT);
    const flat = flatStyle(getByTestId('c'));
    expect(flat.padding).toBeUndefined();
    expect(flat.paddingHorizontal).toBeUndefined();
    expect(flat.paddingVertical).toBeUndefined();
  });

  it('merges a caller style after its own', () => {
    const { getByTestId } = renderThemed(
      <CenterV4 testID="c" style={{ alignItems: 'flex-start' }} />,
      SEED_LIGHT
    );
    expect(flatStyle(getByTestId('c')).alignItems).toBe('flex-start');
  });

  it('paints no colour at all — nothing for the token-purity rule to catch', () => {
    const { root } = renderThemed(
      <CenterV4 fill>
        <Text>content</Text>
      </CenterV4>,
      SEED_LIGHT
    );
    expect(renderedStyleHexes(root)).toEqual([]);
  });
});
