import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
  duration?: number; // Duration in milliseconds
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow animation to complete before removing
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-lg p-4 shadow-lg transition-all duration-300 max-w-md",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      )}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="rounded-full p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  );
} 