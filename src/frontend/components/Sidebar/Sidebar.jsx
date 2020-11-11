import React, { useReducer } from 'react';
import styled from 'styled-components';
import DropDownButton from '@Components/Sidebar/DropDownButton';
import { assigneeConfig, labelsConfig, milestoneConfig } from '@Components/Sidebar/ButtonConfig';

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      console.log('SET');
      return ['2'];
    }
    case 'REPLACE': {
      console.log('replace');
      return ['1'];
    }
    default: {
      console.error('잘못된 타입입니다.');
      return { error: '잘못된 타입 에러' };
    }
  }
};

const Sidebar = () => {
  console.log('assigneeConfig : ', assigneeConfig);
  const [assignee, assigneeDispatch] = useReducer(filterReducer, []);
  const [labels, labelsDispatch] = useReducer(filterReducer, []);
  const [milestone, milestoneDispatch] = useReducer(filterReducer, []);

  return (
  <Wrapper>
    <AssigneeBox>
      <DropDownButton name={'Assignees'} dropDownValues={assigneeConfig(assigneeDispatch).dropDownValues}/>
      <BoxBody>No one-assign yourself</BoxBody>
    </AssigneeBox>
    <LabelBox>
      <DropDownButton name={'Labels'} dropDownValues={labelsConfig(labelsDispatch).dropDownValues}/>
      <BoxBody>None yet</BoxBody>
    </LabelBox>
    <MilestoneBox>
      <DropDownButton name={'Milestones'} dropDownValues={milestoneConfig(milestoneDispatch).dropDownValues}/>
      <BoxBody>No milestone</BoxBody>
    </MilestoneBox>
  </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 260px;
  padding: 1rem 1.5rem;
`;

const AssigneeBox = styled.div`
  padding: 0.7rem 0;
  border-bottom: 1px solid #ddd;
`;

const LabelBox = styled.div`
  padding: 0.7rem 0;
  border-bottom: 1px solid #ddd;
`;

const MilestoneBox = styled.div`
  padding: 0.7rem 0;
  border-bottom: 1px solid #ddd;
`;

const BoxBody = styled.div`
  font-size: 13px;
  color: gray;
  padding: 0.5rem 0;
`;

export default Sidebar;
