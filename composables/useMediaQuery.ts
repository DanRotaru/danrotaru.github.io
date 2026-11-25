import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/** `true` once mounted on the client (false during SSR / hydration). */
export function useIsClient(): Ref<boolean> {
  const isClient = ref(false);
  onMounted(() => {
    isClient.value = true;
  });
  return isClient;
}

/** Live `window.matchMedia(query).matches` (false on the server and before mount). */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);
  let mql: MediaQueryList | undefined;
  const update = () => {
    matches.value = mql?.matches ?? false;
  };

  onMounted(() => {
    mql = window.matchMedia(query);
    update();
    mql.addEventListener("change", update);
  });

  onBeforeUnmount(() => mql?.removeEventListener("change", update));

  return matches;
}
