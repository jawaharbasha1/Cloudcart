import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Package, Loader2 } from 'lucide-react';
import { productAPI } from '../../utils/api';
import StatusBadge from '../../components/ui/StatusBadge';
import PageTransition from '../../components/ui/PageTransition';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', category: 'Servers', description: '', stock: '' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productAPI.getAll();
      setProducts(res.data || []);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category || !form.description || !form.stock) {
      toast.error('Please fill in all fields');
      return;
    }
    setSaving(true);
    try {
      const productData = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        stock: Number(form.stock),
      };
      if (editProduct) {
        const res = await productAPI.update(editProduct._id, productData);
        setProducts(prev => prev.map(p => p._id === editProduct._id ? res.data : p));
        toast.success('Product updated');
      } else {
        const res = await productAPI.create(productData);
        setProducts(prev => [res.data, ...prev]);
        toast.success('Product added');
      }
      setShowModal(false);
      setEditProduct(null);
      setForm({ name: '', price: '', category: 'Servers', description: '', stock: '' });
    } catch (err) {
      toast.error(err.error || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productAPI.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, price: p.price, category: p.category, description: p.description, stock: p.stock });
    setShowModal(true);
  };

  const categories = ['Servers', 'Containers', 'DevOps', 'Databases', 'Networking', 'Monitoring', 'Security', 'Compute'];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-text-muted text-sm">{products.length} total products</p>
          </div>
          <button onClick={() => { setEditProduct(null); setForm({ name: '', price: '', category: 'Servers', description: '', stock: '' }); setShowModal(true); }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-semibold hover:bg-accent-primary/90 transition-all">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-card border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-accent-primary animate-spin" />
          </div>
        ) : (
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
            {filtered.length === 0 && (
              <div className="text-center py-12 text-text-muted">No products found</div>
            )}
          </div>
        )}

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
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-input border border-border text-sm text-text-primary focus:outline-none focus:border-accent-primary transition-all resize-none" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-accent-primary text-white text-sm font-semibold hover:bg-accent-primary/90 transition-all disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
