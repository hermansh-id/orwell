"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, MessageCircle, BookOpen, Apple, BarChart2, User } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useSession } from "@/lib/auth-client"

interface Task {
  id: string
  title: string
  completed: boolean
  icon: React.ReactNode
}

interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export default function OnboardingPage() {
  const { data: session } = useSession();

  const tasks: Task[] = [
    {
      id: "verify",
      title: "Verify Your Identity",
      completed: false,
      icon: "👤"
    },
    {
      id: "upload",
      title: "Upload Your Body Compositions",
      completed: false,
      icon: "⚖️"
    },
    {
      id: "finish",
      title: "Finish Onboarding",
      completed: true,
      icon: "👥"
    },
    {
      id: "medical",
      title: "Complete Medical Intake",
      completed: true,
      icon: "📋"
    }
  ]

  const team: TeamMember[] = [
    {
      id: "1",
      name: "Carlos Ramirez",
      role: "Services Manager",
      image: "/placeholder.svg"
    },
    {
      id: "2",
      name: "Matthew Smith",
      role: "Lead Physician",
      image: "/placeholder.svg"
    },
    {
      id: "3",
      name: "Luis Martinez",
      role: "Care Specialist",
      image: "/placeholder.svg"
    },
    {
      id: "4",
      name: "Antonio Gonzalez",
      role: "Wellness Coordinator",
      image: "/placeholder.svg"
    }
  ]



  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}</h1>
            <p className="text-muted-foreground">We're very excited to get started with you!</p>
          </div>
          <Button variant="outline">Need help?</Button>
        </div>

        {/* Onboarding Tasks */}
        <Card className="bg-[#FFF000]">
          <CardHeader>
            <CardTitle>Finish Onboarding</CardTitle>
            <p className="text-lg">
              Please ensure the following items are complete so that your Measured clinician can start your virtual visit:
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-lg bg-[#FFE600] hover:bg-[#FFE000] transition-colors",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {task.completed ? "✓" : "○"}
                  </div>
                  <span>{task.icon}</span>
                  <span>{task.title}</span>
                </div>
                <span>›</span>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Care Team */}
        <Card>
          <CardHeader>
            <CardTitle>Your Care Team</CardTitle>
            <p className="text-muted-foreground">
              Feel free to chat and ask questions with our experts
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}

