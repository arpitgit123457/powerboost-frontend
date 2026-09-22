import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../api'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickViewModal'
import FadeIn from '../ui/FadeIn'
import { products as localProducts } from '../../data/products'

function FeaturedProducts() {
  const [products, setProducts] = useState(() => {
    const best = localProducts.filter((p) => p.badge)
    return (best.length >= 4 ? best : localProducts).slice(0, 4)
  })
  const [quickView, setQuickView] = useState(null)

  useEffect(() => {
    getProducts()
      .then((data) => {
        const best = data.filter((p) => p.badge)
        if (best.length >= 4) setProducts(best.slice(0, 4))
        else if (data.length > 0) setProducts(data.slice(0, 4))
      })
      .catch(() => {})
  }, [])

  return (
    <section id="shop" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <FadeIn>
          <h2 className="max-w-xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Most loved by our customers
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-line px-6 py-3 text-sm font-bold text-ink transition hover:border-accent hover:bg-accent hover:text-white"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onQuickView={setQuickView} />
        ))}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}

export default FeaturedProducts
