import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '../ui/input';
import { Controller } from 'react-hook-form';

const InputField = ({
  type = 'text',
  label,
  name,
  error,
  loading,
  control, // ✅ use control instead of register
  placeholder,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label className="font-inter text-sm font-medium text-[#344054]">{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="relative">
            <Input
              {...field} // ✅ important
              disabled={loading}
              {...props}
              placeholder={placeholder}
              type={isPassword && showPassword ? 'text' : type}
              className={`font-content border-2 border-[#D4D4D4]! bg-white text-black/70 outline-none! placeholder:text-black/30 focus:border-[#071074]/40! focus:ring-0! ${className}`}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        )}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
