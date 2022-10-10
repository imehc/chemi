import {
  addDays,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useTranslation } from 'react-i18next';

type Lng = 'en' | 'zh_CN';
type Lngs = {
  [key in Lng]: {
    nativeName: string;
  };
};

const lngs: Lngs = {
  en: { nativeName: 'English' },
  zh_CN: { nativeName: '简体中文' },
};

export const LanguageDemo: React.FC = () => {
  // 根据当前语言环境获取i18n读取数据
  const { t, i18n } = useTranslation();

  // https://blog.csdn.net/fsxxzq521/article/details/85715213
  const nowTime = new Date();
  const nowStartTime = startOfDay(new Date());
  const weekTime = addDays(startOfWeek(new Date()), 1);
  const monthTime = startOfMonth(new Date());
  const formatTime = (time: Date | number) =>
    format(time, 'yyyy-MM-dd HH:mm:ss');
  console.log('当前时间：', formatTime(nowTime));
  console.log('当前时间起始时间：', formatTime(nowStartTime));
  console.log('本周第一天', formatTime(weekTime));
  console.log('本月第一天', formatTime(monthTime));
  console.log('本月', monthTime.toISOString());
  console.log('本月', monthTime.toUTCString());

  return (
    <div>
      <div>{t('用户操作.个人中心')}</div>
      <div>{t('用户操作.个人设置')}</div>
      <div>{t('用户操作.退出登录')}</div>
      <p>{t('时间', { time: format(new Date(), 'yyyy-MM-dd hh:mm:ss') })}</p>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal',
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng as Lng].nativeName}
        </button>
      ))}
    </div>
  );
};
