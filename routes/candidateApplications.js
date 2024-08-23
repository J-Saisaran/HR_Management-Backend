// const express = require('express');
// const router = express.Router();
// const CandidateApplication = require('../models/CandidateApplication');
// const JobPosting = require('../models/JobPosting');

// // Apply for a job
// router.post('/apply/:id', async (req, res) => {
//     const { candidateName, candidateEmail, resume, coverLetter } = req.body;
//     const id = req.params.id;


//     try {
//         const newApplication = new CandidateApplication({
//             jobPosting: id,
//             candidateName,
//             candidateEmail,
//             resume,
//             coverLetter
//         });
//         await newApplication.save();
//         res.json(newApplication);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // Get all applications for a job posting
// router.get('/:jobPostingId', async (req, res) => {
//     try {
//         const applications = await CandidateApplication.find({ jobPosting: req.params.jobPostingId }).populate('jobPosting', 'title');;
//         res.json(applications);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });



// router.get('/', async (req, res) => {
//     try {
//         const applications = await CandidateApplication.find()
//             .populate('jobPosting', 'title'); // Populating the job posting's title
//         res.json(applications);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// // Update the status of a candidate application
// router.put('/candidates/:id/status', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; // 'Accepted' or 'Rejected'

//         const updatedApplication = await CandidateApplication.findByIdAndUpdate(
//             id,
//             { status },
//             { new: true }
//         );

//         if (!updatedApplication) {
//             return res.status(404).json({ message: 'Application not found' });
//         }

//         res.json(updatedApplication);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Schedule an interview for a candidate application
// router.put('/candidates/:id/schedule-interview', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { date, time, location } = req.body;

//         const updatedApplication = await CandidateApplication.findByIdAndUpdate(
//             id,
//             { 'interview.date': date, 'interview.time': time, 'interview.location': location },
//             { new: true }
//         );

//         if (!updatedApplication) {
//             return res.status(404).json({ message: 'Application not found' });
//         }

//         res.json(updatedApplication);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const CandidateApplication = require('../models/CandidateApplication');
const JobPosting = require('../models/JobPosting');

// Apply for a job
router.post('/apply/:id', async (req, res) => {
    const { candidateName, candidateEmail, phoneNumber, resume, coverLetter } = req.body;
    const id = req.params.id;

    try {
        const newApplication = new CandidateApplication({
            jobPosting: id,
            candidateName,
            candidateEmail,
            phoneNumber,
            resume,
            coverLetter
        });
        await newApplication.save();
        res.json(newApplication);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all applications for a job posting
router.get('/:jobPostingId', async (req, res) => {
    try {
        const applications = await CandidateApplication.find({ jobPosting: req.params.jobPostingId }).populate('jobPosting', 'title');
        res.json(applications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await CandidateApplication.find()
            .populate('jobPosting', 'title'); // Populating the job posting's title
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update the status of a candidate application
router.put('/candidates/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Accepted' or 'Rejected'

        const updatedApplication = await CandidateApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(updatedApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Schedule an interview for a candidate application
router.put('/candidates/:id/schedule-interview', async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, location } = req.body;

        const updatedApplication = await CandidateApplication.findByIdAndUpdate(
            id,
            { interviewDate: new Date(`${date}T${time}`), interviewLocation: location },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(updatedApplication);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
