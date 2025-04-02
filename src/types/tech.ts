interface Icon {
    __typename?: string;
    alternativeText?: string | null;
    ext?: string;
    formats?: string | null;
    height?: number;
    name?: string;
    size?: number;
    url?: string;
    width?: number;
    path?: string;
}

interface StackItem {
    __typename?: string;
    title: string;
    icon?: Icon | null;
}

interface StackIconProps {
    tech: StackItem;
    className?: string;
    iconSize?: string;
    showLabel?: boolean;
}

interface StackGridProps {
    technologies: StackItem[];
    className?: string;
    showLabels?: boolean;
    iconSize?: string;
}

interface TechCloudProps {
    technologies: StackItem[];
}

export type { Icon, StackItem, StackIconProps, StackGridProps, TechCloudProps };
