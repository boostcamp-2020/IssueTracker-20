import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelPreview = ({ title, description, color }) => {
  const hint = description || title;
  const name = title || 'Label preview';

  return (
    <LabelDiv title={hint} color={color}>
      {name}
    </LabelDiv>
  );
};

LabelPreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
};
LabelPreview.defaultProps = {
  title: 'Label preview',
};

const LabelDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  padding: 0 1em;
  border-radius: 2em;
  background-color: ${(props) => props.color}
`;

export default LabelPreview;
