
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
import { ArrowRight, BrainCircuit, BookOpenCheck, LogOut, Settings, Library, Briefcase, History } from 'lucide-react';
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
      router.push('/login');
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

  const PageHeader = () => (
     <header className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
            <GethubLogo className="w-8 h-8 text-primary" width={32} height={32}/>
            <span className="text-xl font-bold">GETHUB</span>
        </div>
        <div className="flex items-center gap-2">
            {user ? (
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild>
                        <Link href="/enrolled-exams">
                            <Library className="mr-2"/>
                            My Exams
                        </Link>
                    </Button>
                     <Button variant="ghost" asChild>
                        <Link href="/history">
                            <History className="mr-2"/>
                            History
                        </Link>
                    </Button>
                    <div className="h-6 w-px bg-white/10"></div>
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
            ) : (
                <>
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                </>
            )}
        </div>
    </header>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <PageHeader/>
        <main className="flex-1">
            <section className="text-center py-20 px-4 border-b border-white/10">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Welcome to GETHUB</h1>
                 <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
                    Your hub for competitive exam preparation. Choose an exam below to enroll and start your journey.
                 </p>
                 <div className="mt-8 flex justify-center gap-4">
                     <Button asChild size="lg" variant="secondary">
                        <Link href="/practice">
                            <BrainCircuit className="mr-2"/> AI Practice
                        </Link>
                    </Button>
                </div>
            </section>
            
            <section id="exams" className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight">Choose Your Exam to Enroll</h2>
                  <p className="text-muted-foreground mt-2">Select an exam to add it to your personal dashboard and start your preparation journey.</p>
              </div>

               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allExams.map((exam) => (
                  <Card key={exam.examId} className="flex flex-col bg-secondary border-white/10 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader>
                      <CardTitle>{exam.examName}</CardTitle>
                      <CardDescription className="mt-2">{exam.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-end gap-4">
                        <Button onClick={() => handleEnroll(exam.examId, exam.examName)} className="w-full mt-auto">
                            {enrolledExamIds.includes(exam.examId) ? (
                              <>
                              <BookOpenCheck className="mr-2" /> Go to Dashboard
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
        <footer className="p-6 border-t border-white/10 text-center text-sm text-muted-foreground">
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
