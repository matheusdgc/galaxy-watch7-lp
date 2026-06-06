# Galaxy Watch 7 - Landing Page

Landing page premium para o Galaxy Watch 7, com foco em experiencia visual imersiva e interacoes fluidas.

**Live:** [galaxy-watch7-lp.vercel.app](https://galaxy-watch7-lp.vercel.app)

## Sobre o Projeto

Site institucional que apresenta o Galaxy Watch 7 atraves de secoes interativas com animacoes scroll-driven, frame scrubbing e galeria 3D. Construido com tecnologias modernas para entregar performance e qualidade visual em qualquer dispositivo.

## Secoes

- **Hero** — Frame scrubbing sincronizado ao scroll com 96 frames WebP pre-extraidos via FFmpeg
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
- **FFmpeg** (extracao de frames em build time)

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

### Extrair frames do video (requer FFmpeg)

```bash
ffmpeg -i public/relogio-video2.mp4 -vf "fps=12,scale=1280:-2" -c:v libwebp -quality 75 public/frames/frame_%03d.webp
```

## Performance

- **Frames pre-extraidos** — 96 WebP a 1280px (5.2MB total vs 15.3MB do MP4 original)
- Cada frame cacheado individualmente pela CDN (Cache-Control: immutable, 1 ano)
- Sem dependencia de `<video>` — funciona em todos os browsers incluindo iOS Safari
- Carregamento paralelo via HTTP/2 multiplexing
- Imagens otimizadas com AVIF/WebP automatico via Next.js Image
- Font display swap em todas as fontes
- Animacoes com `will-change` e GPU acceleration (blur desabilitado no mobile)
- DPR do canvas limitado a 2x para evitar overhead em dispositivos high-DPI
- Compressao ativa e `poweredByHeader` desabilitado

## Deploy

Hospedado na **Vercel**. Push para `main` faz deploy automatico.
