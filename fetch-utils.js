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
    let query = client.from('conversion_factor').select(`*`).order('title');
    return await query;
}
export async function getPosts() {
    let query = client.from('posts').select(`*`).order('created_at', { ascending: false });
    return await query;
}
export async function getPost(id) {
    let query = client
        .from('posts')
        .select(`*,comments(*)`)
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
    return await query;
}

// can be used for searching for other conversions/ posts of each type
export async function getItem(id) {
    let query = client
        .from('conversion_factor')
        .select('*,posts(*)')
        .eq('id', id)
        .order('title', { foreignTable: 'posts', ascending: false });
    return await query;
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function deleteComment(id) {
    return await client.from('comments').delete().eq('id', id).single();
}
export async function getComment(id) {
    return await client.from('comments').select(`*`).eq('id', id).single();
}

export function onMessage(postId, handleComment) {
    client.from(`comments:post_id=eq.${postId}`).on('INSERT', handleComment).subscribe();
}

export async function updateProfile(profile) {
    return await client.from('profiles').upsert(profile).single().eq('user_id', profile.user_id);
}

export async function getProfile(id) {
    return await client.from('profiles').select('*').eq('user_id', id).maybeSingle();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);

    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });
    if (response.error) {
        return null;
    }
    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;
    return url;
}
