import { Book, FavoriteBook as Favorite, User } from '../model/models.js';

class FavoriteController {
  async create(req, res) {
    try {
      const { userId, bookId} = req.body;
      const candidate = await Favorite.findAll({where:{userId}, attributes: ['bookId']});
     
      if (candidate.map(item => item.bookId).includes(bookId)) return res.status(200).json('Книга уже содержится в избранном');
      await Favorite.create({
        userId: userId || null,
        bookId: bookId || null,
      });
      res.status(200).json('Книга успешно добавлена в избранное');
    }
    catch(e) {
      console.log(e);
    }
  }

  async getId(req, res) {
    try {
      const { userId, bookId } = req.body;
      const id = await Favorite.findOne({where:{userId, bookId}, attributes: ['id']});    
      res.status(200).json(id);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getFavoriteByBookId(req, res) {
    try {
      const { id } = req.params;
      const favorites = await Favorite.findAll({ include: [
        {model: Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id'],
      where:{bookId: id}});
      console.log(favorites);
      res.status(200).json(favorites);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getFavoriteByUserId(req, res) {
    try {
      const { id } = req.params;
      const favorites = await Favorite.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author', 'price']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id'],
      where:{userId: id}});
      console.log(favorites);
      res.status(200).json(favorites);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getAllFavorites(req, res) {
    try {
      const favorites = await Favorite.findAll({ include: [
        {model:Book, attributes: ['id', 'title', 'author']},
        {model: User, attributes: ['id', 'fullName', 'email'] }],
      attributes: ['id']});
      res.status(200).json(favorites);
    }
    catch(e) {
      console.log(e);
    }
  }

  async updateFavorite(req, res) {
    try {
      const { id, userId, bookId } = req.body;
      
      const favorite = await Favorite.update({
        userId: userId || null,
        bookId: bookId || null,
      }, {where:{id}});
      res.status(200).json(favorite);
    }
    catch(e) {
      console.log(e);
      res.status(400).json({message: 'Что-то пошло не так'});
    }
  }

  async deleteFavorite(req, res) {
    
    try {
      const { id } = req.params;
      const favorites = await Favorite.destroy({ where:{id}});
      console.log(favorites);
      res.status(200).json({message: 'Книга была удалена из избранного'});
    }
    catch(e) {
      console.log(e);
    }
  }

}

export default new FavoriteController();