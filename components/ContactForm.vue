<script setup lang="ts">
interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;

  state: 'idle' | 'loading' | 'success' | 'error';
}

const form: FormFields = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  state: 'idle'
})

const submitForm = async () => {
  try {
    form.state = 'loading';

    const params = new URLSearchParams({
      Name: form.name,
      Message: form.message,
      Subject: form.subject,
      Email: form.email
    });

    const response = await fetch('https://hook.eu1.make.com/0o6m7z8fjwgai4u9orrg5ayy8cnvpn6i', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();
    form.state = data === 'Accepted' ? 'success' : 'error';
  } catch (error) {
    console.error('Request failed:', error);
    form.state = 'error';
  }
}

</script>

<template>
  <form class="contact-form" @submit.prevent="submitForm">
    <h2 class="contact-form__title">Contact Me</h2>
    <p class="contact-form__description">
      Want to get in touch?
      Please fill out the form below, and I’ll respond as soon as possible. I look forward to connecting with you!
    </p>

    <div
      class="contact-form-message"
      :class="{'contact-form-message--success': form.state === 'success', 'contact-form-message--error': form.state === 'error'}"
      v-if="form.state === 'error' || form.state === 'success'">

      <p v-if="form.state === 'success'">Your message has been successfully sent!</p>
      <p v-else>Oops! Something went wrong. Please try again later.</p>
    </div>

    <template v-else>
      <div class="row">
        <div class="field">
          <label for="contact-name">Your Name</label>
          <input v-model="form.name" id="contact-name" type="text" placeholder="Enter your name" required/>
        </div>

        <div class="field">
          <label for="contact-email">Your Email</label>
          <input v-model="form.email" id="contact-email" type="email" placeholder="Enter your email" required/>
        </div>
      </div>

      <div class="field">
        <label for="contact-subject">Subject</label>
        <input v-model="form.subject" id="contact-subject" type="text" placeholder="Enter subject" required/>
      </div>

      <div class="field">
        <label for="contact-message">Message</label>
        <textarea v-model="form.message" id="contact-message" rows="4" placeholder="Type your message here..." required></textarea>
      </div>

      <div>
        <button type="submit" class="submit" :disabled="form.state === 'loading'">{{ form.state === 'loading' ? 'Submitting...' : 'Submit' }}</button>
      </div>
    </template>
  </form>
</template>

<style lang="scss">
.contact-form {
  max-width: 550px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  background-color: rgba(255 255 255 / 10%);
  border: 1px solid rgba(255 255 255 / 10%);

  @media (max-width: 500px) {
    margin: 10px auto;
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 1.3;
  }

  &__description {
    margin: -8px 0 0;
    font-size: 15px;
    line-height: 1.3;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 15px;
  }

  input,
  textarea {
    width: 100%;
    height: 36px;
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    padding: 0 10px;
    border: 0;
    border-radius: 8px;
    outline: none;
    background-color: rgb(255 255 255 / 10%);
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px 0, rgba(61, 59, 53, 0.16) 0 0 0 1px, rgba(61, 59, 53, 0.08) 0 2px 5px 0;
    transition: .2s ease box-shadow;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.12) 0 1px 1px 0, rgba(61, 59, 53, 0.16) 0 0 0 1px, rgba(61, 59, 53, 0.08) 0 3px 9px 0, rgba(61, 59, 53, 0.08) 0 2px 5px 0;
    }

    &:focus {
      box-shadow: rgb(144 131 247 / 36%) 0 0 0 4px, rgba(61, 59, 53, 0.16) 0 0 0 1px;
    }
  }

  textarea {
    height: auto;
    resize: vertical;
    min-height: 96px;
    padding: 10px;
  }

  .submit {
    position: relative;
    cursor: pointer;
    font: inherit;
    font-weight: 600;
    font-size: 15px;
    transition: background-color 100ms ease-in-out, border-color 100ms ease-in-out, outline 100ms ease-in-out;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: none;
    height: 36px;

    border-radius: 8px;
    padding: 0 12px;
    gap: 8px;
    background-color: #4A448A;
    color: #fff;

    &:after {
      content: '';
      display: block;
      width: 18px;
      height: 18px;
      background-size: 100%;
      background-image: url("data:image/svg+xml,%3Csvg data-v-5d0f7a00='' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true'%3E%3Cpath data-v-5d0f7a00='' d='M5 12h14'/%3E%3Cpath data-v-5d0f7a00='' d='m12 5 7 7-7 7'/%3E%3C/svg%3E");
    }

    &:hover {
      background-color: #59539e
    }

    &[disabled] {
      opacity: .8;
      cursor: default;

      &:after {
        content: unset;
      }
    }
  }

  .row {
    display: flex;
    gap: 15px;

    @media (max-width: 500px) {
      flex-wrap: wrap;
    }

    .field {
      width: 100%;
    }
  }
}
</style>

