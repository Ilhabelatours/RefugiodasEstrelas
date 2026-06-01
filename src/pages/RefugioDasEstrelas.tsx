import { useState, useEffect } from 'react';
import {
  Star, MapPin, ChevronDown, ChevronLeft, ChevronRight,
  Waves, Sun, Leaf, Wind, Calendar, ArrowRight,
  Instagram, MessageCircle, Eye, TreePine, Home, Menu, X,
  Clock, Check, ExternalLink, Wifi, Coffee,
  Anchor, Compass,
} from 'lucide-react';

type LucideIcon = typeof Star;

interface Suite {
  id: number;
  nome: string;
  sub: string;
  descricao: string;
  capacidade: string;
  tamanho: string;
  preco: string;
  unidade: string;
  imagem: string;
  comodidades: string[];
  destaque: boolean;
}

interface Experiencia {
  icon: LucideIcon;
  cor: string;
  titulo: string;
  descricao: string;
}

interface GaleriaItem {
  url: string;
  cat: string;
  label: string;
}

interface Avaliacao {
  nome: string;
  origem: string;
  nota: number;
  texto: string;
  data: string;
  avatar: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SUITES: Suite[] = [
  {
    id: 1,
    nome: 'Suíte Vista Mar',
    sub: '180° para o mar de São Sebastião',
    descricao: 'A suíte mais procurada da pousada. Sacada privativa com espreguiçadeiras, cama king-size, banheira de imersão e décor em tons de areia e azul oceânico.',
    capacidade: '2 adultos',
    tamanho: '45 m²',
    preco: 'A partir de R$ 890',
    unidade: '/noite',
    imagem: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=900',
    comodidades: ['King-size', 'Banheira', 'Sacada privativa', 'Vista mar', 'Ar-condicionado', 'Smart TV', 'Frigobar', 'Wi-Fi'],
    destaque: true,
  },
  {
    id: 2,
    nome: 'Suíte Jardim',
    sub: 'Imersão na Mata Atlântica',
    descricao: 'Rodeada pela vegetação nativa preservada, com jardim privativo e ducha outdoor. O despertar com os pássaros da Mata Atlântica é algo que não tem preço.',
    capacidade: '2 adultos',
    tamanho: '38 m²',
    preco: 'A partir de R$ 720',
    unidade: '/noite',
    imagem: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900',
    comodidades: ['Queen-size', 'Jardim privativo', 'Ducha outdoor', 'Ar-condicionado', 'Smart TV', 'Frigobar', 'Wi-Fi'],
    destaque: false,
  },
  {
    id: 3,
    nome: 'Master Suite Estrelas',
    sub: 'Dormir sob as estrelas de Ilhabela',
    descricao: 'Nossa suíte flagship. Teto de vidro retrátil para observação do céu estrelado, hidromassagem, sala de estar integrada e serviço de mordomia 24h.',
    capacidade: '2 adultos',
    tamanho: '68 m²',
    preco: 'A partir de R$ 1.490',
    unidade: '/noite',
    imagem: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',
    comodidades: ['King-size', 'Hidromassagem', 'Teto de vidro', 'Sala integrada', 'Mordomia 24h', 'Smart TV', 'Frigobar premium', 'Wi-Fi'],
    destaque: true,
  },
  {
    id: 4,
    nome: 'Chalé da Mata',
    sub: 'Privacidade total na natureza',
    descricao: 'Chalé independente com varanda hammock, trilha privativa e chuveiro de balde ao ar livre. Perfeito para casais que buscam isolamento total na natureza de Ilhabela.',
    capacidade: '2–3 adultos',
    tamanho: '52 m²',
    preco: 'A partir de R$ 980',
    unidade: '/noite',
    imagem: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=900',
    comodidades: ['Queen-size', 'Sofá-cama', 'Varanda hammock', 'Trilha privativa', 'Ar-condicionado', 'Frigobar', 'Wi-Fi'],
    destaque: false,
  },
];

const EXPERIENCIAS: Experiencia[] = [
  { icon: Eye,    cor: '#0891b2', titulo: 'Vista Panorâmica',      descricao: 'Vista de 180° para o mar de São Sebastião. O mar de Ilhabela em toda a sua grandiosidade, do amanhecer ao entardecer.' },
  { icon: Waves,  cor: '#0ea5e9', titulo: 'Piscina Aquecida',      descricao: 'Piscina aquecida posicionada para se fundir com o horizonte do mar. O reflexo do azul é simplesmente hipnótico.' },
  { icon: Sun,    cor: '#f59e0b', titulo: 'Pôr do Sol Épico',      descricao: 'Posicionamento oeste privilegiado. Os céus de Ilhabela ao entardecer são um espetáculo que se renova a cada dia.' },
  { icon: Leaf,   cor: '#16a34a', titulo: 'Mata Atlântica Nativa', descricao: 'Cercada por floresta preservada, a pousada convive harmoniosamente com a biodiversidade única de Ilhabela.' },
  { icon: Star,   cor: '#f59e0b', titulo: 'Atendimento Exclusivo', descricao: 'Apenas 4 suítes. Cada hóspede recebe atenção personalizada — de traslados ao cardápio do café da manhã.' },
  { icon: Anchor, cor: '#0891b2', titulo: 'Acesso ao Mar',         descricao: 'A 5 minutos das melhores praias e do pier de Ilhabela. Passeios de barco e mergulho organizados sob consulta.' },
];

const GALERIA_ITEMS: GaleriaItem[] = [
  { url: 'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=900', cat: 'Vista',      label: 'Mar de São Sebastião' },
  { url: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=900',  cat: 'Piscina',    label: 'Piscina com vista para o mar' },
  { url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=900',  cat: 'Vista',      label: 'Vista panorâmica ao amanhecer' },
  { url: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Suítes',     label: 'Suíte Vista Mar' },
  { url: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Piscina',    label: 'Deck ao entardecer' },
  { url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900',  cat: 'Suítes',     label: 'Suíte Jardim' },
  { url: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=900',  cat: 'Natureza',   label: 'Mata Atlântica preservada' },
  { url: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Pôr do Sol', label: 'Entardecer sobre o mar' },
  { url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Suítes',     label: 'Master Suite Estrelas' },
  { url: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Pôr do Sol', label: 'Cores do entardecer' },
  { url: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Natureza',   label: 'Trilhas e cachoeiras' },
  { url: 'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=900',cat: 'Suítes',     label: 'Chalé da Mata' },
];

const FILTROS = ['Todas', 'Vista', 'Piscina', 'Suítes', 'Natureza', 'Pôr do Sol'];

const AVALIACOES: Avaliacao[] = [
  {
    nome: 'Fernanda & Lucas',
    origem: 'São Paulo, SP',
    nota: 5,
    texto: 'A vista é exatamente como nas fotos — de tirar o fôlego. Acordar com o mar de Ilhabela bem na frente da sacada é uma sensação que não tem preço. Voltaremos com certeza.',
    data: 'Março 2026',
    avatar: 'FL',
  },
  {
    nome: 'Ricardo Monteiro',
    origem: 'Curitiba, PR',
    nota: 5,
    texto: 'Fiz surpresa para minha esposa no aniversário de casamento. O atendimento foi impecável — quarto com flores, espumante e carta personalizada. Superou todas as expectativas.',
    data: 'Fevereiro 2026',
    avatar: 'RM',
  },
  {
    nome: 'Carolina Fonseca',
    origem: 'Rio de Janeiro, RJ',
    nota: 5,
    texto: 'A Master Suite Estrelas é mágica. Dormir com o teto de vidro observando o céu estrelado de Ilhabela é uma experiência que não existe em lugar nenhum. Absolutamente único.',
    data: 'Janeiro 2026',
    avatar: 'CF',
  },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function TropicalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/50" />
      <Star className="w-3 h-3 text-cyan-500 fill-cyan-500" />
      <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/50" />
    </div>
  );
}

function Eyebrow({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <p className={`flex items-center justify-center gap-2 tracking-[0.25em] uppercase text-xs font-bold mb-4 ${onDark ? 'text-cyan-300' : 'text-cyan-600'}`}>
      <span className={`w-6 h-px ${onDark ? 'bg-cyan-400/50' : 'bg-cyan-400/60'}`} />
      {children}
      <span className={`w-6 h-px ${onDark ? 'bg-cyan-400/50' : 'bg-cyan-400/60'}`} />
    </p>
  );
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

function NavBar({ scrollY }: { scrollY: number }) {
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 80;

  const links: [string, string][] = [
    ['Experiência', '#experiencia'],
    ['Suítes', '#suites'],
    ['Piscina', '#piscina'],
    ['Galeria', '#galeria'],
    ['Localização', '#localizacao'],
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/97 backdrop-blur-lg border-b border-cyan-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/LOGOTIPO_REFUGUI.png"
            alt="Refúgio das Estrelas"
            className="h-10 w-10 rounded-full object-cover shadow-sm"
          />
          <div className="hidden sm:block leading-tight">
            <p className={`text-[10px] font-bold tracking-[0.22em] uppercase leading-none mb-0.5 ${scrolled ? 'text-slate-400' : 'text-white/70'}`}>
              Pousada
            </p>
            <p
              style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.1rem', color: scrolled ? '#0e6b8a' : '#ffffff' }}
            >
              Refúgio das Estrelas
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`text-[11px] tracking-widest uppercase font-semibold transition-colors duration-200 ${
                scrolled ? 'text-slate-500 hover:text-cyan-600' : 'text-white/80 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#reservas"
            className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white text-[11px] font-bold tracking-wider uppercase transition-all duration-200 rounded-full shadow-md hover:shadow-lg hover:shadow-cyan-300/40"
          >
            Reservar
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className={`lg:hidden transition-colors ${scrolled ? 'text-slate-600' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-cyan-100 px-6 py-6 space-y-1 shadow-lg">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-slate-600 hover:text-cyan-600 text-sm tracking-widest uppercase py-3 border-b border-slate-100 transition-colors font-semibold"
            >
              {label}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-5 py-3.5 bg-cyan-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-md"
          >
            Reservar Agora
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ scrollY }: { scrollY: number }) {
  return (
    <section id="inicio" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.12)` }}
      >
        <img
          src="https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="Vista panorâmica do mar de São Sebastião — Ilhabela"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#074055]/55 via-[#063850]/50 to-[#041f2e]/85" />
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Hero content — single flex column, no absolute positioning conflicts */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pb-28">
        {/* Logo */}
        <div className="animate-hero-logo mb-5">
          <img
            src="/LOGOTIPO_REFUGUI.png"
            alt="Logo Refúgio das Estrelas"
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-full object-cover shadow-2xl ring-4 ring-white/40"
          />
        </div>

        {/* Location badge */}
        <div className="animate-hero-badge mb-5 flex items-center gap-2.5 border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shrink-0" />
          <span className="text-white/90 tracking-[0.2em] uppercase text-xs font-bold">
            Ilhabela · São Paulo · Brasil
          </span>
        </div>

        {/* Title */}
        <h1
          className="animate-hero-title text-white leading-none mb-3"
          style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: 'clamp(2.8rem, 9vw, 7rem)',
            textShadow: '0 4px 32px rgba(4,31,46,0.7)',
          }}
        >
          Refúgio das Estrelas
        </h1>

        {/* Subtitle */}
        <p
          className="animate-hero-sub font-bold mb-2 tracking-[0.22em] uppercase text-xs sm:text-sm"
          style={{ color: '#a5f3fc' }}
        >
          Pousada Premium · Ilhabela - Brasil
        </p>
        <p className="animate-hero-sub text-white/65 font-light mb-10 max-w-md tracking-wide text-sm">
          A melhor vista de Ilhabela. Suítes exclusivas · Vista 180° para o mar
        </p>

        {/* CTA buttons */}
        <div className="animate-hero-cta flex flex-col sm:flex-row gap-3 mb-16">
          <a
            href="#reservas"
            className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-white font-bold tracking-wider uppercase text-sm transition-all duration-300 rounded-full shadow-xl shadow-cyan-900/40 hover:shadow-cyan-400/50 flex items-center justify-center gap-2"
          >
            Reservar Agora
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#suites"
            className="px-8 py-3.5 border-2 border-white/50 hover:border-white text-white font-semibold tracking-wider uppercase text-sm transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            Ver as Suítes
          </a>
        </div>

        {/* Stats bar — inline, no absolute, so it doesn't overlap */}
        <div className="animate-hero-stats flex items-center gap-5 sm:gap-10 bg-white/15 backdrop-blur-md border border-white/25 px-7 py-3.5 rounded-full">
          {[
            { val: '4',    label: 'Suítes exclusivas' },
            { val: '5.0★', label: 'Avaliação média' },
            { val: '180°', label: 'Vista para o mar' },
          ].map(({ val, label }, i, arr) => (
            <div key={label} className="flex items-center gap-5 sm:gap-10">
              <div className="text-center">
                <p className="text-white font-bold text-sm sm:text-base leading-none">{val}</p>
                <p className="text-white/55 text-[10px] mt-1 whitespace-nowrap">{label}</p>
              </div>
              {i < arr.length - 1 && <span className="w-px h-8 bg-white/20 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <ChevronDown className="text-white/50 w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

// ─── Experiência ──────────────────────────────────────────────────────────────

function ExperienciaSection() {
  return (
    <section id="experiencia" className="bg-white py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Eyebrow>A Experiência</Eyebrow>
          <h2
            className="leading-tight"
            style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#0e6b8a' }}
          >
            Mais que uma hospedagem.
          </h2>
          <p className="text-slate-500 font-light" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
            Uma memória para sempre.
          </p>
          <TropicalDivider />
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed mt-2">
            Cada detalhe foi pensado para criar uma experiência completa de imersão na natureza e no mar de Ilhabela.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCIAS.map(({ icon: Icon, cor, titulo, descricao }) => (
            <div
              key={titulo}
              className="p-8 border border-slate-100 hover:border-cyan-200 bg-slate-50 hover:bg-white transition-all duration-300 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-cyan-100/50"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 rounded-xl"
                style={{ background: `${cor}18`, border: `1.5px solid ${cor}35` }}
              >
                <Icon className="w-5 h-5" style={{ color: cor }} />
              </div>
              <h3 className="text-slate-800 text-base mb-2 font-bold">{titulo}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Suítes ───────────────────────────────────────────────────────────────────

function SuitesSection() {
  return (
    <section id="suites" className="bg-slate-50 py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Eyebrow>Acomodações</Eyebrow>
          <h2
            style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#0e6b8a' }}
          >
            Nossas Suítes
          </h2>
          <TropicalDivider />
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed mt-2">
            Apenas 4 suítes garantem privacidade absoluta e um serviço verdadeiramente personalizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="group border border-slate-100 hover:border-cyan-200 bg-white overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-cyan-100/40 rounded-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                {suite.destaque && (
                  <div className="absolute top-4 right-4 z-10 bg-cyan-500 text-white text-xs font-bold px-3 py-1 tracking-wider uppercase rounded-full shadow-md">
                    Mais Reservada
                  </div>
                )}
                <img
                  src={suite.imagem}
                  alt={suite.nome}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-cyan-300 text-xs tracking-widest uppercase font-bold mb-1">{suite.sub}</p>
                  <h3
                    className="text-white text-2xl"
                    style={{ fontFamily: '"Dancing Script", cursive' }}
                  >
                    {suite.nome}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-semibold">
                  <span>{suite.capacidade}</span>
                  <span className="w-px h-3 bg-slate-200" />
                  <span>{suite.tamanho}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{suite.descricao}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {suite.comodidades.map((c) => (
                    <span key={c} className="text-xs text-cyan-700 border border-cyan-200 bg-cyan-50 px-2.5 py-1 rounded-full font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <span className="text-cyan-600 font-bold text-lg">{suite.preco}</span>
                    <span className="text-slate-400 text-xs ml-1">{suite.unidade}</span>
                  </div>
                  <a
                    href="#reservas"
                    className="flex items-center gap-2 text-xs text-cyan-600 hover:text-cyan-500 font-bold uppercase tracking-widest transition-colors"
                  >
                    Reservar
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Piscina ──────────────────────────────────────────────────────────────────

function PiscinaSection() {
  const fotos = [
    { url: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Piscina com vista para o mar' },
    { url: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Deck ao entardecer' },
    { url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Vista do deck' },
    { url: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Pôr do sol na piscina' },
  ];

  return (
    <section id="piscina" className="bg-white py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Piscina & Deck</Eyebrow>
            <h2
              className="leading-tight mb-4"
              style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#0e6b8a' }}
            >
              Onde o azul da piscina<br />se funde com o mar.
            </h2>
            <TropicalDivider />
            <p className="text-slate-500 text-sm leading-relaxed mt-6 mb-8">
              Nossa piscina aquecida foi posicionada para criar a ilusão perfeita: o azul da água se confunde com o horizonte do mar de São Sebastião. Rodeada por deck de madeira de lei e vegetação nativa.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Waves,  text: 'Piscina aquecida com vista para o mar' },
                { icon: Sun,    text: 'Deck com espreguiçadeiras premium e toldos retráteis' },
                { icon: Coffee, text: 'Bar de piscina com drinques, sucos e snacks artesanais' },
                { icon: Wind,   text: 'Área de relaxamento com brisa natural do mar' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-cyan-500" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
            <a
              href="#reservas"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              Ver disponibilidade <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fotos.map((f, i) => (
              <div key={i} className={`overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                <img
                  src={f.url}
                  alt={f.label}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Galeria ──────────────────────────────────────────────────────────────────

function GaleriaSection() {
  const [filtro, setFiltro] = useState('Todas');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filtro === 'Todas' ? GALERIA_ITEMS : GALERIA_ITEMS.filter(g => g.cat === filtro);

  return (
    <section id="galeria" className="bg-slate-50 py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>Galeria</Eyebrow>
          <h2
            style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#0e6b8a' }}
          >
            O azul que só Ilhabela tem.
          </h2>
          <TropicalDivider />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTROS.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-bold transition-all duration-300 rounded-full border ${
                filtro === f
                  ? 'bg-cyan-500 border-cyan-500 text-white shadow-md shadow-cyan-200'
                  : 'border-slate-200 text-slate-500 hover:border-cyan-300 hover:text-cyan-600 bg-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="overflow-hidden aspect-square cursor-zoom-in group relative rounded-2xl"
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.url}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-cyan-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 rounded-2xl">
                <p className="text-white text-xs tracking-wide font-semibold">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <img
            src={filtered[lightbox].url}
            alt={filtered[lightbox].label}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-wider">
            {filtered[lightbox].label} · {lightbox + 1}/{filtered.length}
          </p>
        </div>
      )}
    </section>
  );
}

// ─── Localização ──────────────────────────────────────────────────────────────

function LocalizacaoSection() {
  return (
    <section id="localizacao" className="bg-white py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Eyebrow>Localização</Eyebrow>
            <h2
              className="leading-tight mb-2"
              style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: '#0e6b8a' }}
            >
              Ilhabela,<br />o paraíso ao alcance da mão.
            </h2>
            <TropicalDivider />
            <p className="text-slate-500 text-sm leading-relaxed mt-6 mb-8">
              Localizado em ponto privilegiado da ilha, o Refúgio das Estrelas oferece acesso rápido a praias, trilhas e ao centro histórico, sem abrir mão do silêncio e da vista única para o mar.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: MapPin,   text: 'Próximo ao Centro Histórico da Vila de Ilhabela' },
                { icon: Waves,    text: 'A minutos das melhores praias da ilha' },
                { icon: TreePine, text: 'Acesso direto a trilhas e cachoeiras da Mata Atlântica' },
                { icon: Anchor,   text: 'Pier de barco e passeios náuticos próximos' },
                { icon: Clock,    text: 'A 1h30 de São Paulo · Balsa São Sebastião → Ilhabela' },
                { icon: Compass,  text: 'Vista direta para o continente ao entardecer' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-cyan-500" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=Ilhabela,SP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-500 font-bold text-sm uppercase tracking-widest transition-colors"
            >
              Abrir no Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl shadow-cyan-100/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58934.33!2d-45.3589!3d-23.7767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d02c5ba5a61ab3%3A0x4e06c8e5a7d26f4a!2sIlhabela%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="440"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Refúgio das Estrelas — Ilhabela, SP"
              className="w-full block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Avaliações ───────────────────────────────────────────────────────────────

function AvaliacoesSection() {
  return (
    <section id="avaliacoes" className="bg-slate-50 py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Avaliações</Eyebrow>
          <h2
            style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: '#0e6b8a' }}
          >
            O que dizem nossos hóspedes.
          </h2>
          <TropicalDivider />
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-slate-400 text-sm ml-2">5.0 · Média geral</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {AVALIACOES.map((av, i) => (
            <div
              key={i}
              className="p-7 border border-slate-100 hover:border-cyan-200 bg-white shadow-sm hover:shadow-lg hover:shadow-cyan-100/50 transition-all duration-300 rounded-2xl"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(av.nota)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 italic">"{av.texto}"</p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                <div className="w-9 h-9 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 text-xs font-bold shrink-0">
                  {av.avatar}
                </div>
                <div>
                  <p className="text-slate-700 text-sm font-bold">{av.nome}</p>
                  <p className="text-slate-400 text-xs">{av.origem} · {av.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-slate-200 bg-white p-6 rounded-2xl text-center shadow-sm">
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-4 font-semibold">Avaliações verificadas em</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Google', 'Booking.com', 'Airbnb', 'TripAdvisor'].map((p, i, arr) => (
              <span key={p} className="flex items-center gap-6">
                <span className="text-slate-400 text-sm font-bold tracking-wider">{p}</span>
                {i < arr.length - 1 && <span className="w-px h-4 bg-slate-200" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Reservas ─────────────────────────────────────────────────────────────────

function ReservasSection() {
  return (
    <section id="reservas" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=2000"
          alt="Vista do mar de Ilhabela"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-cyan-900/88" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow onDark>Reservas</Eyebrow>
          <h2
            className="text-white"
            style={{ fontFamily: '"Dancing Script", cursive', fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
          >
            Sua próxima escapada começa agora.
          </h2>
          <TropicalDivider />
          <p className="text-white/60 text-sm mt-3">
            Disponibilidade limitada. Apenas 4 suítes. Reserve com antecedência.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://wa.me/5512992181349?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Ref%C3%BAgio%20das%20Estrelas."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 border border-green-400/40 hover:border-green-400 bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 rounded-2xl"
          >
            <div className="w-11 h-11 rounded-full bg-green-400/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-green-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm">WhatsApp</p>
              <p className="text-white/50 text-xs mt-0.5">Resposta em até 1 hora</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-400/50 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </a>

          <div className="flex items-center gap-4 p-6 border border-white/15 bg-white/5 rounded-2xl">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-white/40" />
            </div>
            <div>
              <p className="text-white/60 font-bold text-sm">Motor de Reservas</p>
              <p className="text-cyan-300/50 text-xs mt-0.5">Em breve · Calendário online</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 rounded-2xl">
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-white/20" />
            </div>
            <div>
              <p className="text-white/30 font-bold text-sm">Booking.com</p>
              <p className="text-white/20 text-xs mt-0.5">Em breve</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-white/10 bg-white/5 rounded-2xl">
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white/20" />
            </div>
            <div>
              <p className="text-white/30 font-bold text-sm">Airbnb</p>
              <p className="text-white/20 text-xs mt-0.5">Em breve</p>
            </div>
          </div>
        </div>

        <div className="border border-white/15 bg-white/5 p-6 rounded-2xl">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-5 font-bold">Políticas de reserva</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Check-in: a partir das 14h',
              'Check-out: até as 12h',
              'Mínimo de 2 noites',
              'Crianças a combinar',
              'Pets não permitidos',
              'Cancelamento gratuito até 7 dias antes',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-white/50 text-xs">
                <Check className="w-3 h-3 text-cyan-300 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function FooterSection() {
  const navLinks: [string, string][] = [
    ['Início', '#inicio'],
    ['A Experiência', '#experiencia'],
    ['Suítes', '#suites'],
    ['Piscina', '#piscina'],
    ['Galeria', '#galeria'],
    ['Localização', '#localizacao'],
    ['Reservas', '#reservas'],
  ];

  return (
    <footer className="bg-[#05303f] border-t border-cyan-800/40 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/LOGOTIPO_REFUGUI.png" alt="Refúgio das Estrelas" className="w-12 h-12 rounded-full object-cover shadow-md" />
              <div>
                <p className="text-cyan-300/60 text-[10px] font-bold tracking-[0.2em] uppercase leading-none mb-0.5">Pousada</p>
                <p
                  className="text-white leading-tight"
                  style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.15rem' }}
                >
                  Refúgio das Estrelas
                </p>
              </div>
            </div>
            <p className="text-white/35 text-xs leading-relaxed mb-5">
              Pousada premium em Ilhabela, SP.<br />
              A melhor vista do mar de São Sebastião.<br />
              Natureza, exclusividade e silêncio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/refugiodasestrelas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-cyan-700/50 flex items-center justify-center text-white/30 hover:text-cyan-300 hover:border-cyan-500/60 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/5512992181349"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-cyan-700/50 flex items-center justify-center text-white/30 hover:text-cyan-300 hover:border-cyan-500/60 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white/25 text-xs tracking-widest uppercase mb-5 font-bold">Navegação</p>
            <div className="space-y-2.5">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="block text-white/40 hover:text-cyan-300 text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/25 text-xs tracking-widest uppercase mb-5 font-bold">Contato</p>
            <div className="space-y-4">
              <a
                href="https://wa.me/5512992181349"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/40 hover:text-cyan-300 text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp (contato direto)
              </a>
              <a
                href="https://instagram.com/refugiodasestrelas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/40 hover:text-cyan-300 text-sm transition-colors"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                @refugiodasestrelas
              </a>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-cyan-500/60" />
                Ilhabela, São Paulo, Brasil
              </div>
              <div className="flex items-start gap-3 text-white/40 text-sm">
                <Wifi className="w-4 h-4 shrink-0 mt-0.5 text-cyan-500/60" />
                refugiodasestrelas.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-800/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © 2026 Refúgio das Estrelas · Ilhabela, SP · Todos os direitos reservados.
          </p>
          <p className="text-white/15 text-xs">refugiodasestrelas.com</p>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────

function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href="https://wa.me/5512992181349?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Ref%C3%BAgio%20das%20Estrelas."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-4 py-3.5 rounded-full shadow-xl shadow-green-500/40 hover:shadow-green-400/60 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-bold tracking-wide pr-0.5">Reservar pelo WhatsApp</span>
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RefugioDasEstrelas() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <NavBar scrollY={scrollY} />
      <HeroSection scrollY={scrollY} />
      <ExperienciaSection />
      <SuitesSection />
      <PiscinaSection />
      <GaleriaSection />
      <LocalizacaoSection />
      <AvaliacoesSection />
      <ReservasSection />
      <FooterSection />
      <WhatsAppFAB />
    </div>
  );
}
