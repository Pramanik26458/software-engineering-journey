export async function register(req, res, next) {
  res.status(201).json({ message: "User registered successfully" });
}