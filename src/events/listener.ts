export class Listener {
  public emit(event: CustomEvent) {
    document.dispatchEvent(event);
  }

  public on(event: string, callback: any) {
    document.addEventListener(event, callback);
  }
}
