import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";

const CONTACT_ITEMS = [
  { icon: Mail, label: "Email", value: "hello@dealio.app", href: "mailto:hello@dealio.app" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-2024", href: "tel:+15550102024" },
  { icon: MapPin, label: "Address", value: "1200 Auto Row, Springfield" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 9am–7pm" },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions? We&apos;re here to help
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Whether you&apos;re curious about a vehicle, financing, or just
            want to say hi — reach out any way that&apos;s convenient for
            you.
          </p>

          <dl className="mt-8 flex flex-col gap-5">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="size-4" />
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {item.href ? (
                      <a href={item.href} className="hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
