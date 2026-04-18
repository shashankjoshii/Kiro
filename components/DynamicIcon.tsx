import { LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Try to find the icon in the Lucide set
  // This allows us to scale to 1000s of icons without hardcoding imports
  const IconComponent = (LucideIcons as any)[name];

  // If the string mapping is wrong or the icon doesn't exist, provide a graceful fallback
  if (!IconComponent) {
    console.warn(`DynamicIcon: Icon "${name}" not found in lucide-react. Using generic fallback.`);
    const Fallback = LucideIcons.HelpCircle;
    return <Fallback {...props} />;
  }

  return <IconComponent {...props} />;
}
