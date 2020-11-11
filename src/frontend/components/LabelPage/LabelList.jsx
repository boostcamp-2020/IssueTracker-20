import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LabelListItem from './LabelListItem.jsx';

const LabelList = ({ labels, count }) => {
  const LabelListItems = useMemo(() => labels.map((label) => (
    <LabelListItem key={`label-${label.id}`} label={label} />
  )), [labels]);

  return (
    <Box>
      <ListHeader>
        <LabelCount>{count} label{count > 1 ? 's' : ''}</LabelCount>
      </ListHeader>
      {LabelListItems}
    </Box>
  );
};

LabelList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
};
LabelList.defaultProps = {
  labels: [],
  count: 0,
};

const LabelCount = styled.h3`
  all: unset;
  font-size: 14px;
  font-weight: 600;
`;

const ListHeader = styled.div`
  padding: 16px;
  margin: -1px;
  background-color: ${(props) => (props.theme.menuBarBgColor)};
  border: 1px solid ${(props) => (props.theme.inputBorderColor)};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const Box = styled.div`
  border: 1px solid ${(props) => (props.theme.inputBorderColor)};
  border-radius: 6px;
  
  & > *:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export default LabelList;
