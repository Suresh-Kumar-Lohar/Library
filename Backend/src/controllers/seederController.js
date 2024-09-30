import BookModel from "../models/bookModel.js";

class SeederController {
  async addBooks(req, res) {
    try {
      const seedBooks = [
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stockCount: 10 },
        { title: '1984', author: 'George Orwell', stockCount: 8 },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', stockCount: 12 },
        { title: 'Moby-Dick', author: 'Herman Melville', stockCount: 7 },
        { title: 'War and Peace', author: 'Leo Tolstoy', stockCount: 5 },
        { title: 'Pride and Prejudice', author: 'Jane Austen', stockCount: 15 },
        { title: 'The Catcher in the Rye', author: 'J.D. Salinger', stockCount: 11 },
        { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', stockCount: 6 },
        { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', stockCount: 20 },
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', stockCount: 14 },
        { title: 'Brave New World', author: 'Aldous Huxley', stockCount: 9 },
        { title: 'The Odyssey', author: 'Homer', stockCount: 8 },
        { title: 'The Iliad', author: 'Homer', stockCount: 6 },
        { title: 'Frankenstein', author: 'Mary Shelley', stockCount: 10 },
        { title: 'Dracula', author: 'Bram Stoker', stockCount: 4 },
        { title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', stockCount: 5 },
        { title: 'The Divine Comedy', author: 'Dante Alighieri', stockCount: 7 },
        { title: 'Anna Karenina', author: 'Leo Tolstoy', stockCount: 3 },
        { title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', stockCount: 6 },
        { title: 'The Metamorphosis', author: 'Franz Kafka', stockCount: 9 },
        { title: 'Wuthering Heights', author: 'Emily Brontë', stockCount: 11 },
        { title: 'The Scarlet Letter', author: 'Nathaniel Hawthorne', stockCount: 13 },
        { title: 'Don Quixote', author: 'Miguel de Cervantes', stockCount: 10 },
        { title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', stockCount: 12 },
        { title: 'Ulysses', author: 'James Joyce', stockCount: 7 },
        { title: 'The Sound and the Fury', author: 'William Faulkner', stockCount: 8 },
        { title: 'The Old Man and the Sea', author: 'Ernest Hemingway', stockCount: 14 },
        { title: 'Catch-22', author: 'Joseph Heller', stockCount: 11 },
        { title: 'Lolita', author: 'Vladimir Nabokov', stockCount: 9 },
        { title: 'The Grapes of Wrath', author: 'John Steinbeck', stockCount: 10 }
      ];

      await BookModel.createBooks(seedBooks);
      res.handler.success("Books data has been created successfully.");
    } catch (error) {
      return res.handler.serverError(error);
    }
  }
}

const seederController = new SeederController();
export default seederController;