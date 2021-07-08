
import './styles.scss';
import { FaSearch } from 'react-icons/fa';
import { useHero } from '../../hooks/useHero';

export function Search() {
  const { setSearch } = useHero();

  return (
   <div className="search">
      <h1 className="search__title">Busca de personagens</h1>
      <span className="search__description">Nome do personagem</span>

      <div className="search__input">
        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
        <FaSearch/>
      </div>
   </div>
  )
}