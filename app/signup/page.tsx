import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/SignInForm";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Access your account and manage products.</CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
