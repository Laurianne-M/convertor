import FirestoreService from "./FirestoreService.js";

/** In-memory Firestore implementation for tests. */
export default class FirestoreServiceFake<T extends object>
implements FirestoreService<T> {
  private documents = new Map<string, T>();
  private nextId = 0;

  /** @inheritdoc */
  async create(data: T, documentId?: string): Promise<string> {
    const id = documentId ?? `fake-${this.nextId++}`;
    this.documents.set(id, data);
    return id;
  }

  /** @inheritdoc */
  async read(documentId: string): Promise<T | undefined> {
    return this.documents.get(documentId);
  }

  /** @inheritdoc */
  async readRange(
    fieldName: string,
    startValue: string,
    endValue: string
  ): Promise<T[]> {
    return [...this.documents.values()]
      .filter((document) => {
        const value = (document as Record<string, unknown>)[fieldName];
        return typeof value === "string" &&
          value >= startValue && value <= endValue;
      })
      .sort((first, second) => {
        const firstValue = (first as Record<string, string>)[fieldName];
        const secondValue = (second as Record<string, string>)[fieldName];
        return firstValue.localeCompare(secondValue);
      });
  }

  /** @inheritdoc */
  async update(documentId: string, data: T): Promise<void> {
    const existing = this.documents.get(documentId);
    if (existing === undefined) {
      throw new Error(`Document ${documentId} does not exist`);
    }

    this.documents.set(documentId, {...existing, ...data});
  }

  /** @inheritdoc */
  async delete(documentId: string): Promise<void> {
    this.documents.delete(documentId);
  }
}
