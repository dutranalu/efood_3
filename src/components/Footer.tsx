import styled from 'styled-components'
import { Container } from './ui/Container'
import { colors } from '../styles/theme'
import pattern from '../assets/fundo.png'

const Wrap = styled.footer`
  margin-top: 120px;
  padding: 40px 0 56px;
  background: url(${pattern}) repeat;
`

export default function Footer() {
  return (
    <Wrap>
      <Container>
        <div style={{ display: 'grid', justifyItems: 'center', gap: 12, color: colors.salmon }}>
          <div style={{ border: `2px solid ${colors.salmon}`, padding: '6px 14px', fontWeight: 900 }}>
            efood 🍴
          </div>
          <small style={{ color: colors.muted, textAlign: 'center', maxWidth: 520 }}>
            A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega,
            qualidade dos produtos é toda do estabelecimento contratado.
          </small>
        </div>
      </Container>
    </Wrap>
  )
}
