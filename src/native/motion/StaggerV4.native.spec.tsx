import * as React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import { V4_MOTION } from '../primitives/internal/motion-v4';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { Reveal } from './Reveal';
import { RevealV4 } from './RevealV4';
import { StaggerConfigContext, StaggerIndexContext } from './Stagger';
import { StaggerV4, STAGGER_V4_MAX_DELAY } from './StaggerV4';

/**
 * The cascade offset a child would apply, computed exactly as `Reveal` and
 * `RevealV4` compute it — the delay is not visible in a rendered style, so this
 * probe reads the context the same way a child does and prints the number.
 */
function DelayProbe({ own = 0 }: { own?: number }): React.ReactElement {
  const config = React.useContext(StaggerConfigContext);
  const index = React.useContext(StaggerIndexContext);
  const total = own + (config !== null ? config.delay + index * config.interval : 0);
  return <Text>{`delay:${total}`}</Text>;
}

const probes = (count: number): React.ReactElement[] =>
  Array.from({ length: count }, (_unused, i) => <DelayProbe key={i} />);

describe('StaggerV4 (native) — the scale', () => {
  it('defaults its interval to V4_MOTION.quick', () => {
    const { getByText } = renderThemed(<StaggerV4>{probes(3)}</StaggerV4>, SEED_LIGHT);
    expect(getByText('delay:0')).toBeTruthy();
    expect(getByText(`delay:${V4_MOTION.quick}`)).toBeTruthy();
    expect(getByText(`delay:${V4_MOTION.quick * 2}`)).toBeTruthy();
  });

  it('is the 100 the base already used, said properly', () => {
    expect(V4_MOTION.quick).toBe(100);
  });

  it('honours an explicit interval and base delay', () => {
    const { getByText } = renderThemed(
      <StaggerV4 interval={150} delay={50}>
        {probes(2)}
      </StaggerV4>,
      SEED_DARK
    );
    expect(getByText('delay:50')).toBeTruthy();
    expect(getByText('delay:200')).toBeTruthy();
  });

  it('adds a child’s own delay on top of the cascade offset', () => {
    const { getByText } = renderThemed(
      <StaggerV4 interval={150} delay={50}>
        <DelayProbe />
        <DelayProbe own={10} />
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(getByText('delay:210')).toBeTruthy();
  });
});

describe('StaggerV4 (native) — the cap the base lacked', () => {
  it('caps the accumulated delay at STAGGER_V4_MAX_DELAY', () => {
    const { getAllByText } = renderThemed(<StaggerV4>{probes(40)}</StaggerV4>, SEED_LIGHT);
    // Items 8..39 all sit on the cap — 32 of them.
    expect(getAllByText(`delay:${STAGGER_V4_MAX_DELAY}`)).toHaveLength(32);
  });

  it('is not the four seconds the base would have produced', () => {
    const { queryByText } = renderThemed(<StaggerV4>{probes(40)}</StaggerV4>, SEED_LIGHT);
    expect(queryByText(`delay:${39 * V4_MOTION.quick}`)).toBeNull();
    expect(STAGGER_V4_MAX_DELAY).toBe(800);
  });

  it('composes the cap from the scale, and agrees with the web twin', () => {
    expect(STAGGER_V4_MAX_DELAY).toBe(V4_MOTION.enter * 2);
  });

  it('takes an explicit maxDelay', () => {
    const { getAllByText, getByText } = renderThemed(
      <StaggerV4 maxDelay={200}>{probes(4)}</StaggerV4>,
      SEED_LIGHT
    );
    expect(getByText('delay:0')).toBeTruthy();
    expect(getByText('delay:100')).toBeTruthy();
    expect(getAllByText('delay:200')).toHaveLength(2);
  });

  it('never caps the caller’s explicit base delay', () => {
    const { getByText, getAllByText } = renderThemed(
      <StaggerV4 delay={2000} maxDelay={100}>
        {probes(3)}
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(getByText('delay:2000')).toBeTruthy();
    expect(getAllByText('delay:2100')).toHaveLength(2);
  });
});

describe('StaggerV4 (native) — the base behaviour it keeps', () => {
  it('renders every child, base Reveal and RevealV4 alike', () => {
    const { getByText } = renderThemed(
      <StaggerV4>
        <Reveal>
          <Text>One</Text>
        </Reveal>
        <RevealV4>
          <Text>Two</Text>
        </RevealV4>
      </StaggerV4>,
      SEED_DARK
    );
    expect(getByText('One')).toBeTruthy();
    expect(getByText('Two')).toBeTruthy();
  });

  it('leaves non-Reveal children untouched but still advances the index', () => {
    const { getByText } = renderThemed(
      <StaggerV4>
        <Text>Plain</Text>
        <DelayProbe />
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(getByText('Plain')).toBeTruthy();
    expect(getByText(`delay:${V4_MOTION.quick}`)).toBeTruthy();
  });

  it('renders with no children at all', () => {
    const { getByTestId } = renderThemed(<StaggerV4 />, SEED_LIGHT);
    expect(getByTestId('xen-v4-stagger')).toBeTruthy();
  });

  it('applies a container style override', () => {
    const { getByTestId } = renderThemed(
      <StaggerV4 style={{ gap: 8 }}>
        <DelayProbe />
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(getByTestId('xen-v4-stagger').props.style).toEqual({ gap: 8 });
  });
});

describe('StaggerV4 (native) — reduced motion and the pre-answer path', () => {
  it('still applies delays under reduced motion (a delayed fade is still a fade)', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { getByText } = renderThemed(<StaggerV4>{probes(2)}</StaggerV4>, SEED_LIGHT);
    await waitFor(() => expect(getByText(`delay:${V4_MOTION.quick}`)).toBeTruthy());
  });

  it('renders before the async reduced-motion read resolves', () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockReturnValue(
      new Promise<boolean>(() => undefined)
    );
    const { getByText } = renderThemed(
      <StaggerV4>
        <RevealV4>
          <Text>Early</Text>
        </RevealV4>
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(getByText('Early')).toBeTruthy();
  });
});
