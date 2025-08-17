
import { db } from '@/lib/firebase';
import { ScheduledExam, Question } from '@/lib/types';
import { collection, addDoc, getDocs, query, where, Timestamp, orderBy, limit } from 'firebase/firestore';

const scheduledExamsCollection = collection(db, 'weeklyExams');

export async function saveScheduledExam(examData: {
    examId: string,
    examName: string,
    questions: Question[]
}): Promise<string> {

    const weekNumber = Math.ceil((new Date().getDate() + new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() - 1) / 7);
    const weekId = `${new Date().getFullYear()}-W${weekNumber}-${new Date().getMonth() + 1}`;

    const scheduledExam: Omit<ScheduledExam, 'id'> = {
        examId: examData.examId,
        examName: examData.examName,
        weekId: weekId,
        questions: examData.questions,
        createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(scheduledExamsCollection, scheduledExam);
    return docRef.id;
}


export async function getLatestScheduledExam(examId: string): Promise<ScheduledExam | null> {
    const q = query(
        scheduledExamsCollection, 
        where('examId', '==', examId), 
        orderBy('createdAt', 'desc'),
        limit(1)
    );

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
        return null;
    }
    
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as ScheduledExam;
}
