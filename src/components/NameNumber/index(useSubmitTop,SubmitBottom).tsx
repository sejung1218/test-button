import styled from '@emotion/styled';
import axios from 'axios';
import {useMutation} from 'react-query';
import {useFormik} from "formik";
import * as Yup from 'yup';
import React from "react";

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
        alert("userAgentPk & jumin PUT 성공")
      },
      onError: (data, error) => {
        console.log('PUT 요청 실패 data : ', data);
        console.log('PUT 요청 실패 error : ', error);
        alert("userAgentPk & jumin PUT 실패")
      },
    }
  );

  const {getFieldProps, touched, errors, validateForm} = useFormik({
    initialValues: {
      userAgentPk01: '',
      userAgentPk02: '',
      businessNumber: '',
      jumin: '',
    }, validationSchema,
    onSubmit: async (values, {resetForm}) => {
      if (values.businessNumber) {
        const trimUserAgentPk = values.userAgentPk01.trim();
        const trimBusinessNumber = values.businessNumber.toString().trim();
        const formData = {
          userAgentPk01: trimUserAgentPk,
          businessNumber: trimBusinessNumber,
        };
        console.log("전송한 userAgentPk & businessNumber FormData : ", formData);
        try {
          // await validationSchema01.validate(formData);
          await mutation01.mutateAsync(formData);
          // resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
      }
      if (values.jumin) {
        const trimUserAgentPk = values.userAgentPk02.trim();
        const trimJumin = values.jumin.toString().trim();
        const formData = {
          userAgentPk02: trimUserAgentPk,
          jumin: trimJumin,
        };
        console.log("전송한 userAgentPk & jumin FormData : ", formData);
        try {
          // await validationSchema02.validate(formData);
          await mutation02.mutateAsync(formData);
          // resetForm();
        } catch (error) {
          console.log('유효성 검사 실패:', error);
        }
      }
      // resetForm();
    },
  });

  const onSubmitTop = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('1')
    e.preventDefault();
    const formErrors = await validateForm();
    console.log('formErrors : ', formErrors)
    const trimUserAgentPk = getFieldProps('userAgentPk01').toString().trim();
    const trimBusinessNumber = getFieldProps('businessNumber').toString().trim();
    const formData = {
      userAgentPk01: trimUserAgentPk,
      businessNumber: trimBusinessNumber,
    };
    console.log("전송한 userAgentPk & businessNumber FormData : ", formData);
    try {
      await mutation01.mutateAsync(formData);
    } catch (error) {
      console.log('유효성 검사 실패:', error);
    }
  }

  const onSubmitBottom = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('2')
    e.preventDefault();
    const formErrors = await validateForm();
    console.log('formErrors : ', formErrors)
    const trimUserAgentPk = getFieldProps('userAgentPk02').toString().trim();
    console.log('trimUserAgentPk : ', trimUserAgentPk)
    const trimJumin = getFieldProps('jumin').toString().trim();
    const formData = {
      userAgentPk02: trimUserAgentPk,
      jumin: trimJumin,
    };
    console.log("전송한 userAgentPk & jumin FormData : ", formData);
    try {
      await mutation02.mutateAsync(formData);
    } catch (error) {
      console.log('유효성 검사 실패:', error);
    }
  }

  return (
    <EmonNameNumberSection>
      <form onSubmit={onSubmitTop}>
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
            {...getFieldProps('userAgentPk01')}
          />
          <InputSpan>비용수급사업장번호를 : </InputSpan>
          <InputText
            type="number"
            pattern="[0-9]*"
            {...getFieldProps('businessNumber')}
          />

          <TestButton type='submit'>변경</TestButton>
        </div>
        {/**/}
        <div style={{
          color: 'red',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '15px',
          gap: '140px'
        }}>
          {touched.userAgentPk01 && errors.userAgentPk01 ? (
            <div>{errors.userAgentPk01}</div>
          ) : null}
          {touched.businessNumber && errors.businessNumber ? (
            <div>{errors.businessNumber}</div>
          ) : null}
        </div>
        {/**/}
      </form>

      <form onSubmit={onSubmitBottom}>
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
            {...getFieldProps('userAgentPk02')}
          />
          <InputSpan style={{marginLeft: '58px;'}}>주민등록번호 : </InputSpan>
          <InputText
            type="number"
            {...getFieldProps('jumin')}
          />
          <TestButton type='submit'>변경</TestButton>
        </div>
        {/**/}
        <div style={{
          color: 'red',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '15px',
          gap: '140px'
        }}>
          {touched.userAgentPk02 && errors.userAgentPk02 ? (
            <div>{errors.userAgentPk02}</div>
          ) : null}
          {touched.jumin && errors.jumin ? (
            <div>{errors.jumin}</div>
          ) : null}
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
