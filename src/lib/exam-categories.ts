
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
          stages: [
            {
              stageId: 'prelims',
              stageName: 'Preliminary Examination',
              papers: [
                {
                  paperId: 'GS-Paper-I',
                  paperName: 'General Studies Paper I',
                  type: 'Objective (MCQ)',
                  duration: '2 hours',
                  totalMarks: 200,
                  totalQuestions: 100,
                  negativeMarking: '1/3 per wrong answer',
                  topics: [
                    'Current events of national and international importance',
                    'History of India and Indian National Movement',
                    'Indian & World Geography',
                    'Indian Polity and Governance',
                    'Economic and Social Development',
                    'Environmental Ecology, Biodiversity & Climate Change',
                    'General Science',
                  ],
                },
                {
                  paperId: 'CSAT',
                  paperName: 'General Studies Paper II (CSAT)',
                  type: 'Objective (MCQ, Qualifying)',
                  duration: '2 hours',
                  totalMarks: 200,
                  totalQuestions: 80,
                  negativeMarking: '1/3 per wrong answer',
                  qualifyingMarks: '33%',
                  topics: [
                    'Comprehension',
                    'Interpersonal and communication skills',
                    'Logical reasoning & analytical ability',
                    'Decision making & problem solving',
                    'General mental ability',
                    'Basic numeracy and data interpretation (Class X level)',
                  ],
                },
              ],
            },
            {
              stageId: 'mains',
              stageName: 'Main Examination',
              papers: [
                {
                  paperId: 'A',
                  paperName: 'Paper A – Indian Language (Qualifying)',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 300,
                  qualifying: true,
                  notes: 'Marks not counted for ranking; minimum 25% required to qualify',
                },
                {
                  paperId: 'B',
                  paperName: 'Paper B – English (Qualifying)',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 300,
                  qualifying: true,
                  notes: 'Marks not counted for ranking; minimum 25% required to qualify',
                },
                {
                  paperId: 'Essay',
                  paperName: 'Essay',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                },
                {
                  paperId: 'GS-1',
                  paperName: 'General Studies-I',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                  topics: [
                    'Indian Heritage and Culture',
                    'History (Modern & World)',
                    'Society (Diversity, Poverty, Empowerment)',
                    'World & Indian Geography',
                  ],
                },
                {
                  paperId: 'GS-2',
                  paperName: 'General Studies-II',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                  topics: [
                    'Indian Constitution and Polity',
                    'Governance and Social Justice',
                    'International Relations',
                  ],
                },
                {
                  paperId: 'GS-3',
                  paperName: 'General Studies-III',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                  topics: [
                    'Indian Economy',
                    'Technology & Biodiversity',
                    'Environment & Disaster Management',
                    'Internal Security',
                  ],
                },
                {
                  paperId: 'GS-4',
                  paperName: 'General Studies-IV',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                  topics: [
                    'Ethics, Integrity & Aptitude',
                    'Emotional Intelligence',
                    'Probity in Governance',
                  ],
                },
                {
                  paperId: 'Optional-I',
                  paperName: 'Optional Subject – Paper I',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                },
                {
                  paperId: 'Optional-II',
                  paperName: 'Optional Subject – Paper II',
                  type: 'Descriptive',
                  duration: '3 hours',
                  totalMarks: 250,
                },
              ],
              personalityTest: {
                stageName: 'Personality Test / Interview',
                totalMarks: 275,
              },
            },
          ],
          totalMarks: 2025,
        },
        { examId: 'ssc-cgl-chsl-mts-je', examName: 'SSC CGL / CHSL / MTS / JE', description: 'Staff Selection Commission exams for various government posts.', stages: [] },
        { examId: 'rrb-exams', examName: 'RRB Exams (NTPC, ALP, Group D)', description: 'Railway Recruitment Board exams for various railway posts.', stages: [] },
        { examId: 'ibps-exams', examName: 'IBPS Exams (PO, Clerk, RRB, SO)', description: 'Institute of Banking Personnel Selection exams for banking careers.', stages: [] },
        { examId: 'sbi-po-clerk-so', examName: 'SBI PO / Clerk / SO', description: 'State Bank of India exams for various banking roles.', stages: [] },
        { examId: 'lic-aao-ado', examName: 'LIC AAO / ADO', description: 'Life Insurance Corporation exams for officer roles.', stages: [] },
        { examId: 'nabard-grade-a-b', examName: 'NABARD Grade A & B', description: 'National Bank for Agriculture and Rural Development officer exams.', stages: [] },
        { examId: 'rbi-grade-b-assistant', examName: 'RBI Grade B / Assistant', description: 'Reserve Bank of India exams for officer and assistant roles.', stages: [] },
        { examId: 'indian-coast-guard', examName: 'Indian Coast Guard Exam', description: 'Recruitment exam for the Indian Coast Guard.', stages: [] },
        { examId: 'nda', examName: 'NDA (National Defence Academy)', description: 'For admission to the Army, Navy, and Air Force wings of the NDA.', stages: [] },
        { examId: 'cds', examName: 'CDS (Combined Defence Services)', description: 'For recruitment into the Indian Military Academy, Officers Training Academy, etc.', stages: [] },
        { examId: 'afcat', examName: 'AFCAT (Air Force Common Admission Test)', description: 'For selection of officers in all branches of the Indian Air Force.', stages: [] },
        { examId: 'capf', examName: 'CAPF (Central Armed Police Forces)', description: 'Recruitment of Assistant Commandants in the Central Armed Police Forces.', stages: [] },
    ]
  },
  {
    category: 'Engineering & Technical',
    exams: [
        { examId: 'jee-main-advanced', examName: 'JEE Main / JEE Advanced', description: 'For admission to undergraduate engineering programs in IITs, NITs, etc.', stages: [] },
        { examId: 'gate', examName: 'GATE (Graduate Aptitude Test in Engineering)', description: 'For admission to postgraduate engineering programs and PSU recruitment.', stages: [] },
        { examId: 'isro-drdo', examName: 'ISRO / DRDO Recruitment', description: 'Recruitment exams for scientists and engineers in space and defense organizations.', stages: [] },
        { examId: 'psu-recruitment', examName: 'BHEL / NTPC / ONGC / IOCL Recruitments', description: 'Recruitment for various Public Sector Undertakings.', stages: [] },
        { examId: 'barc-oces-dgfs', examName: 'BARC OCES/DGFS', description: 'Bhabha Atomic Research Centre training schemes for engineers and scientists.', stages: [] },
    ]
  },
  {
      category: 'Medical / Science / Research',
      exams: [
          { examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.', stages: [] },
          { examId: 'aiims-jipmer', examName: 'AIIMS / JIPMER Entrance Exams', description: 'Entrance exams for premier medical colleges.', stages: [] },
          { examId: 'icmr-jrf', examName: 'ICMR JRF', description: 'Indian Council of Medical Research Junior Research Fellowship.', stages: [] },
          { examId: 'csir-ugc-net', examName: 'CSIR-UGC NET', description: 'For Junior Research Fellowship and Lectureship in science subjects.', stages: [] },
          { examId: 'ugc-net', examName: 'UGC NET', description: 'For Lectureship/JRF in various subjects.', stages: [] },
      ]
  },
  {
      category: 'Law / Commerce / Management',
      exams: [
          { examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.', stages: [] },
          { examId: 'ca', examName: 'CA Foundation / Intermediate / Final', description: 'Chartered Accountancy exams.', stages: [] },
          { examId: 'cs', examName: 'CS (Company Secretary)', description: 'Company Secretary professional exams.', stages: [] },
          { examId: 'cma', examName: 'CMA', description: 'Cost and Management Accountancy exams.', stages: [] },
          { examId: 'cat', examName: 'CAT (MBA Entrance)', description: 'Common Admission Test for MBA programs.', stages: [] },
          { examId: 'xat-snap-nmat', examName: 'XAT / SNAP / NMAT / MAT / CMAT', description: 'Other popular MBA entrance exams.', stages: [] },
          { examId: 'iift-tissnet', examName: 'IIFT / TISSNET', description: 'Entrance exams for management courses at IIFT and TISS.', stages: [] },
      ]
  },
  {
      category: 'School / Junior Level',
      exams: [
          { examId: 'ntse', examName: 'NTSE (National Talent Search Exam)', description: 'National level scholarship program for school students.', stages: [] },
          { examId: 'kvpy', examName: 'KVPY (Now merged with INSPIRE)', description: 'Scholarship program to encourage students to take up research careers.', stages: [] },
          { examId: 'olympiads', examName: 'Olympiads (NSO, IMO, IEO, etc.)', description: 'Various national and international Olympiads for school students.', stages: [] },
          { examId: 'rmo-inmo', examName: 'RMO / INMO (Math Olympiad)', description: 'Mathematical Olympiad program in India.', stages: [] },
      ]
  },
  {
      category: 'Andhra Pradesh Public Service Commission (APPSC)',
      exams: [
          { examId: 'appsc-group1', examName: 'APPSC Group 1', description: 'Executive & Administrative Services in Andhra Pradesh.', stages: [] },
          { examId: 'appsc-group2', examName: 'APPSC Group 2', description: 'Non-Executive Posts in Andhra Pradesh.', stages: [] },
          { examId: 'appsc-group3', examName: 'APPSC Group 3', description: 'Panchayat Secretary and other posts in Andhra Pradesh.', stages: [] },
          { examId: 'appsc-group4', examName: 'APPSC Group 4', description: 'Clerical posts in Andhra Pradesh.', stages: [] },
          { examId: 'appsc-ae-aee', examName: 'APPSC AE / AEE', description: 'Assistant Engineer/Assistant Executive Engineer jobs in AP.', stages: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Police & Defence',
      exams: [
          { examId: 'ap-police-si', examName: 'AP Police SI Exam', description: 'Andhra Pradesh Police Sub-Inspector recruitment.', stages: [] },
          { examId: 'ap-police-constable', examName: 'AP Police Constable Exam', description: 'Andhra Pradesh Police Constable recruitment.', stages: [] },
          { examId: 'ap-fire-services', examName: 'AP Fire Services Exams', description: 'Recruitment for Andhra Pradesh State Disaster Response & Fire Services.', stages: [] },
          { examId: 'ap-jail-warder', examName: 'AP Jail Warder', description: 'Recruitment for prison department staff in Andhra Pradesh.', stages: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Educational Service Exams',
      exams: [
          { examId: 'ap-tet', examName: 'AP TET (Teacher Eligibility Test)', description: 'Andhra Pradesh Teacher Eligibility Test.', stages: [] },
          { examId: 'ap-dsc', examName: 'AP DSC (Teacher Recruitment)', description: 'Andhra Pradesh District Selection Committee for teacher recruitment.', stages: [] },
          { examId: 'apset', examName: 'APSET (State Eligibility Test for Lecturers)', description: 'AP State Eligibility Test for Assistant Professor/Lecturer.', stages: [] },
          { examId: 'deecet', examName: 'DEECET (Diploma in Elementary Education CET)', description: 'AP Diploma in Elementary Education Common Entrance Test.', stages: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Entrance Exams (Higher Education)',
      exams: [
          { examId: 'ap-eapcet', examName: 'EAMCET (AP EAPCET)', description: 'Engineering, Agriculture, Pharmacy Common Entrance Test.', stages: [] },
          { examId: 'ap-ecet', examName: 'ECET', description: 'For Diploma Holders entry into B.Tech courses in AP.', stages: [] },
          { examId: 'ap-icet', examName: 'ICET', description: 'Integrated Common Entrance Test for MBA/MCA admissions in AP.', stages: [] },
          { examId: 'ap-lawcet', examName: 'LAWCET / PGLCET', description: 'Law Common Entrance Test for AP.', stages: [] },
          { examId: 'ap-edcet', examName: 'EDCET', description: 'Education Common Entrance Test for B.Ed admissions in AP.', stages: [] },
          { examId: 'ap-pgcet', examName: 'PGCET', description: 'Post Graduate Common Entrance Test for AP.', stages: [] },
          { examId: 'ap-polycet', examName: 'POLYCET', description: 'Polytechnic Common Entrance Test for AP.', stages: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Health & Paramedical',
      exams: [
          { examId: 'ap-medical-officer', examName: 'APPSC Medical Officer Recruitment', description: 'Recruitment for Medical Officers in AP.', stages: [] },
          { examId: 'ap-paramedical', examName: 'AP Paramedical Recruitment', description: 'For Staff Nurse, Pharmacist, etc. in AP.', stages: [] },
          { examId: 'ap-ayush', examName: 'AP Ayush Department Exams', description: 'Exams for the Department of Ayurveda, Yoga, Unani, Siddha and Homoeopathy.', stages: [] },
      ]
  }
].map(category => ({
  ...category,
  exams: category.exams.map(exam => ({
    ...exam,
    // Ensure all exams have a stages array, even if it's empty, for consistency.
    stages: exam.stages || [], 
  }))
}));
