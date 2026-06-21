import Designer from '../models/Designer.js';
import mongoose from 'mongoose';

// Logger Helper
const logAction = (action, status) => {
    console.log(`[${new Date().toISOString()}] Action: ${action} | Status: ${status}`);
};

// 1. جلب جميع المصممين
export const getAllDesigners = async (req, res, next) => {
    logAction('GET_ALL_DESIGNERS', 'Initiated');
    try {
        const designers = await Designer.aggregate([
            { $match: { isActive: true } },
            { $sort: { rating: -1 } },
            { $project: { name: 1, style: 1, rating: 1, image: 1, about: 1, works: 1, reviews: 1 } }
        ]);
        logAction('GET_ALL_DESIGNERS', 'Success');
        res.status(200).json(designers);
    } catch (error) {
        next(error); // استخدام next(error) ليتم التعامل معه عبر الـ errorHandler
    }
};

// 2. جلب مصمم واحد
export const getDesignerById = async (req, res, next) => {
    logAction('GET_DESIGNER_BY_ID', 'Initiated');
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const designer = await Designer.findById(req.params.id);
        if (!designer) {
            return res.status(404).json({ message: "Designer not found" });
        }
        logAction('GET_DESIGNER_BY_ID', 'Success');
        res.status(200).json(designer);
    } catch (error) {
        next(error);
    }
};

// 3. تعديل بيانات مصمم
export const updateDesigner = async (req, res, next) => {
    logAction('UPDATE_DESIGNER', 'Initiated');
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const updated = await Designer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Designer not found" });
        
        logAction('UPDATE_DESIGNER', 'Success');
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// 4. حذف مصمم
export const deleteDesigner = async (req, res, next) => {
    logAction('DELETE_DESIGNER', 'Initiated');
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const deleted = await Designer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Designer not found" });
        
        logAction('DELETE_DESIGNER', 'Success');
        res.status(200).json({ message: "Designer deleted successfully" });
    } catch (error) {
        next(error);
    }
};