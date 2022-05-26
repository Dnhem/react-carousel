import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Snoke Test
it("renders without crashing", () => {
  render(<Carousel />);
});

// Snapshot Test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

// expect left arrow to be hidden while on first image and right arrow to be hidden on last image

it("arrows to be hidden on designated images", () => {
  const { queryByTestId } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  //  expect left arrow to be hidden when on first image
  expect(leftArrow).toHaveClass("Carousel-hidden");
  expect(rightArrow).not.toHaveClass("Carousel-hidden");

  // expect both arrows to be visible after click on right arrow
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("Carousel-hidden");
  expect(rightArrow).not.toHaveClass("Carousel-hidden");

  // expect right arrow to be missing on last image
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("Carousel-hidden");
  expect(rightArrow).toHaveClass("Carousel-hidden");
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");
  // Move one to the right
  fireEvent.click(rightArrow);
  // Move one back to left

  fireEvent.click(leftArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});
