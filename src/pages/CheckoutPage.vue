<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader />

    <main class="flex-grow flex items-center justify-center">
      <form
        @submit.prevent="submit"
        class="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 class="text-xl font-semibold mb-6 text-center">
          Get your Car Insurance for $9.99
        </h2>

        <div class="space-y-4">
          <div>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Full Name"
              :class="['input', { 'border-red-500': v$.fullName.$error }]"
            />
            <div v-if="v$.fullName.$error" class="text-red-500 text-sm mt-1">
              {{ v$.fullName.$errors[0].$message }}
            </div>
          </div>

          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              :class="['input', { 'border-red-500': v$.email.$error }]"
            />
            <div v-if="v$.email.$error" class="text-red-500 text-sm mt-1">
              {{ v$.email.$errors[0].$message }}
            </div>
          </div>

          <div>
            <input
              v-model="form.zip"
              type="text"
              placeholder="Zip Code"
              :class="['input', { 'border-red-500': v$.zip.$error }]"
            />
            <div v-if="v$.zip.$error" class="text-red-500 text-sm mt-1">
              {{ v$.zip.$errors[0].$message }}
            </div>
          </div>

          <div class="flex gap-2">
            <div class="flex-1">
              <select
                v-model="form.birthMonth"
                :class="['input', { 'border-red-500': v$.birthMonth.$error }]"
              >
                <option disabled value="">Month</option>
                <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
              </select>
              <div
                v-if="v$.birthMonth.$error"
                class="text-red-500 text-xs mt-1"
              >
                Required
              </div>
            </div>
            <div class="flex-1">
              <select
                v-model="form.birthDay"
                :class="['input', { 'border-red-500': v$.birthDay.$error }]"
              >
                <option disabled value="">Day</option>
                <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
              </select>
              <div v-if="v$.birthDay.$error" class="text-red-500 text-xs mt-1">
                Required
              </div>
            </div>
            <div class="flex-1">
              <select
                v-model="form.birthYear"
                :class="['input', { 'border-red-500': v$.birthYear.$error }]"
              >
                <option disabled value="">Year</option>
                <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
              </select>
              <div v-if="v$.birthYear.$error" class="text-red-500 text-xs mt-1">
                Required
              </div>
            </div>
          </div>

          <div>
            <div class="flex gap-4">
              <label class="flex items-center gap-1">
                <input v-model="form.gender" type="radio" value="female" />
                Female
              </label>
              <label class="flex items-center gap-1">
                <input v-model="form.gender" type="radio" value="male" />
                Male
              </label>
            </div>
            <div v-if="v$.gender.$error" class="text-red-500 text-sm mt-1">
              Please select your gender
            </div>
          </div>

          <div>
            <input
              v-model="form.cardHolder"
              type="text"
              placeholder="Card Holder Name"
              :class="['input', { 'border-red-500': v$.cardHolder.$error }]"
            />
            <div v-if="v$.cardHolder.$error" class="text-red-500 text-sm mt-1">
              {{ v$.cardHolder.$errors[0].$message }}
            </div>
          </div>

          <div>
            <input
              v-model="form.cardNumber"
              type="text"
              placeholder="Card Number"
              :class="['input', { 'border-red-500': v$.cardNumber.$error }]"
            />
            <div v-if="v$.cardNumber.$error" class="text-red-500 text-sm mt-1">
              {{ v$.cardNumber.$errors[0].$message }}
            </div>
          </div>

          <div class="flex gap-2">
            <div class="flex-1">
              <input
                v-model="form.expiry"
                type="text"
                placeholder="MM/YY"
                :class="['input', { 'border-red-500': v$.expiry.$error }]"
              />
              <div v-if="v$.expiry.$error" class="text-red-500 text-xs mt-1">
                {{ v$.expiry.$errors[0].$message }}
              </div>
            </div>
            <div class="flex-1">
              <input
                v-model="form.cvv"
                type="text"
                placeholder="CVV"
                :class="['input', { 'border-red-500': v$.cvv.$error }]"
              />
              <div v-if="v$.cvv.$error" class="text-red-500 text-xs mt-1">
                {{ v$.cvv.$errors[0].$message }}
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

const form = reactive({
  fullName: '',
  email: '',
  zip: '',
  birthMonth: '',
  birthDay: '',
  birthYear: '',
  gender: '',
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});

// Custom validators
const isValidCardNumber = helpers.withMessage(
  'Card number must be 16 digits',
  (value: string) => !value || /^\d{16}$/.test(value.replace(/\s/g, ''))
);

const isValidExpiry = helpers.withMessage(
  'Expiry must be in MM/YY format',
  (value: string) => !value || /^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
);

const isValidCVV = helpers.withMessage(
  'CVV must be 3 digits',
  (value: string) => !value || /^\d{3}$/.test(value)
);

const isValidZip = helpers.withMessage(
  'Zip code must be 5 digits',
  (value: string) => !value || /^\d{5}$/.test(value)
);

// Validation rules
const rules = {
  fullName: { required, minLength: minLength(2) },
  email: { required, email },
  zip: { required, isValidZip },
  birthMonth: { required },
  birthDay: { required },
  birthYear: { required },
  gender: { required },
  cardHolder: { required, minLength: minLength(2) },
  cardNumber: { required, isValidCardNumber },
  expiry: { required, isValidExpiry },
  cvv: { required, isValidCVV },
};

const v$ = useVuelidate(rules, form);

const years = computed(() => {
  const current = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => current - i);
});

async function submit() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    alert('Please fix the errors before submitting');
    return;
  }
  alert('Form submitted successfully!');
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300;
}
</style>
