exports.sample = (req, res) => {
  res.send(`We are in ${process.env.PORT} `);
};
exports.getTest = (req, res) => {
  res.send(`Test Name`);
};
