"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Eye,
  Download,
  Users,
  CheckCircle,
  Star,
  Zap,
  Lock,
  Monitor,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Play,
  X,
  Github,
  Heart,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DemoRequestModal } from "@/components/demo-request-modal";

export default function Home() {
  const { toast } = useToast();
  const [demoAnimationProgress, setDemoAnimationProgress] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const [contactForm, setContactForm] = useState({
    firstName: "",
    email: "",
    message: "", // Новое поле
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const demoSectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const demoSection = demoSectionRef.current;
      if (!demoSection) return;

      const rect = demoSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;

      // The section is taller than the viewport to create a scrollable area for the animation.
      // The animation duration is the difference between the section's height and the viewport's height.
      const animationDuration = demoSection.scrollHeight - viewportHeight;

      // We calculate the progress of the scroll within the animation area.
      // Progress starts at 0 when the top of the section reaches the top of the viewport,
      // and goes to 1 when the bottom of the section reaches the bottom of the viewport.
      const progress = -sectionTop / animationDuration;

      const clampedProgress = Math.max(0, Math.min(1, progress));

      setDemoAnimationProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page loads inside the demo section
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Проверяем URL параметры для показа сообщения об успешной отправке
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("success") === "true") {
      toast({
        title: "Успешно!",
        description:
          "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
      });
      // Очищаем URL от параметра success
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  // Calculate which badges should be active based on animation progress
  const getBadgeVisibility = (progress: number) => {
    return {
      candidate1: progress >= 0.1,
      interviewer1: progress >= 0.15,
      candidate2: progress >= 0.3,
      interviewer2: progress >= 0.35,
      candidate3: progress >= 0.5,
      interviewer3: progress >= 0.55,
      candidate4: progress >= 0.7,
      interviewer4: progress >= 0.75,
      connectionLine: progress >= 0.2,
      monitoring: progress >= 0.8,
      connectionLost: progress >= 0.95,
    };
  };

  const badges = getBadgeVisibility(demoAnimationProgress);

  const progress = Math.round(demoAnimationProgress * 100);
  const paddedProgress = String(progress).padStart(3, "\u00A0");

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingContact(true);

    try {
      const formData = new FormData();
      formData.append("firstName", contactForm.firstName);
      formData.append("email", contactForm.email);
      formData.append("message", contactForm.message);
      formData.append("_subject", "FairHire: Связаться с нами");
      formData.append("_template", "table");
      formData.append("_captcha", "false");

      const response = await fetch(
        "https://formsubmit.co/3ab6c5dce02848d8e39c51ae6042b004",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast({
          title: "Успешно!",
          description:
            "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
        });
        setContactForm({
          firstName: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Ошибка отправки");
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      toast({
        title: "Ошибка!",
        description:
          "Не удалось отправить сообщение. Попробуйте снова или напишите напрямую на vsezold@gmail.com",
        variant: "destructive",
      });
    }

    setIsSubmittingContact(false);
  };

  const features = [
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: "B2B решение",
      description: "Для HR и технических интервьюеров",
      position: { top: "-10%", left: "-5%" },
    },
    {
      icon: <Monitor className="w-10 h-10 text-white" />,
      title: "Мультиплатформа",
      description: "MacOS и Windows поддержка",
      position: { top: "105%", left: "105%" },
    },
    {
      icon: <Shield className="w-10 h-10 text-white" />,
      title: "Мониторинг",
      description: "Отслеживание всех действий кандидата",
      position: { top: "-10%", left: "105%" },
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-white" />,
      title: "Честная оценка",
      description: "Объективные данные для принятия решений",
      position: { top: "105%", left: "-5%" },
    },
  ];

  const technologies = [
    { name: "Google Meet", icon: "🎥" },
    { name: "Zoom", icon: "📹" },
    { name: "Jitsi Meet", icon: "💻" },
    { name: "SaluteJazz", icon: "🎵" },
    { name: "Yandex Code", icon: "⚡" },
    { name: "KTalk", icon: "💬" },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Полная защита от списывания",
      description:
        "Отслеживание всех действий кандидата в режиме реального времени",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Прозрачность процесса",
      description:
        "Видите каждое нажатие клавиш, движение мыши и переключение окон",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Мгновенные уведомления",
      description: "Получайте алерты при подозрительной активности кандидата",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Блокировка скриншотов",
      description: "Автоматическая защита от попыток сделать снимки экрана",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                FairHire
              </span>
            </div>

            <nav className="hidden lg:flex space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Главная
              </button>
              <button
                onClick={() => scrollToSection("demo-section")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Как работает
              </button>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollToSection("download")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Скачать
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Контакты
              </button>
              <button
                onClick={() => scrollToSection("support")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Поддержать
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/vsezol/fairhire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-purple-600 transition-colors hidden md:block"
              >
                <Github className="w-6 h-6" />
              </a>

              <a
                href="https://boosty.to/vsezold"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-orange-500 transition-colors hidden md:block pr-2"
              >
                <Heart className="w-6 h-6" />
              </a>

              <Button
                onClick={() => scrollToSection("download")}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Попробовать
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-purple-50 lg:h-[100vh] lg:flex lg:items-center lg:pt-0 lg:pb-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
              Честные собеседования
              <br />
              без обмана
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-8 leading-relaxed">
              FairHire обеспечивает прозрачность интервью, отслеживая действия
              кандидата в режиме реального времени и предотвращая списывание
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() => scrollToSection("download")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Download className="w-5 h-5 mr-2" />
                Скачать FairHire
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                <a
                  href="https://boosty.to/vsezold/posts/5e4b81d4-9a6b-4ded-b9c0-07874349a179?share=post_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Посмотреть демо
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:hidden">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">B2B решение</h3>
                <p className="text-gray-600">
                  Для HR и технических интервьюеров
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Мультиплатформа</h3>
                <p className="text-gray-600">MacOS и Windows поддержка</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Мониторинг</h3>
                <p className="text-gray-600">
                  Отслеживание всех действий кандидата
                </p>
              </div>
            </div>

            <div
              className={`hidden lg:block ${
                hoveredFeature !== null ? "has-hovered-feature" : ""
              }`}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-orb-container ${
                    hoveredFeature === index ? "focused" : ""
                  }`}
                  style={
                    {
                      top: feature.position.top,
                      left: feature.position.left,
                      animationDelay: `${index * 1.2}s`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setHoveredFeature(index)}
                >
                  <div className="feature-orb">{feature.icon}</div>
                  <div className="feature-text-content">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - Enhanced with scroll-based animation */}
      <section
        ref={demoSectionRef}
        id="demo-section"
        className="py-32 md:py-24 bg-gradient-to-br from-gray-50 to-purple-50"
        style={{
          minHeight: "250vh", // Taller section for scroll animation canvas
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-[-20px] md:top-8 flex h-[calc(100vh-4rem)] flex-col justify-center">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Как работает FairHire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Интервьюер в режиме реального времени отслеживает действия
              кандидата
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block">
              <div
                className={`connection-line ${
                  badges.connectionLine ? "active" : ""
                }`}
              >
                <div
                  className={`connection-break ${
                    badges.connectionLost ? "active" : ""
                  }`}
                >
                  <X className="w-6 h-6 text-red-500" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center max-w-6xl mx-auto gap-8 md:gap-0">
              {/* Interviewer Side */}
              <div className="text-center relative">
                <div
                  className={`relative inline-block ${
                    badges.monitoring ? "monitoring-pulse" : ""
                  }`}
                >
                  <h3 className="text-2xl font-bold text-purple-600 mt-6 mb-2">
                    Интервьюер
                  </h3>

                  <img
                    src="/girl.png"
                    alt="Интервьюер"
                    className="w-full max-w-[200px] mx-auto rounded-2xl"
                  />

                  {/* Interviewer alerts */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 space-y-2">
                    <div
                      className={`badge-interviewer-1 w-fit bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer1 ? "active" : ""
                      }`}
                    >
                      🚨 Скрытие приложения!
                    </div>
                    <div
                      className={`badge-interviewer-2 w-fit bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer2 ? "active" : ""
                      }`}
                    >
                      ⚠️ Cкриншот!
                    </div>
                    <div
                      className={`badge-interviewer-3 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer3 ? "active" : ""
                      }`}
                    >
                      ⚠️ Копирование!
                    </div>
                    <div
                      className={`badge-interviewer-4 w-fit bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer4 ? "active" : ""
                      }`}
                    >
                      Подозрительно!
                    </div>
                  </div>
                </div>
              </div>

              {/* Candidate Side */}
              <div className="text-center relative">
                <div className="relative inline-block">
                  <h3 className="text-2xl font-bold text-blue-600 mt-6 mb-2">
                    Кандидат
                  </h3>

                  <img
                    src="/man.png"
                    alt="Кандидат"
                    className="w-full max-w-[200px] mx-auto rounded-2xl"
                  />

                  {/* Candidate cheating attempts */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 space-y-2">
                    <div
                      className={`badge-candidate-1 w-fit bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate1 ? "active" : ""
                      }`}
                    >
                      Открыл Google
                    </div>
                    <div
                      className={`badge-candidate-2 w-fit bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate2 ? "active" : ""
                      }`}
                    >
                      📸 Скриншот
                    </div>
                    <div
                      className={`badge-candidate-3 w-fit bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate3 ? "active" : ""
                      }`}
                    >
                      Ctrl + C / Ctrl + V
                    </div>
                    <div
                      className={`badge-candidate-4 w-fit bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate4 ? "active" : ""
                      }`}
                    >
                      Открыл ChatGPT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced progress indicator */}
            {demoAnimationProgress > 0 && demoAnimationProgress < 1 && (
              <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
                <div className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <span className="tabular-nums">
                      Анимация: {paddedProgress}%
                    </span>
                    <div className="w-20 h-2 bg-purple-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${demoAnimationProgress * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs opacity-75 text-center mt-1">
                    {demoAnimationProgress < 1
                      ? "Прокручивайте для продолжения"
                      : "Готово!"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Поддерживаемые платформы
            </h2>
            <p className="text-xl text-gray-600">
              FairHire интегрируется со всеми популярными платформами для
              проведения интервью
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-8 ">
          {[
            [...technologies, ...technologies],
            [...technologies, ...technologies].reverse(),
          ].map((row, rowIndex) => {
            const duplicatedRow = [...row, ...row];
            return (
              <div
                key={rowIndex}
                className={`flex items-center space-x-8 scale-x-110 ${
                  rowIndex === 0 ? "-rotate-[5deg]" : "-rotate-[5deg]"
                }`}
              >
                <div
                  className={`flex selection:shrink-0 items-center space-x-8  ${
                    rowIndex % 2 ? "animate-marquee" : "animate-marquee2"
                  }`}
                >
                  {duplicatedRow.map((tech, index) => (
                    <div
                      key={`${tech.name}-${index}`}
                      className="flex items-center justify-center space-x-2 shrink-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl mix-blend-multiply px-4 h-[80px] max-h-[80px]"
                    >
                      <div className="w-8 h-8 p-2 rounded-lg flex items-center justify-center text-3xl">
                        <span>{tech.icon}</span>
                      </div>
                      <p className="font-semibold text-lg text-gray-800">
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Почему выбирают FairHire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Революционное решение для проведения честных технических интервью.
              Повысьте качество найма и исключите возможность обмана.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Увеличьте эффективность найма на 45%
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              FairHire снижает количество недобросовестных кандидатов и повышает
              точность оценки навыков кандидатов.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <p className="opacity-90">Снижение обмана</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <p className="opacity-90">Точность оценки</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1.5x</div>
                <p className="opacity-90">Быстрее найм</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Начните использовать FairHire
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Выберите вашу роль и воспользуйтесь одним из наших приложений.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Interviewer */}
            <Card className="bg-gradient-to-br from-purple-800 to-purple-900 border-0 text-white p-4 md:p-8">
              <CardContent className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Для интервьюеров</h3>
                <p className="text-lg text-purple-100 mb-8">
                  Контролируйте процесс собеседования. Отслеживайте действия
                  кандидатов в режиме реального времени.
                </p>
                <ul className="text-left space-y-3 mb-8 text-purple-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Веб-интерфейс для мониторинга
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Детальные отчеты по кандидатам
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Мгновенные уведомления
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="w-full bg-white text-purple-800 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Панель мониторинга
                </Button>
              </CardContent>
            </Card>

            {/* For Candidate */}
            <Card className="bg-gradient-to-br from-blue-800 to-blue-900 border-0 text-white p-4 md:p-8">
              <CardContent className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Monitor className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Для кандидатов</h3>
                <p className="text-lg text-blue-100 mb-8">
                  Установите приложение для участия в честном собеседовании.
                  Простая настройка за несколько кликов.
                </p>
                <ul className="text-left space-y-3 mb-8 text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Безопасная установка
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Автоматическая настройка
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
                    Поддержка всех платформ
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-4 items-center justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-blue-800 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <a
                      href="https://7a7lrn6qmd58vdze.public.blob.vercel-storage.com/FairHire.dmg"
                      download="FairHire.dmg"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      MacOS App
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-white text-blue-800 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <a
                      href="https://7a7lrn6qmd58vdze.public.blob.vercel-storage.com/FairHire%20Setup.exe"
                      download="FairHire Setup.exe"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Windows App
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Связаться с нами
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Есть вопросы по FairHire? Хотите персональную демонстрацию? Мы
              поможем интегрировать решение в ваш процесс найма.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                Отправьте сообщение
              </h3>
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Имя
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Ваше имя"
                      value={contactForm.firstName}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="your@company.com"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      className="w-full px-4 py-3 border border-gray-300 placeholder:text-muted-foreground rounded-lg text-sm focus:ring-2 focus:ring-black  outline-none focus:border-transparent min-h-[100px]"
                      placeholder="Расскажите о ваших потребностях..."
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
                  disabled={isSubmittingContact}
                >
                  {isSubmittingContact ? "Отправка..." : "Отправить сообщение"}
                  {!isSubmittingContact && (
                    <ArrowRight className="w-5 h-5 ml-2" />
                  )}
                </Button>
              </form>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-4">
                Нужна персональная демонстрация?
              </h4>
              <p className="mb-6 opacity-90">
                Забронируйте 30-минутную персональную демонстрацию FairHire и
                узнайте, как мы можем улучшить ваш процесс найма.
              </p>
              <Button
                variant="secondary"
                className="bg-white text-purple-800 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg w-full"
                onClick={() => setIsDemoModalOpen(true)}
              >
                Забронировать демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Developer Section */}
      <section
        id="support"
        className="py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Поддержать разработчика
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FairHire создается одним разработчиком. Ваша поддержка помогает
              развивать проект и добавлять новые функции.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-6">
                  <Image
                    src="/developer.jpeg"
                    alt="Всеволод Золотов"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full shadow-lg rounded-full bg-gradient-to-r from-orange-300 to-orange-400 p-1"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Всеволод Золотов
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Senior Software Engineer и Спикер. Создаю инновационные
                  решения для HR-сферы. FairHire — проект для решения проблемы
                  собеседований в IT.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <a
                      href="https://t.me/lifeindev"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      Телеграм канал
                    </a>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <a
                      href="https://boosty.to/vsezold"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Поддержать
                    </a>
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8">
                  <h4 className="text-xl font-bold mb-4 text-gray-900">
                    Почему поддержка важна?
                  </h4>
                  <ul className="text-left space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-orange-500 mt-0.5 shrink-0" />
                      <span>Развитие новых функций мониторинга</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-orange-500 mt-0.5 shrink-0" />
                      <span>Поддержка большего количества платформ</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-orange-500 mt-0.5 shrink-0" />
                      <span>Улучшение пользовательского опыта</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-orange-500 mt-0.5 shrink-0" />
                      <span>Бесплатное использование для всех</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  FairHire
                </span>
              </div>
              <p className="text-gray-300 max-w-md mb-6">
                Революционное решение для проведения честных интервью. Повысьте
                качество найма с помощью передовых технологий мониторинга.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/vsezol/fairhire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/lifeindev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <a
                  href="https://boosty.to/vsezold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Heart className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div></div>

            <div>
              <h4 className="font-bold text-lg mb-4">Наши контакты</h4>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <a
                    href="mailto:hello@fairhire.com"
                    className="hover:text-purple-400 transition-colors"
                  >
                    vsezold@gmail.com
                  </a>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <a
                    href="tel:+74951234567"
                    className="hover:text-purple-400 transition-colors"
                  >
                    +7 (923) 652-35-42
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FairHire. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
