import Link from 'next/link';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    type?: 'button' | 'submit';
    disabled?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
    children, 
    href, 
    onClick, 
    className = "", 
    type = 'button',
    disabled = false
}) => {
    const baseClasses = "flex justify-center items-center px-10 py-4 bg-gradient-to-r from-[#5266F2] to-[#9B5AF0] hover:opacity-90 active:scale-95 text-white text-lg font-bold rounded-[8px] transition-all duration-300 shadow-xl shadow-indigo-500/20 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

    const combinedClasses = cn(baseClasses, className);

    if (href) {
        return (
            <Link href={href} className={combinedClasses} onClick={onClick as any}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={combinedClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default GradientButton;
