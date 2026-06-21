import { useEffect, useState } from 'react'
import { fetchCollection } from '../api/config.js'

function formatMeta(meta) {
  const entries = Object.entries(meta || {}).filter(([, value]) => value !== undefined && value !== null && value !== '')

  if (entries.length === 0) {
    return null
  }

  return entries.map(([key, value]) => `${key}: ${value}`).join(' · ')
}

function ResourcePage({
  title,
  description,
  endpoint,
  columns,
  emptyMessage,
  badges = [],
}) {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadItems() {
      setLoading(true)
      setError('')

      try {
        const payload = await fetchCollection(endpoint())

        if (!active) {
          return
        }

        setItems(payload.items)
        setCount(payload.count)
        setMeta(payload.meta)
      } catch (loadError) {
        if (!active) {
          return
        }

        setError(loadError instanceof Error ? loadError.message : 'Failed to load data.')
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadItems()

    return () => {
      active = false
    }
  }, [endpoint])

  return (
    <section className="resource-grid">
      <div className="d-flex flex-column gap-3 gap-lg-0 flex-lg-row align-items-lg-end justify-content-lg-between">
        <div>
          <h2 className="h1 mb-2">{title}</h2>
          <p className="text-secondary">{description}</p>
        </div>
        <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
          <span className="metric-pill">{count} records</span>
          {badges.map((badge) => (
            <span key={badge} className="badge text-bg-light border px-3 py-2">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="card resource-card">
        <div className="card-body p-0">
          {loading ? (
            <div className="resource-empty">
              <div className="spinner-border text-warning" role="status" aria-hidden="true"></div>
              <p className="mt-3">Loading {title.toLowerCase()}...</p>
            </div>
          ) : error ? (
            <div className="resource-empty">
              <p className="text-danger fw-semibold mb-2">Unable to load data</p>
              <p>{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="resource-empty">{emptyMessage}</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover resource-table align-middle">
                <thead className="table-light">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.header} scope="col">
                        {column.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item._id || item.id || `${title}-${index}`}>
                      {columns.map((column) => (
                        <td key={column.header}>{column.render(item, index)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {!loading && !error && formatMeta(meta) ? (
          <div className="card-footer bg-white border-top-0 pt-0 pb-4 text-secondary small">
            {formatMeta(meta)}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ResourcePage