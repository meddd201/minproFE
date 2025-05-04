export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  profilePict: string | null;
  role: string;
  referralCode: string;
}
