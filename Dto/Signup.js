export default class Signup {
  constructor(email, username, password) {
    if (!email || !username || !password) {
      throw new Error("All fields are required.");
    }
    this.email = email;
    this.username = username;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    if (!email) throw new Error("Email cannot be empty.");
    this.email = email;
  }

  getName() {
    return this.username;
  }

  setName(username) {
    if (!username) throw new Error("Username cannot be empty.");
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    if (!password) throw new Error("Password cannot be empty.");
    this.password = password;
  }
}
