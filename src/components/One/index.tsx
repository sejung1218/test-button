import styled from '@emotion/styled';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {ChangeEvent, useState} from "react";
import LoadingSpinner from "../Spinner";

interface ButtonState {
  userId: string | string[];
  isTest: boolean;
  isEmonSend: boolean;
}

export default function One() {

  const [step, setStep] = useState<number>(1);
  const [isPut, setIsPut] = useState<boolean>(false);

  function handleResizeHeight(event: ChangeEvent<HTMLTextAreaElement>) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const validationSchema = Yup.object().shape({
    userId: Yup.string().required('ID를 입력해주세요.'), // 사용자 ID 필수 입력
  });

  const mutation = useMutation(
    async (formData: ButtonState) => {
      const queryParams = new URLSearchParams({
        isTest: formData.isTest.toString(),
        isEmonSend: formData.isEmonSend.toString(),
      }).toString();
      const submitUrl = `/emon/score?${queryParams}`;
      const response = await axios.put(submitUrl, formData.userId);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('PUT 요청 성공:', data);
        setIsPut(true)
      },
      onError: (error) => {
        console.log('PUT 요청 실패:', error);
        alert('전송에 실패하였습니다! 5분 뒤에 다시 시도해주세요!');
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      userId: '',
      isTest: true,
      isEmonSend: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      const trimmedUserId = values.userId.trim();
      const valuesArray = trimmedUserId.split(',').map((item: string) => item.trim());
      const formData = {
        userId: valuesArray,
        isTest: values.isTest,
        isEmonSend: values.isEmonSend,
      };
      console.log("전송한 FormData : ", formData);
      await mutation.mutateAsync(formData);
    },
  });

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <TestButtonWrapper>
            {mutation.isLoading && <LoadingSpinner/>}
            {isPut ?
              <StepButtonWrap>
                <TestButton2 onClick={() => setStep(2)}>스탭2</TestButton2>
                <TestButton2 onClick={() => setStep(3)}>스탭3</TestButton2>
              </StepButtonWrap>
              : null}
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
                  id="userId"
                  name="userId"
                  placeholder="Input ID"
                  onChange={(event) => {
                    formik.handleChange(event);
                    handleResizeHeight(event);
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.userId}
                  rows={1}
                />
                <InputSpan>데이터는 쉼표로 구분합니다. 스페이스바는 전송버튼을 누를시 자동 제거됩니다.</InputSpan>
                <InputSpan>(단, 문자와 문자 사이의 스페이스바는 제거되지 않음)</InputSpan>
                <InputSpan>올바른 예시 : test1, test2,test3 , test4</InputSpan>
                <InputSpan>잘못된 예시 : tes t1, te s t2,te st3 , tes t4</InputSpan>
              </div>
              {formik.touched.userId && formik.errors.userId ? (
                <div style={{
                  color: 'red',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>{formik.errors.userId}</div>
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
                    <option style={{width: '35px'}} value="true">
                      TRUE
                    </option>
                    <option value="false">FALSE</option>
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
                    <option style={{width: '35px'}} value='true'>TRUE</option>
                    <option value='false'>FALSE</option>
                  </select>
                </label>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '5px'}}>
                <TestButton type='submit'>전송</TestButton>
              </div>

            </form>
          </TestButtonWrapper>
        );

      case 2:
        return (
          <TestButtonWrapper>
            {isPut ?
              <StepButtonWrap>
                <TestButton2 onClick={() => setStep(1)}>스탭1</TestButton2>
                <TestButton2 onClick={() => setStep(3)}>스탭3</TestButton2>
              </StepButtonWrap>
              : null}
            <div style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <iframe
                src="https://kji.or.kr/emon/test/attend_hist_test.asp"
                title="attend_hist_test"
                width="100%"
                height="100%"
                style={{color: 'black'}}
              ></iframe>
            </div>
          </TestButtonWrapper>
        );
      case 3:
        return (
          <TestButtonWrapper>
            {isPut ?
              <StepButtonWrap>
                <TestButton2 onClick={() => setStep(1)}>스탭1</TestButton2>
                <TestButton2 onClick={() => setStep(2)}>스탭2</TestButton2>
              </StepButtonWrap>
              : null}
            <div style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <iframe
                src="https://kji.or.kr/emon/test/attend_rslt_ct_hist_test.asp"
                title="attend_rslt_ct_hist_test"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </TestButtonWrapper>
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
  background-color: #3b3b3b;
  color: white;
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
  //color: #fff;
  color: black;
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
  //min-height: 30px;
  //max-height: 250px;
  min-height: 250px;
  max-height: 500px;
  overflow-y: auto;
  font-size: 15px;
`;

const StepButtonWrap = styled.div`
  position: absolute;
  top: 8px; /* 조정할 원하는 위치로 변경 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;