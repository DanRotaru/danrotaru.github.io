<script setup lang="ts">
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** The email address as a button that copies it, with a "copied" state. */
const props = defineProps<{ email: string }>();

const copied = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;

watch(copied, (value) => {
  clearTimeout(timer);
  if (!value) return;
  timer = setTimeout(() => (copied.value = false), 2500);
});

onBeforeUnmount(() => clearTimeout(timer));

async function onClick() {
  if (await copyText(props.email)) copied.value = true;
}
</script>

<template>
  <button class="site-footer__email" type="button" @click="onClick">
    {{ email
    }}<span aria-live="polite" :class="['site-footer__email-icon', { 'site-footer__email-icon--copied': copied }]">
      <IconCheckBold v-if="copied" aria-hidden="true" class="site-footer__email-svg" />
      <IconCopy v-else aria-hidden="true" class="site-footer__email-svg" />
      <span class="visually-hidden">{{ copied ? "Copied" : "Copy email" }}</span>
    </span>
  </button>
</template>
