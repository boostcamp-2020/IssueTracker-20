const authorConfig = (filterDispatch) => ({
  name: 'Author',
  dropDownValues:
    {
      filterDispatch,
      fetchLink: 'assignees',
      filter: 'author',
      name: 'Author',
      isTitleBold: true,
    },
});

const assigneeConfig = (filterDispatch) => ({
  name: 'Assignee',
  dropDownValues:
    {
      filterDispatch,
      fetchLink: 'assignees',
      filter: 'assignees',
      name: 'Assignee',
      isTitleBold: true,
    },
});

const labelsConfig = (filterDispatch) => ({
  name: 'Label',
  dropDownValues:
    {
      filterDispatch,
      fetchLink: 'labels',
      filter: 'labels',
      name: 'Label',
      isTitleBold: true,
    },
});

const milestoneConfig = (filterDispatch) => ({
  name: 'Milestone',
  dropDownValues:
    {
      filterDispatch,
      fetchLink: 'milestones',
      filter: 'milestone',
      name: 'Milestone',
      isTitleBold: true,
    },
});

export default (filterDispatch) => [
  authorConfig(filterDispatch),
  assigneeConfig(filterDispatch),
  labelsConfig(filterDispatch),
  milestoneConfig(filterDispatch),
];
