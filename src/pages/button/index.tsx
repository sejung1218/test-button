import styled from '@emotion/styled';
import axios from 'axios';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export default function Button() {
  const queryClient = useQueryClient();
  // GET ----------------------------------------------------------------------------------------------
  const testReactQueryGet01 = useQuery(
    'testReactQueryGet01',
    () =>
      axios.get(
        'https://api.bonobono.dev/api/v1/example/reactquery/test/data01'
        // ,{params: { data: 'data' },}
      ),
    {
      enabled: false, // 초기 렌더링 시에는 API 호출 비활성화
    }
    // .then((data) => data)
  );
  // console.log('test "GET" data  : ', testReactQueryGet.data?.data.data.test);
  console.log('test "GET" data01  : ', testReactQueryGet01.data);

  const testReactQueryGet02 = useQuery(
    'testReactQueryGet02',
    () =>
      axios.get(
        'https://api.bonobono.dev/api/v1/example/reactquery/test/data02'
      ),
    {
      enabled: false,
    }
  );
  console.log('test "GET" data02  : ', testReactQueryGet02.data);
  // const message = testReactQueryGet01.data;

  const handleButtonClick01 = () => {
    queryClient.removeQueries('testReactQueryGet02');
    testReactQueryGet01.refetch(); // 버튼 1을 클릭할 때 첫 번째 API를 호출하도록 refetch 메소드 호출
  };

  const handleButtonClick02 = async () => {
    queryClient.removeQueries('testReactQueryGet01');
    testReactQueryGet02.refetch();
  };

  return (
    <>
      <YujinInner>
        {/* 버튼 1 클릭 시 API 호출 */}
        <YujinButton02 onClick={handleButtonClick01}>1</YujinButton02>
        {/* 버튼 2 클릭 시 API 호출 */}
        <YujinButton02 onClick={handleButtonClick02}>2</YujinButton02>
        <YujinButton02>3</YujinButton02>
        <YujinButton02>4</YujinButton02>
        <YujinButton02>5</YujinButton02>
        <YujinButton02>6</YujinButton02>
        <YujinButton02>7</YujinButton02>
        {/* <YujinButton03 onClick={handleMakeCat}>버~튼</YujinButton03> */}
      </YujinInner>
    </>
  );
}
const YujinInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const YujinButton01 = styled.button`
  width: 300px;
  height: 40px;
  border: 1px solid #ddd;
  background: #efefef;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: black;
`;
const YujinButton02 = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  background: #4844ff;
  color: #fff;
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #3733e9;
  }

  &:active {
    background: #2b28ca;
  }
`;
const YujinButton03 = styled.button`
  width: 200px;
  height: 50px;
  background: #fff;
  color: #ed4d4d;
  border: none;
  position: relative;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #ed4d4d;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.3s;
  }

  &:hover::before {
    width: 100%;
  }
`;
