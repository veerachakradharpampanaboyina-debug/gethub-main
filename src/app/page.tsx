
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
import { ArrowRight, BrainCircuit, BookOpenCheck } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { examCategories } from '@/lib/exam-categories';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function HomePage() {
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
                    <Link href="#exams">
                        Explore Exams <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </section>

        <section id="exams" className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Choose Your Exam</h2>
                <p className="text-muted-foreground mt-2">Select a category to find your exam and start practicing.</p>
            </div>

            <Tabs defaultValue={examCategories[0].category} className="w-full">
                <div className="flex justify-center mb-8">
                    <TabsList className="grid w-full max-w-5xl grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto">
                        {examCategories.map((category) => (
                            <TabsTrigger key={category.category} value={category.category} className="text-center whitespace-normal h-full py-2">
                                {category.category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {examCategories.map((category) => (
                <TabsContent key={category.category} value={category.category}>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {category.exams.map((exam) => (
                        <Card key={exam.examId} className="flex flex-col">
                            <CardHeader>
                            <CardTitle>{exam.examName}</CardTitle>
                            <CardDescription>{exam.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-end gap-4">
                            <Button asChild className="w-full" variant="secondary">
                                <Link href={`/practice?topic=${encodeURIComponent(exam.examName)}`}>
                                    <BrainCircuit className="mr-2" /> Practice with AI
                                </Link>
                            </Button>
                             <Button asChild className="w-full">
                                <Link href={`/exam/${exam.examId}`}>
                                  <BookOpenCheck className="mr-2" /> Take Static Exam
                                </Link>
                              </Button>
                            </CardContent>
                        </Card>
                        ))}
                    </div>
                </TabsContent>
                ))}
            </Tabs>
        </section>
      </main>
      <footer className="p-4 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GETHUB. All rights reserved.
      </footer>
    </div>
  );
}
