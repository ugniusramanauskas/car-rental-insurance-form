import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

export interface FormData {
  fullName: string;
  email: string;
  zip: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  gender: string;
  cardHolder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

const createInitialForm = (): FormData => ({
  fullName: '',
  email: '',
  zip: '',
  birthMonth: '',
  birthDay: '',
  birthYear: '',
  gender: 'female',
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});

export function useCheckoutValidation() {
  const form = reactive<FormData>(createInitialForm());

  // Custom validators
  const validators = {
    fullName: helpers.withMessage(
      'Enter at least two words, 2+ letters each',
      (value: string) => {
        if (!value) return false;
        const words = value.trim().split(/\s+/);
        return words.length >= 2 && words.every((word) => word.length >= 2);
      }
    ),
    email: helpers.withMessage(
      'Please enter a valid email address',
      (value: string) => {
        if (!value) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    ),
    cardNumber: helpers.withMessage(
      'Card number must be 16 digits',
      (value: string) => !value || /^\d{16}$/.test(value.replace(/\s/g, ''))
    ),
    expiry: helpers.withMessage("Can't be in the past", (value: string) => {
      if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;
      const [month, year] = value.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      const expYear = parseInt(year);
      const expMonth = parseInt(month);

      return (
        expYear > currentYear ||
        (expYear === currentYear && expMonth >= currentMonth)
      );
    }),
    cvv: helpers.withMessage(
      'CVV must be 3 digits',
      (value: string) => !value || /^\d{3}$/.test(value)
    ),
    zip: helpers.withMessage(
      'Zip code must be 5 digits',
      (value: string) => !value || /^\d{5}$/.test(value)
    ),
    age: helpers.withMessage('You must be at least 18 years old', () => {
      if (!form.birthMonth || !form.birthDay || !form.birthYear) return false;
      const birthDate = new Date(
        parseInt(form.birthYear),
        parseInt(form.birthMonth) - 1,
        parseInt(form.birthDay)
      );
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      return monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1 >= 18
        : age >= 18;
    }),
  };

  const rules = {
    fullName: { required, isValidFullName: validators.fullName },
    email: { required, isValidEmail: validators.email },
    zip: { required, isValidZip: validators.zip },
    birthMonth: { required },
    birthDay: { required },
    birthYear: { required, isValidAge: validators.age },
    gender: { required },
    cardHolder: { required, minLength: minLength(2) },
    cardNumber: { required, isValidCardNumber: validators.cardNumber },
    expiry: { required, isValidExpiry: validators.expiry },
    cvv: { required, isValidCVV: validators.cvv },
  };

  const v$ = useVuelidate(rules, form);

  const birthDateError = computed(() => {
    // Check if any birth field is empty (but not all are empty)
    const hasMonth = !!form.birthMonth;
    const hasDay = !!form.birthDay;
    const hasYear = !!form.birthYear;

    const filledFields = [hasMonth, hasDay, hasYear].filter(Boolean).length;

    // Check if validation has been triggered (any field is dirty/touched)
    const hasBeenTouched =
      v$.value.birthMonth.$dirty ||
      v$.value.birthDay.$dirty ||
      v$.value.birthYear.$dirty;

    // Debug logging
    console.log('Birth date validation:', {
      hasMonth,
      hasDay,
      hasYear,
      filledFields,
      hasBeenTouched,
      monthValue: form.birthMonth,
      dayValue: form.birthDay,
      yearValue: form.birthYear,
    });

    // If validation has been triggered and no fields are filled, show required error
    if (hasBeenTouched && filledFields === 0) {
      return 'Please select a complete date of birth';
    }

    // If some fields are filled but not all, show error
    if (filledFields > 0 && filledFields < 3) {
      return 'Please select a complete date of birth';
    }

    // If all fields are filled but age validation fails
    if (filledFields === 3 && v$.value.birthYear.$error) {
      return 'You must be at least 18 years old';
    }

    return undefined;
  });

  const clearForm = () => {
    Object.assign(form, createInitialForm());
    v$.value.$reset();
  };

  return {
    form,
    v$,
    birthDateError,
    clearForm,
  };
}
