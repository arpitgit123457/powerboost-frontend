const REVIEW_SETS = {
  capsule: {
    title: 'Capsule Customer Reviews',
    images: [
      '/images/capsule-review1.jpg',
      '/images/capsule-review2.jpg',
      '/images/capsule-review3.jpg',
    ],
    videos: [],
  },
  combo: {
    title: 'Combo Customer Reviews',
    images: [
      '/images/combo-review1.jpg',
      '/images/oil-review1.jpg',
      '/images/oil-review2.jpg',
      '/images/oil-review3.jpg',
      '/images/oil-review4.jpg',
    ],
    videos: [],
  },
  oil: {
    title: 'Oil Customer Reviews',
    images: [
      '/images/oil-review1.jpg',
      '/images/oil-review2.jpg',
      '/images/oil-review3.jpg',
      '/images/oil-review4.jpg',
    ],
    videos: [],
  },
}

const KEYWORDS = [
  { type: 'capsule', match: ['capsule', 'supplement'] },
  { type: 'combo', match: ['combo', 'pack', 'kit'] },
  { type: 'oil', match: ['oil', 'massage'] },
]

export function getProductReviews(product) {
  if (!product) return null

  const text = `${product.name || ''} ${product.category || ''}`.toLowerCase()
  const found = KEYWORDS.find((k) => k.match.some((word) => text.includes(word)))
  if (!found) return null

  const set = REVIEW_SETS[found.type]
  if (!set || (!set.images.length && !set.videos.length)) return null
  return set
}
