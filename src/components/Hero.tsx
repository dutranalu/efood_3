import styled from 'styled-components'
import hero from '../assets/Hero.png'

const Wrap = styled.section`
  background-image: url(${hero});
  background-size: cover;
  background-position: center;
  height: 384px;
  margin-bottom: 80px;
  position: relative;

  @media (max-width: 600px) {
    height: 260px;
    margin-bottom: 40px;
  }
`

export default function Hero() {
  return <Wrap aria-label="Hero" />
}
