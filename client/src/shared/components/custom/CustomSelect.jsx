import { Controller } from 'react-hook-form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';

import { cn } from '@/shared/lib/utils';

const CustomSelect = ({ name, control, label, placeholder, options = [], error, disabled = false }) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && <label className="font-inter text-sm font-medium text-[#344054]">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger
              className={cn(
                `font-content focus:border-btnBlue/40 h-10 w-full border-2 border-[#D4D4D4] bg-white text-black/70 shadow-none outline-none focus:ring-0 data-placeholder:text-black/30`,
                error && 'border-red-500 focus:border-red-500'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="border border-[#D4D4D4] bg-white">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default CustomSelect;
