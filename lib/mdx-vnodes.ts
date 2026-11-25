// Small helpers for MDX components that inspect their slot content
// (the Vue equivalent of React's Children / cloneElement tricks).
import { Comment, Fragment, Text, isVNode, type FunctionalComponent, type VNode, type VNodeArrayChildren } from "vue";

/** Flattens slot output into a flat list (drops null / booleans / comments, unwraps fragments). */
export function flattenNodes(nodes: unknown): Array<VNode | string> {
  const out: Array<VNode | string> = [];
  const walk = (node: unknown) => {
    if (node == null || typeof node === "boolean") return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (typeof node === "string" || typeof node === "number") {
      out.push(String(node));
      return;
    }
    if (isVNode(node)) {
      if (node.type === Comment) return;
      if (node.type === Fragment && Array.isArray(node.children)) {
        walk(node.children);
        return;
      }
      if (node.type === Text) {
        out.push(String(node.children ?? ""));
        return;
      }
      out.push(node);
    }
  };
  walk(nodes);
  return out;
}

/** Plain-text content of a vnode tree (used for the code copy button). */
export function textOf(node: unknown): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isVNode(node)) {
    const { children } = node;
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return textOf(children);
    // Component vnode: children are slots -> render the default slot.
    if (children && typeof children === "object" && "default" in children) {
      const slot = (children as { default?: unknown }).default;
      return typeof slot === "function" ? textOf((slot as () => unknown)()) : "";
    }
  }
  return "";
}

/** Renders an arbitrary list of vnodes / strings (lets a template output slot pieces). */
export const RenderNodes: FunctionalComponent<{ nodes: unknown }> = (props) =>
  props.nodes as VNodeArrayChildren;
RenderNodes.props = ["nodes"];
