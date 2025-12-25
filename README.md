# Enhanced Recipe Editor

A comprehensive, professional-grade recipe management application built with React. Features include cost analysis, undo/redo functionality, bulk ingredient import, and advanced keyboard navigation.

## ✨ Features

### 🏗️ **Modular Architecture**
- **Separated Components**: RecipeInformation, MenuPricing, IngredientsSection, InstructionsAndNotes
- **Reusable Utilities**: Centralized business logic and validation
- **Clean Data Flow**: Proper state management with history tracking

### ♿ **Accessibility & UX** 
- **Full Keyboard Navigation**: Tab through forms, Enter to advance fields
- **ARIA Labels**: Screen reader compatible
- **Focus Management**: Proper focus indicators and navigation
- **Semantic HTML**: Proper landmarks and structure

### ↩️ **Undo/Redo System**
- **History Tracking**: Full state history with past/present/future
- **Keyboard Shortcuts**: Ctrl+Z/Ctrl+Y support
- **Visual Indicators**: Undo/redo buttons with state awareness
- **Granular Changes**: Track specific field modifications

### 📊 **Cost Analysis**
- **Interactive Charts**: Pie chart showing ingredient cost breakdown
- **Pricing Recommendations**: Auto-calculated menu pricing
- **Food Cost Percentage**: Real-time cost analysis with status indicators
- **Bulk Pricing**: Quick pricing actions (+10%, +20%, round up)

### 📥 **Bulk Import**
- **Smart Parsing**: Handles multiple ingredient formats
- **Database Matching**: Auto-populates costs from ingredient database
- **Error Handling**: Clear feedback on parsing issues
- **Flexible Format**: Supports "2 cups flour" or "1 lb chicken - $4.50"

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or create the project structure:**
```bash
mkdir enhanced-recipe-editor
cd enhanced-recipe-editor
npm init -y
```

2. **Install dependencies:**
```bash
npm install react react-dom react-scripts recharts web-vitals
npm install -D @tailwindcss/forms autoprefixer postcss tailwindcss eslint prettier
```

3. **Create the file structure** (see File Structure section below)

4. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

5. **Start development server:**
```bash
npm start
```

6. **Open browser:**
Navigate to `http://localhost:3000`

## 📁 File Structure

```
enhanced-recipe-editor/
├── public/
│   ├── index.html              # HTML template with PWA support
│   ├── manifest.json           # Web app manifest
│   └── favicon.ico            # App icon
├── src/
│   ├── components/            # React components
│   │   ├── RecipeEditor.jsx      # Main editor component
│   │   ├── RecipeInformation.jsx # Basic recipe info form
│   │   ├── MenuPricing.jsx       # Cost analysis & pricing
│   │   ├── IngredientsSection.jsx # Enhanced ingredients table
│   │   ├── InstructionsAndNotes.jsx # Recipe steps & notes
│   │   ├── CostBreakdownChart.jsx # Pie chart visualization
│   │   └── BulkImportModal.jsx   # Bulk ingredient import
│   ├── constants/             # Static data and configuration
│   │   └── recipeConstants.js    # Ingredient database & options
│   ├── utils/                 # Business logic and utilities
│   │   └── recipeUtils.js        # Cost calculations & validation
│   ├── reducers/              # State management
│   │   └── historyReducer.js     # Undo/redo functionality
│   ├── App.jsx               # Main app component
│   ├── App.css               # Component-specific styles
│   ├── index.js              # Entry point with error boundary
│   ├── index.css             # Base styles and Tailwind imports
│   └── reportWebVitals.js    # Performance monitoring
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                # This file
```

## 🎯 Usage Guide

### Basic Recipe Creation
1. **Enter Recipe Information**: Name, type, cuisine, yield, timing
2. **Set Dietary Information**: Check applicable dietary restrictions  
3. **Add Ingredients**: Use the table or bulk import feature
4. **Cost Analysis**: Set menu price and view cost breakdown
5. **Write Instructions**: Use numbered steps with formatting tools
6. **Add Notes**: Include storage tips, variations, substitutions

### Keyboard Shortcuts
- `Ctrl+S` - Save recipe
- `Ctrl+Z` - Undo last change
- `Ctrl+Y` - Redo last undone change
- `Ctrl+/` - Show/hide keyboard help
- `Enter` - Next field (in ingredient table)
- `Ctrl+Delete` - Delete ingredient (when focused on name)
- `Escape` - Close modal dialogs

### Bulk Import Format
```
2 cups all-purpose flour
1 lb chicken breast - $4.50
3 tbsp olive oil
4 cloves garlic
1 tsp salt
```

## 🛠️ Development

### Available Scripts
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix linting issues
npm run format     # Format code with Prettier
```

### Code Quality
- **ESLint**: Configured with React best practices
- **Prettier**: Consistent code formatting
- **Accessibility**: WCAG 2.1 compliant components

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle size
- **Memoization**: React.memo and useMemo where appropriate
- **Debounced Updates**: Prevents excessive re-renders
- **Virtual Scrolling**: For large ingredient lists

## 🎨 Customization

### Styling
- **Tailwind CSS**: Utility-first styling with custom configuration
- **Custom Components**: Reusable button and form styles
- **Color Scheme**: Customizable via `tailwind.config.js`
- **Responsive Design**: Mobile-first approach

### Business Logic
- **Ingredient Database**: Add/modify in `constants/recipeConstants.js`
- **Cost Calculations**: Customize in `utils/recipeUtils.js`
- **Validation Rules**: Modify in validation functions

### Features
- **New Components**: Follow existing component patterns
- **State Management**: Use history reducer for undoable actions
- **API Integration**: Replace mock data with real API calls

## 🧪 Testing

### Test Categories
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Performance Tests**: Bundle size and render performance

### Running Tests
```bash
npm test                    # Interactive test runner
npm test -- --coverage     # With coverage report
npm test -- --watchAll     # Watch all files
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repository
- **AWS S3**: Static website hosting
- **Docker**: Containerized deployment

### Environment Variables
```bash
REACT_APP_API_URL=https://api.example.com
REACT_APP_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following code style guidelines
4. Add tests for new functionality
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Create Pull Request

### Code Style
- Use functional components with hooks
- Follow existing naming conventions
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Write tests for new features

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

### Common Issues
- **Slow Performance**: Check for unnecessary re-renders
- **Keyboard Navigation**: Ensure proper tab order
- **Cost Calculations**: Verify ingredient database entries
- **Import Errors**: Check ingredient format syntax

### Getting Help
1. Check existing GitHub issues
2. Create detailed bug report with steps to reproduce
3. Include browser version and error console output
4. Provide sample recipe data if relevant

## 🗺️ Roadmap

### Upcoming Features
- [ ] Recipe scaling with automatic unit conversion
- [ ] Nutritional information calculation
- [ ] Recipe sharing and collaboration
- [ ] Advanced search and filtering
- [ ] Recipe templates and categories
- [ ] Print-friendly recipe cards
- [ ] Mobile app companion
- [ ] Integration with inventory systems

### Performance Improvements
- [ ] Virtual scrolling for large lists
- [ ] Offline support with service workers
- [ ] Advanced caching strategies
- [ ] Bundle size optimization

---

**Built with ❤️ for professional kitchens and food service operations**