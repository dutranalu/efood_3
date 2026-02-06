import styled from 'styled-components'
import { colors } from '../styles/theme'

const Dim = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.8);
  z-index: 40;
`

const Box = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: min(1024px, calc(100% - 64px));
  background: ${colors.salmon};
  color: ${colors.cream};
  padding: 32px;
  z-index: 50;
  border: 1px solid rgba(0,0,0,.25);
`

const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: 0;
  color: ${colors.cream};
  font-size: 22px;
  cursor: pointer;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  @media (max-width: 720px) { grid-template-columns: 1fr; }
`

const Img = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;

  @media (max-width: 720px) { width: 100%; }
`

export function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null
  return (
    <>
      <Dim onClick={onClose} />
      <Box>
        <Close onClick={onClose} aria-label="Fechar">×</Close>
        <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 18, fontWeight: 900 }}>{title}</h2>
        {children}
      </Box>
    </>
  )
}

export function ModalLayout({ img, children }: { img: string; children: React.ReactNode }) {
  return (
    <Grid>
      <Img src={img} alt="" />
      <div style={{ display: 'grid', gap: 12, fontSize: 14, lineHeight: '22px' }}>{children}</div>
    </Grid>
  )
}
