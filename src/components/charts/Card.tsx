import styled from "styled-components";

interface cardProps {
    title: string,
    stockNumber: number
}

const Card = ({title, stockNumber}: cardProps) => {
    return (
        <CardContainer>
            <CardTexts>
                <p>{title}</p>
                <h2>{stockNumber}</h2>
            </CardTexts>
        </CardContainer>
    )

}
const CardContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #828A95;
  width: 20vw;
  border-radius: 0.6rem;
`

const CardTexts = styled.div`
  text-align: center;
  color: #29339B;
  h2 {
    font-size: 48px;
  }
  p {
    font-size: 28px;
  }
`
export default Card
