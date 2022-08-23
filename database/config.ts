import { connect } from 'mongoose';

export const getDbConnection = async () => {
    await connect(process.env.DB_CONNECTION as string);
};