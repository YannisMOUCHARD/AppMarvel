import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
    beforeEach(() => {
        // Reset document title before each test
        document.title = '';
    });

    test('should have correct page title', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        expect(document.title).toBe('Contact - Marvel App');
    });

    test('should display contact heading', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        const heading = screen.getByRole('heading', { level: 2, name: 'Contactez-nous' });
        expect(heading).toBeInTheDocument();
    });

    test('should display contact information', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        // Check for the contact email
        expect(screen.getByText('contact@marvelapp.com')).toBeInTheDocument();
        
        // Check for the contact text content
        expect(screen.getByText(/Pour toute question ou suggestion/)).toBeInTheDocument();
        
        // Check for the email link
        const emailLink = screen.getByRole('link', { name: 'contact@marvelapp.com' });
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:contact@marvelapp.com');
    });

    test('should render page structure correctly', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        // Verify basic page structure
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        
        // Check if content is present
        expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
        expect(screen.getByText(/contact@marvelapp.com/)).toBeInTheDocument();
    });

    test('should display French contact content', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        // Test specific French content
        expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
        expect(screen.getByText(/vous pouvez nous écrire à/)).toBeInTheDocument();
    });

    test('should have accessible email link', () => {
        render(
            <BrowserRouter>
                <ContactPage />
            </BrowserRouter>
        );

        const emailLink = screen.getByRole('link');
        expect(emailLink).toBeInTheDocument();
        expect(emailLink).toHaveAttribute('href', 'mailto:contact@marvelapp.com');
        expect(emailLink).toHaveTextContent('contact@marvelapp.com');
    });
});