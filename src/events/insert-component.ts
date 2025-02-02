import { BaseEvent } from "./base";

export class InsertComponent extends BaseEvent {
  protected static readonly eventName: string = "componentInserted";
}
