import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import AchievementManager from '../components/AchievementManager';
import {
  addNotice,
  addGalleryImage,
  getNotices,
  getGallery,
  deleteNotice,
  deleteGalleryImage,

  addEvent,
  getEventsAdmin,
  updateEvent,
  deleteEvent,

  uploadSchoolImage,

  getTeachers,
  addTeacher,
  deleteTeacher,

  getAdmissionMessages,
  getContactMessages,
  deleteAdmissionMessage,
  deleteContactMessage
} from '../lib/api';
function TeacherManager() {
  const [teachers, setTeachers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    name_mr: '',
    designation: '',
    designation_mr: '',
    qualification: '',
    qualification_mr: '',
    subject: '',
    subject_mr: '',
    image_url: '',
    display_order: 0,
  });


  async function loadTeachers() {
    setLoading(true);

    const data = await getTeachers();

    setTeachers(data);

    setLoading(false);
  }


  useEffect(() => {
    loadTeachers();
  }, []);


  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }


  async function handleAddTeacher(e) {
    e.preventDefault();

    setError('');

    if (!form.name.trim()) {
      setError('Teacher name is required.');
      return;
    }

    if (!form.designation.trim()) {
      setError('Designation is required.');
      return;
    }

    setAdding(true);

    const result = await addTeacher({
      name: form.name.trim(),
      name_mr: form.name_mr.trim() || null,

      designation: form.designation.trim(),
      designation_mr: form.designation_mr.trim() || null,

      qualification: form.qualification.trim() || null,
      qualification_mr: form.qualification_mr.trim() || null,

      subject: form.subject.trim() || null,
      subject_mr: form.subject_mr.trim() || null,

      image_url: form.image_url.trim() || null,

      display_order: Number(form.display_order) || 0,

      is_active: true,
    });


    setAdding(false);


    if (!result.success) {
      setError(result.error);
      return;
    }


    setForm({
      name: '',
      name_mr: '',
      designation: '',
      designation_mr: '',
      qualification: '',
      qualification_mr: '',
      subject: '',
      subject_mr: '',
      image_url: '',
      display_order: 0,
    });

    setShowForm(false);

    await loadTeachers();
  }


  async function handleDeleteTeacher(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this teacher?'
    );

    if (!confirmed) return;


    const result = await deleteTeacher(id);


    if (!result.success) {
      alert(result.error);
      return;
    }


    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== id)
    );
  }


  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Teacher Management
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add and manage school teachers
          </p>
        </div>


        <div className="flex gap-2">

          <button
            onClick={loadTeachers}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200"
          >
            Refresh
          </button>


          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setError('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            {showForm ? 'Close' : '+ Add Teacher'}
          </button>

        </div>

      </div>


      {/* ADD TEACHER FORM */}

      {showForm && (
        <form
          onSubmit={handleAddTeacher}
          className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200"
        >

          <h3 className="font-bold text-lg mb-5">
            Add New Teacher
          </h3>


          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}


          <div className="grid md:grid-cols-2 gap-4">

            {/* NAME */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Teacher Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Rahul Patil"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* MARATHI NAME */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Teacher Name (Marathi)
              </label>

              <input
                name="name_mr"
                value={form.name_mr}
                onChange={handleChange}
                placeholder="उदा. राहुल पाटील"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* DESIGNATION */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Designation *
              </label>

              <input
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                placeholder="Mathematics Teacher"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* MARATHI DESIGNATION */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Designation (Marathi)
              </label>

              <input
                name="designation_mr"
                value={form.designation_mr}
                onChange={handleChange}
                placeholder="गणित शिक्षक"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* QUALIFICATION */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Qualification
              </label>

              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="M.Sc., B.Ed."
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* MARATHI QUALIFICATION */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Qualification (Marathi)
              </label>

              <input
                name="qualification_mr"
                value={form.qualification_mr}
                onChange={handleChange}
                placeholder="एम.एस्सी., बी.एड."
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* SUBJECT */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Subject
              </label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Mathematics"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* MARATHI SUBJECT */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Subject (Marathi)
              </label>

              <input
                name="subject_mr"
                value={form.subject_mr}
                onChange={handleChange}
                placeholder="गणित"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* IMAGE URL */}

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                Teacher Photo URL
              </label>

              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://example.com/teacher.jpg"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>


            {/* DISPLAY ORDER */}

            <div>
              <label className="block text-sm font-semibold mb-1">
                Display Order
              </label>

              <input
                name="display_order"
                type="number"
                min="0"
                value={form.display_order}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

          </div>


          <div className="flex justify-end mt-5">

            <button
              type="submit"
              disabled={adding}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {adding ? 'Adding Teacher...' : 'Add Teacher'}
            </button>

          </div>

        </form>
      )}


      {/* TEACHER LIST */}

      {loading ? (
        <p className="text-slate-500">
          Loading teachers...
        </p>
      ) : teachers.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No teachers added yet.
        </div>
      ) : (

        <div className="grid md:grid-cols-2 gap-4">

          {teachers.map((teacher) => (

            <div
              key={teacher.id}
              className="border border-slate-200 rounded-2xl p-4"
            >

              <div className="flex gap-4">

                {/* PHOTO */}

                {teacher.image_url ? (
                  <img
                    src={teacher.image_url}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                    👩‍🏫
                  </div>
                )}


                {/* DETAILS */}

                <div className="flex-1 min-w-0">

                  <h3 className="font-bold text-slate-900">
                    {teacher.name}
                  </h3>

                  <p className="text-sm text-blue-600 font-medium">
                    {teacher.designation}
                  </p>

                  {teacher.subject && (
                    <p className="text-sm text-slate-500 mt-1">
                      Subject: {teacher.subject}
                    </p>
                  )}

                  {teacher.qualification && (
                    <p className="text-sm text-slate-500">
                      {teacher.qualification}
                    </p>
                  )}

                </div>

              </div>


              {/* DELETE */}

              <div className="flex justify-end mt-4">

                <button
                  onClick={() => handleDeleteTeacher(teacher.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
function GalleryManager() {
  const [gallery, setGallery] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    imageFile: null,
    caption_en: '',
    caption_mr: '',
    category: 'General',
    display_order: 0,
  });

  async function loadGallery() {
    setLoading(true);

    const data = await getGallery();

    setGallery(data);

    setLoading(false);
  }

  useEffect(() => {
    loadGallery();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      imageFile: file,
    }));
  }

  async function handleAddGalleryImage(e) {
    e.preventDefault();

    setError('');

    if (!form.imageFile) {
      setError('Please select an image.');
      return;
    }

    setAdding(true);

    try {
      // Upload image
      const uploadResult = await uploadSchoolImage(
        form.imageFile,
        'gallery'
      );

      if (!uploadResult.success) {
        setError(uploadResult.error);
        setAdding(false);
        return;
      }

      // Save image information
      const result = await addGalleryImage({
        image_url: uploadResult.url,
        caption_en: form.caption_en.trim() || null,
        caption_mr: form.caption_mr.trim() || null,
        category: form.category.trim() || 'General',
        display_order:
          Number(form.display_order) || 0,
        is_active: true,
      });

      if (!result.success) {
        setError(result.error);
        setAdding(false);
        return;
      }

      // Reset form
      setForm({
        imageFile: null,
        caption_en: '',
        caption_mr: '',
        category: 'General',
        display_order: 0,
      });

      setShowForm(false);

      await loadGallery();

    } catch (error) {
      console.error(error);

      setError(
        error.message || 'Something went wrong.'
      );
    }

    setAdding(false);
  }

  async function handleDeleteGalleryImage(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this gallery image?'
    );

    if (!confirmed) return;

    const result = await deleteGalleryImage(id);

    if (!result.success) {
      alert(result.error);
      return;
    }

    setGallery((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Gallery Management
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Upload and manage school photos
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={loadGallery}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200"
          >
            Refresh
          </button>

          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setError('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            {showForm ? 'Close' : '+ Add Photo'}
          </button>

        </div>

      </div>

      {/* Add Photo Form */}
      {showForm && (
        <form
          onSubmit={handleAddGalleryImage}
          className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200"
        >

          <h3 className="font-bold text-lg mb-5">
            Add Gallery Photo
          </h3>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">

            {/* Image */}
            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-1">
                Photo *
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white"
              />

              <p className="text-xs text-slate-500 mt-1">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>

              {form.imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {form.imageFile.name}
                </p>
              )}

            </div>

            {/* English caption */}
            <div>

              <label className="block text-sm font-semibold mb-1">
                Caption (English)
              </label>

              <input
                name="caption_en"
                value={form.caption_en}
                onChange={handleChange}
                placeholder="Annual Sports Day"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            {/* Marathi caption */}
            <div>

              <label className="block text-sm font-semibold mb-1">
                Caption (Marathi)
              </label>

              <input
                name="caption_mr"
                value={form.caption_mr}
                onChange={handleChange}
                placeholder="वार्षिक क्रीडा दिन"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            {/* Category */}
            <div>

              <label className="block text-sm font-semibold mb-1">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white"
              >
                <option value="General">General</option>
                <option value="Events">Events</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Students">Students</option>
                <option value="Campus">Campus</option>
                <option value="Activities">Activities</option>
              </select>

            </div>

            {/* Display order */}
            <div>

              <label className="block text-sm font-semibold mb-1">
                Display Order
              </label>

              <input
                type="number"
                name="display_order"
                min="0"
                value={form.display_order}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div className="flex justify-end mt-5">

            <button
              type="submit"
              disabled={adding}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {adding ? 'Uploading...' : 'Add Photo'}
            </button>

          </div>

        </form>
      )}

      {/* Gallery */}
      {loading ? (

        <p className="text-slate-500">
          Loading gallery...
        </p>

      ) : gallery.length === 0 ? (

        <div className="text-center py-10 text-slate-500">
          No gallery photos added yet.
        </div>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {gallery.map((item) => (

            <div
              key={item.id}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
            >

              <img
                src={item.image}
                alt={item.captionEn || 'School gallery'}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                {item.captionEn && (
                  <h3 className="font-bold text-slate-900">
                    {item.captionEn}
                  </h3>
                )}

                {item.captionMr && (
                  <p className="text-sm text-slate-500 mt-1">
                    {item.captionMr}
                  </p>
                )}

                {item.category && (
                  <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                )}

                <div className="flex justify-end mt-4">

                  <button
                    onClick={() =>
                      handleDeleteGalleryImage(item.id)
                    }
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}
export default function Admin() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!session) {
    return (
      <div className="pt-32 pb-20 max-w-md mx-auto px-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-xl px-4 py-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-200"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <AddNoticeForm />
        <AddGalleryForm />
        <NoticeManager />
        <GalleryManager />
        <AdmissionMessagesManager />
        <ContactMessagesManager />
        <TeacherManager />
        <EventManager />
        <AchievementManager />
      </div>
    </div>
  );
}

function AddNoticeForm() {
  const [formData, setFormData] = useState({
    title_mr: '',
    title_en: '',
    description_mr: '',
    description_en: '',
    category: 'General',
    notice_date: new Date().toISOString().split('T')[0],
    is_important: false,
  });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Submitting...');
    const result = await addNotice(formData);
    if (result.success) {
      setStatus('Success!');
      setFormData({ ...formData, title_mr: '', title_en: '', description_mr: '', description_en: '' });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus('Error: ' + result.error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-4">Add Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Title (Marathi)</label>
          <input required type="text" value={formData.title_mr} onChange={(e) => setFormData({ ...formData, title_mr: e.target.value })} className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Title (English)</label>
          <input required type="text" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-xl px-3 py-2">
            <option>General</option>
            <option>Academic</option>
            <option>Exam</option>
            <option>Event</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="is_important" checked={formData.is_important} onChange={(e) => setFormData({ ...formData, is_important: e.target.checked })} />
          <label htmlFor="is_important" className="text-sm font-semibold">Important Notice</label>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">Add Notice</button>
        {status && <p className="text-sm mt-2 font-medium">{status}</p>}
      </form>
    </div>
  );
}

function AddGalleryForm() {
  const [formData, setFormData] = useState({
    image_url: '',
    caption_mr: '',
    caption_en: '',
    category: 'Campus',
  });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Submitting...');
    const result = await addGalleryImage(formData);
    if (result.success) {
      setStatus('Success!');
      setFormData({ ...formData, image_url: '', caption_mr: '', caption_en: '' });
      setTimeout(() => setStatus(null), 3000);
    } else {
      setStatus('Error: ' + result.error);
    }
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-bold mb-4">Add Gallery Photo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Image URL</label>
          <input required type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full border rounded-xl px-3 py-2" placeholder="https://..." />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Caption (Marathi)</label>
          <input required type="text" value={formData.caption_mr} onChange={(e) => setFormData({ ...formData, caption_mr: e.target.value })} className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Caption (English)</label>
          <input required type="text" value={formData.caption_en} onChange={(e) => setFormData({ ...formData, caption_en: e.target.value })} className="w-full border rounded-xl px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-xl px-3 py-2">
            <option>Campus</option>
            <option>Events</option>
            <option>Sports</option>
            <option>Academics</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700">Add Photo</button>
        {status && <p className="text-sm mt-2 font-medium">{status}</p>}
      </form>
    </div>
  );
}
function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  async function loadNotices() {
    setLoading(true);
    const data = await getNotices();
    setNotices(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadNotices();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this notice?'
    );

    if (!confirmed) return;

    const result = await deleteNotice(id);

    if (result.success) {
      setNotices((current) =>
        current.filter((notice) => notice.id !== id)
      );
      setMessage('Notice deleted successfully.');
    } else {
      setMessage(result.error || 'Failed to delete notice.');
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Manage Notices
        </h2>

        <button
          onClick={loadNotices}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {message && (
        <p className="mb-4 text-sm text-gray-600">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading notices...</p>
      ) : notices.length === 0 ? (
        <p className="text-gray-500">
          No notices found.
        </p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="border rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold">
                  {notice.titleEn || notice.titleMr || 'Untitled Notice'}
                </h3>
                {notice.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {notice.description}
                  </p>
                )}

                {notice.notice_date && (
                  <p className="text-xs text-gray-500 mt-2">
                    {notice.notice_date}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleDelete(notice.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
function AdmissionMessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  async function loadMessages() {
    setLoading(true);
    setMessage('');

    const data = await getAdmissionMessages();

    setMessages(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this admission message?'
    );

    if (!confirmed) return;

    const result = await deleteAdmissionMessage(id);

    if (result.success) {
      setMessages((current) =>
        current.filter((item) => item.id !== id)
      );

      setMessage('Admission message deleted successfully.');
    } else {
      setMessage(
        result.error || 'Failed to delete admission message.'
      );
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:col-span-2">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Admission Messages
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Admission inquiries submitted from the website
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Refresh
        </button>
      </div>

      {message && (
        <p className="mb-4 text-sm text-gray-600">
          {message}
        </p>
      )}

      {loading ? (
        <p>Loading admission messages...</p>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">
            No admission messages yet.
          </p>

          <p className="text-sm mt-1">
            New admission inquiries will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {messages.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-5"
            >

              <div className="flex justify-between items-start gap-4">

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.full_name}
                  </h3>

                  <p className="text-sm text-blue-600 font-semibold mt-1">
                    {item.subject}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 text-sm font-semibold"
                >
                  Delete
                </button>

              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">

                <div>
                  <span className="font-semibold">
                    Mobile:
                  </span>{' '}
                  {item.mobile || 'Not provided'}
                </div>

                <div>
                  <span className="font-semibold">
                    Email:
                  </span>{' '}
                  {item.email || 'Not provided'}
                </div>

              </div>

              {item.message && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    Message
                  </p>

                  <p className="text-sm text-gray-700">
                    {item.message}
                  </p>
                </div>
              )}

              <p className="text-xs text-gray-400 mt-4">
                Submitted:{' '}
                {item.created_at
                  ? new Date(item.created_at).toLocaleString('en-IN')
                  : ''}
              </p>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}
function ContactMessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    setLoading(true);

    const data = await getContactMessages();

    setMessages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) return;

    const result = await deleteContactMessage(id);

    if (result.success) {
      setMessages((prev) =>
        prev.filter((message) => message.id !== id)
      );
    } else {
      alert(result.error || 'Failed to delete message.');
    }
  }

  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Contact Messages
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Messages submitted from the website
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No contact messages yet.
        </div>
      ) : (
        <div className="space-y-4">

          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border border-slate-200 rounded-2xl p-5"
            >

              <div className="flex justify-between items-start gap-4">

                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {msg.full_name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    📱 {msg.mobile}
                  </p>

                  {msg.email && (
                    <p className="text-sm text-slate-500">
                      ✉️ {msg.email}
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-400">
                  {new Date(msg.created_at).toLocaleString()}
                </p>

              </div>

              <div className="mt-4">
                <p className="font-semibold text-slate-800">
                  {msg.subject || 'General Inquiry'}
                </p>

                <p className="mt-2 text-sm text-slate-600 whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
function EventManager() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title_en: '',
    title_mr: '',
    description_en: '',
    description_mr: '',
    event_date: '',
    event_time: '',
    location_en: '',
    location_mr: '',
    imageFile: null,
    color_theme: 'blue',
    display_order: 0,
  });

  async function loadEvents() {
    setLoading(true);

    const data = await getEventsAdmin();

    setEvents(data);

    setLoading(false);
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({
      ...prev,
      imageFile: file,
    }));
  }
  function handleEditEvent(event) {
    setEditingId(event.id);

    setForm({
      title_en: event.title_en || '',
      title_mr: event.title_mr || '',
      description_en: event.description_en || '',
      description_mr: event.description_mr || '',
      event_date: event.event_date || '',
      event_time: event.event_time || '',
      location_en: event.location_en || '',
      location_mr: event.location_mr || '',
      imageFile: null,
      color_theme: event.color_theme || 'blue',
      display_order: event.display_order || 0,
    });

    setError('');
    setShowForm(true);
  }
  async function handleAddEvent(e) {
    e.preventDefault();

    setError('');

    if (!form.title_en.trim()) {
      setError('Event title is required.');
      return;
    }

    if (!form.event_date) {
      setError('Event date is required.');
      return;
    }

    setAdding(true);

    try {
      let imageUrl = null;

      // Upload a new photo only if admin selected one
      if (form.imageFile) {
        const uploadResult = await uploadSchoolImage(
          form.imageFile,
          'events'
        );

        if (!uploadResult.success) {
          setError(uploadResult.error);
          setAdding(false);
          return;
        }

        imageUrl = uploadResult.url;
      }

      const eventData = {
        title_en: form.title_en.trim(),
        title_mr: form.title_mr.trim() || null,

        description_en:
          form.description_en.trim() || null,

        description_mr:
          form.description_mr.trim() || null,

        event_date: form.event_date,

        event_time:
          form.event_time.trim() || null,

        location_en:
          form.location_en.trim() || null,

        location_mr:
          form.location_mr.trim() || null,

        color_theme: form.color_theme,

        display_order:
          Number(form.display_order) || 0,

        is_active: true,
      };

      // Only change image_url if a new image was uploaded
      if (imageUrl) {
        eventData.image_url = imageUrl;
      }

      let result;

      if (editingId) {
        result = await updateEvent(
          editingId,
          eventData
        );
      } else {
        result = await addEvent({
          ...eventData,
          image_url: imageUrl,
        });
      }

      if (!result.success) {
        setError(result.error);
        setAdding(false);
        return;
      }

      // Reset
      setForm({
        title_en: '',
        title_mr: '',
        description_en: '',
        description_mr: '',
        event_date: '',
        event_time: '',
        location_en: '',
        location_mr: '',
        imageFile: null,
        color_theme: 'blue',
        display_order: 0,
      });

      setEditingId(null);
      setShowForm(false);

      await loadEvents();

    } catch (error) {
      console.error(error);

      setError(
        error.message || 'Something went wrong.'
      );
    }

    setAdding(false);
  }

  async function handleDeleteEvent(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    );

    if (!confirmed) return;

    const result = await deleteEvent(id);

    if (!result.success) {
      alert(result.error);
      return;
    }

    setEvents((prev) =>
      prev.filter((event) => event.id !== id)
    );
  }

  return (
    <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Event Management
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Add and manage school events
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={loadEvents}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200"
          >
            Refresh
          </button>

          <button
            onClick={() => {
              setShowForm((prev) => !prev);
              setError('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            {showForm ? 'Close' : '+ Add Event'}
          </button>

        </div>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <form
          onSubmit={handleAddEvent}
          className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-200"
        >

          <h3 className="font-bold text-lg mb-5">
            {editingId ? 'Edit Event' : 'Add New Event'}
          </h3>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">

            {/* English title */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Event Title (English) *
              </label>

              <input
                name="title_en"
                value={form.title_en}
                onChange={handleChange}
                required
                placeholder="Annual Sports Day"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Marathi title */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Event Title (Marathi)
              </label>

              <input
                name="title_mr"
                value={form.title_mr}
                onChange={handleChange}
                placeholder="वार्षिक क्रीडा दिन"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Event Date *
              </label>

              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Event Time
              </label>

              <input
                type="text"
                name="event_time"
                value={form.event_time}
                onChange={handleChange}
                placeholder="10:00 AM - 2:00 PM"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* English location */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location (English)
              </label>

              <input
                name="location_en"
                value={form.location_en}
                onChange={handleChange}
                placeholder="School Ground"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Marathi location */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location (Marathi)
              </label>

              <input
                name="location_mr"
                value={form.location_mr}
                onChange={handleChange}
                placeholder="शाळेचे मैदान"
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* English description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                Description (English)
              </label>

              <textarea
                name="description_en"
                value={form.description_en}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the event..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Marathi description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                Description (Marathi)
              </label>

              <textarea
                name="description_mr"
                value={form.description_mr}
                onChange={handleChange}
                rows="4"
                placeholder="कार्यक्रमाचे वर्णन..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">

              <label className="block text-sm font-semibold mb-1">
                Event Photo
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white"
              />

              <p className="text-xs text-slate-500 mt-1">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>

              {form.imageFile && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {form.imageFile.name}
                </p>
              )}

            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Theme Color
              </label>

              <select
                name="color_theme"
                value={form.color_theme}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
              </select>
            </div>

            {/* Display order */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Display Order
              </label>

              <input
                type="number"
                name="display_order"
                min="0"
                value={form.display_order}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />
            </div>

          </div>

          <div className="flex justify-end mt-5">

            <button
              type="submit"
              disabled={adding}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {adding ? 'Adding Event...' : 'Add Event'}
            </button>

          </div>

        </form>
      )}

      {/* Events list */}
      {loading ? (
        <p className="text-slate-500">
          Loading events...
        </p>
      ) : events.length === 0 ? (

        <div className="text-center py-10 text-slate-500">
          No events added yet.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-4">

          {events.map((event) => (

            <div
              key={event.id}
              className="border border-slate-200 rounded-2xl overflow-hidden"
            >

              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={event.title_en}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4">

                <h3 className="font-bold text-lg text-slate-900">
                  {event.title_en}
                </h3>

                {event.title_mr && (
                  <p className="text-sm text-slate-500 mt-1">
                    {event.title_mr}
                  </p>
                )}

                <div className="mt-3 space-y-1 text-sm text-slate-600">

                  <p>
                    📅 {event.event_date}
                  </p>

                  {event.event_time && (
                    <p>
                      ⏰ {event.event_time}
                    </p>
                  )}

                  {event.location_en && (
                    <p>
                      📍 {event.location_en}
                    </p>
                  )}

                </div>

                {event.description_en && (
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3">
                    {event.description_en}
                  </p>
                )}
                <div className="flex gap-2">

                  <button
                    onClick={() => handleEditEvent(event)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}