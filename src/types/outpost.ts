/**
 * Mission: Little Astronaut - Member 2 Deliverable: Visual Environment Types
 */

export type OutpostElementId = 
  | 'habitat' 
  | 'solar-station' 
  | 'greenhouse' 
  | 'radiation-shelter' 
  | 'rover' 
  | 'astronaut-leo' 
  | 'astronaut-maya' 
  | 'astronaut-sam';

export interface MiniTask {
  prompt: string;
  actionText: string;
  successMessage: string;
  actionIcon: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface BuildingInfo {
  id: OutpostElementId;
  name: string;
  category: 'Habitat' | 'Energy' | 'Life Support' | 'Safety' | 'Exploration' | 'Crew';
  tagline: string;
  themeColor: {
    primary: string;
    secondary: string;
    glow: string;
    accent: string;
    badgeBg: string;
  };
  icon: string;
  badgeName: string;
  badgeIcon: string;
  purpose: string;
  kidExplanation: string;
  spaceSuperpower: string;
  funFact: string;
  audioVoiceLine: string;
  stats: StatItem[];
  miniTask: MiniTask;
}

export interface BuildingComponentProps {
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
  hasDiscovered?: boolean;
}

export interface LunarOutpostProps {
  selectedElementId?: OutpostElementId | null;
  onSelectElement?: (id: OutpostElementId | null) => void;
  discoveredElements?: OutpostElementId[];
  onDiscoverElement?: (id: OutpostElementId) => void;
  soundEnabled?: boolean;
  onToggleSound?: (enabled: boolean) => void;
  className?: string;
  showInspectorPanel?: boolean;
  showDayNightShift?: boolean;
}
