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
  width: 320px;
  height: 338px;
  grid-template-rows: 167px 19px 88px 24px;
`

const Img = styled.img`
  width: 304px;
  height: 167px;
  object-fit: cover;
`

const Title = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 900;
  width: 304px;
  height: 19px;
  line-height: 19px;
`

const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  height: 88px;
  width: 304px;
  overflow: hidden;
`

const Action = styled.button`
  background: #FFEBD9;
  color: ${colors.salmon};
  border: 0;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 304px;
  height: 24px;
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
