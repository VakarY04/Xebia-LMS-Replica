import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CustomCard: React.FC<CardProps> = ({
  title,
  description,
  icon,
  footer,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-xebia-lightGrey p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${className}`}
    >
      {icon && <div className="mb-4 text-xebia-emerald inline-block">{icon}</div>}
      <h3 className="text-lg font-bold text-xebia-purpleDark mb-2">{title}</h3>
      <p className="text-xebia-darkGrey text-sm leading-relaxed mb-4">{description}</p>
      {footer && <div className="border-t border-xebia-lightGrey pt-4 mt-auto">{footer}</div>}
    </div>
  );
};

export const ActionCard: React.FC<CardProps & { actionText?: string }> = ({
  title,
  description,
  icon,
  actionText = 'Learn more',
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`group bg-gradient-to-br from-white to-xebia-blueishGrey rounded-xl border border-xebia-lightGrey p-6 shadow-sm hover:border-xebia-purple transition-all duration-300 cursor-pointer ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        {icon && <div className="p-3 bg-xebia-purple/5 text-xebia-purple rounded-lg group-hover:bg-xebia-purple/10 transition-colors">{icon}</div>}
        <ArrowRight className="text-xebia-lightGrey group-hover:text-xebia-purple group-hover:translate-x-1 transition-all" size={20} />
      </div>
      <h3 className="text-lg font-bold text-xebia-purpleDark mt-4 mb-2">{title}</h3>
      <p className="text-xebia-darkGrey text-sm leading-relaxed">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-xebia-purple mt-4 group-hover:text-xebia-purpleBright transition-colors">
        {actionText}
      </span>
    </div>
  );
};
