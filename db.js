const { Pool } = require('pg');
const pool = new Pool({
    connectionString: 'postgres://aanougfckieono:d9ce13b420528808525a59abd103d40908d26f195910a09712e14d748ddb7f28@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d78t1br827i6e',
    ssl: true
});

module.exports = pool;