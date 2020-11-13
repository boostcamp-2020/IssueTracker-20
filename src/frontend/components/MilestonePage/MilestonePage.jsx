import React, {
  useEffect, useState,
} from 'react';
import styled from 'styled-components';
import LabelIcon from '@Images/label.svg';
import MilestoneIcon from '@Images/milestone.svg';
import Button from '@Common/Button';
import Milestone from '@Components/Milestone';
import useFetch from '@Util/useFetch';
import LinkButton from '@Components/Common/LinkButton';
import { useHistory } from 'react-router';

const getMilestoneList = (milestones) => (
  milestones.map((milestone) => (
  <Milestone key={milestone.id} data={milestone}></Milestone>)));

const getOpened = (milestones) => milestones.reduce((pre, curr) => (curr.isOpened ? pre + 1 : pre), 0);

const getClosed = (milestones) => milestones.reduce((pre, curr) => (curr.isOpened ? pre : pre + 1), 0);

const MilestonePage = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [opened, setOpened] = useState(0);
  const [closed, setClosed] = useState(0);

  const history = useHistory();

  const moveToMilestoneTemplate = () => {
    history.push('/milestones/template');
  };

  useEffect(async () => {
    if (!loading) {
      const result = await useFetch('/api/milestones', 'GET');
      const milestoneList = getMilestoneList(result.milestones);
      const openedCount = getOpened(result.milestones);
      const closedCount = getClosed(result.milestones);
      setOpened(openedCount);
      setClosed(closedCount);
      setList(milestoneList);
      setLoading(true);
    }
  }, [list]);

  return (
      <Main>
          <Content>
          <FlexRowBar>
            <MenuBox>
              <LinkButton
                SvgIcon={LabelIcon}
                title={'Labels'}
                isLeftRounded={true}
                link={'/labels'}
              />
              <LinkButton
                SvgIcon={MilestoneIcon}
                title={'Milestones'}
                isLeftRounded={false}
                link={'/milestones'}
                active
              />
            </MenuBox>
            <Button
            type="confirm"
            text="New Milestone"
            onClick={moveToMilestoneTemplate}
            />
            </FlexRowBar>
            <FlexBoxContainer>
          <FlexColumnBar>
            <MenuBar>
                <MenuBox>
                  <OpenStatusButton><MilestoneIcon></MilestoneIcon> {opened} Opened</OpenStatusButton>
                  <OpenStatusButton> {closed} Closed</OpenStatusButton>
                </MenuBox>
            </MenuBar>
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

const MenuBox = styled.div`
  ${FlexRowBox}
  position: relative;
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

const MenuBar = styled.div`
  ${FlexRowBox}
  justify-content: space-between;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.menuBarBgColor};
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
`;

const OpenStatusButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color : transparent;
  width: 6rem;
  height: 2rem;
`;

export default MilestonePage;
