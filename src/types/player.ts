
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Professional";

export interface Player {
  id: string;
  username: string;
  email: string;
  platform: "PC" | "PlayStation" | "Xbox" | "Switch";
  skillLevel: SkillLevel;
  gamesPlayed: number;
  hoursPlayed: number;
  wins: number;
  losses: number;
  avatar: string;
  joinedAt: string;
  isActive: boolean;
}

export interface PlayerFormData {
  username: string;
  email: string;
  platform: Player["platform"];
  skillLevel: SkillLevel;
}
