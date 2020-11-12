export const sidebarInitState = {
  assignees: [],
  labels: [],
  milestone: [],
};

export const sidebarReducer = (state, action) => {
  switch (action.type) {
    case 'REPLACE': {
      const newState = {
        assignees: action.filter === 'assignees' ? [...action.value] : [...state.assignees],
        labels: action.filter === 'labels' ? [...action.value] : [...state.labels],
        milestone: action.filter === 'milestone' ? [...action.value] : [...state.milestone],
      };
      return newState;
    }
    default: {
      console.error('잘못된 타입입니다.');
      return { error: '잘못된 타입 에러' };
    }
  }
};
