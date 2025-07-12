<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col gap-9 pb-[34px] font-helvetica"
  >
    <AppHeader />

    <main class="flex-grow flex items-center justify-center">
      <form
        @submit.prevent="submit"
        class="bg-white p-10 rounded w-full max-w-[408px]"
      >
        <h2 class="text-xl font-bold mb-6 text-center">
          Get your Car Insurance for $9.99
        </h2>

        <div class="grid grid-cols-1 gap-5">
          <FormField
            label="Full Name"
            :error="
              v$.fullName.$error
                ? String(v$.fullName.$errors[0].$message)
                : undefined
            "
          >
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Full Name"
              :class="['input', { 'border-red-500': v$.fullName.$error }]"
            />
          </FormField>

          <FormField
            label="Email"
            :error="
              v$.email.$error ? String(v$.email.$errors[0].$message) : undefined
            "
          >
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              :class="['input', { 'border-red-500': v$.email.$error }]"
            />
          </FormField>

          <FormField
            label="Zip Code"
            :error="
              v$.zip.$error ? String(v$.zip.$errors[0].$message) : undefined
            "
          >
            <input
              v-model="form.zip"
              type="text"
              placeholder="Zip Code"
              :class="['input', { 'border-red-500': v$.zip.$error }]"
            />
          </FormField>

          <FormField label="Date of Birth" :error="birthDateError">
            <div class="flex gap-2">
              <div class="flex-1">
                <select
                  v-model="form.birthMonth"
                  :class="['input', { 'border-red-500': v$.birthMonth.$error }]"
                >
                  <option disabled value="">Month</option>
                  <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div class="flex-1">
                <select
                  v-model="form.birthDay"
                  :class="['input', { 'border-red-500': v$.birthDay.$error }]"
                >
                  <option disabled value="">Day</option>
                  <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
                </select>
              </div>
              <div class="flex-1">
                <select
                  v-model="form.birthYear"
                  :class="['input', { 'border-red-500': v$.birthYear.$error }]"
                >
                  <option disabled value="">Year</option>
                  <option v-for="y in years" :key="y" :value="y">
                    {{ y }}
                  </option>
                </select>
              </div>
            </div>
          </FormField>

          <FormField
            label="Gender"
            :error="v$.gender.$error ? 'Please select your gender' : undefined"
          >
            <div class="grid grid-cols-2 gap-3">
              <label
                class="flex relative grow items-center justify-start gap-2 px-6 py-2 border rounded cursor-pointer transition-all text-sm font-medium focus:outline-none h-[43px]"
                :class="{
                  'bg-[#2888E0] text-white border-[#2888E0]':
                    form.gender === 'female',
                  'text-gray-900 bg-white border-[#D8D6D6]':
                    form.gender !== 'female',
                }"
              >
                <span
                  class="w-4 h-4 rounded-full border-4 flex items-center justify-center peer-checked:bg-white border-white shadow-custom-glow peer-checked:shadow-glow-soft transition-all"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-[#2888E0] peer-checked:block hidden"
                  ></span>
                </span>
                <input
                  v-model="form.gender"
                  type="radio"
                  value="female"
                  class="sr-only peer"
                />
                <span class="text-[#2F2F30] peer-checked:text-white font-normal"
                  >Female</span
                >
              </label>

              <label
                class="flex relative grow items-center justify-start gap-2 px-6 py-2 border rounded cursor-pointer transition-all text-sm font-medium focus:outline-none h-[43px]"
                :class="{
                  'bg-[#2888E0] text-white border-[#2888E0]':
                    form.gender === 'male',
                  'text-gray-900 bg-white border-[#D8D6D6]':
                    form.gender !== 'male',
                }"
              >
                <span
                  class="w-4 h-4 rounded-full border-4 flex items-center justify-center peer-checked:bg-white border-white shadow-custom-glow peer-checked:shadow-glow-soft transition-all"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-[#2888E0] peer-checked:block hidden"
                  ></span>
                </span>
                <input
                  v-model="form.gender"
                  type="radio"
                  value="male"
                  class="sr-only peer"
                />
                <span class="text-[#2F2F30] peer-checked:text-white font-normal"
                  >Male</span
                >
              </label>
            </div>
          </FormField>

          <div
            class="border pt-4 px-6 pb-6 bg-[#FAFAFA] rounded grid grid-cols-1 gap-3"
          >
            <FormField
              label="Card Holder Name"
              :error="
                v$.cardHolder.$error
                  ? String(v$.cardHolder.$errors[0].$message)
                  : undefined
              "
            >
              <input
                v-model="form.cardHolder"
                type="text"
                placeholder="Card Holder Name"
                :class="['input', { 'border-red-500': v$.cardHolder.$error }]"
              />
            </FormField>

            <FormField
              label="Card Number"
              :error="
                v$.cardNumber.$error
                  ? String(v$.cardNumber.$errors[0].$message)
                  : undefined
              "
            >
              <input
                v-model="form.cardNumber"
                type="text"
                placeholder="Card Number"
                :class="['input', { 'border-red-500': v$.cardNumber.$error }]"
              />
            </FormField>

            <div class="flex gap-2">
              <FormField
                label="Expiry Date"
                :error="
                  v$.expiry.$error
                    ? String(v$.expiry.$errors[0].$message)
                    : undefined
                "
              >
                <input
                  v-model="form.expiry"
                  type="text"
                  placeholder="MM/YY"
                  :class="['input', { 'border-red-500': v$.expiry.$error }]"
                />
              </FormField>
              <FormField
                label="CVV"
                :error="
                  v$.cvv.$error ? String(v$.cvv.$errors[0].$message) : undefined
                "
              >
                <input
                  v-model="form.cvv"
                  type="text"
                  placeholder="CVV"
                  :class="['input', { 'border-red-500': v$.cvv.$error }]"
                />
              </FormField>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-[#22C55E] text-white py-2 rounded hover:bg-green-600 h-[50px]"
          >
            <span class="text-[18px] font-semibold">CONTINUE</span>
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
import FormField from '@/components/FormField.vue';

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

const birthDateError = computed(() => {
  if (
    v$.value.birthMonth.$error ||
    v$.value.birthDay.$error ||
    v$.value.birthYear.$error
  ) {
    return 'Please select a complete date of birth';
  }
  return undefined;
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
