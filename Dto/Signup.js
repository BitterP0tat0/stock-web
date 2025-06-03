class Signup {
  constructor(name, email, password) {
    //not empty
    if (!name || !email || !password) {
      throw new Error("All fields are required.");
    }
    this.name = name;
    this.email = email;
    this.password = password;
  }

  //getters and setters
  getName() {
    return this.name;
  }
  setName(name) {
    if (!name) {
      throw new Error("Name cannot be empty.");
    }
    this.name = name;
  }
  getEmail() {
    return this.email;
  }
  setEmail(email) {
    if (!email) {
      throw new Error("Email cannot be empty.");
    }
    this.email = email;
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
