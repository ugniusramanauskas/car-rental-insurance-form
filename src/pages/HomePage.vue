<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <AppHeader />

    <main class="flex-grow flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 class="text-xl font-semibold mb-6">
          Welcome to Car Rental Insurance
        </h2>
        <p class="text-gray-600 mb-6">
          Get comprehensive car insurance coverage for just $9.99
        </p>
        <router-link
          to="/checkout"
          class="inline-block w-full bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition-colors"
        >
          Get Insurance Now
        </router-link>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
