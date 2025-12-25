/**
 * Contact Page - Japanese Zen Luxury Design
 * 
 * Design Philosophy:
 * - Clear contact information for trust
 * - Professional inquiry form
 * - Office locations prominently displayed
 */

import { useRef, useState } from "react";
import { motion, useInView, type Variants, type Easing } from "framer-motion";
import { Mail, MapPin, Building2, Phone, Send, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you for your inquiry. We will respond within 24 hours.");
  };

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
            <p className="text-kincha text-sm tracking-[0.3em] uppercase mb-4">Contact Us</p>
            <h1 className="font-display text-5xl md:text-6xl text-washi mb-6">
              Let's Start a
              <br />
              <span className="text-gradient-gold">Conversation</span>
            </h1>
            <p className="text-stone text-lg leading-relaxed">
              Whether you're planning a new hospitality project or seeking a reliable 
              sourcing partner, we're here to help bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-sumi">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <AnimatedSection>
              <motion.div variants={fadeInUp}>
                <h2 className="font-display text-3xl text-washi mb-6">Send an Inquiry</h2>
                <p className="text-stone mb-8">
                  Fill out the form below and our team will respond within 24 hours.
                </p>
                
                {isSubmitted ? (
                  <div className="bg-navy/30 border border-kincha/30 p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-kincha mx-auto mb-4" />
                    <h3 className="font-display text-2xl text-washi mb-2">Thank You</h3>
                    <p className="text-stone">
                      Your inquiry has been received. We will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-washi/80 text-sm mb-2">Name *</label>
                        <Input
                          required
                          placeholder="Your full name"
                          className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha"
                        />
                      </div>
                      <div>
                        <label className="block text-washi/80 text-sm mb-2">Company</label>
                        <Input
                          placeholder="Company name"
                          className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha"
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-washi/80 text-sm mb-2">Email *</label>
                        <Input
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha"
                        />
                      </div>
                      <div>
                        <label className="block text-washi/80 text-sm mb-2">Phone</label>
                        <Input
                          type="tel"
                          placeholder="+852 XXXX XXXX"
                          className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-washi/80 text-sm mb-2">Subject *</label>
                      <Input
                        required
                        placeholder="How can we help?"
                        className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-washi/80 text-sm mb-2">Message *</label>
                      <Textarea
                        required
                        rows={5}
                        placeholder="Tell us about your project or inquiry..."
                        className="bg-navy/30 border-stone/20 text-washi placeholder:text-stone/50 focus:border-kincha resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-kincha hover:bg-kincha-light text-sumi py-6 text-sm tracking-wider"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </AnimatedSection>
            
            {/* Contact Information */}
            <AnimatedSection>
              <motion.div variants={fadeInUp} className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl text-washi mb-6">Contact Information</h2>
                  <p className="text-stone mb-8">
                    Reach out directly or visit one of our Hong Kong offices.
                  </p>
                </div>
                
                {/* Email */}
                <div className="bg-navy/30 border border-stone/10 p-6 hover:border-kincha/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-kincha flex-shrink-0" />
                    <div>
                      <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Email</p>
                      <a 
                        href="mailto:admin@tengcle.com" 
                        className="text-washi hover:text-kincha transition-colors text-lg"
                      >
                        admin@tengcle.com
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Operations Office */}
                <div className="bg-navy/30 border border-stone/10 p-6 hover:border-kincha/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <Building2 className="h-6 w-6 text-kincha flex-shrink-0" />
                    <div>
                      <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Operations Office</p>
                      <p className="text-washi">
                        No. 5, 17/F, Strand 50<br />
                        50 Bonham Strand<br />
                        Sheung Wan, Hong Kong
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Registered Office */}
                <div className="bg-navy/30 border border-stone/10 p-6 hover:border-kincha/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-kincha flex-shrink-0" />
                    <div>
                      <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Registered Office</p>
                      <p className="text-washi">
                        Units A-C, 25/F, Seabright Plaza<br />
                        9-23 Shell Street<br />
                        North Point, Hong Kong
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="bg-navy/30 border border-stone/10 p-6 hover:border-kincha/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-kincha flex-shrink-0" />
                    <div>
                      <p className="text-washi/60 text-xs tracking-wider uppercase mb-1">Business Hours</p>
                      <p className="text-washi">
                        Monday - Friday: 9:00 AM - 6:00 PM (HKT)<br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Trust Badge */}
                <div className="bg-kincha/10 border border-kincha/30 p-6">
                  <p className="text-kincha text-sm mb-2">Licensed & Registered</p>
                  <p className="text-washi/80 text-sm">
                    TCSP License: TC007820<br />
                    BR No: 65188837
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-24 lg:py-32 bg-navy/20">
        <div className="container">
          <AnimatedSection className="text-center">
            <motion.div variants={fadeInUp}>
              <h2 className="font-display text-3xl text-washi mb-6">Our Location</h2>
              <p className="text-stone mb-8 max-w-2xl mx-auto">
                Strategically located in Hong Kong's business districts, 
                we're positioned to serve clients across Asia and beyond.
              </p>
              
              {/* Map placeholder with Hong Kong image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <img
                  src="/images/hero-global-network.jpg"
                  alt="Hong Kong Business District"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-sumi/60 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-kincha mx-auto mb-4" />
                    <p className="font-display text-2xl text-washi">Hong Kong SAR</p>
                    <p className="text-stone">Asia's Premier Business Hub</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
