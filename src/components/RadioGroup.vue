<template>
  <FormField :label="label" :error="error">
    <div class="grid grid-cols-2 gap-3">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex relative grow items-center justify-start gap-2 px-6 py-2 border rounded cursor-pointer transition-all duration-300 text-sm font-medium focus:outline-none h-[43px] transform hover:scale-105"
        :class="{
          'bg-[#2888E0] text-white border-[#2888E0]':
            modelValue === option.value,
          'text-gray-900 bg-white border-[#D8D6D6]':
            modelValue !== option.value,
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
          :value="option.value"
          type="radio"
          :checked="modelValue === option.value"
          class="sr-only peer"
          @change="$emit('update:modelValue', option.value)"
        />
        <span class="text-[#2F2F30] peer-checked:text-white font-normal">
          {{ option.label }}
        </span>
      </label>
    </div>
  </FormField>
</template>

<script setup lang="ts">
import FormField from './FormField.vue';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  error?: string;
  modelValue: string;
  options: Option[];
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>
