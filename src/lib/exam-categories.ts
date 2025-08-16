
import type { ExamDetails } from '@/lib/types';

interface ExamCategory {
  category: string;
  exams: ExamDetails[];
}

export const examCategories: ExamCategory[] = [
  {
    category: 'Civil Services & Government Jobs',
    exams: [
      {
        examId: 'upsc-civil-services',
        examName: 'UPSC Civil Services Exam (IAS, IPS, IFS, etc.)',
        description: 'Central Civil Services of the Government of India.',
        syllabus: [
          {
            topicId: 'indian-history',
            topicName: 'Indian History',
            description: 'Ancient, Medieval and Modern Indian History.',
            materials: {
              notes: [{ name: 'Ancient History PDF', url: '#' }, { name: 'Modern History Notes', url: '#' }],
              videos: [{ name: 'Complete History Revision', url: '#' }],
            },
          },
          {
            topicId: 'indian-polity',
            topicName: 'Indian Polity & Governance',
            description: 'Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, etc.',
            materials: {
              notes: [{ name: 'Polity Notes PDF', url: '#' }],
              videos: [{ name: 'Laxmikanth Summary Series', url: '#' }],
            },
          },
           {
            topicId: 'geography',
            topicName: 'Geography',
            description: 'Indian and World Geography - Physical, Social, Economic Geography of India and the World.',
            materials: {
              notes: [{ name: 'Geography NCERT Summary', url: '#' }],
              videos: [{ name: 'Physical Geography Explained', url: '#' }],
            },
          },
        ],
      },
      {
        examId: 'ssc-cgl-chsl-mts-je',
        examName: 'SSC CGL / CHSL / MTS / JE',
        description: 'Staff Selection Commission exams for various government posts.',
        syllabus: [
           {
            topicId: 'quantitative-aptitude',
            topicName: 'Quantitative Aptitude',
            description: 'Number Systems, Percentages, Profit & Loss, Time & Work, etc.',
            materials: {
              notes: [{ name: 'Quant Formulas PDF', url: '#' }],
              videos: [{ name: 'Top 50 Quant Tricks', url: '#' }],
            },
          },
           {
            topicId: 'general-intelligence',
            topicName: 'General Intelligence & Reasoning',
            description: 'Analogies, Classification, Coding-Decoding, Syllogism, etc.',
            materials: {
              notes: [{ name: 'Reasoning Notes', url: '#' }],
              videos: [{ name: 'How to solve Syllogism', url: '#' }],
            },
          },
        ]
      },
      // Simplified for brevity
      { examId: 'rrb-exams', examName: 'RRB Exams (NTPC, ALP, Group D)', description: 'Railway Recruitment Board exams for various railway posts.', syllabus: [] },
      { examId: 'ibps-exams', examName: 'IBPS Exams (PO, Clerk, RRB, SO)', description: 'Institute of Banking Personnel Selection exams for banking careers.', syllabus: [] },
    ],
  },
  {
    category: 'Engineering & Technical',
    exams: [
      {
        examId: 'gate',
        examName: 'GATE (Graduate Aptitude Test in Engineering)',
        description: 'For admission to postgraduate engineering programs and PSU recruitment.',
        syllabus: [
           {
            topicId: 'engineering-mathematics',
            topicName: 'Engineering Mathematics',
            description: 'Linear Algebra, Calculus, Differential Equations, Probability and Statistics.',
            materials: {
              notes: [{ name: 'Maths Formulas PDF', url: '#' }],
              videos: [{ name: 'Calculus in One Shot', url: '#' }],
            },
          },
          {
            topicId: 'data-structures',
            topicName: 'Data Structures & Algorithms',
            description: 'Searching, sorting, hashing, asymptotic worst case time and space complexity, algorithm design techniques.',
            materials: {
              notes: [{ name: 'DSA Notes', url: '#' }],
              videos: [{ name: 'Dynamic Programming Masterclass', url: '#' }],
            },
          }
        ]
      },
      { examId: 'jee-main-advanced', examName: 'JEE Main / JEE Advanced', description: 'For admission to undergraduate engineering programs in IITs, NITs, etc.', syllabus: [] },
    ],
  },
  // Add other categories and exams similarly...
  { category: 'Medical / Science / Research', exams: [{ examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.', syllabus: [] },] },
  { category: 'Law / Commerce / Management', exams: [{ examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.', syllabus: [] },] },
  { category: 'School / Junior Level', exams: [{ examId: 'ntse', examName: 'NTSE (National Talent Search Exam)', description: 'National level scholarship program for school students.', syllabus: [] },] },
];
