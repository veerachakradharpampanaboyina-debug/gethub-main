
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
import { BrainCircuit, LogOut, Settings, Home as HomeIcon, History, Shield, Library, MessageCircle, CalendarClock } from 'lucide-react';
import type { Exam } from '@/lib/types';
import { ExamView } from '@/components/exam-view';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import { getLatestScheduledExam } from '@/services/scheduled-exam-service';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

function ScheduledExamPage({ params }: { params: { examId: string } }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { examId } = params;
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/scheduled-exam/${examId}`);
    }
    
    if(user) {
        getLatestScheduledExam(examId).then(scheduledExam => {
            if (scheduledExam) {
                 const newExam: Exam = {
                    student: {
                    name: user.displayName || user.email || 'Student',
                    id: user.uid,
                    avatarUrl: user.photoURL || `https://placehold.co/100x100.png`,
                    },
                    examName: `Weekly Exam: ${scheduledExam.examName}`,
                    examId: `weekly-${scheduledExam.id}`,
                    questions: scheduledExam.questions,
                };
                setExam(newExam);
            } else {
                setError("No scheduled exam found for this category.");
            }
        }).catch(err => {
            console.error("Failed to fetch scheduled exam:", err);
            setError("Could not load the scheduled exam. Please try again later.");
        }).finally(() => {
            setIsLoading(false);
        });
    }

  }, [user, loading, router, examId]);


  if (isLoading || loading) {
     return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
     return (
      <div className="flex h-screen items-center justify-center">
         <p>Redirecting to login...</p>
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
            <SidebarGroupLabel>Practice</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/practice">
                    <SidebarMenuButton tooltip="Practice Exam">
                        <BrainCircuit />
                        <span>Practice Exam</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/comms-practice">
                    <SidebarMenuButton tooltip="Communication Practice">
                        <MessageCircle />
                        <span>Comm. Practice</span>
                    </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              {exam && (
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip={exam.examName} isActive>
                      <CalendarClock />
                      <span>{exam.examName}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              )}
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
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
             <h1 className="text-xl font-semibold flex items-center gap-3">
                <CalendarClock className="w-6 h-6"/>
                Weekly Scheduled Exam
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
           {error ? (
                 <Card className="max-w-xl mx-auto border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Error</CardTitle>
                        <CardDescription className="text-destructive/80">
                            {error}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : exam ? (
                <ExamView exam={exam} />
            ) : null}
        </main>
      </div>
    </SidebarProvider>
  );
}


export default function ScheduledExamPageWrapper({ params }: { params: { examId: string } }) {
  return (
    <AuthProvider>
      <ScheduledExamPage params={params} />
    </AuthProvider>
  );
}
