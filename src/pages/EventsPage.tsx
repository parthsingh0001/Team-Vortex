import { useState } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const categories = ["All", "Hackathon", "Conference", "Workshop", "Competition", "Bootcamp"];
const types = ["All", "online", "offline", "hybrid"];

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");

  const filtered = mockEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || e.category === category;
    const matchType = type === "All" || e.type === type;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-3xl font-bold mb-2">All Events</h1>
          <p className="text-muted-foreground mb-8">Browse and register for upcoming events</p>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCategory(c)}
                  className="text-xs"
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex gap-1">
              {types.map((t) => (
                <Button
                  key={t}
                  variant={type === t ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setType(t)}
                  className="text-xs capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No events match your filters.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;
