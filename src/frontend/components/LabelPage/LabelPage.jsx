import LinkButton from '@Components/Common/LinkButton';
import React, { useReducer } from 'react';
import styled from 'styled-components';

import labelIcon from '@Images/comment.svg';
import milestoneIcon from '@Images/milestone.svg';
import Button from '@Components/Common/Button';
import LabelForm from './LabelForm.jsx';

const labelFormReducer = (state) => !state;

const LabelPage = () => {
  const [showLabelForm, toggleLabelForm] = useReducer(labelFormReducer, false);

  return (
    <Container>
      <ActionNavBar>
        <LinkButtonBox>
          <LinkButton
            SvgIcon={labelIcon}
            title={'Labels'}
            isLeftRounded={true}
            link={'/labels'}
          />
          <LinkButton
            SvgIcon={milestoneIcon}
            title={'Milestones'}
            isLeftRounded={false}
            link={'/milestones'}
          />
        </LinkButtonBox>
        <Button
          type='confirm'
          text='New label'
          onClick={toggleLabelForm}
        />
      </ActionNavBar>
      {showLabelForm && <LabelForm toggle={toggleLabelForm} />}
    </Container>
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

const Container = styled.div`
  ${FlexColumnBox}
  padding: 3rem;
  min-width: 600px;
  max-width: 1200px;
  margin: auto;
`;

const ActionNavBar = styled.nav`
  ${FlexRowBox}
  min-height: 2em;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const LinkButtonBox = styled.div`
  ${FlexRowBox}
`;

export default LabelPage;
