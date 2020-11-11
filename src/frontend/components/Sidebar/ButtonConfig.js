export const assigneeConfig = (dispatch) => ({
  name: 'Assignee',
  dropDownValues:
    {
      dispatch,
      fetchLink: 'assignees',
      filter: 'assignees',
      name: 'Assignee',
      isTitleBold: true,
    },
});

export const labelsConfig = (dispatch) => ({
  name: 'Label',
  dropDownValues:
    {
      dispatch,
      fetchLink: 'labels',
      filter: 'labels',
      name: 'Label',
      isTitleBold: true,
    },
});

export const milestoneConfig = (dispatch) => ({
  name: 'Milestone',
  dropDownValues:
    {
      dispatch,
      fetchLink: 'milestones',
      filter: 'milestone',
      name: 'Milestone',
      isTitleBold: true,
    },
});

export default {
  assigneeConfig,
  labelsConfig,
  milestoneConfig,
};
