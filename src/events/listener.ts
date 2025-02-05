export class Listener {
  static emit(event: CustomEvent) {
    document.dispatchEvent(event);
  }

  static on(event: string, callback: any) {
    document.addEventListener(event, callback);
  }
}
