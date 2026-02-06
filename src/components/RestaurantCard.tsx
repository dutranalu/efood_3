import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { Restaurant } from '../features/api/types'
import { colors } from '../styles/theme'

const Wrap = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.salmon};
`

const Cover = styled.div<{ img: string }>`
  height: 217px;
  background-image: url(${(p) => p.img});
  background-size: cover;
  background-position: center;
  position: relative;
`

const Tag = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${colors.salmon};
  color: ${colors.cream};
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 700;
`

const Body = styled.div`
  padding: 8px;
  display: grid;
  gap: 8px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${colors.salmon};
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${colors.salmon};
  font-weight: 700;
`

const Desc = styled.p`
  margin: 0;
  color: ${colors.salmon};
  font-size: 14px;
  line-height: 22px;
  opacity: .9;
`

const SaibaMais = styled(Link)`
  background: ${colors.salmon};
  color: ${colors.cream};
  padding: 6px 8px;
  font-size: 12px;
  font-weight: 700;
  width: fit-content;
`

export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Wrap>
      <Cover img={r.capa}>
        {r.destacado ? <Tag>Destaque da semana</Tag> : <Tag>{r.tipo}</Tag>}
      </Cover>
      <Body>
        <Top>
          <Title>{r.titulo}</Title>
          <Rating>{r.avaliacao} ⭐</Rating>
        </Top>
        <Desc>{r.descricao}</Desc>
        <SaibaMais to={`/restaurante/${r.id}`}>Saiba mais</SaibaMais>
      </Body>
    </Wrap>
  )
}
