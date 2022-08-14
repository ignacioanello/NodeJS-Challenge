import { Schema, model } from 'mongoose';

export interface IComment{
    body: string,
    author: string,
    article: Schema.Types.ObjectId
}

const commentSchema = new Schema<IComment>({
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Article'

    }
}, { timestamps: true }); //Asigna de manera automatica el createdAt or UpodatedAt. (Se puede customizar el name)

//Con esto ya se crea las acciones de CRUD para trabajar sobre el documento de comment
export default model<IComment>('Comment', commentSchema);