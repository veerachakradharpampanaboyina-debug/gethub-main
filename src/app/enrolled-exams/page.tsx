
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, Library, BookOpenCheck } from 'lucide-react';
import type { UserEnrollment, ExamDetails } from '@/lib/types';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getEnrolledExams } from '@/services/exam-service';
import { LoaderCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { examCategories } from '@/lib/exam-categories';


function EnrolledExamsPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [enrolledExams, setEnrolledExams] = useState<ExamDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/enrolled-exams');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getEnrolledExams(user.uid)
        .then(enrollments => {
          const allExams = examCategories.flatMap(c => c.exams);
          const userExams = enrollments.map(enrollment => {
            return allExams.find(exam => exam.examId === enrollment.examId)!;
          }).filter(Boolean); // Filter out any undefined if exam not found
          setEnrolledExams(userExams);
        })
        .catch(err => {
          console.error("Failed to fetch enrolled exams:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user]);

  if (loading || isLoading || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
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
                  <SidebarMenuButton tooltip="My Exams" isActive>
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
              <Library className="w-6 h-6"/>
              My Enrolled Exams
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {enrolledExams.length === 0 ? (
                 <Card>
                    <CardHeader className="items-center text-center">
                        <CardTitle>No Enrolled Exams</CardTitle>
                        <CardDescription>You haven't enrolled in any exams yet. Browse the homepage to find an exam.</CardDescription>
                         <Button asChild className="mt-4">
                            <Link href="/">Browse Exams</Link>
                        </Button>
                    </CardHeader>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {enrolledExams.map((exam) => (
                         <Card key={exam.examId} className="flex flex-col">
                            <CardHeader>
                            <CardTitle>{exam.examName}</CardTitle>
                            <CardDescription>{exam.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex items-end">
                                <Button asChild className="w-full">
                                    <Link href={`/enrolled-exams/${exam.examId}`}>
                                        <BookOpenCheck className="mr-2" />
                                        Go to Dashboard
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
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


export default function EnrolledExamsPageWrapper() {
  return (
    <AuthProvider>
      <EnrolledExamsPage />
    </AuthProvider>
  );
}
