import { Search } from '../components/Search';
import { ListHero } from '../components/ListHero';
import { Paginate } from '../components/Paginate';

import { useHero } from '../hooks/useHero';

export function Home() {
  const { filteredHero } = useHero();

  return (
    <div className="container">
      <Search />
      <main className="herolist">
        {
          (filteredHero.length < 1) ? (
            <strong className="not-found-hero">Nenhum herói listado, faça outra busca =)</strong>
          ) : 
          (
          <table>
            <thead>
              <tr>
                <th>Personagem</th>
                <th>Séries</th>
                <th>Eventos</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredHero.map(hero => {
                  return(
                    <ListHero
                      key={hero.id}
                      id={hero.id}
                      name={hero.name}
                      avatar={hero.thumbnail}
                      series={hero.series}
                      events={hero.events}
                    />
                  )
                })
              }
            </tbody>
          </table>
        )}
      </main>
      {/* <Paginate /> */}
    </div>
  )
}