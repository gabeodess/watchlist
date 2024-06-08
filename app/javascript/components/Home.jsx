import React, {useEffect, useState} from "react";

export default () => {

  const [results, setResults] = useState();
  const [query, setQuery] = useState("");
  const [list, setList] = useState();

  const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGZkMmEwMmQ2NGIzNmI4NzI2MGM0MzQwYTI0MzE0MCIsInN1YiI6IjY1YzY4MzZjYTMxNDQwMDE0YzhjNmI2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GVUpaBy3t3-gESqk8oaT4UdxhUX_DhlrQMgTsNSSH4'
    }
  }

  const trending = async () => {
    setResults((await (await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', fetchOptions)).json()).results)
  }

  const search = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      query,
      page: 1,
    })
    const base = "https://api.themoviedb.org/3/search/multi"
    const response = await (await fetch([base, params].join("?"), fetchOptions)).json()
    setResults(response.results);
  }

  const add = async (production) => {
    await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify({production}),
      headers: {"Content-Type": "application/json"},  
    });
    loadList();
  }

  const remove = async (id) => {
    await fetch(`/api/items/${id}`, {method: "DELETE"});
    loadList();
  }

  const loadList = async () => {
    setList(await (await fetch("/api/list")).json());
  }

  useEffect(() => {
    loadList()
    trending()
  }, [])

  return (
    <div>
      <form onSubmit={search}>
        <div className="input-group input-group-lg mb-3">
          <input 
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text" 
            className="form-control" 
            placeholder="Title..."
            aria-describedby="button-addon2"
            autoFocus />
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      {results && <div>
        <hr/>
        {results.length === 0 && <div>
          No results
        </div>}
        {results.length > 0 && <div className="">
          {results.map(result => {
            const production = {
              title: result.title || result.name || result.original_title,
              type: result.media_type === "tv" ? "Series" : "Movie",
              released_on: result.first_air_date || result.release_date,
              themoviedb_id: result.id,
              image_url: `https://image.tmdb.org/t/p/original/${result.poster_path}`
            };
            
            return <div key={result.id} className="">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-3">
                    <img src={production.image_url} className="img-fluid rounded-start" width="100%"/>
                  </div>
                  <div className="col-7">
                    <div className="card-body">
                      <p className="card-title">{production.title}</p>
                      <p className="card-text"><small className="text-body-secondary">{result.media_type} {production.released_on?.split('-')[0]}</small></p>
                    </div>
                  </div>
                  <div className="col-2">
                    {list && (
                      !list[result.id]
                        ? <button className="btn btn-success btn-sm btn-column" onClick={() => add(production)}>+</button>
                        : <button className="btn btn-primary btn-sm btn-column" onClick={() => remove(list[result.id].id)}>-</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>}
      </div>}
    </div>
  )
};
