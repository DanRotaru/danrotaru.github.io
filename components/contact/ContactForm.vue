<!--
  "Send a message" form, styled as a card in the site's UI language (matches the
  Cal.com booking view). Submits through `submitContact()` (form endpoint if
  configured, otherwise a pre-filled mailto:).
-->
<script setup lang="ts">
import { submitContact, validateContact, type ContactMessage } from "@/lib/contact";
import { site } from "@/lib/site";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; via: "endpoint" | "mailto" }
  | { state: "error"; message: string };

const MAX_MESSAGE = 2000;

const form = ref<ContactMessage>({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const status = ref<Status>({ state: "idle" });

function update<K extends keyof ContactMessage>(key: K, value: ContactMessage[K]) {
  form.value = { ...form.value, [key]: value };
  if (status.value.state === "error") status.value = { state: "idle" };
}

async function handleSubmit() {
  const invalid = validateContact(form.value);
  if (invalid) {
    status.value = { state: "error", message: invalid };
    return;
  }
  status.value = { state: "sending" };
  const result = await submitContact(form.value);
  if (result.ok) {
    status.value = { state: "sent", via: result.via };
    if (result.via === "endpoint") form.value = { ...form.value, message: "" };
  } else {
    status.value = { state: "error", message: result.error };
  }
}

const sending = computed(() => status.value.state === "sending");
const sentText = computed(() =>
  status.value.state === "sent" && status.value.via === "endpoint"
    ? "Your message is on its way. I read every one and usually reply within a couple of days."
    : `Your mail app should open with the message ready to send. If it doesn't, write to ${site.email}.`,
);

function inputValue(event: Event): string {
  return (event.target as HTMLInputElement | HTMLTextAreaElement).value;
}
</script>

<template>
  <div class="contact-form">
    <header class="contact-form__head">
      <span class="contact-form__badge">
        <IconChatTextDuotone class="contact-form__badge-icon" />
      </span>
      <div>
        <p class="contact-form__title">Send a message</p>
        <p class="contact-form__subtitle">Usually a reply within a couple of days.</p>
      </div>
    </header>

    <div v-if="status.state === 'sent'" class="contact-form__sent" role="status">
      <span class="contact-form__sent-icon">
        <IconCheckBold />
      </span>
      <p class="contact-form__title">Thank you!</p>
      <p class="contact-form__sent-text">{{ sentText }}</p>
      <button type="button" class="contact-form__again button button--secondary" @click="status = { state: 'idle' }">
        Write another
      </button>
    </div>

    <form v-else class="contact-form__body" @submit.prevent="handleSubmit">
      <div class="contact-form__row">
        <label class="contact-form__field">
          <span class="contact-form__label">Name <span class="contact-form__required" aria-hidden="true">*</span></span>
          <input
            class="contact-form__input"
            name="name"
            autocomplete="name"
            minlength="2"
            placeholder="Your name"
            :value="form.name"
            required
            @input="update('name', inputValue($event))"
          />
        </label>
        <label class="contact-form__field">
          <span class="contact-form__label">Email <span class="contact-form__required" aria-hidden="true">*</span></span>
          <input
            class="contact-form__input"
            type="email"
            name="email"
            autocomplete="email"
            placeholder="you@example.com"
            :value="form.email"
            required
            @input="update('email', inputValue($event))"
          />
        </label>
      </div>

      <label class="contact-form__field">
        <span class="contact-form__label">Subject <span class="contact-form__required" aria-hidden="true">*</span></span>
        <input
          class="contact-form__input"
          name="subject"
          placeholder="What's it about?"
          minlength="2"
          maxlength="120"
          :value="form.subject"
          required
          @input="update('subject', inputValue($event))"
        />
      </label>

      <label class="contact-form__field">
        <span class="contact-form__label-row">
          <span class="contact-form__label">Message <span class="contact-form__required" aria-hidden="true">*</span></span>
          <span class="contact-form__count">{{ form.message.length }} / {{ MAX_MESSAGE }}</span>
        </span>
        <textarea
          class="contact-form__input contact-form__textarea"
          name="message"
          placeholder="Tell me what you're working on…"
          :rows="6"
          minlength="10"
          :maxlength="MAX_MESSAGE"
          :value="form.message"
          required
          @input="update('message', inputValue($event))"
        />
      </label>

      <div class="contact-form__footer">
        <p
          :class="['contact-form__status', { 'contact-form__status--error': status.state === 'error' }]"
          aria-live="polite"
        >
          <template v-if="status.state === 'error'">{{ status.message }}</template>
        </p>
        <button type="submit" class="contact-form__submit button button--primary" :disabled="sending">
          <template v-if="sending">Sending…</template>
          <template v-else>
            Send message
            <IconArrowRight class="contact-form__submit-icon" />
          </template>
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@use "abstracts" as *;

.contact-form {
  display: flex;
  flex-direction: column;
  max-width: 768px;
  margin-inline: auto;
  overflow: hidden;
  // Same surface as the Cal.com booker in the "Book a call" tab.
  --form-card-bg: #fff;
  --form-card-border: #e5e5e5;
  border: 1px solid var(--form-card-border);
  border-radius: var(--radius);
  background-color: var(--form-card-bg);

  @include dark {
    --form-card-bg: #171717;
    --form-card-border: #262626;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px;
    border-bottom: 1px solid var(--form-card-border);

    @include mq(sm) {
      padding-inline: 32px;
    }
  }

  &__badge {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
    border-radius: var(--radius);
    background-image: linear-gradient(180deg, var(--chip-top), var(--chip-bottom));
    color: var(--color-foreground);
  }

  &__badge-icon {
    width: 18px;
    height: 18px;
  }

  &__title {
    font-family: var(--font-sans);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--color-foreground);
  }

  &__subtitle {
    font-family: var(--font-sans);
    font-size: 13px;
    line-height: 1.4;
    color: var(--color-muted-foreground);
  }

  &__body,
  &__sent {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;

    @include mq(sm) {
      padding: 32px;
    }
  }

  &__row {
    display: grid;
    gap: 20px;

    @include mq(sm) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
  }

  &__label-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
  }

  &__label {
    padding: 0;
    font-family: var(--font-sans);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    color: var(--color-foreground);
  }

  &__required {
    color: var(--color-destructive);
  }

  &__count {
    font-family: var(--font-sans);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    color: var(--color-muted-foreground);
  }

  &__input {
    width: 100%;
    height: 40px;
    padding: 0 14px;
    border: 1px solid color-mix(in oklab, var(--color-foreground) 12%, transparent);
    border-radius: var(--radius);
    background-color: transparent;
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-foreground);
    outline: none;
    transition:
      border-color var(--duration-default) var(--ease-default),
      box-shadow var(--duration-default) var(--ease-default);

    @include dark {
      background-color: color-mix(in oklab, var(--color-foreground) 4%, transparent);
    }

    &::placeholder {
      color: color-mix(in oklab, var(--color-muted-foreground) 70%, transparent);
    }

    @include hover {
      border-color: color-mix(in oklab, var(--color-foreground) 22%, transparent);
    }

    &:focus-visible {
      border-color: var(--color-foreground);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-ring) 35%, transparent);
    }
  }

  &__textarea {
    height: auto;
    min-height: 144px;
    padding-block: 10px;
    resize: vertical;
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 20px;
    border-top: 1px solid var(--form-card-border);
  }

  &__status {
    font-family: var(--font-sans);
    font-size: 13px;
    color: var(--color-muted-foreground);

    &--error {
      color: var(--color-destructive);
    }
  }

  &__submit {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    margin-left: auto;
    padding-inline: 20px;
    font-family: var(--font-sans);
    font-size: 14px;
  }

  &__submit-icon {
    width: 14px;
    height: 14px;
  }

  &__sent {
    align-items: center;
    padding-block: 56px;
    text-align: center;
  }

  &__sent-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-color: color-mix(in oklab, oklch(69.6% 0.17 162.48) 15%, transparent);
    color: oklch(69.6% 0.17 162.48);

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__sent-text {
    max-width: 448px;
    font-family: var(--font-sans);
    font-size: 15px;
    line-height: 1.625;
    color: var(--color-muted-foreground);
  }

  &__again {
    height: 40px;
    margin-top: 8px;
    padding-inline: 20px;
    font-family: var(--font-sans);
    font-size: 14px;
  }
}
</style>
