"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminContext } from "./AdminGuard";
import { Image, Star, MessageSquare } from "lucide-react";

interface Stats {
  totalTattoos: number;
  featuredTattoos: number;
  totalTestimonials: number;
}

export default function Dashboard() {
  const { password } = useAdminContext();
  const [stats, setStats] = useState<Stats>({
    totalTattoos: 0,
    featuredTattoos: 0,
    totalTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const headers = { "x-admin-password": password };
        const [tattoosRes, testimonialsRes] = await Promise.all([
          fetch("/api/tattoos", { headers }),
          fetch("/api/testimonials", { headers }),
        ]);

        const tattoos = await tattoosRes.json();
        const testimonials = await testimonialsRes.json();

        const tattooList = Array.isArray(tattoos) ? tattoos : [];
        const testimonialList = Array.isArray(testimonials) ? testimonials : [];

        setStats({
          totalTattoos: tattooList.length,
          featuredTattoos: tattooList.filter(
            (t: { featured: number }) => t.featured === 1
          ).length,
          totalTestimonials: testimonialList.length,
        });
      } catch {
        // Stats will remain at 0
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [password]);

  const statCards = [
    {
      label: "Toplam Dövme",
      value: stats.totalTattoos,
      icon: <Image className="w-8 h-8 text-gold" />,
    },
    {
      label: "Öne Çıkan",
      value: stats.featuredTattoos,
      icon: <Star className="w-8 h-8 text-gold" />,
    },
    {
      label: "Yorumlar",
      value: stats.totalTestimonials,
      icon: <MessageSquare className="w-8 h-8 text-gold" />,
    },
  ];

  return (
    <div>
      <h2 className="font-display tracking-wide text-2xl text-white mb-6">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card
            key={card.label}
            className="bg-[#1a1a1a] border-[#3a3a3a]"
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              {card.icon}
              {loading ? (
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {card.value}
                </span>
              )}
              <span className="text-sm text-neutral-400">{card.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
