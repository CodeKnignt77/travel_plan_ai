<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# ⚡ Vagabond AI
### Smart Itinerary Builder & Travel Companion

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Gemini](https://img.shields.io/badge/AI-Gemini%20Flash-orange?logo=google-gemini)](https://ai.google.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)

</div>

---

**Vagabond AI** is a performance-optimized travel companion that leverages Google Gemini's multi-modal intelligence to curate perfectly tailored travel experiences. From Kyoto's hidden temples to Paris's secret bistros, Vagabond AI helps you plan, visualize, and track your adventures with lightning speed.

## 🌟 Key Features

*   **⚡ AI-Powered Itinerary Generation**: Bespoke travel plans tailored to your origin, destination, duration, budget, and interests using `gemini-3-flash-preview`.
*   **🖼️ Multi-Modal Visualization**: High-quality AI-generated images of your destinations to inspire your journey using `gemini-2.5-flash-image`.
*   **🌐 Real-Time Information**: Grounded search results for current weather and upcoming major events.
*   **📊 Smart Expense Tracking**: Integrated expense tracker with real-time currency conversion and budget visualization via Recharts.
*   **📱 Interactive Dashboard**: Seamlessly browse through your past explorations and saved itineraries.

## 🚀 Performance Optimizations

*   **Parallelized AI Pipelines**: Independent AI service calls (itinerary generation and image creation) are executed in parallel using `Promise.all`, reducing user wait time by up to 40%.
*   **Intelligent JSON Repair**: Custom logic to handle and repair truncated AI responses, ensuring application stability even with complex requests.
*   **Responsive Visualizations**: Lightweight charting using Recharts.

## 🛠️ Tech Stack

*   **Frontend**: React 19.2 + Vite 6.2
*   **AI Intelligence**: Google Gemini API (`gemini-3-flash-preview` & `gemini-2.5-flash-image`)
*   **Styling**: Tailwind CSS (Glassmorphism UI)
*   **Data Vis**: Recharts 3.6
*   **Language**: TypeScript 5.8

## 🚀 Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [npm](https://www.npmjs.com/)

### Getting Started

1.  **Clone & Enter**:
    ```bash
    git clone <repository-url>
    cd vagabond-ai
    ```

2.  **Install**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Launch**:
    ```bash
    npm run dev
    ```
    Access at `http://localhost:3000`.

## 🔑 Obtaining a Gemini API Key

1.  Visit [Google AI Studio](https://aistudio.google.com/).
2.  Click **"Get API key"** in the sidebar.
3.  Copy the generated key to your `.env.local` file.

## 🌐 View in AI Studio

Explore the app directly: [Vagabond AI on AI Studio](https://ai.studio/apps/drive/1bnXRRvvwB_br_T4PxKKvaqFnY0k8cbuw)
