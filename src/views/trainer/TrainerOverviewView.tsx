import React from 'react';
import { HumanAIBanner } from '../../components/trainer/HumanAIBanner';
import { PrioritiesEngine } from '../../components/trainer/PrioritiesEngine';
import { BatchHealthCard } from '../../components/trainer/BatchHealthCard';
import { TraineeAttentionTable } from '../../components/trainer/TraineeAttentionTable';
import { TraineeDetailDrawer } from '../../components/trainer/TraineeDetailDrawer';
import { SilentWeakSpotCard } from '../../components/trainer/SilentWeakSpotCard';
import { InterventionImpactCard } from '../../components/trainer/InterventionImpactCard';
import { AttendanceScatterChart } from '../../components/trainer/AttendanceScatterChart';
import { TopicHeatmapCard } from '../../components/trainer/TopicHeatmapCard';
import { BatchSkillGapMap } from '../../components/trainer/BatchSkillGapMap';
import { CompetencyVerificationCard } from '../../components/trainer/CompetencyVerificationCard';
import { QuickActionCenter } from '../../components/trainer/QuickActionCenter';

export const TrainerOverviewView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Human + AI Closed-Loop Banner */}
      <HumanAIBanner />

      {/* 2. Today's Training Priorities Engine */}
      <PrioritiesEngine />

      {/* 3. Batch Learning Health & Trainees Needing Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BatchHealthCard />
        </div>
        <div className="lg:col-span-2">
          <TraineeAttentionTable />
        </div>
      </div>

      {/* 4. Silent Weak Spot Alert & Intervention Impact (Before/After) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SilentWeakSpotCard />
        <InterventionImpactCard />
      </div>

      {/* 5. Topic Performance Heatmap & Attendance vs Learning Scatter Plot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopicHeatmapCard />
        <AttendanceScatterChart />
      </div>

      {/* 6. Batch Skill Gap Map */}
      <BatchSkillGapMap />

      {/* 7. Competency Verification Sign-off */}
      <CompetencyVerificationCard />

      {/* 8. Quick Action Center Floating Bar */}
      <QuickActionCenter />

      {/* 9. Sliding Trainee Detail Drawer */}
      <TraineeDetailDrawer />
    </div>
  );
};
