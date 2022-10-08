const { Deta } = require("deta");

// Project Asia: Project Key: 0arl1
const deta = Deta(process.env.DETA_PROJECT_KEY);

exports.default = deta;