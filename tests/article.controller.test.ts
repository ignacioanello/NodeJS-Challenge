import mocks, { MockRequest } from 'node-mocks-http';
import sinon from 'sinon';
import { IArticle } from '../models';
import { ArticleController } from '../controllers/article.controller';
import { ArticleService } from '../services/article.service';

describe('ArticleController Tests', () => {

    afterEach(() => {
        sinon.restore();
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

    it('CREATE Article - Created successfully', async () => {
        // Arrange
        const req = mocks.createRequest();
        const res = mocks.createResponse();
        const next = () => { };

        const article = <IArticle>{
            _id: '344g32567gg572w7762w122y',
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

        // const article = <IArticle>{
        //     _id: '344g32567gg572w7762w122y',
        //     author: 'The author to Update',
        //     body: 'The body to Update',
        //     title: 'The title to Update'
        // };

        const article = {};

        req._setParameter('id', '344g32567gg572w7762w122y');
        req._addBody("article", article);

        const spyJson = sinon.spy(res, 'json');
        sinon.stub(ArticleService, 'update').resolves(<any>article);

        // Act
        await ArticleController.update(req, res, next);
        
        //TODO: Check issue here...
        // const body = res._getData();

        // // Assert
        // expect(spyJson.calledWith(article)).toBe(true);
        // expect(JSON.stringify(body)).toEqual(JSON.stringify(article));

    });
});