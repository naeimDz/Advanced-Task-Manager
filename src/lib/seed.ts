// services/seed.ts

import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore"; // تأكد من استيراد Timestamp

export async function seedDataIfNeeded() {
  const flagRef = doc(db, "meta", "seeded");
  const alreadySeeded = await getDoc(flagRef);

  if (alreadySeeded.exists()) return;

  // إنشاء ملاحظة تجريبية
  const noteData = {
    title: "👋 مرحبًا بك في MindNotes",
    content: "هذه ملاحظة تجريبية. ابدأ رحلتك المعرفية.",
    authorId: "7Y9hI0AQrVOetS7qQ1kH7nJZ2pB2", // سيتم استخدام ID مؤلف تجريبي
    isPublic: true,
    tags: ["فكرة", "تجربة"],
    linkedNotes: [], // لا يوجد روابط في هذه الملاحظة التجريبية
    createdAt: Timestamp.fromMillis(Date.now()), // تحويل الوقت إلى Timestamp
    updatedAt: Timestamp.fromMillis(Date.now()), // يتم تعيين تاريخ التحديث بنفس وقت الإنشاء
  };

  // إضافة الملاحظة إلى قاعدة البيانات
  await addDoc(collection(db, "notes"), noteData);

  // ضبط علامة تم التخصيص
  await setDoc(flagRef, {
    done: true,
    at: Date.now(),
  });
}

