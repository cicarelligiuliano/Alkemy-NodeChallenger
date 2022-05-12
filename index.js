const server = require('./src/app');
require('dotenv').config();
const { sequelize } = require('./src/db');
const {User} = require('./src/db')


sequelize.sync({ force: true }).then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Servidor levantado en puerto ${process.env.PORT}`);
    });
});
