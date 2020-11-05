import React from 'react';
import styled from 'styled-components';

import GearIcon from '@Images/GearIcon.svg';

const Sidebar = () => (
  <Wrapper>
    <AssigneeBox>
      <BoxHeader>
        <Title>Assignees</Title>
        <GearIcon />
      </BoxHeader>
      <BoxBody>No one-assign yourself</BoxBody>
    </AssigneeBox>
    <LabelBox>
      <BoxHeader>
        <Title>Labels</Title>
        <GearIcon />
      </BoxHeader>
      <BoxBody>None yet</BoxBody>
    </LabelBox>
    <MilestoneBox>
      <BoxHeader>
        <Title>Milestones</Title>
        <GearIcon />
      </BoxHeader>
      <BoxBody>No milestone</BoxBody>
    </MilestoneBox>
  </Wrapper>
);

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

const BoxHeader = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  font-weight: bold;
  font-size: 14px;
  color: gray;
  padding: 0.5rem 0;

  &:hover {
    color: #11aaff;
  }
`;

const Title = styled.div``;

const BoxBody = styled.div`
  font-size: 13px;
  color: gray;
  padding: 0.5rem 0;
`;

export default Sidebar;
