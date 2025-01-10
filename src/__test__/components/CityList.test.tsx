import React from "react";
import { render, screen } from "@testing-library/react";
import CityList from "../../components/CityList";

const mockCities = [
  { name: "City A", country: "Country A", lat: 10, lng: 20 },
  { name: "City B", country: "Country B", lat: 15, lng: 25 },
  { name: "City C", country: "Country C", lat: 20, lng: 30 },
];

describe("CityList", () => {
  test("renders the initial list of cities", () => {
    render(<CityList cities={mockCities} />);
    expect(screen.getByText(/City A/i)).toBeInTheDocument();
    expect(screen.getByText(/City B/i)).toBeInTheDocument();
    expect(screen.getByText(/City C/i)).toBeInTheDocument();
  });

  test("handles an empty city list", () => {
    render(<CityList cities={[]} />);
    expect(screen.queryByText(/City A/i)).not.toBeInTheDocument();
  });
});
