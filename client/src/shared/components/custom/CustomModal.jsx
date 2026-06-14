import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';

const CustomModal = ({ open, onOpenChange, title, description, children, size = 'md' }) => {
  const sizes = {
    sm: 'sm:max-w-md',
    md: 'sm:max-w-lg',
    lg: 'sm:max-w-2xl',
    xl: 'sm:max-w-4xl',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`max-h-[90vh] overflow-y-auto ${sizes[size]} `}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}

            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
