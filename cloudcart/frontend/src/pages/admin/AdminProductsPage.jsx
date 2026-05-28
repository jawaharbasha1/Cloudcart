import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Package } from 'lucide-react';
import { mockProducts } from '../../utils/mockData';
import StatusBadge from '../../components/ui/StatusBadge';
import PageTransition from '../../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: '', description: '', stock: '' });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = () => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p._id === editProduct._id ? { ...p, ...form, price: Number(form.price), stock: Number(form.stock) } : p));
      toast.success('Product updated');
    } else {
      setProducts(prev => [{ ...form, _id: `new-${Date.now()}`, price: Number(form.price), stock: Number(form.stock), rating: 4.5, reviews: 0, image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', tags: [] }, ...prev]);
      toast.success('Product added');
    }
    setShowModal(false);
    setEditProduct(null);
    setForm({ name: '', price: '', category: '', description: '', stock: '' });
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    toast.success('Product deleted');
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, price: p.price, category: p.category, description: p.description, stock: p.stock });
    setShowModal(true);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-text-muted text-sm">{products.length} total products</p>
          </div>
          <button onClick={() => { setEditProduct(null); setForm({ name: '', price: '', category: '', description: '', stock: '' }); setShowModal(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-semibold hover:bg-accent-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
        </div>

        <div className="bg-bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-text-dim text-xs border-b border-border bg-bg-primary/50">
                <th className="text-left p-4 font-medium">Product</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Stock</th>
                <th className="text-left p-4 font-medium">Rating</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover opacity-80" />
                        <div><p className="font-medium">{p.name}</p><p className="text-[11px] text-text-dim truncate max-w-[200px]">{p.description}</p></div>
                      </div>
                    </td>
                    <td className="p-4"><span className="px-2 py-1 rounded-lg bg-bg-primary text-xs text-text-muted">{p.category}</span></td>
                    <td className="p-4 font-medium">${p.price}</td>
                    <td className="p-4">{p.stock}</td>
                    <td className="p-4">⭐ {p.rating}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-text-dim hover:text-accent-primary hover:bg-accent-primary/10 transition-all mr-1"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg text-text-dim hover:text-danger hover:bg-danger/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-bg-card rounded-2xl border border-border p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-semibold mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h3>
              <div className="space-y-3">
                <input placeholder="Product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                  <input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                </div>
                <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
                <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all resize-none" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-semibold hover:bg-accent-primary/90 transition-all">Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
