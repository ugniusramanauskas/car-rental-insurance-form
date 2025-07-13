import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

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

export function useCheckoutValidation() {
  const form = reactive<FormData>({
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
    'Enter at least two words, 2+ letters each',
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
    "Can't be in the past",
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

  const clearForm = () => {
    Object.keys(form).forEach((key) => {
      (form as any)[key] = '';
    });
    v$.value.$reset();
  };

  return {
    form,
    v$,
    birthDateError,
    clearForm,
  };
}
