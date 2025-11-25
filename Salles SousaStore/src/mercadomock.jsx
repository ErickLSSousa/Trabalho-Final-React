// MercadoMock.jsx
// Single-file React component that implements a clean, responsive marketplace UI
// Requirements (install in your project):
//  - react, react-dom
//  - tailwindcss configured in the project
//  - lucide-react (for icons): npm i lucide-react
//  - framer-motion (optional for small animations): npm i framer-motion
// Usage: drop this file into your src/ folder and import in App.jsx: `import MercadoMock from './MercadoMock'`
// Then render: <MercadoMock />

import React, { useState } from 'react';
import { ShoppingCart, User, Menu, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data
const CATEGORIES = ['Eletrônicos', 'Celulares', 'Informática', 'Casa', 'Moda', 'Esportes'];
const PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Produto Exemplo ${i + 1}`,
  price: (Math.random() * 500 + 20).toFixed(2),
  rating: (Math.random() * 2 + 3).toFixed(1),
  sold: Math.floor(Math.random() * 2000),
  image: `https://picsum.photos/seed/mercado${i}/400/300`,
  badge: i % 3 === 0 ? 'Oferta' : i % 4 === 0 ? 'Novo' : null,
}));

export default function MercadoMock() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const filtered = PRODUCTS.filter(p => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'Todos' || category === 'Todos' ? true : true; // categories are mock
    return matchesQuery && matchesCategory;
  });

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(x => x.id === product.id);
      if (found) return prev.map(x => x.id === product.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(x => x.id !== id));
  }

  const total = cart.reduce((s, p) => s + p.qty * parseFloat(p.price), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setShowSidebar(s => !s)}>
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-3">
              <div className="text-2xl font-extrabold text-yellow-500">MercadoMock</div>
              <span className="text-sm text-gray-500 hidden sm:inline">— Interface estilo Mercado Livre</span>
            </div>

            {/* Search */}
            <div className="flex-1">
              <div className="relative max-w-2xl mx-auto">
                <label className="sr-only">Buscar</label>
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm bg-white">
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 outline-none"
                    placeholder="Buscar produtos, marcas e muito mais..."
                  />
                  <button className="px-4 py-2 border-l flex items-center gap-2">
                    <Search size={16} />
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                <Heart size={16} /> Favoritos
              </button>
              <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                <User size={16} /> Minha conta
              </button>

              <button
                onClick={() => setSelected('cart')}
                className="relative px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                aria-label="Carrinho"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Carrinho</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white rounded-full text-xs px-2">{cart.reduce((s, c) => s + c.qty, 0)}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className={`col-span-12 md:col-span-3 lg:col-span-2 transition-all ${showSidebar ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Categorias</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => setCategory('Todos')} className={`w-full text-left p-2 rounded ${category === 'Todos' ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>Todos</button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button onClick={() => setCategory(cat)} className={`w-full text-left p-2 rounded ${category === cat ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}>{cat}</button>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Filtros rápidos</h4>
                <div className="flex gap-2 flex-wrap">
                  <button className="px-3 py-1 border rounded text-sm">Frete grátis</button>
                  <button className="px-3 py-1 border rounded text-sm">Mais vendidos</button>
                  <button className="px-3 py-1 border rounded text-sm">Até 12x</button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-white rounded-lg p-4 shadow-sm text-sm">
                <h4 className="font-semibold mb-2">Anúncio</h4>
                <div className="h-28 rounded bg-gray-100 flex items-center justify-center text-gray-500">Banner promocional</div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <section className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Resultado da busca</h2>
                <p className="text-sm text-gray-500">{filtered.length} resultados</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                Ordenar por:
                <select className="border rounded px-2 py-1">
                  <option>Relevância</option>
                  <option>Menor preço</option>
                  <option>Maior preço</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} onAdd={() => addToCart(product)} onView={() => setSelected(product)} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500">© MercadoMock — Projeto de interface</div>
      </footer>

      {/* Selected modal / drawer */}
      <AnimatePresence>
        {selected && selected !== 'cart' && (
          <ProductModal product={selected} onClose={() => setSelected(null)} onAdd={() => { addToCart(selected); setSelected(null); }} />
        )}

        {selected === 'cart' && (
          <CartDrawer cart={cart} onClose={() => setSelected(null)} onRemove={removeFromCart} total={total} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onAdd, onView }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative">
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
        {product.badge && <div className="absolute left-2 top-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">{product.badge}</div>}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-1">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">R$ {product.price}</div>
            <div className="text-xs text-gray-500">{product.rating} ★ • {product.sold} vendidos</div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={onAdd} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Comprar</button>
            <button onClick={onView} className="border px-3 py-1 rounded text-sm">Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div onClick={e => e.stopPropagation()} initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
            <div className="text-2xl font-bold mb-2">R$ {product.price}</div>
            <p className="text-sm text-gray-600 mb-4">Descrição curta do produto. Aqui você poderia adicionar informações técnicas, garantia e políticas de devolução.</p>
            <div className="flex gap-2">
              <button onClick={onAdd} className="bg-yellow-500 text-white px-4 py-2 rounded">Adicionar ao carrinho</button>
              <button onClick={onClose} className="border px-4 py-2 rounded">Fechar</button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CartDrawer({ cart, onClose, onRemove, total }) {
  return (
    <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full max-w-md w-full bg-white shadow-lg z-50">
      <div className="p-4 flex items-center justify-between border-b">
        <h3 className="font-semibold">Carrinho</h3>
        <button onClick={onClose} className="text-sm text-gray-600">Fechar</button>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart.length === 0 && <div className="text-sm text-gray-500">Seu carrinho está vazio.</div>}
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">Qtd: {item.qty}</div>
            </div>
            <div className="text-sm">R$ {(item.qty * parseFloat(item.price)).toFixed(2)}</div>
            <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 ml-2">Remover</button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">Total</div>
          <div className="font-bold">R$ {total}</div>
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded">Finalizar compra</button>
      </div>
    </motion.aside>
  );
}
