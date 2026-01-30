'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZenCard, ZenItem } from '@/components/ZenCard';
import { NeoStatus } from '@/components/NeoStatus';
import { mockZenItems, completedToday, dismissedToday } from '@/data/mockItems';
import { 
  Check, 
  X, 
  Inbox, 
  ListTodo, 
  Users, 
  Brain, 
  Sparkles,
  ChevronRight,
  Keyboard
} from 'lucide-react';

export default function Home() {
  const [items, setItems] = useState<ZenItem[]>(mockZenItems);
  const [approved, setApproved] = useState(completedToday);
  const [dismissed, setDismissed] = useState(dismissedToday);
  const [lastAction, setLastAction] = useState<{ type: 'approve' | 'dismiss'; item: ZenItem } | null>(null);
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (items.length === 0) return;
    
    const currentItem = items[0];
    setLastAction({ 
      type: direction === 'right' ? 'approve' : 'dismiss', 
      item: currentItem 
    });
    
    if (direction === 'right') {
      setApproved(prev => prev + 1);
    } else {
      setDismissed(prev => prev + 1);
    }
    
    setItems(prev => prev.slice(1));
    
    // Clear last action after 3 seconds
    setTimeout(() => setLastAction(null), 3000);
  }, [items]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'l') {
        handleSwipe('right');
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        handleSwipe('left');
      } else if (e.key === '?') {
        setShowKeyboardHints(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipe]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Neo OS</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          <NavItem icon={Inbox} label="Zen List" active count={items.length} />
          <NavItem icon={ListTodo} label="Tasks" />
          <NavItem icon={Users} label="Contacts" />
          <NavItem icon={Brain} label="Memory" />
        </nav>

        {/* Neo Status */}
        <div className="mt-auto">
          <NeoStatus 
            tasks={[
              { description: 'Monitoring your world', progress: -1 }
            ]} 
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-white/10 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Zen List</h1>
            <p className="text-white/50 text-sm">
              {items.length} {items.length === 1 ? 'item' : 'items'} need your attention
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-green-400">
                <Check className="w-4 h-4" />
                <span>{approved}</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-1 text-red-400">
                <X className="w-4 h-4" />
                <span>{dismissed}</span>
              </div>
              <span className="text-white/40 text-xs">today</span>
            </div>
            <button 
              onClick={() => setShowKeyboardHints(prev => !prev)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white/60 transition-colors"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Keyboard Hints Modal */}
        <AnimatePresence>
          {showKeyboardHints && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-20 right-4 glass rounded-xl p-4 z-50 min-w-[200px]"
            >
              <h3 className="text-sm font-medium mb-3">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Approve</span>
                  <span className="text-white/40">→ or L</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Dismiss</span>
                  <span className="text-white/40">← or H</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Toggle hints</span>
                  <span className="text-white/40">?</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Stack Area */}
        <div className="flex-1 flex items-center justify-center p-8 relative">
          {items.length > 0 ? (
            <div className="w-full max-w-lg relative h-[400px]">
              <AnimatePresence mode="popLayout">
                {items.slice(0, 3).reverse().map((item, index) => (
                  <ZenCard
                    key={item.id}
                    item={item}
                    onSwipe={handleSwipe}
                    isTop={index === items.slice(0, 3).length - 1}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">All clear!</h2>
              <p className="text-white/50">You&apos;ve handled everything. Go build something.</p>
            </motion.div>
          )}
        </div>

        {/* Action Buttons (Mobile) */}
        {items.length > 0 && (
          <div className="p-4 flex justify-center gap-4 md:hidden">
            <button 
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center hover:bg-red-500/30 transition-colors"
            >
              <X className="w-8 h-8 text-red-400" />
            </button>
            <button 
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center hover:bg-emerald-500/30 transition-colors"
            >
              <Check className="w-8 h-8 text-emerald-400" />
            </button>
          </div>
        )}

        {/* Last Action Toast */}
        <AnimatePresence>
          {lastAction && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full flex items-center gap-2 ${
                lastAction.type === 'approve' 
                  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400' 
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}
            >
              {lastAction.type === 'approve' ? (
                <Check className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              <span className="text-sm">
                {lastAction.type === 'approve' ? 'Approved' : 'Dismissed'}: {lastAction.item.title.slice(0, 30)}...
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ 
  icon: Icon, 
  label, 
  active = false, 
  count 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  active?: boolean;
  count?: number;
}) {
  return (
    <button 
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/60'
        }`}>
          {count}
        </span>
      )}
      {active && <ChevronRight className="w-4 h-4 text-white/40" />}
    </button>
  );
}
