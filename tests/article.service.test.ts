// import { ArticleService } from '../services/article.service';
// import Article, { IArticle } from '../models/article';
// import mongoose from "mongoose";
// import { Mockgoose } from 'mockgoose';

// let mockgoose: Mockgoose = new Mockgoose(mongoose);
// let article: IArticle;
// let articleService: ArticleService;

// beforeAll(() => {
//     mockgoose.prepareStorage().then(() => {
//         mongoose.connect('mongodb://localhost/Articles');
//         mongoose.connection.on('connected', () => {
//             console.log('db connection is now open');
//         });
//     });
// });

// beforeEach(() => {
//     articleService = new ArticleService();
// });

// describe('ArticleService Tests', () => {

//     it('should return no Articles', async () => {
//         const result = await articleService.fetch();
//         expect(result.length).toBe(0);
//     });
// });

import { ArticleService } from '../services/article.service';
import Article, { IArticle } from '../models/article';
import sinon from 'sinon';
import mongoose from 'mongoose';
// import mockingoose from 'mockingoose';
const mockingoose = require('mockingoose');

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

describe('ArticleService Tests', () => {

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
        // expect(result).toMatchObject(articlesMock);
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

    xit('should return the created Article', async () => {
        // Arrange
        const newArticle = <IArticle>{
            title: 'The new title',
            author: 'The new Author',
            body: 'The new body'
        };
        mockingoose(Article).toReturn(newArticle, 'save');
        // const spySend = sinon.spy(Article, 'create');

        // Act
        const art = await ArticleService.create(newArticle);
        // expect(spySend.callCount).toBe(1);

        // console.log(art);
        // expect(art?.body).toBe(newArticle.body);
        // expect(art?.author).toBe(newArticle.author)
        // expect(art?.title).toBe(newArticle.title);

        // articleService.create(newArticle).then(art => {
        //     // Assert
        //     expect(art?.body).toBe(newArticle.body);
        //     expect(art?.author).toBe(newArticle.author);
        //     expect(art?.title).toBe(newArticle.title);
        // });

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

    it('should return the removed article', async () => {
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