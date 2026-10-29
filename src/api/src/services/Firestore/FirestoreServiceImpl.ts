import {type DocumentData, type Firestore}
  from "firebase-admin/firestore";
import FirestoreService from "./FirestoreService.js";

/**
 * Firestore-backed implementation of FirestoreService.
 */
export default class FirestoreServiceImpl implements FirestoreService {
  /** The Firestore client used by this service. */
  private firestore: Firestore;

  /**
   * Creates a service for operating on any Firestore collection.
   * @param {Firestore} firestore The Firestore client.
   */
  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  /** @inheritdoc */
  async create<T extends object>(
    collectionName: string,
    data: T,
    documentId?: string
  ): Promise<string> {
    const collection = this.firestore.collection(collectionName);
    if (documentId !== undefined) {
      await collection.doc(documentId).set(data as DocumentData);
      return documentId;
    }

    const document = await collection.add(data as DocumentData);
    return document.id;
  }

  /** @inheritdoc */
  async read<T extends object>(
    collectionName: string,
    documentId: string
  ): Promise<T | undefined> {
    const document = await this.firestore
      .collection(collectionName)
      .doc(documentId)
      .get();

    return document.exists ? document.data() as T : undefined;
  }

  /** @inheritdoc */
  async update<T extends object>(
    collectionName: string,
    documentId: string,
    data: T
  ): Promise<void> {
    await this.firestore
      .collection(collectionName)
      .doc(documentId)
      .update(data as DocumentData);
  }

  /** @inheritdoc */
  async delete(collectionName: string, documentId: string): Promise<void> {
    await this.firestore
      .collection(collectionName)
      .doc(documentId)
      .delete();
  }
}
