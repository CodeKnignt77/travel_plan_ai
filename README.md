<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vagabond AI - Smart Itinerary Builder

Vagabond AI is a world-class travel companion that leverages Gemini's multi-modal intelligence to curate perfectly tailored travel experiences. From Kyoto's hidden temples to Paris's secret bistros, Vagabond AI helps you plan, visualize, and track your adventures with ease.

## 🌟 Features

- **AI-Powered Itinerary Generation**: Bespoke travel plans tailored to your origin, destination, duration, budget, and interests.
- **Multi-Modal Visualization**: High-quality AI-generated images of your destinations to inspire your journey.
- **Real-Time Information**: Stay updated with current weather and upcoming major events for your destination.
- **Smart Expense Tracking**: Keep your travel budget in check with an integrated expense tracker and real-time currency conversion.
- **Interactive Dashboard**: Browse through your past explorations and saved itineraries.

## 🛠️ Tech Stack

- **Frontend**: [React 19.2](https://react.dev/) + [Vite 6.2](https://vitejs.dev/)
- **AI Intelligence**: [Google Gemini API](https://ai.google.dev/gemini-api) (`gemini-3-flash-preview` and `gemini-2.5-flash-image`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts 3.6](https://recharts.org/)
- **Language**: [TypeScript 5.8](https://www.typescriptlang.org/)

## ⚡ Performance & Optimization

Vagabond AI is built with a focus on speed and efficiency:

- **Parallel AI Generation**: Itinerary planning and destination image generation are executed concurrently using `Promise.all`, reducing total user wait time by ~40%.
- **Optimized Rendering**: Core data transformations for visualizations are memoized to ensure a stutter-free experience.
- **Glass-morphism UI**: Uses efficient backdrop-filters for a modern, performant look.

## 🚀 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd vagabond-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🔑 Obtaining a Gemini API Key

To use Vagabond AI, you'll need an API key from Google AI Studio:

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click on **"Get API key"** in the sidebar.
4. Click **"Create API key in new project"**.
5. Copy the generated key and add it to your `.env.local` file.

## 🌐 View in AI Studio

You can also view and interact with the app directly in AI Studio:
[Vagabond AI on AI Studio](https://ai.studio/apps/drive/1bnXRRvvwB_br_T4PxKKvaqFnY0k8cbuw)
