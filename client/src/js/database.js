import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists!');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created!');
    },
  });

export const putDb = async (content) => {
  try {
  const db = await openDB('jate', 1);
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  await store.add({ content: content });
  await transaction.done;
  console.log("Content added to database!!")
} catch (error) {
  console.error('Error adding to database', error);
}
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);
    const transaction = db.transaction('jate', 'readonly');
    const store = transaction.objectStore('jate');
    const content = await store.getAll();
    await transaction.done;
    console.log("Content recovered from database!!");
    return content;
  } catch (error) {
    console.error('Error retrieving from database:', error);
  }
};


initdb();
