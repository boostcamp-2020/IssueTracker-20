import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelPreview = (props) => {
  const hint = props.description || props.title;
  const title = props.title || 'Label preview';

  return (
    <LabelDiv title={hint} color={props.color}>
      {title}
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

const LabelDiv = styled.span`
  padding: 0 1em;
  border-radius: 2em;
  background-color: ${(props) => props.color}
`;

export default LabelPreview;
