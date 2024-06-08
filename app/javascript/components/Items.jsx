import React, { useEffect, useState } from "react";

export default () => {
  const [items, setItems] = useState();

  const loadItems = async () => {
    response = await (await fetch("/api/items")).json()
    setItems(response.items);
  }

  const remove = async (id) => {
    await fetch(`/api/items/${id}`, {method: "DELETE"});
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, [])

  return <div>
    <h1>Watchlist</h1>
    {items && <div>
      {items.map(item => <div key={item.id}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-3">
              <a target="_blank" href={["https://fmovies24.to/filter", new URLSearchParams({keyword: item.title})].join("?")}>
                <img src={item.image_url} className="img-fluid rounded-start" width="100%"/>
              </a>
            </div>
            <div className="col-7">
              <div className="card-body">
                <p className="card-title">{item.title}</p>
                <p className="card-text"><small className="text-body-secondary">{item.type} {item.released_on}</small></p>
              </div>
            </div>
            <div className="col-2">
              <button className="btn btn-primary btn-sm btn-column" onClick={() => remove(item.id)}>-</button>
            </div>
          </div>
        </div>
      </div>)}
    </div>}
  </div>
}