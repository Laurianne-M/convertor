/**
 * Firestore collection operations.
 */
interface FirestoreService<T extends object> {
  /**
   * Creates a document, using an auto-generated ID unless one is supplied.
   * @param {T} data The document data.
   * @param {string} documentId Optional document ID.
   * @return {Promise<string>} The document ID.
   */
  create(
    data: T,
    documentId?: string
  ): Promise<string>;

  /**
   * Reads a document by ID.
   * @param {string} documentId The document ID.
   * @return {Promise<T | undefined>} The document data when it exists.
   */
  read(
    documentId: string
  ): Promise<T | undefined>;

  /**
   * Reads documents whose field value falls within an inclusive range.
   * @param {string} fieldName The field used for range comparisons.
   * @param {string} startValue The inclusive lower bound.
   * @param {string} endValue The inclusive upper bound.
   * @return {Promise<T[]>} Matching document data.
   */
  readRange(
    fieldName: string,
    startValue: string,
    endValue: string
  ): Promise<T[]>;

  /**
   * Updates a document by ID.
   * @param {string} documentId The document ID.
   * @param {T} data The fields to update.
   * @return {Promise<void>} Resolves when the document is updated.
   */
  update(
    documentId: string,
    data: T
  ): Promise<void>;

  /**
   * Deletes a document by ID.
   * @param {string} documentId The document ID.
   * @return {Promise<void>} Resolves when the document is deleted.
   */
  delete(documentId: string): Promise<void>;
}

export default FirestoreService;
