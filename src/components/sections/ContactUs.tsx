"use client";
import {SyntheticEvent, useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientButton from '@/components/ui/GradientButton';

export default function ContactUs() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', tel: '' });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.tel, // Используем как контактные данные
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', tel: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 bg-[var(--bg-primary)] overflow-hidden">
            {/* Декоративный фон (опционально) */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[var(--brand-blue)] rounded-full blur-[120px]" />
            </div>

            {/* ЛЕВАЯ ЧАСТЬ: Текст */}
            <div className="w-full md:w-1/2 z-10 text-muted-dark">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-[var(--brand-blue)] font-mono text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 block font-bold"
                >
                    Связаться с нами
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[clamp(2.25rem,10vw,6rem)] md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 sm:mb-8"
                >
                    Готовы обсудить <br />
                    <span className="[-webkit-text-fill-color:var(--bg-main)] [-webkit-text-stroke:2px_var(--text-main)] [paint-order:stroke_fill]">
                        вашу идею
                    </span>
                </motion.h2>
                <p className="text-base sm:text-lg md:text-xl max-w-lg font-light leading-relaxed">
                    Оставьте свои контакты, и мы свяжемся с вами.
                </p>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Форма */}
            <div className="w-full md:w-[520px] lg:w-[560px] z-10">
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold ml-1">Имя</label>
                        <input
                            required
                            type="text"
                            placeholder="Ихтиандр"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-4 sm:px-6 py-3 sm:py-4 rounded-none text-[var(--text-main)] focus:border-[var(--brand-blue)] outline-none transition-colors placeholder:opacity-20 text-sm sm:text-base"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold ml-1">Телефон / Email</label>
                        <input
                            required
                            type="text"
                            placeholder="+996 (___) __ - __ - __"
                            value={formData.tel}
                            onChange={(e) => setFormData({...formData, tel: e.target.value})}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] px-4 sm:px-6 py-3 sm:py-4 rounded-none text-[var(--text-main)] focus:border-[var(--brand-blue)] outline-none transition-colors placeholder:opacity-20 text-sm sm:text-base"
                        />
                    </div>

                    <GradientButton
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 sm:py-5 text-xs sm:text-sm uppercase tracking-[0.2em]"
                    >
                        {status === 'loading' ? 'Отправка...' : 'Отправить запрос'}
                    </GradientButton>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-green-500 font-mono text-[10px] uppercase tracking-wider text-center"
                            >
                                Письмо успешно доставлено!
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-500 font-mono text-[10px] uppercase tracking-wider text-center"
                            >
                                Ошибка. Попробуйте снова.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.form>
            </div>
        </section>
    );
}