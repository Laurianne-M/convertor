import {beforeEach, describe, expect, test, vi} from "vitest";
import {type Firestore} from "firebase-admin/firestore";
import FirestoreServiceImpl from "../FirestoreServiceImpl.js";

describe("FirestoreServiceImpl", () => {
  const documentData = {date: "2026-08-19", rates: {EUR: 1}};
  const documentRef = {
    set: vi.fn(),
    get: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  };
  const collectionRef = {
    doc: vi.fn(() => documentRef),
    add: vi.fn(),
  };
  const firestore = {
    collection: vi.fn(() => collectionRef),
  } as unknown as Firestore;
  let service: FirestoreServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new FirestoreServiceImpl(firestore);
  });

  test("creates a document with an auto-generated ID", async () => {
    collectionRef.add.mockResolvedValue({id: "generated-id"});

    await expect(service.create("rates", documentData))
      .resolves.toBe("generated-id");

    expect(firestore.collection).toHaveBeenCalledWith("rates");
    expect(collectionRef.add).toHaveBeenCalledWith(documentData);
  });

  test("creates or replaces a document with a supplied ID", async () => {
    documentRef.set.mockResolvedValue(undefined);

    await expect(service.create("dailyRates", documentData, "2026-08-19"))
      .resolves.toBe("2026-08-19");

    expect(firestore.collection).toHaveBeenCalledWith("dailyRates");
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.set).toHaveBeenCalledWith(documentData);
  });

  test("reads a document by collection and ID", async () => {
    documentRef.get.mockResolvedValue({
      exists: true,
      data: () => documentData,
    });

    await expect(service.read("dailyRates", "2026-08-19"))
      .resolves.toEqual(documentData);

    expect(firestore.collection).toHaveBeenCalledWith("dailyRates");
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
  });

  test("returns undefined when a document does not exist", async () => {
    documentRef.get.mockResolvedValue({exists: false});

    await expect(service.read("dailyRates", "missing"))
      .resolves.toBeUndefined();
  });

  test("updates a document by collection and ID", async () => {
    documentRef.update.mockResolvedValue(undefined);

    await expect(service.update("dailyRates", "2026-08-19", documentData))
      .resolves.toBeUndefined();

    expect(firestore.collection).toHaveBeenCalledWith("dailyRates");
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.update).toHaveBeenCalledWith(documentData);
  });

  test("deletes a document by collection and ID", async () => {
    documentRef.delete.mockResolvedValue(undefined);

    await expect(service.delete("dailyRates", "2026-08-19"))
      .resolves.toBeUndefined();

    expect(firestore.collection).toHaveBeenCalledWith("dailyRates");
    expect(collectionRef.doc).toHaveBeenCalledWith("2026-08-19");
    expect(documentRef.delete).toHaveBeenCalledOnce();
  });
});
