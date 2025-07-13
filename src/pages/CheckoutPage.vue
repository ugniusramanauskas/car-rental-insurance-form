<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col gap-9 pb-[34px] font-helvetica"
  >
    <AppHeader />

    <main class="flex-grow flex items-center justify-center">
      <form
        @submit.prevent="submit"
        class="bg-white px-10 py-[34px] rounded w-full max-w-[408px]"
      >
        <div class="grid grid-cols-1 gap-[34px]">
          <h2 class="text-xl font-bold text-center">
            Get your Car Insurance for $9.99
          </h2>

          <div class="grid grid-cols-1 gap-1">
            <!-- Personal Information -->
            <FormField label="Full Name" :error="getFieldError('fullName')">
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Full Name"
                :class="['input', { 'border-red-500': v$.fullName.$error }]"
              />
            </FormField>

            <FormField label="Email" :error="getFieldError('email')">
              <input
                v-model="form.email"
                type="email"
                placeholder="Email"
                :class="['input', { 'border-red-500': v$.email.$error }]"
              />
            </FormField>

            <FormField label="Zip Code" :error="getFieldError('zip')">
              <input
                v-model="form.zip"
                type="text"
                placeholder="Zip Code"
                :class="['input', { 'border-red-500': v$.zip.$error }]"
              />
            </FormField>

            <!-- Date of Birth -->
            <DateSelector
              label="Date of Birth"
              :error="birthDateError"
              :has-error="
                v$.birthMonth.$error ||
                v$.birthDay.$error ||
                v$.birthYear.$error
              "
              :month-value="form.birthMonth"
              :day-value="form.birthDay"
              :year-value="form.birthYear"
              @update:month="form.birthMonth = $event"
              @update:day="form.birthDay = $event"
              @update:year="form.birthYear = $event"
            />

            <!-- Gender Selection -->
            <RadioGroup
              label="Gender"
              v-model="form.gender"
              :error="
                v$.gender.$error ? 'Please select your gender' : undefined
              "
              :options="genderOptions"
            />

            <!-- Payment Information -->
            <PaymentSection>
              <FormField
                label="Card Holder Name"
                :error="getFieldError('cardHolder')"
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
                :error="getFieldError('cardNumber')"
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
                <FormField label="Expiry Date" :error="getFieldError('expiry')">
                  <input
                    ref="expiryInput"
                    v-model="form.expiry"
                    type="text"
                    placeholder="MM/YY"
                    :class="['input', { 'border-red-500': v$.expiry.$error }]"
                  />
                </FormField>
                <FormField label="CVV" :error="getFieldError('cvv')">
                  <input
                    v-model="form.cvv"
                    type="text"
                    placeholder="CVV"
                    :class="['input', { 'border-red-500': v$.cvv.$error }]"
                  />
                </FormField>
              </div>
            </PaymentSection>
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
        </div>

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
      </form>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import FormField from '@/components/FormField.vue';
import DateSelector from '@/components/DateSelector.vue';
import RadioGroup from '@/components/RadioGroup.vue';
import PaymentSection from '@/components/PaymentSection.vue';
import { useCheckoutValidation } from '@/composables/useCheckoutValidation';
import { useCheckoutServices } from '@/composables/useCheckoutServices';

const isSubmitting = ref(false);
const showSuccess = ref(false);
const cardNumberInput = ref<HTMLInputElement | null>(null);
const expiryInput = ref<HTMLInputElement | null>(null);

const { form, v$, birthDateError, clearForm } = useCheckoutValidation();
const { fetchZipCode, initializeCleave } = useCheckoutServices(form);

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
];

function getFieldError(fieldName: keyof typeof v$.value): string | undefined {
  const field = v$.value[fieldName];
  if (!field.$error) return;
  return field.$errors.find((e: { $message: string }) => e.$message)?.$message;
}

onMounted(async () => {
  await fetchZipCode();
  initializeCleave(cardNumberInput, expiryInput);
});

watch(
  () => form.fullName,
  (newValue) => {
    if (newValue && newValue.trim()) {
      form.cardHolder = newValue;
    }
  }
);

async function submit() {
  isSubmitting.value = true;

  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    isSubmitting.value = false;
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

    clearForm();

    showSuccess.value = true;
    setTimeout(async () => {
      showSuccess.value = false;

      await fetchZipCode();
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
