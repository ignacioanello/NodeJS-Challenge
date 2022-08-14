import { Schema, model, Document, Types } from 'mongoose';

//export interface IArticle extends Document<Types.ObjectId> {
export interface IArticle extends Document {
    title: string;
    body: string;
    author: string;
}

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true }); //Asigna de manera automatica el createdAt or UpodatedAt. (Se puede customizar el name)

//Con esto ya se crea las acciones de CRUD para trabajar sobre el documento de article
export default model<IArticle>('Article', articleSchema);

