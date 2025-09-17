
import { db } from '@/lib/firebase';
import { SyllabusProgress } from '@/lib/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getSyllabusProgressDocRef = (userId: string, examId: string) => {
    return doc(db, 'users', userId, 'syllabusProgress', examId);
}

export async function getSyllabusProgress(userId: string, examId: string): Promise<SyllabusProgress | null> {
    const docRef = getSyllabusProgressDocRef(userId, examId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as SyllabusProgress;
    } else {
        return null;
    }
}

export async function updateSyllabusProgress(userId: string, examId: string, progress: SyllabusProgress): Promise<void> {
    const docRef = getSyllabusProgressDocRef(userId, examId);
    await setDoc(docRef, progress, { merge: true });
}
