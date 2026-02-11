import styled from 'styled-components'
import { Container } from './ui/Container'
import { colors } from '../styles/theme'
import logo from '../assets/logo-efood.png'

const Wrap = styled.footer`
  margin-top: 120px;
  padding: 40px 0 56px;
  background: #FFEBD9;
`

const Stack = styled.div`
  display: grid;
  justify-items: center;
  gap: 12px;
  color: ${colors.salmon};
`

const LogoImg = styled.img`
  width: 125px;
  height: auto;
  display: block;
`

const Socials = styled.ul`
  list-style: none;
  padding: 0;
  margin: 8px 0 24px;
  display: flex;
  gap: 8px;
`

const SocialLink = styled.a`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${colors.salmon};
  border-radius: 50%;
`

const SocialIcon = styled.svg`
  width: 12px;
  height: 12px;
  fill: ${colors.cream};
`

const Copy = styled.small`
  color: ${colors.salmon};
  text-align: center;
  max-width: 480px;
  font-family: Roboto, sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 1;
`

export default function Footer() {
  return (
    <Wrap>
      <Container>
        <Stack>
          <LogoImg src={logo} alt="efood" />
          <Socials aria-label="Redes sociais">
            <li>
              <SocialLink href="https://www.instagram.com" aria-label="Instagram">
                <SocialIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zm4.3-3.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
                </SocialIcon>
              </SocialLink>
            </li>
            <li>
              <SocialLink href="https://www.facebook.com" aria-label="Facebook">
                <SocialIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13 9h3V6h-3a4 4 0 0 0-4 4v3H6v3h3v5h3v-5h3l1-3h-4v-3a1 1 0 0 1 1-1z" />
                </SocialIcon>
              </SocialLink>
            </li>
            <li>
              <SocialLink href="https://www.twitter.com" aria-label="Twitter">
                <SocialIcon viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.9 7.1c0 .2 0 .4-.1.6A7.7 7.7 0 0 1 4.6 14a5.4 5.4 0 0 0 4-1.1 2.7 2.7 0 0 1-2.5-1.9 2.8 2.8 0 0 0 1.2 0 2.7 2.7 0 0 1-2.1-2.6 2.6 2.6 0 0 0 1.2.3A2.7 2.7 0 0 1 5.2 4.9a7.7 7.7 0 0 0 5.6 2.8 2.7 2.7 0 0 1 4.6-2.5 5.4 5.4 0 0 0 1.7-.6 2.7 2.7 0 0 1-1.2 1.5 5.4 5.4 0 0 0 1.6-.4 5.4 5.4 0 0 1-1.6 1.4z" />
                </SocialIcon>
              </SocialLink>
            </li>
          </Socials>
          <Copy>
            A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega,
            qualidade dos produtos é toda do estabelecimento contratado.
          </Copy>
        </Stack>
      </Container>
    </Wrap>
  )
}
