import { Book, BookAuthor, Author } from '../model/models.js';

class BookAuthorController {
  async create(req, res) {
    try {
      const { authorId, bookId } = req.body;
      const candidate = await BookAuthor.findAll({where:{authorId}, attributes: ['bookId']});
     
      if (candidate.map(item => item.bookId).includes(bookId)) return res.status(200).json('Книга уже содержится в книгах автора');
      await BookAuthor.create({
        authorId: authorId || null,
        bookId: bookId || null,
      });
      res.status(200).json('Книга успешно добавлена в книги автора');
    }
    catch(e) {
      console.log(e);
    }
  }

  async getId(req, res) {
    try {
      const { authorId, bookId } = req.body;
      const id = await BookAuthor.findOne({where:{authorId, bookId}, attributes: ['id']});    
      res.status(200).json(id);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBookAuthorByBookId(req, res) {
    try {
      const { id } = req.params;
      const bookAuthors = await BookAuthor.findAll({ include: [
        {model: Book, attributes: ['id', 'title', 'author', 'image', 'price']},
        {model: Author, attributes: ['id', 'name'] }],
      attributes: ['id'],
      where:{bookId: id}});
      console.log(bookAuthors);
      res.status(200).json(bookAuthors);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getBookAuthorByAuthorId(req, res) {
    try {
      const { id } = req.params;
      const bookAuthors = await BookAuthor.findAll({ include: [
        {model: Book, attributes: ['id', 'title', 'author', 'price', 'image']},
        {model: Author, attributes: ['id', 'name'] }],
      attributes: ['id'],
      where:{authorId: id}});
      console.log(bookAuthors);
      res.status(200).json(bookAuthors);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllBookAuthors(req, res) {
    try {
      const bookAuthors = await BookAuthor.findAll({ include: [
        {model: Book, attributes: ['id', 'title', 'author']},
        {model: Author, attributes: ['id', 'name'] }],
      attributes: ['id']});
      res.status(200).json(bookAuthors);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateBookAuthor(req, res) {
    try {
      const { id, authorId, bookId } = req.body;
      
      const bookAuthor = await BookAuthor.update({
        authorId: authorId || null,
        bookId: bookId || null,
      }, {where:{id}});
      res.status(200).json(bookAuthor);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteBookAuthor(req, res) {
    
    try {
      const { id } = req.params;
      const bookAuthors = await BookAuthor.destroy({ where:{id}});
      console.log(bookAuthors);
      res.status(200).json({message: 'Книга была удалена из книг автора'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new BookAuthorController();