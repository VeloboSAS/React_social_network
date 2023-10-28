import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";

import { configureStore } from '@reduxjs/toolkit'


test('renders learn react link', () => {
    const store = configureStore();
    render(<Provider store={store}><App /></Provider>);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

