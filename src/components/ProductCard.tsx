import styled from 'styled-components'
import type { Product } from '../features/api/types'
import { colors } from '../styles/theme'

const Wrap = styled.div`
  background: ${colors.salmon};
  border: 1px solid ${colors.salmon};
  padding: 8px;
  color: ${colors.cream};
  display: grid;
  gap: 8px;
`

const Img = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
`

const Title = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 900;
`

const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  min-height: 66px;
`

const Action = styled.button`
  background: #FFEBD9;
  color: ${colors.salmon};
  border: 0;
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`

export default function ProductCard({ p, onBuy }: { p: Product; onBuy: () => void }) {
  return (
    <Wrap>
      <Img src={p.foto} alt={p.nome} />
      <Title>{p.nome}</Title>
      <Desc>{p.descricao}</Desc>
      <Action onClick={onBuy}>Adicionar ao carrinho</Action>
    </Wrap>
  )
}
