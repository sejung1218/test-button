import styled from '@emotion/styled';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useState} from "react";

interface ButtonState01 {
  userAgentPk01: string;
  businessNumber: string;
}

interface ButtonState02 {
  userAgentPk02: string;
  jumin: string;
}

export default function NameNumber() {

  const validationSchema = Yup.object().shape({
    userAgentPk01: Yup.string().required('userAgentApk를 입력해주세요.'), // 사용자 ID 필수 입력
    businessNumber: Yup.number().required('비용수급사업장번호를 입력해주세요.').typeError('숫자만 입력 가능합니다.'), // 숫자만 입력
    userAgentPk02: Yup.string().required('userAgentApk를 입력해주세요.'), // 사용자 ID 필수 입력
    jumin: Yup.number().required('주민등록번호를 입력해주세요.').typeError('숫자만 입력 가능합니다.'), // 숫자만 입력
  });

  const handleUserInfo = () => {
    window.open('https://kji.or.kr/emon/test/user_hist_test.asp')
  }

  const [buttonState, setButtonState] = useState<number>(1);

  const mutation01 = useMutation(
    async (formData: ButtonState01) => {
      const queryParams = new URLSearchParams({
        userAgentPk: formData.userAgentPk01.toString(),
        businessNumber: formData.businessNumber.toString(),
      }).toString();
      const submitUrl = `/emon/user/business?${queryParams}`;
      const response = await axios.put(submitUrl);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('userAgentPk & businessNumber PUT 요청 성공:', data);
        // alert("userAgentPk & businessNumber PUT 성공")
        alert("변경 요청 성공")
      },
      onError: (data, error) => {
        console.log('PUT 요청 실패 data : ', data);
        console.log('PUT 요청 실패 error : ', error);
        // alert("userAgentPk & businessNumber PUT 실패")
        alert("유효하지 않은 ID입니다.")
      },
    }
  );

  const mutation02 = useMutation(
    async (formData: ButtonState02) => {
      const queryParams = new URLSearchParams({
        userAgentPk: formData.userAgentPk02.toString(),
        jumin: formData.jumin.toString(),
      }).toString();
      const submitUrl = `/emon/user/jumin?${queryParams}`;
      const response = await axios.put(submitUrl);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('userAgentPk & businessNumber PUT 요청 성공:', data);
        // alert("userAgentPk & jumin PUT 성공")
        alert("변경 요청 성공")
      },
      onError: (data, error) => {
        console.log('PUT 요청 실패 data : ', data);
        console.log('PUT 요청 실패 error : ', error);
        // alert("userAgentPk & jumin PUT 실패")
        alert("유효하지 않은 ID입니다.")
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      userAgentPk01: '',
      userAgentPk02: '',
      businessNumber: '',
      jumin: '',
    },
    // validationSchema,
    onSubmit: async (values, {resetForm}) => {
      // if (values.businessNumber) {
      if (buttonState === 2) {
        const trimUserAgentPk = values.userAgentPk01.trim();
        const trimBusinessNumber = values.businessNumber.toString().trim();
        const formData = {
          userAgentPk01: trimUserAgentPk,
          businessNumber: trimBusinessNumber,
        };
        console.log("전송한 userAgentPk & businessNumber FormData : ", formData);
        try {
          if (formData.userAgentPk01 === '' && formData.businessNumber === '') {
            alert("ID와 사업장 번호를 입력해주세요.")
          } else if (formData.userAgentPk01 === '') {
            alert("ID를 입력해주세요.")
          } else if (formData.businessNumber === '') {
            alert("사업장 번호를 입력해주세요.")
          } else {
            await mutation01.mutateAsync(formData);
            // resetForm();
          }
          // await validationSchema01.validate(formData);
          // await mutation01.mutateAsync(formData);
          // resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
        setButtonState(1)
      }
      // if (values.jumin) {
      if (buttonState === 3) {

        const trimUserAgentPk = values.userAgentPk02.trim();
        const trimJumin = values.jumin.toString().trim();
        const formData = {
          userAgentPk02: trimUserAgentPk,
          jumin: trimJumin,
        };
        console.log("전송한 userAgentPk & jumin FormData : ", formData);
        try {
          if (formData.userAgentPk02 === '' && formData.jumin === '') {
            alert("ID와 주민등록번호를 입력해주세요.")
          } else if (formData.userAgentPk02 === '') {
            alert("ID를 입력해주세요.")
          } else if (formData.jumin === '') {
            alert("주민등록번호를 입력해주세요.")
          } else {
            await mutation02.mutateAsync(formData);
            // resetForm();
          }
          // await validationSchema02.validate(formData);
          // await mutation02.mutateAsync(formData);
          // resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
      }
    },
  });

  return (
    <EmonNameNumberSection>
      <form onSubmit={formik.handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <InputSpan>수강생 ID : </InputSpan>
          <InputText
            type="text"
            id="userAgentPk01"
            name="userAgentPk01"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userAgentPk01}
          />
          <InputSpan>비용수급사업장번호 : </InputSpan>
          <InputText
            type="number"
            pattern="[0-9]*"
            id="businessNumber"
            name="businessNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.businessNumber}
          />
          <TestButton type='submit' onClick={() => setButtonState(2)}>변경</TestButton>
        </div>
      </form>

      <form onSubmit={formik.handleSubmit}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          <InputSpan>수강생 ID : </InputSpan>
          <InputText
            type="text"
            id="userAgentPk02"
            name="userAgentPk02"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userAgentPk02}
          />
          <InputSpan style={{marginLeft: '42px;'}}>주민등록번호 : </InputSpan>
          <InputText
            type="number"
            id="jumin"
            name="jumin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jumin}
          />
          <TestButton type='submit' onClick={() => setButtonState(3)}>변경</TestButton>
        </div>
      </form>
      <UserInfoButton onClick={handleUserInfo}>유저 정보 전송</UserInfoButton>
    </EmonNameNumberSection>
  )
}

const EmonNameNumberSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
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

const InputText = styled.input`
  height: 30px;
  padding: 0 10px 0 10px;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const UserInfoButton = styled.button`
  margin-top: 20px;
  width: 320px;
  height: 40px;
  font-size: 20px;
  border: none;
  background: #4844ff;
  color: #fff;
  border-radius: 4px;
  transition: 0.3s;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #3733e9;
  }

  &:active {
    background: #2b28ca;
  }
`
