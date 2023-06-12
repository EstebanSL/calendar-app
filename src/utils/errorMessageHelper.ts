export const getErrorMessage = (errors: any) => {
  
  if (errors.required) return 'Fild is required';
  if (errors.minLength) return 'Minimun length must be 6';
}