import { ArticleService } from '../services/article.service';
import Article, { IArticle } from '../models/article';
import sinon from 'sinon';
import mongoose from 'mongoose';
const mockingoose = require('mockingoose');

describe('ArticleService Tests', () => {

    const articlesMock = <IArticle[]>[
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'The Article Title 1',
            body: 'The Article Body 1',
            author: 'Author 1'
        },
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'The Article Title 2',
            body: 'The Article Body 2',
            author: 'Author 2'
        },
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'The Article Title 3',
            body: 'The Article Body 3',
            author: 'Author 3'
        },
        {
            _id: new mongoose.Types.ObjectId().toString(),
            title: 'The Article Title 4',
            body: 'The Article Body 4',
            author: 'Author 4'
        },
    ];

    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should return all Articles', async () => {
        // Arrange
        mockingoose(Article).toReturn(articlesMock, 'find');
        const spySend = sinon.spy(Article, 'find');

        // Act
        const result = await ArticleService.fetch();

        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result.length).toBe(articlesMock.length);
    });

    it('should return a specific Articles', async () => {
        // Arrange
        mockingoose(Article).toReturn(articlesMock[1], 'findOne'); //findById
        const spySend = sinon.spy(Article, 'findOne');

        // Act
        const result = await ArticleService.find(articlesMock[1]._id);

        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result?.body).toBe(articlesMock[1].body);
        expect(result?.author).toBe(articlesMock[1].author);
    });

    it('should return the created Article', async () => {
        // Arrange
        const newArticle = <IArticle>{
            title: 'The new title',
            author: 'The new Author',
            body: 'The new body'
        };

        mockingoose(Article).toReturn(newArticle, 'save');
       
        ArticleService.create(newArticle).then(art => {
            // Assert
            expect(art?.body).toBe(newArticle.body);
            expect(art?.author).toBe(newArticle.author);
            expect(art?.title).toBe(newArticle.title);
        });

    });

    it('should return the updated Article', async () => {
        // Arrange
        const articleUpdated = <IArticle>{
            title: 'The Title Updated',
            author: 'The Author Updated',
            body: 'The Body Updated'
        };

        const spySend = sinon.spy(Article, 'findOneAndUpdate');
        mockingoose(Article).toReturn(articleUpdated, 'findOneAndUpdate');

        // Act
        const result = await ArticleService.update(articlesMock[2]._id, articleUpdated);

        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result?.body).toBe(articleUpdated.body);
        expect(result?.author).toBe(articleUpdated.author);
        expect(result?.title).toBe(articleUpdated.title);
    });

    it('should return the removed Article', async () => {
        // Arrange
        mockingoose(Article).toReturn(articlesMock[0], 'findOneAndRemove');
        const spySend = sinon.spy(Article, 'findOneAndRemove');

        // Act
        const result = await ArticleService.remove(articlesMock[0]._id);

        // Assert
        expect(spySend.callCount).toBe(1);
        expect(result?.body).toBe(articlesMock[0].body);
        expect(result?.author).toBe(articlesMock[0].author);
        expect(result?.title).toBe(articlesMock[0].title);
    });
});