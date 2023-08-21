import styled from '@emotion/styled';
import axios from 'axios';
import {useQueryClient} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';


interface ButtonState {
  userAgentPk: string;
  isTest: boolean;
  isEmonSend: boolean;
}

export default function One() {

  const queryClient = useQueryClient();
  const validationSchema = Yup.object().shape({
    userAgentPk: Yup.string().required('ID를 입력해주세요.'), // 사용자 ID 필수 입력
  });

  const formik = useFormik<ButtonState>({
    initialValues: {
      userAgentPk: '',
      isTest: true, // 추가한 부분
      isEmonSend: false,
    },
    validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        queryClient.removeQueries('testEmonGet');
        await validationSchema.validate(values, {abortEarly: false});
        console.log('input values 1:', values);
        console.log('test 2')
        console.log('values.userAgentPk 3 : ', values.userAgentPk)
        if (values.userAgentPk) {
          console.log('test 4')
          const submitUrl = `/emon/score/?userAgentPk=${values.userAgentPk}&isTest=${values.isTest}&isEmonSend=${values.isEmonSend}`;
          console.log('test 5')
          console.log('submitUrl 6 : ', submitUrl)
          const testEmonPut = await axios.put(submitUrl, {
            ...values,
          });
          console.log('test 7')
          console.log('test emon "PUT" data (userAgentPk O) 8 : ', testEmonPut);
          window.open('https://www.naver.com');
          window.open('https://www.google.com');
        } else {
          // const testEmonPut = await axios.put(`/emon/score`)
          // console.log('test emon "PUT" data (userAgentPk X)  : ', testEmonPut);
          console.log('No userAgentPk provided.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false); // 전송 완료 후 상태 변경
      }
    },
  });
  return (
    <TestButtonWrapper>
      <form onSubmit={formik.handleSubmit}>
        <TitleEmon>EMON 임시 데이터 재전송</TitleEmon>
        <div
          style={{display: 'flex', gap: '5px', justifyContent: 'center', alignItems: 'center', marginBottom: '15px'}}>
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
        {formik.touched.userAgentPk && formik.errors.userAgentPk ? (
          <div style={{
            color: 'red',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px'
          }}>{formik.errors.userAgentPk}</div>
        ) : null}
        {/**/}
        <div
          style={{
            display: 'flex',
            gap: '5px',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          <label>
            <InputSpan>isTest : </InputSpan>
            <select
              id="isTest"
              name="isTest"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.isTest.toString()}
              style={{
                marginLeft: '5px',
                width: '75px',
              }}
            >
              <option style={{width: '35px'}} value={true.toString()}>
                TRUE
              </option>
              <option value={false.toString()}>FALSE</option>
            </select>
          </label>
        </div>
        {/**/}
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
      </form>
    </TestButtonWrapper>
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
