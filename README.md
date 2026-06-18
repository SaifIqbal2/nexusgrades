# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
"# nexusgrades" 

## Supabase Blog Setup

Follow these steps to enable the frontend blog (Supabase):

1. Create a Supabase project at https://app.supabase.com and note your Project URL and anon key.
2. Create a `posts` table with columns:
	- `id` (uuid or serial) primary key
	- `title` (text)
	- `content` (text)
	- `user_id` (text or uuid)
	- `created_at` (timestamp with time zone) default `now()`
3. In the project settings -> API, copy the anonymous `anon` key and the Project URL.
4. Create a `.env` file in the project root with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

5. (Optional but recommended) Configure RLS policies so only authenticated users can insert/update/delete their own posts. See `README-BLOG.md` for sample SQL policies.

6. Install deps and run dev:

```bash
npm install
npm run dev
```

The blog is available at `/blog` and auth at `/auth`.
