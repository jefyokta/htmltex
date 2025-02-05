import { BaseEvent } from "./base";

export class CiteChanged extends BaseEvent {
  protected static readonly eventName: string = "citeChanged";
}
