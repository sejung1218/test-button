import styled from '@emotion/styled';
import One from "@/components/one";

interface ButtonState {
  userAgentPk: string;
  isEmonSend: boolean;
}

export default function Nine(props: ButtonState) {

  return (
    <TestButtonWrapper>
      <GridContainer>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>

        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>

        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
        <One isEmonSend={props.isEmonSend} userAgentPk={props.userAgentPk}/>
      </GridContainer>
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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열, 각 열의 너비를 균등하게 */
  grid-template-rows: repeat(3, 1fr); /* 3개의 행, 각 행의 높이를 균등하게 */
  gap: 120px; /* 그리드 아이템 사이의 간격 */
  max-width: 900px; /* 그리드 컨테이너의 최대 너비 */
  margin: 0 auto; /* 가운데 정렬을 위한 마진 설정 */
`;


