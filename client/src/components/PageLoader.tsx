import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-slate-950/80">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-gold/20" />
                    <motion.div
                        className="absolute inset-0 h-16 w-16 rounded-full border-4 border-t-gold border-r-transparent border-b-transparent border-l-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 text-gold animate-spin" aria-hidden="true" />
                    </div>
                </div>
                <p className="font-heading text-lg text-navy tracking-wider animate-pulse">
                    Loading...
                </p>
            </motion.div>
        </div>
    );
}
