
'use client';

import { Suspense } from 'react';
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
import { BrainCircuit, LogOut, Settings, Home as HomeIcon, History, Shield, Library } from 'lucide-react';
import type { Exam, Question } from '@/lib/types';
import { ExamView } from '@/components/exam-view';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generatePracticeExam } from '@/ai/flows/generate-practice-exam';
import { getSeenQuestions } from '@/services/exam-service';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


function PracticeExamGenerator() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || 'a general knowledge';
  const [exam, setExam] = useState<Exam | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/practice?topic=${encodeURIComponent(topic)}`);
    }
  }, [user, loading, router, topic]);

  useEffect(() => {
    if (user && !exam) {
      // Get questions the user has already seen to avoid repeats
      getSeenQuestions(user.uid)
        .then(seenQuestions => {
           return generatePracticeExam({ 
             examTopic: topic, 
             numQuestions: 50,
             seenQuestions,
            });
        })
        .then(response => {
          const examQuestions: Question[] = response.questions.map(q => ({
            ...q,
            studentAnswer: '', // Initialize with empty answers
          }));

          const newExam: Exam = {
            student: {
              name: user.displayName || user.email || 'Student',
              id: user.uid,
              avatarUrl: user.photoURL || `https://placehold.co/100x100.png`,
            },
            examName: `Practice Exam: ${topic}`,
            examId: `practice-${Date.now()}`,
            questions: examQuestions,
          };
          setExam(newExam);
        })
        .catch(err => {
          console.error("Failed to generate exam:", err);
          setGenerationError("Sorry, we couldn't generate a practice exam at this time. Please try again later.");
        });
    }
  }, [user, exam, topic]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (generationError) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Error Generating Exam</CardTitle>
                <CardDescription>{generationError}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link href="/">Return to Homepage</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!exam) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4">
                <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Generating Your Practice Exam...</h1>
                <p className="text-muted-foreground">The AI is preparing your questions for the {topic} exam.</p>
            </div>
        </div>
    );
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
                <Link href="/enrolled-exams">
                  <SidebarMenuButton tooltip="My Exams">
                    <Library />
                    <span>My Exams</span>
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
                  <BrainCircuit />
                  <span>{exam.examName}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
           {user && user.email === 'admin@gethub.com' && (
             <SidebarGroup>
               <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                      <Link href="/admin">
                          <SidebarMenuButton tooltip="Admin Dashboard">
                              <Shield />
                              <span>Admin</span>
                          </SidebarMenuButton>
                      </Link>
                  </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
           )}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/settings">
                  <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
              </Link>
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

function PracticePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PracticeExamGenerator />
        </Suspense>
    );
}


export default function PracticePageWrapper() {
  return (
    <AuthProvider>
      <PracticePage />
    </AuthProvider>
  );
}
