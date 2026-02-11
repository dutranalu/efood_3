import styled from 'styled-components'
import { Container } from '../../components/ui/Container'
import Hero from '../../components/Hero'
import RestaurantCard from '../../components/RestaurantCard'
import { useGetRestaurantsQuery } from '../../features/api/efoodApi'
import { colors } from '../../styles/theme'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px 80px;

  @media (max-width: 980px) { grid-template-columns: 1fr; gap: 32px; }
`

export default function Home() {
  const { data, isLoading, isError } = useGetRestaurantsQuery()

  return (
    <>
      <Hero />
      <Container>
        {isLoading && <p style={{ color: colors.muted }}>Carregando...</p>}
        {isError && <p style={{ color: colors.muted }}>Erro ao carregar restaurantes.</p>}
        {data && (
          <Grid>
            {data.map((r) => <RestaurantCard key={r.id} r={r} />)}
          </Grid>
        )}
      </Container>
    </>
  )
}

