import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from './ui/Container'
import { colors } from '../styles/theme'
import pattern from '../assets/fundo.png'
import logo from '../assets/logo-efood.png'
import { useAppSelector } from '../app/hooks'

const Bar = styled.header`
  background: url(${pattern}) repeat;
  padding: 26px 0;
`

const Row = styled.div<{ $hasLogo: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$hasLogo ? '1fr auto 1fr' : '1fr auto')};
  align-items: center;
  gap: 16px;
`

const Left = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: ${colors.salmon};
`

const Logo = styled(Link)`
  justify-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const LogoImg = styled.img`
  width: 125px;
  height: 57.5px;
  display: block;
`

const Right = styled(Link)`
  justify-self: end;
  font-size: 18px;
  font-weight: 900;
  color: ${colors.salmon};
`

export default function Header() {
  const items = useAppSelector((s) => s.cart.items)
  const qty = items.reduce((acc, i) => acc + i.qty, 0)
  const location = useLocation()
  const showLogo = location.pathname !== '/'

  return (
    <Bar>
      <Container>
        <Row $hasLogo={showLogo}>
          <Left>{location.pathname === '/' ? 'Restaurantes' : <Link to="/">Restaurantes</Link>}</Left>
          {showLogo && (
            <Logo to="/">
              <LogoImg src={logo} alt="efood" />
            </Logo>
          )}
          <Right to="/carrinho">{qty} produto(s) no carrinho</Right>
        </Row>
      </Container>
    </Bar>
  )
}

