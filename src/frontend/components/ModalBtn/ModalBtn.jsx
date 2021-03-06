import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import textReduce from '@Util/textReduce';
import CheckImg from '@Images/modalCheckBtn.svg';

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

const ProfileImg = styled.img`
  height:20px;
  width:20px;
  border-radius: 10px;
`;

const returnTitle = (dispatch, title, property, setBoxVisible) => async () => {
  await dispatch({ type: 'TOGGLE', title, property });
  if (setBoxVisible) { setBoxVisible(); }
};

const CheckWrap = styled.div`
  width: 10%;
  display: flex;
  ${(props) => (props.property === 'labels'
    ? 'margin-top: 0.18rem;'
    : 'align-items:center;')
} 
`;

const ModalBtn = (props) => {
  const {
    title,
    profileURL,
    description,
    color,
    isTitleBold,
    dispatch,
    property,
    setBoxVisible,
    isChecked,
  } = props;

  return (
    <Main onClick={returnTitle(dispatch, title, property, setBoxVisible)}>
      <CheckWrap property={property}>
        {isChecked ? <CheckImg /> : <Empty />}
      </CheckWrap>
      <Content>
        <Above>
          {color && <LabelColor color={color}/>}
          {profileURL && <ProfileImg src={profileURL} />}
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
  profileURL: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  isTitleBold: PropTypes.bool,
  dispatch: PropTypes.func,
  property: PropTypes.string,
  setBoxVisible: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default ModalBtn;
