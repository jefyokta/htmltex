import { BaseEvent } from "./base";

export class VarChanged extends BaseEvent {
  protected static readonly eventName: string = "varChanged";
}
