export function getPasswordValidation(password: string) {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };
}

export function isPasswordStrong(password: string) {
  const validation = getPasswordValidation(password);

  return (
    validation.minLength &&
    validation.uppercase &&
    validation.number &&
    validation.specialChar
  );
}