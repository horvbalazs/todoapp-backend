import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env` });

export default {
    Secret: process.env.SECRET ?? '',
    ConnectionString: process.env.CONNECTION_STRING ?? '',
    Port: process.env.SERVER_PORT,
}