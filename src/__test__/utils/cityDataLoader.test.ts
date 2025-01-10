import axios from 'axios';
import { loadCities } from '../../utils/cityDataLoader';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('loads cities correctly', async () => {
  const mockData = [
    { country: "CA", name: 'City A', lat: '10.0', lng: '20.0' },  
    { country: "CB", name: 'City B', lat: '15.0', lng: '25.0' },
  ];
  mockedAxios.get.mockResolvedValueOnce({ data: mockData });

  const cities = await loadCities();
  expect(cities).toHaveLength(2);
  expect(cities[0]).toEqual({  country: "CA", name: 'City A', lat: '10.0', lng: '20.0' });
});
