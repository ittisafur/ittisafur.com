/**
 * Converts a word to bionic reading format by bolding the first few characters
 * @param word The word to convert
 * @param intensity The proportion of characters to emphasize (0.0-1.0)
 * @returns The word with HTML tags for bionic reading
 */
export const bionicWord = (word: string, intensity: number = 0.5): string => {
    if (!word || word.length <= 1) return word;

    // Calculate how many characters to bold based on intensity
    // At least 1 character, at most the whole word minus 1
    const charsToEmph = Math.max(1, Math.min(Math.ceil(word.length * intensity), word.length - 1));

    // Split the word into emphasized and regular parts
    const emphPart = word.substring(0, charsToEmph);
    const regularPart = word.substring(charsToEmph);

    // Return the formatted word with strong tag
    return `<strong>${emphPart}</strong>${regularPart}`;
};

/**
 * Converts text to bionic reading format by applying bionicWord to each word
 * @param text The text to convert
 * @param intensity The proportion of characters to emphasize (0.0-1.0)
 * @returns HTML string with bionic reading formatting
 */
export const bionicText = (text: string, intensity: number = 0.5): string => {
    if (!text) return '';

    // Split the text by spaces and other word boundaries while preserving them
    const parts = text.split(/(\s+|[,.!?;:()[\]{}'"«»""''\-–—])/);

    // Process each part - apply bionicWord to actual words, keep separators as is
    return parts
        .map((part) => {
            // Skip empty parts and separators
            if (!part.trim() || /^[\s,.!?;:()[\]{}'"«»""''\-–—]+$/.test(part)) {
                return part;
            }
            return bionicWord(part, intensity);
        })
        .join('');
};

/**
 * Processes HTML content to apply bionic reading to text nodes while preserving HTML structure
 * @param htmlContent The HTML content to process
 * @param intensity The proportion of characters to emphasize (0.0-1.0)
 * @returns HTML with bionic reading applied to text content
 */
export const bionicHtml = (htmlContent: string, intensity: number = 0.5): string => {
    if (!htmlContent) return '';

    // For a simple implementation, we'll process text between html tags
    // Note: For a production app, consider using a proper HTML parser

    // This is a simplified approach - replace text between tags
    return htmlContent.replace(/>([^<]+)</g, (match, textContent) => {
        const bionicContent = bionicText(textContent, intensity);
        return `>${bionicContent}<`;
    });
};
