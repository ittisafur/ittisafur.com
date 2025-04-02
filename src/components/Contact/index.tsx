'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@apollo/client';
import { CREATE_CONTACT } from '@/graphql/mutations/createContact';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

// Define our validation schema
const contactSchema = z.object({
    name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    subject: z.string().min(2, { message: 'Subject is required' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
    });

    const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await createContact({
                variables: {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                },
            });

            reset();
            setIsSubmitted(true);

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
                            Let&apos;s chat.
                        </h1>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Tell me about your project.
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Let&apos;s create something together ✨
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 text-muted-foreground">
                        <Mail className="h-5 w-5" />
                        <a
                            href="mailto:contact@ittisafur.com"
                            className="hover:underline transition-all delay-300 duration-300 ease-in"
                        >
                            contact@ittisafur.com
                        </a>
                    </div>
                </div>

                {/* Right Column */}
                <div className="p-6 lg:p-8 shadow-lg border-border relative overflow-hidden">
                    <div className="absolute inset-0 rounded-lg opacity-20 pointer-events-none" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-semibold mb-6">Send me a message✨</h3>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 mb-6 rounded-md bg-primary/10 text-primary-foreground"
                            >
                                <p className="font-medium">Thank you for your message!</p>
                                <p className="text-sm opacity-80 mt-1">
                                    I&apos;ll get back to you shortly.
                                </p>
                            </motion.div>
                        ) : null}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    placeholder="Full name*"
                                    className="bg-background/80 border-input focus:border-primary"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    placeholder="Email address*"
                                    className="bg-background/80 border-input focus:border-primary"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Input
                                    id="subject"
                                    type="text"
                                    {...register('subject')}
                                    placeholder="Subject*"
                                    className="bg-background/80 border-input focus:border-primary"
                                />
                                {errors.subject && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Textarea
                                    id="message"
                                    {...register('message')}
                                    rows={4}
                                    placeholder="Tell me more about your project*"
                                    className="bg-background/80 border-input focus:border-primary resize-none"
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-destructive">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting || loading}
                                className="w-full flex justify-center items-center border-it-white border px-20 py-2.5 rounded hover:scale-95 hover:bg-it-white hover:text-it-dark-800 transition-all ease-in duration-300 font-semibold text-base cursor-pointer text-center"
                                size="lg"
                            >
                                {isSubmitting || loading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Send message'
                                )}
                            </Button>

                            {error && (
                                <div className="p-3 mt-4 rounded-md bg-destructive/10 text-destructive text-sm">
                                    Something went wrong. Please try again later.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
