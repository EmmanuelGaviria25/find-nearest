import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import { loadCities } from "../utils/cityDataLoader";

jest.mock("../utils/cityDataLoader", () => ({
  loadCities: jest.fn(() =>
    Promise.resolve([
      { name: "City A", country: "Country A", lat: 10, lng: 20 },
      { name: "City B", country: "Country B", lat: 15, lng: 25 },
      { name: "City C", country: "Country C", lat: 20, lng: 30 },
    ])
  ),
}));

describe("App Component", () => {
  test("clears the search and displays all cities when input is cleared", async () => {
    render(<App />);

    // Espera a que el componente se cargue y muestre el combobox
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    // Abre el menú de React-Select
    fireEvent.keyDown(screen.getByRole("combobox"), { key: "ArrowDown" });

    // Verifica que las opciones se rendericen
    await waitFor(() => {
      expect(screen.getByText(/City A/i)).toBeInTheDocument();
      expect(screen.getByText(/City B/i)).toBeInTheDocument();
      expect(screen.getByText(/City C/i)).toBeInTheDocument();
    });

    // Simula limpiar el input
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    // Verifica que todas las ciudades se rendericen nuevamente
    await waitFor(() => {
      expect(screen.getByText(/City A/i)).toBeInTheDocument();
      expect(screen.getByText(/City B/i)).toBeInTheDocument();
      expect(screen.getByText(/City C/i)).toBeInTheDocument();
    });
  });
});
