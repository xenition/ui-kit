/**
 * Design-line composition (native). The V2/V3 alternates exist so an app can
 * pick one line and stay in it — every screen it sees is drawn the same way.
 * A composite that reaches back across the line ships a V2 shell with base
 * parts inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * ProfileCard renders the compatibility meter from its own line and no other.
 */
import * as React from 'react';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { ProfileCard } from './ProfileCard';
import { ProfileCardV2 } from './ProfileCardV2';
import { ProfileCardV3 } from './ProfileCardV3';
import type { ProfileCardProps } from './ProfileCard';

// Each meter is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./CompatibilityMeter', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CompatibilityMeter: () => react.createElement(Text, null, 'compat-meter-base') };
});
jest.mock('./CompatibilityMeterV2', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CompatibilityMeterV2: () => react.createElement(Text, null, 'compat-meter-v2') };
});
jest.mock('./CompatibilityMeterV3', () => {
  const react = require('react');
  const { Text } = require('react-native');
  return { CompatibilityMeterV3: () => react.createElement(Text, null, 'compat-meter-v3') };
});

const PROFILE = {
  id: 'ada',
  name: 'Ada',
  age: 31,
  headline: 'Builds engines that think',
  compatibility: 88,
};

const renderProfile = (Card: React.ComponentType<ProfileCardProps>) =>
  renderThemed(<Card profile={PROFILE} />, SEED_LIGHT);

describe('ProfileCard composes within its own design line (native)', () => {
  it('the base card uses the base meter', () => {
    const { queryByText } = renderProfile(ProfileCard);
    expect(queryByText('compat-meter-base')).toBeTruthy();
    expect(queryByText('compat-meter-v2')).toBeNull();
    expect(queryByText('compat-meter-v3')).toBeNull();
  });

  it('V2 uses the V2 meter, never the base one', () => {
    const { queryByText } = renderProfile(ProfileCardV2);
    expect(queryByText('compat-meter-v2')).toBeTruthy();
    expect(queryByText('compat-meter-base')).toBeNull();
    expect(queryByText('compat-meter-v3')).toBeNull();
  });

  it('V3 uses the V3 meter, never the base one', () => {
    const { queryByText } = renderProfile(ProfileCardV3);
    expect(queryByText('compat-meter-v3')).toBeTruthy();
    expect(queryByText('compat-meter-base')).toBeNull();
    expect(queryByText('compat-meter-v2')).toBeNull();
  });
});
