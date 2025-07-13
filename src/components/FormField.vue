<template>
  <div class="space-y-1">
    <label class="block text-label font-bold text-gray-700">
      {{ label }}
    </label>
    <slot />
    <!-- Minimal fixed height container for error messages to prevent layout shift -->
    <div class="min-h-[1rem]">
      <div
        v-if="error"
        class="text-red-500 text-sm leading-none transition-opacity duration-200"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  error?: string;
}

defineProps<Props>();
</script>

<style scoped>
/* Form field styles can be added here if needed */
</style>
