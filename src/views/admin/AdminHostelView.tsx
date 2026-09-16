import React from 'react';
import { Building2, Bed, AlertTriangle, CheckCircle2, User, Clock, ArrowUpRight } from 'lucide-react';
import { mockHostelBlocks, mockHostelAllocations } from '../../data/mockAdminData';

export const AdminHostelView: React.FC = () => {
  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900">Hostel & Accommodation Management</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-900 text-xs font-bold border border-indigo-200">
              Campus Logistics
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Monitor residential hostel bed capacity, manage trainee check-ins/check-outs, and resolve allocation pressure.
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase block">Total Bed Capacity</span>
          <div className="text-2xl font-black text-slate-900">240 Beds</div>
          <span className="text-[10px] text-slate-500 font-medium">Across Blocks A, B & C</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-indigo-700 font-bold uppercase block">Currently Occupied</span>
          <div className="text-2xl font-black text-indigo-950">221 Beds</div>
          <span className="text-[10px] text-indigo-700 font-bold">92% Overall Occupancy</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
          <span className="text-xs text-emerald-700 font-bold uppercase block">Available Beds</span>
          <div className="text-2xl font-black text-emerald-800">19 Beds</div>
          <span className="text-[10px] text-emerald-700 font-bold">Ready for check-in</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-300 bg-amber-50/20 shadow-2xs space-y-1">
          <span className="text-xs text-amber-800 font-bold uppercase block">Accommodation Alerts</span>
          <div className="text-2xl font-black text-amber-900">3 Alerts</div>
          <span className="text-[10px] text-amber-800 font-bold">Checkout & Reassignment</span>
        </div>
      </div>

      {/* Hostel Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockHostelBlocks.map(block => (
          <div key={block.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">{block.blockName}</h3>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                block.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {block.status}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-600">
                <span>Occupancy Rate</span>
                <span className="font-bold text-slate-900">{block.occupancyRate}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${block.occupancyRate > 90 ? 'bg-red-500' : 'bg-indigo-600'}`}
                  style={{ width: `${block.occupancyRate}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-500">
              <span>Occupied: {block.occupiedBeds}/{block.totalBeds}</span>
              <span className="font-bold text-slate-800">{block.availableBeds} Available</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hostel Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">Current Residential Trainee Allocations</h2>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100">
            Batch CMDO-B04 & PFL-B02
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Trainee Name</th>
                <th className="py-3 px-3">Programme & Batch</th>
                <th className="py-3 px-3">Check-in / Check-out</th>
                <th className="py-3 px-3">Block & Room</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockHostelAllocations.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{item.traineeName}</td>
                  <td className="py-3 px-3 text-slate-700">{item.programme}</td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    {item.checkIn} – {item.checkOut}
                  </td>
                  <td className="py-3 px-3 font-semibold text-indigo-900">
                    {item.block} • {item.roomNo} ({item.bedNo})
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'Allocated' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
