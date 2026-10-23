import { useEffect, useState } from 'react'
import { Trash2, Eye, ShoppingBag, Truck, RefreshCw, Send, PackageCheck } from 'lucide-react'
import { adminApi } from '../api'
import {
  Card,
  PageHeader,
  Btn,
  Badge,
  Modal,
  Select,
  EmptyState,
  Th,
  Td,
} from './ui'
import { formatINR } from '../utils'

const STATUSES = ['Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
const statusTone = {
  Placed: 'blue',
  Confirmed: 'amber',
  Shipped: 'accent',
  Delivered: 'green',
  Cancelled: 'red',
}

const SHIP_TONE = {
  NotReady: 'slate',
  Pending: 'amber',
  Pushed: 'green',
  Failed: 'red',
  Cancelled: 'slate',
}

function ShippingPanel({ order, onRefresh }) {
  const [busy, setBusy] = useState('')
  const [note, setNote] = useState('')
  const s = order.shipping || {}

  const run = async (key, fn) => {
    setBusy(key)
    setNote('')
    try {
      await fn()
      onRefresh()
    } catch (err) {
      setNote(err.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <div className="border-t border-line pt-4">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-mist">Shipping</p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={SHIP_TONE[s.status] || 'slate'}>{s.status || 'NotReady'}</Badge>
        {s.awb && <Badge tone="blue">AWB {s.awb}</Badge>}
        {s.courierName && <Badge tone="slate">{s.courierName}</Badge>}
      </div>

      <div className="mt-3 grid gap-1.5 text-xs text-mist sm:grid-cols-2">
        {s.shiprocketOrderId && (
          <p>
            SR order: <span className="font-semibold text-ink">{s.shiprocketOrderId}</span>
          </p>
        )}
        {s.shipmentId && (
          <p>
            Shipment: <span className="font-semibold text-ink">{s.shipmentId}</span>
          </p>
        )}
        {s.trackingStatus && (
          <p>
            Status: <span className="font-semibold text-ink">{s.trackingStatus}</span>
          </p>
        )}
        {s.lastTrackedAt && (
          <p>
            Last synced:{' '}
            <span className="font-semibold text-ink">
              {new Date(s.lastTrackedAt).toLocaleString('en-IN')}
            </span>
          </p>
        )}
      </div>

      {s.error && <p className="mt-3 rounded-lg bg-red-50 p-2 text-xs font-semibold text-red-600">{s.error}</p>}
      {note && <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs font-semibold text-amber-700">{note}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {!s.shiprocketOrderId ? (
          <Btn variant="primary" disabled={Boolean(busy)} onClick={() => run('push', () => adminApi.pushToShiprocket(order._id))}>
            <Send className="h-4 w-4" />
            {busy === 'push' ? 'Pushing...' : 'Push to Shiprocket'}
          </Btn>
        ) : (
          <>
            {!s.awb && (
              <Btn
                variant="primary"
                disabled={Boolean(busy)}
                onClick={() => run('courier', () => adminApi.assignCourier(order._id))}
              >
                <Truck className="h-4 w-4" />
                {busy === 'courier' ? 'Assigning...' : 'Assign Courier'}
              </Btn>
            )}
            <Btn
              variant="outline"
              disabled={Boolean(busy)}
              onClick={() => run('sync', () => adminApi.syncTracking(order._id))}
            >
              <RefreshCw className={`h-4 w-4 ${busy === 'sync' ? 'animate-spin' : ''}`} />
              {busy === 'sync' ? 'Syncing...' : 'Sync Tracking'}
            </Btn>
          </>
        )}
        {s.trackingUrl && (
          <a
            href={s.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold text-ink transition hover:border-accent hover:text-accent"
          >
            <PackageCheck className="h-4 w-4" />
            Track
          </a>
        )}
      </div>

      {s.scans?.length > 0 && (
        <div className="mt-4 max-h-56 space-y-2 overflow-y-auto rounded-xl bg-surface p-3">
          {[...s.scans].reverse().map((scan, i) => (
            <div key={i} className="border-l-2 border-accent/40 pl-3 text-xs">
              <p className="font-bold text-ink">{scan.activity}</p>
              <p className="text-mist">
                {scan.location} {scan.date && `- ${scan.date}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function OrderDetail({ order, onClose, onRefresh }) {
  if (!order) return null
  return (
    <Modal open onClose={onClose} title={`Order #${order._id}`}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mist">Customer</p>
            <p className="mt-1 font-bold text-ink">{order.customer?.name}</p>
            <p className="text-sm text-mist">{order.customer?.email}</p>
            {order.customer?.phone && <p className="text-sm text-mist">{order.customer.phone}</p>}
          </div>
          <div className="rounded-xl bg-surface p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-mist">Delivery Address</p>
            <p className="mt-1 text-sm font-semibold text-ink">{order.address?.line}</p>
            <p className="text-sm text-mist">
              {order.address?.city}, {order.address?.state} — {order.address?.pincode}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-mist">Items</p>
          <div className="space-y-3">
            {order.items?.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
                ) : (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-soft">📦</span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-ink">{item.name}</p>
                  <p className="text-xs text-mist">Qty {item.qty} × {formatINR(item.price)}</p>
                </div>
                <p className="text-sm font-extrabold text-ink">{formatINR(item.qty * item.price)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-mist">
            <span>Items total</span>
            <span className="font-semibold text-ink">{formatINR(order.itemsPrice)}</span>
          </div>
          <div className="flex justify-between text-mist">
            <span>Shipping</span>
            <span className="font-semibold text-ink">{formatINR(order.shippingPrice)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-ink">
            <span>Total</span>
            <span>{formatINR(order.totalPrice)}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge tone={statusTone[order.status] || 'slate'}>{order.status}</Badge>
            <Badge tone={order.paymentMethod === 'COD' ? 'amber' : 'green'}>{order.paymentMethod}</Badge>
            <Badge tone={order.paymentStatus === 'Paid' ? 'green' : 'amber'}>
              Payment: {order.paymentStatus}
            </Badge>
          </div>
        </div>

        <ShippingPanel order={order} onRefresh={onRefresh} />
      </div>
    </Modal>
  )
}

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [detail, setDetail] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(false)
  const [shippingConfig, setShippingConfig] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await adminApi.getOrders()
      setOrders(Array.isArray(data) ? data : [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    adminApi
      .getShippingConfig()
      .then(setShippingConfig)
      .catch(() => setShippingConfig(null))
  }, [])

  const filtered = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter)

  const changeStatus = async (order, status) => {
    try {
      await adminApi.updateOrder(order._id, { status })
      setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)))
    } catch (err) {
      alert(err.message)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await adminApi.deleteOrder(confirm._id)
      setConfirm(null)
      await load()
    } catch (err) {
      alert(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Track and update customer orders"
        actions={
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        }
      />

      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-600">{error}</p>
        </Card>
      )}

      {shippingConfig && !shippingConfig.configured && (
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <p className="text-sm font-semibold text-amber-700">
            Shiprocket is not configured yet — orders will stay unshipped. Missing:{' '}
            <span className="font-bold">{shippingConfig.missing.join(', ')}</span>
          </p>
        </Card>
      )}

      {shippingConfig?.connection?.error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <p className="text-sm font-semibold text-red-600">
            Shiprocket connection failed: {shippingConfig.connection.error}
          </p>
        </Card>
      )}

      <Card className="overflow-hidden p-0">
        {loading ? (
          <div className="space-y-3 p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-surface" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon="🧾" title="No orders found" sub="Orders placed on the store will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="border-b border-line bg-surface/60">
                <tr>
                  <Th>Order</Th>
                  <Th>Customer</Th>
                  <Th>Items</Th>
                  <Th>Total</Th>
                  <Th>Payment</Th>
                  <Th>Shipping</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((order) => (
                  <tr key={order._id} className="transition hover:bg-surface/50">
                    <Td>
                      <p className="font-bold text-ink">#{order._id?.slice(-6)}</p>
                      <p className="text-xs text-mist">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </Td>
                    <Td>
                      <p className="font-bold text-ink">{order.customer?.name}</p>
                      <p className="max-w-[180px] truncate text-xs text-mist">{order.customer?.email}</p>
                    </Td>
                    <Td>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                        <ShoppingBag className="h-4 w-4 text-accent" />
                        {order.items?.length} item(s)
                      </span>
                    </Td>
                    <Td>
                      <p className="font-extrabold text-ink">{formatINR(order.totalPrice)}</p>
                    </Td>
                    <Td>
                      <Badge tone={order.paymentMethod === 'COD' ? 'amber' : 'green'}>
                        {order.paymentMethod}
                      </Badge>
                    </Td>
                    <Td>
                      <div className="flex flex-col gap-1">
                        <Badge tone={SHIP_TONE[order.shipping?.status] || 'slate'}>
                          {order.shipping?.status || 'NotReady'}
                        </Badge>
                        {order.shipping?.awb && (
                          <span className="text-[11px] font-semibold text-mist">AWB {order.shipping.awb}</span>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <select
                        value={order.status}
                        onChange={(e) => changeStatus(order, e.target.value)}
                        className="rounded-lg border border-line bg-surface px-2 py-1.5 text-xs font-bold text-ink outline-none focus:border-accent/60"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </Td>
                    <Td>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setDetail(order)}
                          aria-label="View order"
                          title="View"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-accent/50 hover:text-accent"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirm(order)}
                          aria-label="Delete order"
                          title="Delete"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mist transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <OrderDetail order={detail} onClose={() => setDetail(null)} onRefresh={load} />

      <Modal open={Boolean(confirm)} title="Delete Order" onClose={() => setConfirm(null)}>
        <div className="space-y-5">
          <p className="text-sm leading-relaxed text-mist">
            Are you sure you want to delete order{' '}
            <span className="font-bold text-ink">#{confirm?._id?.slice(-6)}</span>? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Btn variant="outline" onClick={() => setConfirm(null)}>
              Cancel
            </Btn>
            <Btn variant="danger" onClick={remove} disabled={busy}>
              <Trash2 className="h-4 w-4" />
              {busy ? 'Deleting...' : 'Delete Order'}
            </Btn>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminOrders
