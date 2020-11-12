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
  try {
    if (value.length !== 0 && noCheck(value[value.length - 1])) {
      return { find: true, res: [] };
    }
    return { find: false, res: [...value.filter((el) => !noCheck(el))] };
  } catch (err) {
    console.log('err', err);
    return '';
  }
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
        const newNo = [];
        let checked = false;
        state.no.forEach((el) => {
          if (el !== action.filter) {
            newNo.push(el);
          } else {
            checked = true;
          }
        });
        const ret = {
          is: [...state.is],
          author: action.filter === 'author' ? actionValue.res : [...state.author],
          assignees: action.filter === 'assignees' ? actionValue.res : [...state.assignees],
          labels: action.filter === 'labels' ? actionValue.res : [...state.labels],
          milestone: action.filter === 'milestone' ? actionValue.res : [...state.milestone],
          no: checked ? newNo : [...newNo, action.filter],
        };
        setLoading(true);
        return ret;
      }
      const newNo = [];
      state.no.forEach((el) => {
        if (el !== action.filter) {
          newNo.push(el);
        }
      });
      const newState = {
        is: [...state.is],
        author: action.filter === 'author' ? actionValue.res : [...state.author],
        assignees: action.filter === 'assignees' ? actionValue.res : [...state.assignees],
        labels: action.filter === 'labels' ? actionValue.res : [...state.labels],
        milestone: action.filter === 'milestone' ? actionValue.res : [...state.milestone],
        no: newNo,
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
