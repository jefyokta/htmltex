class Menu {
  _call(method: keyof this) {
    (this[method] as Function)();
  }
}
