localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'kaka',
  storeName: 'keyvalue'
});

async function saveString(key, value){
  await localforage.setItem(key, value);
}

async function getString(key){
  var result = await localforage.getItem(key);
  return result;
}

async function clearStorage() {
  await localforage.clear();
}
