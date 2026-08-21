import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useInView } from 'framer-motion';

interface CounterProps {
    end: number;
    label: string;
    decimals?: number;
}

export const Counter = ({ end, label, decimals = 0 }: CounterProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const countMotion = useMotionValue(0);
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            animate(countMotion, end, { duration: 2, ease: 'easeOut' });
        }
    }, [isInView, end]);

    useEffect(() => {
        countMotion.set(0);
        const unsubscribe = countMotion.onChange((latest) => {
            setValue(latest);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div ref={ref} className="text-center">
            <motion.span className="block text-3xl font-bold text-white">
                {value.toLocaleString(undefined, { maximumFractionDigits: decimals })}
            </motion.span>
            <span className="text-sm text-white/70">{label}</span>
        </div>
    );
};
