localforage.config({
  driver    : localforage.INDEXEDDB,  // poprawnienie
  name      : 'kaka',
  storeName : 'keyvalue'
});

async function saveString(key, value) {
  return localforage.setItem(key, value);
}

async function getString(key) {
  return localforage.getItem(key);
}

async function saveBlob(key, blob) {
  return localforage.setItem(key, blob);
}

async function loadBlob(key) {
  return localforage.getItem(key);
}

async function clearStorage() {
  return localforage.clear();
}
