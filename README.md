# Ecommerce project

## Instalation

Clone the repo:

```bash
git clone https://github.com/RenanFelipeAndrade/ecommerce.git
```

Change to project's directory

```bash
cd ecommerce
```

Install dependencies

```bash
# --legacy-peer-deps flag to use the same versions as the original project
# it avoids breaking dependencies
npm install --legacy-peer-deps
```

Now run the project:

```bash
npm run dev
```

## About the project

This project was developed following
[a YouTube course](https://youtu.be/XxXyfkrP298?list=PL6QREj8te1P6wX9m5KnicnDVEucbOPsqR&t=16995)
from [JavaScript Mastery](https://www.youtube.com/@javascriptmastery) made in 2022.
The goal was to develop a responsive web store,
with payments managed by Stripe and learn all the
logic behind an ecommerce web app.

Currently, it is hosted on vercel, you can see the
end result by [clicking here](https://ecommerce-sanity-stripe-hazel.vercel.app/)

### Library/Techs

- Nextjs
- Stripe
- Sanity
- Typescript
