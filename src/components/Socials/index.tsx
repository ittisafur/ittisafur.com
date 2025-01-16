import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github } from 'lucide-react';

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
  gradient: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Send an email',
    href: 'mailto:contact@ittisafur.com',
    icon: Mail,
    gradient: 'linear-gradient(135deg, #202020, #252525)'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/ittisafur',
    icon: Linkedin,
    gradient: 'linear-gradient(135deg, #0A66C2, #077AB5)'
  },
  {
    name: 'Upwork',
    href: 'https://www.upwork.com/your-profile',
    icon: ({ className }: { className?: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #14A800, #1A8D08)'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/ittisafur',
    icon: Github,
    gradient: 'linear-gradient(135deg, #1A1A1A, #2A2A2A)'
  }
];


const SocialButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full sm:w-auto"
          aria-label={social.name}
        >
          <div className="relative w-full sm:w-36 h-12 sm:h-14">
            {/* Base dark background */}
            <div
              className="absolute inset-0 rounded-md bg-[#141414] border border-[#252525] transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Gradient background that shows on hover */}
            <div
              className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: social.gradient,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            {/* Icon container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <social.icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#888] transition-colors duration-300 group-hover:text-white" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SocialButtons;
