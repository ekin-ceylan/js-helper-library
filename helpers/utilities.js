/**
 * Combines class names conditionally.
 * Accepts any number of arguments, which can be strings or objects.
 * - Strings are always included.
 * - Objects include keys with truthy values.
 *
 * @param {...(string|Object<string, boolean>)} args - Class names as strings or objects.
 * @returns {string} A space-separated string of class names.
 *
 * @example
 * classMap('foo', { bar: true, baz: false }) // "foo bar"
 */
export function classMap(...args) {
    return args
        .flatMap(arg =>
            typeof arg === 'string'
                ? [arg]
                : Object.entries(arg).filter(([_, val]) => val).map(([key]) => key)
        )
        .join(' ');
}
