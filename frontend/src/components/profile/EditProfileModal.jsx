import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle, Loader2, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import { useLazyCheckEmailQuery, useLazyCheckUsernameQuery } from "../../features/auth/authApi";
import { useUpdateProfileMutation } from "../../features/profile/profileApi";
import { useAvailabilityCheck } from "../../hooks/useAvailabilityCheck";

export default function EditProfileModal({ isOpen, onClose, user }) {
    const { theme } = useTheme();
    const modalRef = useRef(null);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    const [form, setForm] = useState({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        website: user.website || "",
        location: user.location || "",
        avatar: user.avatar || "",
        bannerImage: user.bannerImage || "",
    });

    const [checkUsername] = useLazyCheckUsernameQuery();
    const [checkEmail] = useLazyCheckEmailQuery();

    const usernameStatus = useAvailabilityCheck({
        value: form.username === user.username ? "" : form.username,
        checkFn: checkUsername,
        minLength: 3,
    });

    const emailStatus = useAvailabilityCheck({
        value: form.email === user.email ? "" : form.email,
        checkFn: checkEmail,
        minLength: 5,
    });

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    const handleChange = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        if (avatarFile) formData.append("avatar", avatarFile);
        if (bannerFile) formData.append("bannerImage", bannerFile);

        const updated = await updateProfile(formData).unwrap();
        if (updated?.user) {
            onClose(updated.user);
        } else {
            onClose();
        }
        toast.success("Profile updated");
    }

    const avatarPreview = avatarFile ? URL.createObjectURL(avatarFile) : form.avatar;
    const bannerPreview = bannerFile ? URL.createObjectURL(bannerFile) : form.bannerImage;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[998] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black"
                    />

                    <motion.div
                        ref={modalRef}
                        initial={{ y: 32, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 32, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            background: theme.surface,
                            color: theme.textPrimary,
                        }}
                        className="relative z-[999] w-[94vw] max-w-[1100px] h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        <div className="shrink-0">
                            <ImagePicker
                                label="Change banner"
                                height={220}
                                preview={bannerPreview}
                                onFile={setBannerFile}
                            />
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ background: theme.background }}
                        >
                            <FaTimes />
                        </button>

                        <div className="flex-1 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="grid grid-cols-[240px_1fr] gap-8 p-8">
                                <div className="flex justify-center">
                                    <ImagePicker
                                        label="Change avatar"
                                        height={200}
                                        circle
                                        preview={avatarPreview}
                                        onFile={setAvatarFile}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <StatusField
                                        label="Username"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        status={usernameStatus}
                                    />

                                    <StatusField
                                        label="Email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        status={emailStatus}
                                        type="email"
                                    />

                                    <Field label="Name" name="name" value={form.name} onChange={handleChange} />
                                    <Field
                                        label="Location"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        label="Website"
                                        name="website"
                                        value={form.website}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        label="Avatar URL"
                                        name="avatar"
                                        value={form.avatar}
                                        onChange={handleChange}
                                    />
                                    <Field
                                        label="Banner URL"
                                        name="bannerImage"
                                        value={form.bannerImage}
                                        onChange={handleChange}
                                    />

                                    <div className="col-span-2">
                                        <label className="font-semibold text-sm">Bio</label>
                                        <textarea
                                            name="bio"
                                            rows={4}
                                            value={form.bio}
                                            onChange={handleChange}
                                            className="w-full mt-1 rounded-xl p-4 outline-none"
                                            style={{
                                                background: theme.background,
                                                color: theme.textPrimary,
                                                border: `1px solid ${theme.border}`,
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-2 flex justify-end pt-2">
                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                background: theme.accent,
                                                color: theme.surface,
                                            }}
                                            className="px-8 py-3 rounded-full font-bold text-base"
                                        >
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </motion.button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function ImagePicker({ preview, onFile, label, height, circle }) {
    const inputRef = useRef();

    return (
        <div
            onClick={() => inputRef.current.click()}
            className={`relative cursor-pointer overflow-hidden ${circle ? "rounded-full" : "rounded-3xl"}`}
            style={{
                height,
                width: circle ? height : "100%",
                background: "#111",
            }}
        >
            {preview && <img src={preview} className="w-full h-full object-cover" alt="" />}

            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                <Camera size={32} />
                <span className="font-bold text-sm tracking-wide">{label}</span>
            </div>

            <input ref={inputRef} type="file" accept="image/*" hidden onChange={e => onFile(e.target.files[0])} />
        </div>
    );
}

function Field({ label, ...props }) {
    const { theme } = useTheme();
    return (
        <div>
            <label className="font-semibold text-sm">{label}</label>
            <input
                {...props}
                className="w-full mt-1 rounded-xl px-4 py-2.5 outline-none"
                style={{
                    background: theme.background,
                    color: theme.textPrimary,
                    border: `1px solid ${theme.border}`,
                }}
            />
        </div>
    );
}

function StatusField({ status, ...props }) {
    return (
        <div className="relative">
            <Field {...props} />
            <div className="absolute right-3 top-[50%] -translate-y-1/2">
                {status === "checking" && <Loader2 size={18} className="animate-spin" />}
                {status === "available" && <CheckCircle size={18} className="text-green-500" />}
                {status === "taken" && <XCircle size={18} className="text-red-500" />}
            </div>
        </div>
    );
}
