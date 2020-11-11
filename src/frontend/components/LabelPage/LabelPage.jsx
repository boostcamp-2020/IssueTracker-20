import LinkButton from '@Components/Common/LinkButton';
import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

import labelIcon from '@Images/comment.svg';
import milestoneIcon from '@Images/milestone.svg';
import Button from '@Components/Common/Button';
import useFetch from '@Util/useFetch.js';
import LabelForm from './LabelForm.jsx';
import LabelList from './LabelList.jsx';

const labelFormReducer = (state) => !state;

const LabelPage = () => {
  const [showLabelForm, toggleLabelForm] = useReducer(labelFormReducer, false);
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (loading) {
      useFetch('/api/labels')
        .then((res) => {
          if (res.message) {
            // TODO: error control
            return;
          }
          setLabels(res);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  return (
    <Container>
      <ActionNavBar>
        <LinkButtonBox>
          <LinkButton
            SvgIcon={labelIcon}
            title={'Labels'}
            isLeftRounded={true}
            link={'/labels'}
            active
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
      <LabelList labels={labels} count={labels.length} />
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
