/** @jest-environment jsdom */
/**
 * Design-line composition (web). The v2/v3 alternates exist so an app can pick
 * one line and stay in it — every screen it sees is drawn the same way. A
 * composite that reaches back across the line ships a v2 shell with base parts
 * inside it and quietly undoes that choice; because the alternates take
 * identical props, the compiler cannot catch it and nothing on screen is
 * different enough to notice at a glance. So it is asserted here: each
 * ProfileCard renders the compatibility meter from its own line and no other.
 */
import { render } from '@testing-library/react';
import { ProfileCard } from './ProfileCard';
import { ProfileCardV2 } from './ProfileCardV2';
import { ProfileCardV3 } from './ProfileCardV3';
import type { ProfileCardProps } from './ProfileCard';

// Each meter is stubbed to a distinguishable marker so the assertion is about
// which module the composite reached for, not about how it looks.
jest.mock('./CompatibilityMeter', () => ({ CompatibilityMeter: () => <p>compat-meter-base</p> }));
jest.mock('./CompatibilityMeterV2', () => ({ CompatibilityMeterV2: () => <p>compat-meter-v2</p> }));
jest.mock('./CompatibilityMeterV3', () => ({ CompatibilityMeterV3: () => <p>compat-meter-v3</p> }));

const PROFILE = {
  id: 'ada',
  name: 'Ada',
  age: 31,
  headline: 'Builds engines that think',
  compatibility: 88,
};

const renderProfile = (Card: React.ComponentType<ProfileCardProps>) => render(<Card profile={PROFILE} />);

describe('ProfileCard composes within its own design line (web)', () => {
  it('the base card uses the base meter', () => {
    const { queryByText } = renderProfile(ProfileCard);
    expect(queryByText('compat-meter-base')).toBeTruthy();
    expect(queryByText('compat-meter-v2')).toBeNull();
    expect(queryByText('compat-meter-v3')).toBeNull();
  });

  it('v2 uses the v2 meter, never the base one', () => {
    const { queryByText } = renderProfile(ProfileCardV2);
    expect(queryByText('compat-meter-v2')).toBeTruthy();
    expect(queryByText('compat-meter-base')).toBeNull();
    expect(queryByText('compat-meter-v3')).toBeNull();
  });

  it('v3 uses the v3 meter, never the base one', () => {
    const { queryByText } = renderProfile(ProfileCardV3);
    expect(queryByText('compat-meter-v3')).toBeTruthy();
    expect(queryByText('compat-meter-base')).toBeNull();
    expect(queryByText('compat-meter-v2')).toBeNull();
  });
});
