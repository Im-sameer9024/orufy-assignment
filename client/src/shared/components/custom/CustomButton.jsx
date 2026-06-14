import { Button } from '@/shared/components/ui/button';
import { Loader2 } from 'lucide-react';

const CustomButton = ({
  children,
  active,
  variant = 'default',
  size = 'default',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={loading || props.disabled}
      className={`font-content transition-all duration-300 hover:cursor-pointer ${fullWidth ? 'w-full' : ''} ${active ? 'bg-blue-500 hover:bg-blue-600' : ' bg-slate-300 text-black hover:bg-slate-400 '} ${className}`}
      {...props}
    >
      {/* Loading */}
      {loading && <Loader2 className="mr-1 animate-spin" size={16} />}

      {/* Left Icon */}
      {!loading && leftIcon && <span className="flex items-center">{leftIcon}</span>}

      {/* Text */}
      {children ? children : null}

      {/* Right Icon */}
      {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </Button>
  );
};

export default CustomButton;
