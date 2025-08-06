"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [demoAnimationProgress, setDemoAnimationProgress] = useState(0);
  const [isAnimationLocked, setIsAnimationLocked] = useState(false);
  const [accumulatedDelta, setAccumulatedDelta] = useState(0);
  const [isApproachingDemo, setIsApproachingDemo] = useState(false);

  const demoSectionRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();
  const lastScrollTimeRef = useRef<number>(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      const demoSection = demoSectionRef.current;
      if (!demoSection) return;

      console.log("handleWheel");
      
      const rect = demoSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // Check if the demo section is fully visible in viewport
      // Block scrolling only when the section is completely in view
      const isFullyVisible = sectionTop <= 0 && sectionBottom >= viewportHeight;

      // Also check if we're close to having it fully visible (for smooth transition)
      const isNearlyFullyVisible =
        sectionTop <= viewportHeight * 0.1 &&
        sectionBottom >= viewportHeight * 0.9;

      if (isFullyVisible || (isAnimationLocked && isNearlyFullyVisible)) {
        // Prevent default scrolling
        e.preventDefault();

        if (!isAnimationLocked) {
          setIsAnimationLocked(true);
          document.body.style.overflow = "hidden";
        }

        // Accumulate scroll delta for smoother animation
        const currentTime = Date.now();
        const deltaTime = currentTime - lastScrollTimeRef.current;
        lastScrollTimeRef.current = currentTime;

        // Normalize wheel delta (different browsers/devices have different scales)
        const normalizedDelta = e.deltaY * 0.002;

        setAccumulatedDelta((prev) => {
          const newDelta = prev + normalizedDelta;
          const clampedDelta = Math.max(0, Math.min(1, newDelta));

          // Update animation progress
          setDemoAnimationProgress(clampedDelta);

          // If animation is complete, unlock scrolling
          if (clampedDelta >= 1 && !isScrolling) {
            isScrolling = true;
            setTimeout(() => {
              setIsAnimationLocked(false);
              document.body.style.overflow = "";

              // Continue scrolling down
              const nextSection = document.getElementById("technologies");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              }
              isScrolling = false;
            }, 500);
          }

          return clampedDelta;
        });
      } else if (isAnimationLocked && sectionTop > viewportHeight * 0.2) {
        // If we're above the section and trying to scroll up, unlock
        setIsAnimationLocked(false);
        setAccumulatedDelta(0);
        setDemoAnimationProgress(0);
        document.body.style.overflow = "";
      }
    };

    const handleScroll = () => {
      if (isAnimationLocked) return;
      console.log("handleScroll");

      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const demoSection = demoSectionRef.current;
      if (!demoSection) return;

      const rect = demoSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;

      // Check if we're approaching the demo section
      const isApproaching =
        sectionTop <= viewportHeight * 0.3 &&
        sectionBottom >= viewportHeight * 0.7;
      setIsApproachingDemo(isApproaching);

      // Reset animation if we're not near the section
      const isNearSection = sectionTop <= viewportHeight && sectionBottom >= 0;

      if (!isNearSection) {
        setDemoAnimationProgress(0);
        setAccumulatedDelta(0);
      }
    };

    // Add passive: false to be able to preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [isAnimationLocked]);

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
    };
  };

  const badges = getBadgeVisibility(demoAnimationProgress);

  const technologies = [
    { name: "Google Meet", icon: "🎥" },
    { name: "Zoom", icon: "📹" },
    { name: "Jitsi Meet", icon: "💻" },
    { name: "Salut Jazz", icon: "🎵" },
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

            <nav className="hidden md:flex space-x-8">
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
                onClick={() => scrollToSection("technologies")}
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Технологии
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
            </nav>

            <Button
              onClick={() => scrollToSection("download")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Попробовать
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent leading-tight">
              Честные собеседования
              <br />
              без обмана
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              FairHire обеспечивает прозрачность технических интервью,
              отслеживая действия кандидата в режиме реального времени и
              предотвращая списывание
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
                onClick={() => scrollToSection("demo-section")}
                variant="outline"
                size="lg"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Посмотреть демо
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
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
                <p className="text-gray-600">macOS и Windows поддержка</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% защита</h3>
                <p className="text-gray-600">Невозможность списывания</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - Enhanced with scroll-hijacking */}
      <section
        ref={demoSectionRef}
        id="demo-section"
        className={`py-24 bg-gradient-to-br from-gray-50 to-purple-50 ${
          isAnimationLocked ? "animation-active" : ""
        } ${isApproachingDemo ? "approaching-demo" : ""}`}
        style={{
          minHeight: "200vh", // Make section taller to allow for scroll hijacking
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-0 h-screen flex flex-col justify-center">
          <div className="text-center mb-16">
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
              ></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center max-w-6xl mx-auto">
              {/* Interviewer Side */}
              <div className="text-center relative">
                <div
                  className={`relative inline-block ${
                    badges.monitoring ? "monitoring-pulse" : ""
                  }`}
                >
                  <img
                    src="/girl.png"
                    alt="Интервьюер"
                    className="w-full max-w-xs mx-auto rounded-2xl"
                  />

                  {/* Interviewer alerts */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 space-y-2">
                    <div
                      className={`badge-interviewer-1 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer1 ? "active" : ""
                      }`}
                    >
                      🚨 Кандидат скрывает страницу
                    </div>
                    <div
                      className={`badge-interviewer-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer2 ? "active" : ""
                      }`}
                    >
                      ⚠️ Подозрительная активность
                    </div>
                    <div
                      className={`badge-interviewer-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer3 ? "active" : ""
                      }`}
                    >
                      📋 Копирование
                    </div>
                    <div
                      className={`badge-interviewer-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.interviewer4 ? "active" : ""
                      }`}
                    >
                      📊 Надежность: 43%
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-purple-600 mt-6 mb-2">
                  Интервьюер
                </h3>
                <p className="text-gray-600">
                  Видит все действия кандидата в режиме реального времени
                </p>
              </div>

              {/* Candidate Side */}
              <div className="text-center relative">
                <div className="relative inline-block">
                  <img
                    src="/man.png"
                    alt="Кандидат"
                    className="w-full max-w-xs mx-auto rounded-2xl"
                  />

                  {/* Candidate cheating attempts */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 space-y-2">
                    <div
                      className={`badge-candidate-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate1 ? "active" : ""
                      }`}
                    >
                      Открыл другое приложение
                    </div>
                    <div
                      className={`badge-candidate-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate2 ? "active" : ""
                      }`}
                    >
                      📸 Скриншот
                    </div>
                    <div
                      className={`badge-candidate-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate3 ? "active" : ""
                      }`}
                    >
                      🙈 Скрыть страницу
                    </div>
                    <div
                      className={`badge-candidate-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold ${
                        badges.candidate4 ? "active" : ""
                      }`}
                    >
                      📋 Копировать
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-blue-600 mt-6 mb-2">
                  Кандидат
                </h3>
                <p className="text-gray-600">Пытается обойти систему</p>
              </div>
            </div>

            {/* Mobile connection indicator */}
            <div className="lg:hidden text-center mt-8">
              <div
                className={`inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-full ${
                  badges.monitoring ? "animate-pulse" : ""
                }`}
              >
                <span>📡</span>
                <span className="text-sm font-semibold">
                  Мониторинг в реальном времени
                </span>
              </div>
            </div>

            {/* Enhanced progress indicator */}
            {isAnimationLocked && (
              <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-2xl">
                  <div className="flex items-center space-x-3">
                    <span>
                      Демонстрация: {Math.round(demoAnimationProgress * 100)}%
                    </span>
                    <div className="w-20 h-2 bg-purple-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-300"
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
      <section id="technologies" className="py-24 bg-white">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center text-4xl group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-xl">
                  <span className="group-hover:grayscale-0 group-hover:text-white transition-all duration-300">
                    {tech.icon}
                  </span>
                </div>
                <p className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
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
              Увеличьте эффективность найма на 85%
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Исследования показывают, что использование FairHire снижает
              количество некачественных кандидатов на 85% и повышает точность
              оценки технических навыков на 92%.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">85%</div>
                <p className="opacity-90">Снижение обмана</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">92%</div>
                <p className="opacity-90">Точность оценки</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">3x</div>
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
              Выберите вашу роль и скачайте соответствующее приложение.
              Настройка займет менее 2 минут.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Interviewer */}
            <Card className="bg-gradient-to-br from-purple-800 to-purple-900 border-0 text-white p-8">
              <CardContent className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Для интервьюеров</h3>
                <p className="text-lg text-purple-100 mb-8">
                  Получите полный контроль над процессом собеседования.
                  Отслеживайте действия кандидатов в режиме реального времени.
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
                  Открыть панель мониторинга
                </Button>
              </CardContent>
            </Card>

            {/* For Candidate */}
            <Card className="bg-gradient-to-br from-blue-800 to-blue-900 border-0 text-white p-8">
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
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-800 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Скачать для macOS
                  </Button>
                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-800 hover:bg-gray-100 font-bold text-lg py-4 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Скачать для Windows
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">Системные требования:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">macOS</h4>
                <p className="text-gray-300">macOS 10.15 или новее</p>
                <p className="text-gray-300">
                  4 ГБ RAM, 100 МБ свободного места
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-3">Windows</h4>
                <p className="text-gray-300">Windows 10 или новее</p>
                <p className="text-gray-300">
                  4 ГБ RAM, 100 МБ свободного места
                </p>
              </div>
            </div>
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
              Есть вопросы о FairHire? Хотите персональную демонстрацию? Мы
              поможем интегрировать решение в ваш процесс найма.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-gray-900">
                Отправьте сообщение
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Фамилия
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Ваша фамилия"
                    />
                  </div>
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
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Компания
                  </label>
                  <Input
                    id="company"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Название компании"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Расскажите о ваших потребностях в области найма..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Отправить сообщение
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-gray-900">
                  Наши контакты
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">hello@fairhire.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Телефон
                      </h4>
                      <p className="text-gray-600">+7 (495) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Офис</h4>
                      <p className="text-gray-600">Москва, Россия</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">
                  Нужна персональная демонстрация?
                </h4>
                <p className="mb-6 opacity-90">
                  Забронируйте 30-минутную персональную демонстрацию FairHire и
                  узнайте, как мы можем улучшить ваш процесс найма.
                </p>
                <Button
                  variant="secondary"
                  className="bg-white text-purple-800 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg"
                >
                  Забронировать демо
                </Button>
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
              <p className="text-gray-300 mb-6 max-w-md">
                Революционное решение для проведения честных технических
                интервью. Повысьте качество найма с помощью передовых технологий
                мониторинга.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Продукт</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Возможности
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Цены
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Интеграции
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Поддержка</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Документация
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Контакты
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Статус системы
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FairHire. Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Условия использования
              </a>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
