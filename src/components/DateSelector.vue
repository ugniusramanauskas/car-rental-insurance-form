<template>
  <FormField :label="label" :error="error">
    <div class="flex gap-2">
      <div class="flex-1">
        <select
          v-model="month"
          :class="['input', { 'border-red-500': hasError }]"
          @update:modelValue="updateValue"
        >
          <option disabled value="">Month</option>
          <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="flex-1">
        <select
          v-model="day"
          :class="['input', { 'border-red-500': hasError }]"
          @update:modelValue="updateValue"
        >
          <option disabled value="">Day</option>
          <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
      <div class="flex-1">
        <select
          v-model="year"
          :class="['input', { 'border-red-500': hasError }]"
          @update:modelValue="updateValue"
        >
          <option disabled value="">Year</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import FormField from './FormField.vue';

interface Props {
  label: string;
  error?: string;
  hasError?: boolean;
  monthValue?: string;
  dayValue?: string;
  yearValue?: string;
}

interface Emits {
  (e: 'update:month', value: string): void;
  (e: 'update:day', value: string): void;
  (e: 'update:year', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  error: undefined,
  hasError: false,
  monthValue: '',
  dayValue: '',
  yearValue: '',
});

const emit = defineEmits<Emits>();

const month = ref(props.monthValue);
const day = ref(props.dayValue);
const year = ref(props.yearValue);

const years = computed(() => {
  const current = new Date().getFullYear();
  return Array.from({ length: 100 }, (_, i) => current - i);
});

const updateValue = () => {
  emit('update:month', month.value);
  emit('update:day', day.value);
  emit('update:year', year.value);
};

// Watch for external changes
watch(
  () => props.monthValue,
  (newVal) => (month.value = newVal)
);
watch(
  () => props.dayValue,
  (newVal) => (day.value = newVal)
);
watch(
  () => props.yearValue,
  (newVal) => (year.value = newVal)
);
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300;
}
</style>
