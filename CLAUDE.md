# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm start                        # Start development server on http://localhost:3000
npm test                         # Run tests in interactive watch mode
npm run build                    # Build app for production to the build folder

# Testing
npm test -- --coverage           # Run tests with coverage report
npm test -- --watchAll=false     # Run tests once without watch mode
npm test -- src/App.test.js      # Run a specific test file

# Deployment
npm run build && serve -s build  # Build and serve production build locally

# Git Operations (Windows)
./dual-push.bat                  # Push to both personal and work GitHub repos
```

## High-Level Architecture

This is a React-based coworking space management application with a unique dual-mode architecture supporting both localStorage and Firebase backends.

### Core Architecture Patterns

1. **Dual Storage System** (`src/services/api.js`)
   - Primary: Firebase (Firestore + Storage) when configured
   - Fallback: localStorage for development/demo
   - Automatic detection and seamless switching between modes
   - Each page's data can exist in both "draft" and "published" states

2. **Authentication System** (`src/services/auth.js`)
   - Supports Firebase Auth (production) and simple demo auth (development)
   - Demo credentials available for testing (admin@coworking.com / admin123)
   - Session management with 24-hour timeout
   - Role-based permissions (admin, manager, editor)

3. **PageTemplates System** (`src/pageTemplates/`)
   - Centralized template architecture for all page sections
   - Template Registry: Dynamic template loading and rendering
   - Preset Manager: Pre-configured page layouts
   - Backward compatible with existing template settings
   - Hero Templates: Motive (alternating sections), Modern (gradient), Classic
   - Extensible system ready for new template types (features, CTA, etc.)

4. **Template Settings** (`src/hooks/useTemplateSettings.js`)
   - Per-page template selection and customization
   - Hero size controls (compact to xlarge)
   - Settings stored separately from page content
   - Live preview of template changes in admin interface

5. **Component Data Flow**
   - Pages use `usePageData` hook for content management
   - Real-time editing with contentEditable fields in admin mode
   - Changes tracked as drafts until explicitly published
   - Image uploads handled with progress tracking

### Key Implementation Details

- **Routing Structure**: Public routes (/, /about, /team, etc.) and protected admin routes (/admin/*)
- **State Management**: Context providers for Auth and TemplateSettings, custom hooks for data
- **Image Handling**: Base64 for localStorage, Firebase Storage URLs for production
- **Draft/Publish Workflow**: All edits saved as drafts, explicit publish action required
- **Responsive Design**: Tailwind CSS for styling, mobile-first approach
- **PageTemplates Architecture**:
  - BaseTemplate class for all templates to extend
  - Template registries for each template type
  - Automatic migration from old to new data structures
  - Motive-style hero with zigzag alternating sections

### Firebase Configuration

When `REACT_APP_USE_FIREBASE=true`, requires these environment variables:
- REACT_APP_FIREBASE_API_KEY
- REACT_APP_FIREBASE_AUTH_DOMAIN  
- REACT_APP_FIREBASE_PROJECT_ID
- REACT_APP_FIREBASE_STORAGE_BUCKET
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID
- REACT_APP_FIREBASE_APP_ID

### Development Workflow

1. The app defaults to localStorage mode for easy development
2. Admin interface accessible at `/admin/login`
3. All data changes are isolated to drafts until published
4. Use `dual-push.bat` for pushing to multiple Git remotes simultaneously

### PageTemplates Migration

The app has migrated to a new PageTemplates architecture:
- Old hero data automatically migrated to new sections format
- Templates now loaded dynamically from registry
- Backward compatibility maintained for existing data
- Migration runs automatically on first load

### Modern Template Updates (Following claudePlan.md)

The Modern template has been redesigned with:
- **Centered layout**: Full-screen centered design with max-width containers
- **Two-column grid**: Clean grid layout replacing flex approach
- **Alternating pattern**: 
  - Even rows (0,2,4): Text left (yellow bg + red border) / Image right
  - Odd rows (1,3,5): Image left / Text right (yellow bg + red border)
- **Styling details**:
  - Yellow background (`bg-yellow-200`) for text boxes
  - Red border (`border-4 border-red-500`) around text boxes
  - Fixed height (`h-80`) for both columns
  - Shadow on images (`shadow-lg`)
  - Subtle gradient dividers between features
- **Default image**: BlackSquareTempImage.jpg (moved to public folder)