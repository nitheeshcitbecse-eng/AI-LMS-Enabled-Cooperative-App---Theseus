import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, BookOpen, ChevronRight, Award, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PathNode {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  duration: string;
  modulesCount: number;
  objectives: string[];
  skillsGained: string[];
  assessmentRequired: string;
}

export const LearningPathRoadmap: React.FC = () => {
  const { setActiveTab } = useApp();

  const nodes: PathNode[] = [
    {
      id: 'n1',
      title: 'Foundation & Principles',
      status: 'completed',
      duration: '10 Hours',
      modulesCount: 4,
      objectives: ['Understand 7 Rochdale Cooperative Principles', 'NCCT history & national framework'],
      skillsGained: ['Cooperative Management'],
      assessmentRequired: 'Assessment 1 (Scored 58%)',
    },
    {
      id: 'n2',
      title: 'Cooperative Management',
      status: 'completed',
      duration: '15 Hours',
      modulesCount: 5,
      objectives: ['Governance bylaws & committee resolutions', 'Member credit administration'],
      skillsGained: ['Cooperative Management', 'Communication'],
      assessmentRequired: 'Assessment 2 (Scored 61%)',
    },
    {
      id: 'n3',
      title: 'Digital Operations & ERP',
      status: 'completed',
      duration: '12 Hours',
      modulesCount: 4,
      objectives: ['National PACS Computerization ERP navigation', 'Direct Benefit Transfer & Kisan Credit Cards'],
      skillsGained: ['Digital Operations'],
      assessmentRequired: 'PACS ERP Practical Lab (Scored 78%)',
    },
    {
      id: 'n4',
      title: 'Financial Analysis & Audit',
      status: 'current',
      duration: '18 Hours',
      modulesCount: 6,
      objectives: ['Working capital ledger ratios', 'Cooperative audit compliance & NABARD guidelines'],
      skillsGained: ['Financial Analysis (Developing)'],
      assessmentRequired: 'Assessment 6 (Scored 74%) & AI Booster',
    },
    {
      id: 'n5',
      title: 'Cooperative Leadership',
      status: 'upcoming',
      duration: '10 Hours',
      modulesCount: 3,
      objectives: ['Strategic decision making', 'FPO aggregation & market linkups'],
      skillsGained: ['Strategic Leadership'],
      assessmentRequired: 'Final Leadership Viva',
    },
    {
      id: 'n6',
      title: 'Advanced Cooperative Strategy',
      status: 'upcoming',
      duration: '14 Hours',
      modulesCount: 4,
      objectives: ['Multi-state cooperative expansion', 'Digital ERP governance scaling'],
      skillsGained: ['Executive Governance'],
      assessmentRequired: 'National NCCT Capstone Project',
    },
  ];

  const [selectedNode, setSelectedNode] = useState<PathNode>(nodes[3]); // Default to Financial Analysis

  return (
    <div className="ncct-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Personalized Learning Path</h3>
          <p className="text-xs text-slate-500">Curriculum roadmap tailored to your career goal</p>
        </div>
        <button
          onClick={() => setActiveTab('learning_path')}
          className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
        >
          <span>View Detailed Path</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Nodes Stepper Roadmap */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 pt-1">
        {nodes.map((node, index) => {
          const isCompleted = node.status === 'completed';
          const isCurrent = node.status === 'current';
          const isSelected = selectedNode.id === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between h-28 ${
                isCurrent
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-md ring-2 ring-indigo-300'
                  : isCompleted
                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-900 hover:bg-emerald-100/50'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              } ${isSelected && !isCurrent ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-bold ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>
                  Module 0{index + 1}
                </span>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>

              <h4 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-900'}`}>
                {node.title}
              </h4>

              <span className={`text-[9px] uppercase font-semibold ${
                isCurrent ? 'text-emerald-300' : isCompleted ? 'text-emerald-700' : 'text-slate-400'
              }`}>
                {isCompleted ? 'Completed' : isCurrent ? 'Active Now' : 'Upcoming'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900">{selectedNode.title}</h4>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-semibold">
              {selectedNode.duration} • {selectedNode.modulesCount} Modules
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Assessment: <strong>{selectedNode.assessmentRequired}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Key Objectives</span>
            <ul className="space-y-1 text-slate-700">
              {selectedNode.objectives.map(obj => (
                <li key={obj} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Competencies Unlocked</span>
            <div className="flex flex-wrap gap-1">
              {selectedNode.skillsGained.map(skill => (
                <span key={skill} className="px-2 py-0.5 rounded bg-white text-indigo-950 font-semibold border border-slate-200 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
