class User {
  constructor({ id, name, email, phone }) {
    if (!email) {
      throw new Error("Email required");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  validate() {
    if (!this.email) {
      throw new Error("Email is required");
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error("Invalid email format");
    }

    return true;
  }

  updateEmail(newEmail) {
    if (!newEmail) {
      throw new Error("Email cannot be empty");
    }
    this.email = newEmail;
    this.validate();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone
    };
  }
}

module.exports = User;
