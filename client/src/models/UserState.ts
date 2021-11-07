export default interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  token: string;
  isRegistrationSuccesfull: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  channels: Array<string>;
  activeChannelMessages: Array<any>;
  errorMessage: string;
}
