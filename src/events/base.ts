export abstract class BaseEvent {
  protected static readonly eventName: string = "base";

  static getEvent(detail?: Record<any, any>): CustomEvent<unknown> {
    return new CustomEvent(this.eventName, detail || {});
  }
}
