import styled from "styled-components";

interface sellerCardProps {
    title: string
    name: string
}

const BoxCard = ({title, name}: sellerCardProps) => {
    return (
        <CardContainer>
            <CardTexts>
                <p>{title}</p>
                <h2>{name}</h2>
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
export default BoxCard
