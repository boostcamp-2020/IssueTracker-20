import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LabelPreview from './LabelPreview.jsx';

const LabelListItem = ({ label }) => {
  console.log(label);

  return (
    <Box>
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
        <TextButton>Edit</TextButton>
        <TextButton>Delete</TextButton>
      </ActionArea>
    </Box>
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

const Box = styled.div`
  display: flex;
  flex-direction: row;

  padding: 16px;
  border-top: 1px solid ${(props) => (props.theme.inputBorderColor)};
`;

export default LabelListItem;
