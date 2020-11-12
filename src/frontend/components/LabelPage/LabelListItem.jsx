import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useFetch from '@Util/useFetch.js';
import LabelPreview from './LabelPreview.jsx';
import LabelForm from './LabelForm.jsx';
import { useLabelFetchDispatcher } from './LabelFetchDispatcher.jsx';

const editFormReducer = (state) => !state;

const LabelListItem = ({ label }) => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const [showEditForm, toggleEditForm] = useReducer(editFormReducer, false);
  const requestFetch = useLabelFetchDispatcher();

  const deleteLabel = (e) => {
    const areyousure = window.confirm('Are you sure? Deleting a label will remove it from all issues and pull requests.');
    if (areyousure) {
      setSubmitDisable(true);
      useFetch(`/api/labels/${label.id}`, 'DELETE')
        .then((res) => {
          setSubmitDisable(false);
          if (res.message === 'delete success') requestFetch();
          else {
          // TODO: 삭제 실패 시 어떻게함??
            alert(res.message);
          }
        });
    }
  };

  return (
    <ItemWrapper>
      {showEditForm ? (
      <LabelForm
      label={label}
      toggle={toggleEditForm}
      />
      ) : (
      <FlexRowBox>
        <PreviewArea>
          <LabelPreview
          title={label.title}
          description={label.description}
          color={label.color}
          />
        </PreviewArea>
        <DescriptionArea>
          {label.description}
        </DescriptionArea>
        <ActionArea>
          <TextButton onClick={toggleEditForm}>Edit</TextButton>
          <TextButton disabled={submitDisable} onClick={deleteLabel}>Delete</TextButton>
        </ActionArea>
      </FlexRowBox>
      )}
    </ItemWrapper>
  );
};

LabelListItem.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
  }).isRequired,
};

const PreviewArea = styled.div`
  display: flex;
  width: 25%;
`;

const DescriptionArea = styled.div`
  display: flex;
  flex-grow: 1;
  font-size: 12px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

const ActionArea = styled.div`
  display: flex;
  font-size: 12px;
  color: ${(props) => props.theme.secondaryTextColor};
`;

const TextButton = styled.button`
  all: unset;
  margin-left: 1em;
`;

const FlexRowBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ItemWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid ${(props) => (props.theme.inputBorderColor)};
`;

export default LabelListItem;
