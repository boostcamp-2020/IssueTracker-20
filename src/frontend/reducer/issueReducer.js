export const titleReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.title;
    }
    case 'TOGGLE': {
      if (action.property === 'labels' || action.property === 'assignees') {
        const index = state.indexOf(action.title);
        if (index === -1) {
          const newState = [...state, action.title];
          return newState;
        }
        state.splice(index, 1);
        const newState = [...state];
        return newState;
      }
      const newState = [action.title];
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
