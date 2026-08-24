import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Accordion } from '../primitives';
import { LessonRow, type LessonStatus } from './LessonRow';

/** A lesson entry inside a module. */
export interface ModuleLesson {
  id: string;
  title: string;
  durationLabel?: string;
  status?: LessonStatus;
  kind?: string;
}

/** A course module (section) with its lessons. */
export interface CourseModule {
  id: string;
  title: string;
  lessons: ModuleLesson[];
}

export interface ModuleAccordionProps {
  /** Course modules, each collapsible to reveal its lessons. */
  modules: CourseModule[];
  /** `single` keeps one module open, `multiple` allows many (default single). */
  type?: 'single' | 'multiple';
  /** Module ids expanded on first render. */
  defaultOpenIds?: string[];
  /** Fires when a lesson row is pressed. */
  onLessonPress?: (moduleId: string, lessonId: string) => void;
  /** Copy shown when there are no modules. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * A course outline as collapsible modules (built on the primitive `Accordion`),
 * each expanding to its {@link LessonRow} list. The module header shows a lesson
 * count and completed tally. Renders an empty-state note when there are no
 * modules. Token-only colors.
 */
export function ModuleAccordion({
  modules,
  type = 'single',
  defaultOpenIds,
  onLessonPress,
  emptyLabel = 'No modules yet',
  style,
}: ModuleAccordionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (modules.length === 0) {
    return (
      <View
        accessibilityLabel={emptyLabel}
        style={[
          {
            padding: tokens.spacing.lg,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
          },
          style,
        ]}
      >
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
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {mod.title}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {done}/{mod.lessons.length} lessons
          </Text>
        </View>
      ),
      content: (
        <View style={{ gap: tokens.spacing.xs }}>
          {mod.lessons.length === 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No lessons</Text>
          ) : (
            mod.lessons.map((lesson, i) => (
              <LessonRow
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
