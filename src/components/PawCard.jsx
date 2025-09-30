import "./PawCard.css";

export default function PawCard({ post }) {
  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleString()
    : "";

  return (
    <article className="paw-card">
      <div className="paw-card-thumb">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} />
        ) : (
          <div className="paw-card-noimg">No image</div>
        )}
      </div>

      <div className="paw-card-content">
        <div className="paw-card-badges">
          <span className="paw-badge">{post.status}</span>
          <span className="paw-badge">{post.species}</span>
          <span className="paw-timestamp">{created}</span>
        </div>

        <h3 className="paw-card-title">{post.title}</h3>
        <p className="paw-card-desc">{post.description}</p>

        <div className="paw-card-meta">
          <strong>{post.city}</strong>
          {post.country ? `, ${post.country}` : ""}
        </div>

        {(post.contact_name || post.contact_phone || post.contact_email) && (
          <div className="paw-card-contacts">
            {post.contact_name && <span>👤 {post.contact_name} </span>}
            {post.contact_phone && <span> · 📞 {post.contact_phone} </span>}
            {post.contact_email && <span> · ✉️ {post.contact_email}</span>}
          </div>
        )}
      </div>
    </article>
  );
}
