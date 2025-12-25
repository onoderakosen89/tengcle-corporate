/**
 * About Page - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Comprehensive company information for compliance
 * - Trust-building through transparency
 * - Professional team presentation
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, MapPin, Shield, Award, Globe, Building2, Users, Target, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-sumi">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-team.jpg"
            alt="Tengcle Team"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sumi via-sumi/90 to-sumi/70" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl text-washi mb-6">
              Hong Kong's Gateway
              <br />
              <span className="text-gradient-gold">to Global Excellence</span>
            </h1>
            <p className="text-stone text-lg leading-relaxed">
              Tengcle Limited is a Hong Kong-based global sourcing and project integration 
              company, bridging world-class manufacturers with luxury hospitality projects 
              across Asia and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
                <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                  Built on Trust
                  <br />
                  & Expertise
                </h2>
                <div className="space-y-4 text-stone leading-relaxed">
                  <p>
                    Founded in Hong Kong, Tengcle Limited has established itself as a trusted 
                    partner for luxury hospitality projects requiring world-class sourcing and 
                    project integration services.
                  </p>
                  <p>
                    Our deep involvement in Japan's prestigious hotel sector has shaped our 
                    commitment to uncompromising quality standards. We apply these exacting 
                    Japanese principles to every project we undertake, regardless of location.
                  </p>
                  <p>
                    From our strategic Hong Kong base, we coordinate global supply chains, 
                    manage complex procurement projects, and ensure seamless delivery of 
                    FF&E and OS&E solutions to hospitality developments worldwide.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="space-y-6">
                {/* Company Details Card */}
                <div className="bg-navy/30 border border-stone/10 p-8">
                  <h3 className="font-display text-2xl text-washi mb-6">Company Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Building2 className="h-5 w-5 text-kincha mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Legal Name</p>
                        <p className="text-washi">Tengcle Limited</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Shield className="h-5 w-5 text-kincha mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">TCSP License</p>
                        <p className="text-washi">TC007820</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Award className="h-5 w-5 text-kincha mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Business Registration</p>
                        <p className="text-washi">BR No. 65188837</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-kincha mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Registered Office</p>
                        <p className="text-washi text-sm">
                          Units A-C, 25/F, Seabright Plaza<br />
                          9-23 Shell Street, North Point<br />
                          Hong Kong
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Globe className="h-5 w-5 text-kincha mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Operations Office</p>
                        <p className="text-washi text-sm">
                          No. 5, 17/F, Strand 50<br />
                          50 Bonham Strand, Sheung Wan<br />
                          Hong Kong
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 lg:py-32 bg-navy/20">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                Think Into The Future
              </h2>
              <p className="text-stone max-w-2xl mx-auto">
                Our slogan reflects our forward-thinking approach to hospitality sourcing 
                and project management.
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Mission",
                titleJp: "使命",
                description: "To deliver world-class hospitality solutions by bridging global manufacturers with discerning clients, applying Japanese quality standards to every engagement.",
              },
              {
                icon: Heart,
                title: "Values",
                titleJp: "価値観",
                description: "Integrity, excellence, and transparency guide every decision. We believe trust is earned through consistent delivery and unwavering commitment to quality.",
              },
              {
                icon: Users,
                title: "Approach",
                titleJp: "アプローチ",
                description: "We combine global reach with local expertise, ensuring cultural sensitivity and regulatory compliance in every market we serve.",
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-sumi border border-stone/10 p-8 h-full hover:border-kincha/30 transition-all duration-300"
                >
                  <item.icon className="h-10 w-10 text-kincha mb-6" />
                  <h3 className="font-display text-2xl text-washi mb-1">{item.title}</h3>
                  <p className="text-kincha/70 font-jp text-sm mb-4">{item.titleJp}</p>
                  <p className="text-stone text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Advantage */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="relative">
                <img
                  src="/images/hero-global-network.jpg"
                  alt="Hong Kong Business Hub"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-kincha text-sumi p-6">
                  <p className="font-display text-3xl">Hong Kong</p>
                  <p className="text-sm">Strategic Hub</p>
                </div>
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Strategic Position</p>
                <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                  Hong Kong Advantage
                </h2>
                <p className="text-stone leading-relaxed mb-6">
                  Our Hong Kong base provides strategic advantages for international hospitality projects:
                </p>
                
                <div className="space-y-4">
                  {[
                    "Gateway to Asian manufacturing hubs",
                    "Robust legal and financial infrastructure",
                    "International banking and trade facilitation",
                    "Multilingual professional workforce",
                    "Time zone bridging East and West",
                    "Strong regulatory compliance framework",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-kincha rounded-full flex-shrink-0" />
                      <span className="text-washi/90">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Compliance & Trust */}
      <section className="py-24 lg:py-32 bg-navy/30">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Compliance & Trust</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                Regulatory Excellence
              </h2>
              <p className="text-stone max-w-2xl mx-auto">
                As a fully licensed Hong Kong entity, we maintain the highest standards 
                of corporate governance and regulatory compliance.
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "TCSP Licensed",
                description: "Trust or Company Service Provider License TC007820",
              },
              {
                icon: Building2,
                title: "Registered Entity",
                description: "Hong Kong Companies Registry BR No. 65188837",
              },
              {
                icon: Award,
                title: "Quality Standards",
                description: "Japanese-standard quality control protocols",
              },
              {
                icon: Globe,
                title: "Global Compliance",
                description: "International trade and customs expertise",
              },
            ].map((item) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  className="bg-sumi border border-stone/10 p-6 text-center hover:border-kincha/30 transition-all duration-300"
                >
                  <item.icon className="h-10 w-10 text-kincha mx-auto mb-4" />
                  <h3 className="font-display text-lg text-washi mb-2">{item.title}</h3>
                  <p className="text-stone text-sm">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Connect With Us</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                Let's Build Together
              </h2>
              <p className="text-stone text-lg mb-10">
                Partner with a team that combines global expertise with unwavering 
                commitment to quality and compliance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button className="bg-kincha hover:bg-kincha-light text-sumi px-10 py-6 text-sm tracking-wider">
                    Contact Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button variant="outline" className="border-washi/30 text-washi hover:bg-washi/10 px-10 py-6 text-sm tracking-wider">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
