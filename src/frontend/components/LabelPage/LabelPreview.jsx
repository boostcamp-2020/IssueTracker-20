import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelPreview = (props) => {
  const [backgroundColor, setBackgroundColor] = useState(props.color);
  const hint = props.description || props.name;
  const name = props.name || 'Label preview';

  useEffect(() => {
    if (props.valid) setBackgroundColor(props.color);
  }, [props.color]);

  return (
    <LabelDiv title={hint} color={backgroundColor}>
      {name}
    </LabelDiv>
  );
};

LabelPreview.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
  valid: PropTypes.bool,
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
