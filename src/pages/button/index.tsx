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

  const testEmonGet = useQuery(
    'testEmonGet',
    () =>
      axios.get(
        '/emon/score'
      ),
    {
      enabled: false,
    }
  );

  const handleButtonClick01 = async () => {
    queryClient.removeQueries('testEmonPut');
    testEmonGet.refetch();
    console.log('test emon "GET" data  : ', testEmonGet);
  };

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
        <TestPutButtonWrapper>
          <TestButton onClick={handleButtonClick01}>GET</TestButton>
        </TestPutButtonWrapper>
        <TestPutButtonWrapper>
          <StyledInput
            type="text"
            id="userAgentPk"
            name="userAgentPk"
            placeholder="Enter text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userAgentPk}
          />
          <label style={{display: 'flex', gap: '5px'}}>
            isEmonSend :
            <select
              id="isEmonSend"
              name="isEmonSend"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isEmonSend.toString()}
              // value={formik.values.isEmonSend}
            >
              <option value={true.toString()}>TRUE</option>
              <option value={false.toString()}>FALSE</option>
            </select>
          </label>
          <TestButton type='submit'>PUT</TestButton>
        </TestPutButtonWrapper>
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
  gap: 20px;
`;

const TestPutButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const TestButton = styled.button`
  width: 180px;
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
const StyledInput = styled.input`
  width: 180px;
  height: 30px;
  padding: 0 5px 0 5px;
`;
