import { bibToObject, objectToBib } from "../converter/cite";
import { CiteChanged } from "../events/cite-changed";
import { Listener } from "../events/listener";
import type { CiteStorage } from "./cite-storage";
import { CiteUtils } from "./utils";

export default class CiteManager {
  static storage: CiteStorage | null = null;

  static init(storage: CiteStorage) {
    this.storage = storage;
    Listener.emit(CiteChanged.getEvent());
  }

  private static ensureStorageInitialized() {
    if (!this.storage) {
      throw new Error("CiteManager not initialized");
    }
  }

  static getAll(): Cite[] {
    this.ensureStorageInitialized();
    return this.storage!.getAll();
  }

  static get(key: string): Cite | undefined {
    this.ensureStorageInitialized();
    return this.storage!.get(key);
  }

  static update(key: string, data: Record<string, string>) {
    this.ensureStorageInitialized();
    this.storage!.update(key, data);
    Listener.emit(CiteChanged.getEvent());
  }

  static delete(key: string) {
    this.ensureStorageInitialized();
    this.storage!.delete(key);
    Listener.emit(CiteChanged.getEvent());
  }

  static add(cite: Cite) {
    this.ensureStorageInitialized();
    this.storage!.add(cite);
    Listener.emit(CiteChanged.getEvent());
  }

  static toBib(): string {
    this.ensureStorageInitialized();
    return objectToBib(this.getAll());
  }
  static setFromBib() {}
}
