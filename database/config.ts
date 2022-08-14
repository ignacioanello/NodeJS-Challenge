import { connect } from 'mongoose';

export const dbConnection = async () => {
    //TODO: Por que lo tengo que castear a string cuando ya lo tengo tipado en envoronment.d.ts???
    await connect(process.env.DB_CONNECTION as string);
};