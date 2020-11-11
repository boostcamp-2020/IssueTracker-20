import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LabelPreview from './LabelPreview.jsx';
import LabelForm from './LabelForm.jsx';

const editFormReducer = (state) => !state;

const LabelListItem = ({ label }) => {
  const [showEditForm, toggleEditForm] = useReducer(editFormReducer, false);

  return (
    <ItemWrapper>
      {showEditForm ? (
      <LabelForm
      id={label.id}
      name={label.title} // TODO: 11-11자 PR들 다 merge되면 제거
      title={label.title}
      description={label.description}
      color={label.color}
      toggle={toggleEditForm}
      edit
      />
      ) : (
      <FlexRowBox>
        <PreviewArea>
          <LabelPreview
          name={label.title} // TODO: 11-11자 PR들 다 merge되면 제거
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
          <TextButton>Delete</TextButton>
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
