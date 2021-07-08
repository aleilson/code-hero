import { useHistory } from 'react-router-dom';
import { useHero } from '../../hooks/useHero';
import './styles.scss';

type HeroProps = {
  id: number;
  name: string;
  avatar: string;
  series: {
    items: [
      {
        name: string
      }
    ]
  }
  events: {
    items: [
      {
        name: string
      }
    ]
  }
}

export function ListHero({id, name, avatar, series, events}: HeroProps) {
  const history = useHistory();
  const { heroDetails, setLoading } = useHero();

  let filterSeries = series.items.slice(0, 3);
  let filterEvents = events.items.slice(0, 3);

  function detailsHero() {
    setLoading(true);
    heroDetails(id);
    history.push(`/hero/${id}`);
  }

  return (
    <tr key={id} onClick={detailsHero}>
      <td>
        <div className="herolist__person">
          <div className="herolist__person--avatar">
            <img src={avatar} alt={name} />
          </div>
          <strong className="herolist__person--name">{name}</strong>
        </div>
      </td>
      <td>
        { (filterSeries.length < 1) ? (
          <span>Nehuma serie encontrada</span>
        ) :
        (
          filterSeries.map((serie) => {
            return (
              <span key={serie.name}>{serie.name}</span>
            )
          })
        )}
      </td>
      <td>
        { (filterEvents.length < 1) ? (
          <span>Nenhum evento encontrado</span>
        ) :
        (
          filterEvents.map((event) => {
            return (
              <span key={event.name}>{event.name}</span>
            )
          })
        )}
      </td>
    </tr>
  );
}