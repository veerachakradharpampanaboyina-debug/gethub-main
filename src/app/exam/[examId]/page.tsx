
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
import { FileText, LogOut, Settings, Home as HomeIcon } from 'lucide-react';
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
                <Link href="/" legacyBehavior passHref>
                  <SidebarMenuButton tooltip="Homepage">
                    <HomeIcon />
                    <span>Homepage</span>
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
