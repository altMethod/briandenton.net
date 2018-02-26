# Angular 5 / Firebase / Blog

This is the source for my personal blog project created with an Angular 5 frontend and Firebase backend. The goal for this project was to create a minimalist blog with Angular that carried most of the features one would expect to have. See it running here [briandenton.net](https://briandenton.net).

#### Technologies Used:
- Angular CLI 1.6
- Angular 5
- Firebase Cloud Firestore
- Firebase Authentication
- ClarityUI for Angular

#### Features Included:
- Ability to create, read, view and delete posts.
- Full admin panel to manage posts and projects (Contact page management coming soon)
- TinyMCE for post creation and editing
- Project page to list current projects
- Contact page

## Production Configuration
Edit `environment.prod.ts` and include your Firebase information. Run `npm install` and wait a while.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Check `package.json` for alternative serve options.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. Check `package.json` for alternative build options.

## Todo
- Contact Page Management
- Add Image Uploading (Images are supported by external URL's atm)
- Post Tags and Categories
- Service Worker Configuration (It has issues)
