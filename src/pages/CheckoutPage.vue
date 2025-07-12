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
                class="flex relative grow items-center justify-start gap-2 px-6 py-2 border rounded cursor-pointer transition-all duration-300 text-sm font-medium focus:outline-none h-[43px] transform hover:scale-105"
                :class="{
                  'bg-[#2888E0] text-white border-[#2888E0] shadow-lg':
                    form.gender === 'female',
                  'text-gray-900 bg-white border-[#D8D6D6] hover:border-[#2888E0]':
                    form.gender !== 'female',
                }"
              >
                <span
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  :class="{
                    'border-white bg-white': form.gender === 'female',
                    'border-gray-400': form.gender !== 'female',
                  }"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-[#2888E0] transition-all duration-300"
                    :class="{
                      'opacity-100 scale-100': form.gender === 'female',
                      'opacity-0 scale-0': form.gender !== 'female',
                    }"
                  ></span>
                </span>
                <input
                  v-model="form.gender"
                  type="radio"
                  value="female"
                  class="sr-only"
                />
                <span
                  class="transition-all duration-300"
                  :class="{
                    'text-white': form.gender === 'female',
                    'text-[#2F2F30]': form.gender !== 'female',
                  }"
                  >Female</span
                >
              </label>

              <label
                class="flex relative grow items-center justify-start gap-2 px-6 py-2 border rounded cursor-pointer transition-all duration-300 text-sm font-medium focus:outline-none h-[43px] transform hover:scale-105"
                :class="{
                  'bg-[#2888E0] text-white border-[#2888E0] shadow-lg':
                    form.gender === 'male',
                  'text-gray-900 bg-white border-[#D8D6D6] hover:border-[#2888E0]':
                    form.gender !== 'male',
                }"
              >
                <span
                  class="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300"
                  :class="{
                    'border-white bg-white': form.gender === 'male',
                    'border-gray-400': form.gender !== 'male',
                  }"
                >
                  <span
                    class="w-2 h-2 rounded-full bg-[#2888E0] transition-all duration-300"
                    :class="{
                      'opacity-100 scale-100': form.gender === 'male',
                      'opacity-0 scale-0': form.gender !== 'male',
                    }"
                  ></span>
                </span>
                <input
                  v-model="form.gender"
                  type="radio"
                  value="male"
                  class="sr-only"
                />
                <span
                  class="transition-all duration-300"
                  :class="{
                    'text-white': form.gender === 'male',
                    'text-[#2F2F30]': form.gender !== 'male',
                  }"
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
                ref="cardNumberInput"
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
                  ref="expiryInput"
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
            :disabled="isSubmitting"
            class="w-full bg-[#22C55E] text-white py-2 rounded hover:bg-green-600 h-[50px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="text-[18px] font-semibold">
              {{ isSubmitting ? 'SUBMITTING...' : 'CONTINUE' }}
            </span>
          </button>

          <!-- Success Message -->
          <div
            v-if="showSuccess"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div class="text-center">
                <div
                  class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg
                    class="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">
                  Form Submitted Successfully!
                </h3>
                <p class="text-gray-600">
                  Your insurance application has been submitted and is being
                  processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, watch, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import FormField from '@/components/FormField.vue';
import Cleave from 'cleave.js';
import axios from 'axios';

const isSubmitting = ref(false);
const showSuccess = ref(false);
const cardNumberInput = ref<HTMLInputElement | null>(null);
const expiryInput = ref<HTMLInputElement | null>(null);

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
const isValidFullName = helpers.withMessage(
  'Full name must contain at least two words with 2+ characters each',
  (value: string) => {
    if (!value) return false;
    const words = value.trim().split(/\s+/);
    return words.length >= 2 && words.every((word) => word.length >= 2);
  }
);

const isValidCardNumber = helpers.withMessage(
  'Card number must be 16 digits',
  (value: string) => !value || /^\d{16}$/.test(value.replace(/\s/g, ''))
);

const isValidExpiry = helpers.withMessage(
  'Expiry date cannot be in the past',
  (value: string) => {
    if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear > currentYear) return true;
    if (expYear === currentYear && expMonth >= currentMonth) return true;
    return false;
  }
);

const isValidCVV = helpers.withMessage(
  'CVV must be 3 digits',
  (value: string) => !value || /^\d{3}$/.test(value)
);

const isValidZip = helpers.withMessage(
  'Zip code must be 5 digits',
  (value: string) => !value || /^\d{5}$/.test(value)
);

const isValidAge = helpers.withMessage(
  'You must be at least 18 years old',
  () => {
    if (!form.birthMonth || !form.birthDay || !form.birthYear) return false;
    const birthDate = new Date(
      parseInt(form.birthYear),
      parseInt(form.birthMonth) - 1,
      parseInt(form.birthDay)
    );
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }
);

// Validation rules
const rules = {
  fullName: { required, isValidFullName },
  email: { required, email },
  zip: { required, isValidZip },
  birthMonth: { required },
  birthDay: { required },
  birthYear: { required, isValidAge },
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

// Auto-fill zip code on mount
onMounted(async () => {
  await fetchZipCode();
  initializeCleave();

  // Set random gender (requirement: can be selected before page loads)
  if (Math.random() > 0.5) {
    form.gender = 'female';
  } else {
    form.gender = 'male';
  }
});

// Watch full name and auto-fill card holder
watch(
  () => form.fullName,
  (newValue) => {
    if (newValue && newValue.trim()) {
      form.cardHolder = newValue;
    }
  }
);

// Auto-fill zip code using geolocation API
async function fetchZipCode() {
  try {
    const response = await axios.get('https://freegeoip.live/json/');
    if (response.data && response.data.zip_code) {
      form.zip = response.data.zip_code;
    }
  } catch (error) {
    console.warn('Could not fetch zip code from geolocation service');
    // Fallback to second service
    try {
      const response = await axios.get('https://freegeoip.app/json/');
      if (response.data && response.data.zip_code) {
        form.zip = response.data.zip_code;
      }
    } catch (fallbackError) {
      console.warn('Could not fetch zip code from fallback service');
    }
  }
}

// Initialize Cleave.js for card number and expiry formatting
function initializeCleave() {
  if (cardNumberInput.value) {
    new Cleave(cardNumberInput.value, {
      creditCard: true,
      onValueChanged: (e: any) => {
        form.cardNumber = e.target.value.replace(/\s/g, '');
      },
    });
  }

  if (expiryInput.value) {
    new Cleave(expiryInput.value, {
      date: true,
      datePattern: ['m', 'y'],
      onValueChanged: (e: any) => {
        form.expiry = e.target.value;
      },
    });
  }
}

async function submit() {
  isSubmitting.value = true;

  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    isSubmitting.value = false;
    alert('Please fix the errors before submitting');
    return;
  }

  try {
    // Simulate API submission
    const formData = {
      fullName: form.fullName,
      email: form.email,
      zip: form.zip,
      birthDate: {
        month: form.birthMonth,
        day: form.birthDay,
        year: form.birthYear,
      },
      gender: form.gender,
      cardHolder: form.cardHolder,
      cardNumber: form.cardNumber,
      expiry: form.expiry,
      cvv: form.cvv,
      submittedAt: new Date().toISOString(),
    };

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', JSON.stringify(formData, null, 2));

    // Clear form
    Object.keys(form).forEach((key) => {
      (form as any)[key] = '';
    });

    // Reset validation
    v$.value.$reset();

    // Show success message
    showSuccess.value = true;
    setTimeout(async () => {
      showSuccess.value = false;
      // Re-initialize auto-fill
      await fetchZipCode();
      if (Math.random() > 0.5) {
        form.gender = 'female';
      } else {
        form.gender = 'male';
      }
    }, 3000);
  } catch (error) {
    console.error('Form submission error:', error);
    alert('There was an error submitting the form. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300;
}
</style>
