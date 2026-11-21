import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { categories, products } from './data/products.js'

const WHATSAPP_NUMBER = '5493765084512'
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

function whatsappLink(message) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}

function BrandMark({ compact = false }) {
  return (
    <a className={`brand-mark${compact ? ' brand-mark--compact' : ''}`} href="#inicio" aria-label="πKtogramas, inicio">
      <img className="brand-logo" src="/logo.png" alt="" />
      <img className="brand-name" src="/nombre.png" alt="" />
    </a>
  )
}

function ProductCard({ product, index }) {
  const images = product.images ?? [product.image]
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const message = `Hola πKtogramas! Me interesa comprar el producto: ${product.name} de la categoría ${product.category}`

  return (
    <article className="product-card" style={{ '--card-index': index }}>
      <div className="product-image-wrap">
        <img className="product-image" src={images[activeImageIndex]} alt={product.name} loading="lazy" />
        {images.length > 1 && (
          <>
            <button
              className="image-nav image-nav--previous"
              type="button"
              aria-label={`Imagen anterior de ${product.name}`}
              onClick={() => setActiveImageIndex((current) => (current - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="image-nav image-nav--next"
              type="button"
              aria-label={`Imagen siguiente de ${product.name}`}
              onClick={() => setActiveImageIndex((current) => (current + 1) % images.length)}
            >
              <ChevronRight size={18} />
            </button>
            <span className="image-count" aria-live="polite">{activeImageIndex + 1} / {images.length}</span>
          </>
        )}
        <span className="category-tag">{product.category}</span>
      </div>
      <div className="product-copy">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>{product.price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })}</strong>
          <a
            className="order-button"
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Pedir ${product.name} por WhatsApp`}
          >
            <MessageCircle size={17} strokeWidth={2.2} />
            <span>Pedir</span>
          </a>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const visibleProducts = activeCategory === 'Todos'
    ? products
    : products.filter((product) => product.category === activeCategory)

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#catalogo">Catálogo</a>
            <a href="#nosotros">Nuestra idea</a>
            <a href="#envios">Envíos</a>
          </nav>
          
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="inicio">
          <div className="hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> Pictogramas y recursos visuales</span>
            <h1>Aprender y comunicar también puede ser <em>divertido.</em></h1>
            <p className="hero-tagline">Aprender • Comunicar • Crecer</p>
            <p>Materiales pedagógicos, funcionales y de apoyo escolar</p>
            <div className="hero-actions">
              <a className="primary-button" href="#catalogo">Ver catálogo <ArrowRight size={18} /></a>
              <span className="hero-note"><Heart size={15} fill="currentColor" /> Hecho a medida para vos</span>
            </div>
            <a className="scroll-hint" href="#nosotros"><ArrowDown size={16} /> Conocé nuestra propuesta</a>
          </div>
          <div className="hero-art" aria-label="Ejemplo de material visual artesanal">
            <div className="hero-photo-frame">
              <img src="pika.jpg" alt="Material visual colorido para aprender y comunicar" />
            </div>
            <div className="hero-sticker sticker-sparkle"><Sparkles size={25} /></div>
            <div className="hero-sticker sticker-note"><WandSparkles size={20} /><span>Aprender<br />jugando</span></div>
            <span className="hero-doodle doodle-one" aria-hidden="true">✳</span>
            <span className="hero-doodle doodle-two" aria-hidden="true">· · ·</span>
          </div>
          <span className="hero-counter" aria-hidden="true">01 <i /> 04</span>
        </section>

        <section className="intro-band" id="nosotros">
          <div className="intro-inner section-wrap">
            <div className="intro-heading">
              <span className="eyebrow eyebrow-dark">Nuestra propuesta</span>
              <h2>Hecho para usar.<br /><em>Y volver a usar.</em></h2>
            </div>
            <div className="intro-detail">
              <p>Creamos apoyos visuales personalizados que hacen más simples las rutinas, el aprendizaje y la comunicación cotidiana.</p>
              <div className="feature-list">
                <span><i className="feature-dot dot-yellow" /> A tu medida</span>
                <span><i className="feature-dot dot-blue" /> Plastificados</span>
                <span><i className="feature-dot dot-coral" /> Reutilizables</span>
              </div>
            </div>
            <span className="intro-scribble" aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="catalog-section section-wrap" id="catalogo">
          <div className="catalog-heading">
            <div>
              <span className="eyebrow"><span className="eyebrow-dot" /> Cosas lindas y útiles</span>
              <h2>Un mundo de ideas<br className="mobile-break" /> <em>para acompañar.</em></h2>
            </div>
            <p>Elegí tu favorito y escribinos.<br />También podemos crear algo especial.</p>
          </div>

          <div className="filter-row" role="group" aria-label="Filtrar productos por categoría">
            {['Todos', ...categories].map((category) => (
              <button
                className={`filter-button${activeCategory === category ? ' is-active' : ''}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid" aria-live="polite">
            {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
          </div>
          <div className="catalog-footnote"><span>{visibleProducts.length} ideas para acompañar</span><i /></div>
        </section>

        <section className="shipping-band" id="envios">
          <div className="shipping-inner section-wrap">
            <div className="shipping-icon"><MapPin size={25} /></div>
            <div className="shipping-copy">
              <span className="eyebrow eyebrow-dark">Nos acercamos a vos</span>
              <h2>Del taller a tu casa.</h2>
            </div>
            <p><strong>Envíos a Posadas, Garupá y Candelaria</strong><br />Coordinamos cada entrega por WhatsApp.</p>
            <a className="shipping-link" href={whatsappLink('Hola πKtogramas! Quiero consultar por los envíos.')}
              target="_blank" rel="noreferrer" aria-label="Consultar por envíos por WhatsApp">
              <ArrowRight size={21} />
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contacto">
        <div className="footer-main section-wrap">
          <div className="footer-brand">
            <a className="footer-brand-title" href="#inicio">πKtogramas</a>
            <p>Aprender • Comunicar • Crecer<br />Pictogramas y recursos visuales</p>
          </div>
          <div className="footer-links">
            <span className="footer-label">Seguinos y charlemos</span>
            <a href="https://www.instagram.com/togramas/?__pwa=1" target="_blank" rel="noreferrer"><Instagram size={17} /> Instagram</a>
            <a href={whatsappLink('Hola πKtogramas!')} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
          </div>
          <a className="back-top" href="#inicio" aria-label="Volver al inicio">Volver arriba <ArrowDown size={15} /></a>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© {new Date().getFullYear()} πKtogramas</span>
          <span>Hecho con <Heart size={13} fill="currentColor" /> en Misiones</span>
        </div>
      </footer>
    </>
  )
}

export default App