"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Loader2, TriangleAlert } from "lucide-react";

import { submitContactAction } from "@/lib/actions/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    const result = await submitContactAction({ name, email, message });
    if (result.ok) {
      setStatus("sent");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Send us a message</CardTitle>
      </CardHeader>
      <CardContent>
        {status === "sent" ? (
          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            <CircleCheck />
            <AlertDescription>
              Thanks, {name.split(" ")[0] || "there"}! We received your
              message and will get back to you shortly.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error ? (
              <Alert variant="destructive">
                <TriangleAlert />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contact-message">How can we help?</Label>
              <Textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I have a question about..."
              />
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? <Loader2 className="animate-spin" /> : null}
              Send message
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
