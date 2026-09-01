import * as React from 'react';
import { Image, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import {
  studioGradient,
  studioScrim,
  studioInk,
  studioInkSoft,
  studioTile,
  studioBorder,
} from './internal/studio';
import type { GalleryHeaderProps } from './GalleryHeader';

/** Drop-in for {@link GalleryHeaderProps} — same props, the V4 "studio" design. */
export type GalleryHeaderV4Props = GalleryHeaderProps;

/**
 * GalleryHeader — **V4** "studio" design (native parity of the web V4). The
 * client-gallery masthead, and the **one reserved gradient moment** in the
 * photography studio line. The `hero` variant is image-forward: with a
 * `coverUrl` it lays near-white `studioInk` over a full-bleed cover photo
 * darkened by a bottom `studioScrim`; with no cover it falls back to the brand
 * `studioGradient` ground. The `compact` variant is a clean studio band (no
 * gradient) — bordered `surface`, a bold title, muted subtitle, and a neutral
 * count pill. The photo-count reads as a frosted `studioTile`/`studioBorder`
 * pill on the gradient; the title carries an accessibility `header` role.
 * Identical props/behavior to {@link GalleryHeaderProps}; token-only colors via
 * `useXenitionTheme()` + the studio ramp helpers, no literals.
 */
export function GalleryHeaderV4({
  title,
  subtitle,
  photoCount,
  coverUrl,
  variant = 'hero',
  actions,
  countLabel = 'photos',
  style,
}: GalleryHeaderV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const isHero = variant === 'hero';

  // ── compact: clean studio band, no gradient ────────────────────────────────
  if (!isHero) {
    return (
      <View
        style={[
          {
            gap: tokens.spacing.sm,
            padding: tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
          },
          style,
        ]}
      >
        <View style={{ gap: tokens.spacing.xs }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{subtitle}</Text>
          ) : null}
          {typeof photoCount === 'number' ? (
            <View
              style={{
                alignSelf: 'flex-start',
                marginTop: tokens.spacing.xs,
                backgroundColor: r.neutral[100],
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                {photoCount} {countLabel}
              </Text>
            </View>
          ) : null}
          {actions ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
              {actions}
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  // ── hero: the reserved gradient moment ─────────────────────────────────────
  const ink = studioInk(r);
  const inkSoft = studioInkSoft(r);

  const textBlock = (
    <View style={{ gap: tokens.spacing.xs, padding: tokens.spacing.lg }}>
      <Text
        accessibilityRole="header"
        style={{ color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '700', letterSpacing: -0.5 }}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
          {subtitle}
        </Text>
      ) : null}
      {typeof photoCount === 'number' ? (
        <View
          style={{
            alignSelf: 'flex-start',
            marginTop: tokens.spacing.xs,
            backgroundColor: studioTile(r),
            borderWidth: 1,
            borderColor: studioBorder(r),
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: 2,
          }}
        >
          <Text style={{ color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {photoCount} {countLabel}
          </Text>
        </View>
      ) : null}
      {actions ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
          {actions}
        </View>
      ) : null}
    </View>
  );

  return (
    <View
      style={[
        {
          minHeight: 200,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: r.neutral[200],
          justifyContent: 'flex-end',
        },
        style,
      ]}
    >
      {/* Full-bleed cover photo, or the brand gradient ground when absent. */}
      {coverUrl ? (
        <Image source={{ uri: coverUrl }} accessible={false} resizeMode="cover" style={{ ...absoluteFill }} />
      ) : (
        <GradientSurface colors={studioGradient(r)} style={{ ...absoluteFill }} />
      )}
      {/* Bottom scrim for legible near-white text over a cover photo. */}
      {coverUrl ? (
        <GradientSurface
          colors={studioScrim(r)}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '66%' }}
        />
      ) : null}

      {textBlock}
    </View>
  );
}

const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 } as const;
