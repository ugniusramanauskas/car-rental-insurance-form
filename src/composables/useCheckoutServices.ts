import type { Ref } from 'vue';
import axios from 'axios';
import Cleave from 'cleave.js';
import type { FormData } from './useCheckoutValidation';

export function useCheckoutServices(form: FormData) {
  // Auto-fill zip code using geolocation API
  const fetchZipCode = async () => {
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
  };

  // Initialize Cleave.js for card number and expiry formatting
  const initializeCleave = (
    cardNumberInput: Ref<HTMLInputElement | null>,
    expiryInput: Ref<HTMLInputElement | null>
  ) => {
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
  };

  return {
    fetchZipCode,
    initializeCleave,
  };
}
