import { useEffect, useState } from 'react';
import {
    Plus,
    Pencil,
    Trash2,
    X,
    Upload,
    Trophy,
    Loader2,
    Eye,
    EyeOff
} from 'lucide-react';

import {
    getAchievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    uploadSchoolImage
} from '../lib/api';

export default function AchievementManager() {
    const [achievements, setAchievements] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [formData, setFormData] = useState({
        title_en: '',
        title_mr: '',
        description_en: '',
        description_mr: '',
        year: new Date().getFullYear(),
        category: 'General',
        image_url: '',
        display_order: 0,
        is_active: true
    });

    // --------------------------------
    // LOAD ACHIEVEMENTS
    // --------------------------------

    const loadAchievements = async () => {
        setLoading(true);

        const data = await getAchievements();

        setAchievements(data || []);
        setLoading(false);
    };

    useEffect(() => {
        loadAchievements();
    }, []);

    // --------------------------------
    // FORM HANDLER
    // --------------------------------

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // --------------------------------
    // IMAGE SELECT
    // --------------------------------

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    // --------------------------------
    // RESET FORM
    // --------------------------------

    const resetForm = () => {
        setEditingId(null);

        setFormData({
            title_en: '',
            title_mr: '',
            description_en: '',
            description_mr: '',
            year: new Date().getFullYear(),
            category: 'General',
            image_url: '',
            display_order: 0,
            is_active: true
        });

        setImageFile(null);
        setImagePreview('');
    };

    // --------------------------------
    // EDIT
    // --------------------------------

    const handleEdit = (achievement) => {
        setEditingId(achievement.id);

        setFormData({
            title_en: achievement.title_en || '',
            title_mr: achievement.title_mr || '',
            description_en: achievement.description_en || '',
            description_mr: achievement.description_mr || '',
            year: achievement.year || new Date().getFullYear(),
            category: achievement.category || 'General',
            image_url: achievement.image_url || '',
            display_order: achievement.display_order || 0,
            is_active: achievement.is_active ?? true
        });

        setImageFile(null);
        setImagePreview(achievement.image_url || '');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // --------------------------------
    // SUBMIT
    // --------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title_en.trim()) {
            alert('Please enter the English title.');
            return;
        }

        setSaving(true);

        try {
            let imageUrl = formData.image_url;

            // Upload new image if selected
            if (imageFile) {
                const uploadResult = await uploadSchoolImage(
                    imageFile,
                    'achievements'
                );

                if (!uploadResult.success) {
                    alert(uploadResult.error || 'Image upload failed.');
                    setSaving(false);
                    return;
                }

                imageUrl = uploadResult.url;
            }

            const achievementData = {
                title_en: formData.title_en.trim(),
                title_mr: formData.title_mr.trim(),
                description_en: formData.description_en.trim(),
                description_mr: formData.description_mr.trim(),
                year: Number(formData.year),
                category: formData.category,
                image_url: imageUrl || null,
                display_order: Number(formData.display_order) || 0,
                is_active: formData.is_active
            };

            let result;

            if (editingId) {
                result = await updateAchievement(
                    editingId,
                    achievementData
                );
            } else {
                result = await addAchievement(
                    achievementData
                );
            }

            if (!result.success) {
                alert(result.error || 'Something went wrong.');
                return;
            }

            alert(
                editingId
                    ? 'Achievement updated successfully!'
                    : 'Achievement added successfully!'
            );

            resetForm();

            await loadAchievements();

        } catch (error) {
            console.error('Achievement save error:', error);

            alert(
                error.message ||
                'Failed to save achievement.'
            );
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------
    // DELETE
    // --------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this achievement?'
        );

        if (!confirmed) return;

        setDeletingId(id);

        try {
            const result = await deleteAchievement(id);

            if (!result.success) {
                alert(result.error || 'Failed to delete achievement.');
                return;
            }

            await loadAchievements();

            if (editingId === id) {
                resetForm();
            }

        } catch (error) {
            console.error('Delete achievement error:', error);

            alert(
                error.message ||
                'Failed to delete achievement.'
            );
        } finally {
            setDeletingId(null);
        }
    };

    // --------------------------------
    // TOGGLE ACTIVE STATUS
    // --------------------------------

    const handleToggleActive = async (achievement) => {
        try {
            const result = await updateAchievement(
                achievement.id,
                {
                    is_active: !achievement.is_active
                }
            );

            if (!result.success) {
                alert(result.error || 'Failed to update status.');
                return;
            }

            await loadAchievements();

        } catch (error) {
            console.error('Status update error:', error);
            alert('Failed to update status.');
        }
    };

    // --------------------------------
    // UI
    // --------------------------------

    return (
        <div className="space-y-8">

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Trophy className="w-6 h-6" />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Achievements
                            </h2>

                            <p className="text-sm text-slate-500">
                                Manage school achievements and accomplishments
                            </p>
                        </div>
                    </div>
                </div>

                {editingId && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        <X className="w-4 h-4" />
                        Cancel Edit
                    </button>
                )}

            </div>


            {/* FORM */}

            <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >

                <div className="flex items-center gap-2 mb-6">

                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        {editingId ? (
                            <Pencil className="w-4 h-4" />
                        ) : (
                            <Plus className="w-4 h-4" />
                        )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                        {editingId
                            ? 'Edit Achievement'
                            : 'Add New Achievement'}
                    </h3>

                </div>


                {/* TITLE */}

                <div className="grid md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Title (English) *
                        </label>

                        <input
                            type="text"
                            name="title_en"
                            value={formData.title_en}
                            onChange={handleChange}
                            placeholder="Academic Excellence"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Title (Marathi)
                        </label>

                        <input
                            type="text"
                            name="title_mr"
                            value={formData.title_mr}
                            onChange={handleChange}
                            placeholder="शैक्षणिक उत्कृष्टता"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>


                {/* DESCRIPTION */}

                <div className="grid md:grid-cols-2 gap-5 mt-5">

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description (English)
                        </label>

                        <textarea
                            name="description_en"
                            value={formData.description_en}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe the achievement..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Description (Marathi)
                        </label>

                        <textarea
                            name="description_mr"
                            value={formData.description_mr}
                            onChange={handleChange}
                            rows="4"
                            placeholder="कामगिरीचे वर्णन करा..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                </div>


                {/* YEAR / CATEGORY / ORDER */}

                <div className="grid sm:grid-cols-3 gap-5 mt-5">

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Year
                        </label>

                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            min="1900"
                            max="2100"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="General">General</option>
                            <option value="Academic">Academic</option>
                            <option value="Sports">Sports</option>
                            <option value="Cultural">Cultural</option>
                            <option value="Science">Science</option>
                            <option value="Social">Social</option>
                            <option value="Competition">Competition</option>
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Display Order
                        </label>

                        <input
                            type="number"
                            name="display_order"
                            value={formData.display_order}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>


                {/* IMAGE */}

                <div className="mt-5">

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Achievement Image
                    </label>

                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-5">

                        <div className="flex flex-col sm:flex-row gap-5 items-start">

                            {/* PREVIEW */}

                            {(imagePreview || formData.image_url) && (
                                <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-100">
                                    <img
                                        src={imagePreview || formData.image_url}
                                        alt="Achievement preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}


                            <div className="flex-1">

                                <label className="inline-flex items-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-slate-800 transition">

                                    <Upload className="w-4 h-4" />

                                    {imageFile
                                        ? imageFile.name
                                        : 'Choose Image'}

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </label>

                                <p className="text-xs text-slate-500 mt-2">
                                    JPG, PNG or WebP. Maximum 5 MB.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ACTIVE */}

                <div className="mt-5 flex items-center gap-3">

                    <input
                        id="achievement-active"
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-4 h-4"
                    />

                    <label
                        htmlFor="achievement-active"
                        className="text-sm font-medium text-slate-700"
                    >
                        Show this achievement on the website
                    </label>

                </div>


                {/* BUTTON */}

                <div className="mt-6 flex gap-3">

                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : editingId ? (
                            <>
                                <Pencil className="w-4 h-4" />
                                Update Achievement
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Add Achievement
                            </>
                        )}

                    </button>


                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={saving}
                            className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>


            {/* LIST */}

            {/* LIST */}

            <div>

                {/* LIST HEADER */}

                <div className="flex items-center justify-between mb-5">

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            Existing Achievements
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            {achievements.length} achievement
                            {achievements.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="bg-white border border-slate-200 rounded-2xl p-10 flex justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    </div>

                ) : achievements.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">

                        <Trophy className="w-10 h-10 text-slate-300 mx-auto mb-3" />

                        <p className="text-slate-500">
                            No achievements added yet.
                        </p>

                    </div>

                ) : (

                    /* ACHIEVEMENT GRID */

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {achievements.map((achievement) => (

                            <div
                                key={achievement.id}
                                className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col ${achievement.is_active
                                        ? 'border-slate-200'
                                        : 'border-red-200'
                                    }`}
                            >

                                {/* IMAGE */}

                                {achievement.image_url ? (

                                    <div className="w-full h-56 bg-slate-100 flex-shrink-0">

                                        <img
                                            src={achievement.image_url}
                                            alt={achievement.title_en}
                                            className="w-full h-full object-cover"
                                        />

                                    </div>

                                ) : (

                                    <div className="w-full h-56 bg-slate-50 flex items-center justify-center flex-shrink-0">

                                        <Trophy className="w-16 h-16 text-slate-300" />

                                    </div>

                                )}


                                {/* CONTENT */}

                                <div className="p-6 flex flex-col">

                                    {/* YEAR + CATEGORY */}

                                    <div className="flex items-center justify-between gap-3 mb-4">

                                        <span className="text-blue-600 font-bold text-base">
                                            {achievement.year}
                                        </span>

                                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600">
                                            {achievement.category}
                                        </span>

                                    </div>


                                    {/* ENGLISH TITLE */}

                                    <h4 className="font-bold text-xl text-slate-900 leading-snug">
                                        {achievement.title_en}
                                    </h4>


                                    {/* MARATHI TITLE */}

                                    {achievement.title_mr && (

                                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                            {achievement.title_mr}
                                        </p>

                                    )}


                                    {/* ENGLISH DESCRIPTION */}

                                    {achievement.description_en && (

                                        <div className="mt-4">

                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                                Description
                                            </p>

                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {achievement.description_en}
                                            </p>

                                        </div>

                                    )}


                                    {/* MARATHI DESCRIPTION */}

                                    {achievement.description_mr && (

                                        <div className="mt-4">

                                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                                मराठी वर्णन
                                            </p>

                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {achievement.description_mr}
                                            </p>

                                        </div>

                                    )}


                                    {/* STATUS */}

                                    <div className="mt-5 pt-4 border-t border-slate-100">

                                        {achievement.is_active ? (

                                            <div className="flex items-center gap-2">

                                                <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
                                                    <Eye className="w-4 h-4 text-green-600" />
                                                </div>

                                                <span className="text-sm font-medium text-green-600">
                                                    Visible on website
                                                </span>

                                            </div>

                                        ) : (

                                            <div className="flex items-center gap-2">

                                                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center">
                                                    <EyeOff className="w-4 h-4 text-red-500" />
                                                </div>

                                                <span className="text-sm font-medium text-red-500">
                                                    Hidden from website
                                                </span>

                                            </div>

                                        )}

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="mt-5 flex items-center gap-2">

                                        {/* EDIT */}

                                        <button
                                            type="button"
                                            onClick={() => handleEdit(achievement)}
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition"
                                        >

                                            <Pencil className="w-4 h-4" />

                                            Edit

                                        </button>


                                        {/* HIDE / SHOW */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleToggleActive(achievement)
                                            }
                                            title={
                                                achievement.is_active
                                                    ? 'Hide achievement'
                                                    : 'Show achievement'
                                            }
                                            className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition"
                                        >

                                            {achievement.is_active ? (

                                                <EyeOff className="w-4 h-4" />

                                            ) : (

                                                <Eye className="w-4 h-4" />

                                            )}

                                        </button>


                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(achievement.id)
                                            }
                                            disabled={
                                                deletingId === achievement.id
                                            }
                                            title="Delete achievement"
                                            className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                                        >

                                            {deletingId === achievement.id ? (

                                                <Loader2 className="w-4 h-4 animate-spin" />

                                            ) : (

                                                <Trash2 className="w-4 h-4" />

                                            )}

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}