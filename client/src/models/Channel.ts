import { Message } from "./Message";

export interface Channel {
  _id: string;
  creators: string;
  messages: Array<Message>;
  name: string;
  __v: number;
}
