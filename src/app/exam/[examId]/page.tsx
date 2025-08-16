
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, Library, FileText, Video, BookCopy } from 'lucide-react';
import { ExamDetails } from '@/lib/types';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { examCategories } from '@/lib/exam-categories';


function ExamSyllabusPage({ params }: { params: { examId: string } }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { examId } = params;
  const [exam, setExam] = useState<ExamDetails | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/exam/${examId}`);
    }
  }, [user, loading, router, examId]);
  
  useEffect(() => {
    const allExams = examCategories.flatMap(c => c.exams);
    const currentExam = allExams.find(e => e.examId === examId);
    if(currentExam) {
        setExam(currentExam);
    } else {
        // Handle not found, maybe redirect
        console.error("Exam not found!");
    }
  }, [examId]);


  if (loading || !user || !exam) {
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
              <BookCopy className="w-6 h-6"/>
              {exam.examName}
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Preparation Dashboard</CardTitle>
                    <CardDescription>
                        Access all your study materials and generate practice tests for the {exam.examName} here.
                    </CardDescription>
                </CardHeader>
            </Card>

            {exam.syllabus && exam.syllabus.length > 0 ? (
                 <Tabs defaultValue={exam.syllabus[0].topicId} className="w-full mt-6">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-auto">
                     {exam.syllabus.map((topic) => (
                        <TabsTrigger key={topic.topicId} value={topic.topicId}>
                            {topic.topicName}
                        </TabsTrigger>
                    ))}
                  </TabsList>
                   {exam.syllabus.map((topic) => (
                    <TabsContent key={topic.topicId} value={topic.topicId}>
                        <Card className="mt-4">
                             <CardHeader>
                                <CardTitle>{topic.topicName}</CardTitle>
                                <CardDescription>{topic.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg"><BrainCircuit /> Practice</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full">
                                            <Link href={`/practice?topic=${encodeURIComponent(exam.examName + ' - ' + topic.topicName)}`}>
                                                Generate Practice Exam
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                                <Card>
                                     <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg"><FileText /> Notes</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {topic.materials.notes.map(note => (
                                             <Button asChild variant="outline" className="w-full justify-start" key={note.name}>
                                                <Link href={note.url} target="_blank">
                                                    {note.name}
                                                </Link>
                                            </Button>
                                        ))}
                                    </CardContent>
                                </Card>
                                 <Card>
                                     <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg"><Video /> Videos</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                         {topic.materials.videos.map(video => (
                                             <Button asChild variant="outline" className="w-full justify-start" key={video.name}>
                                                <Link href={video.url} target="_blank">
                                                    {video.name}
                                                </Link>
                                            </Button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </CardContent>
                        </Card>
                    </TabsContent>
                   ))}
                </Tabs>
            ) : (
                <Card className="mt-6">
                    <CardHeader className="items-center text-center">
                        <CardTitle>Syllabus Coming Soon</CardTitle>
                        <CardDescription>The detailed syllabus and materials for this exam are being prepared. Check back soon!</CardDescription>
                    </CardHeader>
                </Card>
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


export default function ExamSyllabusPageWrapper({ params }: { params: { examId: string } }) {
  return (
    <AuthProvider>
      <ExamSyllabusPage params={params} />
    </AuthProvider>
  );
}
