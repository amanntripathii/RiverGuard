import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Shield, Users, Award } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary-foreground" />
            <h1 className="text-2xl font-bold text-primary-foreground">RiverGuard</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-primary-foreground hover:text-primary-foreground/80">
              Home
            </Link>
            <Link href="/report" className="text-primary-foreground hover:text-primary-foreground/80">
              Report Pollution
            </Link>
            <Link href="/map" className="text-primary-foreground hover:text-primary-foreground/80">
              Map
            </Link>
            <Link href="/schemes" className="text-primary-foreground hover:text-primary-foreground/80">
              Government Schemes
            </Link>
            <Link href="/history" className="text-primary-foreground hover:text-primary-foreground/80">
              River History
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Link href="/login">
              <Button
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Login
              </Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Help Protect India's Rivers Through Citizen Science
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                Report pollution incidents, participate in cleanups, and earn rewards while making a real difference for
                our waterways.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Link href="/report">
                  <Button size="lg" className="w-full sm:w-auto">
                    Report Pollution
                  </Button>
                </Link>
                <Link href="/map">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    View Map
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Clean river with people monitoring water quality"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How RiverGuard Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Pollution</h3>
                <p className="text-muted-foreground">
                  Easily submit reports with photos, location data, and pollution severity levels in just a few taps.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Join Cleanups</h3>
                <p className="text-muted-foreground">
                  Participate in community cleanup events and connect with environmental organizations in your area.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Get recognition and incentives for your environmental contributions through our points system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Making a Difference Together</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">1,240+</p>
                <p className="text-muted-foreground">Pollution Reports</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">320+</p>
                <p className="text-muted-foreground">Cleanup Events</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">5,600+</p>
                <p className="text-muted-foreground">Active Users</p>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-primary mb-2">28</p>
                <p className="text-muted-foreground">Rivers Monitored</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to protect India's rivers?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of citizens who are making a difference through the RiverGuard platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
              <Link href="/register">
                <Button size="lg" variant="secondary">
                  Create an Account
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">RiverGuard</h3>
              </div>
              <p className="text-muted-foreground">
                A citizen science platform for monitoring and protecting India's rivers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/report" className="text-muted-foreground hover:text-foreground">
                    Report Pollution
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-muted-foreground hover:text-foreground">
                    View Map
                  </Link>
                </li>
                <li>
                  <Link href="/schemes" className="text-muted-foreground hover:text-foreground">
                    Government Schemes
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="text-muted-foreground hover:text-foreground">
                    Rewards Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <p className="text-muted-foreground mb-4">Stay updated with the latest news and events.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} RiverGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

