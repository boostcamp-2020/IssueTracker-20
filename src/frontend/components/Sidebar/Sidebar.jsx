import React, { useReducer, useEffect } from 'react';
import styled from 'styled-components';
import DropDownButton from '@Components/Sidebar/DropDownButton';
import { assigneeConfig, labelsConfig, milestoneConfig } from '@Components/Sidebar/ButtonConfig';
import { sidebarInitState, sidebarReducer } from '@Reducer/sidebarReducer';

const Sidebar = () => {
  const [selectInfo, selectInfoDispatch] = useReducer(sidebarReducer, sidebarInitState);

  useEffect(() => {
    // console.log('select Info : ', selectInfo);
  }, [selectInfo]);
  return (
  <Wrapper>
    <AssigneeBox>
      <DropDownButton name={'Assignees'} dropDownValues={assigneeConfig(selectInfoDispatch).dropDownValues}/>
      <BoxBody>No one-assign yourself</BoxBody>
    </AssigneeBox>
    <LabelBox>
      <DropDownButton name={'Labels'} dropDownValues={labelsConfig(selectInfoDispatch).dropDownValues}/>
      <BoxBody>None yet</BoxBody>
    </LabelBox>
    <MilestoneBox>
      <DropDownButton name={'Milestones'} dropDownValues={milestoneConfig(selectInfoDispatch).dropDownValues}/>
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
