module.exports = {
  greeting(req, res) {
    res.send({ msg: 'hi there' });
  },

  create(req, res) {
    console.log(req.body);
    res.send({ msg: 'hi there' });
  }
};
