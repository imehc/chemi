export const useCommonUtil = () => {
  /**
   * JS将手机号格式化，中间部分以 * 号代替
   * @param phone
   * @returns {string | * | void}
   */
  const formatPhone = (phone: string): string | void => {
    if (!phone) {
      return;
    }
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  };

  /**
   * 判断数据类型
   * @param data
   * @returns {string}
   */
  const getType = (data: any): string => {
    return Object.prototype.toString.call(data).slice(8, -1);
  }
  /**
   * 数字每千分位加逗号
   * @param num
   * @returns {string}
   */
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  /**
   * 判断密码的强度
   * @param password
   * @returns {number}
   */
  const checkPassword = (password: string): number => {
    const strength = {
      0: '弱',
      1: '中',
      2: '强',
    };
    let score = 0;
    if (password.length < 6) {
      return score;
    }
    if (/[a-zA-Z]+/.test(password)) {
      score++;
    }
    if (/[0-9]+/.test(password)) {
      score++;
    }
    if (/[\W]+/.test(password)) {
      score++;
    }
    return score;
  }
  /**
   * 深拷贝
   * https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
   * 来源： https://www.jianshu.com/p/f4329eb1bace
   * @param object
   * @returns {Object}
   */
  const deepClone = (target: any): any => {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (let i in target) {
          // 递归克隆数组中的每一项
          result.push(deepClone(target[i]))
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null;
        // 判断如果当前的值是一个RegExp对象的话，直接赋值    
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {};
        for (let i in target) {
          (result as any)[i] = deepClone(target[i]);
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target;
    }
    // 返回最终结果
    return result;
  }

  return {
    formatPhone,
    getType,
    formatNumber,
    checkPassword,
    deepClone,
  };
};
