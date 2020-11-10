import React from 'react';
import styled from 'styled-components';
import LabelIcon from '@Images/comment.svg';
import MilestoneIcon from '@Images/milestone.svg';
import Button from '@Common/Button';

const MilestonePage = () => {
  const value = 0;
  return (
      <Main>
          <Content>
          <FlexRowBar>
            <MenuBox>
              <LabelLinkButton><LabelIcon></LabelIcon>Label</LabelLinkButton>
              <MilestoneLinkButton><MilestoneIcon></MilestoneIcon>Milestone</MilestoneLinkButton>
             </MenuBox>
             <Button
              type="confirm"
              text="New Milestone"
              />
            </FlexRowBar>
            <FlexBoxContainer>
          <FlexColumnBar>
            <MenuBar>
                <MenuBox>
                  <OpenStatusButton><MilestoneIcon></MilestoneIcon> 0 Opened</OpenStatusButton>
                  <OpenStatusButton> 0 Closed</OpenStatusButton>
                </MenuBox>
            </MenuBar>
            hello
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

const LabelLinkButton = styled.button`
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 6rem;
  height: 2rem;
`;

const MilestoneLinkButton = styled.button`
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 8rem;
  height: 2rem;
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
