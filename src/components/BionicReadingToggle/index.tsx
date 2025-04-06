'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useBionicReading } from '@/providers/BionicReading';

export const BionicReadingToggle: React.FC = () => {
    const { isBionicEnabled, toggleBionicReading } = useBionicReading();

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="bionic-reading"
                checked={isBionicEnabled}
                onCheckedChange={toggleBionicReading}
            />
            <Label htmlFor="bionic-reading" className="cursor-pointer text-sm">
                Fast Reading Mode
            </Label>
        </div>
    );
};
