import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Accordion } from '../primitives';
import { LessonRowV4 } from './LessonRowV4';
import type { ModuleAccordionProps } from './ModuleAccordion';

/** Drop-in for {@link ModuleAccordionProps} — same props, the V4 "campus" design. */
export type ModuleAccordionV4Props = ModuleAccordionProps;

/**
 * ModuleAccordion — **V4** "campus" design (native twin of the web V4). A course
 * outline as collapsible modules (built on the primitive `Accordion`), each
 * expanding to its {@link LessonRowV4} list on the campus design. The module
 * header shows a **tabular-nums** completed/total tally. Renders an elevated
 * empty-state card when there are no modules. Token-only colors via
 * `useXenitionTheme()`.
 */
export function ModuleAccordionV4({ modules, type = 'single', defaultOpenIds, onLessonPress, emptyLabel = 'No modules yet', style }: ModuleAccordionV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (modules.length === 0) {
    const shell: ViewStyle = {
      padding: tokens.spacing.lg,
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    };
    return (
      <View accessibilityLabel={emptyLabel} style={[shell, style]}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const items = modules.map((mod) => {
    const done = mod.lessons.filter((l) => l.status === 'completed').length;
    return {
      value: mod.id,
      title: (
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{mod.title}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{done}/{mod.lessons.length} lessons</Text>
        </View>
      ),
      content: (
        <View style={{ gap: tokens.spacing.sm }}>
          {mod.lessons.length === 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No lessons</Text>
          ) : (
            mod.lessons.map((lesson, i) => (
              <LessonRowV4
                key={lesson.id}
                index={i + 1}
                title={lesson.title}
                durationLabel={lesson.durationLabel}
                status={lesson.status}
                kind={lesson.kind}
                onPress={onLessonPress ? () => onLessonPress(mod.id, lesson.id) : undefined}
              />
            ))
          )}
        </View>
      ),
    };
  });

  return <Accordion items={items} type={type} defaultValue={defaultOpenIds} style={style} />;
}
