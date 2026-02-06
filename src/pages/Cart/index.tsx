import styled from 'styled-components'
import { Container } from '../../components/ui/Container'
import { Button } from '../../components/ui/Button'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeItem } from '../../features/cart/cartSlice'
import bin from '../../assets/lixeira-de-reciclagem 1.png'
import { Link, useNavigate } from 'react-router-dom'
import { colors } from '../../styles/theme'

const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.75);
  z-index: 40;
`

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 360px;
  background: ${colors.salmon};
  padding: 32px 16px;
  z-index: 50;
  overflow: auto;
`

const List = styled.div`
  display: grid;
  gap: 16px;
`

const Item = styled.div`
  background: #FFEBD9;
  color: ${colors.salmon};
  padding: 8px;
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  align-items: start;
`

const Img = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`

const Trash = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: 0;
  cursor: pointer;
`

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${colors.cream};
  font-weight: 700;
  margin: 24px 0 12px;
  font-size: 12px;
`

const OutlineButton = styled(Button)`
  width: 100%;
  background: #FFEBD9;
  color: ${colors.salmon};
  border-radius: 0;
`

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Cart() {
  const items = useAppSelector((s) => s.cart.items)
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const total = items.reduce((acc, i) => acc + i.preco * i.qty, 0)

  return (
    <>
      <Dim />
      <Sidebar aria-label="Carrinho">
        {items.length === 0 ? (
          <>
            <p style={{ color: colors.cream, marginTop: 0 }}>Seu carrinho está vazio.</p>
            <Link to="/"><OutlineButton>Voltar para restaurantes</OutlineButton></Link>
          </>
        ) : (
          <>
            <List>
              {items.map((i) => (
                <Item key={i.id}>
                  <Trash onClick={() => dispatch(removeItem(i.id))} aria-label="Remover">
                    <img src={bin} alt="" />
                  </Trash>

                  <Img src={i.foto} alt={i.nome} />
                  <div style={{ display: 'grid', gap: 6 }}>
                    <strong style={{ fontSize: 18, lineHeight: '21px' }}>{i.nome}</strong>
                    <small style={{ color: colors.salmon, fontWeight: 700 }}>
                      {formatBRL(i.preco)}
                    </small>
                  </div>
                </Item>
              ))}
            </List>

            <TotalRow>
              <span>Valor total</span>
              <span>{formatBRL(total)}</span>
            </TotalRow>

            <OutlineButton onClick={() => nav('/entrega')}>
              Continuar com a entrega
            </OutlineButton>
          </>
        )}
      </Sidebar>
      <Container />
    </>
  )
}
