// module.exports = {
//   mongoURI: 'mongodb://obcadmin:yahiya2018@ds139341.mlab.com:39341/obc',
//   secretOrKey: 'messmasteryahiyashijil'
// };

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./key_prod');
} else {
  module.exports = require('./key_dev');
}
