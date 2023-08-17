import styled from "@emotion/styled";

export default function Test() {
//
  const handleMakeCat = () => {
    console.log('hello')
    alert('nyang')
  }

  return (
    <>
      <YujinInner>
        <YujinButton01>버튼 입니당</YujinButton01>
        <YujinButton02>확인</YujinButton02>
        <YujinButton03 onClick={handleMakeCat}>버~튼</YujinButton03>
      </YujinInner>
    </>
  )
}
const YujinInner = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: #fff;
`
const YujinButton01 = styled.button`
  width: 300px;
  height: 40px;
  border: 1px solid #ddd;
  background: #efefef;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: #222;
`
const YujinButton02 = styled.button`
  width: 50px;
  height: 30px;
  border: none;
  background: #4844FF;
  color: #fff;
  border-radius: 4px;
  transition: .3s;
  cursor: pointer;

  &:hover {
    background: #3733E9;
  }

  &:active {
    background: #2B28CA;
  }
`
const YujinButton03 = styled.button`
  width: 200px;
  height: 50px;
  background: #fff;
  color: #ED4D4D;
  border: none;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #ED4D4D;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: .3s;
  }

  &:hover::before {
    width: 100%;
  }
`
