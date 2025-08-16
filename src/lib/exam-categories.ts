
import type { ExamDetails } from '@/lib/types';

interface ExamCategory {
  category: string;
  exams: ExamDetails[];
}

export const examCategories: ExamCategory[] = [
  {
    category: 'Civil Services & Government Jobs',
    exams: [
        { examId: 'upsc-civil-services', examName: 'UPSC Civil Services Exam (IAS, IPS, IFS, etc.)', description: 'Central Civil Services of the Government of India.', syllabus: [] },
        { examId: 'ssc-cgl-chsl-mts-je', examName: 'SSC CGL / CHSL / MTS / JE', description: 'Staff Selection Commission exams for various government posts.', syllabus: [] },
        { examId: 'rrb-exams', examName: 'RRB Exams (NTPC, ALP, Group D)', description: 'Railway Recruitment Board exams for various railway posts.', syllabus: [] },
        { examId: 'ibps-exams', examName: 'IBPS Exams (PO, Clerk, RRB, SO)', description: 'Institute of Banking Personnel Selection exams for banking careers.', syllabus: [] },
        { examId: 'sbi-po-clerk-so', examName: 'SBI PO / Clerk / SO', description: 'State Bank of India exams for various banking roles.', syllabus: [] },
        { examId: 'lic-aao-ado', examName: 'LIC AAO / ADO', description: 'Life Insurance Corporation exams for officer roles.', syllabus: [] },
        { examId: 'nabard-grade-a-b', examName: 'NABARD Grade A & B', description: 'National Bank for Agriculture and Rural Development officer exams.', syllabus: [] },
        { examId: 'rbi-grade-b-assistant', examName: 'RBI Grade B / Assistant', description: 'Reserve Bank of India exams for officer and assistant roles.', syllabus: [] },
        { examId: 'indian-coast-guard', examName: 'Indian Coast Guard Exam', description: 'Recruitment exam for the Indian Coast Guard.', syllabus: [] },
        { examId: 'nda', examName: 'NDA (National Defence Academy)', description: 'For admission to the Army, Navy, and Air Force wings of the NDA.', syllabus: [] },
        { examId: 'cds', examName: 'CDS (Combined Defence Services)', description: 'For recruitment into the Indian Military Academy, Officers Training Academy, etc.', syllabus: [] },
        { examId: 'afcat', examName: 'AFCAT (Air Force Common Admission Test)', description: 'For selection of officers in all branches of the Indian Air Force.', syllabus: [] },
        { examId: 'capf', examName: 'CAPF (Central Armed Police Forces)', description: 'Recruitment of Assistant Commandants in the Central Armed Police Forces.', syllabus: [] },
    ]
  },
  {
    category: 'Engineering & Technical',
    exams: [
        { examId: 'jee-main-advanced', examName: 'JEE Main / JEE Advanced', description: 'For admission to undergraduate engineering programs in IITs, NITs, etc.', syllabus: [] },
        { examId: 'gate', examName: 'GATE (Graduate Aptitude Test in Engineering)', description: 'For admission to postgraduate engineering programs and PSU recruitment.', syllabus: [] },
        { examId: 'isro-drdo', examName: 'ISRO / DRDO Recruitment', description: 'Recruitment exams for scientists and engineers in space and defense organizations.', syllabus: [] },
        { examId: 'psu-recruitment', examName: 'BHEL / NTPC / ONGC / IOCL Recruitments', description: 'Recruitment for various Public Sector Undertakings.', syllabus: [] },
        { examId: 'barc-oces-dgfs', examName: 'BARC OCES/DGFS', description: 'Bhabha Atomic Research Centre training schemes for engineers and scientists.', syllabus: [] },
    ]
  },
  {
      category: 'Medical / Science / Research',
      exams: [
          { examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.', syllabus: [] },
          { examId: 'aiims-jipmer', examName: 'AIIMS / JIPMER Entrance Exams', description: 'Entrance exams for premier medical colleges.', syllabus: [] },
          { examId: 'icmr-jrf', examName: 'ICMR JRF', description: 'Indian Council of Medical Research Junior Research Fellowship.', syllabus: [] },
          { examId: 'csir-ugc-net', examName: 'CSIR-UGC NET', description: 'For Junior Research Fellowship and Lectureship in science subjects.', syllabus: [] },
          { examId: 'ugc-net', examName: 'UGC NET', description: 'For Lectureship/JRF in various subjects.', syllabus: [] },
      ]
  },
  {
      category: 'Law / Commerce / Management',
      exams: [
          { examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.', syllabus: [] },
          { examId: 'ca', examName: 'CA Foundation / Intermediate / Final', description: 'Chartered Accountancy exams.', syllabus: [] },
          { examId: 'cs', examName: 'CS (Company Secretary)', description: 'Company Secretary professional exams.', syllabus: [] },
          { examId: 'cma', examName: 'CMA', description: 'Cost and Management Accountancy exams.', syllabus: [] },
          { examId: 'cat', examName: 'CAT (MBA Entrance)', description: 'Common Admission Test for MBA programs.', syllabus: [] },
          { examId: 'xat-snap-nmat', examName: 'XAT / SNAP / NMAT / MAT / CMAT', description: 'Other popular MBA entrance exams.', syllabus: [] },
          { examId: 'iift-tissnet', examName: 'IIFT / TISSNET', description: 'Entrance exams for management courses at IIFT and TISS.', syllabus: [] },
      ]
  },
  {
      category: 'School / Junior Level',
      exams: [
          { examId: 'ntse', examName: 'NTSE (National Talent Search Exam)', description: 'National level scholarship program for school students.', syllabus: [] },
          { examId: 'kvpy', examName: 'KVPY (Now merged with INSPIRE)', description: 'Scholarship program to encourage students to take up research careers.', syllabus: [] },
          { examId: 'olympiads', examName: 'Olympiads (NSO, IMO, IEO, etc.)', description: 'Various national and international Olympiads for school students.', syllabus: [] },
          { examId: 'rmo-inmo', examName: 'RMO / INMO (Math Olympiad)', description: 'Mathematical Olympiad program in India.', syllabus: [] },
      ]
  },
  {
      category: 'Andhra Pradesh Public Service Commission (APPSC)',
      exams: [
          { examId: 'appsc-group1', examName: 'APPSC Group 1', description: 'Executive & Administrative Services in Andhra Pradesh.', syllabus: [] },
          { examId: 'appsc-group2', examName: 'APPSC Group 2', description: 'Non-Executive Posts in Andhra Pradesh.', syllabus: [] },
          { examId: 'appsc-group3', examName: 'APPSC Group 3', description: 'Panchayat Secretary and other posts in Andhra Pradesh.', syllabus: [] },
          { examId: 'appsc-group4', examName: 'APPSC Group 4', description: 'Clerical posts in Andhra Pradesh.', syllabus: [] },
          { examId: 'appsc-ae-aee', examName: 'APPSC AE / AEE', description: 'Assistant Engineer/Assistant Executive Engineer jobs in AP.', syllabus: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Police & Defence',
      exams: [
          { examId: 'ap-police-si', examName: 'AP Police SI Exam', description: 'Andhra Pradesh Police Sub-Inspector recruitment.', syllabus: [] },
          { examId: 'ap-police-constable', examName: 'AP Police Constable Exam', description: 'Andhra Pradesh Police Constable recruitment.', syllabus: [] },
          { examId: 'ap-fire-services', examName: 'AP Fire Services Exams', description: 'Recruitment for Andhra Pradesh State Disaster Response & Fire Services.', syllabus: [] },
          { examId: 'ap-jail-warder', examName: 'AP Jail Warder', description: 'Recruitment for prison department staff in Andhra Pradesh.', syllabus: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Educational Service Exams',
      exams: [
          { examId: 'ap-tet', examName: 'AP TET (Teacher Eligibility Test)', description: 'Andhra Pradesh Teacher Eligibility Test.', syllabus: [] },
          { examId: 'ap-dsc', examName: 'AP DSC (Teacher Recruitment)', description: 'Andhra Pradesh District Selection Committee for teacher recruitment.', syllabus: [] },
          { examId: 'apset', examName: 'APSET (State Eligibility Test for Lecturers)', description: 'AP State Eligibility Test for Assistant Professor/Lecturer.', syllabus: [] },
          { examId: 'deecet', examName: 'DEECET (Diploma in Elementary Education CET)', description: 'AP Diploma in Elementary Education Common Entrance Test.', syllabus: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Entrance Exams (Higher Education)',
      exams: [
          { examId: 'ap-eapcet', examName: 'EAMCET (AP EAPCET)', description: 'Engineering, Agriculture, Pharmacy Common Entrance Test.', syllabus: [] },
          { examId: 'ap-ecet', examName: 'ECET', description: 'For Diploma Holders entry into B.Tech courses in AP.', syllabus: [] },
          { examId: 'ap-icet', examName: 'ICET', description: 'Integrated Common Entrance Test for MBA/MCA admissions in AP.', syllabus: [] },
          { examId: 'ap-lawcet', examName: 'LAWCET / PGLCET', description: 'Law Common Entrance Test for AP.', syllabus: [] },
          { examId: 'ap-edcet', examName: 'EDCET', description: 'Education Common Entrance Test for B.Ed admissions in AP.', syllabus: [] },
          { examId: 'ap-pgcet', examName: 'PGCET', description: 'Post Graduate Common Entrance Test for AP.', syllabus: [] },
          { examId: 'ap-polycet', examName: 'POLYCET', description: 'Polytechnic Common Entrance Test for AP.', syllabus: [] },
      ]
  },
  {
      category: 'Andhra Pradesh - Health & Paramedical',
      exams: [
          { examId: 'ap-medical-officer', examName: 'APPSC Medical Officer Recruitment', description: 'Recruitment for Medical Officers in AP.', syllabus: [] },
          { examId: 'ap-paramedical', examName: 'AP Paramedical Recruitment', description: 'For Staff Nurse, Pharmacist, etc. in AP.', syllabus: [] },
          { examId: 'ap-ayush', examName: 'AP Ayush Department Exams', description: 'Exams for the Department of Ayurveda, Yoga, Unani, Siddha and Homoeopathy.', syllabus: [] },
      ]
  }
];
