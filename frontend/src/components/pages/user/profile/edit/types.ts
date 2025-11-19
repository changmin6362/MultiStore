export interface UserProfileData {
  nickname: string;
  password: string;
  lastName: string;
  firstName: string;
  phone: string;
  birthDate: string;
  gender: "M" | "W";
  profileUrl: string | File;
}
