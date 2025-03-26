import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const auth = {
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
  register: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },
};

export const orders = {
  create: async (orderData: { items: any[]; totalAmount: number }) => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        total_amount: orderData.totalAmount,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      ingredients: item.ingredients,
      total_price: item.totalPrice,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { orderId: order.id };
  },
  getAll: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};

export default supabase;