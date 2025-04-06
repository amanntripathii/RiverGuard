"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

export default function MapComponent({ reports, center, zoom, onMarkerClick, getSeverityColor }) {
  const mapRef = useRef(null)
  const mapInitializedRef = useRef(false)

  // Initialize map after Leaflet script is loaded
  const initializeMap = () => {
    // Make sure we're in the browser and the map hasn't been initialized yet
    if (typeof window === "undefined" || !mapRef.current || mapInitializedRef.current) return

    // Get the Leaflet object from the window
    const L = window.L
    if (!L) {
      console.error("Leaflet not loaded")
      return
    }

    mapInitializedRef.current = true

    // Create map instance
    const map = L.map(mapRef.current).setView(center, zoom)

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add markers for each report
    reports.forEach((report) => {
      const severityColor = getSeverityColor(report.severity).replace("bg-", "")

      // Map the color class to actual color
      const colorMap = {
        "red-500": "#ef4444",
        "orange-500": "#f97316",
        "amber-500": "#f59e0b",
        "yellow-500": "#eab308",
        "green-500": "#22c55e",
      }

      const color = colorMap[severityColor]

      // Create custom marker
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      })

      // Add marker to map
      const marker = L.marker(report.coordinates, { icon: customIcon }).addTo(map)

      // Add popup
      marker.bindPopup(`
        <div class="text-sm">
          <h3 class="font-medium">${report.river} River</h3>
          <p class="text-xs">${report.location}</p>
          <p class="mt-1">${report.description}</p>
          <div class="mt-2">
            <span>Severity: ${report.severity}/5</span>
          </div>
        </div>
      `)

      // Add click handler
      marker.on("click", () => {
        onMarkerClick(report)
      })
    })

    // Update map when props change
    return map
  }

  // Initialize map when component mounts and Leaflet is loaded
  useEffect(() => {
    if (window.L) {
      initializeMap()
    }
  }, [reports, center, zoom])

  return (
    <>
      {/* Load Leaflet from CDN */}
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin="anonymous"
        onLoad={initializeMap}
      />

      {/* Load Leaflet CSS */}
      <style jsx global>{`
        @import 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      `}</style>

      {/* Map container */}
      <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>
    </>
  )
}

