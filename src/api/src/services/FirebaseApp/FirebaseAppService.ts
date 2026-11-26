import type {App} from "firebase-admin/app";
import type {Firestore} from "firebase-admin/firestore";

/** Firebase Admin application and its Firestore client. */
interface FirebaseAppService {
  readonly app: App;
  readonly firestore: Firestore;
}

export default FirebaseAppService;
