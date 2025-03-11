// components/AnimatedSection.jsx
'use client';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the section is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate when in view
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;