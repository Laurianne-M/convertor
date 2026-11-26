import {beforeEach, describe, expect, test, vi} from "vitest";
import {type Firestore} from "firebase-admin/firestore";
import FirestoreServiceImpl from "../FirestoreServiceImpl.js";
import FirestoreCollection from "../FirestoreCollection.js";

describe("FirestoreServiceImpl", () => {
  const documentData = {date: "2026-08-19", rates: {EUR: 1}};
  const documentRef = {
    set: vi.fn(),
    get: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  const rangeQuery = {
    where: vi.fn(),
    orderBy: vi.fn(),
    get: vi.fn(),
  };
  const collectionRef = {
    doc: vi.fn(() => documentRef),
    add: vi.fn(),
    where: vi.fn(() => rangeQuery),
  };
  const firestore = {
    collection: vi.fn(() => collectionRef),
  } as unknown as Firestore;
  let service: FirestoreServiceImpl<typeof documentData>;

  beforeEach(() => {
    vi.clearAllMocks();
    rangeQuery.where.mockReturnValue(rangeQuery);
    rangeQuery.orderBy.mockReturnValue(rangeQuery);
    service = new FirestoreServiceImpl<typeof documentData>(
      firestore,
      FirestoreCollection.EXCHANGE_RATES
    );
  });

  test("creates a document with an auto-generated ID", async () => {
    collectionRef.add.mockResolvedValue({id: "generated-id"});

    await expect(service.create(documentData))
      .resolves.toBe("generated-id");

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.add).toHaveBeenCalledWith(documentData);
  });

  test("creates or replaces a document with a supplied ID", async () => {
    documentRef.set.mockResolvedValue(undefined);

    await expect(service.create(documentData, "2026-08-19"))
      .resolves.toBe("2026-08-19");

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.set).toHaveBeenCalledWith(documentData);
  });

  test("reads a document by ID from its configured collection", async () => {
    documentRef.get.mockResolvedValue({
      exists: true,
      data: () => documentData,
    });

    await expect(service.read("2026-08-19"))
      .resolves.toEqual(documentData);

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
  });

  test("reads documents within an inclusive field range", async () => {
    rangeQuery.get.mockResolvedValue({
      docs: [{data: () => documentData}],
    });

    await expect(service.readRange(
      "date",
      "2026-08-01",
      "2026-08-31"
    )).resolves.toEqual([documentData]);

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.where).toHaveBeenCalledWith(
      "date",
      ">=",
      "2026-08-01"
    );
    expect(rangeQuery.where).toHaveBeenCalledWith(
      "date",
      "<=",
      "2026-08-31"
    );
    expect(rangeQuery.orderBy).toHaveBeenCalledWith("date", "asc");
  });

  test("returns undefined when a document does not exist", async () => {
    documentRef.get.mockResolvedValue({exists: false});

    await expect(service.read("missing"))
      .resolves.toBeUndefined();
  });

  test("updates a document by collection and ID", async () => {
    documentRef.update.mockResolvedValue(undefined);

    await expect(service.update("2026-08-19", documentData))
      .resolves.toBeUndefined();

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.update).toHaveBeenCalledWith(documentData);
  });

  test("deletes a document by collection and ID", async () => {
    documentRef.delete.mockResolvedValue(undefined);

    await expect(service.delete("2026-08-19"))
      .resolves.toBeUndefined();

    expect(firestore.collection).toHaveBeenCalledWith(
      FirestoreCollection.EXCHANGE_RATES
    );
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.delete).toHaveBeenCalledOnce();
  });
});
