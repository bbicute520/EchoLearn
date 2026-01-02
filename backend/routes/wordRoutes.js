const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

router.post('/review/:id', async (req, res) => {
    const { level } = req.body; // level: 'again', 'hard', 'medium', 'easy'
    try {
        const word = await Word.findById(req.params.id);
        if (!word) return res.status(404).json({ message: "Không tìm thấy từ" });

        let { repetition, efactor, interval } = word;
        let nextReview = new Date();

        switch (level) {
            case 'again':
                // < 1 phút: Reset tiến độ, học lại ngay lập tức
                repetition = 0;
                interval = 0;
                nextReview.setMinutes(nextReview.getMinutes() + 1); 
                break;

            case 'hard':
                // Thường là 1-2 ngày: Tăng interval chậm, giảm efactor
                repetition++;
                interval = interval === 0 ? 1 : Math.round(interval * 1.2);
                efactor = Math.max(1.3, efactor - 0.15);
                nextReview.setDate(nextReview.getDate() + interval);
                break;

            case 'medium':
                // Khoảng cách tiêu chuẩn: Tăng interval theo efactor
                if (repetition === 0) interval = 1;
                else if (repetition === 1) interval = 4;
                else interval = Math.round(interval * efactor);
                
                repetition++;
                nextReview.setDate(nextReview.getDate() + interval);
                break;

            case 'easy':
                // Khoảng cách lớn: Tăng interval mạnh, tăng efactor
                if (repetition === 0) interval = 4;
                else interval = Math.round(interval * efactor * 1.3);
                
                repetition++;
                efactor += 0.15;
                nextReview.setDate(nextReview.getDate() + interval);
                break;
        }

        word.repetition = repetition;
        word.efactor = efactor;
        word.interval = interval;
        word.nextReview = nextReview;

        await word.save();
        res.json({ message: `Hẹn gặp lại sau ${interval} ngày`, nextReview });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;