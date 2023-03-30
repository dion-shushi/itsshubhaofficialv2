import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/config";

export default function () {
  const docRef = doc(db, "people", "graduation");
  const docSnap = getDoc(docRef);

  if (docSnap) {
    docSnap.then((value) => {
      console.log("Document data:", value);
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  //   .forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });

  return <></>;
}
