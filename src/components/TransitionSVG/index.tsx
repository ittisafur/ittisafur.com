'use client';

import React from 'react';

interface TransitionSVGProps {
    isActive: boolean;
}

const TransitionSVG: React.FC<TransitionSVGProps> = ({ isActive }) => {
    return (
        <div
            className={`fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center transition-opacity duration-700 ${
                isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
                backgroundColor: '#0c0c0c', // Dark background matching your theme
            }}
        >
            <div
                className={`transition-transform duration-700 absolute inset-0 flex items-center justify-center ${
                    isActive ? 'scale-100' : 'scale-110'
                }`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    id="transition_svg"
                    x="0"
                    y="0"
                    version="1.1"
                    viewBox="0 0 1000 628"
                    width="300"
                    height="189"
                    className="transition-all duration-1000"
                    style={{
                        opacity: isActive ? 1 : 0,
                        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
                    }}
                >
                    <style>{`.svg-path{fill:#fff; transition: all 0.7s ease;}`}</style>
                    <path
                        d="m335.75 523.92-70.63-70.63 116.69-116.68-116.69-116.69 70.63-70.63 187.31 187.32zM888.7 405.06l70.89-71.16-187.31-187.31-70.62 70.63z"
                        className="svg-path"
                        style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(-40px)',
                            transitionDelay: '0.2s',
                        }}
                    />
                    <path
                        d="m229.25 405.06 70.9-71.16-187.31-187.31-70.63 70.63zM745.61 336.61 558.3 149.29l-70.62 70.63 116.68 116.69-116.68 116.68 70.62 70.63z"
                        className="svg-path"
                        style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(40px)',
                            transitionDelay: '0.3s',
                        }}
                    />
                </svg>
            </div>
        </div>
    );
};

export default TransitionSVG;
