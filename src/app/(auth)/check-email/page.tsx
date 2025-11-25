import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <Card className="w-[350px] shadow-lg text-center">
      <CardHeader>
        <CardTitle>Confirmation Sent</CardTitle>
        <CardDescription>
          A confirmation link has been sent to your email address. Please check your inbox and click the link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href="/login" className="text-sm text-blue-600 underline hover:text-blue-800">
          Return to Login
        </Link>
      </CardContent>
    </Card>
  );
}