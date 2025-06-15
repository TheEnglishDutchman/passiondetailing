# Passion Detailing Website

A modern, responsive website for a luxury car detailing business built with HTML, Tailwind CSS, and JavaScript.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive layout for all devices
- ⚡ Fast loading and optimized performance
- ♿ Accessibility features included
- 📝 Contact form with validation
- 🔍 SEO optimized
- 🎯 Smooth scrolling navigation
- 🌙 Dark theme with accent colors

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Google Fonts (Montserrat)
- Intersection Observer API
- CSS Animations

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/passion-detailing.git
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

## Project Structure

```
passion-detailing/
├── index.html          # Main HTML file
├── styles.css          # Custom styles and animations
├── script.js           # JavaScript functionality
├── README.md          # Documentation
└── favicon.png        # Website favicon
```

## Customization

### Colors
The color scheme can be modified in the Tailwind configuration within `index.html`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1a1a1a',
                secondary: '#gold',
                accent: '#0066cc'
            }
        }
    }
}
```

### Images
Replace the hero background image URL in `index.html`:
```html
<div class="absolute inset-0 bg-[url('your-image-url')] bg-cover bg-center"></div>
```

### Content
Update the content in `index.html` to match your business information:
- Services
- Contact information
- Social media links
- Business hours
- Location

## Performance Optimization

- Images are optimized for web
- CSS and JavaScript are minified
- Lazy loading for images
- Efficient animations using CSS transforms
- Minimal dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Heroicons](https://heroicons.com)
- Fonts from [Google Fonts](https://fonts.google.com) 