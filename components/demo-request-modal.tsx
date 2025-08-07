"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { ArrowRight } from "lucide-react";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("demo_requests").insert([{ email }]);

    if (error) {
      toast({
        title: "Ошибка!",
        description: "Не удалось отправить запрос. Попробуйте снова.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Успешно!",
        description: "Ваш запрос на демо отправлен.",
      });
      setEmail("");
      onClose();
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Забронировать демо</DialogTitle>
          <DialogDescription>
            Оставьте свой email, и мы свяжемся с вами для назначения времени
            демонстрации.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Input
              id="email"
              type="email"
              placeholder="your@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
            >
              {isSubmitting ? "Отправка..." : "Отправить запрос"}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
