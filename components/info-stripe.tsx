import { MapPin, Clock, Phone } from "lucide-react";

export function InfoStripe() {
  return (
    <div className="bg-black/90 py-3 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-white/80">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Av. Principal 1234, Montevideo</span>
            <span className="sm:hidden">Montevideo</span>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="hidden sm:inline">Lun-Sab: 9:00-19:00</span>
            <span className="sm:hidden">9:00-19:00</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-xs text-white/80">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            <a href="tel:+59829123456" className="hover:text-white transition-colors">
              +598 2 9123456
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
