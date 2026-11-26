import {getApp, getApps, initializeApp, type App}
  from "firebase-admin/app";
import {getFirestore, type Firestore}
  from "firebase-admin/firestore";
import FirebaseAppService from "./FirebaseAppService.js";

/** Initializes and exposes the Firebase Admin app and Firestore client. */
export default class FirebaseAppServiceImpl implements FirebaseAppService {
  readonly app: App;
  readonly firestore: Firestore;

  /** Initializes the default Firebase Admin app and Firestore client. */
  constructor() {
    this.app = getApps().some((app) => app.name === "[DEFAULT]") ?
      getApp() : initializeApp({
        projectId: process.env.GCLOUD_PROJECT ?? "convertor-2b5dd",
      });
    this.firestore = getFirestore(this.app);
  }
}
