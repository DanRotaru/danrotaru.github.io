<!-- Email row of the links contact card (copies the address). Styled by LinksContactCard. -->
<script setup lang="ts">
const props = defineProps<{ email: string }>();

const copied = ref(false);

watch(copied, (value, _old, onCleanup) => {
  if (!value) return;
  const timer = window.setTimeout(() => {
    copied.value = false;
  }, 2000);
  onCleanup(() => window.clearTimeout(timer));
});

async function handleClick() {
  try {
    await navigator.clipboard.writeText(props.email);
    copied.value = true;
  } catch {
    window.location.href = `mailto:${props.email}`;
  }
}
</script>

<template>
  <button type="button" :aria-label="`Copy ${email}`" class="links-contact-card__row" @click="handleClick">
    <span class="links-contact-card__chip">
      <IconEnvelopeSimpleDuotone class="links-contact-card__chip-icon" />
    </span>
    <span class="links-contact-card__text">
      <span class="links-contact-card__label">{{ copied ? "Copied" : "Email" }}</span>
      <span class="links-contact-card__value">{{ email }}</span>
    </span>
    <IconCheckBold v-if="copied" class="links-contact-card__trail links-contact-card__trail--done" />
    <IconCopySimple v-else class="links-contact-card__trail" />
  </button>
</template>
