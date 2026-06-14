import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/app/store/authStore';
import { AuthApiOperations } from '@/features/Auth/authApiOperations';
import { GetApiErrorMessage, GetApiResponseMessage } from '@/shared/utils/apiMessage';

const ProfileDropdown = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await AuthApiOperations.LogoutUser();

      clearAuth();
      queryClient.clear();

      toast.success(GetApiResponseMessage(response));

      navigate('/login', {
        replace: true,
      });
    } catch (error) {
      clearAuth();
      queryClient.clear();

      toast.error(GetApiErrorMessage(error));

      navigate('/login', {
        replace: true,
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors hover:bg-white/40"
        >
          <img
            src={user?.avatarUrl || 'https://i.pravatar.cc/40'}
            alt="Profile"
            className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
          />

          <ChevronDown size={16} className="hidden text-slate-700 sm:block" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
