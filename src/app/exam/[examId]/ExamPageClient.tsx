
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, BookCopy, Info, FileText, Download, MessageCircle, CalendarClock } from 'lucide-react';
import { ExamDetails, ExamPaper } from '@/lib/types';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
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
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { generateSyllabusNotes } from '@/ai/flows/generate-syllabus-notes';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Separator } from '@/components/ui/separator';
import { markdownToHtml } from '@/lib/utils';
import { getLatestScheduledExam } from '@/services/scheduled-exam-service';

function ExamSyllabusPageComponent({ exam }: { exam: ExamDetails }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [notesError, setNotesError] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [hasWeeklyExam, setHasWeeklyExam] = useState<boolean | null>(null);
  const notesContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/exam/${exam.examId}`);
    }
  }, [user, loading, router, exam.examId]);

  useEffect(() => {
      getLatestScheduledExam(exam.examId).then((result) => {
          setHasWeeklyExam(!!result);
      });
  }, [exam.examId]);
  
  const handleGenerateNotes = async (topic: string) => {
    setCurrentTopic(topic);
    setIsNotesDialogOpen(true);
    setIsGeneratingNotes(true);
    setGeneratedNotes('');
    setNotesError(null);

    try {
        const result = await generateSyllabusNotes({
            examName: exam.examName,
            topic: topic,
        });
        setGeneratedNotes(result.notes);
    } catch (err) {
        console.error("Failed to generate notes:", err);
        setNotesError("Sorry, we couldn't generate notes at this time. Please try again later.");
    } finally {
        setIsGeneratingNotes(false);
    }
  };
  
  const handleDownloadPdf = () => {
    const notesElement = notesContentRef.current;
    if (!notesElement) return;

    html2canvas(notesElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        backgroundColor: '#ffffff', // Force white background for PDF
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / canvasAspectRatio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${currentTopic.replace(/\s+/g, '_').toLowerCase()}_notes.pdf`);
    });
};

  if (loading || !user || hasWeeklyExam === null) {
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
                 <SidebarMenuItem>
                    <Link href="/comms-practice">
                        <SidebarMenuButton tooltip="Communication Practice">
                            <MessageCircle />
                            <span>Comm. Practice</span>
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
        <main className="p-4 md:p-6 lg:p-8 space-y-6">
            <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle>Syllabus & Preparation</CardTitle>
                    <CardDescription>
                        Explore the detailed syllabus for the {exam.examName}. Generate practice tests or notes for any topic.
                    </CardDescription>
                </CardHeader>
            </Card>

             {hasWeeklyExam && (
                <Card className="border-primary/50 bg-primary/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-primary">
                            <CalendarClock /> Weekly Scheduled Exam
                        </CardTitle>
                        <CardDescription className="text-primary/80">
                           A new question paper is available for this exam. Test your knowledge with the latest questions.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                         <Button asChild>
                            <Link href={`/scheduled-exam/${exam.examId}`}>
                                Start Weekly Exam
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
             )}


            {exam.stages && exam.stages.length > 0 ? (
                 <Accordion type="multiple" className="w-full space-y-4">
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
                                                <CardContent className="space-y-4">
                                                  {paper.topics && paper.topics.length > 0 ? paper.topics.map((topic, index) => (
                                                      <div key={index} className="p-3 rounded-lg bg-secondary/30 space-y-3">
                                                         <p className="font-medium text-sm">{topic}</p>
                                                          <div className="flex flex-col sm:flex-row gap-2">
                                                            <Button asChild variant="outline" size="sm" className="w-full">
                                                                <Link href={`/practice?topic=${encodeURIComponent(`${exam.examName} - ${paper.paperName} - ${topic}`)}`}>
                                                                    <BrainCircuit className="mr-2" />
                                                                    Practice Topic
                                                                </Link>
                                                            </Button>
                                                            <Button variant="secondary" size="sm" className="w-full" onClick={() => handleGenerateNotes(`${exam.examName} - ${paper.paperName} - ${topic}`)}>
                                                                <FileText className="mr-2" />
                                                                Generate Notes
                                                            </Button>
                                                          </div>
                                                      </div>
                                                  )) : (
                                                    <div className="text-sm text-center text-muted-foreground py-4">
                                                      No specific topics listed. You can generate a general practice test for this paper.
                                                    </div>
                                                  )}
                                                </CardContent>
                                                <CardFooter className="flex-col items-stretch gap-2">
                                                    <Separator />
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
       <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>AI Generated Notes</DialogTitle>
            <DialogDescription>
              Topic: {currentTopic}. Review the notes or download as a PDF.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-4 -mr-6">
            {isGeneratingNotes ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <LoaderCircle className="w-12 h-12 animate-spin text-primary mx-auto" />
                  <p className="mt-4 text-muted-foreground">Generating notes...</p>
                </div>
              </div>
            ) : notesError ? (
              <div className="text-destructive p-4">{notesError}</div>
            ) : (
               <div className="prose prose-sm md:prose-base max-w-none p-2">
                 <div ref={notesContentRef} className="bg-white text-black p-8 font-serif">
                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(generatedNotes) }} />
                 </div>
              </div>
            )}
          </div>
           <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotesDialogOpen(false)}>Close</Button>
            <Button onClick={handleDownloadPdf} disabled={isGeneratingNotes || !!notesError}>
              <Download className="mr-2" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}

function SidebarInset({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex-1">{children}</div>
  )
}

export default function ExamPageClient({ exam }: { exam: ExamDetails }) {
  return (
    <AuthProvider>
      <ExamSyllabusPageComponent exam={exam} />
    </AuthProvider>
  );
}
