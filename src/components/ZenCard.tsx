'use client';

import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Check, X, Mail, MessageSquare, ListTodo, Calendar, Bell } from 'lucide-react';

export interface ZenItem {
  id: string;
  source: 'email' | 'slack' | 'task' | 'calendar' | 'neo';
  title: string;
  body: string;
  sender?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  proposedAction?: string;
  time?: string;
}

interface ZenCardProps {
  item: ZenItem;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const sourceIcons = {
  email: Mail,
  slack: MessageSquare,
  task: ListTodo,
  calendar: Calendar,
  neo: Bell,
};

const sourceColors = {
  email: 'text-blue-400',
  slack: 'text-purple-400',
  task: 'text-orange-400',
  calendar: 'text-green-400',
  neo: 'text-emerald-400',
};

const priorityLabels = {
  1: { label: 'Critical', color: 'bg-red-500' },
  2: { label: 'High', color: 'bg-orange-500' },
  3: { label: 'Medium', color: 'bg-yellow-500' },
  4: { label: 'Low', color: 'bg-blue-500' },
  5: { label: 'FYI', color: 'bg-gray-500' },
};

export function ZenCard({ item, onSwipe, isTop }: ZenCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Swipe indicators
  const leftIndicatorOpacity = useTransform(x, [-100, 0], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 100], [0, 1]);

  const Icon = sourceIcons[item.source];
  const priority = priorityLabels[item.priority];

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute w-full cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      exit={{ 
        x: 300, 
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      whileTap={isTop ? { scale: 1.02 } : undefined}
    >
      {/* Card */}
      <div className="glass rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Swipe Indicators */}
        <motion.div 
          className="absolute inset-0 swipe-left-indicator flex items-center justify-start pl-6 pointer-events-none"
          style={{ opacity: leftIndicatorOpacity }}
        >
          <div className="bg-red-500/20 border border-red-500 rounded-full p-3">
            <X className="w-8 h-8 text-red-500" />
          </div>
        </motion.div>
        <motion.div 
          className="absolute inset-0 swipe-right-indicator flex items-center justify-end pr-6 pointer-events-none"
          style={{ opacity: rightIndicatorOpacity }}
        >
          <div className="bg-green-500/20 border border-green-500 rounded-full p-3">
            <Check className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-white/5 ${sourceColors[item.source]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-white/50 uppercase tracking-wider">
                {item.source}
              </span>
              {item.sender && (
                <p className="text-sm text-white/70">{item.sender}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {item.time && (
              <span className="text-xs text-white/40">{item.time}</span>
            )}
            <span className={`text-xs px-2 py-1 rounded-full ${priority.color}`}>
              {priority.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
            {item.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {item.body}
          </p>
          
          {/* Proposed Action */}
          {item.proposedAction && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mt-4">
              <p className="text-xs text-emerald-400 uppercase tracking-wider mb-1">
                Neo suggests
              </p>
              <p className="text-emerald-300 text-sm">
                {item.proposedAction}
              </p>
            </div>
          )}
        </div>

        {/* Swipe Hint */}
        {isTop && (
          <div className="flex justify-center gap-8 mt-6 text-xs text-white/30">
            <span className="flex items-center gap-1">
              <X className="w-3 h-3" /> Swipe left to dismiss
            </span>
            <span className="flex items-center gap-1">
              Swipe right to approve <Check className="w-3 h-3" />
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
