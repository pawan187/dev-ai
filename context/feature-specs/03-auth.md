Clerk is already installed and connected. Wire it into the Next.js app: provider, auth pages, redirects, route protection and user menu

## Design 

Use Clerk's dark theme from @clerk/ui/themes as the base.
Override Clerk appearnace variables using the app's existing CSS variables. Do not hardcode colors.

### Sign-in and sign-up pages;

- large screens: simple two-panel layout
- left: compact logo, tagline, short text-only feature list
- right: centered Clerk form
- small screens : form only
- no gradients
- no oversided hero sections
- no feaure cards
- no scroll-heavy layouts

Keep the layout minimal and professional.

## Implementaion

Wrap the root layout with ClerkProvider using clerk's dark theme

Create sign-in and sign-up pages using Clerk components

Use proxy.ts at the project root not middleware.ts

Define public routes using the existing sign-in and sign-up env vars. Protect everything else by default.


Update '/':

- authenticated users redirect to '/editor'
- unauthenticated users redirect to '/sign-in

Add clerk's built-in UserButton to the editor navbar right section for profile settings and logout.

Keep clerk's default user meny and profile flows intact. DO not rebuild or heavily customiize Clerk internals.

Use existing Clerk env vars. Do not rename or invest new ones.


## Dependecies

install:@clerk/ui.

## check when done
- proxy.ts exists at the root
- all routes are protected except public and paths
- auth pages use CSS variables with no hardcoded colros
- ClerkProvider wraps the root layout 
- npm run build passes