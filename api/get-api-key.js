export default (req, res) => {
  res.json({ apiKey: process.env["API_KEY"] });
};
