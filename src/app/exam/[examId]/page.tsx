
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
import { useAuth } from '@/hooks/use-auth';
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
        studentAnswer: 'Equality before law',
        correctAnswer: 'Equality before law',
        pointsPossible: 10,
      },
      {
        questionId: 'q2',
        questionType: 'trueFalse',
        questionText:
          'The an-Nizamiyya of Baghdad is considered a model of the madrasas of the later Middle Ages.',
        studentAnswer: 'True',
        correctAnswer: 'True',
        pointsPossible: 10,
      },
      {
        questionId: 'q3',
        questionType: 'multipleChoice',
        questionText: 'Who was the founder of the Mauryan Empire in ancient India?',
        options: ['Chandragupta Maurya', 'Ashoka', 'Bindusara', 'Chanakya'],
        studentAnswer: 'Ashoka',
        correctAnswer: 'Chandragupta Maurya',
        pointsPossible: 10,
      },
      {
        questionId: 'q4',
        questionType: 'freeText',
        questionText:
          'Discuss the significance of the Non-Cooperation Movement in the Indian freedom struggle.',
        studentAnswer:
          'It was a major movement led by Gandhi. It involved boycotting British goods and institutions. It united many Indians against British rule.',
        correctAnswer:
          "The Non-Cooperation Movement (1920-22) led by Mahatma Gandhi was a pivotal moment in India's freedom struggle. It was the first instance of a nationwide, mass movement against British rule, promoting non-violent resistance (Satyagraha). It significantly widened the base of the freedom struggle, bringing in peasants, workers, and students, and instilled a new sense of confidence and fearlessness among Indians. It also promoted Indian-made goods (Swadeshi) and led to the boycott of British educational institutions, courts, and legislatures.",
        pointsPossible: 20,
      },
      {
        questionId: 'q5',
        questionType: 'freeText',
        questionText:
          'What are the main functions of the Goods and Services Tax (GST) Council in India?',
        studentAnswer: 'The GST council decides tax rates.',
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
  const { AuthProvider } = useAuth();
  return (
    <AuthProvider>
      <ExamPage params={params} />
    </AuthProvider>
  );
}
