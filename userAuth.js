function login(username, password) {
  const storedUsername = "admin";
  const storedPassword = "123456";
  if (username) {
    if (password) {
      if (username === storedUsername && password === storedPassword) {
        console.log("Login successful");
      } else {
        console.log("Invalid credentials");
      }
    } else {
      console.log("Password missing");
    }
  } else {
    console.log("Username missing");
  }
}
