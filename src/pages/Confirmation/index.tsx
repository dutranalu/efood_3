import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../../styles/theme'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'

const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.75);
  z-index: 40;
`

const Box = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(760px, calc(100% - 32px));
  background: ${colors.salmon};
  color: ${colors.cream};
  padding: 32px;
  z-index: 50;
`

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 900;
`

const P = styled.p`
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 22px;
`

const OutlineButton = styled(Button)`
  background: #FFEBD9;
  color: ${colors.salmon};
  border-radius: 0;
  width: 100%;
  margin-top: 16px;
`

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Confirmation() {
  const location = useLocation()
  const state = location.state as { response?: any; total?: number } | null

  const response = state?.response
  const total = state?.total ?? 0
  const orderId =
    response?.orderId ?? response?.id ?? response?.pedidoId ?? response?.order_id ?? response?.orderID

  return (
    <>
      <Dim />
      <Box>
        <Title>Pedido realizado - {orderId ? `#${String(orderId)}` : 'sucesso'}</Title>
        <P>
          Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço informado.
        </P>
        <P><strong>Valor total:</strong> {formatBRL(total)}</P>
        <P>
          Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
        </P>
        <P>Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!</P>

        <Link to="/">
          <OutlineButton>Concluir</OutlineButton>
        </Link>
      </Box>
      <Container />
    </>
  )
}
