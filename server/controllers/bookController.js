import { Book, Category, Rating } from '../model/models.js';
import { sequelize } from '../model/models.js';
import pkg from 'sequelize';
const { Op } = pkg;

class BookController {
  async create(req, res) {
    try {
      const {title, author, price, description, intro, categoryId} = req.body;
      const candidate = await Book.findOne({where: {title}});
      if (candidate) {
        return res.status(400).json({message: 'Книга с таким названием уже существует'});
      }

      await Book.create({
        title,
        author: author || null,
        price,
        description: description || null, 
        intro: intro || null,
        categoryId: categoryId || null,
      });
      res.status(200).json('Книга успешно добавлена');
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBooksByAuthor(req, res) {
    try {
      const { author } = req.body;
      const books = await Book.findAll({include: {
        model: Category,
        attributes: ['id', 'nameOfCategory'],
      }, where:{author}, raw: true,
      attributes: ['id', 'title', 'author', 'price', 'rating', 'description'] });
      console.log(books);
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBooksByTitle(req, res) {
    try {
      const { title } = req.body;
      const books = await Book.findOne({include: {
        model: Category,
        attributes: ['id', 'nameOfCategory'],
      }, where:{title}, raw: true,
      attributes: ['id', 'title', 'author', 'price', 'rating', 'description'] });
      console.log(books);
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getRatingByBookId(req, res) {
    try {
      const { id } = req.params;
      const rates = await Rating.findOne({ 
              
        attributes: [sequelize.fn('AVG', sequelize.col('rate'))],
        where:{bookId: id}, raw: true});
      res.status(200).json(rates);
      await Book.update({rating: rates['avg']}, {where:{id}});
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBookByCategoryId(req, res) {
    try {
      const { id } = req.params;
      const books = await Book.findAll({              
        attributes: ['id', 'title', 'author', 'price', 'rating', 'description'],
        where:{categoryId: id}, raw: true});
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getOneBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findOne({include: {
        model: Category,
        attributes: ['id', 'nameOfCategory'],
      },
      where:{id}, raw: true,
      attributes: ['id', 'title', 'author', 'price', 'rating', 'description'] });
      console.log(book);
      res.status(200).json(book);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({include: {
        model: Category,
        attributes: ['id', 'nameOfCategory'],
      },
      attributes: ['id', 'title', 'author', 'price', 'rating', 'description']
      });
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBooksByPrice(req, res) {
    try {
      const { price } = req.params;
      const books = await Book.findAll({where: {price: {[Op.lte]: price}}});
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBooksByRating(req, res) {
    try {
      const { rate } = req.params;
      const books = await Book.findAll({where: {rating: {[Op.gte]: rate}}});
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async sortBooksbyCriterion(req, res) {
    try {
      const { criterion } = req.params;
      const order = criterion === 'rating' ? 'DESC' : 'ASC';

      const books = await Book.findAll({include: {
        model: Category,
        attributes: ['id', 'nameOfCategory'],
      },
      order: [
        [`${criterion}`, `${order} NULLS LAST`],
        ['id', 'ASC'],
      ],
      attributes: ['id', 'title', 'author', 'price', 'rating', 'description']
      });
      res.status(200).json(books);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateBook(req, res) {
    try {
      const { id, title, author, price, description, intro, categoryId } = req.body;
      console.log(title);
      console.log(author);
      console.log(price);
      console.log(description);
      console.log(intro);
      const book = await Book.update({
        title,
        author: author || null,
        price,
        description: description || null,
        intro: intro || null,
        categoryId: categoryId || null,
      }, 
      {where:{id}});
      res.status(200).json(book);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteBook(req, res) {
    
    try {
      const { id } = req.params;
      const books = await Book.destroy({ where:{id}});
      console.log(books);
      res.status(200).json({message: 'Книга была удалена'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new BookController();