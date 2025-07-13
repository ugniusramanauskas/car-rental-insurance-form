import type { Ref } from 'vue';
import axios from 'axios';
import Cleave from 'cleave.js';
import type { FormData } from './useCheckoutValidation';

export function useCheckoutServices(form: FormData) {
  const fetchZipCode = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/', {
        timeout: 5000,
      });
      if (response.data?.postal) {
        form.zip = response.data.postal;
      }
    } catch (error) {
      console.warn('Failed to fetch zip code:', error);
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
