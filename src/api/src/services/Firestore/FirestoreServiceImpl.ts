import {type CollectionReference, type DocumentData, type Firestore}
  from "firebase-admin/firestore";
import FirestoreCollection from "./FirestoreCollection.js";
import FirestoreService from "./FirestoreService.js";

/**
 * Firestore-backed implementation of FirestoreService.
 */
export default class FirestoreServiceImpl<T extends object>
implements FirestoreService<T> {
  /** The collection managed by this service. */
  private collection: CollectionReference;

  /**
   * Creates a service bound to one Firestore collection.
   * @param {Firestore} firestore The Firestore client.
   * @param {FirestoreCollection} collection The collection to manage.
   */
  constructor(firestore: Firestore, collection: FirestoreCollection) {
    this.collection = firestore.collection(collection);
  }

  /** @inheritdoc */
  async create(
    data: T,
    documentId?: string
  ): Promise<string> {
    if (documentId !== undefined) {
      await this.collection.doc(documentId).set(data as DocumentData);
      return documentId;
    }

    const document = await this.collection.add(data as DocumentData);
    return document.id;
  }

  /** @inheritdoc */
  async read(
    documentId: string
  ): Promise<T | undefined> {
    const document = await this.collection.doc(documentId).get();

    return document.exists ? document.data() as T : undefined;
  }

  /** @inheritdoc */
  async readRange(
    fieldName: string,
    startValue: string,
    endValue: string
  ): Promise<T[]> {
    const snapshot = await this.collection
      .where(fieldName, ">=", startValue)
      .where(fieldName, "<=", endValue)
      .orderBy(fieldName, "asc")
      .get();

    return snapshot.docs.map((document) => document.data() as T);
  }

  /** @inheritdoc */
  async update(
    documentId: string,
    data: T
  ): Promise<void> {
    await this.collection.doc(documentId).update(data as DocumentData);
  }

  /** @inheritdoc */
  async delete(documentId: string): Promise<void> {
    await this.collection.doc(documentId).delete();
  }
}
