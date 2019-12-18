import AsyncStorage from '@react-native-community/async-storage';

/**
 * 获取
 * @param key
 * @returns {Promise<T>|*|Promise.<TResult>}
 */
export const getBykey = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    return undefined;
  }
};

/**
 * 保存
 * @param key
 * @param value
 * @returns {*}
 */
export const saveBykey = (key, value) => {
  return AsyncStorage.setItem(key, JSON.stringify(value));
};

/**
 * 更新
 * @param key
 * @param value
 * @returns {Promise<T>|Promise.<TResult>}
 */
export const updateBykey = (key, value) => {
  return getBykey(key).then(item => {
    console.log(item);
    // return AsyncStorage.setItem(key, JSON.stringify(value));
  });
};

/**
 * 删除
 * @param key
 * @returns {*}
 */
export const deleteBykey = key => {
  return AsyncStorage.removeItem(key);
};

/**
 * 清空
 */
export const clear = () => {
  AsyncStorage.clear();
};
