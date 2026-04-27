import * as model from '../models/rootModel.js';

export const getProfile = async (req, res) => {
    try {
        const profile = await model.getUserProfile(req.user.id);
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};