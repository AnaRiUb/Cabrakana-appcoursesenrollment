import React from 'react';

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className }) => {
  return (
    <div
      className={`bg-red-500 text-white text-xs rounded-full w-6 h-6 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`} >
      {count}
    </div>
  );
};

export default NotificationBadge;
