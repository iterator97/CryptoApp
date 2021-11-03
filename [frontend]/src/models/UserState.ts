export default interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  isRegistrationSuccesfull: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
