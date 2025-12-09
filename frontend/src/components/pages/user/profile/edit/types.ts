export interface UserProfileData {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string; // YYMMDD (preferred in form), also accepts YYYYMMDD/ISO by normalizer; empty string if unset
  gender: "M" | "W";
  profileImageUrl: string | File;
}
