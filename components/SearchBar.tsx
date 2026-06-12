'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { searchTools, type Tool, intents } from '@/lib/data';
import { useMascot } from '@/context/MascotContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Tool[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setMascotState } = useMascot();

  // Cmd+K hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      setMascotState('thinking');
      const res = searchTools(query);
      setResults(res);
      setSelectedIndex(-1);
      
      // Delay before switching to excited or staying thinking
      const timer = setTimeout(() => {
        if (res.length > 0) {
          setMascotState('excited');
        } else {
          setMascotState('idle');
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      if (isFocused) {
        setMascotState('thinking');
      } else {
        setMascotState('idle');
      }
    }
  }, [query, isFocused, setMascotState]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
        setMascotState('idle');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setMascotState]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = query.trim().length > 0 ? results.length : intents.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      if (query.trim().length > 0 && results[selectedIndex]) {
        router.push(`/tools/${results[selectedIndex].slug}`);
        setIsFocused(false);
      } else if (intents[selectedIndex]) {
        router.push(`/category/${intents[selectedIndex].targetCategory}`);
        setIsFocused(false);
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto" id="search">
      <div
        className={`relative rounded-xl border bg-card transition-all duration-200 ${
          isFocused ? 'border-border-strong shadow-[0_2px_16px_rgba(0,0,0,0.05)]' : 'border-border'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-3.5">
          <Search className={`h-5 w-5 transition-colors duration-300 ${isFocused ? 'text-accent' : 'text-muted-light'}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search AI tools or intents..."
            className="flex-1 bg-transparent text-foreground placeholder-muted-light outline-none text-[15px]"
            id="search-input"
          />
          <AnimatePresence mode="wait">
            {query ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-sand text-muted transition-colors hover:bg-sand-dark hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </motion.button>
            ) : (
              <motion.div
                key="shortcut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:flex items-center gap-1 rounded bg-sand/60 px-1.5 py-1"
              >
                <Command className="h-3 w-3 text-muted" />
                <span className="text-[10px] font-medium text-muted">K</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isFocused && (query.trim().length > 0 || intents.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-card shadow-[0_8px_32px_rgba(0,0,0,0.07)]"
          >
            {query.trim().length === 0 ? (
              <div className="py-2">
                 <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">Suggested Intents</div>
                 {intents.map((intent, idx) => (
                    <Link
                      key={intent.slug}
                      href={`/category/${intent.targetCategory}`}
                      onClick={() => { setIsFocused(false); }}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${idx === selectedIndex ? 'bg-accent/10' : 'hover:bg-sand'}`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sand text-lg">
                        {intent.icon}
                      </span>
                      <span className="text-sm font-medium text-foreground">{intent.name}</span>
                    </Link>
                 ))}
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[320px] overflow-y-auto py-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">Tools</div>
                {results.map((tool, idx) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => { setIsFocused(false); setQuery(''); }}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${idx === selectedIndex ? 'bg-accent/10' : 'hover:bg-sand'}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand text-lg">
                      {tool.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {tool.name}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {tool.shortDescription}
                      </p>
                    </div>
                    {tool.featured && (
                      <span className="shrink-0 rounded-full bg-accent-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                        Featured
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center flex flex-col items-center">
                <span className="text-3xl mb-2">🤔</span>
                <p className="text-sm text-foreground font-medium">No tools found</p>
                <p className="text-xs text-muted mt-1">Try a different keyword</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
