"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Grid3x3, Boxes } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Graveyards', href: '/graveyards', icon: Map },
  { name: 'Plots', href: '/plots', icon: Grid3x3 },
  { name: 'Graves', href: '/graves', icon: Boxes },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700">
      <div className="flex h-16 items-center justify-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">Graveyard System</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? 'bg-slate-700 text-white shadow-lg scale-105'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-102'
                }
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Session Active</span>
        </div>
      </div>
    </div>
  );
}
