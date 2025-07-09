<template>
  <div class="grid grid-cols-1 gap-1">
    <label class="block text-label font-bold text-gray-700">
      {{ label }}
    </label>
    <slot />
    <div v-if="error" class="text-red-500 text-sm">
      {{ error }}
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
