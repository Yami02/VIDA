import https from 'https';

const ids = ['ZWvIhdjMbGI', 'R4yP0Tf6Dp8', 'NkBm82Q6Ur0', 'KlKftUZwWus', 'TZ0yi4uFh5U'];
function fetchTitle(id) {
  return new Promise(resolve => {
    https.get(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`, res => {
      let d='';
      res.on('data', c => d+=c);
      res.on('end', () => {
        try {
          resolve({id, ...JSON.parse(d)});
        } catch { resolve({id}); }
      })
    })
  });
}
Promise.all(ids.map(fetchTitle)).then(r => console.log(JSON.stringify(r, null, 2)));
