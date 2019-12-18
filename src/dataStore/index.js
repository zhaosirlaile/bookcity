import AsyncStorage from '@react-native-community/async-storage';
import {GLOBEL_NOVEL_CHAPTER_URL} from '../util/utilParams';

export const fetchLocalData = url => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(url, (error, result) => {
      if (result === null) {
        reject(error);
      } else {
        try {
          resolve(JSON.parse(result));
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};

export const fetchNetData = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(responseData => {
        saveDate(url, responseData.data);
        resolve(responseData.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const saveDate = (url, data, callback) => {
  if (!data || !url) {
    return;
  }
  AsyncStorage.setItem(url, JSON.stringify(data), callback);
};

export const fetchData = url => {
  return new Promise((resolve, reject) => {
    fetchLocalData(url)
      .then(data => {
        if (data === null) {
          reject(data);
        }
        resolve(data);
      })
      .catch(error => {
        fetchNetData(url)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

export const fetchCatalogList = (url, details) => {
  return new Promise((resolve, reject) => {
    fetchLocalData(url)
      .then(data => {
        if (data === null) {
          reject(data);
        }
        resolve(data);
      })
      .catch(error => {
        fetchNetCatlogListData(url, details)
          .then(data => {
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

const fetchNetCatlogListData = (url, details) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(responseData => {
        const {data} = responseData,
          {vs} = data,
          vsArr = [];
        vs.forEach(item => {
          if (item.vN !== '作品相关') {
            vsArr.push(...item.cs);
          }
        });
        data.vs = vsArr;
        const oneNovel = {
          catalog: data,
          details: details,
          currentChapter: data.vs[0],
        };
        saveDate(url, oneNovel);
        resolve(oneNovel);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fetchChapter = url => {
  return new Promise((resolve, reject) => {
    fetchLocalData(url)
      .then(data => {
        if (data === null) {
          reject(data);
        }
        resolve(data);
      })
      .catch(error => {
        fetchNetChapterData(url)
          .then(data => {
            resolve({
              data: data,
              download: true,
            });
          })
          .catch(error => {
            reject(error);
          });
      });
  });
};

const fetchNetChapterData = url => {
  return new Promise((resolve, reject) => {
    fetch(`${GLOBEL_NOVEL_CHAPTER_URL}${url}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(responseData => {
        saveDate(url, responseData.data);
        resolve(responseData.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const fetchNetDataNoSave = url => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
