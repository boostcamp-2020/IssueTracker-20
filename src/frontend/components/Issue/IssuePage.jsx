import React from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';

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
  background-color: ${(props) => { return props.theme.headerColor }};
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
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: ${(props) => (props.theme.grayButtonColor)};

  &:hover {
    background-color: ${(props) => (props.theme.grayButtonHoverColor)};
    z-index: 1;
  }

  &:active {
    background-color: ${(props) => (props.theme.grayButtonFocusColor)};
    z-index: 1;
  }
`;

const FilterInputBox = styled.input`
  width: 43%;
  border: 1px solid ${(props) => (props.theme.inputBorderColor)};
  background-color: ${(props) => (props.theme.inputBgColor)};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-right: 1em;
  margin-left: -1px;
  padding-left: 1em;

  &:focus {
    background-color: ${(props) => (props.theme.whiteColor)};
    border: 1px solid ${(props) => (props.theme.inputBorderActiveColor)};
    box-shadow:  0 0 0 3px ${(props) => (props.theme.inputShadowColor)};
    z-index: 1;
  }
`;

const LabelsButton = styled.button`
  width: 15%;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  background-color: ${(props) => (props.theme.whiteButtonColor)};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  &:hover {
    background-color: ${(props) => (props.theme.whiteButtonHoverColor)};
  }
`;

const MilestonesButton = styled.button`
  width: 15%;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  background-color: ${(props) => (props.theme.whiteColor)};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-left: -1px;
  margin-right: 1em;

  &:hover {
    background-color: ${(props) => (props.theme.whiteButtonHoverColor)};
  }
`;

const CreateIssueButton = styled(Button)`
  margin-left: 1em;
  width: 20%;
`;

const SortMenuBar = styled.div`
  ${FlexRowBox}
  margin-top: 1em;
  background-color #f6f8fa;
  padding: 10px;
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
  height: 40px;
`;

const SortMenuButton = styled.button`
  height: 1.5em;
  border:none;
  cursor: pointer;
  background-color: transparent;
`;

const SortMenuBox = styled.div`
  ${FlexRowBox}
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
        <CreateIssueButton type="confirm" text="New Issue"></CreateIssueButton>
      </FlexRowBar>
      <FlexColumnBar>
        <SortMenuBar>
          <input type='checkbox'></input>
          <SortMenuBox>
            <SortMenuButton>Author</SortMenuButton>
            <SortMenuButton>Label</SortMenuButton>
            <SortMenuButton>Projects</SortMenuButton>
            <SortMenuButton>Milestones</SortMenuButton>
            <SortMenuButton>Assignee</SortMenuButton>
            <SortMenuButton>Sort</SortMenuButton>
          </SortMenuBox>
        </SortMenuBar>
      </FlexColumnBar>
    </Content>
  </IssuePage>
);

export default Issue;
