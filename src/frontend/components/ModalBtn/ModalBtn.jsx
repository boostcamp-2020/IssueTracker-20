import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import textReduce from '@Util/textReduce';

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const Main = styled.div`
  ${FlexRowBox}
  width: 100%;
  font-size: 0.8rem;
`;

const Empty = styled.div`
  width: 10%;
  height: 100%;
  background-color: green;
`;

const Content = styled.div`
  width: 86%;
`;

const Above = styled.div`
  ${FlexRowBox}
  margin-top: 3%;
  width: 100%;
`;

const Below = styled.div`
  ${FlexRowBox}
  margin-bottom: 3%;
  width: 100%;
`;

const LabelColor = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
`;

const Title = styled.div`
  padding-left: 10px;
  ${(props) => (props.isTitleBold
    ? 'font-weight: 600;'
    : '')};
`;

const Desc = styled.div`
  margin-left: 14px;
  padding-left: 10px;
  color: ${(props) => props.theme.subTextColor};
`;

const returnTitle = (dispatch, title, property) => () => {
  dispatch({ type: 'TOGGLE', title, property });
};

const ModalBtn = (props) => {
  const {
    title,
    description,
    color,
    isTitleBold,
    dispatch,
    property,
  } = props;

  return (
    <Main onClick={returnTitle(dispatch, title, property)}>
      <Empty />
      <Content>
        <Above>
          <LabelColor color={color}/>
          <Title isTitleBold={isTitleBold}>{textReduce(title, 15)}</Title>
        </Above>
        <Below>
          <Desc>{textReduce(description, 15)}</Desc>
        </Below>
      </Content>
    </Main>
  );
};

ModalBtn.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  isTitleBold: PropTypes.boolean,
  dispatch: PropTypes.func,
  property: PropTypes.string,
};

export default ModalBtn;
