"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentNeedIndex, setCurrentNeedIndex] = useState(0)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)
  const [logoAnimationStarted, setLogoAnimationStarted] = useState(false)

  const companyLogos = [
    { name: "Deloitte", src: "/images/deloitte-logo.png", alt: "Deloitte" },
    { name: "Google", src: "/images/google-logo.png", alt: "Google" },
    { name: "TfL", src: "/images/tfl-logo.png", alt: "Transport for London" },
    { name: "Times", src: "/images/times-logo.png", alt: "The Times" },
    { name: "WTW", src: "/images/wtw-logo.png", alt: "WTW" },
    { name: "SIG", src: "/images/sig-logo.png", alt: "Susquehanna" },
  ]

  const offerItems = [
    {
      title: "Tailored, Real Advice",
      description:
        "Personalized guidance that addresses your specific challenges and goals. No generic solutions - every recommendation is crafted to fit your unique situation and objectives.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M3 17L9 11L13 15L21 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 7H21V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Experience",
      description:
        "Years of hands-on experience across diverse projects and industries. I bring practical insights gained from real-world challenges and proven strategies that deliver results.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Knowledge & Connections",
      description:
        "Deep industry knowledge combined with a valuable network of professionals. Access to cutting-edge insights and strategic connections that can accelerate your success.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.599 6.5a3 3 0 0 0 .399-1.375"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.003 5.125A3 3 0 0 0 6.401 6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.477 10.896a4 4 0 0 1 .585-.396"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.938 10.5a4 4 0 0 1 .585.396"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 15a3.5 3.5 0 0 0 4 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 15a3.5 3.5 0 0 0 4 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Academic Excellence",
      description:
        "Strong academic foundation with proven track record of excellence. Combining theoretical knowledge with practical application to deliver comprehensive solutions.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M22 10v6M2 10l10-5 10 5-10 5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 12v5c3 3 9 3 12 0v-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Reliability & Empathy",
      description:
        "Consistent, dependable service paired with genuine understanding of your needs. I listen carefully and respond with both professionalism and human connection.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  const needItems = [
    {
      title: "Commitment",
      description:
        "Dedication to the process and willingness to put in the effort required. Success comes from consistent action and following through on our agreed plan.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "A Clear Plan",
      description:
        "Well-defined goals and expectations from the start. The clearer your vision, the better I can help you achieve it with targeted strategies.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Be Yourself",
      description:
        "Authenticity and openness in our collaboration. The more genuine you are about your challenges and aspirations, the better I can support you.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path
            d="M8 14s1.5 2 4 2 4-2 4-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="9"
            y1="9"
            x2="9.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="15"
            y1="9"
            x2="15.01"
            y2="9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offerItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offerItems.length) % offerItems.length)
  }

  const nextNeedSlide = () => {
    setCurrentNeedIndex((prev) => (prev + 1) % needItems.length)
  }

  const prevNeedSlide = () => {
    setCurrentNeedIndex((prev) => (prev - 1 + needItems.length) % needItems.length)
  }

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex
    const totalItems = offerItems.length

    let normalizedDiff = diff
    if (Math.abs(diff) > totalItems / 2) {
      normalizedDiff = diff > 0 ? diff - totalItems : diff + totalItems
    }

    const isCenter = normalizedDiff === 0
    const isAdjacent = Math.abs(normalizedDiff) === 1
    const isVisible = Math.abs(normalizedDiff) <= 2

    if (!isVisible) {
      return {
        transform: `translateX(${normalizedDiff > 0 ? "200%" : "-200%"}) rotateY(${normalizedDiff > 0 ? "45deg" : "-45deg"}) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
      }
    }

    if (isCenter) {
      return {
        transform: "translateX(0%) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 3,
      }
    }

    if (isAdjacent) {
      const direction = normalizedDiff > 0 ? 1 : -1
      return {
        transform: `translateX(${direction * 80}%) rotateY(${direction * -25}deg) scale(0.85)`,
        opacity: 0.7,
        zIndex: 2,
      }
    }

    const direction = normalizedDiff > 0 ? 1 : -1
    return {
      transform: `translateX(${direction * 140}%) rotateY(${direction * -45}deg) scale(0.7)`,
      opacity: 0.4,
      zIndex: 1,
    }
  }

  const getNeedCardStyle = (index: number) => {
    const diff = index - currentNeedIndex
    const totalItems = needItems.length

    let normalizedDiff = diff
    if (Math.abs(diff) > totalItems / 2) {
      normalizedDiff = diff > 0 ? diff - totalItems : diff + totalItems
    }

    const isCenter = normalizedDiff === 0
    const isAdjacent = Math.abs(normalizedDiff) === 1
    const isVisible = Math.abs(normalizedDiff) <= 2

    if (!isVisible) {
      return {
        transform: `translateX(${normalizedDiff > 0 ? "200%" : "-200%"}) rotateY(${normalizedDiff > 0 ? "45deg" : "-45deg"}) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
      }
    }

    if (isCenter) {
      return {
        transform: "translateX(0%) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: 3,
      }
    }

    if (isAdjacent) {
      const direction = normalizedDiff > 0 ? 1 : -1
      return {
        transform: `translateX(${direction * 80}%) rotateY(${direction * -25}deg) scale(0.85)`,
        opacity: 0.7,
        zIndex: 2,
      }
    }

    const direction = normalizedDiff > 0 ? 1 : -1
    return {
      transform: `translateX(${direction * 140}%) rotateY(${direction * -45}deg) scale(0.7)`,
      opacity: 0.4,
      zIndex: 1,
    }
  }

  useEffect(() => {
    if (logoAnimationStarted) {
      const interval = setInterval(() => {
        setCurrentLogoIndex((prev) => (prev + 1) % companyLogos.length)
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [logoAnimationStarted, companyLogos.length])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            if (entry.target.id === "company-logos" && !logoAnimationStarted) {
              setLogoAnimationStarted(true)
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => {
      observerRef.current?.disconnect()
    }
  }, [logoAnimationStarted])

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-accent backdrop-blur-sm border-b border-accent">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-serif font-bold text-xl text-white">Arvin Hadidi</h1>
              <a
                href="https://www.linkedin.com/in/arvinhadidi/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 hover:opacity-100 transition-opacity duration-200"
                aria-label="LinkedIn Profile"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/images/arvin-profile.jpg"
                alt="Arvin Hadidi"
                width={100}
                height={100}
                className="w-full h-full object-cover scale-100 object-top"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-serif font-black text-5xl md:text-7xl text-foreground animate-fade-in-down">
            SimpleProgress Mentorship
          </h1>
          <p className="font-sans text-xl md:text-2xl text-muted-foreground animate-fade-in-down animate-delay-200">
            Accelerate your career. Stay authentically you.
          </p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-8 text-center">About Me</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-8 md:p-12">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-card-foreground">
                  This is where you'll write your compelling personal story. Share your background, experience, and what
                  drives you professionally. Make it engaging and authentic to connect with your audience. You can
                  discuss your journey, values, and what makes you unique in your field.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div id="company-logos" className="animate-on-scroll opacity-0 text-center">
            <h3 className="font-sans text-2xl md:text-3xl text-foreground font-bold mb-4">Invited to events from</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-16 flex items-center justify-center">
                {companyLogos.map((logo, index) => (
                  <div
                    key={logo.name}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentLogoIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={192}
                      height={64}
                      className={`w-full h-full object-contain ${logo.name === "Times" ? "scale-250" : ""}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-16 text-center">
              What I Offer
            </h2>
            <div className="relative h-96 flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-md h-full" style={{ perspective: "1000px" }}>
                {offerItems.map((item, index) => (
                  <Card
                    key={index}
                    className="absolute inset-0 bg-card border-border transition-all duration-500 ease-in-out cursor-pointer hover:shadow-xl"
                    style={getCardStyle(index)}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <CardContent className="p-8 h-full flex flex-col justify-center">
                      <h3 className="font-serif font-bold text-2xl text-accent mb-4 text-center">{item.title}</h3>
                      <p className="font-sans text-base leading-relaxed text-card-foreground text-center mb-6">
                        {item.description}
                      </p>
                      <div className="flex justify-center">{item.icon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {offerItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-accent" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll opacity-0">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-16 text-center">
              What I Need From You
            </h2>
            <div className="relative h-96 flex items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-md h-full" style={{ perspective: "1000px" }}>
                {needItems.map((item, index) => (
                  <Card
                    key={index}
                    className="absolute inset-0 bg-card border-border transition-all duration-500 ease-in-out cursor-pointer hover:shadow-xl"
                    style={getNeedCardStyle(index)}
                    onClick={() => setCurrentNeedIndex(index)}
                  >
                    <CardContent className="p-8 h-full flex flex-col justify-center">
                      <h3 className="font-serif font-bold text-2xl text-accent mb-4 text-center">{item.title}</h3>
                      <p className="font-sans text-base leading-relaxed text-card-foreground text-center mb-6">
                        {item.description}
                      </p>
                      <div className="flex justify-center">{item.icon}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={prevNeedSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={nextNeedSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {needItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentNeedIndex ? "bg-accent" : "bg-muted-foreground/30"
                  }`}
                  onClick={() => setCurrentNeedIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-scroll opacity-0">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-8 text-center">
              Who Is This Programme For?
            </h2>
            <Card className="bg-card border-border">
              <CardContent className="p-8 md:p-12">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-card-foreground">
                  This programme is designed for ambitious professionals who are ready to take their career to the next
                  level. Whether you're a recent graduate looking to make your mark, a mid-career professional seeking
                  strategic guidance, or someone preparing for a significant career transition, this mentorship will
                  provide you with the tools and insights you need to succeed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll opacity-0">
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-8">Ready to Get Started?</h2>
            <p className="font-sans text-lg md:text-xl text-muted-foreground mb-12">
              Let's discuss how we can work together to achieve your goals.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium px-8 py-4 text-lg"
              asChild
            >
              <a href="https://forms.gle/toQUXtMfFVkW3L5K9" target="_blank" rel="noopener noreferrer">
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-muted-foreground">© 2025 Arvin Hadidi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
