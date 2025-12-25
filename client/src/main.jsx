import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
      <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#111827",
          color: "#e5e7eb",
          border: "1px solid #1f2937"
        },
        success: {
          iconTheme: {
            primary: "#6366f1",
            secondary: "#111827"
          }
        }
      }}
    />
  </StrictMode>,
)
