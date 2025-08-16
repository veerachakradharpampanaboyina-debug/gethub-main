import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  FileText,
  Settings,
  User,
} from 'lucide-react';
import type { Exam } from '@/lib/types';
import { ExamView } from '@/components/exam-view';
import GradeAlLogo from '@/components/grade-ai-logo';

const sampleExam: Exam = {
  student: {
    name: 'Alex Johnson',
    id: 'student-001',
    avatarUrl: 'https://placehold.co/100x100.png',
  },
  examName: 'History Midterm Exam',
  examId: 'hist-mid-01',
  questions: [
    {
      questionId: 'q1',
      questionType: 'multipleChoice',
      questionText: 'In what year did the Titanic sink?',
      options: ['1905', '1912', '1918', '1923'],
      studentAnswer: '1912',
      correctAnswer: '1912',
      pointsPossible: 10,
    },
    {
      questionId: 'q2',
      questionType: 'trueFalse',
      questionText: 'The Great Wall of China is visible from the moon.',
      studentAnswer: 'False',
      correctAnswer: 'False',
      pointsPossible: 10,
    },
    {
      questionId: 'q3',
      questionType: 'multipleChoice',
      questionText: 'Who was the first President of the United States?',
      options: [
        'Thomas Jefferson',
        'Abraham Lincoln',
        'George Washington',
        'John Adams',
      ],
      studentAnswer: 'Thomas Jefferson',
      correctAnswer: 'George Washington',
      pointsPossible: 10,
    },
    {
      questionId: 'q4',
      questionType: 'freeText',
      questionText:
        'Describe the main causes of the American Revolutionary War.',
      studentAnswer:
        'The main causes were taxes and the fact that the colonists had no say in the British government. The Stamp Act and Townshend Acts were major triggers.',
      correctAnswer:
        'Key causes include "taxation without representation," where colonists were taxed without having elected representatives in British Parliament. Major acts that fueled tensions were the Stamp Act, Townshend Acts, and the Tea Act. The Boston Massacre and Boston Tea Party were pivotal events that escalated the conflict towards war.',
      pointsPossible: 20,
    },
     {
      questionId: 'q5',
      questionType: 'freeText',
      questionText:
        'What was the significance of the Renaissance?',
      studentAnswer:
        'it was a time of rebirth in art and science',
      correctAnswer:
        'The Renaissance was a fervent period of European cultural, artistic, political and economic "rebirth" following the Middle Ages. Generally described as taking place from the 14th century to the 17th century, the Renaissance promoted the rediscovery of classical philosophy, literature and art. Some of the greatest thinkers, authors, statesmen, scientists and artists in human history thrived during this era, while global exploration opened up new lands and cultures to European commerce.',
      pointsPossible: 20,
    },
  ],
};

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <GradeAlLogo className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">GradeAI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Exams</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="History Midterm" isActive>
                  <FileText />
                  <span>History Midterm</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
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
                  <AvatarImage src="https://placehold.co/100x100.png" alt="@teacher" data-ai-hint="teacher portrait"/>
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <span className="text-sm">Teacher Name</span>
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
              <User className="w-6 h-6" />
              {sampleExam.student.name}
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
          <ExamView exam={sampleExam} />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
