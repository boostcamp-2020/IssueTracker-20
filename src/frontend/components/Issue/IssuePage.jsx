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
  justify-content: space-between;
`;

const FlexColumnBar = styled.div`
  ${FlexColumnBox}
  height: 30px;
`;

const FilterButton = styled.button`
  width: 5rem;
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
  width: 20rem;
  border: 1px solid ${(props) => (props.theme.inputBorderColor)};
  background-color: ${(props) => (props.theme.inputBgColor)};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-left: 0.5rem;
  margin-left: -1px;

  &:focus {
    background-color: ${(props) => (props.theme.whiteColor)};
    border: 1px solid ${(props) => (props.theme.inputBorderActiveColor)};
    box-shadow:  0 0 0 3px ${(props) => (props.theme.inputShadowColor)};
    z-index: 1;
  }
`;

const LabelsButton = styled.button`
  width: 8rem;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  background-color: ${(props) => (props.theme.whiteButtonColor)};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  &:hover {
    background-color: ${(props) => (props.theme.whiteButtonHoverColor)};
  }
`;

const MilestonesButton = styled.button`
  width: 8rem;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  background-color: ${(props) => (props.theme.whiteColor)};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  margin-left: -1px;
  &:hover {
    background-color: ${(props) => (props.theme.whiteButtonHoverColor)};
  }
`;

const CreateIssueButton = styled(Button)`
  width: 10rem;
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

const MenuBox = styled.div`
  ${FlexRowBox}
`;

const Issue = () => (
  <IssuePage>
    <Topbar>ISSUE CRACKER</Topbar>
    <Content>
      <FlexRowBar>
        <MenuBox>
          <FilterButton>Filters</FilterButton>
          <FilterInputBox placeholder='필터를 입력해주세요'></FilterInputBox>
        </MenuBox>
        <MenuBox>
          <LabelsButton>Labels</LabelsButton>
          <MilestonesButton>Milestones</MilestonesButton>
        </MenuBox>
        <CreateIssueButton type="confirm" text="New Issue"></CreateIssueButton>
      </FlexRowBar>
      <FlexColumnBar>
        <SortMenuBar>
          <input type='checkbox'></input>
          <MenuBox>
            <SortMenuButton>Author</SortMenuButton>
            <SortMenuButton>Label</SortMenuButton>
            <SortMenuButton>Projects</SortMenuButton>
            <SortMenuButton>Milestones</SortMenuButton>
            <SortMenuButton>Assignee</SortMenuButton>
            <SortMenuButton>Sort</SortMenuButton>
          </MenuBox>
        </SortMenuBar>
      </FlexColumnBar>
    </Content>
  </IssuePage>
);

export default Issue;
