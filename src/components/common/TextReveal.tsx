import { motion, type Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0,
  as: Component = 'span',
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <Component className={`inline-block ${className}`}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.25em]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
};

export default TextReveal;
