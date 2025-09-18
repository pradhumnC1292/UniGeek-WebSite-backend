export default function adminAuth(req, res, next) {
  const token = req.get("X-Admin-Token");
  if (token && process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN)
    return next();
  return res.status(401).json({ message: "Unauthorized" });
}
