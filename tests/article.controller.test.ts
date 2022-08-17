import mocks from 'node-mocks-http';
import sinon from 'sinon';
import { Types } from 'mongoose';
import { IArticle } from '../models';
import { ArticleController } from '../controllers/article.controller';
import { ArticleService } from '../services/article.service';

const { ObjectId } = Types;

describe('ArticleController Tests', () => {
    let objectId: Types.ObjectId;

    afterEach(() => {
        sinon.restore();
    });

    beforeEach(() => {
        objectId = new ObjectId();
    });

    it('GET Articles - return NO articles', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        sinon.stub(ArticleService, 'fetch').resolves([]);
        const spySend = sinon.spy(res, 'json');

        // Act
        await ArticleController.fetch(req, res, next);

        // Assert
        expect(spySend.calledWith([])).toBe(true);
    });

    it('GET Articles - return 2 Articles', async () => {
        // Arrange
        const articles = <IArticle[]>[{
            author: 'The author',
            body: 'The body',
            title: 'The title'
        },
        {
            author: 'The author 2',
            body: 'The body 2',
            title: 'The title 2'
        }];

        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const spySend = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'fetch').resolves(<any>articles);

        // Act
        await ArticleController.fetch(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spySend.calledWith(articles)).toBe(true);
        expect(body.length).toEqual(2);
    });

    it('GET Article - return 1 Article by ID', async () => {
        // Arrange
        const article = <IArticle>{
            _id: objectId,
            author: 'The author',
            body: 'The body',
            title: 'The title'
        };

        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        req._setParameter('id', objectId.toString());
        const spySend = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'find').resolves(<any>article);

        // Act
        await ArticleController.find(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spySend.calledWith(article)).toBe(true);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(article));
    });

    it('GET Article - return NULL - not match found', async () => {
        // Arrange
        const article = <IArticle>{
            _id: objectId,
            author: 'The author',
            body: 'The body',
            title: 'The title'
        };

        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        req._setParameter('id', objectId.toString());
        const spySend = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'find').resolves(null);

        // Act
        await ArticleController.find(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spySend.calledWith(null)).toBe(true);
        expect(body).toEqual(null);
    });

    it('CREATE Article - Created successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: objectId,
            author: 'The NEW author',
            body: 'The NEW body',
            title: 'The NEW title'
        };

        req._addBody("article", article);
        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'create').resolves(<any>article);

        // Act
        await ArticleController.create(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(res.statusCode).toEqual(201);
        expect(spyJson.calledWith(article)).toBe(true);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(article));
    });

    it('UPDATE Article - Updated successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: objectId,
            author: 'The author to Update',
            body: 'The body to Update',
            title: 'The title to Update'
        };

        req._setParameter('id', objectId.toString());
        req._addBody("article", article);

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'update').resolves(<any>article);

        // Act
        await ArticleController.update(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spyJson.calledWith(article)).toBe(true);
        expect(res.statusCode).toEqual(200);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(article));
    });

    it('UPDATE Article - FAIL - 400 Bad Request', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: objectId,
            author: 'The author to Update',
            body: 'The body to Update',
            title: 'The title to Update'
        };

        req._setParameter('id', 'INVALID');
        req._addBody("article", article);

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'update').resolves(<any>article);

        // Act
        await ArticleController.update(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(spyJson.calledWith(article)).toBe(false);
    });

    it('DELETE Article - Deleted successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: objectId,
            author: 'The author to Delete',
            body: 'The body to Delete',
            title: 'The title to Delete'
        };

        req._setParameter('id', objectId.toString());

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'remove').resolves(<any>article);

        // Act
        await ArticleController.remove(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(spyJson.calledWith(article)).toBe(true);
        expect(res.statusCode).toEqual(200);
        expect(JSON.stringify(body)).toEqual(JSON.stringify(article));
    });

    it('DELETE Article - FAIL - 400 Bad Request', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: objectId,
            author: 'The author to Delete',
            body: 'The body to Delete',
            title: 'The title to Delete'
        };

        req._setParameter('id','INVALID');

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'remove').resolves(<any>article);

        // Act
        await ArticleController.remove(req, res, next);
        const body = res._getJSONData();

        // Assert
        expect(res.statusCode).toEqual(400);
        expect(spyJson.calledWith(article)).toBe(false);
    });
});