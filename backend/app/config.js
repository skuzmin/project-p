const config = {
    port: 9001,
    dbCn: {
        host: 'pg_container',
        port: 5432,
        database: 'project_p',
        user: 'adm1n',
        password: 'Passw0rd'
    },
    mailjet: {
        login: '4f13b4f195b04dd1076df57f0f5bb80b',
        password: 'ce612d2dce83a63280f719554f9076ee'
    },
    saltRounds: 10,
    baseUrl: '/api',
    jwtSecret: 'pewpew'
};

module.exports = config;
