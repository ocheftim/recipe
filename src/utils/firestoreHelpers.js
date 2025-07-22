import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ingredientsCollection = collection(db, "ingredients");

export async function fetchIngredients() {
  const snapshot = await getDocs(ingredientsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addIngredient(ingredient) {
  const docRef = await addDoc(ingredientsCollection, ingredient);
  return { id: docRef.id, ...ingredient };
}

export async function updateIngredient(id, updatedData) {
  const ingredientRef = doc(db, "ingredients", id);
  await updateDoc(ingredientRef, updatedData);
}

export async function deleteIngredient(id) {
  const ingredientRef = doc(db, "ingredients", id);
  await deleteDoc(ingredientRef);
}
