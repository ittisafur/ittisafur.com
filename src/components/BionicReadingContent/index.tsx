'use client';

import React from 'react';
import { bionicText, bionicHtml } from '@/utils/bionicReading';
import { useBionicReading } from '@/providers/BionicReading';

type BionicReadingContentProps = {
    content: string;
    isHtml?: boolean;
    className?: string;
};

export const BionicReadingContent: React.FC<BionicReadingContentProps> = ({
    content,
    isHtml = false,
    className = '',
}) => {
    const { isBionicEnabled, bionicIntensity } = useBionicReading();

    // Process content if bionic reading is enabled
    const processedContent = React.useMemo(() => {
        if (!isBionicEnabled) return content;

        return isHtml ? bionicHtml(content, bionicIntensity) : bionicText(content, bionicIntensity);
    }, [content, isBionicEnabled, bionicIntensity, isHtml]);

    // For HTML content, use dangerouslySetInnerHTML
    if (isHtml) {
        return <div className={className} dangerouslySetInnerHTML={{ __html: processedContent }} />;
    }

    // For plain text, render the processed content
    return <span className={className} dangerouslySetInnerHTML={{ __html: processedContent }} />;
};
