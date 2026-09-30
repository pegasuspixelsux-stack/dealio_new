"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWhatsApp } from "@/components/whatsapp-context";

export function WhatsAppContact() {
  const { open, closeModal, openModal } = useWhatsApp();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    const message = `Hola, mi nombre es ${name} y me gustaría conocer más sobre vuestros vehículos.`;
    const encodedMessage = encodeURIComponent(message);

    // Remove spaces and special characters from phone, add country code if needed
    const cleanPhone = phone.replace(/\D/g, "");
    const phoneWithCode = cleanPhone.startsWith("598") ? cleanPhone : `598${cleanPhone}`;

    // Use WhatsApp Web URL
    const whatsappUrl = `https://wa.me/${phoneWithCode}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappUrl, "_blank");

    closeModal();
    setName("");
    setPhone("");
    setLoading(false);
  };

  return (
    <>
      {/* Contact Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="size-5 text-green-500" />
              <h2 className="text-lg font-semibold">Contáctanos por WhatsApp</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium">
                  Número de teléfono
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+598 9 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                >
                  {loading ? "Abriendo..." : "Abrir WhatsApp"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
