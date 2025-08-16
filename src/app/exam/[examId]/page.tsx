
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, Library, FileText, Video, BookCopy, Info } from 'lucide-react';
import { ExamDetails, ExamPaper } from '@/lib/types';
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { examCategories } from '@/lib/exam-categories';
import { Badge } from '@/components/ui/badge';


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
  
  const renderPaperDetails = (paper: ExamPaper) => (
    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex justify-between"><span>Type</span> <span className="font-medium text-foreground">{paper.type}</span></div>
      <div className="flex justify-between"><span>Duration</span> <span className="font-medium text-foreground">{paper.duration}</span></div>
      <div className="flex justify-between"><span>Marks</span> <span className="font-medium text-foreground">{paper.totalMarks}</span></div>
      {paper.totalQuestions && <div className="flex justify-between"><span>Questions</span> <span className="font-medium text-foreground">{paper.totalQuestions}</span></div>}
      {paper.negativeMarking && <div className="flex justify-between"><span>Negative Marking</span> <span className="font-medium text-foreground">{paper.negativeMarking}</span></div>}
      {paper.qualifying && <div className="flex justify-between"><span>Qualifying</span> <Badge variant="outline">{paper.qualifyingMarks || 'Yes'}</Badge></div>}
      {paper.notes && <p className="text-xs pt-2 border-t mt-2">{paper.notes}</p>}
    </div>
  );

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
            <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle>Syllabus & Preparation</CardTitle>
                    <CardDescription>
                        Explore the detailed syllabus for the {exam.examName}. Generate practice tests for any topic.
                    </CardDescription>
                </CardHeader>
            </Card>

            {exam.stages && exam.stages.length > 0 ? (
                 <Accordion type="multiple" className="w-full space-y-4 mt-6">
                   {exam.stages.map((stage) => (
                    <AccordionItem value={stage.stageId} key={stage.stageId} className="border rounded-lg bg-secondary/50">
                        <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                           {stage.stageName}
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0 border-t">
                             <Accordion type="multiple" className="w-full space-y-4 mt-4">
                                {stage.papers.map((paper) => (
                                    <AccordionItem value={paper.paperId} key={paper.paperId} className="border rounded-lg bg-background/50">
                                         <AccordionTrigger className="p-4 hover:no-underline">
                                           {paper.paperName}
                                         </AccordionTrigger>
                                         <AccordionContent className="p-4 pt-0 border-t grid md:grid-cols-3 gap-6">
                                              <Card className="md:col-span-1">
                                                <CardHeader>
                                                  <CardTitle className="flex items-center gap-2 text-base"><Info /> Details</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                  {renderPaperDetails(paper)}
                                                </CardContent>
                                              </Card>
                                             <Card className="md:col-span-2">
                                                <CardHeader>
                                                  <CardTitle className="flex items-center gap-2 text-base"><BrainCircuit /> Practice Topics</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-2">
                                                  {paper.topics && paper.topics.length > 0 ? paper.topics.map(topic => (
                                                      <Button asChild variant="outline" className="w-full justify-start" key={topic}>
                                                          <Link href={`/practice?topic=${encodeURIComponent(`${exam.examName} - ${paper.paperName} - ${topic}`)}`}>
                                                              {topic}
                                                          </Link>
                                                      </Button>
                                                  )) : (
                                                    <div className="text-sm text-center text-muted-foreground py-4">
                                                      No specific topics listed. You can generate a general practice test for this paper.
                                                    </div>
                                                  )}
                                                </CardContent>
                                                <CardFooter>
                                                    <Button asChild className="w-full">
                                                        <Link href={`/practice?topic=${encodeURIComponent(`${exam.examName} - ${paper.paperName}`)}`}>
                                                            <BrainCircuit className="mr-2" /> Generate Full Practice Test for {paper.paperName}
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                             </Card>
                                         </AccordionContent>
                                    </AccordionItem>
                                ))}
                             </Accordion>
                              {stage.personalityTest && (
                                <Card className="mt-4 border rounded-lg bg-background/50">
                                  <CardHeader>
                                      <CardTitle>{stage.personalityTest.stageName}</CardTitle>
                                  </CardHeader>
                                   <CardContent>
                                      <p>Total Marks: {stage.personalityTest.totalMarks}</p>
                                  </CardContent>
                                </Card>
                              )}
                        </AccordionContent>
                    </AccordionItem>
                   ))}
                </Accordion>
            ) : (
                <Card className="mt-6">
                    <CardHeader className="items-center text-center">
                        <CardTitle>Syllabus Coming Soon</CardTitle>
                        <CardDescription>The detailed syllabus for this exam is being prepared. Check back soon!</CardDescription>
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
