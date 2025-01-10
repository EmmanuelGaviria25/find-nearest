import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Select from 'react-select';
import { City } from '../models/City';

interface CitySearchProps {
  cities: City[];
  onCitySelect: (city: City | null) => void; 
  onSearchChange: (text: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ cities, onCitySelect, onSearchChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [visibleCities, setVisibleCities] = useState<City[]>([]);

  const ITEMS_PER_PAGE = 60;
  
  useEffect(() => {
    if (cities && cities.length > 0) {
      setVisibleCities(cities.slice(0, ITEMS_PER_PAGE));
    }
  }, [cities]);

  const updateVisibleCities = useCallback(
    (value: string) => {
      const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(value.toLowerCase())
      );
      setVisibleCities(filteredCities.slice(0, ITEMS_PER_PAGE));
    },
    [cities]
  );
  
  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      onSearchChange(value);
      updateVisibleCities(value);
    },
    [onSearchChange, updateVisibleCities]
  );
  
  const handleLoadMore = useCallback(() => {
    const currentCount = visibleCities.length;
    const additionalCities = cities
      .filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(currentCount, currentCount + ITEMS_PER_PAGE);

    setVisibleCities(prev => [...prev, ...additionalCities]);
  }, [inputValue, visibleCities.length, cities]);
  
  const handleClearSelect = useCallback(() => {
    setInputValue('');
    setVisibleCities(cities.slice(0, ITEMS_PER_PAGE));
    onSearchChange('');
    onCitySelect(null);
  }, [cities, onSearchChange, onCitySelect]);

  const options = useMemo(
    () =>
      visibleCities.map(city => ({
        value: city,
        label: city.name,
      })),
    [visibleCities]
  );

  return (
    <div>
      <Select
        options={options}
        onInputChange={handleInputChange}
        onChange={option => {
          if (option) {
            onCitySelect(option.value);
          } else {
            handleClearSelect();
          }
        }}
        isClearable
        autoFocus={false}
        menuPortalTarget={document.body}
        menuShouldScrollIntoView={false}
        noOptionsMessage={() =>
          inputValue
            ? visibleCities.length === 0
              ? 'No cities found'
              : 'Loading...'
            : 'Start typing to search'
        }
        onMenuScrollToBottom={handleLoadMore}
      />
    </div>
  );
};

export default React.memo(CitySearch);
