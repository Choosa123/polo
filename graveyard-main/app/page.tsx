"use client";

import { useGraveyard } from '@/contexts/GraveyardContext';
import { Map, Grid3x3, Boxes, CheckCircle2, XCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function Dashboard() {
  const { graveyards, plots, graves } = useGraveyard();

  const stats = useMemo(() => {
    const availableGraves = graves.filter((g) => g.status === 'available').length;
    const unavailableGraves = graves.filter((g) => g.status === 'unavailable').length;

    return {
      totalGraveyards: graveyards.length,
      totalPlots: plots.length,
      totalGraves: graves.length,
      availableGraves,
      unavailableGraves,
      occupancyRate: graves.length > 0 ? Math.round((unavailableGraves / graves.length) * 100) : 0,
    };
  }, [graveyards, plots, graves]);

  const statCards = [
    {
      title: 'Total Graveyards',
      value: stats.totalGraveyards,
      icon: Map,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
    },
    {
      title: 'Total Plots',
      value: stats.totalPlots,
      icon: Grid3x3,
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100',
    },
    {
      title: 'Total Graves',
      value: stats.totalGraves,
      icon: Boxes,
      gradient: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100',
    },
    {
      title: 'Available Graves',
      value: stats.availableGraves,
      icon: CheckCircle2,
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      title: 'Reserved Graves',
      value: stats.unavailableGraves,
      icon: XCircle,
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Overview of your graveyard management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`rounded-xl bg-gradient-to-br ${card.gradient} p-3 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-slate-600 mb-1">{card.title}</h3>
                  <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Occupancy Rate</h2>
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${stats.occupancyRate}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {stats.occupancyRate}% of graves are currently reserved
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg. Graves per Plot</span>
                <span className="font-semibold text-slate-900">
                  {stats.totalPlots > 0 ? Math.round(stats.totalGraves / stats.totalPlots) : 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Avg. Plots per Graveyard</span>
                <span className="font-semibold text-slate-900">
                  {stats.totalGraveyards > 0 ? Math.round(stats.totalPlots / stats.totalGraveyards) : 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Color Legend</h2>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-green-500"></div>
                  <span className="text-sm text-slate-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500"></div>
                  <span className="text-sm text-slate-300">Reserved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
