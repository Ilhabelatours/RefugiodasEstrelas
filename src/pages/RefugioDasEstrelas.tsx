import { useState, useEffect } from 'react';
import {
  Star, MapPin, ChevronDown, ChevronLeft, ChevronRight,
  Waves, Sun, Leaf, Wind, Calendar, ArrowRight,
  Instagram, MessageCircle, Eye, TreePine, Home, Menu, X,
  Clock, Check, ExternalLink, Wifi, Coffee,
  Anchor, Compass,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

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
    sub: '180° para o canal de São Sebastião',
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
  { icon: Eye,    cor: '#5dade2', titulo: 'Vista Panorâmica',      descricao: 'Vista de 180° para o canal de São Sebastião. O mar de Ilhabela em toda a sua grandiosidade, do amanhecer ao entardecer.' },
  { icon: Waves,  cor: '#2980b9', titulo: 'Piscina Borda Infinita', descricao: 'Piscina aquecida posicionada para se fundir com o horizonte do mar. O reflexo do azul é simplesmente hipnótico.' },
  { icon: Sun,    cor: '#e67e22', titulo: 'Pôr do Sol Épico',       descricao: 'Posicionamento oeste privilegiado. Os céus de Ilhabela ao entardecer são um espetáculo que se renova a cada dia.' },
  { icon: Leaf,   cor: '#27ae60', titulo: 'Mata Atlântica Nativa',  descricao: 'Cercada por floresta preservada, a pousada convive harmoniosamente com a biodiversidade única de Ilhabela.' },
  { icon: Star,   cor: '#f1c40f', titulo: 'Atendimento Exclusivo',  descricao: 'Apenas 4 suítes. Cada hóspede recebe atenção personalizada — de traslados ao cardápio do café da manhã.' },
  { icon: Anchor, cor: '#5dade2', titulo: 'Acesso ao Mar',          descricao: 'A 5 minutos das melhores praias e do pier de Ilhabela. Passeios de barco e mergulho organizados sob consulta.' },
];

const GALERIA_ITEMS: GaleriaItem[] = [
  { url: 'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=900', cat: 'Vista',      label: 'Canal de São Sebastião' },
  { url: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=900',  cat: 'Piscina',    label: 'Piscina borda infinita' },
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

function OceanDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-500/50" />
      <Waves className="w-4 h-4 text-sky-500/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-500/50" />
    </div>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center justify-center gap-2 text-sky-400 tracking-[0.25em] uppercase text-xs font-medium mb-4">
      <span className="w-6 h-px bg-sky-500/50" />
      {children}
      <span className="w-6 h-px bg-sky-500/50" />
    </p>
  );
}

function IconBox({ icon: Icon, color }: { icon: LucideIcon; color: string }) {
  return (
    <div
      className="w-11 h-11 flex items-center justify-center mb-6 rounded-sm"
      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
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
          ? 'bg-[#0a1628]/96 backdrop-blur-lg border-b border-sky-900/40 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full border border-sky-400/50 flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span
            className="text-white font-light tracking-[0.15em] uppercase text-sm"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Refúgio <span className="text-sky-400">das Estrelas</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-white/60 hover:text-sky-300 text-xs tracking-widest uppercase transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#reservas"
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-sm hover:shadow-[0_0_20px_rgba(14,165,233,0.35)]"
          >
            Reservar
          </a>
        </div>

        <button
          className="lg:hidden text-white/70 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0a1628]/98 border-t border-sky-900/40 px-6 py-6 space-y-1">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-white/60 hover:text-sky-300 text-sm tracking-widest uppercase py-3 border-b border-white/5 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#reservas"
            onClick={() => setOpen(false)}
            className="block text-center mt-4 px-5 py-3.5 bg-sky-600 text-white text-xs font-semibold tracking-wider uppercase rounded-sm"
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
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.12)` }}
      >
        <img
          src="https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress&cs=tinysrgb&w=2400"
          alt="Vista panorâmica do canal de São Sebastião — Ilhabela"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/55 via-[#0d2240]/45 to-[#0a1628]/90" />
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent z-10" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-hero-badge mb-8 flex items-center gap-3 border border-sky-400/30 bg-sky-950/40 backdrop-blur-sm px-5 py-2.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-sky-300 tracking-[0.2em] uppercase text-xs font-medium">
            Ilhabela · São Paulo · Brasil
          </span>
        </div>

        <h1
          className="animate-hero-title text-white leading-none mb-4"
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.6rem, 9vw, 7.5rem)',
            textShadow: '0 4px 40px rgba(10,22,40,0.8)',
          }}
        >
          REFÚGIO<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300">
            DAS ESTRELAS
          </span>
        </h1>

        <p
          className="animate-hero-sub text-white/85 font-light mb-3 tracking-wide"
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(1.1rem, 3vw, 1.7rem)' }}
        >
          A melhor vista de Ilhabela.
        </p>
        <p className="animate-hero-sub text-white/55 font-light mb-12 max-w-lg tracking-wide text-sm sm:text-base">
          Suítes premium · Piscina borda infinita · Vista 180° para o canal
        </p>

        <div className="animate-hero-cta flex flex-col sm:flex-row gap-4">
          <a
            href="#reservas"
            className="group px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold tracking-wider uppercase text-sm transition-all duration-300 rounded-sm hover:shadow-[0_0_30px_rgba(14,165,233,0.45)] flex items-center gap-2"
          >
            Reservar Agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#suites"
            className="px-8 py-4 border border-white/30 hover:border-sky-400/60 hover:text-sky-300 text-white font-light tracking-wider uppercase text-sm transition-all duration-300 rounded-sm backdrop-blur-sm"
          >
            Ver as Suítes
          </a>
        </div>

        <div className="animate-hero-stats absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 sm:gap-10 bg-[#0d2240]/80 backdrop-blur-md border border-sky-800/40 px-8 py-4 rounded-full whitespace-nowrap">
          {[
            { val: '4',    label: 'Suítes exclusivas' },
            { val: '5.0★', label: 'Avaliação média' },
            { val: '180°', label: 'Vista para o mar' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="text-sky-300 font-semibold text-sm sm:text-base">{val}</p>
              <p className="text-white/40 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="animate-hero-scroll absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <ChevronDown className="text-sky-400/60 w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
}

// ─── Experiência ──────────────────────────────────────────────────────────────

function ExperienciaSection() {
  return (
    <section id="experiencia" className="bg-[#0a1628] py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Eyebrow>A Experiência</Eyebrow>
          <h2
            className="text-white font-light leading-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Mais que uma hospedagem.<br />
            <span className="text-sky-400 italic">Uma memória para sempre.</span>
          </h2>
          <OceanDivider />
          <p className="text-white/45 max-w-xl mx-auto text-sm leading-relaxed mt-2">
            Cada detalhe foi pensado para criar uma experiência completa de imersão na natureza e no mar de Ilhabela.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCIAS.map(({ icon, cor, titulo, descricao }) => (
            <div
              key={titulo}
              className="group p-8 border border-sky-900/40 hover:border-sky-500/40 bg-[#0d2240]/50 hover:bg-[#0d2240]/80 transition-all duration-500 rounded-sm"
            >
              <IconBox icon={icon} color={cor} />
              <h3
                className="text-white text-lg mb-3 font-normal"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                {titulo}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{descricao}</p>
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
    <section id="suites" className="bg-[#0d2240] py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Eyebrow>Acomodações</Eyebrow>
          <h2
            className="text-white font-light"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Nossas <span className="text-sky-400 italic">Suítes</span>
          </h2>
          <OceanDivider />
          <p className="text-white/45 max-w-lg mx-auto text-sm leading-relaxed mt-2">
            Apenas 4 suítes garantem privacidade absoluta e um serviço verdadeiramente personalizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SUITES.map((suite) => (
            <div
              key={suite.id}
              className="group border border-sky-900/40 hover:border-sky-500/30 bg-[#0a1628] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(14,165,233,0.07)] rounded-sm"
            >
              <div className="relative h-64 overflow-hidden">
                {suite.destaque && (
                  <div className="absolute top-4 right-4 z-10 bg-sky-600 text-white text-xs font-semibold px-3 py-1 tracking-wider uppercase rounded-sm">
                    Mais Reservada
                  </div>
                )}
                <img
                  src={suite.imagem}
                  alt={suite.nome}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/20 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-sky-400 text-xs tracking-widest uppercase font-medium mb-1">{suite.sub}</p>
                  <h3
                    className="text-white text-2xl font-light"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {suite.nome}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-white/40 text-xs">
                  <span>{suite.capacidade}</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span>{suite.tamanho}</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5">{suite.descricao}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {suite.comodidades.map((c) => (
                    <span key={c} className="text-xs text-sky-300/60 border border-sky-800/50 px-2.5 py-1 rounded-sm">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-5">
                  <div>
                    <span className="text-sky-300 font-semibold text-lg">{suite.preco}</span>
                    <span className="text-white/35 text-xs ml-1">{suite.unidade}</span>
                  </div>
                  <a
                    href="#reservas"
                    className="group/btn flex items-center gap-2 text-xs text-sky-400 hover:text-sky-300 uppercase tracking-widest transition-colors"
                  >
                    Reservar
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
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
    { url: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Piscina borda infinita' },
    { url: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Deck ao entardecer' },
    { url: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Vista do deck' },
    { url: 'https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&w=800', label: 'Pôr do sol na piscina' },
  ];

  return (
    <section id="piscina" className="bg-[#0a1628] py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Piscina & Deck</Eyebrow>
            <h2
              className="text-white font-light leading-tight mb-6"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Onde o azul da piscina<br />
              <span className="text-sky-400 italic">se funde com o mar.</span>
            </h2>
            <OceanDivider />
            <p className="text-white/50 text-sm leading-relaxed mt-6 mb-8">
              Nossa piscina de borda infinita foi posicionada para criar a ilusão perfeita: o azul da água se confunde com o horizonte do canal de São Sebastião. Rodeada por deck de madeira de lei e vegetação nativa.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: Waves,  text: 'Piscina aquecida com borda infinita e vista para o mar' },
                { icon: Sun,    text: 'Deck com espreguiçadeiras premium e toldos retráteis' },
                { icon: Coffee, text: 'Bar de piscina com drinques, sucos e snacks artesanais' },
                { icon: Wind,   text: 'Área de relaxamento com brisa natural do canal' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-white/55 text-sm">
                  <div className="w-7 h-7 rounded-sm bg-sky-500/15 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
            <a
              href="#reservas"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm uppercase tracking-widest transition-colors"
            >
              Ver disponibilidade <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fotos.map((f, i) => (
              <div key={i} className={`overflow-hidden rounded-sm ${i === 0 ? 'aspect-[4/3]' : 'aspect-square'}`}>
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
    <section id="galeria" className="bg-[#0d2240] py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>Galeria</Eyebrow>
          <h2
            className="text-white font-light"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            O azul que só<br />
            <span className="text-sky-400 italic">Ilhabela tem.</span>
          </h2>
          <OceanDivider />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTROS.map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 rounded-sm border ${
                filtro === f
                  ? 'bg-sky-600 border-sky-600 text-white font-semibold shadow-[0_0_15px_rgba(14,165,233,0.25)]'
                  : 'border-sky-900/50 text-white/40 hover:border-sky-500/50 hover:text-white/70'
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
              className="overflow-hidden aspect-square cursor-zoom-in group relative rounded-sm"
              onClick={() => setLightbox(i)}
            >
              <img
                src={item.url}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#0a1628]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-xs tracking-wide">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0a1628]/97 flex items-center justify-center p-4"
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
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/35 text-xs tracking-wider">
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
    <section id="localizacao" className="bg-[#0a1628] py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Eyebrow>Localização</Eyebrow>
            <h2
              className="text-white font-light leading-tight mb-6"
              style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
            >
              Ilhabela,<br />
              <span className="text-sky-400 italic">o paraíso ao alcance da mão.</span>
            </h2>
            <OceanDivider />
            <p className="text-white/50 text-sm leading-relaxed mt-6 mb-8">
              Localizado em ponto privilegiado da ilha, o Refúgio das Estrelas oferece acesso rápido a praias, trilhas e ao centro histórico, sem abrir mão do silêncio e da vista única para o canal.
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
                <div key={text} className="flex items-start gap-3 text-white/55 text-sm">
                  <div className="w-7 h-7 rounded-sm bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=Ilhabela,SP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-sm uppercase tracking-widest transition-colors"
            >
              Abrir no Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500/20 to-transparent rounded-sm pointer-events-none" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58934.33!2d-45.3589!3d-23.7767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d02c5ba5a61ab3%3A0x4e06c8e5a7d26f4a!2sIlhabela%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="440"
              style={{ border: 0, filter: 'hue-rotate(190deg) saturate(0.6) brightness(0.65)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Refúgio das Estrelas — Ilhabela, SP"
              className="relative rounded-sm w-full"
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
    <section id="avaliacoes" className="bg-[#0d2240] py-28 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Eyebrow>Avaliações</Eyebrow>
          <h2
            className="text-white font-light"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            O que dizem<br />
            <span className="text-sky-400 italic">nossos hóspedes.</span>
          </h2>
          <OceanDivider />
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
            ))}
            <span className="text-white/40 text-sm ml-2">5.0 · Média geral</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {AVALIACOES.map((av, i) => (
            <div
              key={i}
              className="p-7 border border-sky-900/40 hover:border-sky-500/30 bg-[#0a1628]/60 transition-all duration-300 rounded-sm"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(av.nota)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
                ))}
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-6 italic">"{av.texto}"</p>
              <div className="flex items-center gap-3 border-t border-white/5 pt-5">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 text-xs font-semibold shrink-0">
                  {av.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{av.nome}</p>
                  <p className="text-white/30 text-xs">{av.origem} · {av.data}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-sky-900/30 bg-[#0a1628]/40 p-6 rounded-sm text-center">
          <p className="text-white/25 text-xs uppercase tracking-widest mb-4">Avaliações verificadas em</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Google', 'Booking.com', 'Airbnb', 'TripAdvisor'].map((p, i, arr) => (
              <span key={p} className="flex items-center gap-6">
                <span className="text-white/25 text-sm font-light tracking-wider">{p}</span>
                {i < arr.length - 1 && <span className="w-px h-4 bg-white/10" />}
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
        <div className="absolute inset-0 bg-[#0a1628]/88" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>Reservas</Eyebrow>
          <h2
            className="text-white font-light"
            style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Sua próxima escapada<br />
            <span className="text-sky-400 italic">começa agora.</span>
          </h2>
          <OceanDivider />
          <p className="text-white/45 text-sm mt-3">
            Disponibilidade limitada. Apenas 4 suítes. Reserve com antecedência.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <a
            href="https://wa.me/5512992181349?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Ref%C3%BAgio%20das%20Estrelas."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-6 border border-green-500/30 hover:border-green-400/60 bg-green-500/5 hover:bg-green-500/10 transition-all duration-300 rounded-sm"
          >
            <div className="w-11 h-11 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm">WhatsApp</p>
              <p className="text-white/40 text-xs mt-0.5">Resposta em até 1 hora</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-400/50 group-hover:text-green-400 group-hover:translate-x-0.5 transition-all shrink-0" />
          </a>

          <div className="flex items-center gap-4 p-6 border border-sky-900/40 bg-sky-500/5 rounded-sm">
            <div className="w-11 h-11 rounded-full bg-sky-500/15 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-sky-400/60" />
            </div>
            <div>
              <p className="text-white/60 font-medium text-sm">Motor de Reservas</p>
              <p className="text-sky-400/50 text-xs mt-0.5">Em breve · Calendário online</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-sky-900/30 bg-[#0a1628]/40 rounded-sm">
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-white/25" />
            </div>
            <div>
              <p className="text-white/35 font-medium text-sm">Booking.com</p>
              <p className="text-white/20 text-xs mt-0.5">Em breve</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 border border-sky-900/30 bg-[#0a1628]/40 rounded-sm">
            <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white/25" />
            </div>
            <div>
              <p className="text-white/35 font-medium text-sm">Airbnb</p>
              <p className="text-white/20 text-xs mt-0.5">Em breve</p>
            </div>
          </div>
        </div>

        <div className="border border-sky-900/30 bg-[#0a1628]/60 p-6 rounded-sm">
          <p className="text-white/25 text-xs uppercase tracking-widest mb-5">Políticas de reserva</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Check-in: a partir das 14h',
              'Check-out: até as 12h',
              'Mínimo de 2 noites',
              'Crianças a combinar',
              'Pets não permitidos',
              'Cancelamento gratuito até 7 dias antes',
            ].map(item => (
              <div key={item} className="flex items-center gap-2.5 text-white/40 text-xs">
                <Check className="w-3 h-3 text-sky-500 shrink-0" />
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
    <footer className="bg-[#060f1a] border-t border-sky-900/30 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full border border-sky-500/40 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <p
                className="text-sky-300 text-base font-light tracking-widest uppercase"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Refúgio das Estrelas
              </p>
            </div>
            <p className="text-white/30 text-xs leading-relaxed mb-5">
              Pousada premium em Ilhabela, SP.<br />
              A melhor vista do canal de São Sebastião.<br />
              Natureza, exclusividade e silêncio.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/refugiodasestrelas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-sky-900/50 flex items-center justify-center text-white/30 hover:text-sky-400 hover:border-sky-500/50 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/5512992181349"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full border border-sky-900/50 flex items-center justify-center text-white/30 hover:text-sky-400 hover:border-sky-500/50 transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-5">Navegação</p>
            <div className="space-y-2.5">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="block text-white/35 hover:text-sky-400 text-sm transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-5">Contato</p>
            <div className="space-y-4">
              <a
                href="https://wa.me/5512992181349"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/35 hover:text-sky-400 text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                WhatsApp (contato direto)
              </a>
              <a
                href="https://instagram.com/refugiodasestrelas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/35 hover:text-sky-400 text-sm transition-colors"
              >
                <Instagram className="w-4 h-4 shrink-0" />
                @refugiodasestrelas
              </a>
              <div className="flex items-start gap-3 text-white/35 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-sky-500/60" />
                Ilhabela, São Paulo, Brasil
              </div>
              <div className="flex items-start gap-3 text-white/35 text-sm">
                <Wifi className="w-4 h-4 shrink-0 mt-0.5 text-sky-500/60" />
                refugiodasestrelas.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-900/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/15 text-xs">
            © 2026 Refúgio das Estrelas · Ilhabela, SP · Todos os direitos reservados.
          </p>
          <p className="text-white/10 text-xs">refugiodasestrelas.com</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-4 py-3.5 rounded-full shadow-[0_4px_24px_rgba(34,197,94,0.45)] hover:shadow-[0_4px_32px_rgba(34,197,94,0.65)] transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm font-semibold tracking-wide pr-0.5">Reservar pelo WhatsApp</span>
    </a>
  );
}

export default function RefugioDasEstrelas() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#0a1628', fontFamily: 'Inter, system-ui, sans-serif' }}>
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

