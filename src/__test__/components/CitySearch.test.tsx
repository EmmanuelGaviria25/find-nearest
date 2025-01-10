import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CitySearch from "../../components/CitySearch";

const mockCities = [
  { name: "City A", country: "Country A", lat: 10, lng: 20 },
  { name: "City B", country: "Country B", lat: 15, lng: 25 },
  { name: "City C", country: "Country C", lat: 20, lng: 30 },
];

describe("CitySearch Component", () => {
  test("renders with initial cities", async () => {
    const onCitySelect = jest.fn();
    const onSearchChange = jest.fn();

    render(
      <CitySearch
        cities={mockCities}
        onCitySelect={onCitySelect}
        onSearchChange={onSearchChange}
      />
    );

    // Abre el menú de React-Select
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });

    // Espera a que las opciones se rendericen
    await waitFor(() => {
      expect(screen.getByText(/City A/i)).toBeInTheDocument();
      expect(screen.getByText(/City B/i)).toBeInTheDocument();
      expect(screen.getByText(/City C/i)).toBeInTheDocument();
    });
  });

  test("calls onCitySelect when a city is selected", async () => {
    const onCitySelect = jest.fn();
    const onSearchChange = jest.fn();

    render(
      <CitySearch
        cities={mockCities}
        onCitySelect={onCitySelect}
        onSearchChange={onSearchChange}
      />
    );

    // Abre el menú de React-Select
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });

    // Selecciona "City A"
    fireEvent.click(screen.getByText(/City A/i));

    // Verifica que se llame `onCitySelect` con los datos de "City A"
    await waitFor(() => {
      expect(onCitySelect).toHaveBeenCalledWith(mockCities[0]);
    });
  });

  test("calls onSearchChange when input changes", async () => {
    const onCitySelect = jest.fn();
    const onSearchChange = jest.fn();

    render(
      <CitySearch
        cities={mockCities}
        onCitySelect={onCitySelect}
        onSearchChange={onSearchChange}
      />
    );

    // Cambia el valor del input
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "City" } });

    // Verifica que se llame `onSearchChange` con el texto ingresado
    await waitFor(() => {
      expect(onSearchChange).toHaveBeenCalledWith("City");
    });
  });
});
