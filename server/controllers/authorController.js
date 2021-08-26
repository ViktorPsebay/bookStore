import { Author } from '../model/models.js';

class AuthorController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const candidate = await Author.findOne({where: {name}});
      if (candidate) {
        return res.status(400).json({message: 'Такой автор уже существует'});
      }

      const author = await Author.create({name});
      res.status(200).json(author);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getOneAuthor(req, res) {
    try {
      const { id } = req.params;
      const author = await Author.findOne( {where:{id},
        attributes: ['id', 'name'] });
      console.log(author);
      res.status(200).json(author);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllAuthors(req, res) {
    try {
      const authors = await Author.findAll({ attributes: ['id', 'name'] });
      res.status(200).json(authors);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id, name } = req.body;
      
      const author = await Author.update({name}, {where:{id}});
      res.status(200).json(author);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteAuthor(req, res) {
    
    try {
      const { id } = req.params;
      const authors = await Author.destroy({ where:{id}});
      console.log(authors);
      res.status(200).json({message: 'Автор был удален'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new AuthorController();