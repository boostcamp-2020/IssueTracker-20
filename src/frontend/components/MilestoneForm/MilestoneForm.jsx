import React, {
  useEffect, useState, useCallback,
} from 'react';
import styled from 'styled-components';
import LabelIcon from '@Images/comment.svg';
import MilestoneIcon from '@Images/milestone.svg';
import MilestoneIconWhite from '@Images/milestoneWhite.svg';
import Button from '@Common/Button';
import Milestone from '@Components/Milestone';
import useFetch from '@Util/useFetch';
import { useHistory } from 'react-router';

const MilestoneForm = () => (
      <Main>
          <Content>
            <h2>New Milestone</h2>
            <h4>Create a new milestone</h4>
            <hr width="100%" height="1"/>
            <form action="/milestones" method="POST">
              <h4>title</h4>
              <input type="text" name="title"></input>
              <h4>Due date (optional)</h4>
              <input type="date" name="dueDate"></input>
              <h4>Description (optional)</h4>
              <textarea cols="60" rows="20" resize="none" name="description"></textarea>
              <hr width="100%" height="1"/>
              <Button
              text="Create Milestone"
              />
            </form>
          </Content>
      </Main>

);

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

export default MilestoneForm;
