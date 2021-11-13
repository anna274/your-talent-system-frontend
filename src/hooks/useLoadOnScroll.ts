import { IRootState } from 'declarations/interfaces';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

const useLoadOnScroll = (
  loadSelector: (state: IRootState) => boolean,
  limitAchievedSelector: (state: IRootState) => boolean,
  loadData: (customPage?: number) => void,
  getPageDependencies: () => any[],
) => {
  const [page, setPage] = useState(1);
  const loading = useSelector(loadSelector);
  const limitAchieved = useSelector(limitAchievedSelector);
  const handleScroll = useCallback(() => {
    if (loading || limitAchieved) {
      return;
    }
    if (
      Math.abs(
        window.innerHeight +
          document.documentElement.scrollTop -
          document.documentElement.offsetHeight,
      ) > 2
    )
      return;
    setPage((page) => page + 1);
  }, [loading, limitAchieved]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // we have to load first page only when filters have been changed
  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    }
    loadData(1);
  }, getPageDependencies());

  // we have to load next pages only when page number has been changed
  useEffect(() => {
    page !== 1 && loadData();
  }, [page]);

  return [page];
};

export { useLoadOnScroll };
