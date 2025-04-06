"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search } from "lucide-react"

interface LocationPickerProps {
  onLocationSelected: (location: { lat: number; lng: number; address?: string }) => void
  initialLocation?: { lat: number; lng: number }
}

export default function LocationPicker({ onLocationSelected, initialLocation }: LocationPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLocation, setCurrentLocation] = useState(initialLocation || null)
  const [isLoading, setIsLoading] = useState(false)

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location = { lat: latitude, lng: longitude }
          setCurrentLocation(location)
          onLocationSelected(location)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setIsLoading(false)
    }
  }

  // In a real implementation, this would use a geocoding service like Google Maps, Mapbox, etc.
  const searchLocation = () => {
    setIsLoading(true)

    // Simulate API call with a timeout
    setTimeout(() => {
      // Mock response - in a real app, this would come from the geocoding API
      const mockLocation = {
        lat: 28.6139 + (Math.random() - 0.5) * 0.1,
        lng: 77.209 + (Math.random() - 0.5) * 0.1,
        address: searchQuery,
      }

      setCurrentLocation(mockLocation)
      onLocationSelected(mockLocation)
      setIsLoading(false)
    }, 1000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchLocation()
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-grow">
          <Label htmlFor="location-search" className="sr-only">
            Search location
          </Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location-search"
              type="text"
              placeholder="Search for a location"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading || !searchQuery.trim()}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          {isLoading ? "Getting location..." : "Use My Current Location"}
        </Button>
      </div>

      <div className="bg-muted p-4 rounded-lg h-64 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">
            {currentLocation
              ? `Selected location: ${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
              : "No location selected"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            (In a real implementation, this would display an interactive map)
          </p>
        </div>
      </div>

      {currentLocation && currentLocation.address && (
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="font-medium text-sm">Selected Address:</p>
          <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
        </div>
      )}
    </div>
  )
}

