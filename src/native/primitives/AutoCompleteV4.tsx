import * as React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { AutoCompleteOption, AutoCompleteProps } from './AutoComplete';
import { fieldSkin, pressFill, popoverSkin, ringWrap, tapTarget } from './internal/picker-v4';

export type { AutoCompleteProps as AutoCompleteV4Props, AutoCompleteOption };

/**
 * Split a label around the first case-insensitive occurrence of `query`.
 * Returns `[before, match, after]`, with `match` empty when there is no hit.
 */
function splitMatch(label: string, query: string): [string, string, string] {
  const q = query.trim();
  if (!q) return [label, '', ''];
  const at = label.toLowerCase().indexOf(q.toLowerCase());
  if (at < 0) return [label, '', ''];
  return [label.slice(0, at), label.slice(at, at + q.length), label.slice(at + q.length)];
}

/**
 * **V4 autocomplete** — the same props as {@link AutoComplete}, a different
 * design line.
 *
 * ## Three things that make a suggestion list feel confident
 *
 * 1. **Rows at `tapTarget()`.** The base row is `md` vertical padding around a
 *    line of text: comfortably tappable in isolation, and the row above it is a
 *    different search result. In a list where every neighbour is a wrong
 *    answer, the floor matters more than anywhere else in the kit.
 * 2. **The match, marked.** The part of each label that matched what you typed
 *    is bolded. That is not decoration: it is the answer to "why is this in the
 *    list", and it lets the eye confirm a row without reading it (§33 —
 *    optimise for scanning). §32 asks for recognition over recall, and a
 *    highlighted substring is recognition made visible.
 * 3. **A list that says when it is empty.** The base hides itself when nothing
 *    matches, which is indistinguishable from being broken. V4 keeps the panel
 *    and says so, quoting the query back (§37 — make system status visible;
 *    §15 — an empty state should tell the user where they are).
 *
 * ## The field and the panel
 *
 * The field is `InputV4`'s: `2xl` minimum height, `md` radius, and the brand
 * halo with its space reserved so focusing never nudges the page (§36.11). The
 * panel below it floats on `elevation.card` with its hairline kept, and takes
 * glass only when the seed asked for `depth: 'glass'` — `flatten()` neutralises
 * gradients and elevation and stops there, so elevation needs no depth check
 * and glass does.
 *
 * A pressed row is filled with `pressFill`, an opaque mix against the panel's
 * own surface rather than `colors.border`, so the feedback is a wash rather
 * than a slab.
 */
export function AutoCompleteV4({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Type to search…',
  maxResults = 6,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Autocomplete',
  style,
}: AutoCompleteProps): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const [focused, setFocused] = React.useState(false);

  const query = value.trim();
  const matches = React.useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
  }, [options, query, maxResults]);

  // The panel opens as soon as there is something to say — including that
  // there is nothing to say.
  const showPanel = focused && query.length > 0;
  const target = tapTarget(theme);
  const press = pressFill(theme);

  const choose = (opt: AutoCompleteOption): void => {
    onChange?.(opt.label);
    onSelect?.(opt);
    setFocused(false);
  };

  return (
    <View style={[{ width: '100%' }, style]}>
      <View style={ringWrap(theme, { focused, invalid })}>
        <View style={fieldSkin(theme, { focused, invalid, disabled })}>
          <TextInput
            editable={!disabled}
            accessibilityLabel={accessibilityLabel}
            accessibilityState={{ disabled, expanded: showPanel }}
            value={value}
            onChangeText={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            placeholderTextColor={colors.mutedText}
            autoCorrect={false}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontFamily: tokens.typography.fontBody,
              fontSize: tokens.typography.scale.base,
              padding: 0,
            }}
          />
        </View>
      </View>

      {showPanel ? (
        <View
          accessibilityLabel="Suggestions"
          style={[
            popoverSkin(theme, 'card'),
            { marginTop: tokens.spacing.xs, overflow: 'hidden' },
          ]}
        >
          {matches.length === 0 ? (
            <Text
              accessibilityLiveRegion="polite"
              style={{
                color: colors.mutedText,
                fontFamily: tokens.typography.fontBody,
                fontSize: tokens.typography.scale.sm,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
              }}
            >
              {`No matches for “${query}”`}
            </Text>
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: target * 5 }}>
              {matches.map((opt) => {
                const [before, hit, after] = splitMatch(opt.label, query);
                return (
                  <Pressable
                    key={opt.value}
                    accessibilityRole="menuitem"
                    accessibilityLabel={opt.label}
                    onPress={() => choose(opt)}
                    style={({ pressed }) => ({
                      minHeight: target,
                      justifyContent: 'center',
                      paddingHorizontal: tokens.spacing.md,
                      backgroundColor: pressed ? press : 'transparent',
                    })}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: colors.onSurface,
                        fontFamily: tokens.typography.fontBody,
                        fontSize: tokens.typography.scale.base,
                      }}
                    >
                      {before}
                      {/* The reason this row is here, made visible. */}
                      <Text style={{ fontWeight: '700' }}>{hit}</Text>
                      {after}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          )}
        </View>
      ) : null}
    </View>
  );
}
