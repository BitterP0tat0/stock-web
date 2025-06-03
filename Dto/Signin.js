export default class User {
  constructor(username, password) {
    if (!username || !password) {
      throw new Error("Username and password are required.");
    }
    this.username = username;
    this.password = password;
  }
  // Getters and setters
  getUsername() {
    return this.username;
  }
  setUsername(username) {
    if (!username) {
      throw new Error("Username cannot be empty.");
    }
    this.username = username;
  }
  getPassword() {
    return this.password;
  }
  setPassword(password) {
    if (!password) {
      throw new Error("Password cannot be empty.");
    }
    this.password = password;
  }
}
