import { supabase } from './supabase';

export const signOut = async () => {
  await supabase.auth.signOut();
};

export const checkUser = async () => {
    const session =supabase.auth.getSession()
      const { user } = session;
      return user;
  };
