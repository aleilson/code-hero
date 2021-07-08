import { Link } from 'react-router-dom';
import { useHero } from '../../hooks/useHero';
import './styles.scss';

export function Hero() {
  const { hero } = useHero();

  return (
    <div className="container">
      <div className="hero">
        <Link className="hero__returnlist" to="/" >Voltar</Link>
        <div className="hero__details" key={hero?.id}>
          <div className="hero__profile">
            <figure>
              <img src={hero?.thumbnail} alt={hero?.name} />
            </figure>

            <strong className="hero__profile--name">{hero?.name}</strong>
          </div>

          <div className="hero__content">
            <div className="hero__content--series">
              <strong className="hero__content--series-title">Series</strong>

              {hero?.series.items.map(serie => {
                return (
                  <span key={serie.name} className="hero__content--series-name">{serie.name}</span>
                )
              })}
            </div>

            <div className="hero__content--events">
              <strong className="hero__content--events-title">Eventos</strong>

              {hero?.events.items.map(event => {
                return (
                  <span key={event.name} className="hero__content--events-name">{event.name}</span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}