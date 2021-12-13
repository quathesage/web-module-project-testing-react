import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

const testEpisodeWithoutImage = {
  id: 1,
  name: '',
  iamge: null,
  season: 1,
  number: 1,
  summary: 'This is a summary',
  runtime: 1
}

const testEpisode = {
  id: 1,
  name: '',
  image: 'imageUrl',
  season: 1,
  number: 1,
  summary: 'This is a summary',
  runtime: 1,
}

test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", ()=>{
  render(<Episode episode={testEpisode} />);

  const summary = screen.queryByText(/This is a summary/i);

  expect(summary).toBeInTheDocument();
  expect(summary).toHaveTextContent('This is a summary');
  expect(summary).toBeTruthy();
});

test("renders default image when image is not defined", ()=>{
  render(<Episode episode={testEpisodeWithoutImage} />);

  const image = screen.getByRole('img')
  const tag = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

  expect(image).toBeInTheDocument();
  expect(tag).toBeInTheDocument();
});
