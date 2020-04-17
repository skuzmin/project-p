const { createDb, migrate } = require('postgres-migrations');
const { dbCn } = require('./app/config');

(async function() {
    try {
        await createDb('project-p', {
            ...dbCn,
            defaultDatabase: 'postgres'
        });
        await migrate(dbCn, './migrations');
        console.log('Migrations are done.');
    } catch(e) {
        console.log(e);
    }
})();
