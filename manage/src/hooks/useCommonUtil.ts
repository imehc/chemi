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

  return {
    formatPhone,
    getType,
    formatNumber,
    checkPassword,
  };
};
