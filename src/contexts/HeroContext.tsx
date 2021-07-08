import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from '../service/api';

import loadingImg from '../assets/images/loading.gif';

type Hero = {
  id: number;
  name: string;
  thumbnail: string;

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

type HeroContextType = {
  heros: Hero[];
  search: string,
  setSearch: (event: any) => void;
  setLoading: (event: any) => void;
  heroDetails: (event: any) => Promise<void>;
  filteredHero: Hero[];
  hero: Hero | undefined;
}

type HeroContextProps = {
  children: ReactNode;
}

export const HeroContext = createContext<HeroContextType>({} as HeroContextType);

export function HeroContextProvider(props: HeroContextProps) {
  const [loading, setLoading] = useState(false);
  const [heros, setHeros] = useState<Hero[]>([]);
  const [hero, setHero] = useState<Hero>();
  const [search, setSearch] = useState("");
  const [filteredHero, setFilteredHero] = useState<Hero[]>([]);

  const timestamp = '1625254179';
  const apiKey = '878a4df7d423eebb5f699f71a9549628';
  const hash = '566710ae5e859d67a9ae22bbdf7233a7';
  const infoToGetMarvel = `v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`;

  function getHeros () {
    api.get(`/${infoToGetMarvel}`).then(response => {
      let heroes: Hero[] = [];
      setLoading(false);
      response.data.data.results.map((result: any) => {
        let hero: Hero = {
          id: result.id,
          name: result.name,
          series: result.series,
          events: result.events,
          thumbnail: `${result.thumbnail.path}.${ result.thumbnail.extension}`
        }
        return heroes.push(hero);
      });

      setHeros(heroes);
    });
  }

  async function heroDetails (heroId: string) {
    await api.get(`/v1/public/characters/${heroId}?ts=${timestamp}&apikey=${apiKey}&hash=${hash}`).then(response => {
      setLoading(false);
      response.data.data.results.map((result: any) => {
      return setHero({
        id: result.id,
        name: result.name,
        series: result.series,
        events: result.events,
        thumbnail: `${result.thumbnail.path}.${ result.thumbnail.extension}`
        });
      });
    });
  }

  useEffect(() => {
    setLoading(true);
    getHeros();
  }, []);

  useEffect(() => {
    setFilteredHero(
      heros.filter((hero) =>
        hero.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, heros]);

  if (loading) {
    return <img className="is-loading" src={loadingImg} alt="Loading Heros" />;
  }
  
  return (
    <HeroContext.Provider value={{ heros, hero, search, setSearch, filteredHero, heroDetails, setLoading }}>
      {props.children}
    </HeroContext.Provider>
  )
}