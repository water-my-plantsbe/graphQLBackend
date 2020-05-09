// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'user',
  user: 'student',
  password: 'hired',
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/user.db3'
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON', done);
        }
    },
    migrations: {
        directory: './data/migrations'
    },
    seeds: {
        directory: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  
  production: {
    client: 'pg',
    connection: productionDbConnection, 
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
