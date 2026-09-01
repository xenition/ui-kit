import * as React from 'react';
import { computeParticles, type ParticleFieldProps, type ParticleMood } from './ParticleField';
export type { ParticleMood };
/** Re-export the deterministic layout helper — the V4 reuses it, never reinvents it. */
export { computeParticles };
/** Drop-in for {@link ParticleFieldProps} — same props, the V4 "showcase" design. */
export type ParticleFieldV4Props = ParticleFieldProps;
export declare const ParticleFieldV4: React.ForwardRefExoticComponent<ParticleFieldProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ParticleFieldV4.d.ts.map