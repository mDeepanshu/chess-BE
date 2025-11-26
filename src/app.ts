import express from "express";
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const app = express();

// middlewares
app.use(express.json());
const supabase = createClient('https://khrwrymbqnpezqxhbwuw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocndyeW1icW5wZXpxeGhid3V3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzMwODY0NywiZXhwIjoyMDc4ODg0NjQ3fQ.EZXUOY-2E9zW5CJTEjw8HqKw5pP3DiaaGY4XWBh7ZkU')

// routes
app.get("/", async (req, res) => {
  const users = await fetchUsers();
  const newUser = await insertUser(1,'newuser');
  console.log(newUser);
  
  console.log('Fetched users:', users);
  const tableCreationResult = await createTable('games');
  console.log('Table creation result:', tableCreationResult);
  res.send("Chess Backend Server is running..." + JSON.stringify(users) + JSON.stringify(newUser) + JSON.stringify(tableCreationResult));
});

async function fetchUsers() {
  const { data, error } = await supabase
    .from('users')
    .select();

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data;
}

async function insertUser(username: number, email: string) {
  const { data, error } = await supabase
    .from('users')
    .insert({ id: 4, username: 'Mordor' })
    .select();
  if (error) {
    console.error('Error inserting user:', error);
    return null;
  }
  console.log(data);

  return data;
}

async function createTable(tableName: string) {
  const { data, error } = await supabase.rpc('create_table', { table_name: tableName });
  if (error) {
    console.error('Error creating table:', error);
    return null;
  }
  return data;
}


export default app;
