
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
      { examId: 'rrb-exams', examName: 'RRB Exams (NTPC, ALP, Group D)', description: 'Railway Recruitment Board exams for various railway posts.', syllabus: [] },
      { examId: 'ibps-exams', examName: 'IBPS Exams (PO, Clerk, RRB, SO)', description: 'Institute of Banking Personnel Selection exams for banking careers.', syllabus: [] },
      { examId: 'rbi-grade-b', examName: 'RBI Grade B Officer', description: 'Recruitment for managerial positions in the Reserve Bank of India.', syllabus: [] },
      { examId: 'nabard-grade-a', examName: 'NABARD Grade A & B', description: 'Recruitment for officer level posts in National Bank for Agriculture and Rural Development.', syllabus: [] },
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
      { examId: 'ese', examName: 'Engineering Services Examination (ESE)', description: 'For recruitment into technical and managerial posts of Indian government.', syllabus: [] },
      { examId: 'isro-scientist', examName: 'ISRO Scientist/Engineer', description: 'Recruitment of scientists and engineers for the Indian Space Research Organisation.', syllabus: [] },
    ],
  },
  { 
    category: 'Medical / Science / Research', 
    exams: [
      { examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.', syllabus: [] },
      { examId: 'aiims-pg', examName: 'AIIMS PG', description: 'Postgraduate entrance exam for All India Institute of Medical Sciences.', syllabus: [] },
      { examId: 'icmr-jrf', examName: 'ICMR JRF', description: 'Junior Research Fellowship exam by Indian Council of Medical Research.', syllabus: [] },
      { examId: 'csir-ugc-net', examName: 'CSIR UGC NET', description: 'For determining eligibility for lectureship and for award of JRF in sciences.', syllabus: [] },
    ] 
  },
  { 
    category: 'Law / Commerce / Management', 
    exams: [
      { examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.', syllabus: [] },
      { examId: 'cat', examName: 'Common Admission Test (CAT)', description: 'For admission into postgraduate management programs in IIMs.', syllabus: [] },
      { examId: 'ugc-net', examName: 'UGC NET', description: 'For determining eligibility for lectureship and for award of JRF in humanities.', syllabus: [] },
      { examId: 'ca-cpt', examName: 'CA Foundation / CPT', description: 'Chartered Accountancy Common Proficiency Test for aspiring CAs.', syllabus: [] },
    ] 
  },
  { 
    category: 'Defence Services',
    exams: [
      { examId: 'nda-na', examName: 'NDA & NA Exam', description: 'National Defence Academy & Naval Academy Examination.', syllabus: [] },
      { examId: 'cds', examName: 'Combined Defence Services (CDS) Exam', description: 'For recruitment into the Indian Military Academy, Officers Training Academy, etc.', syllabus: [] },
      { examId: 'afcat', examName: 'AFCAT', description: 'The Air Force Common Admission Test for entry into the Indian Air Force.', syllabus: [] },
    ],
  },
  {
    category: 'State-Level Exams',
    exams: [
      { examId: 'appsc-group1', examName: 'Andhra Pradesh PSC Group 1', description: 'State-level civil services exam for posts in Andhra Pradesh.', syllabus: [] },
      { examId: 'appsc-group2', examName: 'Andhra Pradesh PSC Group 2', description: 'State-level exam for executive and non-executive posts in AP.', syllabus: [] },
      { examId: 'tspsc-group1', examName: 'Telangana PSC Group 1', description: 'State-level civil services exam for posts in Telangana.', syllabus: [] },
      { examId: 'tnpsc-group1', examName: 'Tamil Nadu PSC Group 1', description: 'State-level civil services exam for posts in Tamil Nadu.', syllabus: [] },
      { examId: 'uppsc-pcs', examName: 'UPPSC PCS', description: 'Provincial Civil Services exam for administrative roles in Uttar Pradesh.', syllabus: [] },
    ]
  },
  { 
    category: 'School / Junior Level', 
    exams: [
      { examId: 'ntse', examName: 'NTSE (National Talent Search Exam)', description: 'National level scholarship program for school students.', syllabus: [] },
      { examId: 'olympiads', examName: 'Science, Math, English Olympiads', description: 'National and international competitive exams for school students.', syllabus: [] },
    ] 
  },
];
