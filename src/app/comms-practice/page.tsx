
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
import { MessageCircle, LogOut, Settings, Home as HomeIcon, History, Shield, BrainCircuit, Copy, Mic } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { generateCommunicationFeedback } from '@/ai/flows/generate-communication-feedback';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { LoaderCircle } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { markdownToHtml } from '@/lib/utils';


type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isGenerating?: boolean;
};

// Check for SpeechRecognition API
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));

function CommunicationPracticePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef('');


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


  const playAudioAndListen = async (audioDataUri: string) => {
    return new Promise<void>((resolve, reject) => {
        const audio = new Audio(audioDataUri);
        
        audio.onended = () => {
            // Wait for 3 seconds before enabling the mic
            setTimeout(() => {
                setIsGenerating(false);
                if (recognitionRef.current && recognitionRef.current.state !== 'speaking') {
                    recognitionRef.current.start();
                }
                resolve();
            }, 3000); // 3-second delay
        };

        audio.onerror = () => {
            toast({ title: "Audio Error", description: "Could not play the audio response.", variant: "destructive"});
            setIsGenerating(false);
            reject(new Error("Audio playback error"));
        };

        audio.play().catch(error => {
            toast({ title: "Audio Playback Failed", description: "Could not automatically play the audio.", variant: "destructive"});
            setIsGenerating(false);
            reject(error);
        });
    });
  };


  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isGenerating) return;

    // Prevent duplicate sends
    setIsGenerating(true);

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    
    try {
      if (!text.trim()) {
        const errorMessage = "I can't provide feedback on an empty message. Please say something, and I'll be happy to help you practice!";
        setMessages(prev => [...prev, {id: `assistant-error-${Date.now()}`, role: 'assistant', content: errorMessage}]);
        const ttsResultOnError = await textToSpeech({ text: errorMessage });
        await playAudioAndListen(ttsResultOnError.audioDataUri);
        return;
      }
      
      const feedbackResult = await generateCommunicationFeedback({ text: userMessage.content });
      const aiResponseText = feedbackResult.response;

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponseText,
      };
      setMessages(prev => [...prev, assistantMessage]);
      
      if (!aiResponseText.trim()) {
         const emptyResponseMessage = "I'm sorry, I couldn't generate a response. Could you try saying that again?";
         setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'assistant') {
                lastMessage.content = emptyResponseMessage;
            }
            return newMessages;
         });
         setIsGenerating(false);
         return;
      }

      // Generate and play audio
      const ttsResult = await textToSpeech({ text: aiResponseText });
      await playAudioAndListen(ttsResult.audioDataUri);

    } catch (err) {
      console.error("Failed to get feedback:", err);
      // Let's create a more helpful, conversational error message.
      const errorMessage = "I'm having a little trouble connecting right now. Let's try that again in a moment.";
      const assistantMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: errorMessage,
      };
      setMessages(prev => [...prev, assistantMessage]);
       try {
        const ttsResult = await textToSpeech({ text: errorMessage });
        await playAudioAndListen(ttsResult.audioDataUri);
       } catch (ttsErr) {
            setIsGenerating(false);
       }
    }
  };
  
   useEffect(() => {
    if (!SpeechRecognition) {
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    
    recognition.onstart = () => {
        setIsRecording(true);
        finalTranscriptRef.current = '';
        
        // Set a 5-minute timeout for the entire recording session.
        if (recordingTimeoutRef.current) {
          clearTimeout(recordingTimeoutRef.current);
        }
        recordingTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && recognitionRef.current.state === 'speaking') {
            recognitionRef.current.stop();
          }
        }, 5 * 60 * 1000); // 5 minutes
    };

    recognition.onresult = (event) => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      
      let interimTranscript = '';
      let currentFinalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          currentFinalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      finalTranscriptRef.current = (finalTranscriptRef.current + ' ' + currentFinalTranscript).trim();
      setUserInput(finalTranscriptRef.current + interimTranscript);
      
      speechTimeoutRef.current = setTimeout(() => {
         if (recognitionRef.current && recognitionRef.current.state === 'speaking') {
            recognitionRef.current.stop();
         }
      }, 3000); // 3-second pause
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
      if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }

      const transcriptToSend = finalTranscriptRef.current.trim();
      
      if (transcriptToSend && !isGenerating) {
        handleSendMessage(transcriptToSend);
      }
      finalTranscriptRef.current = '';
    };

    recognition.onerror = (event) => {
      toast({ title: "Speech Recognition Error", description: event.error, variant: "destructive"});
      setIsRecording(false);
      if (recognitionRef.current && recognitionRef.current.state === 'speaking') {
        recognitionRef.current.stop();
      }
    };
    
    recognitionRef.current = recognition;

    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
       if (recordingTimeoutRef.current) {
        clearTimeout(recordingTimeoutRef.current);
      }
      if (recognitionRef.current && recognitionRef.current.state === 'speaking') {
        recognitionRef.current.stop();
      }
    }

  }, [toast, isGenerating]);


  const handleToggleRecording = () => {
     if (!SpeechRecognition) {
      toast({ title: "Browser Not Supported", description: "Your browser does not support speech recognition.", variant: "destructive"});
      return;
    }
    if (isRecording) {
      if (recognitionRef.current?.state === 'speaking') {
        recognitionRef.current.stop();
      }
    } else {
      setUserInput('');
      finalTranscriptRef.current = '';
      recognitionRef.current.start();
    }
  };

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
                AI Language Coach
            </h1>
          </div>
        </header>
        <main className="flex flex-col h-[calc(100vh-61px)]">
          <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8" ref={scrollAreaRef}>
            <div className="space-y-6">
                {messages.length === 0 && !isGenerating && (
                    <Card className="max-w-2xl mx-auto border-dashed">
                        <CardHeader className="text-center items-center">
                             <GethubLogo className="w-16 h-16 mb-4" width={64} height={64} />
                            <CardTitle>Start a Conversation</CardTitle>
                            <CardDescription>Practice your English by clicking the microphone and speaking. GETHUB will reply and help you improve.</CardDescription>
                        </CardHeader>
                    </Card>
                )}
                {messages.map((message) => (
                    <div key={message.id} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                         {message.role === 'assistant' && (
                           <GethubLogo className="w-8 h-8" width={32} height={32} />
                        )}
                        <div className={`max-w-xl rounded-lg p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                             <div className="prose prose-sm prose-invert max-w-none text-current" dangerouslySetInnerHTML={{ __html: markdownToHtml(message.content) }} />
                           {message.role === 'assistant' && (
                            <div className="flex gap-2 mt-3 -mb-2">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyText(message.content)}>
                                    <Copy className="w-4 h-4"/>
                                </Button>
                            </div>
                           )}
                        </div>
                        {message.role === 'user' && (
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user.photoURL ?? 'https://placehold.co/100x100.png'} alt="@user" data-ai-hint="student portrait" />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
                {isGenerating && messages[messages.length - 1]?.role === 'user' && (
                     <div className="flex items-start gap-4">
                        <GethubLogo className="w-8 h-8" width={32} height={32} />
                        <div className="max-w-xl rounded-lg p-4 bg-secondary">
                             <div className="flex items-center gap-2">
                                <LoaderCircle className="w-4 h-4 animate-spin" />
                                <span>GETHUB is thinking...</span>
                              </div>
                        </div>
                    </div>
                )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
             <div className="relative max-w-2xl mx-auto">
                 <Textarea 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(userInput); } }}
                    placeholder={isRecording ? "Listening..." : "Click the mic to speak, or type here..."}
                    className="pr-16 min-h-[52px]" 
                    rows={1}
                    disabled={isGenerating || isRecording}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    {SpeechRecognition && (
                      <Button 
                          type="button" 
                          size="icon" 
                          variant={isRecording ? "destructive" : "ghost"}
                          onClick={handleToggleRecording}
                          disabled={isGenerating}
                      >
                          <Mic className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
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
