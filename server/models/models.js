import Sequelize from 'sequelize';
import { connection } from '../config/config.js'; 

export const sequelize = new Sequelize(connection);

export const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birthday: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

export const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: true
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  intro: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  },
  rating: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
});

export const Rating = sequelize.define('rating', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  rate: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export const Review = sequelize.define('review', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  textOfReview: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

export const Category = sequelize.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nameOfCategory: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

export const FavoriteBook = sequelize.define('favorite_book', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

User.hasMany(FavoriteBook);
FavoriteBook.belongsTo(User);

Book.hasMany(FavoriteBook);
FavoriteBook.belongsTo(Book);

User.hasMany(Rating);
Rating.belongsTo(User);

Book.hasMany(Rating);
Rating.belongsTo(Book);

Book.hasMany(Review);
Review.belongsTo(Book);

User.hasMany(Review);
Review.belongsTo(User);

Category.hasMany(Book);
Book.belongsTo(Category);
