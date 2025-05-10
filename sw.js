if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/dada/sw.js')
  .then(() => console.log('SW registered'))
  .catch(err => console.error('SW error: ', err));
}
