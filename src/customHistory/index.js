import { createBrowserHistory } from 'history';
const customHistory = createBrowserHistory();
export default customHistory;

export const goBack = () => {
  customHistory.goBack();
};

export const goTo = (path) => {
  customHistory.push(path);
}
