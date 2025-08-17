
'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
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
import { MessageCircle, LogOut, Settings, Home as HomeIcon, History, Shield, BrainCircuit, Send, Sparkles, Volume2, Copy } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generateCommunicationFeedback } from '@/ai/flows/generate-communication-feedback';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'audio';
  content: string;
  audioDataUri?: string;
  isGenerating?: boolean;
};

function CommunicationPracticePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/comms-practice');
    }
  }, [user, loading, router]);
  
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: userInput };
    const assistantMessagePlaceholder: Message = { id: `assistant-${Date.now()}`, role: 'assistant', content: '', isGenerating: true };

    setMessages(prev => [...prev, userMessage, assistantMessagePlaceholder]);
    setUserInput('');
    setIsGenerating(true);

    try {
      const feedbackResult = await generateCommunicationFeedback({ text: userInput });
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `**Feedback:**\n${feedbackResult.feedback}\n\n**Corrected Text:**\n${feedbackResult.correctedText}\n\n**Suggestions:**\n${feedbackResult.suggestions.map(s => `- ${s}`).join('\n')}`
      };
      
      setMessages(prev => prev.map(m => m.id === assistantMessagePlaceholder.id ? assistantMessage : m));

    } catch (err) {
      console.error("Failed to get feedback:", err);
      toast({ title: "Error", description: "Failed to get feedback from the AI.", variant: "destructive" });
      setMessages(prev => prev.filter(m => m.id !== assistantMessagePlaceholder.id));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextToSpeech = async (text: string, messageId: string) => {
    const audioMessagePlaceholder: Message = { id: `audio-${Date.now()}`, role: 'audio', content: '', isGenerating: true };
    setMessages(prev => {
        const index = prev.findIndex(m => m.id === messageId);
        const newMessages = [...prev];
        newMessages.splice(index + 1, 0, audioMessagePlaceholder);
        return newMessages;
    });

    try {
      const ttsResult = await textToSpeech({ text });
      const audioMessage: Message = {
        id: audioMessagePlaceholder.id,
        role: 'audio',
        content: `Audio for: "${text.substring(0, 30)}..."`,
        audioDataUri: ttsResult.audioDataUri
      };
      setMessages(prev => prev.map(m => m.id === audioMessagePlaceholder.id ? audioMessage : m));
    } catch(err) {
      console.error("Failed to generate audio:", err);
      toast({ title: "Error", description: "Failed to generate audio.", variant: "destructive" });
      setMessages(prev => prev.filter(m => m.id !== audioMessagePlaceholder.id));
    }
  }

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "The text has been copied to your clipboard." });
  };
  
  if (loading || !user) {
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
              <SidebarMenuItem>
                <Link href="/comms-practice">
                    <SidebarMenuButton tooltip="Communication Practice" isActive>
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
                <MessageCircle className="w-6 h-6"/>
                English Communication Practice
            </h1>
          </div>
        </header>
        <main className="flex flex-col h-[calc(100vh-61px)]">
          <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8" ref={scrollAreaRef}>
            <div className="space-y-6">
                {messages.length === 0 && (
                    <Card className="max-w-2xl mx-auto border-dashed">
                        <CardHeader className="text-center">
                            <CardTitle>Start a Conversation</CardTitle>
                            <CardDescription>Type a sentence or two below and click send to get AI feedback on your English writing.</CardDescription>
                        </CardHeader>
                    </Card>
                )}
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                         {message.role === 'assistant' && (
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://i.ibb.co/xqNC3WZC/logo-jpg.jpg" alt="AI Assistant" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`max-w-xl rounded-lg p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                           {message.isGenerating ? (
                             <div className="flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                              </div>
                           ) : message.role === 'audio' && message.audioDataUri ? (
                                <audio controls src={message.audioDataUri} className="h-10">Your browser does not support the audio element.</audio>
                           ) : (
                             <div className="prose prose-sm prose-invert max-w-none text-current" dangerouslySetInnerHTML={{ __html: message.content.replace(/\n/g, '<br />') }} />
                           )}
                           {message.role === 'assistant' && !message.isGenerating && (
                            <div className="flex gap-2 mt-3 -mb-2">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleTextToSpeech(message.content, message.id)}>
                                    <Volume2 className="w-4 h-4"/>
                                </Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyText(message.content)}>
                                    <Copy className="w-4 h-4"/>
                                </Button>
                            </div>
                           )}
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt="@user" />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
             <div className="relative max-w-2xl mx-auto">
                 <Textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                    placeholder="Type your message here..." 
                    className="pr-20 min-h-[52px]" 
                    rows={1}
                    disabled={isGenerating}
                  />
                 <Button 
                    type="submit" 
                    size="icon" 
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={handleSendMessage}
                    disabled={isGenerating || !userInput.trim()}
                 >
                    {isGenerating ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                 </Button>
             </div>
          </div>
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

function CommunicationPracticePageWrapper() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">
            <div className="text-center flex flex-col items-center gap-4">
                <LoaderCircle className="w-12 h-12 animate-spin text-primary" />
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        </div>}>
            <CommunicationPracticePage />
        </Suspense>
    );
}

export default function CommunicationPracticePageWrapperWithAuth() {
  return (
    <AuthProvider>
      <CommunicationPracticePageWrapper />
    </AuthProvider>
  );
}
