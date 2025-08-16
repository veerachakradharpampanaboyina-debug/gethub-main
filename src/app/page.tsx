
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, BrainCircuit } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';

const sampleExams = [
  {
    examId: 'upsc-pre-2023-gs1',
    examName: 'UPSC Civil Services Prelims 2023 - GS Paper 1',
    description: 'General Studies Paper 1 from the 2023 UPSC preliminary examination.',
    examTopic: 'UPSC Civil Services'
  },
  {
    examId: 'ssc-cgl-2023-tier1',
    examName: 'SSC CGL 2023 - Tier 1',
    description: 'Staff Selection Commission Combined Graduate Level Examination, Tier 1 general awareness paper.',
    examTopic: 'SSC CGL General Awareness'
  },
  {
    examId: 'gate-2024-cs',
    examName: 'GATE 2024 - Computer Science',
    description: 'Graduate Aptitude Test in Engineering for Computer Science and Information Technology.',
    examTopic: 'GATE Computer Science'
  }
];


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <GethubLogo className="w-8 h-8 text-primary" width={32} height={32}/>
          <span className="text-xl font-bold">GETHUB</span>
        </div>
        <div>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome to GETHUB</h1>
            <p className="text-muted-foreground mt-2">Your hub for competitive exam preparation. Choose an exam to get started.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleExams.map((exam) => (
            <Card key={exam.examId}>
              <CardHeader>
                <CardTitle>{exam.examName}</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                    <Link href={`/practice?topic=${encodeURIComponent(exam.examName)}`}>
                        <BrainCircuit className="mr-2" /> Practice with AI
                    </Link>
                </Button>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/exam/${exam.examId}`}>
                    Take Static Exam <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GETHUB. All rights reserved.
      </footer>
    </div>
  );
}
