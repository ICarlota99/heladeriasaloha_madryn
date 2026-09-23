# Register the Tailwind redesign in Git

Run these commands from the repository root (`heladeriasaloha_madryn`). Review the diff before you commit. Do not stage secrets, `node_modules`, or build output.

This guide is a local checklist. Leave `GIT_COMMANDS.md` out of the commit so the history stays focused on the storefront change.

## 1. Review what will be committed

```powershell
git status
git diff
git log -5 --oneline
```

Confirm the change is the Bootstrap-to-Tailwind redesign: updated pages and sections, the new button component, Tailwind in `package.json` / `vite.config.js`, and the removed legacy stylesheets.

## 2. Stage the redesign files

Stage the dependency manifest, the Vite and HTML entry points, and the whole `src` tree. `git add src` also records the deleted CSS modules.

```powershell
git add package.json package-lock.json index.html vite.config.js src
```

Check that nothing unexpected is staged:

```powershell
git status
```

Expected staged paths:

- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.js`
- `src/main.jsx`
- `src/styles/index.css`
- `src/components/ui/Button.jsx`
- `src/components/GoogleMapsLink.jsx`
- `src/components/ProductCard.jsx`
- `src/components/SimpleProductCard.jsx`
- `src/components/WhatsappButton.jsx`
- `src/pages/About.jsx`
- `src/pages/Cart.jsx`
- `src/pages/Checkout.jsx`
- `src/pages/Products.jsx`
- `src/pages/Sabores.jsx`
- `src/sections/Delivery.jsx`
- `src/sections/Flavors.jsx`
- `src/sections/Footer.jsx`
- `src/sections/Header.jsx`
- `src/sections/Hero.jsx`
- `src/sections/Shop.jsx`
- `src/sections/Whyus.jsx`
- `src/styles/Header.css` (deleted)
- `src/styles/ProductCard.module.css` (deleted)
- `src/styles/Products.css` (deleted)
- `src/styles/Sabores.module.css` (deleted)

## 3. Commit

Use a short imperative subject and a body that explains why the change exists. Two `-m` flags keep the message valid in PowerShell.

```powershell
git commit -m "Replace Bootstrap with a Tailwind storefront." -m "Drop the Bootstrap CDN and restyle every page with Tailwind CSS v4 so the shop, catalog, cart, and checkout share the Aloha palette without changing ordering behavior."
```

## 4. Confirm the commit

```powershell
git status
git log -1
```

`git status` should report a clean working tree aside from untracked files you chose to leave out, including this guide.
