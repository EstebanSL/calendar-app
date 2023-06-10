export const getErrorMessage = (errors: any) => {
  console.log(errors);
  
  if (errors.required) return 'Fild is required';
  if (errors.minLength) return 'Minimun length must be 6';
}