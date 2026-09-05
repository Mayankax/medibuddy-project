This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:
# MediSearch

MediSearch is a responsive medicine lookup app that searches FDA drug labels by brand name and presents the matching medicines in a scannable results list. Selecting a result opens a detailed medicine page with available label information. It is built with Next.js 16, React 19, TypeScript, Tailwind CSS, and shadcn/ui components.

## How to Run

Clone the repository, install its dependencies, and start the development server:

```bash
git clone https://github.com/Mayankax/medibuddy-project.git
cd medibuddy-project
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Key Features

- Medicine search using the public FDA Drug Label API
- Search results with brand name, generic name, manufacturer, product type, and route
- Detailed medicine pages for individual FDA label records
- Loading, empty, error, and not-found states
- Responsive interface with accessible form controls and keyboard focus states
- In-memory search caching for repeated queries
- Request cancellation when a new search starts

## Technical Trade-offs

- **Form submission instead of keystroke search:** Searches run when the user submits the form, avoiding unnecessary API requests while the query is still being typed.
- **Caching:** Results are cached in a module-level `Map` using a normalized query key, making repeated searches faster without adding a persistent storage dependency.
- **Request cancellation:** An `AbortController` cancels the previous request before a new search begins, preventing stale responses from competing with the latest query.
- **No debounce:** Because requests are already limited to form submission, debounce would add complexity without reducing request volume.
- **No memoization:** The rendered result set and handlers are small enough that `useMemo` or `useCallback` would add indirection without a meaningful performance benefit.

## API

The app uses the public [FDA Drug Label API](https://open.fda.gov/apis/drug/label/) at `https://api.fda.gov/drug/label.json`. Search requests query FDA OpenFDA brand names in the form `openfda.brand_name:"<query>"` and request up to 20 results.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
