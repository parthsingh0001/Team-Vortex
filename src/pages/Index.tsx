import { motion } from "framer-motion";
import { Calendar, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import { mockEvents, mockNotifications } from "@/data/mockData";

const Index = () => {
  const featuredEvents = mockEvents.slice(0, 3);
  const latestNotifications = mockNotifications.filter((n) => !n.read).slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-accent/15 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-sm font-medium tracking-wider uppercase">Multi-Event Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Manage Events,{" "}
              <span className="text-gradient">Build Teams,</span>{" "}
              Track Everything.
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Create and manage multiple events, handle registrations, form teams, and keep everyone notified — all in one place.
            </p>
            <div className="flex gap-3">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Zap className="w-4 h-4" />
                  Open Dashboard
                </Button>
              </Link>
              <Link to="/events">
                <Button size="lg" variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Browse Events
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {[
              { label: "Active Events", value: "5" },
              { label: "Registered", value: "594" },
              { label: "Teams Formed", value: "3" },
              { label: "Check-ins", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <p className="text-sm text-muted-foreground mt-1">Don't miss out on these featured events</p>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View all <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredEvents.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* Quick Notifications */}
      {latestNotifications.length > 0 && (
        <section className="container mx-auto px-4 pb-20">
          <h2 className="text-xl font-bold mb-4">Recent Announcements</h2>
          <div className="space-y-3">
            {latestNotifications.map((notif) => (
              <div key={notif.id} className="glass rounded-xl p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  notif.type === 'urgent' ? 'bg-destructive' :
                  notif.type === 'warning' ? 'bg-accent' :
                  notif.type === 'success' ? 'bg-success' : 'bg-primary'
                }`} />
                <div>
                  <p className="font-medium text-sm">{notif.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
