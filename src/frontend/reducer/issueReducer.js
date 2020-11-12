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

export const filterReducer = (setLoading) => (state, action) => {
  switch (action.type) {
    case 'SET': {
      setLoading(true);
      return action.values;
    }
    case 'REPLACE': {
      const newState = {
        is: [...state.is],
        author: action.filter === 'author' ? [...action.value] : [...state.author],
        assignees: action.filter === 'assignees' ? [...action.value] : [...state.assignees],
        labels: action.filter === 'labels' ? [...action.value] : [...state.labels],
        milestone: action.filter === 'milestone' ? [...action.value] : [...state.milestone],
        no: [...state.no],
      };
      setLoading(true);
      return newState;
    }
    case 'NO_REPLACE': {
      const newState = {
        is: [...state.is],
        author: [...state.author],
        assignees: [...state.assignees],
        labels: [...state.labels],
        milestone: [...state.milestone],
        no: [...action.value],
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
