// JSX runtime used by compiled MDX (see `mdx()` in nuxt.config.ts).
// Same as `vue/jsx-runtime`, but children of components are passed as a
// default slot function, which is what Vue components expect.
import { Fragment, h, type VNode } from "vue";

type Props = Record<string, unknown> & { children?: unknown };

export function jsx(type: unknown, props: Props, key?: string | number): VNode {
  const { children, ...rest } = props;
  if (key !== undefined) rest.key = key;
  const isElement = typeof type === "string" || type === Fragment;
  if (isElement || children === undefined) {
    return h(type as string, rest, children as never);
  }
  return h(type as string, rest, { default: () => children });
}

export { Fragment, jsx as jsxs, jsx as jsxDEV };
