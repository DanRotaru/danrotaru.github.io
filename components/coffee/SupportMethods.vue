<!-- Alternative support methods (crypto, Wise, MIA) with copy-to-clipboard fields. Data: lib/support.ts -->
<script setup lang="ts">
import { supportMethods } from "@/lib/support";

const isDev = import.meta.dev;

// In production, drop empty fields and methods with nothing to show.
const methods = computed(() =>
  supportMethods
    .map((method) => ({
      ...method,
      fields: isDev ? method.fields : method.fields.filter((field) => field.value.trim()),
    }))
    .filter((method) => method.fields.some((field) => field.value.trim()) || method.link || isDev),
);

const copiedKey = ref<string | null>(null);
let timer: number | undefined;

async function copy(key: string, value: string) {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
    copiedKey.value = key;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (copiedKey.value = null), 2500);
  } catch {
    // Clipboard blocked: value stays selectable in the UI.
  }
}

onBeforeUnmount(() => window.clearTimeout(timer));
</script>

<template>
  <section v-if="methods.length" class="support-methods" aria-labelledby="support-methods-title">
    <h2 id="support-methods-title" class="support-methods__title">More ways to support</h2>
    <p class="support-methods__subtitle">Prefer something other than a card? Any of these works too.</p>

    <ul class="support-methods__grid">
      <li v-for="method in methods" :key="method.id" class="support-methods__card" :data-method="method.id">
        <h3 class="support-methods__name">{{ method.title }}</h3>
        <p class="support-methods__desc">{{ method.description }}</p>

        <div v-if="method.fields.length" class="support-methods__fields">
          <button
            v-for="field in method.fields"
            :key="field.label"
            type="button"
            class="support-methods__field"
            :disabled="!field.value"
            @click="copy(`${method.id}:${field.label}`, field.value)"
          >
            <span class="support-methods__field-text">
              <span class="support-methods__label">{{ field.label }}</span>
              <span
                :class="[
                  'support-methods__value',
                  { 'support-methods__value--mono': field.mono, 'support-methods__value--empty': !field.value },
                ]"
              >
                {{ field.value || "Add in lib/support.ts" }}
              </span>
            </span>
            <span
              v-if="field.value"
              aria-live="polite"
              :class="[
                'support-methods__status',
                { 'support-methods__status--copied': copiedKey === `${method.id}:${field.label}` },
              ]"
            >
              <template v-if="copiedKey === `${method.id}:${field.label}`">
                <IconCheckBold class="support-methods__icon" /> Copied
              </template>
              <template v-else><IconCopy class="support-methods__icon" /> Copy</template>
            </span>
          </button>
        </div>

        <a
          v-if="method.link?.logo"
          class="support-methods__pay-button"
          :href="method.link.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="method.link.label"
        >
          <img class="support-methods__pay-logo" :src="method.link.logo" alt="" aria-hidden="true" />
          <IconArrowUpRightSmall class="support-methods__icon" />
        </a>
        <a
          v-else-if="method.link?.brand === 'wise'"
          class="support-methods__wise-button"
          :href="method.link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ method.link.label }} <IconArrowUpRightSmall class="support-methods__icon" />
        </a>
        <a
          v-else-if="method.link"
          class="support-methods__link"
          :href="method.link.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ method.link.label }} <IconArrowUpRightSmall class="support-methods__icon" />
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@use "abstracts" as *;

.support-methods {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: calc(896px + 40px); // +20px per card (2 columns)

  &__title {
    @include heading-serif(28px);
    font-size: 28px;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: 15px;
    color: var(--color-muted-foreground);
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
    margin-top: 24px;
    padding: 0;
    list-style: none;

    @include mq(md) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    text-align: left;
    border: 1px solid var(--color-border);
    border-radius: 16px;
    background-color: color-mix(in oklab, var(--color-foreground) 2%, transparent);

    &[data-method="crypto"] {
      @include mq(md) {
        grid-row: span 2;
      }
    }
  }

  &__name {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-foreground);
  }

  &__desc {
    margin-top: -8px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--color-muted-foreground);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
    border-radius: var(--radius);
    background-color: color-mix(in oklab, var(--color-foreground) 2%, transparent);
    text-align: left;
    cursor: pointer;
    transition: all var(--duration-default) var(--ease-default);

    &:disabled {
      cursor: default;
      border-style: dashed;
    }

    &:not(:disabled) {
      @include hover {
        border-color: color-mix(in oklab, var(--color-foreground) 20%, transparent);
        background-color: color-mix(in oklab, var(--color-foreground) 4%, transparent);
      }
    }

    @include focus-ring;
  }

  &__field-text {
    min-width: 0;
  }

  &__label {
    display: block;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--color-muted-foreground);
  }

  &__value {
    display: block;
    font-size: 14px;
    line-height: 1.42857;
    overflow-wrap: anywhere;
    user-select: all;
    color: var(--color-foreground);

    &--mono {
      font-family: var(--font-mono);
      font-size: 13px;
    }

    &--empty {
      font-style: italic;
      user-select: none;
      color: var(--color-muted-foreground);
    }
  }

  &__status {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    line-height: 1.33333;
    color: var(--color-muted-foreground);
    transition: color var(--duration-default) var(--ease-default);

    @include parent-hover(".support-methods__field") {
      color: var(--color-foreground);
    }

    &--copied,
    &--copied:is(.support-methods__field:hover *) {
      color: oklch(69.6% 0.17 162.48);
    }
  }

  &__icon {
    width: 14px;
    height: 14px;
  }

  &__pay-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    align-self: flex-start;
    padding: 8px 12px;
    font-size: 14px;
    color: #142429;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #e5e7eb;
    border-radius: var(--radius);
    transition:
      box-shadow var(--duration-default) var(--ease-default),
      border-color var(--duration-default) var(--ease-default);

    @include hover {
      border-color: #142429;
      box-shadow: 0 2px 8px rgb(0 0 0 / 0.08);
    }

    @include focus-ring;
  }

  &__pay-logo {
    display: block;
    width: auto;
    height: 24px;
  }

  // Arrow nudges up-right on hover of the branded pay buttons.
  &__pay-button &__icon,
  &__wise-button &__icon {
    transition: transform var(--duration-default) var(--ease-default);
  }

  &__pay-button:hover &__icon,
  &__wise-button:hover &__icon,
  &__pay-button:focus-visible &__icon,
  &__wise-button:focus-visible &__icon {
    transform: translate(2px, -2px);
  }

  // Wise brand colours: bright green pill with forest-green text.
  &__wise-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 10px 20px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.2;
    color: #163300;
    text-decoration: none;
    background-color: #9fe870;
    border-radius: 9999px;
    transition: background-color var(--duration-default) var(--ease-default);

    @include hover {
      background-color: #80e142;
    }

    @include focus-ring;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    align-self: flex-start;
    font-size: 14px;
    color: var(--color-foreground);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
}
</style>
