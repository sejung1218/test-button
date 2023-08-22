import styled from '@emotion/styled';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {ChangeEvent, useState} from "react";


interface ButtonState {
  userAgentPk: string;
  isTest: boolean;
  isEmonSend: boolean;
}

export default function One() {

  const [step, setStep] = useState<number>(1);

  function handleResizeHeight(event: ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const validationSchema = Yup.object().shape({
    userAgentPk: Yup.string().required('ID를 입력해주세요.'), // 사용자 ID 필수 입력
  });

  const mutation = useMutation(
    async (values: ButtonState) => {
      const emonPutTest = await axios.put(`/emon/score/?userAgentPk=${values.userAgentPk}&isTest=${values.isTest}&isEmonSend=${values.isEmonSend}`, values);
      return emonPutTest.data;
    },
    {
      onSuccess: (data) => {
        console.log('PUT 요청 성공 : ', data);
        // window.open('https://kji.or.kr/emon/test/attend_hist_test.asp');
        // window.open('https://kji.or.kr/emon/test/attend_rslt_ct_hist_test.asp');
      },
      onError: (error) => {
        alert('전송에 실패하였습니다! 5분뒤에 다시 시도해주세요!');
        console.error('PUT 요청 실패 : ', error);
      }
    }
  );

  const formik = useFormik<ButtonState>({
    initialValues: {
      userAgentPk: '',
      isTest: true,
      isEmonSend: false,
    },
    validationSchema,
    onSubmit: async (values, {setSubmitting}) => {
      try {
        const trimmedUserAgentPk = values.userAgentPk.trim();
        const valuesArray = trimmedUserAgentPk.split(',').map(item => item.trim());
        console.log('valuesArray : ', valuesArray)
        await validationSchema.validate(values, {abortEarly: false});
        console.log('input values : ', values);
        console.log('input userAgentPk values :', values.userAgentPk);
        await mutation.mutateAsync(values);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setSubmitting(false); // 전송 완료 후 상태 변경
      }
    },
  });

  //
  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <TestButtonWrapper>
            <form onSubmit={formik.handleSubmit}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <TitleEmon>EMON 임시 데이터 재전송</TitleEmon></div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                <InputSpan>수강생 ID : </InputSpan>
                <StyledTextarea
                  id="userAgentPk"
                  name="userAgentPk"
                  placeholder="Input ID"
                  // onChange={formik.handleChange}
                  onChange={(event) => {
                    formik.handleChange(event);
                    handleResizeHeight(event);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.userAgentPk}
                  rows={1}
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
                style={{
                  display: 'flex',
                  gap: '5px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
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
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px'}}>
                <TestButton type='submit'>전송</TestButton>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
                <TestButton2 onClick={() => setStep(2)}>스탭2</TestButton2>
                <TestButton2 onClick={() => setStep(3)}>스탭3</TestButton2>
              </div>
            </form>
          </TestButtonWrapper>
        );

      case 2:
        return (
          <TestButtonWrapper>
            <div style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <iframe
                src="https://www.naver.com"
                title="Naver Website"
                width="100%"
                height="100%"
              ></iframe>
            </div>
            <div style={{marginTop: '10px'}}>
              <TestButton2 onClick={() => setStep(3)}>스탭3</TestButton2>
            </div>
          </TestButtonWrapper>
        );
      case 3:
        return (
          <div>3</div>
        );
      default:
        return null;
    }
  };
  //

  return <>{renderComponent()}</>;
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
  display: flex;
  color: white;
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
  width: fit-content;
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


const TestButton2 = styled.button`
  width: 120px;
  height: 30px;
  border: none;
  background: #8988db;
  color: #fff;
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #524fc0;
  }

  &:active {
    background: #4543c4;
  }
`;

const InputSpan = styled.span`
  display: inline-block;
`

const StyledTextarea = styled.textarea`
  width: 500px;
  padding: 0 5px;
  min-height: 30px;
  max-height: 250px;
  overflow-y: auto;
  font-size: 15px;
`;