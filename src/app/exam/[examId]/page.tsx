
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileText, LogOut, Settings, Home as HomeIcon, History } from 'lucide-react';
import type { Exam } from '@/lib/types';
import { ExamView } from '@/components/exam-view';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// In a real app, you would fetch this data based on the examId
const sampleExams: Record<string, Exam> = {
  'upsc-pre-2023-gs1': {
    student: {
      name: 'Priya Sharma',
      id: 'student-002',
      avatarUrl: 'https://placehold.co/100x100.png',
    },
    examName: 'UPSC Civil Services Prelims 2023 - GS Paper 1',
    examId: 'upsc-pre-2023-gs1',
    questions: [
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
    ],
  },
  'ssc-cgl-2023-tier1': {
    student: { name: 'Amit Kumar', id: 'student-003' },
    examName: 'SSC CGL 2023 - Tier 1',
    examId: 'ssc-cgl-2023-tier1',
    questions: [/* ... SSC questions ... */],
  },
   'gate-2024-cs': {
    student: { name: 'Sunita Rao', id: 'student-004' },
    examName: 'GATE 2024 - Computer Science',
    examId: 'gate-2024-cs',
    questions: [/* ... GATE questions ... */],
  },
};

const baseExamQuestions = [
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


const examCategories = [
  {
    category: 'Civil Services & Government Jobs',
    exams: [
        { examId: 'upsc-civil-services', examName: 'UPSC Civil Services Exam (IAS, IPS, IFS, etc.)', description: 'Central Civil Services of the Government of India.' },
        { examId: 'ssc-cgl-chsl-mts-je', examName: 'SSC CGL / CHSL / MTS / JE', description: 'Staff Selection Commission exams for various government posts.' },
        { examId: 'rrb-exams', examName: 'RRB Exams (NTPC, ALP, Group D)', description: 'Railway Recruitment Board exams for various railway posts.' },
        { examId: 'ibps-exams', examName: 'IBPS Exams (PO, Clerk, RRB, SO)', description: 'Institute of Banking Personnel Selection exams for banking careers.' },
        { examId: 'sbi-po-clerk-so', examName: 'SBI PO / Clerk / SO', description: 'State Bank of India exams for various banking roles.' },
        { examId: 'lic-aao-ado', examName: 'LIC AAO / ADO', description: 'Life Insurance Corporation exams for officer roles.' },
        { examId: 'nabard-grade-a-b', examName: 'NABARD Grade A & B', description: 'National Bank for Agriculture and Rural Development officer exams.' },
        { examId: 'rbi-grade-b-assistant', examName: 'RBI Grade B / Assistant', description: 'Reserve Bank of India exams for officer and assistant roles.' },
        { examId: 'indian-coast-guard', examName: 'Indian Coast Guard Exam', description: 'Recruitment exam for the Indian Coast Guard.' },
        { examId: 'nda', examName: 'NDA (National Defence Academy)', description: 'For admission to the Army, Navy, and Air Force wings of the NDA.' },
        { examId: 'cds', examName: 'CDS (Combined Defence Services)', description: 'For recruitment into the Indian Military Academy, Officers Training Academy, etc.' },
        { examId: 'afcat', examName: 'AFCAT (Air Force Common Admission Test)', description: 'For selection of officers in all branches of the Indian Air Force.' },
        { examId: 'capf', examName: 'CAPF (Central Armed Police Forces)', description: 'Recruitment of Assistant Commandants in the Central Armed Police Forces.' },
    ]
  },
  {
    category: 'Engineering & Technical',
    exams: [
        { examId: 'jee-main-advanced', examName: 'JEE Main / JEE Advanced', description: 'For admission to undergraduate engineering programs in IITs, NITs, etc.' },
        { examId: 'gate', examName: 'GATE (Graduate Aptitude Test in Engineering)', description: 'For admission to postgraduate engineering programs and PSU recruitment.' },
        { examId: 'isro-drdo', examName: 'ISRO / DRDO Recruitment', description: 'Recruitment exams for scientists and engineers in space and defense organizations.' },
        { examId: 'psu-recruitment', examName: 'BHEL / NTPC / ONGC / IOCL Recruitments', description: 'Recruitment for various Public Sector Undertakings.' },
        { examId: 'barc-oces-dgfs', examName: 'BARC OCES/DGFS', description: 'Bhabha Atomic Research Centre training schemes for engineers and scientists.' },
    ]
  },
  {
      category: 'Medical / Science / Research',
      exams: [
          { examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.' },
          { examId: 'aiims-jipmer', examName: 'AIIMS / JIPMER Entrance Exams', description: 'Entrance exams for premier medical colleges.' },
          { examId: 'icmr-jrf', examName: 'ICMR JRF', description: 'Indian Council of Medical Research Junior Research Fellowship.' },
          { examId: 'csir-ugc-net', examName: 'CSIR-UGC NET', description: 'For Junior Research Fellowship and Lectureship in science subjects.' },
          { examId: 'ugc-net', examName: 'UGC NET', description: 'For Lectureship/JRF in various subjects.' },
      ]
  },
  {
      category: 'Law / Commerce / Management',
      exams: [
          { examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.' },
          { examId: 'ca', examName: 'CA Foundation / Intermediate / Final', description: 'Chartered Accountancy exams.' },
          { examId: 'cs', examName: 'CS (Company Secretary)', description: 'Company Secretary professional exams.' },
          { examId: 'cma', examName: 'CMA', description: 'Cost and Management Accountancy exams.' },
          { examId: 'cat', examName: 'CAT (MBA Entrance)', description: 'Common Admission Test for MBA programs.' },
          { examId: 'xat-snap-nmat', examName: 'XAT / SNAP / NMAT / MAT / CMAT', description: 'Other popular MBA entrance exams.' },
          { examId: 'iift-tissnet', examName: 'IIFT / TISSNET', description: 'Entrance exams for management courses at IIFT and TISS.' },
      ]
  },
  {
      category: 'School / Junior Level',
      exams: [
          { examId: 'ntse', examName: 'NTSE (National Talent Search Exam)', description: 'National level scholarship program for school students.' },
          { examId: 'kvpy', examName: 'KVPY (Now merged with INSPIRE)', description: 'Scholarship program to encourage students to take up research careers.' },
          { examId: 'olympiads', examName: 'Olympiads (NSO, IMO, IEO, etc.)', description: 'Various national and international Olympiads for school students.' },
          { examId: 'rmo-inmo', examName: 'RMO / INMO (Math Olympiad)', description: 'Mathematical Olympiad program in India.' },
      ]
  },
  {
      category: 'Andhra Pradesh Public Service Commission (APPSC)',
      exams: [
          { examId: 'appsc-group1', examName: 'APPSC Group 1', description: 'Executive & Administrative Services in Andhra Pradesh.' },
          { examId: 'appsc-group2', examName: 'APPSC Group 2', description: 'Non-Executive Posts in Andhra Pradesh.' },
          { examId: 'appsc-group3', examName: 'APPSC Group 3', description: 'Panchayat Secretary and other posts in Andhra Pradesh.' },
          { examId: 'appsc-group4', examName: 'APPSC Group 4', description: 'Clerical posts in Andhra Pradesh.' },
          { examId: 'appsc-ae-aee', examName: 'APPSC AE / AEE', description: 'Assistant Engineer/Assistant Executive Engineer jobs in AP.' },
      ]
  },
  {
      category: 'Andhra Pradesh - Police & Defence',
      exams: [
          { examId: 'ap-police-si', examName: 'AP Police SI Exam', description: 'Andhra Pradesh Police Sub-Inspector recruitment.' },
          { examId: 'ap-police-constable', examName: 'AP Police Constable Exam', description: 'Andhra Pradesh Police Constable recruitment.' },
          { examId: 'ap-fire-services', examName: 'AP Fire Services Exams', description: 'Recruitment for Andhra Pradesh State Disaster Response & Fire Services.' },
          { examId: 'ap-jail-warder', examName: 'AP Jail Warder', description: 'Recruitment for prison department staff in Andhra Pradesh.' },
      ]
  },
  {
      category: 'Andhra Pradesh - Educational Service Exams',
      exams: [
          { examId: 'ap-tet', examName: 'AP TET (Teacher Eligibility Test)', description: 'Andhra Pradesh Teacher Eligibility Test.' },
          { examId: 'ap-dsc', examName: 'AP DSC (Teacher Recruitment)', description: 'Andhra Pradesh District Selection Committee for teacher recruitment.' },
          { examId: 'apset', examName: 'APSET (State Eligibility Test for Lecturers)', description: 'AP State Eligibility Test for Assistant Professor/Lecturer.' },
          { examId: 'deecet', examName: 'DEECET (Diploma in Elementary Education CET)', description: 'AP Diploma in Elementary Education Common Entrance Test.' },
      ]
  },
  {
      category: 'Andhra Pradesh - Entrance Exams (Higher Education)',
      exams: [
          { examId: 'ap-eapcet', examName: 'EAMCET (AP EAPCET)', description: 'Engineering, Agriculture, Pharmacy Common Entrance Test.' },
          { examId: 'ap-ecet', examName: 'ECET', description: 'For Diploma Holders entry into B.Tech courses in AP.' },
          { examId: 'ap-icet', examName: 'ICET', description: 'Integrated Common Entrance Test for MBA/MCA admissions in AP.' },
          { examId: 'ap-lawcet', examName: 'LAWCET / PGLCET', description: 'Law Common Entrance Test for AP.' },
          { examId: 'ap-edcet', examName: 'EDCET', description: 'Education Common Entrance Test for B.Ed admissions in AP.' },
          { examId: 'ap-pgcet', examName: 'PGCET', description: 'Post Graduate Common Entrance Test for AP.' },
          { examId: 'ap-polycet', examName: 'POLYCET', description: 'Polytechnic Common Entrance Test for AP.' },
      ]
  },
  {
      category: 'Andhra Pradesh - Health & Paramedical',
      exams: [
          { examId: 'ap-medical-officer', examName: 'APPSC Medical Officer Recruitment', description: 'Recruitment for Medical Officers in AP.' },
          { examId: 'ap-paramedical', examName: 'AP Paramedical Recruitment', description: 'For Staff Nurse, Pharmacist, etc. in AP.' },
          { examId: 'ap-ayush', examName: 'AP Ayush Department Exams', description: 'Exams for the Department of Ayurveda, Yoga, Unani, Siddha and Homoeopathy.' },
      ]
  }
];

const allExams = examCategories.flatMap(category => category.exams);

allExams.forEach(exam => {
  if (!sampleExams[exam.examId]) {
    sampleExams[exam.examId] = {
      student: { name: 'Student', id: 'student-001' },
      examName: exam.examName,
      examId: exam.examId,
      questions: baseExamQuestions,
    };
  }
});


function ExamPage({ params }: { params: { examId: string } }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { examId } = params;
  const exam = sampleExams[examId];

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/exam/${examId}`);
    }
  }, [user, loading, router, examId]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
       <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Exam not found</h1>
          <p className="text-muted-foreground">This exam does not exist or has been moved.</p>
          <Button asChild className="mt-4">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Update student name from logged in user
  exam.student.name = user.displayName || user.email || 'Student';
  if(user.photoURL) {
    exam.student.avatarUrl = user.photoURL;
  }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GethubLogo className="w-8 h-8 text-primary" width={32} height={32} />
            <span className="text-lg font-semibold">GETHUB</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
               <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Homepage">
                    <HomeIcon />
                    <span>Homepage</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/history">
                  <SidebarMenuButton tooltip="Exam History">
                    <History />
                    <span>History</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Exams</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={exam.examName} isActive>
                  <FileText />
                  <span>{exam.examName}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Profile">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt="@teacher" data-ai-hint="teacher portrait"/>
                  <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{user.displayName || user.email}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" onClick={logout}>
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={exam.student.avatarUrl} alt={exam.student.name} data-ai-hint="student portrait" />
                <AvatarFallback>{exam.student.name[0]}</AvatarFallback>
              </Avatar>
              {exam.student.name}
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          <ExamView exam={exam} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


function SidebarInset({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex-1">{children}</div>
  )
}

export default function ExamPageWrapper({ params }: { params: { examId: string } }) {
  return (
    <AuthProvider>
      <ExamPage params={params} />
    </AuthProvider>
  );
}
