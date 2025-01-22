import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"
import { Toaster } from "../components/ui/toaster"
import { useAuth } from "@/context/AtuhContext"

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

const signupSchema = loginSchema.extend({
  email: z.string().email("Invalid email address"),
})

export function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const schema = isLogin ? loginSchema : signupSchema
  const navigate = useNavigate()
  const { toast } = useToast()
  const { login, signup, isLoggedIn } = useAuth()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  })

  if(isLoggedIn){
    navigate("/dashboard")
  }


  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      if (isLogin) {
        const { username, password } = values
        await login(username, password)
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          duration: 3000,
        })
      } else {
        const { email, username, password } = values as z.infer<typeof signupSchema>
        await signup(email, username, password)
        toast({
          title: "Sign Up Successful",
          description: "Your account has been created.",
          duration: 3000,
        })
      }
      navigate("/dashboard")
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Authentication Error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[40rem]">
        <CardHeader>
          <CardTitle>{isLogin ? "Welcome Back!" : "Create an Account"}</CardTitle>
          <CardDescription>
            {isLogin ? "Please log in to continue." : "Please fill in the details to sign up."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                {!isLogin && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Button
                  variant="link"
                  type="button"
                  className="p-0 text-blue-600"
                  onClick={() => {
                    setIsLogin((prev) => !prev)
                    form.reset()
                  }}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <Toaster />
    </div>
  )
}

