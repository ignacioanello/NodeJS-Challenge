import mocks from 'node-mocks-http';
import sinon from 'sinon';
import { Types } from 'mongoose';
import { IComment } from '../models';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';

const { ObjectId } = Types;

describe('CommentController Tests', () => {
    let objectId: Types.ObjectId;

    afterEach(() => {
        sinon.restore();
    });

    beforeEach(() => {
        objectId = new ObjectId();
    });

    it('GET Comment - return 1 comment by ID', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const comment = <IComment><unknown>{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        };
        // new ObjectId(objectId.toString().slice(0, -1) + '$')

        req._setParameter('article', objectId.toString());
        const spySend = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'find').resolves(<any>comment);

        // Act
        await CommentController.find(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spySend.calledWith(comment)).toBe(true);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(comment));
    });

    it('GET Comment - return 2 Comments', async () => {
        // Arrange
        const comment = <IComment[]><unknown>[{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        },
        {
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        }];

        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const spySend = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'find').resolves(<any>comment);

        // Act
        await CommentController.find(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spySend.calledWith(comment)).toBe(true);
        expect(body.length).toEqual(2);
    });

    it('GET Comment - return NO comments', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        req._setParameter('article', objectId.toString());
        sinon.stub(CommentService, 'find').resolves([]);
        const spySend = sinon.spy(res, 'json');

        // Act
        await CommentController.find(req, res, next);

        // Assert
        expect(spySend.calledWith([])).toBe(true);
    });

    it('CREATE Comment - Created successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const comment = <IComment[]><unknown>{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        }

        req._addBody("comment", comment);
        const spyJson = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'create').resolves(<any>comment);

        // Act
        await CommentController.create(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(spyJson.calledWith(comment)).toBe(true);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(comment));
    });

    it('UPDATE Comment - Updated successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const comment = <IComment[]><unknown>{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        }

        req._setParameter('id', objectId.toString());
        req._addBody("comment", comment);

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'update').resolves(<any>comment);

        // Act
        await CommentController.update(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spyJson.calledWith(comment)).toBe(true);
        expect(res.statusCode).toEqual(200);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(comment));
    });

    it('UPDATE Comment - FAIL - 400 Bad Request', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const comment = <IComment[]><unknown>{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        }

        req._setParameter('id', 'INVALID');
        req._addBody("comment", comment);

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'update').resolves(<any>comment);

        // Act
        await CommentController.update(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(spyJson.calledWith(comment)).toBe(false);
    });

    it('DELETE Comment - Deleted successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const comment = <IComment[]><unknown>{
            _id: objectId,
            body: 'The body',
            author: 'The author',
            article: objectId
        }

        req._setParameter('id', objectId.toString());

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(CommentService, 'remove').resolves(<any>comment);

        // Act
        await CommentController.remove(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spyJson.calledWith(comment)).toBe(true);
        expect(res.statusCode).toEqual(200);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(comment));
    });
});