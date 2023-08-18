import styled from '@emotion/styled';
import axios from 'axios';
import {useQuery, useQueryClient} from 'react-query';
import {useFormik} from "formik";
import * as yup from 'yup';
import {useState} from "react";

export default function Button() {
  const queryClient = useQueryClient();
  const [queryEnabled, setQueryEnabled] = useState(false);

  const testEmonGet = useQuery(
    'testEmonGet',
    () => axios.get('/emon/score'),
    {
      enabled: queryEnabled,
    }
  );

  const validationSchema = yup.object().shape({
    inputText: yup.string().required('This field is required'),
  });

  const formik = useFormik({
    initialValues: {
      inputText: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put('/emon/score', values);
        queryClient.removeQueries('testEmonGet');
        setQueryEnabled(true); // 활성화 상태 변경
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  const handleGetButtonClick = () => {
    setQueryEnabled(true); // 활성화 상태 변경
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TestButtonWrapper>
        <TestPutButtonWrapper>
          <StyledInput
            type="text"
            id="getText"
            name="getText"
            placeholder="Get Data"
          />
          <TestButton type="button" onClick={handleGetButtonClick}>GET</TestButton>
        </TestPutButtonWrapper>
        <TestPutButtonWrapper>
          <StyledInput
            type="text"
            id="inputText"
            name="inputText"
            placeholder="Enter text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.inputText}
          />
          {formik.touched.inputText && formik.errors.inputText && (
            <ErrorText>{formik.errors.inputText}</ErrorText>
          )}
          <TestButton type="submit">PUT</TestButton>
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
`;
const ErrorText = styled.div`
  color: red;
`;