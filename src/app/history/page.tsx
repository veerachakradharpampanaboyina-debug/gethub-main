
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield } from 'lucide-react';
import type { ExamAttempt, Question, GradingResult, FlaggedAnswer } from '@/lib/types';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserExamAttempts } from '@/services/exam-service';
import { LoaderCircle, CheckCircle2, XCircle, AlertCircle, ClipboardCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';


const QuestionResultBadge = ({
  question,
  attempt
}: {
  question: Question;
  attempt: ExamAttempt;
}) => {

  const { aiGradingState } = attempt;
  if (!aiGradingState) {
    return null;
  }

  const objectiveResult = aiGradingState.objectiveResults.find(
    (r) => r.questionId === question.questionId
  );

  if (objectiveResult) {
    return objectiveResult.isCorrect ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        <CheckCircle2 className="w-4 h-4 mr-1" />
        Correct
      </Badge>
    ) : (
      <Badge variant="destructive" className="bg-red-100 text-red-800">
        <XCircle className="w-4 h-4 mr-1" />
        Incorrect
      </Badge>
    );
  }

  const flaggedResult = aiGradingState.flaggedAnswers.find(
    (f) => f.questionId === question.questionId
  );
  if (flaggedResult?.isPotentiallyIncorrect) {
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-4 h-4 mr-1" />
        Needs Review
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      <CheckCircle2 className="w-4 h-4 mr-1" />
      Graded
    </Badge>
  );
};


function HistoryPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [attempts, setAttempts] = useState<ExamAttempt[]>([]);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/history');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      getUserExamAttempts(user.uid)
        .then(userAttempts => {
          setAttempts(userAttempts);
          setIsLoadingAttempts(false);
        })
        .catch(err => {
          console.error("Failed to fetch exam history:", err);
          setIsLoadingAttempts(false);
        });
    }
  }, [user]);

  if (loading || isLoadingAttempts || !user) {
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
                  <SidebarMenuButton tooltip="Exam History" isActive>
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
              <History className="w-6 h-6"/>
              Exam History
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {attempts.length === 0 ? (
                 <Card>
                    <CardHeader className="items-center text-center">
                        <CardTitle>No History Found</CardTitle>
                        <CardDescription>You haven't completed any exams yet. Start a practice exam to see your history!</CardDescription>
                         <Button asChild className="mt-4">
                            <Link href="/">Take an Exam</Link>
                        </Button>
                    </CardHeader>
                </Card>
            ) : (
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {attempts.map((attempt) => {
                        const scorePercentage = (attempt.aiGradingState.totalPointsAwarded / attempt.aiGradingState.totalPointsPossible) * 100;
                        return (
                            <AccordionItem value={attempt.id!} key={attempt.id!} className="border rounded-lg">
                                <AccordionTrigger className="p-4 hover:no-underline">
                                    <div className="flex-1 flex justify-between items-center pr-4">
                                        <div>
                                            <h3 className="font-semibold text-left">{attempt.examName}</h3>
                                            <p className="text-sm text-muted-foreground text-left">{format(attempt.createdAt.toDate(), "PPP p")}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">{attempt.aiGradingState.totalPointsAwarded} / {attempt.aiGradingState.totalPointsPossible}</p>
                                            <p className="text-sm text-muted-foreground">{scorePercentage.toFixed(0)}%</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 pt-0 border-t">
                                     <div className="grid gap-6 mt-4">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2"><ClipboardCheck /> AI-Generated Feedback</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground">{attempt.aiGradingState.summary}</p>
                                            </CardContent>
                                        </Card>
                                        {attempt.questions.map((question, index) => {
                                             const objectiveResult = attempt.aiGradingState.objectiveResults.find(
                                                (r) => r.questionId === question.questionId
                                              );
                                              const flaggedResult = attempt.aiGradingState.flaggedAnswers.find(
                                                (f) => f.questionId === question.questionId
                                              );

                                            return (
                                            <Card key={question.questionId}>
                                            <CardHeader>
                                                <CardTitle className="flex items-start gap-4">
                                                <span className="text-lg font-semibold">{index + 1}.</span>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-base font-medium">{question.questionText}</p>
                                                        <QuestionResultBadge question={question} attempt={attempt} />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                    {question.pointsPossible} points
                                                    </p>
                                                </div>
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid gap-2">
                                                    <h4 className="font-semibold text-sm">Your Answer</h4>
                                                    <p className="text-sm p-3 bg-secondary rounded-md">
                                                    {question.studentAnswer || "No answer provided."}
                                                    </p>
                                                </div>

                                                    {objectiveResult && !objectiveResult.isCorrect && (
                                                    <div className="grid gap-2">
                                                        <h4 className="font-semibold text-sm">Correct Answer</h4>
                                                        <p className="text-sm p-3 bg-green-100 text-green-900 rounded-md">
                                                        {question.correctAnswer}
                                                        </p>
                                                    </div>
                                                    )}
                                                    {flaggedResult?.isPotentiallyIncorrect && (
                                                    <div className="grid gap-2">
                                                        <h4 className="font-semibold text-sm">Model Answer</h4>
                                                        <p className="text-sm p-3 bg-blue-100 text-blue-900 rounded-md">
                                                        {question.correctAnswer}
                                                        </p>
                                                    </div>
                                                    )}
                                                    {(objectiveResult || flaggedResult) && (
                                                    <div className="p-3 border-l-4 border-accent bg-accent/10 rounded-r-md">
                                                        <h4 className="font-semibold text-sm text-accent-foreground/90 mb-1">AI Feedback</h4>
                                                        <p className="text-sm text-accent-foreground/80">
                                                        {objectiveResult?.feedback || flaggedResult?.reason}
                                                        </p>
                                                    </div>
                                                    )}
                                            </CardContent>
                                            </Card>
                                        )})}
                                     </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
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


export default function HistoryPageWrapper() {
  return (
    <AuthProvider>
      <HistoryPage />
    </AuthProvider>
  );
}
