# Galaxy Watch 7 - Landing Page

Landing page premium para o Galaxy Watch 7, com foco em experiencia visual imersiva e interacoes fluidas.

## Sobre o Projeto

Site institucional que apresenta o Galaxy Watch 7 atraves de secoes interativas com animacoes scroll-driven, video scrubbing e galeria 3D. Construido com tecnologias modernas para entregar performance e qualidade visual em qualquer dispositivo.

## Secoes

- **Hero** — Video scrubbing sincronizado ao scroll com extracao de frames em tempo real
- **Tecnologia** — Grid bento com cards de features e efeito parallax no hover
- **Design** — Galeria circular WebGL com navegacao por arraste, exibindo o relogio em multiplos angulos
- **Footer** — CTA com banner panoramico e navegacao completa

## Stack

- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **GSAP** + ScrollTrigger (animacoes e scroll-driven interactions)
- **Lenis** (smooth scroll)
- **OGL** (galeria WebGL)

## Rodando Localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Performance

- Imagens otimizadas com AVIF/WebP automatico via Next.js Image
- Video com resolucao adaptativa ate 1920px
- Font display swap em todas as fontes
- Animacoes com `will-change` e GPU acceleration
- Compressao ativa e cache de longa duracao para assets estaticos

## Deploy

Compativel com Vercel, Netlify ou qualquer plataforma que suporte Next.js.
