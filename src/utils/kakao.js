import request from 'request';

const API_QUOTA = 100000;


function updateKey(keyInfo) {
  const now = new Date();
  const nowDate = now.toLocaleString('ko-kr', { year: '2-digit', month: '2-digit', day: '2-digit' });
  const lastUpdatedDate = keyInfo.updated.toLocaleString('ko-kr', { year: '2-digit', month: '2-digit', day: '2-digit' });
  if (nowDate != lastUpdatedDate) {
    keyInfo.count = 0;
    keyInfo.available = true;
  }
  if (keyInfo.count >= API_QUOTA) {
    keyInfo.available = false;
    return;
  }
  if (!keyInfo.available) {
    return;
  }
  keyInfo.updated = now;
}


class Kakao {
  keyInfos = [
    { key: 'key1', updated: new Date(), count: 0, available: true,  owner: '이범준' },
    { key: 'key2', updated: new Date(), count: 0, available: true,  owner: '김윤우' },
    { key: 'key3', updated: new Date(), count: 0, available: true,  owner: '백경림' },
    { key: 'key4', updated: new Date(), count: 0, available: true,  owner: '임규' },
    { key: 'key5', updated: new Date(), count: 0, available: true,  owner: '강진석' },
  ];
  keyIndex = 0;

  constructor() {
    const keySet = new Set(this.keyInfos.map(k => k.key));
    if (this.keyInfos.length > keySet.size) {
      throw Error('duplicated kakao api keys');
    }
  }

  getNextKey() {
    for (var i = 0; i < this.keyInfos.length; i++) {
      this.keyIndex %= this.keyInfos.length;
      const keyInfo = this.keyInfos[this.keyIndex++];
      updateKey(keyInfo);
      if (keyInfo.available) {
        keyInfo.count++;
        return keyInfo;
      }
    }
    return null;
  }

  request(options, callback) {
    const keyInfo = this.getNextKey();
    if (!keyInfo) {
      throw Error('No available kakao api key');
    }

    options['header'] = {
      'Authorization': `KakaoAK ${keyInfo.key}`,
      ...options['header']
    };

    request(options, (err, res, body) => {
      if (body && body.code === -10) {
        keyInfo.available = false;
        delete options['header']['Authorization'];
        return this.request(options, callback);
      }
      callback(err, res, body);
    });
  }
}

const kakao = new Kakao();
export default kakao.request;
