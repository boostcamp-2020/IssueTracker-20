import React from 'react';
import styled from 'styled-components';

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const IssuePage = styled.div`
  ${FlexColumnBox}
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Topbar = styled.div`
  ${FlexRowBox}
  width: 100%;
  height: 50px;
  background-color: #24292e;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Content = styled.div`
  ${FlexColumnBox}
  width: 800px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const FlexRowBar = styled.div`
  ${FlexRowBox}
  width: 100%;
  height: 30px;
`;

const FlexColumnBar = styled.div`
  ${FlexColumnBox}
  height: 30px;
`;

const FilterButton = styled.button`
  width: 10%;
`;

const FilterInputBox = styled.input`
  width: 40%;
  margin-right: 1em;
`;

const LabelsButton = styled.button`
  width: 20%;
`;

const MilestonesButton = styled.button`
  width: 20%;
`;

const CreateIssueButton = styled.button`
  margin-left: 1em;
  width: 10%;
`;

const SortMenuBar = styled.div`
  ${FlexRowBox}
  margin-top: 1em;
  background-color #f6f8fa;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
`;

const SortMenuButton = styled.button`
  height: 1.5em;
  border:none;
  cursor: pointer;
  background-color: transparent;
`;

const Issue = () => (
  <IssuePage>
    <Topbar>ISSUE CRACKER</Topbar>
    <Content>
      <FlexRowBar>
        <FilterButton>Filters</FilterButton>
        <FilterInputBox placeholder='필터를 입력해주세요'></FilterInputBox>
        <LabelsButton>Labels</LabelsButton>
        <MilestonesButton>Milestones</MilestonesButton>
        <CreateIssueButton>new Issue</CreateIssueButton>
      </FlexRowBar>
      <FlexColumnBar>
        <SortMenuBar>
          <input type='checkbox'></input>
          <SortMenuButton>Author</SortMenuButton>
          <SortMenuButton>Label</SortMenuButton>
          <SortMenuButton>Projects</SortMenuButton>
          <SortMenuButton>Milestones</SortMenuButton>
          <SortMenuButton>Assignee</SortMenuButton>
          <SortMenuButton>Sort</SortMenuButton>
        </SortMenuBar>
      </FlexColumnBar>
    </Content>
  </IssuePage>
);

export default Issue;
