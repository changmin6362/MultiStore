export const UserStates = ["User", "Guest"] as const;

export type UserStateType = (typeof UserStates)[number];
