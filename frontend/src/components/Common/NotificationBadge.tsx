import React from 'react';

interface NotificationBadgeProps {
  count: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count }) => {
  return (
    <div className="notification-badge">
      {count > 0 ? <span>{count}</span> : null}
    </div>
  );
};

export default NotificationBadge;
