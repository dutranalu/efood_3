import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../../components/ui/Container'
import { useGetRestaurantByIdQuery } from '../../features/api/efoodApi'
import ProductCard from '../../components/ProductCard'
import { Modal, ModalLayout } from '../../components/Modal'
import type { Product } from '../../features/api/types'
import { useAppDispatch } from '../../app/hooks'
import { addItem } from '../../features/cart/cartSlice'
import { colors } from '../../styles/theme'

const Banner = styled.div<{ img: string }>`
  height: 240px;
  background-image: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${(p) => p.img});
  background-size: cover;
  background-position: center;
`

const BannerInner = styled.div`
  height: 100%;
  display: grid;
  align-content: space-between;
  padding: 24px 0 32px;
  gap: 8px;
  color: ${colors.white};
`

const Cuisine = styled.span`
  font-size: 20px;
  font-weight: 100;
`

const Name = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 900;
`

const Grid = styled.div`
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 32px;
  justify-content: center;

  @media (max-width: 980px) { grid-template-columns: repeat(2, 320px); }
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`

const AddBtn = styled.button`
  background: #FFEBD9;
  color: ${colors.salmon};
  border: 0;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  max-width: 218px;
  height: 24px;
`

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Restaurant() {
  const params = useParams()
  const id = useMemo(() => Number(params.id), [params.id])
  const { data, isLoading } = useGetRestaurantByIdQuery(id)
  const dispatch = useAppDispatch()

  const [selected, setSelected] = useState<Product | null>(null)

  if (isLoading) return <Container><p style={{ color: colors.muted }}>Carregando...</p></Container>
  if (!data) return <Container><p style={{ color: colors.muted }}>Restaurante não encontrado.</p></Container>

  return (
    <>
      <Banner img={data.capa}>
        <Container>
          <BannerInner>
            <Cuisine>{data.tipo}</Cuisine>
            <Name>{data.titulo}</Name>
          </BannerInner>
        </Container>
      </Banner>

      <Container>
        <Grid>
          {data.cardapio.map((p) => (
            <ProductCard key={p.id} p={p} onBuy={() => setSelected(p)} />
          ))}
        </Grid>

        <Modal open={!!selected} title={selected?.nome ?? ''} onClose={() => setSelected(null)}>
          {selected && (
            <ModalLayout img={selected.foto}>
              <p style={{ margin: 0 }}>{selected.descricao}</p>
              <p style={{ margin: 0 }}><strong>Serve:</strong> {selected.porcao}</p>
              <AddBtn onClick={() => { dispatch(addItem({ product: selected, restaurantId: data.id })); setSelected(null) }}>
                Adicionar ao carrinho - {formatBRL(selected.preco)}
              </AddBtn>
            </ModalLayout>
          )}
        </Modal>
      </Container>
    </>
  )
}
