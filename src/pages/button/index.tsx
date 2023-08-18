import styled from '@emotion/styled';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {useFormik} from "formik";

interface ButtonState {
  userAgentPk: string;
  isEmonSend: boolean;
}

export default function Button(props: ButtonState) {

  const queryClient = useQueryClient();

  // const testEmonGet = useQuery(
  //   'testEmonGet',
  //   () =>
  //     axios.get(
  //       '/emon/score'
  //     ),
  //   {
  //     enabled: false,
  //   }
  // );

  // const handleButtonClick01 = async () => {
  //   queryClient.removeQueries('testEmonPut');
  //   testEmonGet.refetch();
  //   console.log('test emon "GET" data  : ', testEmonGet);
  // };

  const formik = useFormik<ButtonState>({
    initialValues: {
      userAgentPk: '',
      isEmonSend: false,
    },
    onSubmit: async (values) => {
      try {
        queryClient.removeQueries('testEmonGet');
        console.log('input values:', values);
        if (values.userAgentPk) {
          const testEmonPut
            = await axios.put(`/emon/score/?userAgentPk=${values.userAgentPk}&isEmonSend=${values.isEmonSend}`, {
            ...values,
          });
          console.log('test emon "PUT" data (userAgentPk O) : ', testEmonPut);
        } else {
          const testEmonPut = await axios.put(`/emon/score`)
          console.log('test emon "PUT" data (userAgentPk X)  : ', testEmonPut);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TestButtonWrapper>
        {/*<TestButton onClick={handleButtonClick01}>GET</TestButton>*/}
        <TitleEmon>EMON 스코어 데이터 재전송</TitleEmon>

        <div
          style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', marginBottom: '7px'}}>
          <InputSpan>수강생 ID : </InputSpan>
          <StyledInput
            type="text"
            id="userAgentPk"
            name="userAgentPk"
            placeholder="Input ID"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userAgentPk}
          />
        </div>
        <div
          style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}>
          <label>
            <InputSpan>isEmonSend : </InputSpan>
            <select
              id="isEmonSend"
              name="isEmonSend"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isEmonSend.toString()}
              // value={formik.values.isEmonSend}
              style={{
                marginLeft: '5px',
                width: '75px',
              }}
            >
              <option style={{width: '35px'}} value={true.toString()}>TRUE</option>
              <option value={false.toString()}>FALSE</option>
            </select>
          </label>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TestButton type='submit'>전송</TestButton>
        </div>
      </TestButtonWrapper>
    </form>
  );
}
const TestButtonWrapper = styled.div`
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const TitleEmon = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 24px;
`

const TestButton = styled.button`
  width: 120px;
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
const InputSpan = styled.span`
  display: inline-block;
`

const StyledInput = styled.input`
  width: 100px;
  height: 30px;
  padding: 0 5px 0 5px;
`;
