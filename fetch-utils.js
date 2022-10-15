const SUPABASE_URL = 'https://hkmeiromistyyoyamiqu.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbWVpcm9taXN0eXlveWFtaXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU3OTExNzQsImV4cCI6MTk4MTM2NzE3NH0.F6CQcvz1NRw9xB36a30y8ivbkNX9XLw1u-6O9CQ5RZI';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function createPost(post) {
    return await client.from('posts').insert(post).single();
}

export async function getItems() {
    let query = client.from('conversion-factor').select('*').order('title');
    // const response = await query;
    // return response;
    return await query;
}
