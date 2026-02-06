'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n';
import { t } from '@/lib/translations';
import { submitContactMessage } from '@/lib/strapi';

interface ContactFormProps {
    locale: Locale;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ locale }: ContactFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    // Validation messages by locale
    const validationMessages = {
        zh: {
            nameRequired: '请输入您的姓名',
            emailRequired: '请输入您的邮箱',
            emailInvalid: '请输入有效的邮箱地址',
            messageRequired: '请输入留言内容',
        },
        en: {
            nameRequired: 'Please enter your name',
            emailRequired: 'Please enter your email',
            emailInvalid: 'Please enter a valid email address',
            messageRequired: 'Please enter your message',
        },
        ru: {
            nameRequired: 'Пожалуйста, введите ваше имя',
            emailRequired: 'Пожалуйста, введите ваш email',
            emailInvalid: 'Пожалуйста, введите корректный email',
            messageRequired: 'Пожалуйста, введите ваше сообщение',
        },
    };

    const msg = validationMessages[locale];

    // Validate form fields
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validate name
        if (!formData.name.trim()) {
            newErrors.name = msg.nameRequired;
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = msg.emailRequired;
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = msg.emailInvalid;
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = msg.messageRequired;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Clear field error on input change
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Clear error for this field when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before submit
        if (!validateForm()) {
            return;
        }

        setStatus('loading');

        try {
            await submitContactMessage({
                ...formData,
                language: locale,
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
            setErrors({});
        } catch {
            setStatus('error');
        }
    };

    // Input class with error state
    const getInputClass = (hasError: boolean) => {
        const baseClass = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition-colors';
        return hasError
            ? `${baseClass} border-red-500 focus:ring-red-500`
            : `${baseClass} border-gray-300 focus:ring-red-500`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'yourName')} *
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={getInputClass(!!errors.name)}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t(locale, 'yourEmail')} *
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={getInputClass(!!errors.email)}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t(locale, 'yourPhone')}
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={getInputClass(false)}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t(locale, 'yourMessage')} *
                </label>
                <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`${getInputClass(!!errors.message)} resize-none`}
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
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
