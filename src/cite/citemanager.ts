import { bibToObject, objectToBib } from "../converter/cite"
import type { CiteStorage } from "./citestorage";






export default class CiteManager {
    static storage: CiteStorage | null = null;

    static init(storage: CiteStorage) {
        this.storage = storage;
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
    }

    static delete(key: string) {
        this.ensureStorageInitialized();
        this.storage!.delete(key);
    }

    static add(cite: Cite) {
        this.ensureStorageInitialized();
        this.storage!.add(cite);
    }

    static toBib(): string {
        this.ensureStorageInitialized();
        return objectToBib(this.getAll());
    }
}





