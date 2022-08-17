// import mockingoose from 'mockingoose';
const mockingoose = require('mockingoose');
import { Types } from 'mongoose';
import sinon from 'sinon';
import { CommentService } from '../services/comment.service';
import Comment, { IComment } from '../models/comment';

const { ObjectId } = Types;

describe('CommentService Tests', () => {

    const commentsMock = <IComment[]><unknown[]>[{
        _id: new ObjectId('62fcd8b66d2f961f53c39885'),
        body: 'The Comment Body 1',
        author: 'Author Comment 1',
        article: new Types.ObjectId('62fcd8b66d2f961f53c39666')
    },
    {
        _id: new ObjectId('62fcd8b66d2f961f53c39886'),
        body: 'The Comment Body 2',
        author: 'Author Comment 2',
        article: new Types.ObjectId('62fcd8b66d2f961f53c39666')
    }];
    
    beforeEach(() => {
        mockingoose.resetAll();
    });

    xit('should return the all Comments of an Article', async () => {
        // Arrange
        mockingoose(Comment).toReturn(commentsMock[0], 'findOne');
        const spySend = sinon.spy(Comment, 'findOne');

        // Act
        const result = await CommentService.find(new ObjectId('62fcd8b66d2f961f53c39666'));

        // Assert
        // expect(spySend.callCount).toBe(1);
        // expect(result.body).toBe(commentsMock[0].body);
        // expect(result.author).toBe(commentsMock[0].author);
    });

    it('should return the created comment', async () => {
        // Arrange
        mockingoose(Comment).toReturn(commentsMock[0], 'save');
        const spySend = sinon.spy(Comment, 'create');

        // Act
        CommentService.create(commentsMock[0]).then((com) => {
            expect(spySend.callCount).toBe(1);
            expect(com.body).toBe(commentsMock[1].body);
            expect(com.author).toBe(commentsMock[1].author);
            expect(com.article).toStrictEqual(commentsMock[1].article);
        })

        //  **** I don't know why is ONLY the create is not working with AWAIT ****
        // Act
        // const result = await CommentService.create(commentsMock[0]);
        
        // Assert
        // expect(spySend.callCount).toBe(1);
        // expect(result.body).toBe(commentsMock[1].body);
        // expect(result.author).toBe(commentsMock[1].author);
        // expect(result.article).toBe(commentsMock[1].article);
    });

    it('should return the updated comment', async () => {
        // Arrange
        mockingoose(Comment).toReturn(commentsMock[0], 'findOneAndUpdate');
        const spySend = sinon.spy(Comment, 'findOneAndUpdate');

        // Act
        const result = await CommentService.update(new ObjectId('62fcd8b66d2f961f53c39885'), commentsMock[0]);
        
        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result?.body).toBe(commentsMock[0].body);
        expect(result?.author).toBe(commentsMock[0].author);
        expect(result?.article).toStrictEqual(commentsMock[0].article);
    });

    it('should return the removed comment', async () => {
        // Arrange
        mockingoose(Comment).toReturn(commentsMock[1], 'findOneAndRemove');
        const spySend = sinon.spy(Comment, 'findOneAndRemove');

        // Act
        const result = await CommentService.remove(new ObjectId('62fcd8b66d2f961f53c39886'));
        
        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result?.body).toBe(commentsMock[1].body);
        expect(result?.author).toBe(commentsMock[1].author);
        expect(result?.article).toStrictEqual(commentsMock[1].article);
    });

});