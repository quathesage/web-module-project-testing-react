import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

const testShow = {
  name: 'name',
  summary: 'This is a summary',
  seasons: [
    {id: 1,name:'season 1',episode:[]},
    {id: 2,name: 'season 2',episode:[]},
    {id: 3,name: 'season 3',episode:[]}
  ]
}

test('renders without errors', ()=>{
  render(<Show show={testShow} selectedSeason={'none'} />)
});

test('renders Loading component when prop show is null', () => {
  render(<Show show={null} selectedSeason={'none'} />);

  const loadingData = screen.getByText(/fetching data/i);

  expect(loadingData).toBeInTheDocument();
});


test('renders same number of options seasons are passed in', ()=>{
  render(<Show show={testShow} selectedSeason={'none'} />);

  const seasons = screen.queryAllByTestId('season-option');

  expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
  const fakeGetData = jest.fn();

  render(<Show  show={testShow} selectedSeason={'none'} handleSelect={fakeGetData} />);

  const seasons = screen.queryByLabelText(/Select A Season/i);
  userEvent.selectOptions(seasons, ['1']);

  expect(fakeGetData).toBeCalledTimes(1);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
  const { rerender } = render(<Show show={testShow} selectedSeason={'none'} />);

  let episodes = screen.queryByTestId(/episodes-container/i);
  expect(episodes).not.toBeInTheDocument();

  rerender(<Show show={testShow} selectedSeason={1} />);
  episodes = screen.queryByTestId(/episodes-container/i);
  expect(episodes).toBeInTheDocument();
});
