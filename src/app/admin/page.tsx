
'use client';

import { useState } from 'react';
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
import { LogOut, Settings, Home as HomeIcon, History, BrainCircuit, Shield, MessageCircle } from 'lucide-react';
import GethubLogo from '@/components/gethub-logo';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';


function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/admin');
    }
    // Simple admin check, in a real app this should be based on roles in a database
    if (!loading && user && user.email !== 'admin@gethub.com') {
        toast({
            title: "Access Denied",
            description: "You do not have permission to access the admin page.",
            variant: "destructive"
        });
        router.push('/');
    }
  }, [user, loading, router, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = event.target?.result as string;
        const questions = JSON.parse(jsonContent);
        // For now, we'll just log the questions to the console.
        // In a real implementation, you would send this to a backend service to update the exams.
        console.log("Uploaded questions:", questions);
        toast({
          title: "Upload Successful",
          description: "Exam questions have been read. See console for output."
        });
      } catch (error) {
        toast({
          title: "Invalid JSON",
          description: "The selected file is not a valid JSON file.",
          variant: "destructive"
        });
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsText(file);
  };

  if (loading || !user || user.email !== 'admin@gethub.com') {
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
                        <SidebarMenuButton tooltip="Communication Practice">
                            <MessageCircle />
                            <span>Comm. Practice</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
             <SidebarGroupLabel>Admin</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/admin">
                        <SidebarMenuButton tooltip="Admin Dashboard" isActive>
                            <Shield />
                            <span>Admin</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
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
              <Shield className="w-6 h-6"/>
              Admin Dashboard
            </h1>
          </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Exam Questions</CardTitle>
                <CardDescription>
                  Select a JSON file with an array of exam questions to update the static exams.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="json-upload">Exam JSON File</Label>
                    <Input id="json-upload" type="file" accept=".json" onChange={handleFileChange} />
                  </div>
                  <Button type="submit" disabled={isUploading}>
                    {isUploading ? <LoaderCircle className="w-4 h-4 animate-spin mr-2" /> : null}
                    Upload Questions
                  </Button>
                </form>
              </CardContent>
            </Card>
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

export default function AdminPageWrapper() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}
