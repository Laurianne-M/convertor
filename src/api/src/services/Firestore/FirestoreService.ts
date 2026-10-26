/**
 * Firestore collection operations.
 */
interface FirestoreService {
  /**
   * Creates a document, using an auto-generated ID unless one is supplied.
   * @param {string} collectionName The collection containing the document.
   * @param {T} data The document data.
   * @param {string} documentId Optional document ID.
   * @return {Promise<string>} The document ID.
   */
  create<T extends object>(
    collectionName: string,
    data: T,
    documentId?: string
  ): Promise<string>;

  /**
   * Reads a document by ID.
   * @param {string} collectionName The collection containing the document.
   * @param {string} documentId The document ID.
   * @return {Promise<T | undefined>} The document data when it exists.
   */
  read<T extends object>(
    collectionName: string,
    documentId: string
  ): Promise<T | undefined>;

  /**
   * Updates a document by ID.
   * @param {string} collectionName The collection containing the document.
   * @param {string} documentId The document ID.
   * @param {T} data The fields to update.
   * @return {Promise<void>} Resolves when the document is updated.
   */
  update<T extends object>(
    collectionName: string,
    documentId: string,
    data: T
  ): Promise<void>;

  /**
   * Deletes a document by ID.
   * @param {string} collectionName The collection containing the document.
   * @param {string} documentId The document ID.
   * @return {Promise<void>} Resolves when the document is deleted.
   */
  delete(collectionName: string, documentId: string): Promise<void>;
}

export default FirestoreService;
