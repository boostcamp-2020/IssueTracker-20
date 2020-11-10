import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = ({
  type: themeType, text, onClick, valid, htmlType,
}) => (
  <CustomButton onClick={onClick} type={htmlType} themeType={themeType} valid={valid}>
    {text}
  </CustomButton>
);

Button.propTypes = {
  type: PropTypes.oneOf(['confirm', 'cancel']),
  text: PropTypes.string,
  onClick: PropTypes.func,
  valid: PropTypes.bool,
  htmlType: PropTypes.oneOf(['submit', 'reset', 'button']),
};

Button.defaultProps = {
  valid: true,
};

const CustomButton = styled.button`
  all: unset;
  cursor: pointer;
  background: ${(props) => {
    if (props.themeType === 'cancel') {
      return props.theme.subButtonColor;
    }
    return props.valid ? props.theme.buttonColor : props.theme.unActiveButtonColor;
  }};
  color: ${(props) => {
    if (props.themeType === 'cancel') {
      return props.theme.textColor;
    }
    return props.theme.whiteColor;
  }};
  border: 1px solid ${(props) => (props.theme.buttonBorderColor)};
  border-radius: 6px;
  padding: 0.4rem 0.8rem;

  &:hover {
    background-color: ${(props) => (props.theme.buttonHoverColor)};
  }
`;

export default Button;
