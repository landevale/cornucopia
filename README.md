# Project 2

## Setup

- Create vite react folder
- Clear the unnecessary stuff
- Create a repo in github

```git
git init
git add -A
git commit -m 'First commit'

// copied from github
git remote add origin git@github.com:XXX
git branch -M main
git push -u origin main
```

- Goto Vercel and create a new project
- Deploy with a test fetch() -> check API is ok

## Planning

- User stories / journey
  - Able to search for cards
  - See all cards in a set
  - Fav some cards
- Wireframe
  - SearchPage -> /
  - SetPage -> /sets/:code
  - FavPage -> /favs
- Mock the UI and use Component libraries

## Lifting State

Cards --> Favs (Child --> Sibling)

Find the closest common parent -> App

Shift the state from Cards to App -> pass addFav() prop -> Cards

## Libraries

### Insane

- Jest
- React Testing Library

### Complex Libraries Pick One?

- Maps
- Chart
- Calendar
- Component Toolkits
- Typescript
- Redux
- D3

### Medium

- tailwind
- styled components
- Date & time

### Small

- lodash
- debug
- Axios

### Rejected

- Data Fetching
- Form
- State management
