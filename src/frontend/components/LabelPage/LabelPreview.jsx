import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelPreview = (props) => {
  const hint = props.description || props.name;
  const name = props.name || 'Label preview';

  return (
    <LabelDiv title={hint} color={props.color}>
      {name}
    </LabelDiv>
  );
};

LabelPreview.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
};
LabelPreview.defaultProps = {
  name: 'Label preview',
};

const LabelDiv = styled.span`
  padding: 0 1em;
  border-radius: 2em;
  background-color: ${(props) => props.color}
`;

export default LabelPreview;
