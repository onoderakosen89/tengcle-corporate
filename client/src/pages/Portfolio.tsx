/**
 * Portfolio Page - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Showcase Japan and Myanmar projects prominently
 * - Emphasize trust, quality, and scale
 * - Visual storytelling with project details
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, MapPin, Building2, CheckCircle2 } from "lucide-react";
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

const projects = [
  {
    id: "japan-luxury",
    title: "Luxury Hotel Development",
    titleJp: "高級ホテル開発プロジェクト",
    location: "Japan",
    locationDetail: "Tokyo & Kyoto",
    image: "/images/hero-japan-luxury.jpg",
    secondaryImage: "/images/japan-hotel-1.jpg",
    category: "FF&E Procurement",
    description: "Comprehensive FF&E sourcing and supply chain management for multiple luxury hotel properties across Japan, meeting the nation's exacting quality standards.",
    highlights: [
      "Custom furniture design coordination",
      "Premium textile and fabric sourcing",
      "Strict Japanese quality control protocols",
      "On-time delivery across multiple sites",
    ],
    stats: [
      { label: "Properties", value: "3" },
      { label: "Room Keys", value: "450+" },
      { label: "Suppliers", value: "25+" },
    ],
    featured: true,
  },
  {
    id: "kyoto-boutique",
    title: "Boutique Hotel Renovation",
    titleJp: "ブティックホテル改装",
    location: "Japan",
    locationDetail: "Kyoto",
    image: "/images/japan-hotel-3.jpg",
    secondaryImage: "/images/japan-hotel-4.jpg",
    category: "Interior Sourcing",
    description: "Global sourcing of interior materials and decorative items that reflect Japan's unique aesthetic sensibility for a prestigious boutique hotel renovation.",
    highlights: [
      "Traditional Japanese design elements",
      "Global artisan partnerships",
      "Sustainable material sourcing",
      "Cultural authenticity preservation",
    ],
    stats: [
      { label: "Rooms", value: "85" },
      { label: "Artisans", value: "12" },
      { label: "Countries", value: "6" },
    ],
    featured: false,
  },
  {
    id: "yangon-international",
    title: "Yangon International Hotel",
    titleJp: "ヤンゴン国際ホテル開発",
    location: "Myanmar",
    locationDetail: "Yangon",
    image: "/images/myanmar-hotel-2.jpg",
    secondaryImage: "/images/myanmar-hotel-1.jpg",
    category: "Full Project Integration",
    description: "Lead sourcing agent for a landmark 500-room mixed-use hotel development, managing a $20M+ procurement scope with comprehensive project integration services.",
    highlights: [
      "500-room mixed-use complex",
      "$20M+ procurement value",
      "Full FF&E and OS&E scope",
      "International logistics coordination",
    ],
    stats: [
      { label: "Total Rooms", value: "500" },
      { label: "Project Value", value: "$20M+" },
      { label: "Categories", value: "150+" },
    ],
    featured: true,
  },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-sumi">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/30 to-transparent" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Our Portfolio</p>
            <h1 className="font-display text-5xl md:text-6xl text-washi mb-6">
              Proven Track Record
              <br />
              <span className="text-gradient-gold">of Excellence</span>
            </h1>
            <p className="text-stone text-lg leading-relaxed">
              From Japan's most prestigious hotels to landmark developments in Southeast Asia, 
              our portfolio demonstrates our commitment to quality and reliability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.filter(p => p.featured).map((project, index) => (
        <section
          key={project.id}
          className={`py-24 lg:py-32 ${index % 2 === 0 ? "bg-sumi" : "bg-navy/20"}`}
        >
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Images */}
              <AnimatedSection className={index % 2 === 1 ? "lg:order-2" : ""}>
                <motion.div variants={fadeInUp} className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute -bottom-8 -right-4 lg:-right-8 w-1/2 aspect-[4/3] border-4 border-sumi">
                    <img
                      src={project.secondaryImage}
                      alt={`${project.title} detail`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-kincha text-sumi px-4 py-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
              
              {/* Content */}
              <AnimatedSection className={`${index % 2 === 1 ? "lg:order-1" : ""} pt-8 lg:pt-0`}>
                <motion.div variants={fadeInUp}>
                  <p className="text-kincha text-sm tracking-[0.2em] uppercase mb-2">{project.category}</p>
                  <h2 className="font-display text-4xl md:text-5xl text-washi mb-2">{project.title}</h2>
                  <p className="text-kincha/70 font-jp text-lg mb-2">{project.titleJp}</p>
                  <p className="text-stone/70 text-sm mb-6 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {project.locationDetail}
                  </p>
                  
                  <p className="text-stone leading-relaxed mb-8">{project.description}</p>
                  
                  {/* Highlights */}
                  <div className="space-y-3 mb-8">
                    {project.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="h-5 w-5 text-kincha flex-shrink-0 mt-0.5" />
                        <span className="text-washi/90">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {project.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="bg-navy/30 border border-stone/10 p-4 text-center"
                      >
                        <p className="font-display text-3xl text-kincha mb-1">{stat.value}</p>
                        <p className="text-stone text-xs tracking-wider uppercase">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Other Projects Grid */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection className="mb-16">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Additional Projects</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi">
                More Case Studies
              </h2>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => !p.featured).map((project) => (
              <AnimatedSection key={project.id}>
                <motion.div
                  variants={fadeInUp}
                  className="group bg-navy/20 border border-stone/10 overflow-hidden hover:border-kincha/30 transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/50 to-transparent" />
                    <div className="absolute top-4 left-4 bg-kincha/90 text-sumi px-3 py-1 text-xs">
                      {project.location}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-kincha/70 text-xs tracking-wider uppercase mb-2">{project.category}</p>
                    <h3 className="font-display text-xl text-washi mb-2">{project.title}</h3>
                    <p className="text-stone text-sm leading-relaxed mb-4">{project.description}</p>
                    
                    <div className="flex gap-4 text-xs text-stone/70">
                      {project.stats.slice(0, 2).map((stat, i) => (
                        <span key={i}>
                          <span className="text-kincha">{stat.value}</span> {stat.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Statement */}
      <section className="py-24 lg:py-32 bg-navy/30">
        <div className="container">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <Building2 className="h-12 w-12 text-kincha mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl text-washi mb-6">
                "Our involvement in Japan's luxury hotel sector has established 
                our reputation for uncompromising quality and reliability."
              </h2>
              <p className="text-stone">
                Every project we undertake reflects our commitment to excellence, 
                compliance, and the highest standards of professional service.
              </p>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Start Your Project</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                Ready to Join Our Portfolio?
              </h2>
              <p className="text-stone text-lg mb-10">
                Let us bring our expertise and proven track record to your next hospitality project.
              </p>
              <Link href="/contact">
                <Button className="bg-kincha hover:bg-kincha-light text-sumi px-10 py-6 text-sm tracking-wider">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
