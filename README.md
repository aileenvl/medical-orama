# Medical Information Assistant (Demo)

A medical symptom analysis chat application powered by [Orama](https://docs.oramasearch.com/). This demo showcases RAG (Retrieval-Augmented Generation) capabilities using a medical symptoms dataset.

## Features

- 💬 Interactive chat interface for describing symptoms
- 🔍 Real-time analysis of symptoms using Orama's RAG capabilities
- 📊 Display of similar medical cases with detailed patient profiles
- 🏥 Based on a comprehensive disease-symptoms dataset
- ⚡ Built with Next.js and Tailwind CSS for a modern, responsive UI

## Dataset

This demo uses the [Disease Symptoms and Patient Profile Dataset](https://www.kaggle.com/datasets/uom190346a/disease-symptoms-and-patient-profile-dataset/data) from Kaggle, which includes:

- Patient demographics (age, gender)
- Vital signs (blood pressure, cholesterol)
- Symptoms (cough, fever, fatigue, breathing difficulty)
- Disease diagnoses
- Treatment outcomes

## Getting Started

### Prerequisites

- Node.js 18 or later
- package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medical-chat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Orama credentials:
```env
NEXT_PUBLIC_ORAMA_API_KEY=your_api_key
NEXT_PUBLIC_ORAMA_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technical Stack

- **Frontend Framework**: Next.js 14 with App Router
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **RAG Engine**: Orama Cloud
- **Language Processing**: React-Markdown for message formatting

## Important Note

⚠️ **Medical Disclaimer**: This is a demonstration tool only and should not be used for actual medical diagnosis. The information provided is for educational purposes only. Always consult with qualified healthcare professionals for medical advice, diagnosis, or treatment.


## Acknowledgments

- Dataset provided by [Kaggle](https://www.kaggle.com/datasets/uom190346a/disease-symptoms-and-patient-profile-dataset/data)
- Powered by [Orama](https://docs.oramasearch.com/) for RAG capabilities
- UI components from [shadcn/ui](https://ui.shadcn.com/)
