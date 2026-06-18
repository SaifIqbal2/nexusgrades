Supabase Blog Integration

Setup steps:

1. Create a Supabase project at https://app.supabase.com
2. Create a `posts` table with columns:
   - id (uuid or int) primary key
   - title (text)
   - content (text)
   - user_id (uuid/text)
   - created_at (timestamp with time zone) default now()

3. In the Supabase Project Settings -> API, copy the `anon` key and project URL.
4. Create a `.env` file in the project root with:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...

5. Install dependencies:

npm install

6. Run dev server:

npm run dev

Notes and RLS:
- For production you may want to configure Row Level Security (RLS) and policies so that only authenticated users can insert/update/delete their own posts.
- Simple policy examples:

-- Allow authenticated users to insert
CREATE POLICY "Allow insert for authenticated" ON public.posts
FOR INSERT USING (auth.role() = 'authenticated');

-- Allow update/delete only for post owner
CREATE POLICY "Allow modify own posts" ON public.posts
FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow delete own posts" ON public.posts
FOR DELETE USING (auth.uid() = user_id);

Use the Supabase SQL editor to add these policies.
