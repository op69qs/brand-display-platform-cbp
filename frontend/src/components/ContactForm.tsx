'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { submitContactMessage } from '@/lib/strapi';

interface ContactFormProps {
    locale: Locale;
}

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await submitContactMessage({
                ...formData,
                language: locale,
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'yourName')} *
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t(locale, 'yourEmail')}
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t(locale, 'yourPhone')}
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'yourMessage')} *
                </label>
                <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? '...' : t(locale, 'submit')}
            </button>

            {status === 'success' && (
                <p className="text-green-600 text-center">{t(locale, 'submitSuccess')}</p>
            )}
            {status === 'error' && (
                <p className="text-red-600 text-center">{t(locale, 'submitError')}</p>
            )}
        </form>
    );
}
