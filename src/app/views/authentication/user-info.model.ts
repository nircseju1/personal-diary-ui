export class UserInfo {
  name: string;
  username: string;
  email: string;
  role: string;
  password: string;

  constructor(name: string, username: string, email: string, role: string, password: string) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.role = role;
    this.password = password;
  }
}
