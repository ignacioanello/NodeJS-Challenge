// import { CommentService } from '../services/comment.service';
// import Comment, { IComment } from '../models/comment';
// import { IArticle } from '../models';
// import sinon from 'sinon';
// import mongoose, { Types } from 'mongoose';
// // import mockingoose from 'mockingoose';
// const mockingoose = require('mockingoose');

// let commentService: CommentService;

// const {ObjectId} = Types;


// const commentsMock = <IComment>{
//     _id: new ObjectId('222222222222222222222222').toString(),
//     body: 'The Comment Body 1',
//     author: 'Author Comment 1',
//     article: <IArticle>{
//         _id: new ObjectId('222222222222222222222222').toString(),
//         body: 'The Comment Body 1',
//         author: 'Author Comment 1',
//         title: "asdasd"
//     }
// };

// beforeEach(() => {s
//     commentService = new CommentService();
//     mockingoose.resetAll();
// });

// // it('should return the all comments', async () => {
// //     // Arrange
// //     mockingoose(Comment).toReturn(commentsMock, 'findOne');
// //     const spySend = sinon.spy(Comment, 'findOne');

// //     // Act
// //     const result = await commentService.find(commentsMock[1]._id);

// //     // Assert
// //     expect(spySend.callCount).toBe(1);
// //     expect(result?.body).toBe(commentsMock[1].body);
// //     expect(result?.author).toBe(commentsMock[1].author);
// // });
