import { onBeforeUnmount, onMounted, ref } from "vue";

/**
 * Tracks whether an element is outside the viewport. Bind `el` as a template ref
 * and put `offscreen` on the element as `data-offscreen` — the home stylesheets
 * pause CSS animations inside `[data-offscreen]` (marquees/pings stop offscreen).
 *
 *   const { el, offscreen } = useOffscreen<HTMLElement>();
 *   <section ref="el" :data-offscreen="offscreen ? '' : undefined">
 *   (or `:ref="(e) => (el = e)"` / useTemplateRef when the name differs)
 */
export function useOffscreen<T extends Element>() {
  const el = ref<T | null>(null);
  const offscreen = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (!el.value || typeof IntersectionObserver === "undefined") return;
    observer = new IntersectionObserver(([entry]) => {
      offscreen.value = !entry?.isIntersecting;
    });
    observer.observe(el.value);
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { el, offscreen };
}
