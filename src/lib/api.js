import { supabase } from './supabase';
import mockNotices from '../data/notices';
import mockEvents from '../data/events';
import mockGallery from '../data/gallery';

export async function getNotices() {
  try {
    const { data, error } = await supabase.from('notices').select('*').order('notice_date', { ascending: false });
    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        categoryMr: item.category,
        categoryEn: item.category,
        date: new Date(item.notice_date).toLocaleDateString('mr-IN'),
        dateEn: new Date(item.notice_date).toLocaleDateString('en-US'),
        titleMr: item.title_mr,
        titleEn: item.title_en,
        descMr: item.description_mr,
        descEn: item.description_en,
        important: item.is_important
      }));
    }
  } catch (error) {
    console.error('Error fetching notices:', error);
  }
  return mockNotices; // Fallback
}

export async function getEvents() {
  try {
    const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true });
    if (error) throw error;

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        dateMr: new Date(item.event_date).toLocaleDateString('mr-IN', { day: 'numeric', month: 'short' }),
        dateEn: new Date(item.event_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        titleMr: item.title_mr,
        titleEn: item.title_en,
        descMr: item.description_mr,
        descEn: item.description_en,
        timeMr: item.event_time,
        timeEn: item.event_time,
        locationMr: item.location_mr,
        locationEn: item.location_en,
        image: item.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
        color: item.color_theme || 'blue'
      }));
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
  return mockEvents; // Fallback
}
export async function submitAdmission(formData) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          full_name:
            formData.name +
            (formData.parentName
              ? ` (Parent: ${formData.parentName})`
              : ''),
          mobile: formData.mobile,
          email: formData.email || null,
          subject: `Admission Inquiry for Grade: ${formData.cls}`,
          message:
            formData.message ||
            'Admission inquiry submitted from website.',
        },
      ]);

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting admission:', error);

    return {
      success: false,
      error: error.message,
    };
  }
}
export async function submitContactMessage(formData) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          full_name: formData.name,
          mobile: formData.mobile,
          email: formData.email || null,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error submitting contact message:', error);

    return {
      success: false,
      error: error.message || 'Failed to submit message',
    };
  }
}
export async function getGallery() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      return data.map(item => ({
        id: item.id,
        image: item.image_url,
        captionMr: item.caption_mr,
        captionEn: item.caption_en,
        category: item.category
      }));
    }

    return [];
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return mockGallery;
  }
}
export async function addNotice(noticeData) {
  try {
    const notice = {
      title: noticeData.title_en || noticeData.title_mr,
      title_en: noticeData.title_en,
      title_mr: noticeData.title_mr,
      description_en: noticeData.description_en || null,
      description_mr: noticeData.description_mr || null,
      category: noticeData.category || 'General',
      notice_date: noticeData.notice_date || new Date().toISOString().split('T')[0],
      is_important: noticeData.is_important || false,
      is_active: true
    };

    const { data, error } = await supabase
      .from('notices')
      .insert([notice])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error adding notice:', error);

    return {
      success: false,
      error: error.message
    };
  }
}

export async function addGalleryImage(galleryData) {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .insert([galleryData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error adding gallery image:', error);

    return {
      success: false,
      error: error.message || 'Failed to add gallery image.',
    };
  }
}

export async function getSchoolProfile() {
  try {
    const { data, error } = await supabase.from('school_profile').select('*').limit(1).single();
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Error fetching school profile:', error);
  }
  return null;
}

export async function getSchoolStatistics() {
  try {
    const { data, error } = await supabase.from('school_statistics').select('*').eq('is_active', true).order('display_order', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Error fetching school statistics:', error);
  }
  return [];
}

export async function getSchoolHistory() {
  try {
    const { data, error } = await supabase
      .from('school_history')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching school history:', error);
      return [];
    }

    console.log('SCHOOL HISTORY FROM SUPABASE:', data);

    return data || [];
  } catch (error) {
    console.error('getSchoolHistory error:', error);
    return [];
  }
}

export async function getClasses() {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching classes:', error);
      return [];
    }

    console.log('CLASSES FROM SUPABASE:', data);

    return data || [];
  } catch (error) {
    console.error('getClasses error:', error);
    return [];
  }
}
export async function getSubjects() {
  try {
    const { data, error } = await supabase
      .from('subjects')
      .select('id, subject_name, subject_name_mr')
      .order('id', { ascending: true });

    if (error) {
      console.error('Subjects error:', error);
      return [];
    }

    return (data || []).map((item) => ({
      id: item.id,
      nameEn: item.subject_name || '',
      nameMr: item.subject_name_mr || '',
    }));
  } catch (error) {
    console.error('getSubjects error:', error);
    return [];
  }
}
export async function getTeachers() {
  try {
    const { data, error } = await supabase.from('teachers').select('*').eq('is_active', true).order('display_order', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
  return [];
}

export async function getActivities() {
  try {
    const { data, error } = await supabase.from('activities').select('*').eq('is_active', true).order('display_order', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
  }
  return [];
}

export async function getFacilities() {
  try {
    const { data, error } = await supabase.from('facilities').select('*').eq('is_active', true).order('display_order', { ascending: true });
    if (error) throw error;
    if (data) return data;
  } catch (error) {
    console.error('Error fetching facilities:', error);
  }
  return [];
}
export async function deleteNotice(id) {
  try {
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting notice:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteGalleryImage(id) {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return { success: false, error: error.message };
  }
}
export async function getAdmissionMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .like('subject', 'Admission Inquiry for Grade:%')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching admission messages:', error);
    return [];
  }
}
export async function deleteAdmissionMessage(id) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting admission message:', error);

    return {
      success: false,
      error: error.message,
    };
  }
}
export async function getContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
}
export async function deleteContactMessage(id) {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting contact message:', error);

    return {
      success: false,
      error: error.message || 'Failed to delete message.',
    };
  }
}
export async function addTeacher(teacherData) {
  try {
    const { data, error } = await supabase
      .from('teachers')
      .insert([teacherData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error adding teacher:', error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteTeacher(id) {
  try {
    const { error } = await supabase
      .from('teachers')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting teacher:', error);

    return {
      success: false,
      error: error.message,
    };
  }
}
export async function uploadSchoolImage(file, folder) {
  try {
    if (!file) {
      return {
        success: false,
        error: 'No image selected.',
      };
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Only JPG, PNG and WebP images are allowed.',
      };
    }

    // Maximum file size: 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return {
        success: false,
        error: 'Image size must be less than 5 MB.',
      };
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 10)}.${fileExtension}`;

    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('school-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('school-images')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: data.publicUrl,
      path: filePath,
    };

  } catch (error) {
    console.error('Image upload error:', error);

    return {
      success: false,
      error: error.message || 'Failed to upload image.',
    };
  }
}
export async function addEvent(eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error adding event:', error);

    return {
      success: false,
      error: error.message || 'Failed to add event.',
    };
  }
}


export async function getEventsAdmin() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching admin events:', error);

    return [];
  }
}


export async function deleteEvent(id) {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting event:', error);

    return {
      success: false,
      error: error.message || 'Failed to delete event.',
    };
  }
}
export async function updateEvent(id, eventData) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error updating event:', error);

    return {
      success: false,
      error: error.message || 'Failed to update event.',
    };
  }
}
export async function getAchievements() {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }

    console.log('ACHIEVEMENTS FROM SUPABASE:', data);

    return data || [];
  } catch (error) {
    console.error('getAchievements error:', error);
    return [];
  }
}
export async function addAchievement(achievementData) {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert([achievementData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error adding achievement:', error);

    return {
      success: false,
      error: error.message || 'Failed to add achievement.',
    };
  }
}


export async function deleteAchievement(id) {
  try {
    console.log('Deleting achievement ID:', id);

    const { data, error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id)
      .select();

    console.log('DELETE DATA:', data);
    console.log('DELETE ERROR:', error);

    if (error) throw error;

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Error deleting achievement:', error);

    return {
      success: false,
      error: error.message || 'Failed to delete achievement.'
    };
  }
}


export async function updateAchievement(id, achievementData) {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .update(achievementData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error updating achievement:', error);

    return {
      success: false,
      error: error.message || 'Failed to update achievement.',
    };
  }
}