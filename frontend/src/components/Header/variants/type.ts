export const Breakpoints = ["Mobile", "Tablet", "Desktop"] as const;
export const UserStates = ["User", "Guest"] as const;

export type BreakpointType = (typeof Breakpoints)[number];
export type UserStateType = (typeof UserStates)[number];
