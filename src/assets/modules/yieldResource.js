module.exports = (req, next) => {
  const resource = req["resource"];
  if (!resource) return next(new Error("no resource found"));
  return resource;
};