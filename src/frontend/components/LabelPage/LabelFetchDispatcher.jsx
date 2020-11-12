import { createContext, useContext } from 'react';

const LabelFetchDispatcher = createContext();

export const useLabelFetchDispatcher = () => useContext(LabelFetchDispatcher);
export default LabelFetchDispatcher;
