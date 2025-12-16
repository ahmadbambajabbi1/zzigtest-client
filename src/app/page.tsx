import Link from "next/link";
import { Button } from "@/components/ui/button";
import UnAuthenticatedPage from "@/layouts/UnAuthenticatedPage";

export default function Home() {
  return (
    <UnAuthenticatedPage>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-lg">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-balance">
              Authentication Demo
            </h1>
            <p className="text-lg text-muted-foreground text-balance">
              A clean and minimalistic authentication experience
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="min-w-32">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-32 bg-transparent"
            >
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </UnAuthenticatedPage>
  );
}
