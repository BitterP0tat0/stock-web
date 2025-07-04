export default class Signup {
  constructor(email,password) {
    if (!email || !password) {
      throw new Error("All fields are required.");
    }
    this.email = email;
    this.password = password;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    if (!email) throw new Error("Email cannot be empty.");
    this.email = email;
  }


  getPassword() {
    return this.password;
  }

  setPassword(password) {
    if (!password) throw new Error("Password cannot be empty.");
    this.password = password;
  }
}
