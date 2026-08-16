import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

function buildWhatsAppMessage(vehicleTitle: string, vehicleUrl: string) {
  return `Hi! I'm interested in the ${vehicleTitle}. Could you tell me more? ${vehicleUrl}`;
}

export function WhatsAppButton({
  phoneNumber,
  vehicleTitle,
  vehicleUrl,
}: {
  phoneNumber: string | undefined;
  vehicleTitle: string;
  vehicleUrl: string;
}) {
  if (!phoneNumber) {
    return (
      <div className="flex flex-col gap-1">
        <Button type="button" disabled className="w-full bg-[#25D366] text-white">
          <MessageCircle />
          Chat on WhatsApp
        </Button>
        <p className="text-xs text-muted-foreground">
          WhatsApp contact isn&apos;t configured yet.
        </p>
      </div>
    );
  }

  const message = buildWhatsAppMessage(vehicleTitle, vehicleUrl);
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button
      nativeButton={false}
      render={<a href={href} target="_blank" rel="noopener noreferrer" />}
      className="w-full bg-[#25D366] text-white hover:bg-[#1ebe5b]"
    >
      <MessageCircle />
      Chat on WhatsApp
    </Button>
  );
}
