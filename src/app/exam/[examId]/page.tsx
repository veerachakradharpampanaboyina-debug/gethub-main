
// This is the main page component (Server Component).
// It wraps the client component in the AuthProvider.
// NOTE: THIS MUST BE A SERVER COMPONENT AND EXPORT generateStaticParams
// It must not have "use client" at the top of the file.

import type { Exam, Question } from '@/lib/types';
import { AuthProvider } from '@/hooks/use-auth';
import ExamPageClient from './ExamPageClient';
import { examCategories } from '@/lib/exam-categories';


const baseExamQuestions: Question[] = [
   {
    questionId: 'q1',
    questionType: 'multipleChoice',
    questionText:
      'Which of the following are the features of the "Rule of Law"?',
    options: [
      'Limited powers',
      'Equality before law',
      "People's responsibility to the Government",
      'Liberty and civil rights',
    ],
    studentAnswer: '',
    correctAnswer: 'Equality before law',
    pointsPossible: 10,
  },
  {
    questionId: 'q2',
    questionType: 'trueFalse',
    questionText:
      'The an-Nizamiyya of Baghdad is considered a model of the madrasas of the later Middle Ages.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q3',
    questionType: 'multipleChoice',
    questionText: 'Who was the founder of the Mauryan Empire in ancient India?',
    options: ['Chandragupta Maurya', 'Ashoka', 'Bindusara', 'Chanakya'],
    studentAnswer: '',
    correctAnswer: 'Chandragupta Maurya',
    pointsPossible: 10,
  },
  {
    questionId: 'q4',
    questionType: 'freeText',
    questionText:
      'Discuss the significance of the Non-Cooperation Movement in the Indian freedom struggle.',
    studentAnswer: '',
    correctAnswer:
      "The Non-Cooperation Movement (1920-22) led by Mahatma Gandhi was a pivotal moment in India's freedom struggle. It was the first instance of a nationwide, mass movement against British rule, promoting non-violent resistance (Satyagraha). It significantly widened the base of the freedom struggle, bringing in peasants, workers, and students, and instilled a new sense of confidence and fearlessness among Indians. It also promoted Indian-made goods (Swadeshi) and led to the boycott of British educational institutions, courts, and legislatures.",
    pointsPossible: 20,
  },
  {
    questionId: 'q5',
    questionType: 'freeText',
    questionText:
      'What are the main functions of the Goods and Services Tax (GST) Council in India?',
    studentAnswer: '',
    correctAnswer:
      'The GST Council is a constitutional body responsible for making recommendations to the Union and State Governments on issues related to the Goods and Services Tax. Its main functions include making recommendations on: the taxes, cesses, and surcharges to be subsumed under GST; the goods and services that may be subjected to or exempted from GST; the model GST laws, principles of levy, and apportionment of IGST; the threshold limit of turnover for exemption from GST; the rates including floor rates with bands of GST; any special rates for a specified period to raise additional resources during any natural calamity or disaster.',
    pointsPossible: 20,
  },
  {
    questionId: 'q6',
    questionType: 'multipleChoice',
    questionText: 'Which of the following is NOT a feature of "Rule of Law"?',
    options: [
      'Arbitrary powers',
      'Equality before law',
      'Supremacy of Law',
      'Liberty and civil rights',
    ],
    studentAnswer: '',
    correctAnswer: 'Arbitrary powers',
    pointsPossible: 10,
  },
  {
    questionId: 'q7',
    questionType: 'trueFalse',
    questionText: 'The concept of "Rule of Law" was first articulated by A.V. Dicey.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q8',
    questionType: 'multipleChoice',
    questionText: 'Who was the last ruler of the Mauryan Empire?',
    options: ['Brihadratha', 'Ashoka', 'Bindusara', 'Chandragupta Maurya'],
    studentAnswer: '',
    correctAnswer: 'Brihadratha',
    pointsPossible: 10,
  },
  {
    questionId: 'q9',
    questionType: 'freeText',
    questionText: 'Explain the main causes of the decline of the Mauryan Empire.',
    studentAnswer: '',
    correctAnswer: 'The decline of the Mauryan Empire was caused by a combination of factors including weak successors to Ashoka, the vastness of the empire making it difficult to control, financial crisis due to a large army and bureaucracy, provincial revolts, and foreign invasions from the northwest.',
    pointsPossible: 20,
  },
  {
    questionId: 'q10',
    questionType: 'freeText',
    questionText: 'What is the composition of the GST Council in India?',
    studentAnswer: '',
    correctAnswer: 'The GST Council is chaired by the Union Finance Minister. Its other members are the Union Minister of State for Finance and the Finance or Taxation Minister of each State. It is a federal body where both the centre and the states get due representation.',
    pointsPossible: 20,
  },
  {
    questionId: 'q11',
    questionType: 'multipleChoice',
    questionText: 'The "Dharma Chakra" in the Indian flag is taken from which monument?',
    options: [
      'Sanchi Stupa',
      'Sarnath Lion Capital',
      'Allahabad Pillar',
      'Lumbini Pillar',
    ],
    studentAnswer: '',
    correctAnswer: 'Sarnath Lion Capital',
    pointsPossible: 10,
  },
  {
    questionId: 'q12',
    questionType: 'trueFalse',
    questionText: 'The Jallianwala Bagh massacre occurred in 1919 in Amritsar.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q13',
    questionType: 'multipleChoice',
    questionText: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Dr. B.R. Ambedkar', 'Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Patel'],
    studentAnswer: '',
    correctAnswer: 'Dr. B.R. Ambedkar',
    pointsPossible: 10,
  },
  {
    questionId: 'q14',
    questionType: 'freeText',
    questionText: 'Describe the key features of the Indian parliamentary system.',
    studentAnswer: '',
    correctAnswer: 'Key features include: 1. Presence of a nominal and real executive. 2. Majority party rule. 3. Collective responsibility of the executive to the legislature. 4. Membership of ministers in the legislature. 5. Leadership of the Prime Minister or Chief Minister. 6. Dissolution of the lower house.',
    pointsPossible: 20,
  },
  {
    questionId: 'q15',
    questionType: 'freeText',
    questionText: 'What are Fundamental Rights in the Indian Constitution? Name any two.',
    studentAnswer: '',
    correctAnswer: 'Fundamental Rights are a set of basic human rights guaranteed to all citizens of India. They are enforceable in a court of law. Examples include: 1. Right to Equality. 2. Right to Freedom.',
    pointsPossible: 20,
  },
  {
    questionId: 'q16',
    questionType: 'multipleChoice',
    questionText: 'Which planet is known as the Red Planet?',
    options: [
      'Mars',
      'Venus',
      'Jupiter',
      'Saturn',
    ],
    studentAnswer: '',
    correctAnswer: 'Mars',
    pointsPossible: 10,
  },
  {
    questionId: 'q17',
    questionType: 'trueFalse',
    questionText: 'The Great Wall of China is visible from the Moon with the naked eye.',
    studentAnswer: '',
    correctAnswer: 'False',
    pointsPossible: 10,
  },
  {
    questionId: 'q18',
    questionType: 'multipleChoice',
    questionText: 'What is the capital of Japan?',
    options: ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    studentAnswer: '',
    correctAnswer: 'Tokyo',
    pointsPossible: 10,
  },
  {
    questionId: 'q19',
    questionType: 'freeText',
    questionText: 'What was the main goal of the Quit India Movement?',
    studentAnswer: '',
    correctAnswer: 'The main goal of the Quit India Movement, launched by Mahatma Gandhi in August 1942, was to demand an end to British rule in India immediately and unconditionally.',
    pointsPossible: 20,
  },
  {
    questionId: 'q20',
    questionType: 'freeText',
    questionText: 'What is the role of the Reserve Bank of India (RBI)?',
    studentAnswer: '',
    correctAnswer: 'The RBI is India\'s central bank. Its primary roles include issuing currency, managing foreign exchange, acting as a banker to the government, and regulating the banking system to ensure financial stability.',
    pointsPossible: 20,
  },
  {
    questionId: 'q21',
    questionType: 'multipleChoice',
    questionText: 'Which river is known as the "Sorrow of Bengal"?',
    options: [
      'Damodar',
      'Ganges',
      'Hooghly',
      'Brahmaputra',
    ],
    studentAnswer: '',
    correctAnswer: 'Damodar',
    pointsPossible: 10,
  },
  {
    questionId: 'q22',
    questionType: 'trueFalse',
    questionText: 'India is the largest democracy in the world.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q23',
    questionType: 'multipleChoice',
    questionText: 'Which of these is a classical dance form of Kerala?',
    options: ['Kathakali', 'Bharatanatyam', 'Odissi', 'Kuchipudi'],
    studentAnswer: '',
    correctAnswer: 'Kathakali',
    pointsPossible: 10,
  },
  {
    questionId: 'q24',
    questionType: 'freeText',
    questionText: 'Differentiate between renewable and non-renewable energy sources.',
    studentAnswer: '',
    correctAnswer: 'Renewable energy sources are naturally replenished, such as solar, wind, and hydro power. Non-renewable energy sources are finite and get depleted with use, such as coal, oil, and natural gas.',
    pointsPossible: 20,
  },
  {
    questionId: 'q25',
    questionType: 'freeText',
    questionText: 'What is the significance of the Preamble to the Indian Constitution?',
    studentAnswer: '',
    correctAnswer: 'The Preamble serves as an introduction to the Constitution and contains its basic philosophy and objectives. It declares India to be a Sovereign, Socialist, Secular, and Democratic Republic and aims to secure justice, liberty, equality, and fraternity for all its citizens.',
    pointsPossible: 20,
  },
  {
    questionId: 'q26',
    questionType: 'multipleChoice',
    questionText: 'Which gas is most abundant in the Earth\'s atmosphere?',
    options: [
      'Nitrogen',
      'Oxygen',
      'Carbon Dioxide',
      'Argon',
    ],
    studentAnswer: '',
    correctAnswer: 'Nitrogen',
    pointsPossible: 10,
  },
  {
    questionId: 'q27',
    questionType: 'trueFalse',
    questionText: 'The Indus Valley Civilization was primarily a rural culture.',
    studentAnswer: '',
    correctAnswer: 'False',
    pointsPossible: 10,
  },
  {
    questionId: 'q28',
    questionType: 'multipleChoice',
    questionText: 'Who wrote the Indian national anthem, "Jana Gana Mana"?',
    options: ['Rabindranath Tagore', 'Bankim Chandra Chatterjee', 'Sarojini Naidu', 'Subramania Bharati'],
    studentAnswer: '',
    correctAnswer: 'Rabindranath Tagore',
    pointsPossible: 10,
  },
  {
    questionId: 'q29',
    questionType: 'freeText',
    questionText: 'Explain the concept of "Satyagraha" as propagated by Mahatma Gandhi.',
    studentAnswer: '',
    correctAnswer: 'Satyagraha, meaning "truth force," was a form of non-violent resistance. It involved passive political resistance, including civil disobedience, fasting, and marches, to oppose unjust laws or policies. It was based on the principles of truth and non-violence (ahimsa).',
    pointsPossible: 20,
  },
  {
    questionId: 'q30',
    questionType: 'freeText',
    questionText: 'What are the three main sectors of the Indian economy?',
    studentAnswer: '',
    correctAnswer: 'The three main sectors are: 1. The Primary sector (agriculture, forestry, fishing). 2. The Secondary sector (manufacturing, construction, industry). 3. The Tertiary sector (services like IT, banking, tourism).',
    pointsPossible: 20,
  },
  {
    questionId: 'q31',
    questionType: 'multipleChoice',
    questionText: 'Which is the highest peak in the world?',
    options: [
      'Mount Everest',
      'K2',
      'Kangchenjunga',
      'Lhotse',
    ],
    studentAnswer: '',
    correctAnswer: 'Mount Everest',
    pointsPossible: 10,
  },
  {
    questionId: 'q32',
    questionType: 'trueFalse',
    questionText: 'The Rajya Sabha, the upper house of the Indian Parliament, is a permanent body and is not subject to dissolution.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q33',
    questionType: 'multipleChoice',
    questionText: 'Which was the first satellite launched by India?',
    options: ['Aryabhata', 'Bhaskara', 'Rohini', 'INSAT-1A'],
    studentAnswer: '',
    correctAnswer: 'Aryabhata',
    pointsPossible: 10,
  },
  {
    questionId: 'q34',
    questionType: 'freeText',
    questionText: 'What is the difference between weather and climate?',
    studentAnswer: '',
    correctAnswer: 'Weather refers to short-term atmospheric conditions in a specific place, such as temperature, humidity, and rainfall. Climate refers to the long-term average of weather patterns in a region, typically over 30 years or more.',
    pointsPossible: 20,
  },
  {
    questionId: 'q35',
    questionType: 'freeText',
    questionText: 'What are Directive Principles of State Policy in the Indian Constitution?',
    studentAnswer: '',
    correctAnswer: 'The Directive Principles are guidelines for the central and state governments of India to be kept in mind while framing laws and policies. Unlike Fundamental Rights, they are not enforceable by the courts, but are considered fundamental in the governance of the country.',
    pointsPossible: 20,
  },
  {
    questionId: 'q36',
    questionType: 'multipleChoice',
    questionText: 'The Battle of Plassey was fought in which year?',
    options: [
      '1757',
      '1764',
      '1857',
      '1748',
    ],
    studentAnswer: '',
    correctAnswer: '1757',
    pointsPossible: 10,
  },
  {
    questionId: 'q37',
    questionType: 'trueFalse',
    questionText: 'The Tropic of Cancer passes through India.',
    studentAnswer: '',
    correctAnswer: 'True',
    pointsPossible: 10,
  },
  {
    questionId: 'q38',
    questionType: 'multipleChoice',
    questionText: 'Who is the current Governor of the Reserve Bank of India?',
    options: ['Shaktikanta Das', 'Urjit Patel', 'Raghuram Rajan', 'Nirmala Sitharaman'],
    studentAnswer: '',
    correctAnswer: 'Shaktikanta Das',
    pointsPossible: 10,
  },
  {
    questionId: 'q39',
    questionType: 'freeText',
    questionText: 'What is the Green Revolution and its impact on India?',
    studentAnswer: '',
    correctAnswer: 'The Green Revolution was a period in the 1960s when Indian agriculture was converted into an industrial system due to the adoption of modern methods and technology, such as high-yielding variety (HYV) seeds, tractors, irrigation facilities, and pesticides. It led to a massive increase in food grain production, making India self-sufficient in food.',
    pointsPossible: 20,
  },
  {
    questionId: 'q40',
    questionType: 'freeText',
    questionText: 'What is the role of the Election Commission of India?',
    studentAnswer: '',
    correctAnswer: 'The Election Commission of India is an autonomous constitutional authority responsible for administering election processes in India. Its main functions include preparing electoral rolls, supervising and conducting elections to Parliament and state legislatures, and recognizing political parties.',
    pointsPossible: 20,
  },
  {
    questionId: 'q41',
    questionType: 'multipleChoice',
    questionText: 'What is the currency of Russia?',
    options: [
      'Ruble',
      'Rupee',
      'Yen',
      'Euro',
    ],
    studentAnswer: '',
    correctAnswer: 'Ruble',
    pointsPossible: 10,
  },
  {
    questionId: 'q42',
    questionType: 'trueFalse',
    questionText: 'The Amazon rainforest is primarily located in Africa.',
    studentAnswer: '',
    correctAnswer: 'False',
    pointsPossible: 10,
  },
  {
    questionId: 'q43',
    questionType: 'multipleChoice',
    questionText: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo'],
    studentAnswer: '',
    correctAnswer: 'Leonardo da Vinci',
    pointsPossible: 10,
  },
  {
    questionId: 'q44',
    questionType: 'freeText',
    questionText: 'Explain the importance of the Himalayas to India.',
    studentAnswer: '',
    correctAnswer: 'The Himalayas are crucial for India as they act as a natural barrier against cold northern winds, are the source of major perennial rivers like the Ganges and Brahmaputra, influence the monsoon climate, and are home to a rich biodiversity.',
    pointsPossible: 20,
  },
  {
    questionId: 'q45',
    questionType: 'freeText',
    questionText: 'What is a "writ" in the context of the Indian judicial system?',
    studentAnswer: '',
    correctAnswer: 'A writ is a formal written order issued by a court. The Supreme Court and High Courts in India can issue writs like Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto to enforce Fundamental Rights.',
    pointsPossible: 20,
  },
  {
    questionId: 'q46',
    questionType: 'multipleChoice',
    questionText: 'The "Silicon Valley of India" refers to which city?',
    options: [
      'Bengaluru',
      'Hyderabad',
      'Pune',
      'Mumbai',
    ],
    studentAnswer: '',
    correctAnswer: 'Bengaluru',
    pointsPossible: 10,
  },
  {
    questionId: 'q47',
    questionType: 'trueFalse',
    questionText: 'The President of India is directly elected by the people.',
    studentAnswer: '',
    correctAnswer: 'False',
    pointsPossible: 10,
  },
  {
    questionId: 'q48',
    questionType: 'multipleChoice',
    questionText: 'Which Mughal emperor built the Taj Mahal?',
    options: ['Shah Jahan', 'Akbar', 'Jahangir', 'Aurangzeb'],
    studentAnswer: '',
    correctAnswer: 'Shah Jahan',
    pointsPossible: 10,
  },
  {
    questionId: 'q49',
    questionType: 'freeText',
    questionText: 'What is the main objective of the Make in India initiative?',
    studentAnswer: '',
    correctAnswer: 'The main objective of the Make in India initiative, launched in 2014, is to transform India into a global design and manufacturing hub. It aims to encourage companies to manufacture their products in India and increase investment, foster innovation, and create employment opportunities.',
    pointsPossible: 20,
  },
  {
    questionId: 'q50',
    questionType: 'freeText',
    questionText: 'What are the main functions of the United Nations (UN)?',
    studentAnswer: '',
    correctAnswer: 'The main functions of the UN are maintaining international peace and security, promoting friendly relations among nations, achieving international cooperation in solving economic, social, cultural, or humanitarian problems, and being a center for harmonizing the actions of nations.',
    pointsPossible: 20,
  },
];

export const sampleExams: Record<string, Exam> = {
  'upsc-pre-2023-gs1': {
    student: {
      name: 'Priya Sharma',
      id: 'student-002',
      avatarUrl: 'https://placehold.co/100x100.png',
    },
    examName: 'UPSC Civil Services Prelims 2023 - GS Paper 1',
    examId: 'upsc-pre-2023-gs1',
    questions: baseExamQuestions.slice(0,5),
  },
  'ssc-cgl-2023-tier1': {
    student: { name: 'Amit Kumar', id: 'student-003' },
    examName: 'SSC CGL 2023 - Tier 1',
    examId: 'ssc-cgl-2023-tier1',
    questions: baseExamQuestions.slice(5, 10),
  },
   'gate-2024-cs': {
    student: { name: 'Sunita Rao', id: 'student-004' },
    examName: 'GATE 2024 - Computer Science',
    examId: 'gate-2024-cs',
    questions: baseExamQuestions.slice(10, 15),
  },
};

const allExams = examCategories.flatMap(category => category.exams);

// Populate sampleExams with all defined exams
allExams.forEach(exam => {
  if (!sampleExams[exam.examId]) {
    // For demonstration, we'll cycle through the base questions.
    // In a real app, you'd fetch exam-specific questions.
    const questionCount = baseExamQuestions.length;
    const examIndex = allExams.findIndex(e => e.examId === exam.examId);
    const start = (examIndex * 5) % questionCount;
    const end = start + 5;
    const examQuestions = baseExamQuestions.slice(start, end);


    sampleExams[exam.examId] = {
      student: { name: 'Student', id: 'student-001' },
      examName: exam.examName,
      examId: exam.examId,
      questions: examQuestions,
    };
  }
});


export default function ExamPage({ params }: { params: { examId: string } }) {
  // We can fetch exam data here based on examId in a real app
  // For now, we'll pass the whole sampleExams object
  return (
    <AuthProvider>
      <ExamPageClient params={params} sampleExams={sampleExams} />
    </AuthProvider>
  );
}

// This function is needed for static export. It runs on the server at build time.
export function generateStaticParams() {
  const allExamIds = Object.keys(sampleExams);
  return allExamIds.map((id) => ({
    examId: id,
  }));
}
