import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { City } from '../models/City';

interface CityListProps {
  cities: City[]; // Lista completa de ciudades
}

const CityList: React.FC<CityListProps> = ({ cities }) => {
  const [visibleCities, setVisibleCities] = useState<City[]>([]); // Ciudades visibles actualmente
  const [page, setPage] = useState(1); // Página actual
  const ITEMS_PER_PAGE = 60; // Número de ciudades por página

  // Inicializa las ciudades visibles al cargar el componente o cuando cambien las ciudades
  useEffect(() => {
    if (cities && cities.length > 0) {
      setVisibleCities(cities.slice(0, ITEMS_PER_PAGE));
    }
  }, [cities]);

  // Carga más ciudades al alcanzar el final del scroll
  const loadMoreCities = useCallback(() => {
    const nextPage = page + 1;
    const nextCities = cities.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleCities(nextCities);
    setPage(nextPage);
  }, [page, cities]);

  // Detecta si el usuario ha llegado al final del scroll
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollTop, offsetHeight } = document.documentElement;

    if (innerHeight + scrollTop >= offsetHeight - 200) {
      loadMoreCities();
    }
  }, [loadMoreCities]);

  // Agrega y limpia el evento de scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="city-list-container">
      {visibleCities.map((city) => (
        <Card
          key={`${city.name}-${city.lat}-${city.lng}`}
          className="city-card"
        >
          <CardContent>
            <Typography variant="h6">{city.name}</Typography>
            <Typography variant="body2">
              <strong>Country:</strong> {city.country}
            </Typography>
            <Typography variant="body2">
              <strong>Latitude:</strong> {city.lat}
            </Typography>
            <Typography variant="body2">
              <strong>Longitude:</strong> {city.lng}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default React.memo(CityList);
