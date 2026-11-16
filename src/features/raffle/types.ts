export type Entry = {
  id: number;
  ticket: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  created: string;
};
export type Prize = {
  id: string;
  name: string;
  description: string;
  image: string;
  quantity: number;
  published: number;
};
export type Draw = {
  id: string;
  name: string;
  entryId: number;
  prizeName: string;
  prize: string;
  revealed: number;
  collected: number;
  created: string;
};
export type DashboardData = {
  entries: Entry[];
  prizes: Prize[];
  draws: Draw[];
  eligible: number;
  settings: {
    names: string;
    date: string;
    excludeWinners: number;
    registrationOpen: number;
    duplicateRule: string;
  };
  audit: { id: number; action: string; subject: string; created: string }[];
};

export type AdminSection =
  "overview" | "entries" | "draw" | "prizes" | "winners" | "settings" | "audit";
