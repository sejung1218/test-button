import styled from '@emotion/styled';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';

interface ButtonState01 {
  userAgentPk: string;
  businessNumber: string;
}

interface ButtonState02 {
  userAgentPk: string;
  jumin: string;
}

export default function NameNumber() {

  const validationSchema01 = Yup.object().shape({
    userAgentPk: Yup.string().required('userAgentApk를 입력해주세요.'), // 사용자 ID 필수 입력
    businessNumber: Yup.number().required('비용수급사업장번호를 입력해주세요.').typeError('숫자만 입력 가능합니다.'), // 숫자만 입력
  });

  const validationSchema02 = Yup.object().shape({
    userAgentPk: Yup.string().required('userAgentApk를 입력해주세요.'), // 사용자 ID 필수 입력
    jumin: Yup.string().required('주민등록번호를 입력해주세요.').typeError('숫자만 입력 가능합니다.'), // 숫자만 입력
  });

  const mutation01 = useMutation(
    async (formData: ButtonState01) => {
      const queryParams = new URLSearchParams({
        userAgentPk: formData.userAgentPk.toString(),
        businessNumber: formData.businessNumber.toString(),
      }).toString();
      const submitUrl = `/emon/user/business?${queryParams}`;
      const response = await axios.put(submitUrl);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('userAgentPk & businessNumber PUT 요청 성공:', data);
        alert("userAgentPk & businessNumber PUT 성공")
      },
      onError: (data, error) => {
        console.log('PUT 요청 실패 data : ', data);
        console.log('PUT 요청 실패 error : ', error);
        alert("userAgentPk & businessNumber PUT 실패")
      },
    }
  );

  const mutation02 = useMutation(
    async (formData: ButtonState02) => {
      const queryParams = new URLSearchParams({
        userAgentPk: formData.userAgentPk.toString(),
        jumin: formData.jumin.toString(),
      }).toString();
      const submitUrl = `/emon/user/jumin?${queryParams}`;
      const response = await axios.put(submitUrl);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('userAgentPk & businessNumber PUT 요청 성공:', data);
        alert("userAgentPk & jumin PUT 성공")
      },
      onError: (data, error) => {
        console.log('PUT 요청 실패 data : ', data);
        console.log('PUT 요청 실패 error : ', error);
        alert("userAgentPk & jumin PUT 실패")
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
    onSubmit: async (values, {resetForm}) => {
      if (values.businessNumber) {
        const trimUserAgentPk = values.userAgentPk01.trim();
        const trimBusinessNumber = values.businessNumber.toString().trim();
        const formData = {
          userAgentPk: trimUserAgentPk,
          businessNumber: trimBusinessNumber,
        };
        console.log("전송한 userAgentPk & businessNumber FormData : ", formData);
        try {
          await validationSchema01.validate(formData);
          await mutation01.mutateAsync(formData);
          resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
      }
      if (values.jumin) {
        const trimUserAgentPk = values.userAgentPk02.trim();
        const trimJumin = values.jumin.toString().trim();
        const formData = {
          userAgentPk: trimUserAgentPk,
          jumin: trimJumin,
        };
        console.log("전송한 userAgentPk & jumin FormData : ", formData);
        try {
          await validationSchema02.validate(formData);
          await mutation02.mutateAsync(formData);
          resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
      }
      resetForm();
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
          <InputSpan>비용수급사업장번호를 : </InputSpan>
          <InputText
            type="number"
            pattern="[0-9]*"
            id="businessNumber"
            name="businessNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.businessNumber}
          />
          <TestButton type='submit'>변경</TestButton>
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
          <InputSpan style={{marginLeft: '58px;'}}>주민등록번호 : </InputSpan>
          <InputText
            type="text"
            id="jumin"
            name="jumin"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.jumin}
          />
          <TestButton type='submit'>변경</TestButton>
        </div>
      </form>
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
