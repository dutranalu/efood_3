import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { colors } from '../../styles/theme'
import { Button } from '../../components/ui/Button'
import { Container } from '../../components/ui/Container'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearCart } from '../../features/cart/cartSlice'
import { useCheckoutMutation } from '../../features/api/efoodApi'
import type { CheckoutBody } from '../../features/api/types'

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

const Title = styled.h3`
  margin: 0 0 12px;
  color: ${colors.cream};
  font-size: 16px;
  font-weight: 900;
`

const Field = styled.label`
  display: grid;
  gap: 6px;
  margin-bottom: 8px;
  color: ${colors.cream};
  font-size: 12px;
  font-weight: 700;

  input {
    width: 100%;
    padding: 10px 8px;
    border: 0;
    border-radius: 0;
    outline: none;
    background: #FFEBD9;
  }
`

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

const OutlineButton = styled(Button)`
  width: 100%;
  background: #FFEBD9;
  color: ${colors.salmon};
  border-radius: 0;
  margin-top: 8px;
`

function onlyDigits(s: string) {
  return s.replace(/\D/g, '')
}
function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

type Step = 'delivery' | 'payment'

export default function Checkout() {
  const items = useAppSelector((s) => s.cart.items)
  const total = useMemo(() => items.reduce((acc, i) => acc + i.preco * i.qty, 0), [items])

  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const [checkout, { isLoading }] = useCheckoutMutation()

  const [step, setStep] = useState<Step>('delivery')
  const [form, setForm] = useState({
    receiver: 'João Paulo de Souza',
    address: '',
    city: '',
    zip: '',
    number: '',
    complement: '',
    cardName: 'João Paulo de Souza',
    cardNumber: '',
    cardCode: '',
    expMonth: '',
    expYear: ''
  })

  if (items.length === 0) {
    return (
      <>
        <Dim />
        <Sidebar>
          <Title>Entrega</Title>
          <p style={{ color: colors.cream }}>Seu carrinho está vazio.</p>
          <OutlineButton onClick={() => nav('/')}>Voltar</OutlineButton>
        </Sidebar>
        <Container />
      </>
    )
  }

  async function finalize() {
    const body: CheckoutBody = {
      products: items.map((i) => ({ id: i.id, price: i.preco })),
      delivery: {
        receiver: form.receiver,
        address: {
          description: form.address,
          city: form.city,
          zipCode: form.zip,
          number: Number(form.number),
          complement: form.complement || undefined
        }
      },
      payment: {
        card: {
          name: form.cardName,
          number: onlyDigits(form.cardNumber),
          code: Number(form.cardCode),
          expires: { month: Number(form.expMonth), year: Number(form.expYear) }
        }
      }
    }

    try {
      const res = await checkout(body).unwrap()
      dispatch(clearCart())
      nav('/confirmacao', { state: { response: res, total } })
    } catch {
      alert('Erro ao finalizar pedido. Verifique os campos e tente novamente.')
    }
  }

  return (
    <>
      <Dim />
      <Sidebar aria-label="Entrega e pagamento">
        {step === 'delivery' ? (
          <>
            <Title>Entrega</Title>

            <Field>
              Quem irá receber
              <input value={form.receiver} onChange={(e) => setForm({ ...form, receiver: e.target.value })} />
            </Field>

            <Field>
              Endereço
              <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>

            <Field>
              Cidade
              <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </Field>

            <Row2>
              <Field>
                CEP
                <input value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
              </Field>
              <Field>
                Número
                <input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
              </Field>
            </Row2>

            <Field>
              Complemento (opcional)
              <input value={form.complement} onChange={(e) => setForm({ ...form, complement: e.target.value })} />
            </Field>

            <OutlineButton onClick={() => setStep('payment')}>
              Continuar com o pagamento
            </OutlineButton>

            <OutlineButton onClick={() => nav('/carrinho')}>
              Voltar para o carrinho
            </OutlineButton>
          </>
        ) : (
          <>
            <Title>Pagamento - Valor a pagar {formatBRL(total)}</Title>

            <Field>
              Nome no cartão
              <input value={form.cardName} onChange={(e) => setForm({ ...form, cardName: e.target.value })} />
            </Field>

            <Row2>
              <Field>
                Número do cartão
                <input value={form.cardNumber} onChange={(e) => setForm({ ...form, cardNumber: e.target.value })} />
              </Field>
              <Field>
                CVV
                <input value={form.cardCode} onChange={(e) => setForm({ ...form, cardCode: e.target.value })} />
              </Field>
            </Row2>

            <Row2>
              <Field>
                Mês de vencimento
                <input value={form.expMonth} onChange={(e) => setForm({ ...form, expMonth: e.target.value })} />
              </Field>
              <Field>
                Ano de vencimento
                <input value={form.expYear} onChange={(e) => setForm({ ...form, expYear: e.target.value })} />
              </Field>
            </Row2>

            <OutlineButton onClick={finalize} disabled={isLoading}>
              {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
            </OutlineButton>

            <OutlineButton onClick={() => setStep('delivery')}>
              Voltar para a edição de endereço
            </OutlineButton>
          </>
        )}
      </Sidebar>
      <Container />
    </>
  )
}
