import type { Config } from 'tailwindcss';

export default <Config>{
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2563EB',
                secondary: '#7C3AED',
                accent: '#06B6D4',
                success: '#22C55E',
                background: {
                    light: '#FFFFFF',
                    dark: '#09090B',
                },
                card: {
                    light: '#F8FAFC',
                    dark: '#111827',
                },
                foreground: {
                    light: '#111827',
                    dark: '#F8FAFC',
                },
            },
            fontFamily: {
                heading: ['"Space Grotesk"', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                glass: '0 4px 30px rgba(0,0,0,0.1)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
};
