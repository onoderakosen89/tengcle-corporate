/**
 * Services Page - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Detailed service descriptions for compliance review
 * - Visual hierarchy with Japanese aesthetics
 * - Trust-building through comprehensive information
 */

import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { ArrowRight, Globe, Building2, Ship, CheckCircle2, Package, Truck, ClipboardCheck } from "lucide-react";
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

const services = [
  {
    id: "sourcing",
    icon: Globe,
    title: "Global Hotel Sourcing",
    titleJp: "グローバルホテル調達",
    subtitle: "FF&E / OS&E Procurement",
    description: "We source furniture, fixtures, equipment, and operating supplies from manufacturers worldwide, applying rigorous Japanese quality standards to every procurement decision.",
    image: "/images/services-sourcing.jpg",
    features: [
      "Custom furniture design and manufacturing coordination",
      "Premium textile and fabric sourcing",
      "Lighting fixtures and electrical equipment",
      "Bathroom fixtures and amenities",
      "Kitchen and F&B equipment",
      "Artwork and decorative items",
    ],
    benefits: [
      { title: "Quality Assurance", desc: "Japanese-standard inspection protocols" },
      { title: "Cost Optimization", desc: "Direct manufacturer relationships" },
      { title: "Custom Solutions", desc: "Bespoke designs for unique projects" },
    ],
  },
  {
    id: "integration",
    icon: Building2,
    title: "Project Integration",
    titleJp: "プロジェクト統合管理",
    subtitle: "End-to-End Management",
    description: "From initial design consultation to final installation, we provide comprehensive project management services for large-scale hotel and mixed-use developments.",
    image: "/images/services-integration.jpg",
    features: [
      "Design development support and coordination",
      "Vendor selection and management",
      "Budget planning and cost control",
      "Timeline management and scheduling",
      "On-site installation supervision",
      "Quality control and final inspection",
    ],
    benefits: [
      { title: "Single Point of Contact", desc: "Streamlined communication" },
      { title: "Risk Mitigation", desc: "Proactive issue resolution" },
      { title: "Timeline Adherence", desc: "On-schedule delivery guaranteed" },
    ],
  },
  {
    id: "supply-chain",
    icon: Ship,
    title: "Supply Chain Management",
    titleJp: "サプライチェーン管理",
    subtitle: "Logistics & Compliance",
    description: "Our comprehensive supply chain services ensure seamless international logistics, customs compliance, and quality inspection from factory to final destination.",
    image: "/images/logistics-3.jpg",
    features: [
      "International freight forwarding",
      "Customs documentation and clearance",
      "Warehouse management and storage",
      "Quality inspection and testing",
      "Delivery scheduling and tracking",
      "Installation coordination",
    ],
    benefits: [
      { title: "Global Network", desc: "Partners in 15+ countries" },
      { title: "Compliance Expertise", desc: "Full regulatory adherence" },
      { title: "Real-time Tracking", desc: "Complete shipment visibility" },
    ],
  },
];

export default function Services() {
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
            <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Our Services</p>
            <h1 className="font-display text-5xl md:text-6xl text-washi mb-6">
              Comprehensive
              <br />
              <span className="text-gradient-gold">Hospitality Solutions</span>
            </h1>
            <p className="text-stone text-lg leading-relaxed">
              From global sourcing to project delivery, we provide end-to-end services 
              that meet the exacting standards of luxury hospitality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 lg:py-32 ${index % 2 === 1 ? "bg-navy/20" : "bg-sumi"}`}
        >
          <div className="container">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Image */}
              <AnimatedSection className={index % 2 === 1 ? "lg:order-2" : ""}>
                <motion.div variants={fadeInUp} className="relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-kincha text-sumi p-4 lg:p-6">
                    <service.icon className="h-8 w-8 lg:h-10 lg:w-10" />
                  </div>
                </motion.div>
              </AnimatedSection>
              
              {/* Content */}
              <AnimatedSection className={index % 2 === 1 ? "lg:order-1" : ""}>
                <motion.div variants={fadeInUp}>
                  <p className="text-kincha text-sm tracking-[0.2em] uppercase mb-2">{service.subtitle}</p>
                  <h2 className="font-display text-4xl md:text-5xl text-washi mb-2">{service.title}</h2>
                  <p className="text-kincha/70 font-jp text-lg mb-6">{service.titleJp}</p>
                  <p className="text-stone leading-relaxed mb-8">{service.description}</p>
                  
                  {/* Features */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4 text-kincha flex-shrink-0 mt-1" />
                        <span className="text-washi/80 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Benefits */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    {service.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="bg-navy/30 border border-stone/10 p-4"
                      >
                        <p className="text-kincha text-xs tracking-wider uppercase mb-1">{benefit.title}</p>
                        <p className="text-washi/70 text-sm">{benefit.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Our Process</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                How We Work
              </h2>
              <p className="text-stone max-w-2xl mx-auto">
                A systematic approach ensuring quality, compliance, and timely delivery 
                at every stage of your project.
              </p>
            </motion.div>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: ClipboardCheck, title: "Consultation", desc: "Understanding your requirements and project scope" },
              { step: "02", icon: Package, title: "Sourcing", desc: "Identifying and vetting optimal suppliers worldwide" },
              { step: "03", icon: Truck, title: "Logistics", desc: "Managing international shipping and customs" },
              { step: "04", icon: CheckCircle2, title: "Delivery", desc: "Final inspection and installation support" },
            ].map((item) => (
              <AnimatedSection key={item.step}>
                <motion.div
                  variants={fadeInUp}
                  className="relative bg-navy/20 border border-stone/10 p-8 hover:border-kincha/30 transition-all duration-300"
                >
                  <span className="font-display text-6xl text-kincha/20 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <item.icon className="h-10 w-10 text-kincha mb-6" />
                  <h3 className="font-display text-xl text-washi mb-2">{item.title}</h3>
                  <p className="text-stone text-sm">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-navy/30">
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <motion.div variants={fadeInUp}>
              <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Ready to Start?</p>
              <h2 className="font-display text-4xl md:text-5xl text-washi mb-6">
                Let's Discuss Your Project
              </h2>
              <p className="text-stone text-lg mb-10">
                Contact our team to explore how we can support your hospitality project 
                with our comprehensive sourcing and integration services.
              </p>
              <Link href="/contact">
                <Button className="bg-kincha hover:bg-kincha-light text-sumi px-10 py-6 text-sm tracking-wider">
                  Get in Touch
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
