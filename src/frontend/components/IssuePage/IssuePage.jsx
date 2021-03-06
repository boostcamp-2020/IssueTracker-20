import React, { useEffect, useState, useReducer } from 'react';
import styled from 'styled-components';

import useFetch from '@Util/useFetch';
import makeFilterQueryString from '@Util/makeFilterQueryString';

import Issue from '@Components/Issue';
import Button from '@Common/Button';
import FilterButton from '@Components/IssuePage/FilterButton';
import LinkButton from '@Common/LinkButton';
import ContentFilter from '@Components/IssuePage/ContentFilter';
import MarkAsButton from '@Components/IssuePage/MarkAsButton';
import ClearFilterBtn from '@Components/IssuePage/ClearFilterButton';
import filterButtonConfig from '@Components/IssuePage/filterButtonConfig';

import labelIcon from '@Images/label.svg';
import milestoneIcon from '@Images/milestone.svg';
import FilterInputBox from '@Components/IssuePage/FilterInputBox';
import { useHistory } from 'react-router';

import { filterReducer, filterInitState } from '@Reducer/issueReducer';

const getIssueList = (issues, checkbox, setCheckbox) => issues.map((issue) => (
    <Issue key={issue.id} data={issue} checked={checkbox} on={setCheckbox} />
));

const checkFilterIsInit = (filter) => {
  if (filter.is.length > 0
    && filter.is[0] === 'open'
    && filter.author.length === 0
    && filter.assignees.length === 0
    && filter.labels.length === 0
    && filter.milestone.length === 0
    && filter.no.length === 0
  ) {
    return true;
  }
  return false;
};

const IssuePage = () => {
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [labelCount, setLabelCount] = useState(0);
  const [milestoneCount, setMilestoneCount] = useState(0);
  const [checkbox, setCheckbox] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, filterDispatch] = useReducer(filterReducer(setLoading), filterInitState);
  const [isFilterInit, setIsFilterInit] = useState(true);
  const history = useHistory();
  const onClickCreateIssue = () => {
    history.push('issue/template');
  };

  const menuList = filterButtonConfig(filterDispatch).map((el, index) => <ContentFilter key={index} name={el.name} dropDownValues={el.dropDownValues}/>);

  const checkHandler = (e, id) => {
    if (e.target.checked) {
      setCheckbox([...checkbox, id]);
    } else {
      setCheckbox(checkbox.filter((o) => o !== id));
    }
  };
  const checkAllHandler = (e) => {
    if (e.target.checked) {
      const ids = [];
      list.forEach((issue) => ids.push(issue.props.data.id));
      setCheckbox(ids);
    } else {
      setCheckbox([]);
    }
  };

  useEffect(async () => {
    if (loading || list.length === 0) {
      const result = await useFetch(`/api/issues?${makeFilterQueryString(filter)}`, 'GET');
      const issueList = getIssueList(result.issues, checkbox, checkHandler);
      setData(result.issues);
      setList(issueList);
      setLabelCount(result.labelCount);
      setMilestoneCount(result.milestoneCount);
      setLoading(false);
    } else {
      const issueList = getIssueList(data, checkbox, checkHandler);
      setList(issueList);
    }
    setIsFilterInit(checkFilterIsInit(filter));
  }, [filter, checkbox]);

  return (
    <Main>
      <Content>
        <FlexRowBar>
          <MenuBox>
            <FilterButton filterDispatch={filterDispatch}></FilterButton>
            <FilterInputBox placeholder='필터를 입력해주세요' filter={filter} filterDispatch={filterDispatch}></FilterInputBox>
          </MenuBox>
          <MenuBox>
            <LinkButton
              SvgIcon={labelIcon}
              title={'Labels'}
              count={labelCount}
              isLeftRounded={true}
              link={'/labels'}
            />
            <LinkButton
              SvgIcon={milestoneIcon}
              title={'Milestones'}
              count={milestoneCount}
              isLeftRounded={false}
              link={'/milestones'}
            />
          </MenuBox>

          <Button
            type="confirm"
            text="New Issue"
            onClick={onClickCreateIssue}
          />
        </FlexRowBar>
        {!isFilterInit && <ClearFilterBtn filterDispatch={filterDispatch} />}
        <FlexBoxContainer>
          <FlexColumnBar>
            <SortMenuBar>
              <Custom>
                <input type="checkbox" onChange={checkAllHandler} />
                {checkbox.length > 0 && `  ${checkbox.length} selected`}
              </Custom>
              {checkbox.length > 0 ? (
                <MarkAsButton checkboxList={checkbox} on={setCheckbox} setLoading={setLoading} />
              ) : (
                <MenuBox>
                  {menuList}
                </MenuBox>
              )}
            </SortMenuBar>
            {list}
          </FlexColumnBar>
        </FlexBoxContainer>
      </Content>
    </Main>
  );
};

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const Main = styled.div`
  ${FlexColumnBox}
  height: 100%;
  align-items: center;
  padding: 3rem 0;
`;

const Content = styled.div`
  ${FlexColumnBox}
  width: 1200px;
  height: 100%;
`;

const FlexRowBar = styled.div`
  ${FlexRowBox}
  width: 100%;
  height: 2rem;
  justify-content: space-between;
`;

const FlexBoxContainer = styled.div`
  padding: 1.2rem 0;
`;
const FlexColumnBar = styled.div`
  ${FlexColumnBox}
  border: 1px solid ${(props) => props.theme.menuBarBorderColor};
  border-radius: 6px;
`;

const SortMenuBar = styled.div`
  ${FlexRowBox}
  justify-content: space-between;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.menuBarBgColor};
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
`;

const MenuBox = styled.div`
  ${FlexRowBox}
  position: relative;
`;

const Custom = styled.div`
  font-size: 14px;
  color: ${(prop) => prop.theme.subTextColor};
`;

export default IssuePage;
