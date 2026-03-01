import { Event } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Wifi, Building, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const typeIcons = { online: Wifi, offline: Building, hybrid: Globe };

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const TypeIcon = typeIcons[event.type];
  const fillPercent = Math.round((event.registeredCount / event.maxParticipants) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/event/${event.id}`}>
        <Card className="group p-5 hover:border-primary/40 transition-all duration-300 cursor-pointer bg-card hover:glow-primary">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              {event.category}
            </Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <TypeIcon className="w-3.5 h-3.5" />
              <span className="text-xs capitalize">{event.type}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span>{event.registeredCount}/{event.maxParticipants}</span>
              </div>
              <span className="text-primary font-medium">{fillPercent}%</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${fillPercent}%` }}
              />
            </div>
          </div>

          <div className="flex gap-1.5 mt-3 flex-wrap">
            {event.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default EventCard;
