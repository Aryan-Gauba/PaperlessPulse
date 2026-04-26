import * as model from '../models/rootModel.js';

export const inviteVolunteer = async (req, res) => {
    const { volunteerId } = req.body;
    const orgId = req.user.id;
    const orgName = req.user.name; // ensure name is in JWT payload

    try {
        await model.sendVolunteerInvite(orgId, volunteerId, orgName);
        res.status(201).json({ message: "Invitation sent successfully" });
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ error: "Volunteer already invited or connected" });
        }
        res.status(500).json({ error: err.message });
    }
};

export const respondToInvite = async (req, res) => {
    const { orgId, status } = req.body; // status should be 'accepted' or 'rejected'
    const volunteerId = req.user.id;

    try {
        await model.updateRelationStatus(volunteerId, orgId, status);
        res.json({ message: `Invitation ${status}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const fetchNotifications = async (req, res) => {
    try {
        const result = await model.getNotifications(req.user.id);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const fetchVolunteers = async (req, res) => {
    try {
        const result = await model.getAvailableVolunteers();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const fetchMyOrganizations = async (req, res) => {
    try {
        const result = await model.getOrganizationsByVolunteer(req.user.id);
        res.json(result.rows); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};