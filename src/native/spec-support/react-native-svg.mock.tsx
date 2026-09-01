/**
 * Test mock for the optional `react-native-svg` peer dep. The native SVG chart
 * components import primitives (Svg, Path, Circle, …) from it; under the jest
 * `react-native` preset there is no native SVG backend, so map each to a plain
 * host `View`/`Text` passthrough. Keeps chart specs rendering (mount + props)
 * without pulling the native module. Wired via jest `moduleNameMapper`.
 */
import * as React from 'react';
import { Text, View } from 'react-native';

/*
  `forwardRef`, because `Animated.createAnimatedComponent()` wraps these — the
  V4 rings and gauges drive `strokeDashoffset` through it — and it hands the
  wrapped component a ref. A plain function component given a ref logs a React
  error, which is a failed spec in a suite that treats console noise as one.
*/
const passthrough = (testID: string) =>
  React.forwardRef(function SvgMock(
    props: Record<string, unknown>,
    ref: React.Ref<unknown>
  ): React.ReactElement {
    const { children } = props as { children?: React.ReactNode };
    return React.createElement(View, { testID, ref, ...props }, children);
  });

export const Svg = passthrough('svg');
export const Path = passthrough('svg-path');
export const Circle = passthrough('svg-circle');
export const Ellipse = passthrough('svg-ellipse');
export const Rect = passthrough('svg-rect');
export const Line = passthrough('svg-line');
export const Polyline = passthrough('svg-polyline');
export const Polygon = passthrough('svg-polygon');
export const G = passthrough('svg-g');
export const Defs = passthrough('svg-defs');
export const LinearGradient = passthrough('svg-lineargradient');
export const RadialGradient = passthrough('svg-radialgradient');
export const Stop = passthrough('svg-stop');
export const ClipPath = passthrough('svg-clippath');
export const Mask = passthrough('svg-mask');
export const Use = passthrough('svg-use');
export const Symbol = passthrough('svg-symbol');
export const TSpan = passthrough('svg-tspan');
export const SvgText = React.forwardRef(function SvgTextMock(
  props: Record<string, unknown>,
  ref: React.Ref<unknown>
): React.ReactElement {
  const { children } = props as { children?: React.ReactNode };
  return React.createElement(Text, { testID: 'svg-text', ref, ...props }, children);
});
export { SvgText as Text };

export default Svg;
