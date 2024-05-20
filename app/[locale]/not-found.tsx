import {useTranslations} from 'next-intl';
 
export default function NotFoundPage() {
  const t = useTranslations('Basic');
  return <div>{t('notFound')}</div>;
}