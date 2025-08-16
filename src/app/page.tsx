
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BrainCircuit, BookOpenCheck, LogOut, Settings, Library, Briefcase } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { examCategories } from '@/lib/exam-categories';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { enrollInExam, getEnrolledExams } from '@/services/exam-service';
import { useEffect, useState } from 'react';


function HomePageContent() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [enrolledExamIds, setEnrolledExamIds] = useState<string[]>([]);
  const allExams = examCategories.flatMap(c => c.exams);
  
  useEffect(() => {
    if (user) {
      getEnrolledExams(user.uid).then(exams => {
        setEnrolledExamIds(exams.map(e => e.examId));
      });
    }
  }, [user]);

  const handleEnroll = async (examId: string, examName: string) => {
    if (!user) {
      toast({
        title: 'Not Logged In',
        description: 'You need to be logged in to enroll in an exam.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await enrollInExam(user.uid, examId);
      toast({
        title: 'Enrollment Successful',
        description: `You have successfully enrolled in ${examName}.`,
      });
       setEnrolledExamIds(prev => [...prev, examId]);
       router.push(`/enrolled-exams/${examId}`);
    } catch (error) {
      console.error('Enrollment failed:', error);
       if ((error as Error).message.includes('already enrolled')) {
         toast({
            title: 'Already Enrolled',
            description: `You are already enrolled in ${examName}.`,
            variant: 'default',
         });
         router.push(`/enrolled-exams/${examId}`);
      } else {
        toast({
          title: 'Enrollment Failed',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2">
            <GethubLogo className="w-8 h-8 text-primary" width={32} height={32}/>
            <span className="text-xl font-bold">GETHUB</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1">
          <section className="text-center py-20 px-4 bg-secondary/50 border-b">
               <div className="flex justify-center items-center gap-4 mb-6">
                  <GethubLogo className="w-24 h-24 text-primary" width={96} height={96}/>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your Personal AI Exam Preparation Hub</h1>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                  Practice for India's toughest competitive exams with AI-generated questions based on official syllabi and past papers. Get instant feedback and track your progress.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg">
                      <Link href="/register">
                          Get Started for Free <ArrowRight className="ml-2" />
                      </Link>
                  </Button>
              </div>
          </section>

          <section id="exams" className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight">Choose Your Exam</h2>
                  <p className="text-muted-foreground mt-2">Select an exam to enroll and start your preparation journey.</p>
              </div>

               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allExams.map((exam) => (
                  <Card key={exam.examId} className="flex flex-col">
                      <CardHeader>
                      <CardTitle>{exam.examName}</CardTitle>
                      <CardDescription>{exam.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-end gap-4">
                        <Button onClick={() => handleEnroll(exam.examId, exam.examName)} className="w-full">
                            {enrolledExamIds.includes(exam.examId) ? (
                              <>
                              <BookOpenCheck className="mr-2" /> View Dashboard
                              </>
                            ) : (
                                <>
                              <Briefcase className="mr-2" /> Enroll Now
                              </>
                            )}
                        </Button>
                      </CardContent>
                  </Card>
                  ))}
              </div>
          </section>
        </main>
        <footer className="p-4 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GETHUB. All rights reserved.
        </footer>
      </div>
    );
  }

  // Logged-in user dashboard
  return (
     <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
          <GethubLogo className="w-8 h-8 text-primary" width={32} height={32}/>
          <span className="text-xl font-bold">GETHUB</span>
        </div>
        <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
                <Link href="/enrolled-exams">
                    <Library />
                    <span>My Exams</span>
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="/settings">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut />
                <span className="sr-only">Logout</span>
            </Button>
           <Avatar>
              <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt={user.displayName || 'User'} data-ai-hint="student portrait" />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 px-4 border-b">
            <h1 className="text-4xl font-bold tracking-tight">Welcome back, {user.displayName || 'Student'}!</h1>
            <p className="text-muted-foreground mt-2 text-lg">
                Ready to ace your next exam? Select an topic below to start your preparation journey.
            </p>
        </section>

        <section id="exams" className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
             <div className="text-left mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Enroll in an Exam</h2>
                <p className="text-muted-foreground mt-2">Select an exam to add it to your dashboard.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allExams.map((exam) => (
                <Card key={exam.examId} className="flex flex-col">
                    <CardHeader>
                    <CardTitle>{exam.examName}</CardTitle>
                    <CardDescription>{exam.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end gap-4">
                        <Button onClick={() => handleEnroll(exam.examId, exam.examName)} className="w-full">
                            {enrolledExamIds.includes(exam.examId) ? (
                              <>
                              <BookOpenCheck className="mr-2" /> View Dashboard
                              </>
                            ) : (
                                <>
                              <Briefcase className="mr-2" /> Enroll Now
                              </>
                            )}
                        </Button>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GETHUB. All rights reserved.
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  );
}
