import * as React from 'react';
import { View } from 'react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../../spec-support/render-native';
import { compileTheme } from '../../../theme/compile';
import { toNativeTokens } from '../../../theme/outputs';
import { useXenitionTheme } from '../../theme';
import { appearanceStyle, APPEARANCES } from './appearance';
import { shadow } from './elevation';
import { useEnter, usePressScale } from './motion';

// Exercise the shared native diversity/motion vocabulary.

function AppearanceProbe(): React.ReactElement {
  // Rendered so renderedStyleHexes can walk the tree; one View per appearance.
  return <View>{APPEARANCES.map((ap) => <ApView key={ap} appearance={ap} />)}</View>;
}
function ApView({ appearance }: { appearance: (typeof APPEARANCES)[number] }): React.ReactElement {
  // Read the ACTIVE provider theme so the colors match whatever seed is rendered.
  const { colors, tokens } = useXenitionTheme();
  return <View testID={`ap-${appearance}`} style={appearanceStyle(appearance, colors, tokens)} />;
}

function MotionProbe(): React.ReactElement {
  const press = usePressScale();
  const enter = useEnter();
  return (
    <View testID="probe" style={{ opacity: enter.opacity, transform: [{ scale: press.scale }] }} />
  );
}

describe('native diversity/motion vocabulary', () => {
  it('every appearance renders token-pure (no non-token hex)', () => {
    for (const seed of [SEED_LIGHT, SEED_DARK]) {
      const { root } = renderThemed(<AppearanceProbe />, seed);
      const allowed = tokenHexSet(seed);
      for (const hex of renderedStyleHexes(root)) {
        expect(allowed.has(hex)).toBe(true);
      }
    }
  });

  it('the elevation scale uses only a token-derived shadow color', () => {
    const tokens = toNativeTokens(compileTheme(SEED_LIGHT));
    const allowed = tokenHexSet(SEED_LIGHT);
    for (const level of ['sm', 'md', 'lg', 'xl'] as const) {
      const s = shadow(level, tokens) as { shadowColor?: string };
      if (s.shadowColor) expect(allowed.has(s.shadowColor.toLowerCase())).toBe(true);
    }
    expect(shadow('none', tokens)).toEqual({});
  });

  it('the motion hooks mount without throwing', () => {
    const { getByTestId } = renderThemed(<MotionProbe />, SEED_LIGHT);
    expect(getByTestId('probe')).toBeTruthy();
  });
});
