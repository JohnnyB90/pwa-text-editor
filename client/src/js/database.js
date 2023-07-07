import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists!');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });

export const putDb = async (content) => {
  try {
  const db = await openDB('jate', 1);
  const transactions = db.transaction('jate', 'readwrite');
  const store = transactions.objectStore('jate');
  await store.put({ id: 1, value: content });
  await transactions.done;
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
    const content = await store.get(1);
    await transaction.done;
    console.log("Content recovered from database!!");
    return content;
  } catch (error) {
    console.error('Error retrieving from database:', error);
  }
};


initdb();
