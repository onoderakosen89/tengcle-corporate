import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
};

export default function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className={className}
            transition={{ delay }}
        >
            {children}
        </motion.div>
    );
}
