const server = require('./src/app');
require('dotenv').config();
const { sequelize } = require('./src/db');
const { User, Genre } = require('./src/db');
const { genres } = require('./src/utils/utils');

sequelize.sync({ force: false }).then(() => {
    genres.forEach(async (el) => {
        await Genre.findOrCreate({
            where: {
                name: el.name,
                image: el.image,
            },
        });
    });

    server.listen(process.env.PORT, () => {
        console.log(`Servidor levantado en puerto ${process.env.PORT}`);
    });
});
