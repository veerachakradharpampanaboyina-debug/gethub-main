
import { db } from '@/lib/firebase';
import { ExamAttempt, Question, UserEnrollment } from '@/lib/types';
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy, getDoc, doc, setDoc } from 'firebase/firestore';

const attemptsCollection = collection(db, 'examAttempts');
const enrollmentsCollection = collection(db, 'userEnrollments');

export async function saveExamAttempt(attempt: Omit<ExamAttempt, 'id' | 'createdAt'>): Promise<string> {
    const attemptWithTimestamp = {
        ...attempt,
        createdAt: Timestamp.now(),
    };
    const docRef = await addDoc(attemptsCollection, attemptWithTimestamp);
    return docRef.id;
}

export async function getUserExamAttempts(userId: string): Promise<ExamAttempt[]> {
    const q = query(attemptsCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const attempts: ExamAttempt[] = [];
    querySnapshot.forEach((doc) => {
        attempts.push({ id: doc.id, ...doc.data() } as ExamAttempt);
    });
    return attempts;
}

export async function getSeenQuestions(userId: string): Promise<string[]> {
    const attempts = await getUserExamAttempts(userId);
    const seenQuestions = new Set<string>();
    attempts.forEach(attempt => {
        if (attempt.examId.startsWith('practice-')) {
            attempt.questions.forEach(q => seenQuestions.add(q.questionText));
        }
    });
    return Array.from(seenQuestions);
}


export async function enrollInExam(userId: string, examId: string): Promise<string> {
    const enrollmentId = `${userId}_${examId}`;
    const enrollmentRef = doc(db, 'userEnrollments', enrollmentId);
    
    const docSnap = await getDoc(enrollmentRef);
    if (docSnap.exists()) {
        throw new Error(`User is already enrolled in exam ${examId}`);
    }

    const newEnrollment: Omit<UserEnrollment, 'id'> = {
        userId,
        examId,
        enrolledAt: Timestamp.now(),
    };
    await setDoc(enrollmentRef, newEnrollment);
    return enrollmentId;
}


export async function getEnrolledExams(userId: string): Promise<UserEnrollment[]> {
    const q = query(enrollmentsCollection, where('userId', '==', userId), orderBy('enrolledAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const enrollments: UserEnrollment[] = [];
    querySnapshot.forEach((doc) => {
        enrollments.push({ id: doc.id, ...doc.data() } as UserEnrollment);
    });
    return enrollments;
}
