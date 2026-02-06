import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from './ui/Container'
import { colors } from '../styles/theme'
import pattern from '../assets/fundo.png'
import { useAppSelector } from '../app/hooks'

const Bar = styled.header`
  background: url(${pattern}) repeat;
  padding: 26px 0;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;
`

const Left = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: ${colors.salmon};
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

  return (
    <Bar>
      <Container>
        <Row>
          <Left>{location.pathname === '/' ? 'Restaurantes' : <Link to="/">Restaurantes</Link>}</Left>
          <Right to="/carrinho">{qty} produto(s) no carrinho</Right>
        </Row>
      </Container>
    </Bar>
  )
}

