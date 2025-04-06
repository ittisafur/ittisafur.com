'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type BionicReadingContextType = {
    isBionicEnabled: boolean;
    bionicIntensity: number;
    toggleBionicReading: () => void;
    setBionicIntensity: (intensity: number) => void;
};

const BionicReadingContext = createContext<BionicReadingContextType | undefined>(undefined);

export const BionicReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state from localStorage if available (client-side only)
    const [isBionicEnabled, setIsBionicEnabled] = useState<boolean>(false);
    const [bionicIntensity, setBionicIntensity] = useState<number>(0.5);

    // Load saved preferences from localStorage on mount
    useEffect(() => {
        const savedBionicEnabled = localStorage.getItem('bionicReading');
        const savedIntensity = localStorage.getItem('bionicIntensity');

        if (savedBionicEnabled) {
            setIsBionicEnabled(savedBionicEnabled === 'true');
        }

        if (savedIntensity) {
            setBionicIntensity(parseFloat(savedIntensity));
        }
    }, []);

    // Toggle bionic reading on/off
    const toggleBionicReading = () => {
        const newValue = !isBionicEnabled;
        setIsBionicEnabled(newValue);
        localStorage.setItem('bionicReading', String(newValue));
    };

    // Update bionic intensity
    const updateBionicIntensity = (intensity: number) => {
        setBionicIntensity(intensity);
        localStorage.setItem('bionicIntensity', String(intensity));
    };

    // Context value
    const value = {
        isBionicEnabled,
        bionicIntensity,
        toggleBionicReading,
        setBionicIntensity: updateBionicIntensity,
    };

    return <BionicReadingContext.Provider value={value}>{children}</BionicReadingContext.Provider>;
};

// Custom hook to use the bionic reading context
export const useBionicReading = (): BionicReadingContextType => {
    const context = useContext(BionicReadingContext);
    if (context === undefined) {
        throw new Error('useBionicReading must be used within a BionicReadingProvider');
    }
    return context;
};
