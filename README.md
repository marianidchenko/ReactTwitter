## Tweeter - Twitter-like

This application demo is a twitter-like social media application

# Important: the code would require a firebase-config file to run locally, since it's not uploaded you can find it hosted here https://tweeter-4742e.web.app/

## Features

- Full authentication (registration and login)
- Public parts, for everyone, and private ones for the ones with a profile
- Profile customization with bio, profile photo, banner and more
- Ability to create posts with or without media as an authenticated user

- Liking, saving and commenting on posts made by other users
- The ability to tweet and delete (or edit if you prefer that)
- Following others and keeping track of how many people have followed you
- Checking out other profiles and all of their posting and commenting history, as well as their likes (They get some privacy with their bookmarks)
- Keeping track of your favourite posts with bookmarks
- Editing your profile.

- Error handling, data validation and default values where needed, no console errors here.
- Responsive design on PC, laptop and standard tablets (mobile is in the works)

## Currently static aspects 
- The trends and recommendations sidebar, the algorithm is in the works
- Explore (Currently just Home), notifications, messages, lists

## Project architecture
- Components separated in their own folders, and nested where needed, each with a module.css file 
(with exceptions of common css like auth-forms and error-pages)
- Context, custom routes, custom hooks and services all separated in their own folders for easy management in src
- Contexts take care of mostly globally available values, but some are simply passed between components where needed
- Custom routes in the app to ensure that irrelevant to the authentication status components are not accessible