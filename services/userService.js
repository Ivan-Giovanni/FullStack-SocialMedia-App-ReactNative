import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        console.log('[userService.js] got data: ', data);
        if (error) {
            return { success: false, message: error?.message }
        }

        return { success: true, data };

    } catch (error) {
        console.log('got error', error?.message);
        return { success: false, message: error?.message }
    }
}

export const updateUser = async (userId, data) => {
    try {
        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)
            .single();
        console.log('[userService.js] updated data: ', data);
        if (error) {
            return { success: false, message: error?.message }
        }

        return { success: true, data };

    } catch (error) {
        console.log('got error', error?.message);
        return { success: false, message: error?.message }
    }
}

