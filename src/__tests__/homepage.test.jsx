import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

jest.mock('@/components/carousel', () => () => <div data-testid="carousel-mock">Carousel Mock</div>);

describe('Home Page', () => {
    test('renders welcome message', () => {
        render(<Home />);
        expect(screen.getByText("Welcome to the MakerSpace Garden!")).toBeInTheDocument();
    })
})