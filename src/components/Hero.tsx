import styled from 'styled-components'
import { colors } from '../styles/theme'
import pattern from '../assets/fundo.png'
import logo from '../assets/logo-efood.png'

const Wrap = styled.section`
  background: url(${pattern}) repeat;
  height: 384px;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 600px) {
    height: 260px;
    margin-bottom: 40px;
  }
`

const Stack = styled.div`
  display: grid;
  justify-items: center;
  gap: 24px;
  padding: 24px 16px;
`

const LogoImg = styled.img`
  width: 125px;
  height: 57.5px;
  display: block;
`

const Title = styled.h1`
  margin: 0;
  max-width: 640px;
  color: ${colors.salmon};
  font-size: 36px;
  font-weight: 900;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`

export default function Hero() {
  return (
    <Wrap aria-label="Hero">
      <Stack>
        <LogoImg src={logo} alt="efood" />
        <Title>Viva experiências gastronômicas no conforto da sua casa</Title>
      </Stack>
    </Wrap>
  )
}
