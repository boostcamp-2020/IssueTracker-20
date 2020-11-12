export const filterInitState = {
  is: ['open'],
  author: [],
  assignees: [],
  labels: [],
  milestone: [],
  no: [],
};

export const titleReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.title;
    }
    case 'TOGGLE': {
      const index = state.indexOf(action.title);
      if (action.property === 'labels' || action.property === 'assignees') {
        if (index === -1) {
          const newState = [...state, action.title];
          return newState;
        }
        state.splice(index, 1);
        const newState = [...state];
        return newState;
      }
      if (index === -1) {
        const newState = [action.title];
        return newState;
      }
      const newState = [];
      return newState;
    }
    case 'NO': {
      const newState = [`!no${action.property}`];
      return newState;
    }

    default:
      return 'error';
  }
};

const noCheck = (str) => {
  if (str.slice(0, 3) === '!no') {
    return true;
  }
  return false;
};

const returnActionValue = (value) => {
  if (value.some(noCheck)) {
    return { find: true, res: [] };
  }
  return { find: false, res: [...value] };
};

export const filterReducer = (setLoading) => (state, action) => {
  switch (action.type) {
    case 'SET': {
      setLoading(true);
      return action.values;
    }
    case 'REPLACE': {
      const actionValue = returnActionValue(action.value);
      if (actionValue.find) {
        const ret = {
          is: [...state.is],
          author: action.filter === 'author' ? actionValue.res : [...state.author],
          assignees: action.filter === 'assignees' ? actionValue.res : [...state.assignees],
          labels: action.filter === 'labels' ? actionValue.res : [...state.labels],
          milestone: action.filter === 'milestone' ? actionValue.res : [...state.milestone],
          no: [...state.no, action.filter],
        };
        setLoading(true);
        return ret;
      }
      const newState = {
        is: [...state.is],
        author: action.filter === 'author' ? actionValue : [...state.author],
        assignees: action.filter === 'assignees' ? actionValue : [...state.assignees],
        labels: action.filter === 'labels' ? actionValue : [...state.labels],
        milestone: action.filter === 'milestone' ? actionValue : [...state.milestone],
        no: [...state.no],
      };
      setLoading(true);
      return newState;
    }
    default: {
      console.error('잘못된 타입입니다.');
      return { error: '잘못된 타입 에러' };
    }
  }
};
