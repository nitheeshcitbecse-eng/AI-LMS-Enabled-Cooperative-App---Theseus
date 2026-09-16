import React from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { DigitalIdCard } from '../components/dashboard/DigitalIdCard';
import { TrainingProgressCard } from '../components/dashboard/TrainingProgressCard';
import { LearningJourneyTimeline } from '../components/dashboard/LearningJourneyTimeline';
import { AILearningIntelligence } from '../components/dashboard/AILearningIntelligence';
import { NextBestActionCard } from '../components/dashboard/NextBestActionCard';
import { SkillProfileCard } from '../components/dashboard/SkillProfileCard';
import { LearningPathRoadmap } from '../components/dashboard/LearningPathRoadmap';
import { AssessmentAnalyticsCard } from '../components/dashboard/AssessmentAnalyticsCard';
import { AttendanceCard } from '../components/dashboard/AttendanceCard';
import { UpcomingScheduleCard } from '../components/dashboard/UpcomingScheduleCard';
import { CertificationCard } from '../components/dashboard/CertificationCard';
import { CareerPreviewCard } from '../components/dashboard/CareerPreviewCard';
import { CareerReadinessCard } from '../components/dashboard/CareerReadinessCard';
import { GamificationCard } from '../components/dashboard/GamificationCard';

export const OverviewView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome + Progress Banner */}
      <WelcomeBanner />

      {/* 2. Next Best Action (Highest Prominence) */}
      <NextBestActionCard />

      {/* 3. AI Learning Intelligence (Weak Spot + Closed-Loop Flow) */}
      <AILearningIntelligence />

      {/* 4. Continuous Learning Journey Timeline */}
      <LearningJourneyTimeline />

      {/* 5. Two Column Main Grid: Training Progress & Digital ID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrainingProgressCard />
        </div>
        <div className="lg:col-span-1">
          <DigitalIdCard />
        </div>
      </div>

      {/* 6. Skills & Assessment Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillProfileCard />
        <AssessmentAnalyticsCard />
      </div>

      {/* 7. Personalized Learning Path Roadmap */}
      <LearningPathRoadmap />

      {/* 8. Attendance & Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceCard />
        <UpcomingScheduleCard />
      </div>

      {/* 9. Credentials & Gamification Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CertificationCard />
        </div>
        <div className="lg:col-span-1">
          <GamificationCard />
        </div>
      </div>

      {/* 10. Career Preview & Career Readiness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CareerPreviewCard />
        </div>
        <div className="lg:col-span-1">
          <CareerReadinessCard />
        </div>
      </div>
    </div>
  );
};
